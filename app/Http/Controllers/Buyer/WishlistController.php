<?php

declare(strict_types=1);

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index(Request $request): Response
    {
        $wishlists = Wishlist::with(['product.images'])
            ->where('user_id', $request->user()->id)
            ->get();

        $wishlistItems = $wishlists->map(function ($wishlist) {
            $product = $wishlist->product;
            $primaryImage = collect($product->images ?? [])->where('is_primary', true)->first() 
                ?? collect($product->images ?? [])->first();
                
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => (float) $product->price,
                'discountPrice' => $product->discount_price ? (float) $product->discount_price : null,
                'image' => $primaryImage ? '/storage/' . $primaryImage->image_path : '',
                'rating' => 0, // not implemented yet
                'reviews' => 0,
                'isNew' => false,
            ];
        });

        return Inertia::render('buyer/wishlist', [
            'wishlistItems' => $wishlistItems,
        ]);
    }

    public function toggle(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $user = $request->user();

        $wishlist = Wishlist::where('user_id', $user->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return back()->with('success', 'Product removed from wishlist.');
        }

        Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $validated['product_id'],
        ]);

        return back()->with('success', 'Product added to wishlist.');
    }
}
