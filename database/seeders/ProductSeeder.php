<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use App\Models\FlashSale;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $seller1 = User::where('email', 'seller@novatrend.com')->first();
        $seller2 = User::where('email', 'seller2@novatrend.com')->first();
        $buyer = User::where('email', 'buyer@novatrend.com')->first();

        $fashion = Category::where('slug', 'fashion')->first();
        $elektronik = Category::where('slug', 'elektronik')->first();
        $kecantikan = Category::where('slug', 'kecantikan')->first();
        $olahraga = Category::where('slug', 'olahraga')->first();
        $rumahTangga = Category::where('slug', 'rumah-tangga')->first();
        $aksesoris = Category::where('slug', 'aksesoris')->first();

        $productsData = [
            // Fashion
            [
                'name' => 'Essential Hoodie',
                'description' => 'Hoodie nyaman untuk sehari-hari.',
                'price' => 599000,
                'discount_price' => null,
                'stock' => 50,
                'category_id' => $fashion->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Classic Hoodie',
                'description' => 'Hoodie klasik dengan desain timeless.',
                'price' => 599000,
                'discount_price' => 499000,
                'stock' => 30,
                'category_id' => $fashion->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Air Max 270',
                'description' => 'Sepatu lari yang sangat nyaman.',
                'price' => 1299000,
                'discount_price' => null,
                'stock' => 25,
                'category_id' => $fashion->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => true,
            ],

            // Elektronik
            [
                'name' => 'Wireless Headphones',
                'description' => 'Headphone nirkabel dengan suara jernih.',
                'price' => 999000,
                'discount_price' => 899000,
                'stock' => 20,
                'category_id' => $elektronik->id,
                'seller_id' => $seller2->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Smart Watch Series 9',
                'description' => 'Smartwatch dengan fitur kesehatan lengkap.',
                'price' => 1999000,
                'discount_price' => null,
                'stock' => 15,
                'category_id' => $elektronik->id,
                'seller_id' => $seller2->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Sony WH-1000XM5',
                'description' => 'Noise cancelling headphones terbaik.',
                'price' => 3499000,
                'discount_price' => null,
                'stock' => 10,
                'category_id' => $elektronik->id,
                'seller_id' => $seller2->id,
                'is_active' => true,
                'is_featured' => false,
            ],

            // Kecantikan
            [
                'name' => 'Facial Cleanser Set',
                'description' => 'Set pembersih wajah untuk kulit bersih.',
                'price' => 299000,
                'discount_price' => null,
                'stock' => 100,
                'category_id' => $kecantikan->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Vitamin C Serum',
                'description' => 'Serum untuk mencerahkan kulit.',
                'price' => 199000,
                'discount_price' => 149000,
                'stock' => 50,
                'category_id' => $kecantikan->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Lip Cream Matte Set',
                'description' => 'Set lip cream tahan lama.',
                'price' => 149000,
                'discount_price' => null,
                'stock' => 80,
                'category_id' => $kecantikan->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],

            // Olahraga
            [
                'name' => 'Running Shoes Pro',
                'description' => 'Sepatu lari profesional.',
                'price' => 899000,
                'discount_price' => null,
                'stock' => 40,
                'category_id' => $olahraga->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Yoga Mat Premium',
                'description' => 'Matras yoga anti slip.',
                'price' => 249000,
                'discount_price' => 199000,
                'stock' => 60,
                'category_id' => $olahraga->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Resistance Band Set',
                'description' => 'Set alat olahraga fleksibel.',
                'price' => 179000,
                'discount_price' => null,
                'stock' => 70,
                'category_id' => $olahraga->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],

            // Rumah Tangga
            [
                'name' => 'Stainless Steel Bottle',
                'description' => 'Botol minum tahan panas dan dingin.',
                'price' => 249000,
                'discount_price' => null,
                'stock' => 90,
                'category_id' => $rumahTangga->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Aromatherapy Diffuser',
                'description' => 'Pengharum ruangan elektronik.',
                'price' => 399000,
                'discount_price' => 349000,
                'stock' => 45,
                'category_id' => $rumahTangga->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Minimalist Wall Clock',
                'description' => 'Jam dinding desain minimalis.',
                'price' => 299000,
                'discount_price' => null,
                'stock' => 55,
                'category_id' => $rumahTangga->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],

            // Aksesoris
            [
                'name' => 'Aviator Sunglasses',
                'description' => 'Kacamata gaya klasik.',
                'price' => 899000,
                'discount_price' => null,
                'stock' => 30,
                'category_id' => $aksesoris->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Leather Watch Classic',
                'description' => 'Jam tangan kulit elegan.',
                'price' => 1499000,
                'discount_price' => 1299000,
                'stock' => 20,
                'category_id' => $aksesoris->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Canvas Backpack',
                'description' => 'Tas punggung bahan kanvas awet.',
                'price' => 449000,
                'discount_price' => null,
                'stock' => 60,
                'category_id' => $aksesoris->id,
                'seller_id' => $seller1->id,
                'is_active' => true,
                'is_featured' => false,
            ],
        ];

        foreach ($productsData as $data) {
            $data['slug'] = Str::slug($data['name']);
            $product = Product::create($data);

            // Create Image
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => 'images/products/' . $product->slug . '.jpg',
                'is_primary' => true,
            ]);

            // Create Review if buyer exists
            if ($buyer && rand(0, 1) === 1) {
                Review::create([
                    'product_id' => $product->id,
                    'user_id' => $buyer->id,
                    'rating' => rand(3, 5),
                    'comment' => 'Produk ini sangat bagus, sesuai deskripsi.',
                ]);
            }
        }

        // Add FlashSale
        $flashSaleProducts = Product::whereNotNull('discount_price')->take(3)->get();
        foreach ($flashSaleProducts as $product) {
            FlashSale::create([
                'product_id' => $product->id,
                'starts_at' => now()->subDay(),
                'ends_at' => now()->addDays(2),
                'discount_percent' => rand(10, 40),
                'is_active' => true,
            ]);
        }
    }
}
