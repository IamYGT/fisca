<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class TicketMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'user_id',
        'message',
        'quote',
        'is_admin',
        'to_user_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_admin' => 'boolean'
    ];

    protected $appends = ['formatted_attachments'];

    protected static function booted()
    {
        static::created(function ($message) {
            $message->ticket->update([
                'last_reply_at' => $message->created_at
            ]);
        });
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(TicketAttachment::class);
    }

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getFormattedAttachmentsAttribute()
    {
        return $this->attachments->map(function ($attachment) {
            return [
                'id' => $attachment->id,
                'name' => $attachment->name,
                'url' => $attachment->url,
                'type' => $attachment->type,
                'size' => $attachment->size,
            ];
        });
    }
} 