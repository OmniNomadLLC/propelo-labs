<?php

namespace App\Http\Controllers;

use App\Services\BlueprintStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BlueprintController extends Controller
{
    public function forMitigation(string $mitigationId): JsonResponse
    {
        return response()->json(BlueprintStore::forMitigation($mitigationId));
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validatedData($request);
        $blueprint = BlueprintStore::create($data);

        return response()->json($blueprint->toArray(), 201);
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
            'mitigation_id' => [$partial ? 'sometimes' : 'required', 'string'],
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'phases' => ['sometimes', 'array'],
            'phases.*.id' => ['sometimes', 'string'],
            'phases.*.title' => ['required_with:phases', 'string', 'max:200'],
            'phases.*.description' => ['nullable', 'string'],
        ];

        return $this->validate($request, $rules);
    }
}
