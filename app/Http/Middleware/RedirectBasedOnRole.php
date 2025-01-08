<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectBasedOnRole
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            
            if ($user->hasRole('admin')) {
                if ($request->routeIs('management.user.*')) {
                    return redirect()->route('management.admin.dashboard');
                }
            } else {
                if ($request->routeIs('management.admin.*')) {
                    return redirect()->route('management.user.dashboard');
                }
            }
        }

        return $next($request);
    }
} 