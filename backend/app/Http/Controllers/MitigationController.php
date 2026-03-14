<?php

namespace App\Http\Controllers;

use App\Services\MitigationStore;
use App\Services\RiskStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MitigationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $riskId = $request->query('risk_id');
        if ($riskId) {
            return response()->json(MitigationStore::forRisk($riskId));
        }

        return response()->json(MitigationStore::all());
    }

    public function forRisk(string $riskId): JsonResponse
    {
        $risk = RiskStore::find($riskId);
        if (! $risk) {
            return response()->json(['message' => 'Risk not found'], 404);
        }

        return response()->json(MitigationStore::forRisk($riskId));
    }

    public function show(string $id): JsonResponse
    {
        $mitigation = MitigationStore::find($id);
        if (! $mitigation) {
            return response()->json(['message' => 'Mitigation not found'], 404);
        }

        return response()->json($mitigation->toArray());
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->all();
        $riskId = $payload['risk_id'] ?? null;
        if (! is_string($riskId) || $riskId === '') {
            return response()->json(['error' => 'risk_id_required'], 422);
        }

        $risk = RiskStore::find($riskId);
        if (! $risk) {
            return response()->json(['error' => 'risk_not_found'], 404);
        }

        $payload['risk_id'] = $riskId;
        $mitigation = MitigationStore::create($payload);
        RiskStore::addMitigationReference($risk, $mitigation->id);

        return response()->json([
            'id' => $mitigation->id,
            'risk_id' => $mitigation->risk_id,
            'title' => $mitigation->title,
        ], 201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $mitigation = MitigationStore::find($id);
        if (! $mitigation) {
            return response()->json(['message' => 'Mitigation not found'], 404);
        }

        $data = $this->validateMitigation($request, partial: true);
        $updated = MitigationStore::update($mitigation, $data);

        return response()->json($updated->toArray());
    }

    /**
     * @throws ValidationException
     */
    protected function validateMitigation(Request $request, bool $partial = false): array
    {
        $rules = [
            'risk_id' => [$partial ? 'sometimes' : 'required', 'string'],
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'description' => ['sometimes', 'string'],
            'strategy_type' => ['sometimes', 'string', 'max:100'],
            'effectiveness' => ['sometimes'],
            'cost' => ['sometimes', 'string', 'max:100'],
            'status' => ['sometimes', 'string', 'max:100'],
        ];

        return $this->validate($request, $rules);
    }
}
