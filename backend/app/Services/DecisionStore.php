<?php

namespace App\Services;

use App\Models\Decision;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class DecisionStore
{
    protected static function basePath(): string
    {
        return base_path('data/decisions');
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
        $decisions = [];
        foreach (File::glob(self::basePath().'/*.json') as $file) {
            $decoded = json_decode(File::get($file), true);
            if ($decoded) {
                $decisions[] = new Decision($decoded);
            }
        }

        return array_map(fn (Decision $decision) => $decision->toArray(), $decisions);
    }

    public static function forMission(string $missionId): array
    {
        return array_values(array_filter(self::all(), fn ($decision) => $decision['mission_id'] === $missionId));
    }

    public static function find(string $id): ?Decision
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Decision($decoded) : null;
    }

    public static function create(array $attributes): Decision
    {
        $now = Carbon::now()->toISOString();
        $decision = new Decision([
            'id' => $attributes['id'] ?? 'decision_'.Str::uuid()->toString(),
            'mission_id' => $attributes['mission_id'],
            'title' => $attributes['title'],
            'reasoning' => $attributes['reasoning'],
            'confidence' => (float) $attributes['confidence'],
            'impact' => $attributes['impact'],
            'risks' => $attributes['risks'] ?? [],
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        self::store($decision);

        return $decision;
    }

    public static function update(Decision $decision, array $attributes): Decision
    {
        $decision = new Decision([
            'id' => $decision->id,
            'mission_id' => $decision->mission_id,
            'title' => $attributes['title'] ?? $decision->title,
            'reasoning' => $attributes['reasoning'] ?? $decision->reasoning,
            'confidence' => array_key_exists('confidence', $attributes) ? (float) $attributes['confidence'] : $decision->confidence,
            'impact' => $attributes['impact'] ?? $decision->impact,
            'risks' => $decision->risks,
            'created_at' => $decision->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        self::store($decision);

        return $decision;
    }

    public static function addRiskReference(Decision $decision, string $riskId): void
    {
        $risks = $decision->risks ?? [];
        if (! in_array($riskId, $risks, true)) {
            $risks[] = $riskId;
        }

        $updated = new Decision([
            'id' => $decision->id,
            'mission_id' => $decision->mission_id,
            'title' => $decision->title,
            'reasoning' => $decision->reasoning,
            'confidence' => $decision->confidence,
            'impact' => $decision->impact,
            'risks' => $risks,
            'created_at' => $decision->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        self::store($updated);
    }

    protected static function store(Decision $decision): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($decision->id), json_encode($decision->toArray(), JSON_PRETTY_PRINT));
    }
}
