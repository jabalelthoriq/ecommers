<?php

declare(strict_types=1);

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
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

        return Inertia::render('buyer/cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        $cartItem = CartItem::firstOrNew([
            'cart_id' => $cart->id,
            'product_id' => $validated['product_id'],
        ]);

        $cartItem->quantity = ($cartItem->exists ? $cartItem->quantity : 0) + $validated['quantity'];
        $cartItem->save();

        return back()->with('success', 'Product added to cart.');
    }

    public function update(Request $request, string $cart): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cartItem = CartItem::whereHas('cart', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($cart);

        $cartItem->update($validated);

        return back()->with('success', 'Cart updated.');
    }

    public function destroy(Request $request, string $cart): RedirectResponse
    {
        $cartItem = CartItem::whereHas('cart', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($cart);

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}
