<?php

namespace App\Services;

use App\Models\Decision;
use Illuminate\Support\Facades\File;
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
        $decision = new Decision(self::buildPayload($attributes, $now));

        self::store($decision);

        return $decision;
    }

    public static function update(Decision $decision, array $attributes): Decision
    {
        $payload = array_merge($decision->toArray(), $attributes, [
            'id' => $decision->id,
            'mission_id' => $decision->mission_id,
            'created_at' => $decision->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        $decision = new Decision(self::buildPayload($payload, $payload['updated_at']));

        self::store($decision);

        return $decision;
    }

    public static function addRiskReference(Decision $decision, string $riskId): void
    {
        $risks = $decision->risks ?? [];
        if (! in_array($riskId, $risks, true)) {
            $risks[] = $riskId;
        }

        $payload = array_merge($decision->toArray(), [
            'risks' => $risks,
            'id' => $decision->id,
            'mission_id' => $decision->mission_id,
            'created_at' => $decision->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        $updated = new Decision(self::buildPayload($payload, $payload['updated_at']));

        self::store($updated);
    }

    protected static function store(Decision $decision): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($decision->id), json_encode($decision->toArray(), JSON_PRETTY_PRINT));
    }

    protected static function buildPayload(array $attributes, string $timestamp): array
    {
        $alternatives = $attributes['alternatives'] ?? [];
        if (! is_array($alternatives)) {
            $alternatives = [];
        }

        return [
            'id' => $attributes['id'] ?? uniqid('decision_'),
            'mission_id' => $attributes['mission_id'],
            'title' => $attributes['title'] ?? '',
            'description' => $attributes['description'] ?? '',
            'alternatives' => $alternatives,
            'chosen' => $attributes['chosen'] ?? '',
            'rationale' => $attributes['rationale'] ?? '',
            'reasoning' => $attributes['reasoning'] ?? ($attributes['rationale'] ?? $attributes['description'] ?? ''),
            'confidence' => isset($attributes['confidence']) ? (float) $attributes['confidence'] : 0,
            'impact' => $attributes['impact'] ?? ($attributes['chosen'] ?? ''),
            'risks' => is_array($attributes['risks'] ?? null) ? $attributes['risks'] : [],
            'created_at' => $attributes['created_at'] ?? $timestamp,
            'updated_at' => $timestamp,
        ];
    }
}
