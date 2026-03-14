<?php

namespace App\Services;

use App\Models\Snapshot;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Carbon;
use App\Services\MissionStore;
use App\Services\DecisionStore;
use App\Services\RiskStore;
use App\Services\MitigationStore;
use App\Services\BlueprintStore;
use App\Services\TaskStore;

class SnapshotStore
{
    protected static function basePath(): string
    {
        return base_path('data/snapshots');
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
        $snapshots = [];
        foreach (File::glob(self::basePath().'/*.json') as $file) {
            $decoded = json_decode(File::get($file), true);
            if ($decoded) {
                $snapshots[] = new Snapshot($decoded);
            }
        }

        return array_map(fn (Snapshot $snapshot) => $snapshot->toArray(), $snapshots);
    }

    public static function forMission(string $missionId): array
    {
        return array_values(array_filter(self::all(), fn ($snapshot) => $snapshot['mission_id'] === $missionId));
    }

    public static function find(string $id): ?Snapshot
    {
        self::ensureDirectory();
        $path = self::pathFor($id);
        if (! File::exists($path)) {
            return null;
        }

        $decoded = json_decode(File::get($path), true);
        return $decoded ? new Snapshot($decoded) : null;
    }

    public static function create(array $attributes): Snapshot
    {
        $missionId = $attributes['mission_id'];
        $mission = MissionStore::find($missionId);
        if (! $mission) {
            throw new \RuntimeException('mission_not_found');
        }

        $now = Carbon::now()->toISOString();
        $decisions = DecisionStore::forMission($missionId);
        $risks = RiskStore::forMission($missionId);
        $mitigations = MitigationStore::forMission($missionId);
        $blueprints = BlueprintStore::forMission($missionId);
        $tasks = TaskStore::forMission($missionId);

        $snapshot = new Snapshot([
            'id' => $attributes['id'] ?? uniqid('snapshot_'),
            'mission_id' => $missionId,
            'title' => $attributes['title'] ?? ($mission->title ?? 'Snapshot'),
            'mission' => $mission->toArray(),
            'decisions' => $decisions,
            'risks' => $risks,
            'mitigations' => $mitigations,
            'blueprints' => $blueprints,
            'tasks' => $tasks,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        self::store($snapshot);

        return $snapshot;
    }

    protected static function store(Snapshot $snapshot): void
    {
        self::ensureDirectory();
        File::put(self::pathFor($snapshot->id), json_encode($snapshot->toArray(), JSON_PRETTY_PRINT));
    }
}
