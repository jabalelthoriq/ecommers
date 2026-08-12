<?php

declare(strict_types=1);

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::where('seller_id', $request->user()->id)
            ->with('primaryImage')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'slug' => $product->slug,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'stock' => $product->stock,
                    'image' => $product->primaryImage ? '/storage/' . $product->primaryImage->image_path : null,
                ];
            });

        return Inertia::render('seller/products/index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('seller/products/create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = Product::create([
            'seller_id' => $request->user()->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . uniqid(),
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/products', 'public');
            $product->images()->create([
                'image_path' => $imagePath,
                'is_primary' => true,
            ]);
        }

        return redirect()->route('seller.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Request $request, Product $product): Response
    {
        if ($product->seller_id !== $request->user()->id) {
            abort(403);
        }

        $product->load('primaryImage');
        $product->image = $product->primaryImage ? '/storage/' . $product->primaryImage->image_path : null;

        return Inertia::render('seller/products/edit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        if ($product->seller_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
        ]);

        if ($request->hasFile('image')) {
            $product->images()->delete(); // Remove old images
            $imagePath = $request->file('image')->store('images/products', 'public');
            $product->images()->create([
                'image_path' => $imagePath,
                'is_primary' => true,
            ]);
        }

        return redirect()->route('seller.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        if ($product->seller_id !== $request->user()->id) {
            abort(403);
        }

        $product->images()->delete();
        $product->delete();

        return redirect()->route('seller.products.index')->with('success', 'Product deleted successfully.');
    }
}
