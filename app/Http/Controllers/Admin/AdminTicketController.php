<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdminTicketController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Ticket::with(['user', 'lastReply.user'])
                ->when($request->search, function ($query, $search) {
                    $query->where('subject', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                })
                ->when($request->status, function ($query, $status) {
                    $query->where('status', $status);
                })
                ->when($request->priority, function ($query, $priority) {
                    $query->where('priority', $priority);
                })
                ->when($request->category, function ($query, $category) {
                    $query->where('category', $category);
                });

            // Sıralama
            $direction = $request->direction === 'desc' ? 'desc' : 'asc';
            $sortField = in_array($request->sort, ['created_at', 'last_reply_at', 'status', 'priority']) 
                ? $request->sort 
                : 'last_reply_at'; // Varsayılan sıralama son yanıta göre

            $tickets = $query->orderBy($sortField, $direction)->paginate(10);

            // İstatistikler
            $stats = [
                'total' => Ticket::count(),
                'open' => Ticket::where('status', 'open')->count(),
                'closed' => Ticket::where('status', 'closed')->count(),
                'answered' => Ticket::where('status', 'answered')->count(),
            ];

            return Inertia::render('Admin/Tickets/Index', [
                'tickets' => $tickets,
                'filters' => $request->only(['search', 'status', 'priority', 'category', 'sort', 'direction']),
                'statuses' => Ticket::STATUSES,
                'priorities' => Ticket::PRIORITIES,
                'categories' => Ticket::CATEGORIES,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('Admin ticket listesi hatası:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->with('error', 'Ticket listesi yüklenirken bir hata oluştu.');
        }
    }

    public function create()
    {
        return Inertia::render('Admin/Tickets/Create', [
            'statuses' => Ticket::STATUSES,
            'priorities' => Ticket::PRIORITIES,
            'categories' => Ticket::CATEGORIES,
        ]);
    }

    public function store(Request $request)
    {
        // Yeni ticket kaydetme
    }

    public function show(Ticket $ticket)
    {
        // Ticket ve ilişkili verileri yükle
        $ticket->load(['user', 'replies.user', 'replies.attachments', 'histories']);

        return Inertia::render('Admin/Tickets/Show', [
            'ticket' => $ticket,
            'statuses' => Ticket::STATUSES,
        ]);
    }

    public function reply(Request $request, Ticket $ticket)
    {
        $request->validate([
            'message' => 'required|string',
            'attachments.*' => 'nullable|file|max:10240',
            'quote' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $reply = $ticket->replies()->create([
                'user_id' => auth()->id(),
                'message' => $request->message,
                'quote' => $request->quote,
                'is_admin' => true
            ]);

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $fileName = $file->hashName();
                    $path = $file->storeAs('public/ticket-attachments', $fileName, 'public');
                    
                    $reply->attachments()->create([
                        'path' => $path,
                        'name' => $file->getClientOriginalName(),
                        'type' => $file->getMimeType(),
                        'size' => $file->getSize(),
                    ]);
                }
            }

            $ticket->update(['status' => 'answered']);
            
            $ticket->histories()->create([
                'user_id' => auth()->id(),
                'action' => 'replied',
                'details' => 'Admin yanıt verdi',
            ]);

            DB::commit();
            return back()->with('success', 'tickets.replyAdded');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Admin ticket yanıtı hatası:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->with('error', 'common.error');
        }
    }

    public function updateStatus(Request $request, Ticket $ticket)
    {
        $request->validate([
            'status' => 'required|string|in:' . implode(',', Ticket::STATUSES),
        ]);

        $ticket->update(['status' => $request->status]);
        
        $ticket->histories()->create([
            'user_id' => auth()->id(),
            'action' => 'status_updated',
            'details' => "Durum güncellendi: {$request->status}",
        ]);

        return back()->with('success', 'tickets.statusUpdated');
    }

    public function createForUser(Request $request, User $user)
    {
        try {
            $request->validate([
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
                'priority' => 'required|string|in:' . implode(',', Ticket::PRIORITIES),
                'category' => 'required|string|in:' . implode(',', Ticket::CATEGORIES),
            ]);

            DB::beginTransaction();

            // Ticket oluştur
            $ticket = Ticket::create([
                'user_id' => $user->id,
                'subject' => $request->subject,
                'message' => $request->message,
                'status' => 'open',
                'priority' => $request->priority,
                'category' => $request->category
            ]);

            // İlk mesajı ekle
            $ticket->replies()->create([
                'user_id' => auth()->id(),
                'message' => $request->message,
                'is_admin' => true
            ]);

            // Ticket geçmişine ekle
            $ticket->histories()->create([
                'user_id' => auth()->id(),
                'action' => 'created_by_admin',
                'details' => 'Ticket yönetici tarafından oluşturuldu'
            ]);

            DB::commit();

            return redirect()
                ->route('management.admin.tickets.show', $ticket->id)
                ->with('success', 'Ticket başarıyla oluşturuldu');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Admin ticket oluşturma hatası:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()
                ->withInput()
                ->with('error', 'Ticket oluşturulurken bir hata oluştu.');
        }
    }

    protected function handleAttachments($message, $attachments)
    {
        foreach ($attachments as $file) {
            try {
                $fileName = $file->hashName();
                $path = $file->storeAs('public/ticket-attachments', $fileName, 'public');
                
                $message->attachments()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'type' => $file->getMimeType(),
                    'size' => $file->getSize()
                ]);
            } catch (\Exception $e) {
                Log::error('Dosya yükleme hatası:', [
                    'error' => $e->getMessage(),
                    'file' => $file->getClientOriginalName()
                ]);
            }
        }
    }

    // Diğer metodlar...
}
