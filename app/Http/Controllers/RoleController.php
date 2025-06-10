<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Role::query();

        // Search by username or email
        if ($search = $request->get('search')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 10); // default 10 users per page
        $roles = $query->orderBy('id', 'asc')->paginate($perPage);

        return response()->json([
            'data' => $roles->items(),
            'meta' => [
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'total' => $roles->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $role = Role::create([
            'name' => $request->name,
            'created_at' => now(),
            'updated_at' => now(),
            'permission_ids' => $request->permission_ids,
        ]);
        $role = Role::findOrFail($role->id); // or $role = Role::create([...]);
        // Convert permission_ids to names
        $permissionNames = [];
        if ($request->permission_ids) {
            $permissionNames = Permission::whereIn('id', $request->permission_ids)->pluck('name')->toArray();
        }
        
        $role->syncPermissions($permissionNames);

        return response()->json([
            'message' => 'Role created successfully.',
            'role' => $role,
            'permissions' => $role->permissions,
        ], 201);
    }

 

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->all());

        // Sync permissions if provided
        if ($request->has('permission_ids')) {
            $permissionNames = \Spatie\Permission\Models\Permission::whereIn('id', $request->permission_ids)->pluck('name')->toArray();
            $role->syncPermissions($permissionNames);
        }

        return response()->json([
            'message' => 'Role updated successfully.',
            'role' => $role,
            'permissions' => $role->permissions,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'message' => 'Role deleted successfully.',
        ], 200);
    }
}
