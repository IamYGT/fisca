<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Http\Controllers\Controller;    

class UserInfoController extends Controller
{
    public function show()
    {
        return Inertia::render('User/Info');
    }
} 