<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Closure;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $user = Auth::guard($guard)->user();
                
                if ($user->hasRole('admin')) {
                    return redirect()->route('management.admin.dashboard');
                }
                
                if ($user->hasRole('user')) {
                    return redirect()->route('management.user.dashboard');
                }
                
                return redirect()->route('management.dashboard');
            }
        }

        return $next($request);
    }
} 