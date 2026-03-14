<?php

namespace App\Http\Controllers;

use App\Services\SnapshotStore;
use App\Services\MissionStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SnapshotController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $missionId = $request->query('mission_id');
        if ($missionId) {
            return response()->json(SnapshotStore::forMission($missionId));
        }

        return response()->json(SnapshotStore::all());
    }

    public function show(string $id): JsonResponse
    {
        $snapshot = SnapshotStore::find($id);
        if (! $snapshot) {
            return response()->json(['message' => 'Snapshot not found'], 404);
        }

        return response()->json($snapshot->toArray());
    }

    public function store(Request $request): JsonResponse
    {
        $missionId = $request->input('mission_id');
        if (! is_string($missionId) || $missionId === '') {
            return response()->json(['error' => 'mission_id_required'], 422);
        }

        $mission = MissionStore::find($missionId);
        if (! $mission) {
            return response()->json(['error' => 'mission_not_found'], 404);
        }

        try {
            $snapshot = SnapshotStore::create([
                'mission_id' => $missionId,
                'title' => $request->input('title'),
            ]);
        } catch (\RuntimeException $exception) {
            if ($exception->getMessage() === 'mission_not_found') {
                return response()->json(['error' => 'mission_not_found'], 404);
            }
            throw $exception;
        }

        return response()->json([
            'id' => $snapshot->id,
            'mission_id' => $snapshot->mission_id,
            'title' => $snapshot->title,
        ], 201);
    }
}
