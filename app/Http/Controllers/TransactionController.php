<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use App\Services\SlackService;

class TransactionController extends Controller
{
    protected $slackService;

    public function __construct(SlackService $slackService)
    {
        $this->slackService = $slackService;
    }

    public function history()
    {
        $user = Auth::user();

        // İşlem istatistiklerini hesapla ve float'a dönüştür
        $stats = [
            'total_amount_usd' => (float) $user->transactions()
                ->whereIn('status', ['completed', 'approved'])
                ->sum('amount_usd'),
            'pending_count' => (int) $user->transactions()
                ->whereIn('status', ['pending', 'waiting'])
                ->count(),
            'completed_count' => (int) $user->transactions()
                ->whereIn('status', ['completed', 'approved'])
                ->count(),
        ];

        // İşlemleri getir
        $transactions = $user->transactions()
            ->with(['user']) // Eager loading
            ->latest()
            ->paginate(10);

        return Inertia::render('Transactions/History', [
            'transactions' => $transactions,
            'stats' => $stats,
            'filters' => [
                'search' => request('search', ''),
                'type' => request('type', 'all'),
            ],
        ]);
    }

    public function pending()
    {
        $user = Auth::user();

        $stats = [
            'total_amount_usd' => $user->transactions()
                ->whereIn('status', ['completed', 'approved'])
                ->sum('amount_usd'),

            'total_amount_try' => $user->transactions()
                ->whereIn('status', ['completed', 'approved'])
                ->sum('amount'),

            'pending_count' => $user->transactions()
                ->whereIn('status', ['pending', 'waiting'])
                ->count(),

            'completed_count' => $user->transactions()
                ->whereIn('status', ['completed', 'approved'])
                ->count(),
        ];

        $pendingTransactions = $user->transactions()
            ->with(['user'])
            ->whereIn('status', ['pending', 'waiting'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Transactions/Pending', [
            'transactions' => $pendingTransactions,
            'stats' => $stats,
            'filters' => [
                'search' => request('search', ''),
                'type' => request('type', 'all'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('Withdrawal request:', $request->all());

        // Validasyon kurallarını ayır
        $commonRules = [
            'amount_usd' => 'required|numeric|min:1',
            'type' => 'required|string|in:bank_withdrawal,crypto_withdrawal',
            'exchange_rate' => 'required|numeric',
        ];

        $bankRules = [
            'bank_id' => 'required_if:type,bank_withdrawal|string',
            'bank_account' => 'required_if:type,bank_withdrawal|string',
            'customer_name' => 'required_if:type,bank_withdrawal|string|max:255',
            'customer_surname' => 'required_if:type,bank_withdrawal|string|max:255',
            'customer_meta_id' => 'nullable|string|max:255',
        ];

        $cryptoRules = [
            'wallet_address' => 'required_if:type,crypto_withdrawal|string|max:255',
            'network' => 'required_if:type,crypto_withdrawal|string|in:trc20',
        ];

        // İşlem tipine göre validasyon kurallarını birleştir
        $rules = array_merge(
            $commonRules,
            $request->input('type') === 'bank_withdrawal' ? $bankRules : [],
            $request->input('type') === 'crypto_withdrawal' ? $cryptoRules : []
        );

        try {
            $validated = $request->validate($rules);

            // İşlem verilerini hazırla
            $transactionData = [
                'user_id' => auth()->id(),
                'amount_usd' => $validated['amount_usd'],
                'amount' => $validated['amount_usd'] * $validated['exchange_rate'],
                'type' => $validated['type'],
                'status' => 'pending',
                'reference_id' => $this->generateReferenceId($validated['type']),
                'exchange_rate' => $validated['exchange_rate'],
            ];

            // İşlem tipine göre ek verileri ekle
            if ($validated['type'] === 'bank_withdrawal') {
                $transactionData = array_merge($transactionData, [
                    'bank_id' => $validated['bank_id'],
                    'bank_account' => $validated['bank_account'],
                    'customer_name' => $validated['customer_name'],
                    'customer_surname' => $validated['customer_surname'],
                    'customer_meta_id' => $validated['customer_meta_id'] ?? null,
                ]);
            } elseif ($validated['type'] === 'crypto_withdrawal') {
                $transactionData = array_merge($transactionData, [
                    'crypto_address' => $validated['wallet_address'],
                    'crypto_network' => $validated['network'],
                    'crypto_fee' => 1.00,
                    'customer_name' => null,
                    'customer_surname' => null,
                    'customer_meta_id' => null,
                ]);
            }

            // İşlem geçmişini kaydet
            $transactionData['history'] = json_encode([
                [
                    'status' => 'pending',
                    'timestamp' => now(),
                    'note' => $validated['type'] === 'crypto_withdrawal'
                        ? 'Crypto withdrawal request created'
                        : 'Bank withdrawal request created'
                ]
            ]);

            \Log::info('Transaction data before save:', $transactionData);

            try {
                $transaction = Auth::user()->transactions()->create($transactionData);
                $transaction->load('user'); // User modelini yükle

                // Slack bildirimi gönder
                $this->slackService->sendTransactionNotification($transaction->toArray());

                \Log::info('Created transaction:', [
                    'id' => $transaction->id,
                    'customer_name' => $transaction->customer_name,
                    'customer_surname' => $transaction->customer_surname,
                    'all_attributes' => $transaction->getAttributes()
                ]);

                $successMessage = $validated['type'] === 'crypto_withdrawal'
                    ? 'transaction.crypto.created'
                    : 'transaction.created';

                return redirect()
                    ->route('transactions.history')
                    ->with('success', translate($successMessage));
            } catch (\Exception $e) {
                \Log::error('Transaction creation failed:', [
                    'error' => $e->getMessage(),
                    'data' => $transactionData
                ]);

                $errorMessage = $validated['type'] === 'crypto_withdrawal'
                    ? 'transaction.crypto.error'
                    : 'transaction.error';

                return redirect()
                    ->back()
                    ->with('error', translate($errorMessage))
                    ->withInput();
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed:', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);
            throw $e;
        }
    }

    // İşlem detaylarını görüntüleme
    public function show(Transaction $transaction)
    {
        // Yetkilendirme kontrolü
        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        // Banks tablosundan aktif bankaları çekelim
        $banks = \DB::table('banks')
            ->where('is_active', true)
            ->get(['id', 'name', 'code', 'logo']);

        // Debug için loglama
        \Log::info('Transaction Details:', [
            'id' => $transaction->id,
            'type' => $transaction->type,
            'bank_id' => $transaction->bank_id,
            'bank_account' => $transaction->bank_account,
            'banks' => $banks
        ]);

        $transaction = $transaction->load(['user']);

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction,
            'banks' => $banks
        ]);
    }

    /**
     * Benzersiz referans ID oluştur
     */
    private function generateReferenceId(string $type): string
    {
        $prefix = $type === 'crypto_withdrawal' ? 'CW' : 'BW';
        $randomPart = strtoupper(substr(uniqid(), -8));
        return $prefix . '-' . $randomPart;
    }

    public function cancel(Transaction $transaction)
    {
        try {
            // Yetkilendirme kontrolü
            if ($transaction->user_id !== auth()->id()) {
                throw new \Exception('Unauthorized action.');
            }

            // Sadece pending durumundaki işlemler iptal edilebilir
            if ($transaction->status !== 'pending') {
                throw new \Exception('This transaction cannot be cancelled.');
            }

            \DB::transaction(function () use ($transaction) {
                $oldStatus = $transaction->status;

                // Durumu güncelle
                $transaction->update([
                    'status' => Transaction::STATUS_CANCELLED,
                    'processed_at' => now(),
                ]);

                // İşlem geçmişine ekle
                $transaction->addToHistory(
                    'transaction.history.cancelled_by_user',
                    'status_change',
                    [
                        'old' => $oldStatus,
                        'new' => 'cancelled',
                        'user' => auth()->user()->name
                    ]
                );

                // User modelini yükle ve Slack bildirimi gönder
                $transaction->load('user');
                app(SlackService::class)->sendTransactionNotification(
                    array_merge(
                        $transaction->toArray(),
                        [
                            'status_changed' => true,
                            'old_status' => $oldStatus,
                            'new_status' => 'cancelled',
                            'cancelled_by' => auth()->user()->name,
                            'cancelled_at' => now()->format('Y-m-d H:i:s')
                        ]
                    )
                );
            });

            return redirect()->back()->with('success', 'İşlem başarıyla iptal edildi.');

        } catch (\Exception $e) {
            \Log::error('Transaction cancellation failed:', [
                'transaction_id' => $transaction->id,
                'error' => $e->getMessage()
            ]);

            return redirect()->back()->with('error', 'İşlem iptal edilemedi.');
        }
    }

    // Test fonksiyonunu ekleyelim
    public function testSlackNotification()
    {
        try {
            // Test verisi oluştur
            $testTransaction = [
                'type' => 'bank_withdrawal',
                'amount_usd' => 1000.00,
                'amount' => 30000.00,
                'reference_id' => 'TEST-' . strtoupper(substr(uniqid(), -8)),
                'customer_name' => 'Test',
                'customer_surname' => 'User',
                'bank_details' => [
                    'name' => 'Ziraat Bankası'
                ],
                'bank_account' => 'TR330006100519786457841326',
                'formatted_iban' => 'TR33 0006 1005 1978 6457 8413 26'
            ];

            // Slack bildirimi gönder
            $this->slackService->sendTransactionNotification($testTransaction);

            return response()->json([
                'success' => true,
                'message' => 'Test bildirimi başarıyla gönderildi'
            ]);
        } catch (\Exception $e) {
            \Log::error('Test notification failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Test bildirimi gönderilemedi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
