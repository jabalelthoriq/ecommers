<?php

declare(strict_types=1);

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        // Replace with actual query to get seller's orders
        $orders = []; 

        return Inertia::render('seller/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, string $id): Response
    {
        // Fetch order details
        $order = []; // Replace with actual query
        
        return Inertia::render('seller/orders/show', [
            'order' => $order,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:diproses,dikirim,selesai,dibatalkan',
        ]);

        // Update order status logic goes here
        // Example: $order->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Order status updated.');
    }
}
