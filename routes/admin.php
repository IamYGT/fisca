<?php

use App\Http\Controllers\Admin\{
    AdminDashboardController,
    AdminTransactionController,
    AdminTicketController,
    AdminUserController,
    AdminWithdrawalController
};

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('management/admin')
    ->name('management.admin.')
    ->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Transactions
    Route::prefix('transactions')->name('transactions.')->group(function () {
        Route::get('/', [AdminTransactionController::class, 'index'])->name('index');
        Route::get('/{transaction}', [AdminTransactionController::class, 'show'])->name('show');
        Route::get('/{transaction}/edit', [AdminTransactionController::class, 'edit'])->name('edit');
        Route::put('/{transaction}', [AdminTransactionController::class, 'update'])->name('update');
        Route::put('/{transaction}/status', [AdminTransactionController::class, 'updateStatus'])->name('update-status');
    });

    // Tickets
    Route::prefix('tickets')->name('tickets.')->group(function () {
        // Ana resource route'ları
        Route::get('/', [AdminTicketController::class, 'index'])->name('index');
        Route::post('/', [AdminTicketController::class, 'store'])->name('store');
        Route::get('/{ticket}', [AdminTicketController::class, 'show'])->name('show');
        Route::put('/{ticket}', [AdminTicketController::class, 'update'])->name('update');
        Route::delete('/{ticket}', [AdminTicketController::class, 'destroy'])->name('destroy');

        // Özel route'lar
        Route::get('/create/{user?}', [AdminTicketController::class, 'create'])
            ->name('create-with-user');

        Route::put('/{ticket}/status', [AdminTicketController::class, 'updateStatus'])
            ->name('update-status');

        Route::post('/{ticket}/reply', [AdminTicketController::class, 'reply'])
            ->name('reply');
        
        Route::post('/create-for-user/{user}', [AdminTicketController::class, 'createForUser'])
            ->name('create-for-user');
    });

    // Users
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [AdminUserController::class, 'index'])->name('index');
        Route::get('/create', [AdminUserController::class, 'create'])->name('create');
        Route::post('/', [AdminUserController::class, 'store'])->name('store');
        Route::get('/{user}', [AdminUserController::class, 'show'])->name('show');
        Route::get('/{user}/edit', [AdminUserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [AdminUserController::class, 'update'])->name('update');
        Route::delete('/{user}', [AdminUserController::class, 'destroy'])->name('destroy');

        // Şifre işlemleri
        Route::get('/{user}/reset-password', [AdminUserController::class, 'resetPasswordForm'])->name('reset-password-form');
        Route::post('/{user}/reset-password', [AdminUserController::class, 'resetPassword'])->name('reset-password');
        Route::post('/{user}/send-credentials', [AdminUserController::class, 'sendCredentials'])->name('send-credentials');
    });

    // Withdrawals
    Route::prefix('withdrawals')->name('withdrawals.')->group(function () {
        Route::get('/', [AdminWithdrawalController::class, 'index'])->name('index');
        Route::get('/{withdrawal}', [AdminWithdrawalController::class, 'show'])->name('show');
        Route::put('/{withdrawal}/status', [AdminWithdrawalController::class, 'updateStatus'])->name('update-status');
    });

    // Admin API Routes
    Route::prefix('api')->group(function () {
        Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats']);
    });

    // Dil değiştirme route'u
    Route::get('/language/{lang}', [LanguageController::class, 'switchLanguage'])
        ->name('language.switch')
        ->where('lang', '[a-z]{2}');
}); 