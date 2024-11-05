<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    
    if ($credentials['email'] === 'stitou.brahim.stitou@gmail.com' && $credentials['password'] === 'stitou2002') {
        
        try {
         
            $user = User::where('email', $credentials['email'])->first();

           
            if ($user) {
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
