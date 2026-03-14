<?php

namespace App\Http\Controllers;

use App\Services\DecisionStore;
use App\Services\RiskStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RiskController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $decisionId = $request->query('decision_id');
        if ($decisionId) {
            return response()->json(RiskStore::forDecision($decisionId));
        }

        return response()->json(RiskStore::all());
    }

    public function forDecision(string $decisionId): JsonResponse
    {
        $decision = DecisionStore::find($decisionId);
        if (! $decision) {
            return response()->json(['message' => 'Decision not found'], 404);
        }

        return response()->json(RiskStore::forDecision($decisionId));
    }

    public function show(string $id): JsonResponse
    {
        $risk = RiskStore::find($id);
        if (! $risk) {
            return response()->json(['message' => 'Risk not found'], 404);
        }

        return response()->json($risk->toArray());
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validateRisk($request);
        $decision = DecisionStore::find($data['decision_id']);
        if (! $decision) {
            return response()->json(['message' => 'Decision not found'], 404);
        }

        $risk = RiskStore::create($data);
        DecisionStore::addRiskReference($decision, $risk->id);

        return response()->json($risk->toArray(), 201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $risk = RiskStore::find($id);
        if (! $risk) {
            return response()->json(['message' => 'Risk not found'], 404);
        }

        $data = $this->validateRisk($request, partial: true);
        $updated = RiskStore::update($risk, $data);

        return response()->json($updated->toArray());
    }

    /**
     * @throws ValidationException
     */
    protected function validateRisk(Request $request, bool $partial = false): array
    {
        $rules = [
            'decision_id' => [$partial ? 'sometimes' : 'required', 'string'],
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'description' => [$partial ? 'sometimes' : 'required', 'string'],
            'severity' => [$partial ? 'sometimes' : 'required', 'string', 'max:50'],
            'likelihood' => [$partial ? 'sometimes' : 'required', 'string', 'max:50'],
            'mitigation' => [$partial ? 'sometimes' : 'required', 'string'],
        ];

        return $this->validate($request, $rules);
    }
}
