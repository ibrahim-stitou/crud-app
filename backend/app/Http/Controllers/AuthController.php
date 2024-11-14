<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; // Import Hash pour la comparaison
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Check if validation failed
        if ($validated === false) {
            return response()->json(['error' => 'Validation failed. Please provide email and password.'], 422);
        }

        $credentials = $request->only('email', 'password');

        try {
            // Find the user by email
            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                // User not found
                return response()->json(['error' => 'User not found'], 401);
            }

            if (!$user->can_login) {
                // User cannot log in
                return response()->json(['message' => 'This user cannot log in!'], 401);
            }

            // Check if the password matches
            if (!Hash::check($credentials['password'], $user->password)) {
                // Incorrect password
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Generate a JWT token
            $token = JWTAuth::fromUser($user);

            return response()->json(compact('token'));

        } catch (JWTException $e) {
            // Error creating token
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }



    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function getUser(){
        $users=User::all();
        return response()->json($users);
    }
}
