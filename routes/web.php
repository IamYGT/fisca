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
use App\Http\Controllers\Auth\AuthenticatedSessionController;


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
        return inertia('Front-site/Home');
    })->name('home');

    // Diğer front-site sayfaları için rotalar
    Route::prefix('front')->name('front.')->group(function () {
        Route::get('/features', function () {
            return inertia('Front-site/Features');
        })->name('features');

        Route::get('/news', function () {
            return inertia('Front-site/News');
        })->name('news');

        Route::get('/stats', function () {
            return inertia('Front-site/Stats');
        })->name('stats');
    });
});

/*
|--------------------------------------------------------------------------
| Auth Check & Redirect
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // Dil değiştirme route'u
    Route::get('/language/{lang}', [LanguageController::class, 'switchLanguage'])
        ->name('language.switch');

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
Route::get('storage/ticket-attachments/{path}', function (string $path) {
    // Yetkilendirme kontrolü
    if (!auth()->check()) {
        abort(403);
    }

    $fullPath = "ticket-attachments/{$path}";

    if (!Storage::disk('public')->exists($fullPath)) {
        abort(404);
    }

    return response()->file(Storage::disk('public')->path($fullPath), [
        'Cache-Control' => 'public, max-age=86400',
    ]);
})->where('path', '.*')
  ->middleware(['auth', 'verified'])
  ->name('ticket.attachment');

// User Profile Routes
Route::middleware(['auth'])->prefix('user')->name('user.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
});
// Include other route files
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/user.php';

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout')
    ->middleware('auth');

