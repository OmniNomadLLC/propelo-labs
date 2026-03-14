<?php

namespace App\Services;

use App\Models\Blueprint;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;

class BlueprintStore
{
    protected static function basePath(): string
    {
        return base_path('data/blueprints');
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
        $items = [];
        foreach (File::glob(self::basePath().'/*.json') as $file) {
            $decoded = json_decode(File::get($file), true);
            if ($decoded) {
                $items[] = new Blueprint($decoded);
            }
        }

        return array_map(fn (Blueprint $blueprint) => $blueprint->toArray(), $items);
    }

    public static function forMission(string $missionId): array
    {
        return array_values(array_filter(self::all(), fn ($blueprint) => $blueprint['mission_id'] === $missionId));
    }

    public static function forMitigation(string $mitigationId): array
    {
        return array_values(array_filter(self::all(), fn ($blueprint) => ($blueprint['mitigation_id'] ?? null) === $mitigationId));
    }

    public static function find(string $id): ?Blueprint
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Blueprint($decoded) : null;
    }

    public static function create(array $attributes): Blueprint
    {
        $now = Carbon::now()->toISOString();
        $blueprint = new Blueprint(self::buildPayload($attributes, $now));

        self::store($blueprint);

        return $blueprint;
    }

    public static function update(Blueprint $blueprint, array $attributes): Blueprint
    {
        $payload = array_merge($blueprint->toArray(), $attributes, [
            'id' => $blueprint->id,
            'mission_id' => $attributes['mission_id'] ?? $blueprint->mission_id,
            'created_at' => $blueprint->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        $blueprint = new Blueprint(self::buildPayload($payload, $payload['updated_at']));

        self::store($blueprint);

        return $blueprint;
    }

    public static function delete(Blueprint $blueprint): void
    {
        self::ensureDirectory();
        $path = self::pathFor($blueprint->id);
        if (File::exists($path)) {
            File::delete($path);
        }
    }

    protected static function store(Blueprint $blueprint): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($blueprint->id), json_encode($blueprint->toArray(), JSON_PRETTY_PRINT));
    }

    protected static function buildPayload(array $attributes, string $timestamp): array
    {
        $components = self::normalizeArray($attributes['components'] ?? $attributes['phases'] ?? []);
        $techStack = self::normalizeValueArray($attributes['tech_stack'] ?? []);
        $decisions = self::normalizeValueArray($attributes['decisions'] ?? []);
        $risks = self::normalizeValueArray($attributes['risks'] ?? []);
        $mitigations = self::normalizeValueArray($attributes['mitigations'] ?? []);
        $phases = self::normalizeArray($attributes['phases'] ?? $components);

        return [
            'id' => $attributes['id'] ?? uniqid('blueprint_'),
            'mission_id' => $attributes['mission_id'],
            'mitigation_id' => $attributes['mitigation_id'] ?? null,
            'title' => $attributes['title'] ?? '',
            'description' => $attributes['description'] ?? '',
            'components' => $components,
            'tech_stack' => $techStack,
            'decisions' => $decisions,
            'risks' => $risks,
            'mitigations' => $mitigations,
            'phases' => $phases,
            'created_at' => $attributes['created_at'] ?? $timestamp,
            'updated_at' => $timestamp,
        ];
    }

    protected static function normalizeArray(array $items): array
    {
        return array_values(array_map(function ($item) {
            if (is_array($item)) {
                return [
                    'id' => $item['id'] ?? uniqid('component_'),
                    'title' => $item['title'] ?? ($item['name'] ?? ''),
                    'description' => $item['description'] ?? '',
                ];
            }

            return [
                'id' => uniqid('component_'),
                'title' => (string) $item,
                'description' => '',
            ];
        }, $items));
    }

    protected static function normalizeValueArray($value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return array_values(array_map('strval', $value));
    }
}
