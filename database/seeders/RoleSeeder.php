<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Define role-permission mappings
        $roles = [
            'admin' => Permission::all()->pluck('name')->toArray(),

            'user' => [
                'users.view',
                'users.create',
                'users.update',
            ],

            'guest' => [
                'users.view',
            ],
        ];

        foreach ($roles as $roleName => $permissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($permissions);
        }
    }
}
