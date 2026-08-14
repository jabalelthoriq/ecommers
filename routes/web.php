<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controllers
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;

// Buyer Controllers
use App\Http\Controllers\Buyer\CartController;
use App\Http\Controllers\Buyer\CheckoutController;
use App\Http\Controllers\Buyer\OrderController;
use App\Http\Controllers\Buyer\WishlistController;

// Seller Controllers
use App\Http\Controllers\Seller\DashboardController;
use App\Http\Controllers\Seller\ProductController as SellerProductController;
use App\Http\Controllers\Seller\OrderController as SellerOrderController;
use App\Http\Controllers\Seller\HistoryController;
use App\Http\Controllers\Seller\SettingsController;


// =====================================================
// PUBLIC
// =====================================================

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/shop', [ShopController::class, 'index'])
    ->name('shop.index');

Route::get('/product/{product:slug}', [ProductController::class, 'show'])
    ->name('product.show');


// =====================================================
// GENERAL AUTHENTICATED
// =====================================================

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});


// =====================================================
// BUYER
// =====================================================

Route::middleware(['auth', 'role:pembeli'])
    ->prefix('buyer')
    ->name('buyer.')
    ->group(function () {

        // Cart
        Route::get('/cart', [CartController::class, 'index'])
            ->name('cart.index');

        Route::post('/cart', [CartController::class, 'store'])
            ->name('cart.store');

        Route::patch('/cart/{cart}', [CartController::class, 'update'])
            ->name('cart.update');

        Route::delete('/cart/{cart}', [CartController::class, 'destroy'])
            ->name('cart.destroy');


        // Checkout
        Route::get('/checkout', [CheckoutController::class, 'index'])
            ->name('checkout.index');

        Route::post('/checkout', [CheckoutController::class, 'store'])
            ->name('checkout.store');


        // Orders
        Route::get('/orders', [OrderController::class, 'index'])
            ->name('orders.index');

        Route::get('/orders/{order}', [OrderController::class, 'show'])
            ->name('orders.show');


        // Wishlist
        Route::get('/wishlist', [WishlistController::class, 'index'])
            ->name('wishlist.index');

        Route::post('/wishlist/toggle', [WishlistController::class, 'toggle'])
            ->name('wishlist.toggle');

    });


// =====================================================
// SELLER
// =====================================================

Route::middleware(['auth', 'role:penjual'])
    ->prefix('seller')
    ->name('seller.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');


        // Products
        Route::resource('products', SellerProductController::class);


        // Orders
        Route::get('/orders', [SellerOrderController::class, 'index'])
            ->name('orders.index');

        Route::get('/orders/{order}', [SellerOrderController::class, 'show'])
            ->name('orders.show');

        Route::patch('/orders/{order}', [SellerOrderController::class, 'update'])
            ->name('orders.update');


        // History
        Route::get('/history', [HistoryController::class, 'index'])
            ->name('history.index');


        // Settings
        Route::get('/settings', [SettingsController::class, 'index'])
            ->name('settings.index');

    });


// =====================================================
// OTHER ROUTES
// =====================================================

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/learn.php';