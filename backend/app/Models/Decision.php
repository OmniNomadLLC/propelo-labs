<?php

namespace App\Models;

class Decision
{
    public string $id;
    public string $mission_id;
    public string $title;
    public string $reasoning;
    public float $confidence;
    public string $impact;
    public array $risks;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = ['risks' => []];
        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->mission_id = $merged['mission_id'];
        $this->title = $merged['title'];
        $this->reasoning = $merged['reasoning'];
        $this->confidence = (float) $merged['confidence'];
        $this->impact = $merged['impact'];
        $this->risks = $merged['risks'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'mission_id' => $this->mission_id,
            'title' => $this->title,
            'reasoning' => $this->reasoning,
            'confidence' => $this->confidence,
            'impact' => $this->impact,
            'risks' => $this->risks,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
