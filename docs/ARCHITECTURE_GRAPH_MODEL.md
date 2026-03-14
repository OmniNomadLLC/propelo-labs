# Propelo Architecture Graph Model

## 1. Architecture Graph Concept
Propelo’s architecture engine models every project as a graph of connected objects. Nodes represent structured architecture objects, and edges capture how those objects influence one another. Example:
```
Mission
│
├── Decision
│     ├── Risk
│     └── Blueprint
│
└── Blueprint
      └── Task
            └── Snapshot
```
This graph view lets the system reason about the project as an interconnected architecture rather than isolated data points.

## 2. Node Types
Nodes correspond directly to the canonical objects defined in `docs/ARCHITECTURE_OBJECT_MODEL.md`:
- Mission Node
- Decision Node
- Risk Node
- Blueprint Node
- Task Node
- Snapshot Node
Each node carries the properties defined in the object model (ids, metadata, relationships) and participates in the graph through edges.

## 3. Edge Types
Edges describe how nodes relate:
- Mission → Decision
- Mission → Risk
- Decision → Risk
- Decision → Blueprint
- Risk → Decision
- Risk → Blueprint
- Blueprint → Task
- Task → Snapshot
- Snapshot → Mission
This creates bidirectional insights (e.g., decisions influence risks; risks can link back to decisions and blueprint nodes).

## 4. Graph Evolution
The graph grows as work progresses:
1. Mission created
2. Decisions added
3. Risks discovered
4. Blueprint generated
5. Tasks executed
6. Snapshot captured
Every action adds nodes/edges, building an auditable architecture history.

## 5. Graph Queries
Because the system stores relationships, Propelo (and AI agents) can ask:
- Which risks affect this mission?
- Which decisions created this blueprint?
- Which tasks belong to this architecture phase?
- Which snapshots represent major architecture changes?
Graph traversal answers these questions without manual reconciliation.

## 6. AI Reasoning Potential
The structured graph enables AI capabilities:
- detect architectural conflicts
- suggest missing decisions
- predict emerging risks
- generate execution plans from blueprint gaps
- analyze architecture history across snapshots

## 7. Workspace Representation
The graph manifests across workspace screens:
- **Brain** (`frontend/app/workspace/brain`) – mission, decisions, risks nodes.
- **Scope** (`frontend/app/workspace/scope`) – blueprint nodes.
- **Tasks** (`frontend/app/workspace/tasks`) – execution/task nodes.
- **Wrap** (`frontend/app/workspace/wrap`) – snapshot nodes.
State is centralized in `frontend/app/project-context.tsx`, ensuring edges stay consistent across screens.

## Final Principle
**Propelo models systems as evolving architecture graphs.**
