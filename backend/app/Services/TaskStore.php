<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;
use App\Services\BlueprintStore;

class TaskStore
{
    protected static function basePath(): string
    {
        return base_path('data/tasks');
    }

    protected static function ensureDirectory(): void
    {
        $path = self::basePath();
        if (! File::exists($path)) {
            File::makeDirectory($path, recursive: true);
        }
    }

    protected static function pathFor(string $id): string
    {
        return self::basePath().DIRECTORY_SEPARATOR.$id.'.json';
    }

    public static function all(): array
    {
        self::ensureDirectory();
        $tasks = [];
        foreach (File::glob(self::basePath().'/*.json') as $file) {
            $decoded = json_decode(File::get($file), true);
            if ($decoded) {
                $tasks[] = new Task($decoded);
            }
        }

        return array_map(fn (Task $task) => $task->toArray(), $tasks);
    }

    public static function forBlueprint(string $blueprintId): array
    {
        return array_values(array_filter(self::all(), fn ($task) => $task['blueprint_id'] === $blueprintId));
    }

    public static function forMission(string $missionId): array
    {
        $blueprints = BlueprintStore::forMission($missionId);
        $blueprintIds = array_map(fn ($bp) => $bp['id'], $blueprints);
        if (! $blueprintIds) {
            return [];
        }
        $map = array_flip($blueprintIds);

        return array_values(array_filter(self::all(), function ($task) use ($map) {
            return isset($map[$task['blueprint_id']]);
        }));
    }

    public static function find(string $id): ?Task
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Task($decoded) : null;
    }

    public static function create(array $attributes): Task
    {
        $now = Carbon::now()->toISOString();
        $task = new Task(self::buildPayload($attributes, $now));

        self::store($task);

        return $task;
    }

    public static function update(Task $task, array $attributes): Task
    {
        $payload = array_merge($task->toArray(), $attributes, [
            'id' => $task->id,
            'blueprint_id' => $task->blueprint_id,
            'created_at' => $task->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        $task = new Task(self::buildPayload($payload, $payload['updated_at']));

        self::store($task);

        return $task;
    }

    protected static function store(Task $task): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($task->id), json_encode($task->toArray(), JSON_PRETTY_PRINT));
    }

    protected static function buildPayload(array $attributes, string $timestamp): array
    {
        return [
            'id' => $attributes['id'] ?? uniqid('task_'),
            'blueprint_id' => $attributes['blueprint_id'],
            'title' => $attributes['title'] ?? '',
            'description' => $attributes['description'] ?? '',
            'component' => $attributes['component'] ?? '',
            'type' => $attributes['type'] ?? '',
            'priority' => $attributes['priority'] ?? '',
            'status' => $attributes['status'] ?? 'open',
            'estimated_effort' => $attributes['estimated_effort'] ?? '',
            'created_at' => $attributes['created_at'] ?? $timestamp,
            'updated_at' => $timestamp,
        ];
    }
}
