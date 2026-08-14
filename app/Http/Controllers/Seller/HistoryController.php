<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        return Inertia::render('seller/history/index');
    }
}
