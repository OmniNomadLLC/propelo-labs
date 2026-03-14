<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Services\MissionStore;

class MissionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(MissionStore::all());
    }

    public function show(string $id): JsonResponse
    {
        $mission = MissionStore::find($id);
        if (! $mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        return response()->json($mission->toArray());
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validateMission($request);
        $mission = MissionStore::create($data);

        return response()->json($mission->toArray(), 201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $mission = MissionStore::find($id);
        if (! $mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        $data = $this->validateMission($request, partial: true);
        $updated = MissionStore::update($mission, $data);

        return response()->json($updated->toArray());
    }

    /**
     * @throws ValidationException
     */
    protected function validateMission(Request $request, bool $partial = false): array
    {
        $rules = [
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'problem' => [$partial ? 'sometimes' : 'required', 'string'],
            'constraints' => [$partial ? 'sometimes' : 'required', 'string'],
            'success_criteria' => [$partial ? 'sometimes' : 'required', 'string'],
        ];

        return $this->validate($request, $rules);
    }
}
