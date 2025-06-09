<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
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

Route::get('users', [AuthController::class, 'users'])->name('users');
Route::put('user/{id}', [AuthController::class, 'updateUser'])->name('updateUser');
Route::delete('user/{id}', [AuthController::class, 'deleteUser'])->name('deleteUser');


