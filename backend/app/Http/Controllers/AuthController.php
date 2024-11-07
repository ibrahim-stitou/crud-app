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
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        // Vérifier si l'email correspond
        if ($credentials['email'] === 'stitou.brahim.stitou@gmail.com') {
            try {
                // Trouver l'utilisateur avec cet email
                $user = User::where('email', $credentials['email'])->first();

                // Si l'utilisateur existe et le mot de passe correspond
                if ($user && Hash::check($credentials['password'], $user->password)) {
                    // Générer un token JWT
                    $token = JWTAuth::fromUser($user);
                    return response()->json(compact('token'));
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
        }

        return response()->json(['error' => 'invalid_credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
