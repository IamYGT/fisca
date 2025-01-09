<?php

use App\Http\Controllers\User\{
    DashboardController,
    TransactionController,
    WithdrawalController,
    TicketController,
    UserIbanController
};
use App\Http\Controllers\ProfileController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:user'])
    ->prefix('management/user')
    ->name('management.user.')
    ->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Transactions
    Route::prefix('transactions')->name('transactions.')->group(function () {
        Route::get('/history', [TransactionController::class, 'history'])
            ->name('history')
            ->defaults('component', 'User/Transactions/History');

        Route::get('/{transaction}', [TransactionController::class, 'show'])
            ->name('show')
            ->defaults('component', 'User/Transactions/Show');

        Route::post('/', [TransactionController::class, 'store'])->name('store');
        Route::post('/{transaction}/cancel', [TransactionController::class, 'cancel'])->name('cancel');
    });

    // Tickets
    Route::prefix('tickets')->name('tickets.')->group(function () {
        Route::get('/', [TicketController::class, 'index'])->name('index');
        Route::get('/create', [TicketController::class, 'create'])->name('create');
        Route::post('/', [TicketController::class, 'store'])->name('store');
        Route::get('/{ticket}', [TicketController::class, 'show'])->name('show');
        Route::post('/{ticket}/reply', [TicketController::class, 'reply'])->name('reply');
    });

    // Withdrawals
    Route::prefix('withdrawals')->name('withdrawals.')->group(function () {
        Route::get('/create', [WithdrawalController::class, 'create'])
            ->name('create')
            ->defaults('component', 'User/Withdrawals/Create');

        Route::post('/store', [WithdrawalController::class, 'store'])->name('store');
    });

    // Profile & Settings
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/info', [ProfileController::class, 'info'])->name('info');
        Route::get('/edit', [ProfileController::class, 'edit'])->name('edit');
        
        // IBAN Routes
        Route::prefix('ibans')->name('ibans.')->group(function () {
            Route::get('/', [UserIbanController::class, 'index'])
                ->name('index')
                ->defaults('component', 'User/Profile/Ibans/UserIbanIndex');
            
            Route::post('/', [UserIbanController::class, 'store'])->name('store');
            Route::put('/{iban}', [UserIbanController::class, 'update'])->name('update');
            Route::delete('/{iban}', [UserIbanController::class, 'destroy'])->name('destroy');
            Route::put('/{iban}/set-default', [UserIbanController::class, 'setDefault'])->name('set-default');
        });
    });
}); 