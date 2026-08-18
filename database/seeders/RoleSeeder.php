<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'manage products',
            'view products',
            'manage orders',
            'checkout',
            'leave reviews',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $penjual = Role::firstOrCreate(['name' => 'penjual']);
        $penjual->syncPermissions(['manage products', 'view products', 'manage orders']);

        $pembeli = Role::firstOrCreate(['name' => 'pembeli']);
        $pembeli->syncPermissions(['view products', 'checkout', 'leave reviews']);
    }
}

