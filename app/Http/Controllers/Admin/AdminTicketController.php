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
            $query = Ticket::with(['user', 'lastReply'])
                ->when($request->search, function ($q, $search) {
                    $q->where('subject', 'like', "%{$search}%")
                      ->orWhere('message', 'like', "%{$search}%");
                })
                ->when($request->status, function ($q, $status) {
                    $q->where('status', $status);
                })
                ->when($request->priority, function ($q, $priority) {
                    $q->where('priority', $priority);
                })
                ->when($request->category, function ($q, $category) {
                    $q->where('category', $category);
                });

            // Sıralama
            if ($request->sort) {
                $direction = $request->direction === 'desc' ? 'desc' : 'asc';
                $query->orderBy($request->sort, $direction);
            } else {
                $query->latest();
            }

            $tickets = $query->paginate(10)->withQueryString();

            // İstatistikleri hesapla
            $stats = [
                'total' => Ticket::count(),
                'open' => Ticket::where('status', 'open')->count(),
                'answered' => Ticket::where('status', 'answered')->count(),
                'high_priority' => Ticket::where('priority', 'high')->count(),
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
                    $path = $file->store('public/ticket-attachments');
                    $storagePath = str_replace('public/', '', $path);
                    
                    $reply->attachments()->create([
                        'path' => $storagePath,
                        'name' => $file->getClientOriginalName(),
                        'type' => $file->getMimeType(),
                        'size' => $file->getSize(),
                        'url' => Storage::url($path)
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

    // Diğer metodlar...
}
