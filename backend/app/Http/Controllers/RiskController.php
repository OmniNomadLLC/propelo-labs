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

    public function store(Request $request): JsonResponse
    {
        $payload = $request->all();
        $decisionId = $payload['decision_id'] ?? null;
        if (! is_string($decisionId) || $decisionId === '') {
            return response()->json(['error' => 'decision_id_required'], 422);
        }

        $decision = DecisionStore::find($decisionId);
        if (! $decision) {
            return response()->json(['error' => 'decision_not_found'], 404);
        }

        $payload['decision_id'] = $decisionId;
        $risk = RiskStore::create($payload);
        DecisionStore::addRiskReference($decision, $risk->id);

        return response()->json([
            'id' => $risk->id,
            'decision_id' => $risk->decision_id,
            'title' => $risk->title,
        ], 201);
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
            'description' => ['sometimes', 'string'],
            'likelihood' => ['sometimes', 'string', 'max:100'],
            'impact' => ['sometimes', 'string', 'max:100'],
            'severity_score' => ['sometimes'],
            'status' => ['sometimes', 'string', 'max:50'],
            'mitigations' => ['sometimes', 'array'],
        ];

        return $this->validate($request, $rules);
    }
}
