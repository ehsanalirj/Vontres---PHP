<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\CallController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('agents', AgentController::class);

    Route::post('/calls', [CallController::class, 'initiateCall']);
    Route::post('/calls/{call}/end', [CallController::class, 'endCall']);
    Route::post('/calls/{call}/analyze', [CallController::class, 'analyzeCall']);
});

Route::post('/twilio/twiml', [CallController::class, 'generateTwiML'])->name('twilio.twiml');