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

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validateMitigation($request);
        $risk = RiskStore::find($data['risk_id']);
        if (! $risk) {
            return response()->json(['message' => 'Risk not found'], 404);
        }

        $mitigation = MitigationStore::create($data);
        RiskStore::addMitigationReference($risk, $mitigation->id);

        return response()->json($mitigation->toArray(), 201);
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
            'description' => [$partial ? 'sometimes' : 'required', 'string'],
            'strategy' => [$partial ? 'sometimes' : 'required', 'string', 'max:100'],
            'status' => [$partial ? 'sometimes' : 'required', 'string', 'max:100'],
        ];

        return $this->validate($request, $rules);
    }
}
