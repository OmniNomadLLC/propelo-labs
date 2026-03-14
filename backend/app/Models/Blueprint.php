<?php

namespace App\Models;

class Blueprint
{
    public string $id;
    public string $mitigation_id;
    public string $title;
    public array $phases;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'phases' => [],
        ];

        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->mitigation_id = $merged['mitigation_id'];
        $this->title = $merged['title'];
        $this->phases = $merged['phases'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'mitigation_id' => $this->mitigation_id,
            'title' => $this->title,
            'phases' => $this->phases,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
