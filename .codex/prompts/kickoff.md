# Propelo Labs — Codex Kickoff

## ARCHITECTURE 
These documents define the architecture doctrine of the Propelo platform.

If a feature requires changes to these principles,
update the relevant document before implementing the feature.
Before any work begins, read and internalize:

- `docs/PRODUCT_NORTH_STAR.md`
- `docs/FEATURE_FILTER.md`
- `docs/ARCHITECTURE_OBJECT_MODEL.md`
- `docs/ARCHITECTURE_GRAPH_MODEL.md`
- `docs/ARCHITECTURE_REASONING_ENGINE.md`
- `docs/ARCHITECTURE_DATA_FLYWHEEL.md`
- `docs/ARCHITECTURE_UI_PRINCIPLES.md`
- `docs/PROPELO_METHOD.md`
- `docs/PROPELO_CATEGORY.md`

These documents define product direction, feature scope, the architecture model, AI reasoning model, data strategy, UI philosophy, product method, and category positioning. Treat them as architectural guardrails. Any proposed feature, design, or system change must align with them. When a proposal conflicts with these principles, raise an architecture warning.

You are my coding partner on the **Propelo Labs AI Build Platform**.

Before making ANY code changes, analyze the repository and produce a structured situational brief.

Do NOT modify any code yet.

---

## Read these project documents first

docs/PROJECT KICK-OFF.md  
docs/PROJECT GPT INSTRUCTIONS — MEMORY & QUALITY PROTOCOL.md  
docs/PROJECT MEMORY — AI Build Platform.md  

If present also read:

docs/daily/ (open the most recent entry)

---

## Inspect the repository

Focus on these directories:

frontend/  
backend/  
docs/

Also inspect:

package.json  
frontend/package.json  

Important context:

- Current prototype work happens almost entirely in **frontend/**
- Backend exists as Laravel scaffold but is **out of scope for now**
- The product is currently a **frontend prototype**

---

## Understand the product

Propelo Labs is building:

A **browser-based AI-guided build workspace**.

Phase 1 focus:

Workflow & Automation Blueprinting.

Target users:

- solo automation builders
- small agencies
- operators using tools like n8n / GoHighLevel

The product is **not a chatbot**.

It is a **structured workspace with five core screens**:

1. Project Intake
2. Project Brain
3. Scope & Blueprint
4. Task Board
5. Wrap-up / Snapshot

---

## Output analysis ONLY (no code)

Provide the following sections.

---

### 1. State of the Project

6–10 bullets covering:

- product purpose
- Phase 1 wedge
- target users
- current prototype scope
- stack
- build stage

---

### 2. Repository Structure

Summarize:

Frontend structure  
Backend structure  
Docs structure  

Highlight key files.

---

### 3. Current Prototype Implementation

Identify implemented parts such as:

- landing page
- workspace shell
- core screens
- shared components
- demo data
- layout structure

Explain briefly how the prototype is organized.

---

### 4. Recent Work

If docs/daily exists:

Summarize recent development.

Focus on:

- UI changes
- screen structure
- interaction patterns
- architecture decisions

---

### 5. Risks / Gaps

Identify potential issues such as:

- missing components
- inconsistent structure
- state handling gaps
- frontend/backend drift
- UX risks

Keep concise.

---

### 6. Possible Improvements (analysis only)

Suggest 4–8 improvements.

For each include:

- why it helps
- expected files affected
- architectural impact

Do NOT implement them yet.

---

## Important rules

Do NOT modify code yet.

After producing the situational brief, ask which improvement should be implemented first.
