<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeneficierController;
use App\Http\Controllers\villeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/test',function(){
    return response()->json(['message','its wor very well']);
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['jwt.auth'])->group(function () {
    Route::apiResource('beneficiaires', BeneficierController::class);
    Route::apiResource('activites', ActiviteController::class);
    Route::apiResource('villes', villeController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);