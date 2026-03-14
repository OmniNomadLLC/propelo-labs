<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\DecisionController;
use App\Http\Controllers\RiskController;
use App\Http\Controllers\MitigationController;
use App\Http\Controllers\BlueprintController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SnapshotController;

Route::prefix('missions')->group(function () {
    Route::get('/', [MissionController::class, 'index']);
    Route::post('/', [MissionController::class, 'store']);
    Route::get('{id}', [MissionController::class, 'show']);
    Route::put('{id}', [MissionController::class, 'update']);
    Route::get('{id}/decisions', [DecisionController::class, 'forMission']);
    Route::get('{id}/blueprints', [BlueprintController::class, 'forMission']);
});

Route::prefix('decisions')->group(function () {
    Route::get('/', [DecisionController::class, 'index']);
    Route::post('/', [DecisionController::class, 'store']);
    Route::get('{id}', [DecisionController::class, 'show']);
    Route::put('{id}', [DecisionController::class, 'update']);
    Route::get('{id}/risks', [RiskController::class, 'forDecision']);
});

Route::prefix('risks')->group(function () {
    Route::get('/', [RiskController::class, 'index']);
    Route::post('/', [RiskController::class, 'store']);
    Route::get('{id}', [RiskController::class, 'show']);
    Route::put('{id}', [RiskController::class, 'update']);
    Route::get('{id}/mitigations', [MitigationController::class, 'forRisk']);
});

Route::prefix('mitigations')->group(function () {
    Route::get('/', [MitigationController::class, 'index']);
    Route::post('/', [MitigationController::class, 'store']);
    Route::get('{id}', [MitigationController::class, 'show']);
    Route::put('{id}', [MitigationController::class, 'update']);
    Route::get('{id}/blueprints', [BlueprintController::class, 'forMitigation']);
});

Route::prefix('blueprints')->group(function () {
    Route::post('/', [BlueprintController::class, 'store']);
    Route::put('{id}', [BlueprintController::class, 'update']);
    Route::delete('{id}', [BlueprintController::class, 'destroy']);
    Route::get('{id}/tasks', [TaskController::class, 'forBlueprint']);
});

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('{id}', [TaskController::class, 'show']);
    Route::put('{id}', [TaskController::class, 'update']);
});

Route::prefix('snapshots')->group(function () {
    Route::get('/', [SnapshotController::class, 'index']);
    Route::post('/', [SnapshotController::class, 'store']);
    Route::get('{id}', [SnapshotController::class, 'show']);
});
