<?php

namespace App\Services;

use App\Models\Risk;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;

class RiskStore
{
    protected static function basePath(): string
    {
        return base_path('data/risks');
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
        $risks = [];
        foreach (File::glob(self::basePath().'/*.json') as $file) {
            $decoded = json_decode(File::get($file), true);
            if ($decoded) {
                $risks[] = new Risk($decoded);
            }
        }

        return array_map(fn (Risk $risk) => $risk->toArray(), $risks);
    }

    public static function forDecision(string $decisionId): array
    {
        return array_values(array_filter(self::all(), fn ($risk) => $risk['decision_id'] === $decisionId));
    }

    public static function find(string $id): ?Risk
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Risk($decoded) : null;
    }

    public static function create(array $attributes): Risk
    {
        $now = Carbon::now()->toISOString();
        $risk = new Risk(self::buildPayload($attributes, $now));

        self::store($risk);

        return $risk;
    }

    public static function update(Risk $risk, array $attributes): Risk
    {
        $payload = array_merge($risk->toArray(), $attributes, [
            'id' => $risk->id,
            'decision_id' => $risk->decision_id,
            'created_at' => $risk->created_at,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        $risk = new Risk(self::buildPayload($payload, $payload['updated_at']));

        self::store($risk);

        return $risk;
    }

    public static function addMitigationReference(Risk $risk, string $mitigationId): void
    {
        $mitigations = $risk->mitigations ?? [];
        if (! in_array($mitigationId, $mitigations, true)) {
            $mitigations[] = $mitigationId;
        }

        $payload = array_merge($risk->toArray(), [
            'mitigations' => $mitigations,
            'updated_at' => Carbon::now()->toISOString(),
        ]);

        $updated = new Risk(self::buildPayload($payload, $payload['updated_at']));

        self::store($updated);
    }

    protected static function store(Risk $risk): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($risk->id), json_encode($risk->toArray(), JSON_PRETTY_PRINT));
    }

    protected static function buildPayload(array $attributes, string $timestamp): array
    {
        return [
            'id' => $attributes['id'] ?? uniqid('risk_'),
            'decision_id' => $attributes['decision_id'],
            'title' => $attributes['title'] ?? '',
            'description' => $attributes['description'] ?? '',
            'likelihood' => $attributes['likelihood'] ?? '',
            'impact' => $attributes['impact'] ?? '',
            'severity_score' => $attributes['severity_score'] ?? null,
            'status' => $attributes['status'] ?? 'open',
            'mitigations' => is_array($attributes['mitigations'] ?? null) ? $attributes['mitigations'] : [],
            'created_at' => $attributes['created_at'] ?? $timestamp,
            'updated_at' => $timestamp,
        ];
    }
}
