<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\CustomerStatusController;
use App\Http\Controllers\LogStatusController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionTypeController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\BillingCycleController;
use App\Http\Controllers\SubscriptionController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/sign-up', [EmailController::class, 'create']);

Route::get('/session', function () {
    return response()->json(session());
});

// Sanctum-protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Users
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [CustomerController::class, 'store']);
    Route::get('/users/{id}', [CustomerController::class, 'show']);
    Route::put('/users/{id}', [CustomerController::class, 'update']);
    Route::delete('/users/{id}', [CustomerController::class, 'destroy']);

    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    // Logs
    Route::get('/logs', [LogController::class, 'index']);
    Route::post('/logs', [LogController::class, 'store']);
    Route::get('/logs/{id}', [LogController::class, 'show']);
    Route::put('/logs/{id}', [LogController::class, 'update']);
    Route::delete('/logs/{id}', [LogController::class, 'destroy']);

    // Customer Statuses
    Route::get('/customer-statuses', [CustomerStatusController::class, 'index']);
    Route::post('/customer-statuses', [CustomerStatusController::class, 'store']);
    Route::get('/customer-statuses/{id}', [CustomerStatusController::class, 'show']);
    Route::put('/customer-statuses/{id}', [CustomerStatusController::class, 'update']);
    Route::delete('/customer-statuses/{id}', [CustomerStatusController::class, 'destroy']);

    // Log Statuses
    Route::get('/log-statuses', [LogStatusController::class, 'index']);
    Route::post('/log-statuses', [LogStatusController::class, 'store']);
    Route::get('/log-statuses/{id}', [LogStatusController::class, 'show']);
    Route::put('/log-statuses/{id}', [LogStatusController::class, 'update']);
    Route::delete('/log-statuses/{id}', [LogStatusController::class, 'destroy']);

    // Transactions
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);

    // Transaction Types
    Route::get('/transaction-types', [TransactionTypeController::class, 'index']);
    Route::post('/transaction-types', [TransactionTypeController::class, 'store']);
    Route::get('/transaction-types/{id}', [TransactionTypeController::class, 'show']);
    Route::put('/transaction-types/{id}', [TransactionTypeController::class, 'update']);
    Route::delete('/transaction-types/{id}', [TransactionTypeController::class, 'destroy']);

    // Currencies
    Route::get('/currencies', [CurrencyController::class, 'index']);
    Route::post('/currencies', [CurrencyController::class, 'store']);
    Route::get('/currencies/{id}', [CurrencyController::class, 'show']);
    Route::put('/currencies/{id}', [CurrencyController::class, 'update']);
    Route::delete('/currencies/{id}', [CurrencyController::class, 'destroy']);

    // Billing Cycles
    Route::get('/billing-cycles', [BillingCycleController::class, 'index']);
    Route::post('/billing-cycles', [BillingCycleController::class, 'store']);
    Route::get('/billing-cycles/{id}', [BillingCycleController::class, 'show']);
    Route::put('/billing-cycles/{id}', [BillingCycleController::class, 'update']);
    Route::delete('/billing-cycles/{id}', [BillingCycleController::class, 'destroy']);

    // Subscriptions
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::post('/subscriptions', [SubscriptionController::class, 'store']);
    Route::get('/subscriptions/{id}', [SubscriptionController::class, 'show']);
    Route::put('/subscriptions/{id}', [SubscriptionController::class, 'update']);
    Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy']);
});
