<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Fetch all users, with caching to avoid repeated database calls
    public function index()
    {
        $users = Cache::remember('users', 3600, function () {
            return User::all(); // Cache the users for 1 hour (3600 seconds)
        });

        return response()->json($users);
    }

    // Fetch a single user by ID
    public function show($id)
    {
        $user = Cache::remember("user_{$id}", 3600, function () use ($id) {
            return User::find($id);
        });

        if ($user) {
            return response()->json($user);
        }

        return response()->json(['error' => 'User not found'], 404);
    }

    // Create a new user
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'prenom' => 'required|string',
            'specialite' => 'nullable|string',
            'date_naissance' => 'nullable|date',
            'niveau_etude' => 'nullable|string',
            'can_login' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->prenom = $request->prenom;
        $user->specialite = $request->specialite;
        $user->date_naissance = $request->date_naissance;
        $user->niveau_etude = $request->niveau_etude;
        $user->can_login = $request->can_login ?? false;
        $user->password = Hash::make($request->password);
        $user->save();

        // Clear cached data after creating a new user
        Cache::forget('users');

        return response()->json($user, 201);
    }

    // Update an existing user
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->update($request->all());

        // Clear cached data after updating the user
        Cache::forget('user_' . $id);
        Cache::forget('users');

        return response()->json($user);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        // Clear cached data after deleting the user
        Cache::forget('user_' . $id);
        Cache::forget('users');

        return response()->json(['message' => 'User deleted successfully']);
    }
}
