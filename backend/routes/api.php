<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeneficierController;
use App\Http\Controllers\VilleController; // Note: changed villeController to VilleController
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Test route (for testing purpose)
Route::get('/test', function () {
    return response()->json(['message' => 'It\'s working very well']);
});

// User info route (for authenticated users)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Routes protected by JWT authentication
Route::middleware(['jwt.auth'])->group(function () {
    // CRUD Routes for beneficiaries, activities, and cities
    Route::apiResource('beneficiaires', BeneficierController::class);
    Route::apiResource('activites', ActiviteController::class);
    Route::apiResource('villes', VilleController::class); // Corrected the case for the controller name

    // Route to get the activities for a specific beneficiary
    Route::get('beneficiaires/{id}/activites', [BeneficierController::class, 'getActivites']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Login route for getting a JWT token
Route::post('/login', [AuthController::class, 'login']);
