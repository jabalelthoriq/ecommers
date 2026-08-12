<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // $permissions = [
        //     'view articles',
        //     'create articles',
        //     'edit articles',
        //     'delete articles',
        // ];

        // foreach ($permissions as $permission) {
        //     Permission::create(['name' => $permission]);
        // }

        $userRole = Role::create(['name' => 'pembeli']);
        // $userRole->givePermissionTo(Permission::all());

        $adminRole = Role::create(['name' => 'penjual']);
        // $adminRole->givePermissionTo(Permission::all());

        User::factory(2)->create()->each(function ($user) use ($adminRole) {
            $user->assignRole($adminRole);
        });

        User::factory(10)->create()->each(function ($user) use ($userRole) {
            $user->assignRole($userRole);
        });

        // Admin Penjual
        $adminUser = User::create([
            'name' => 'Toko NovaTrend',
            'email' => 'seller@novatrend.com',
            'password' => Hash::make('password'),
            'phone' => '081234567890',
            'store_name' => 'NovaTrend Official',
            'store_description' => 'Toko fashion dan lifestyle terlengkap',
            'email_verified_at' => now(),
        ]);

        $adminUser->assignRole($adminRole);

        $seller2 = User::create([
            'name' => 'Toko Gadget',
            'email' => 'seller2@novatrend.com',
            'password' => Hash::make('password'),
            'phone' => '081234567891',
            'store_name' => 'Gadget Official',
            'store_description' => 'Toko elektronik terlengkap',
            'email_verified_at' => now(),
        ]);
        $seller2->assignRole($adminRole);

        $buyer = User::create([
            'name' => 'John Buyer',
            'email' => 'buyer@novatrend.com',
            'password' => Hash::make('password'),
            'phone' => '081234567892',
            'email_verified_at' => now(),
        ]);
        $buyer->assignRole($userRole);
    }
}
