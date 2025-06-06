<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username'         => 'required|string|max:255|unique:users,username',
            'email'    => 'required|email|unique:users,email|max:50',
            'password' => [
                'required',
                'string',
                'max:50',
                'confirmed',
                Password::min(8)
                ->letters()
                ->numbers()
                ->symbols()
                ->mixedCase(),
            ],
        ];
    }
}
