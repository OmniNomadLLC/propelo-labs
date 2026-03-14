<?php

namespace App\Models;

class Blueprint
{
    public string $id;
    public string $mission_id;
    public ?string $mitigation_id;
    public string $title;
    public string $description;
    public array $components;
    public array $tech_stack;
    public array $decisions;
    public array $risks;
    public array $mitigations;
    public array $phases;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'description' => '',
            'components' => [],
            'tech_stack' => [],
            'decisions' => [],
            'risks' => [],
            'mitigations' => [],
            'phases' => [],
            'mitigation_id' => null,
        ];

        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->mission_id = $merged['mission_id'];
        $this->mitigation_id = $merged['mitigation_id'];
        $this->title = $merged['title'];
        $this->description = $merged['description'];
        $this->components = $merged['components'];
        $this->tech_stack = $merged['tech_stack'];
        $this->decisions = $merged['decisions'];
        $this->risks = $merged['risks'];
        $this->mitigations = $merged['mitigations'];
        $this->phases = $merged['phases'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'mission_id' => $this->mission_id,
            'mitigation_id' => $this->mitigation_id,
            'title' => $this->title,
            'description' => $this->description,
            'components' => $this->components,
            'tech_stack' => $this->tech_stack,
            'decisions' => $this->decisions,
            'risks' => $this->risks,
            'mitigations' => $this->mitigations,
            'phases' => $this->phases,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
