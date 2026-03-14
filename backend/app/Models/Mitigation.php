<?php

namespace App\Models;

class Mitigation
{
    public string $id;
    public string $risk_id;
    public string $title;
    public string $description;
    public string $strategy;
    public string $status;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $this->id = $attributes['id'];
        $this->risk_id = $attributes['risk_id'];
        $this->title = $attributes['title'];
        $this->description = $attributes['description'];
        $this->strategy = $attributes['strategy'];
        $this->status = $attributes['status'];
        $this->created_at = $attributes['created_at'];
        $this->updated_at = $attributes['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'risk_id' => $this->risk_id,
            'title' => $this->title,
            'description' => $this->description,
            'strategy' => $this->strategy,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
