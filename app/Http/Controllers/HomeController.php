<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page with various product collections.
     */
    public function index(): Response
    {
        $categories = Category::where('is_active', true)->take(8)->get();
        
        $newArrivals = Product::with(['images', 'category'])
            ->where('is_active', true)
            ->latest()
            ->take(8)
            ->get();
            
        $bestSellers = Product::with(['images', 'category'])
            ->where('is_active', true)
            ->where('is_featured', true)
            ->take(8)
            ->get();
            
        $flashSales = Product::with(['images', 'category'])
            ->where('is_active', true)
            ->whereNotNull('discount_price')
            ->take(8)
            ->get();

        return Inertia::render('home', [
            'categories' => $categories,
            'newArrivals' => $newArrivals,
            'bestSellers' => $bestSellers,
            'flashSales' => $flashSales,
        ]);
    }
}
