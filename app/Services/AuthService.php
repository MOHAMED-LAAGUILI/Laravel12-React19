<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{

     
    public function create(array $data): User
    {
        return User::create([
            'username'    => $data['username'],
            'email'       => $data['email'],
            'password'    => bcrypt($data['password']),
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);
    }

    /**
     * Attempt login and return [user, token].
     */
    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }

    /**
     * Logout user by revoking all tokens.
     */
    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }
}
