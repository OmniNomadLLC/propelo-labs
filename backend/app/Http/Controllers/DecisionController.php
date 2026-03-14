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

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validateDecision($request);
        $mission = MissionStore::find($data['mission_id']);
        if (! $mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        $decision = DecisionStore::create($data);
        MissionStore::addDecisionReference($decision->mission_id, $decision->id);

        return response()->json($decision->toArray(), 201);
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
            'reasoning' => [$partial ? 'sometimes' : 'required', 'string'],
            'confidence' => [$partial ? 'sometimes' : 'required', 'numeric', 'between:0,1'],
            'impact' => [$partial ? 'sometimes' : 'required', 'string', 'max:100'],
        ];

        return $this->validate($request, $rules);
    }
}
