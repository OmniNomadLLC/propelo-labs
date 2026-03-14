<?php

namespace App\Http\Controllers;

use App\Services\DecisionStore;
use App\Services\MissionStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DecisionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $missionId = $request->query('mission_id');
        if ($missionId) {
            return response()->json(DecisionStore::forMission($missionId));
        }

        return response()->json(DecisionStore::all());
    }

    public function forMission(string $missionId): JsonResponse
    {
        $mission = MissionStore::find($missionId);
        if (! $mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        return response()->json(DecisionStore::forMission($missionId));
    }

    public function show(string $id): JsonResponse
    {
        $decision = DecisionStore::find($id);
        if (! $decision) {
            return response()->json(['message' => 'Decision not found'], 404);
        }

        return response()->json($decision->toArray());
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->all();
        $missionId = $payload['mission_id'] ?? null;
        if (! is_string($missionId) || $missionId === '') {
            return response()->json(['error' => 'mission_id_required'], 422);
        }

        $mission = MissionStore::find($missionId);
        if (! $mission) {
            return response()->json(['error' => 'mission_not_found'], 404);
        }

        $payload['mission_id'] = $missionId;
        $decision = DecisionStore::create($payload);
        MissionStore::addDecisionReference($decision->mission_id, $decision->id);

        return response()->json([
            'id' => $decision->id,
            'mission_id' => $decision->mission_id,
            'title' => $decision->title,
        ], 201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $decision = DecisionStore::find($id);
        if (! $decision) {
            return response()->json(['message' => 'Decision not found'], 404);
        }

        $data = $this->validateDecision($request, partial: true);
        $updated = DecisionStore::update($decision, $data);

        return response()->json($updated->toArray());
    }

    /**
     * @throws ValidationException
     */
    protected function validateDecision(Request $request, bool $partial = false): array
    {
        $rules = [
            'mission_id' => [$partial ? 'sometimes' : 'required', 'string'],
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'description' => [$partial ? 'sometimes' : 'required', 'string'],
            'alternatives' => ['sometimes', 'array'],
            'alternatives.*' => ['string'],
            'chosen' => ['sometimes', 'string'],
            'rationale' => ['sometimes', 'string'],
            'reasoning' => ['sometimes', 'string'],
            'confidence' => ['sometimes', 'numeric'],
            'impact' => ['sometimes', 'string'],
        ];

        return $this->validate($request, $rules);
    }
}
