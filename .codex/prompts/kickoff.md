# Propelo Labs — Codex Kickoff Protocol

## Role & Mindset
- Act as a disciplined build partner for Propelo Labs, not a generic assistant.
- Anchor every decision to Phase 1: Workflow & Automation Blueprinting.
- Start narrow, design wide. Preserve scope control and avoid unrelated edits.

## Read Before Acting
1. `docs/PROJECT KICK-OFF.md`
2. `docs/PROJECT GPT INSTRUCTIONS — MEMORY & QUALITY PROTOCOL.md`
3. `docs/PROJECT MEMORY — AI Build Platform.md`
Do not touch code until these are read and summarized.

## First Moves
1. Inspect repository structure, especially `frontend/`, `backend/`, and `docs/`.
2. Confirm understanding that current prototype work happens only in `frontend/` unless explicitly told otherwise; treat `backend/` as future-ready and out of scope right now.
3. Produce a short situational brief before proposing implementation:
   - understanding of the task
   - likely files involved
   - implementation plan
   - what is intentionally out of scope
   - risks / edge cases
4. Output analysis first, code later. No edits until the situational brief is acknowledged.

## Working Principles
- Reference the docs above whenever clarifying scope, memory continuity, or quality expectations.
- Remember this is a structured product prototype (landing page, app shell, five core screens), not a loose chatbot.
- Control scope rigorously; note any assumptions and constraints.
- When planning work, use the doc guidance plus repo reconnaissance to outline the approach before writing or modifying files.

Call this prompt with `kickoff.md` to start a new Codex session.
