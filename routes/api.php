<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'signup'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::get('users', [AuthController::class, 'users'])->name('usersIndex');
Route::put('user/{id}', [AuthController::class, 'updateUser'])->name('updateUser');
Route::delete('user/{id}', [AuthController::class, 'deleteUser'])->name('deleteUser');

Route::get('permissions', [PermissionController::class, 'index'])->name('permissionsIndex');
Route::post('permissions', [PermissionController::class, 'store'])->name('storePermissions');
Route::put('permissions/{id}', [PermissionController::class, 'update'])->name('updatePermissions');
Route::delete('permissions/{id}', [PermissionController::class, 'destroy'])->name('deletePermissions');

Route::get('roles', [RoleController::class, 'index'])->name('rolesIndex');
Route::post('roles', [RoleController::class, 'store'])->name('storeRoles');
Route::put('roles/{id}', [RoleController::class, 'update'])->name('updateRoles');
Route::delete('roles/{id}', [RoleController::class, 'destroy'])->name('deleteRoles');




