<?php

namespace App\Http\Controllers;

use App\Services\BlueprintStore;
use App\Services\MissionStore;
use App\Services\MitigationStore;
use App\Services\RiskStore;
use App\Services\DecisionStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BlueprintController extends Controller
{
    public function forMission(string $missionId): JsonResponse
    {
        $mission = MissionStore::find($missionId);
        if (! $mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        return response()->json(BlueprintStore::forMission($missionId));
    }

    public function forMitigation(string $mitigationId): JsonResponse
    {
        return response()->json(BlueprintStore::forMitigation($mitigationId));
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $payload = $this->validatedData($request);
        $missionId = $payload['mission_id'] ?? null;
        if (! $missionId) {
            $missionId = $this->resolveMissionId($payload['mitigation_id'] ?? null);
        }

        if (! $missionId) {
            return response()->json(['error' => 'mission_id_required'], 422);
        }

        $mission = MissionStore::find($missionId);
        if (! $mission) {
            return response()->json(['error' => 'mission_not_found'], 404);
        }

        $payload['mission_id'] = $missionId;
        $blueprint = BlueprintStore::create($payload);

        return response()->json([
            'id' => $blueprint->id,
            'mission_id' => $blueprint->mission_id,
            'title' => $blueprint->title,
        ], 201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $blueprint = BlueprintStore::find($id);
        if (! $blueprint) {
            return response()->json(['message' => 'Blueprint not found'], 404);
        }

        $data = $this->validatedData($request, partial: true);
        $updated = BlueprintStore::update($blueprint, $data);

        return response()->json($updated->toArray());
    }

    public function destroy(string $id): JsonResponse
    {
        $blueprint = BlueprintStore::find($id);
        if (! $blueprint) {
            return response()->json(['message' => 'Blueprint not found'], 404);
        }

        BlueprintStore::delete($blueprint);

        return response()->json(status: 204);
    }

    /**
     * @throws ValidationException
     */
    protected function validatedData(Request $request, bool $partial = false): array
    {
        $rules = [
            'mission_id' => ['sometimes', 'string'],
            'mitigation_id' => ['sometimes', 'string'],
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'description' => ['sometimes', 'string'],
            'components' => ['sometimes', 'array'],
            'tech_stack' => ['sometimes', 'array'],
            'decisions' => ['sometimes', 'array'],
            'risks' => ['sometimes', 'array'],
            'mitigations' => ['sometimes', 'array'],
            'phases' => ['sometimes', 'array'],
        ];

        return $this->validate($request, $rules);
    }

    protected function resolveMissionId(?string $mitigationId): ?string
    {
        if (! $mitigationId) {
            return null;
        }

        $mitigation = MitigationStore::find($mitigationId);
        if (! $mitigation) {
            return null;
        }

        $risk = RiskStore::find($mitigation->risk_id);
        if (! $risk) {
            return null;
        }

        $decision = DecisionStore::find($risk->decision_id);
        if (! $decision) {
            return null;
        }

        return $decision->mission_id;
    }
}
