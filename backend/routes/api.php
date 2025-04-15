<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/sign-up', [EmailController::class, 'create']);
Route::get('/emails', [EmailController::class, 'index'])->middleware('auth:sanctum');


Route::get('/session', function () {
    return response()->json(session());
});
