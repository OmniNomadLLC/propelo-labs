<?php

namespace App\Models;

class Task
{
    public string $id;
    public string $blueprint_id;
    public string $title;
    public string $description;
    public string $component;
    public string $type;
    public string $priority;
    public string $status;
    public string $estimated_effort;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'description' => '',
            'component' => '',
            'type' => '',
            'priority' => '',
            'status' => 'open',
            'estimated_effort' => '',
        ];

        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->blueprint_id = $merged['blueprint_id'];
        $this->title = $merged['title'];
        $this->description = $merged['description'];
        $this->component = $merged['component'];
        $this->type = $merged['type'];
        $this->priority = $merged['priority'];
        $this->status = $merged['status'];
        $this->estimated_effort = $merged['estimated_effort'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'blueprint_id' => $this->blueprint_id,
            'title' => $this->title,
            'description' => $this->description,
            'component' => $this->component,
            'type' => $this->type,
            'priority' => $this->priority,
            'status' => $this->status,
            'estimated_effort' => $this->estimated_effort,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
