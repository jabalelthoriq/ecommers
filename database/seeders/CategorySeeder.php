<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Fashion', 'slug' => 'fashion', 'description' => 'Pakaian, sepatu, dan aksesoris terkini', 'image' => 'images/categories/fashion.jpg'],
            ['name' => 'Elektronik', 'slug' => 'elektronik', 'description' => 'Gadget, audio, dan perangkat elektronik', 'image' => 'images/categories/elektronik.jpg'],
            ['name' => 'Kecantikan', 'slug' => 'kecantikan', 'description' => 'Skincare, makeup, dan perawatan tubuh', 'image' => 'images/categories/kecantikan.jpg'],
            ['name' => 'Olahraga', 'slug' => 'olahraga', 'description' => 'Peralatan fitness dan olahraga', 'image' => 'images/categories/olahraga.jpg'],
            ['name' => 'Rumah Tangga', 'slug' => 'rumah-tangga', 'description' => 'Dekorasi dan peralatan rumah', 'image' => 'images/categories/rumah-tangga.jpg'],
            ['name' => 'Aksesoris', 'slug' => 'aksesoris', 'description' => 'Jam tangan, kacamata, dan aksesoris lainnya', 'image' => 'images/categories/aksesoris.jpg'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
