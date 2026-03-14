<?php

namespace App\Models;

class Mitigation
{
    public string $id;
    public string $risk_id;
    public string $title;
    public string $description;
    public string $strategy_type;
    public $effectiveness;
    public string $cost;
    public string $status;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'description' => '',
            'strategy_type' => '',
            'effectiveness' => null,
            'cost' => '',
            'status' => 'proposed',
        ];
        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->risk_id = $merged['risk_id'];
        $this->title = $merged['title'];
        $this->description = $merged['description'];
        $this->strategy_type = $merged['strategy_type'];
        $this->effectiveness = $merged['effectiveness'];
        $this->cost = $merged['cost'];
        $this->status = $merged['status'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'risk_id' => $this->risk_id,
            'title' => $this->title,
            'description' => $this->description,
            'strategy_type' => $this->strategy_type,
            'effectiveness' => $this->effectiveness,
            'cost' => $this->cost,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
