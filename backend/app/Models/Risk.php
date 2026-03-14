<?php

namespace App\Models;

class Risk
{
    public string $id;
    public string $decision_id;
    public string $title;
    public string $description;
    public string $likelihood;
    public string $impact;
    public $severity_score;
    public string $status;
    public array $mitigations;
    public string $created_at;
    public string $updated_at;

    public function __construct(array $attributes)
    {
        $defaults = [
            'description' => '',
            'likelihood' => '',
            'impact' => '',
            'severity_score' => null,
            'status' => 'open',
            'mitigations' => [],
        ];
        $merged = array_merge($defaults, $attributes);

        $this->id = $merged['id'];
        $this->decision_id = $merged['decision_id'];
        $this->title = $merged['title'];
        $this->description = $merged['description'];
        $this->likelihood = $merged['likelihood'];
        $this->impact = $merged['impact'];
        $this->severity_score = $merged['severity_score'];
        $this->status = $merged['status'];
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
            'likelihood' => $this->likelihood,
            'impact' => $this->impact,
            'severity_score' => $this->severity_score,
            'status' => $this->status,
            'mitigations' => $this->mitigations,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
