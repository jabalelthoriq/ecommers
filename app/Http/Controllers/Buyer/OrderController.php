<?php

declare(strict_types=1);

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = Order::with(['items'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id, // frontend uses this for the URL (e.g. /buyer/orders/1)
                    'order_number' => $order->order_number, // display number
                    'date' => $order->created_at->format('M d, Y'),
                    'total' => (float) $order->total,
                    'status' => $order->status,
                    'items' => $order->items->sum('quantity'),
                ];
            });

        return Inertia::render('buyer/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, Order $order): Response
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        $order->load(['items.product.images', 'items.product.seller']);

        $shipping = 150000;
        $subtotal = $order->total - $shipping;

        $orderDetails = [
            'id' => $order->order_number,
            'date' => $order->created_at->format('F d, Y'),
            'status' => $order->status,
            'shipping_name' => $order->shipping_name,
            'shipping_address' => $order->shipping_address,
            'payment_method' => $order->payment_method === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery',
            'items' => $order->items->map(function ($item) {
                $primaryImage = collect($item->product->images ?? [])->where('is_primary', true)->first() 
                    ?? collect($item->product->images ?? [])->first();
                return [
                    'id' => $item->id,
                    'name' => $item->product_name,
                    'price' => (float) $item->price,
                    'quantity' => $item->quantity,
                    'image' => $primaryImage ? '/storage/' . $primaryImage->image_path : '',
                ];
            }),
            'subtotal' => (float) $subtotal,
            'shipping' => $shipping,
            'tax' => 0,
            'total' => (float) $order->total,
            'timeline' => [
                [ 'title' => 'Order Placed', 'date' => $order->created_at->format('M d, H:i A'), 'completed' => true ],
                [ 'title' => 'Processing', 'date' => '', 'completed' => in_array($order->status, ['diproses', 'dikirim', 'selesai']) ],
                [ 'title' => 'Shipped', 'date' => '', 'completed' => in_array($order->status, ['dikirim', 'selesai']) ],
                [ 'title' => 'Delivered', 'date' => '', 'completed' => $order->status === 'selesai' ],
            ]
        ];

        return Inertia::render('buyer/orders/show', [
            'orderDetails' => $orderDetails,
        ]);
    }
}
