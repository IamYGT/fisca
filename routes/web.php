<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\{
    LanguageController,
    DashboardController
};
use App\Http\Controllers\Auth\{
    GoogleController,
    FacebookController,
    GitHubController
};
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminTicketController;


/*
|--------------------------------------------------------------------------
| Language Switch Route
|--------------------------------------------------------------------------
*/
Route::get('/language/{lang}', [LanguageController::class, 'switchLanguage'])
    ->name('language.switch');

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return redirect()->route('login');
    });
});

/*
|--------------------------------------------------------------------------
| Auth Check & Redirect
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // Ana dashboard route'u - role göre yönlendirme yapar
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        try {
            if ($user->hasRole('admin')) {
                return redirect()->route('management.admin.dashboard');
            }

            if ($user->hasRole('user')) {
                return redirect()->route('management.user.dashboard');
            }

            // Eğer rol atanmamışsa varsayılan olarak user rolü ata
            $userRole = Role::where('name', 'user')->firstOrFail();
            $user->assignRole($userRole);

            return redirect()->route('management.user.dashboard');
        } catch (\Exception $e) {
            Log::error('Role check error:', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);
            return redirect()->route('management.user.dashboard');
        }
    })->name('dashboard');

    // Profile routes
    Route::prefix('management/profile')->name('management.profile.')->group(function () {
        Route::get('/edit', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

/*
|--------------------------------------------------------------------------
| Social Authentication Routes
|--------------------------------------------------------------------------
*/
// Google Authentication
Route::controller(GoogleController::class)->group(function () {
    Route::get('auth/google', 'redirectToGoogle')->name('auth.google');
    Route::get('auth/google/callback', 'handleGoogleCallback')->name('auth.google.callback');
});

// Facebook Authentication
Route::controller(FacebookController::class)->group(function () {
    Route::get('auth/facebook', 'redirectToFacebook')->name('auth.facebook');
    Route::get('auth/facebook/callback', 'handleFacebookCallback')->name('auth.facebook.callback');
});

// GitHub Authentication
Route::controller(GitHubController::class)->group(function () {
    Route::get('auth/github', 'redirectToGithub')->name('auth.github');
    Route::get('auth/github/callback', 'handleGithubCallback')->name('auth.github.callback');
});

/*
|--------------------------------------------------------------------------
| File Access Routes
|--------------------------------------------------------------------------
*/
Route::get('storage/ticket-attachments/{year}/{month}/{day}/{filename}', function ($year, $month, $day, $filename) {
    $path = "ticket-attachments/{$year}/{$month}/{$day}/{$filename}";

    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return response()->file(Storage::disk('public')->path($path), [
        'Cache-Control' => 'public, max-age=86400',
    ]);
})->where([
    'year' => '[0-9]{4}',
    'month' => '[0-9]{2}',
    'day' => '[0-9]{2}',
    'filename' => '[a-zA-Z0-9_\-\.]+',
])->middleware(['auth', 'verified']);

/*
|--------------------------------------------------------------------------
| Admin Ticket Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])->prefix('management/admin')->name('management.admin.')->group(function () {
    Route::resource('tickets', AdminTicketController::class)->names([
        'index' => 'tickets.index',
        'create' => 'tickets.create',
        'store' => 'tickets.store',
        'show' => 'tickets.show',
    ])->except(['create']);

    Route::get('tickets/create/{user?}', [AdminTicketController::class, 'create'])
        ->name('tickets.create-with-user');

    Route::put('/tickets/{ticket}/status', [AdminTicketController::class, 'updateStatus'])->name('tickets.update-status');
    Route::post('/tickets/{ticket}/reply', [AdminTicketController::class, 'reply'])->name('tickets.reply');
});

// User Profile Routes
Route::middleware(['auth'])->prefix('user')->name('user.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
});

// Include other route files
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/user.php';
