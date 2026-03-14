<?php

namespace App\Services;

use App\Models\Mitigation;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class MitigationStore
{
    protected static function basePath(): string
    {
        return base_path('data/mitigations');
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
                $items[] = new Mitigation($decoded);
            }
        }

        return array_map(fn (Mitigation $mitigation) => $mitigation->toArray(), $items);
    }

    public static function forRisk(string $riskId): array
    {
        return array_values(array_filter(self::all(), fn ($mitigation) => $mitigation['risk_id'] === $riskId));
    }

    public static function find(string $id): ?Mitigation
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Mitigation($decoded) : null;
    }

    public static function create(array $attributes): Mitigation
    {
        $now = Carbon::now()->toISOString();
        $mitigation = new Mitigation([
            'id' => $attributes['id'] ?? 'mitigation_'.Str::uuid()->toString(),
            'risk_id' => $attributes['risk_id'],
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'strategy' => $attributes['strategy'],
            'status' => $attributes['status'],
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        self::store($mitigation);

        return $mitigation;
    }

    public static function update(Mitigation $mitigation, array $attributes): Mitigation
    {
        $mitigation = new Mitigation([
            'id' => $mitigation->id,
            'risk_id' => $mitigation->risk_id,
            'title' => $attributes['title'] ?? $mitigation->title,
            'description' => $attributes['description'] ?? $mitigation->description,
            'strategy' => $attributes['strategy'] ?? $mitigation->strategy,
            'status' => $attributes['status'] ?? $mitigation->status,
            'created_at' => $mitigation->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        self::store($mitigation);

        return $mitigation;
    }

    protected static function store(Mitigation $mitigation): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($mitigation->id), json_encode($mitigation->toArray(), JSON_PRETTY_PRINT));
    }
}
