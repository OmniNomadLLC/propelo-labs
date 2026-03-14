<?php

namespace App\Models;

class Mission
{
    public string $id;
    public string $title;
    public string $problem;
    public string $constraints;
    public string $success_criteria;
    public array $decisions;
    public array $risks;
    public array $blueprints;
    public array $tasks;
    public array $snapshots;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'decisions' => [],
            'risks' => [],
            'blueprints' => [],
            'tasks' => [],
            'snapshots' => [],
        ];
        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->title = $merged['title'];
        $this->problem = $merged['problem'];
        $this->constraints = $merged['constraints'];
        $this->success_criteria = $merged['success_criteria'];
        $this->decisions = $merged['decisions'];
        $this->risks = $merged['risks'];
        $this->blueprints = $merged['blueprints'];
        $this->tasks = $merged['tasks'];
        $this->snapshots = $merged['snapshots'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'problem' => $this->problem,
            'constraints' => $this->constraints,
            'success_criteria' => $this->success_criteria,
            'decisions' => $this->decisions,
            'risks' => $this->risks,
            'blueprints' => $this->blueprints,
            'tasks' => $this->tasks,
            'snapshots' => $this->snapshots,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
