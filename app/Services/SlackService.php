<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class SlackService
{
    protected $webhookUrl;

    public function __construct()
    {
        $this->webhookUrl = config('services.slack.fox_fx_webhook_url');

        if (empty($this->webhookUrl)) {
            Log::error('Slack webhook URL yapılandırılması eksik');
        }
    }

    public function sendTransactionNotification(array $transaction): void
    {
        try {
            if (empty($this->webhookUrl)) {
                Log::warning('Slack webhook URL yapılandırılmamış.');
                return;
            }

            // İşlem tipini Türkçe olarak al
            $typeText = $transaction['type'] === 'bank_withdrawal' ? '🏦 Banka Havalesi' : '₿ Kripto Para Çekimi';

            // Müşteri bilgisini formatla (sadece banka havalesi için)
            $customerName = $transaction['type'] === 'bank_withdrawal' ?
                trim(($transaction['customer_name'] ?? '') . ' ' . ($transaction['customer_surname'] ?? '')) :
                'N/A';

            // Başlık metnini hazırla
            $titleText = '🦊 Fox FX - ';
            $titleText .= isset($transaction['status_changed']) ? match($transaction['new_status'] ?? $transaction['status']) {
                'cancelled' => 'İşlem İptal Edildi',
                'completed' => 'İşlem Tamamlandı',
                'rejected' => 'İşlem Reddedildi',
                default => 'İşlem Durumu Değişti'
            } : 'Yeni Para Çekme Talebi';

            $blocks = [
                [
                    'type' => 'header',
                    'text' => [
                        'type' => 'plain_text',
                        'text' => $titleText,
                        'emoji' => true
                    ]
                ],
                [
                    'type' => 'divider'
                ],
                [
                    'type' => 'section',
                    'fields' => [
                        [
                            'type' => 'mrkdwn',
                            'text' => "*İşlem Tipi:*\n{$typeText}"
                        ],
                        [
                            'type' => 'mrkdwn',
                            'text' => "*Durum:*\n" . $this->getStatusEmoji($transaction['status']) . ' ' .
                                strtoupper($transaction['status'])
                        ]
                    ]
                ],
                [
                    'type' => 'section',
                    'fields' => [
                        [
                            'type' => 'mrkdwn',
                            'text' => "*Tutar:*\n$" . number_format($transaction['amount_usd'] ?? 0, 2) . " USD"
                        ],
                        [
                            'type' => 'mrkdwn',
                            'text' => "*Referans No:*\n`" . ($transaction['reference_id'] ?? 'N/A') . "`"
                        ]
                    ]
                ]
            ];

            // İşlem detayları
            $transactionDetails = $this->getTransactionDetails($transaction);
            if (!empty($transactionDetails)) {
                $blocks[] = [
                    'type' => 'section',
                    'fields' => array_map(function($detail) {
                        return [
                            'type' => 'mrkdwn',
                            'text' => $detail
                        ];
                    }, $transactionDetails)
                ];
            }

            // Durum değişikliği varsa ekle
            if (!empty($transaction['status_changed'])) {
                $blocks[] = [
                    'type' => 'section',
                    'text' => [
                        'type' => 'mrkdwn',
                        'text' => "*İşlemi Yapan:*\n" . ($transaction['cancelled_by'] ?? 'N/A')
                    ]
                ];
            }

            // Zaman bilgisi
            $blocks[] = [
                'type' => 'context',
                'elements' => [
                    [
                        'type' => 'mrkdwn',
                        'text' => $this->getContextText($transaction)
                    ]
                ]
            ];

            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post($this->webhookUrl, ['blocks' => $blocks]);

            if (!$response->successful()) {
                Log::error('Slack bildirimi başarısız oldu', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
            } else {
                Log::info('Slack bildirimi başarıyla gönderildi', [
                    'reference_id' => $transaction['reference_id'] ?? null
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Slack bildirimi hatası', [
                'error' => $e->getMessage(),
                'transaction' => $transaction
            ]);
        }
    }

    private function getContextText(array $transaction): string
    {
        $text = "🕒 Oluşturulma: " . (isset($transaction['created_at']) ?
            date('d.m.Y H:i:s', strtotime($transaction['created_at'])) :
            now()->format('d.m.Y H:i:s'));

        if (!empty($transaction['cancelled_by'])) {
            $text .= "\n❌ İptal Eden: " . $transaction['cancelled_by'];
            if (!empty($transaction['cancelled_at'])) {
                $text .= " (" . date('d.m.Y H:i:s', strtotime($transaction['cancelled_at'])) . ")";
            }
        }

        return $text;
    }

    private function getStatusEmoji(string $status): string
    {
        return match ($status) {
            'completed' => '✅',
            'pending' => '⏳',
            'cancelled' => '❌',
            'rejected' => '⛔',
            default => '❓'
        };
    }

    private function getTransactionDetails(array $transaction): array
    {
        $details = [];

        // Kullanıcı adını ekle (ilişkisel veri veya direkt veri)
        $userName = isset($transaction['user']['name']) ? $transaction['user']['name'] :
                   (isset($transaction['user_name']) ? $transaction['user_name'] : 'N/A');
        $details[] = "*Kullanıcı:* " . $userName;

        if ($transaction['type'] === 'bank_withdrawal') {
            // Banka bilgilerini ekle
            $bankName = $this->getBankName($transaction['bank_id']);
            $details[] = "*Banka:* " . ($bankName ?? 'N/A');
            $details[] = "*IBAN:* `" . ($transaction['bank_account'] ?? 'N/A') . "`";
            $details[] = "*Hesap Sahibi:* " . ($transaction['customer_name'] . ' ' . $transaction['customer_surname']);
        } else {
            // Kripto bilgilerini ekle
            $details[] = "*Ağ:* " . ($transaction['crypto_network'] ?? 'N/A');
            $details[] = "*Adres:* `" . ($transaction['crypto_address'] ?? 'N/A') . "`";
            if (isset($transaction['crypto_fee'])) {
                $details[] = "*Network Fee:* $" . number_format($transaction['crypto_fee'], 2) . " USDT";
            }
        }
        return $details;
    }

    private function getBankName(string $bankId): string
    {
        $banks = [
            'halkbank' => 'Halk Bankası',
            'vakifbank' => 'Vakıfbank',
            'isbank' => 'İş Bankası',
            'akbank' => 'Akbank',
            'garantibbva' => 'Garanti BBVA',
            'yapikredi' => 'Yapı Kredi',
            'qnbfinansbank' => 'QNB Finansbank',
            'denizbank' => 'Denizbank',
            'teb' => 'TEB',
            'ziraatbank' => 'Ziraat Bankası'
        ];

        return $banks[$bankId] ?? $bankId;
    }
}
