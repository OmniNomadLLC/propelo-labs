# Propelo Labs — Codex Wrap-Up Prompt

Update the project documentation to reflect everything accomplished
in the current development session.

Important:
- Make documentation updates ONLY.
- Do not modify runtime code.
- Use the existing docs as the source of truth for tone and structure.
- The goal is that after I type `wrapup.md`, you automatically produce a real end-of-session summary and update the relevant docs.

Before finishing, verify that the work respected:
- `docs/PROJECT KICK-OFF.md`
- `docs/PROJECT GPT INSTRUCTIONS — MEMORY & QUALITY PROTOCOL.md`
- `docs/PROJECT MEMORY — AI Build Platform.md`

The wrap-up must be concrete, not abstract.
It must describe what was actually touched, changed, improved, deferred, or left unresolved.

---

## 1. Update or create today's daily/project log

If the project already has a daily log convention, use it.
If not, update the most relevant project memory / docs file with a clear session summary.

Preferred location if daily logs exist:
`docs/daily/YYYY-MM-DD.md`

If that pattern does not exist, append a new clearly dated session block to:
`docs/PROJECT MEMORY — AI Build Platform.md`

Use this structure exactly:

## TL;DR

Short summary of today's progress in 3–6 lines.

---

## What changed today

Bullet list describing:
- UI / UX changes
- screen changes
- component changes
- content / copy changes
- interaction changes
- styling / hierarchy / motion changes
- documentation changes

Be explicit and practical.

---

## Outcome / result

Describe the end result of the session:
- what now exists that did not exist before
- what improved visually or structurally
- what became clearer
- what feels more product-like now

---

## Problems / weaknesses found

Describe:
- what looked weak before
- what issues appeared during implementation
- what still feels imperfect
- what still needs validation

If no major problems occurred, say so explicitly.

---

## What was improved / fixed

Describe:
- what specific problems were solved
- what became better and why
- what design / UX / structure decisions improved the product

This should read like a real progress report, not generic commentary.

---

## Intentionally not changed

List what was deliberately left untouched, for example:
- backend
- auth
- persistence
- APIs
- routing structure
- data model
- extra screens
- advanced interactivity

Be explicit so future sessions know the current scope boundary.

---

## Mocks / placeholders

Describe:
- what remains mock/static
- what is seeded demo data
- what is presentational only
- what still has no real backend connection

---

## Risks / follow-ups

Mention:
- responsive risks
- UX clarity risks
- visual consistency risks
- architectural follow-ups
- anything that could break or need more testing

---

## Verification

Explain how the session was verified.

Examples:
- `npm run lint`
- manual browser review
- route-by-route visual check
- responsive check
- interaction check

---

## Touched files

List modified files from git using relative paths.

Example:
- frontend/app/page.tsx
- frontend/app/workspace/layout.tsx
- frontend/app/workspace/intake/page.tsx
- frontend/app/workspace/brain/page.tsx
- frontend/app/workspace/scope/page.tsx
- frontend/app/workspace/tasks/page.tsx
- frontend/app/workspace/wrap/page.tsx
- frontend/app/workspace/components.tsx
- frontend/app/workspace/demo-data.ts
- frontend/app/globals.css

---

## Commands run

Add a fenced bash block listing important commands used in the session.

Example:
```bash
cd frontend
npm run dev
npm run lint
git status -sb
git add -A
git commit -m "..."
git push origin main