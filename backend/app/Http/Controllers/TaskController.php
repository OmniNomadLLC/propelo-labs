<?php

namespace App\Http\Controllers;

use App\Services\TaskStore;
use App\Services\BlueprintStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $blueprintId = $request->query('blueprint_id');
        if ($blueprintId) {
            return response()->json(TaskStore::forBlueprint($blueprintId));
        }

        return response()->json(TaskStore::all());
    }

    public function forBlueprint(string $blueprintId): JsonResponse
    {
        $blueprint = BlueprintStore::find($blueprintId);
        if (! $blueprint) {
            return response()->json(['message' => 'Blueprint not found'], 404);
        }

        return response()->json(TaskStore::forBlueprint($blueprintId));
    }

    public function show(string $id): JsonResponse
    {
        $task = TaskStore::find($id);
        if (! $task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task->toArray());
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $payload = $this->validatedData($request);
        $blueprintId = $payload['blueprint_id'];
        $blueprint = BlueprintStore::find($blueprintId);
        if (! $blueprint) {
            return response()->json(['error' => 'blueprint_not_found'], 404);
        }

        $task = TaskStore::create($payload);

        return response()->json([
            'id' => $task->id,
            'blueprint_id' => $task->blueprint_id,
            'title' => $task->title,
        ], 201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $task = TaskStore::find($id);
        if (! $task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $data = $this->validatedData($request, partial: true);
        $updated = TaskStore::update($task, $data);

        return response()->json($updated->toArray());
    }

    /**
     * @throws ValidationException
     */
    protected function validatedData(Request $request, bool $partial = false): array
    {
        $rules = [
            'blueprint_id' => [$partial ? 'sometimes' : 'required', 'string'],
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:200'],
            'description' => ['sometimes', 'string'],
            'component' => ['sometimes', 'string', 'max:200'],
            'type' => ['sometimes', 'string', 'max:100'],
            'priority' => ['sometimes', 'string', 'max:100'],
            'status' => ['sometimes', 'string', 'max:100'],
            'estimated_effort' => ['sometimes', 'string', 'max:100'],
        ];

        return $this->validate($request, $rules);
    }
}
