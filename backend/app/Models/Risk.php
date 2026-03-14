<?php

namespace App\Models;

class Risk
{
    public string $id;
    public string $decision_id;
    public string $title;
    public string $description;
    public string $severity;
    public string $likelihood;
    public string $mitigation;
    public array $mitigations;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = ['mitigations' => []];
        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->decision_id = $merged['decision_id'];
        $this->title = $merged['title'];
        $this->description = $merged['description'];
        $this->severity = $merged['severity'];
        $this->likelihood = $merged['likelihood'];
        $this->mitigation = $merged['mitigation'];
        $this->mitigations = $merged['mitigations'];
        $this->created_at = $merged['created_at'];
        $this->updated_at = $merged['updated_at'];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'decision_id' => $this->decision_id,
            'title' => $this->title,
            'description' => $this->description,
            'severity' => $this->severity,
            'likelihood' => $this->likelihood,
            'mitigation' => $this->mitigation,
            'mitigations' => $this->mitigations,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
