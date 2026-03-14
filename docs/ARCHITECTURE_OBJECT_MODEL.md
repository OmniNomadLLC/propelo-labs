# Propelo Architecture Object Model

## 1. Architecture Pipeline
Propelo models every project as a structured pipeline:

Mission → Decisions → Risks → Blueprint → Tasks → Wrap Snapshot

Each stage produces a concrete artifact so the system can reason about the work instead of managing loose documents.

## 2. Core Architecture Objects
These are the canonical objects the workspace, state model, and AI systems operate on.

### Mission
Represents the problem being solved.
- `id`
- `title`
- `description`
- `successCriteria`
- `constraints`
- `createdAt`

### Decision
Represents an architectural choice.
- `id`
- `title`
- `reasoning`
- `confidence`
- `impact`
- `linkedRisks`
- `createdAt`

### Risk
Represents uncertainty or potential failure.
- `id`
- `description`
- `severity`
- `likelihood`
- `mitigation`
- `linkedDecision`

### Blueprint
Represents the architecture plan.
- `id`
- `phases`
- `architectureFlow`
- `dependencies`
- `boundaries`

### Task
Represents execution work derived from blueprint phases.
- `id`
- `title`
- `owner`
- `proofOfWork`
- `column`
- `linkedBlueprintPhase`

### Snapshot
Represents a frozen architecture state.
- `id`
- `mission`
- `decisions`
- `risks`
- `blueprint`
- `tasks`
- `createdAt`

## 3. Object Relationships
- **Mission → Decisions**: mission intent and constraints guide each architectural call.
- **Decisions → Risks**: every decision may create or mitigate risks.
- **Decisions + Risks → Blueprint**: the blueprint encodes decisions while making risks visible.
- **Blueprint → Tasks**: phases translate directly into proof-of-work tasks.
- **Tasks → Execution Proof**: completed tasks produce artifacts for review.
- **Wrap Snapshot** captures the full state for continuity and handoff.

## 4. Data Flow
User input → mission defined → decisions recorded → risks mapped → blueprint generated → tasks created → snapshot stored. Each transition adds structure and makes downstream reasoning possible.

## 5. Architecture Memory
Propelo stores architecture objects over time:
- decision history
- risk history
- blueprint versions
- task completion states
- wrap snapshots

This cumulative dataset becomes the architecture memory the system (and AI) can analyze.

## 6. Integration With Workspace
- Mission / Decisions / Risks: `frontend/app/workspace/brain`
- Blueprint: `frontend/app/workspace/scope`
- Tasks: `frontend/app/workspace/tasks`
- Snapshots: `frontend/app/workspace/wrap`
- State management: `frontend/app/project-context.tsx`

## 7. Future AI Capabilities
Structured objects enable:
- decision reasoning and suggestion
- risk detection and mitigation planning
- blueprint visualization and recommendations
- execution planning (phase → task generation)
- architecture analysis across snapshots

## Final Principle
**Propelo is a system for thinking in structured architecture objects.**
