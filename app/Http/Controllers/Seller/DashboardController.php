<?php

declare(strict_types=1);

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $sellerId = $request->user()->id;

        $totalProducts = Product::where('seller_id', $sellerId)->count();
        
        $totalOrders = Order::whereHas('items', function ($query) use ($sellerId) {
            $query->where('seller_id', $sellerId);
        })->count();
        
        $totalRevenue = \App\Models\OrderItem::where('seller_id', $sellerId)
            ->whereHas('order', function ($query) {
                $query->where('status', '!=', 'dibatalkan');
            })
            ->sum('subtotal');

        $recentOrders = Order::whereHas('items', function ($query) use ($sellerId) {
            $query->where('seller_id', $sellerId);
        })
        ->with('user')
        ->latest()
        ->take(5)
        ->get();

        return Inertia::render('seller/dashboard', [
            'totalProducts' => $totalProducts,
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'recentOrders' => $recentOrders,
        ]);
    }
}
