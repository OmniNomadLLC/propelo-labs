<?php

namespace App\Services;

use App\Models\Blueprint;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
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

    public static function forMitigation(string $mitigationId): array
    {
        return array_values(array_filter(self::all(), fn ($blueprint) => $blueprint['mitigation_id'] === $mitigationId));
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
        $blueprint = new Blueprint([
            'id' => $attributes['id'] ?? 'blueprint_'.Str::uuid()->toString(),
            'mitigation_id' => $attributes['mitigation_id'],
            'title' => $attributes['title'],
            'phases' => self::normalizePhases($attributes['phases'] ?? []),
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        self::store($blueprint);

        return $blueprint;
    }

    public static function update(Blueprint $blueprint, array $attributes): Blueprint
    {
        $phases = array_key_exists('phases', $attributes)
            ? self::normalizePhases($attributes['phases'] ?? [])
            : $blueprint->phases;

        $blueprint = new Blueprint([
            'id' => $blueprint->id,
            'mitigation_id' => $attributes['mitigation_id'] ?? $blueprint->mitigation_id,
            'title' => $attributes['title'] ?? $blueprint->title,
            'phases' => $phases,
            'created_at' => $blueprint->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

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

    protected static function normalizePhases(array $phases): array
    {
        return array_values(array_map(function ($phase) {
            return [
                'id' => $phase['id'] ?? 'phase_'.Str::uuid()->toString(),
                'title' => $phase['title'] ?? '',
                'description' => $phase['description'] ?? '',
            ];
        }, $phases));
    }
}
