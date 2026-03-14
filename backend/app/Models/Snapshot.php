<?php

namespace App\Models;

class Snapshot
{
    public string $id;
    public string $mission_id;
    public string $title;
    public array $mission;
    public array $decisions;
    public array $risks;
    public array $mitigations;
    public array $blueprints;
    public array $tasks;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'title' => '',
            'mission' => [],
            'decisions' => [],
            'risks' => [],
            'mitigations' => [],
            'blueprints' => [],
            'tasks' => [],
        ];

        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->mission_id = $merged['mission_id'];
        $this->title = $merged['title'];
        $this->mission = $merged['mission'];
        $this->decisions = $merged['decisions'];
        $this->risks = $merged['risks'];
        $this->mitigations = $merged['mitigations'];
        $this->blueprints = $merged['blueprints'];
        $this->tasks = $merged['tasks'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'mission_id' => $this->mission_id,
            'title' => $this->title,
            'mission' => $this->mission,
            'decisions' => $this->decisions,
            'risks' => $this->risks,
            'mitigations' => $this->mitigations,
            'blueprints' => $this->blueprints,
            'tasks' => $this->tasks,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
