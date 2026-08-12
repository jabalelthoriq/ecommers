<?php

declare(strict_types=1);

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = Cart::with(['items.product.images'])->firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        $cartItems = $cart->items->map(function ($item) {
            $primaryImage = $item->product->images->where('is_primary', true)->first() 
                ?? $item->product->images->first();
                
            return [
                'id' => $item->id,
                'name' => $item->product->name,
                'price' => (float) ($item->product->discount_price ?? $item->product->price),
                'quantity' => $item->quantity,
                'image' => $primaryImage ? '/storage/' . $primaryImage->image_path : '',
            ];
        });

        $total = $cart->items->sum(function ($item) {
            return ($item->product->discount_price ?? $item->product->price) * $item->quantity;
        });

        return Inertia::render('buyer/checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'shipping_name' => 'required|string|max:255',
            'shipping_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'payment_method' => 'required|string|in:transfer,cod',
        ]);

        $user = $request->user();
        $cart = Cart::with(['items.product'])->where('user_id', $user->id)->first();

        if (!$cart || $cart->items->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        $subtotal = $cart->items->sum(function ($item) {
            return ($item->product->discount_price ?? $item->product->price) * $item->quantity;
        });
        
        $shippingCost = 150000;
        $total = $subtotal + $shippingCost;

        $order = DB::transaction(function () use ($user, $cart, $total, $validated) {
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => Order::generateOrderNumber(),
                'total' => $total,
                'status' => 'pending',
                'shipping_name' => $validated['shipping_name'],
                'shipping_phone' => $validated['shipping_phone'],
                'shipping_address' => $validated['shipping_address'],
                'payment_method' => $validated['payment_method'],
            ]);

            foreach ($cart->items as $item) {
                $price = $item->product->discount_price ?? $item->product->price;
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'seller_id' => $item->product->seller_id,
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $price,
                    'subtotal' => $price * $item->quantity,
                ]);
            }

            $cart->items()->delete();

            return $order;
        });

        return redirect()->route('buyer.orders.show', $order)->with('success', 'Order placed successfully.');
    }
}
