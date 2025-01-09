<?php

namespace App\Services;

use App\Models\TicketMessage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TicketAttachmentService
{
    public function uploadAttachments(array $files, TicketMessage $message): void
    {
        $uploadPath = $this->createUploadPath();

        foreach ($files as $file) {
            try {
                $this->uploadSingleFile($file, $uploadPath, $message);
            } catch (\Exception $e) {
                Log::error('Dosya yükleme hatası:', [
                    'error' => $e->getMessage(),
                    'file' => $file->getClientOriginalName(),
                    'message_id' => $message->id
                ]);
            }
        }
    }

    private function createUploadPath(): string
    {
        $year = date('Y');
        $month = date('m');
        $day = date('d');
        
        $path = "public/ticket-attachments/{$year}/{$month}/{$day}";
        
        $this->ensureDirectoryExists('public/ticket-attachments');
        $this->ensureDirectoryExists("public/ticket-attachments/{$year}");
        $this->ensureDirectoryExists("public/ticket-attachments/{$year}/{$month}");
        $this->ensureDirectoryExists($path);
        
        return $path;
    }

    private function ensureDirectoryExists(string $path): void
    {
        if (!Storage::disk('public')->exists($path)) {
            Storage::disk('public')->makeDirectory($path, 0775, true);
        }
    }

    private function uploadSingleFile(UploadedFile $file, string $uploadPath, TicketMessage $message): void
    {
        $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $relativePath = $uploadPath . '/' . $fileName;
        
        try {
            $uploaded = Storage::disk('public')->putFileAs(
                $uploadPath,
                $file,
                $fileName,
                ['visibility' => 'public']
            );

            if (!$uploaded) {
                throw new \Exception('Dosya yüklenemedi');
            }

            $attachment = $message->attachments()->create([
                'name' => $file->getClientOriginalName(),
                'path' => $relativePath,
                'type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ]);

            if (!Storage::disk('public')->exists($relativePath)) {
                throw new \Exception('Dosya kaydedildi fakat erişilemiyor');
            }
        } catch (\Exception $e) {
            Log::error('Dosya yükleme hatası:', [
                'error' => $e->getMessage(),
                'file' => $file->getClientOriginalName(),
                'path' => $relativePath
            ]);
            throw $e;
        }
    }
}
