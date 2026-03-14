<?php

namespace App\Services;

use App\Models\Mission;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class MissionStore
{
    protected static function basePath(): string
    {
        return base_path('data/missions');
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
        $missions = [];
        foreach (File::glob(self::basePath().'/*.json') as $file) {
            $decoded = json_decode(File::get($file), true);
            if ($decoded) {
                $missions[] = new Mission($decoded);
            }
        }

        return array_map(fn (Mission $mission) => $mission->toArray(), $missions);
    }

    public static function find(string $id): ?Mission
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Mission($decoded) : null;
    }

    public static function create(array $attributes): Mission
    {
        $now = Carbon::now()->toISOString();
        $mission = new Mission([
            'id' => $attributes['id'] ?? 'mission_'.Str::uuid()->toString(),
            'title' => $attributes['title'],
            'problem' => $attributes['problem'],
            'constraints' => $attributes['constraints'],
            'success_criteria' => $attributes['success_criteria'],
            'decisions' => $attributes['decisions'] ?? [],
            'risks' => $attributes['risks'] ?? [],
            'blueprints' => $attributes['blueprints'] ?? [],
            'tasks' => $attributes['tasks'] ?? [],
            'snapshots' => $attributes['snapshots'] ?? [],
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        self::store($mission);

        return $mission;
    }

    public static function update(Mission $mission, array $attributes): Mission
    {
        $mission = new Mission([
            'id' => $mission->id,
            'title' => $attributes['title'] ?? $mission->title,
            'problem' => $attributes['problem'] ?? $mission->problem,
            'constraints' => $attributes['constraints'] ?? $mission->constraints,
            'success_criteria' => $attributes['success_criteria'] ?? $mission->success_criteria,
            'decisions' => $attributes['decisions'] ?? $mission->decisions,
            'risks' => $attributes['risks'] ?? $mission->risks,
            'blueprints' => $attributes['blueprints'] ?? $mission->blueprints,
            'tasks' => $attributes['tasks'] ?? $mission->tasks,
            'snapshots' => $attributes['snapshots'] ?? $mission->snapshots,
            'created_at' => $mission->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        self::store($mission);

        return $mission;
    }

    public static function addDecisionReference(string $missionId, string $decisionId): void
    {
        $mission = self::find($missionId);
        if (! $mission) {
            return;
        }

        $decisions = $mission->decisions;
        if (! in_array($decisionId, $decisions, true)) {
            $decisions[] = $decisionId;
        }

        $updated = new Mission([
            'id' => $mission->id,
            'title' => $mission->title,
            'problem' => $mission->problem,
            'constraints' => $mission->constraints,
            'success_criteria' => $mission->success_criteria,
            'decisions' => $decisions,
            'risks' => $mission->risks,
            'blueprints' => $mission->blueprints,
            'tasks' => $mission->tasks,
            'snapshots' => $mission->snapshots,
            'created_at' => $mission->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        self::store($updated);
    }

    protected static function store(Mission $mission): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($mission->id), json_encode($mission->toArray(), JSON_PRETTY_PRINT));
    }
}
