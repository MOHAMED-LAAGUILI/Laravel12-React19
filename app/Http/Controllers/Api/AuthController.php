<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function users(Request $request)
    {
   // Optional: allow client to pass ?per_page=XX
   $perPage = $request->get('per_page', 10); // default 10 users per page

   return UserResource::collection(
       User::orderBy('id', 'asc')->paginate($perPage)
   );
    }

    public function create(Request $request)
    {
        $user = $this->authService->create($request->validated());

        return response()->json([
            'message' => 'User created successfully.',
        ], 201);
    }
    
    public function updateUser(Request $request, $id)
    {
        $user = $this->authService->update($request->all(), $id);

        return response()->json([
            'message' => 'User updated successfully.',
            'user'    => new UserResource($user),
        ], 200);
    }
    
    public function deleteUser($id)
    {
        $user = $this->authService->delete($id);

        return response()->json([
            'message' => 'User deleted successfully.',
        ], 200);
    }
    
    public function signup(SignupRequest $request): JsonResponse
    {
        $user = $this->authService->create($request->validated());

        return response()->json([
            'message' => 'User registered successfully.',
            'user'    => new UserResource($user),
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return response()->json([
            'message' => 'Login successful.',
            'user'    => new UserResource($result['user']),
            'token'   => $result['token'],
        ]);
    }


    
    public function logout(Request $request): JsonResponse
{
    /** @var \App\Models\User $user */

    $user = $request->user();

    if (!$user) {
        abort(401, 'Unauthorized');
    }

    $this->authService->logout($user);

    return response()->json([
        'message' => 'Logged out successfully.',
    ]);
}
    
}
