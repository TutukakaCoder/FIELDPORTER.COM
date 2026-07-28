# /ux-implement

**Step 3 of 3.** Implement the locked task brief, run lint, document the result. Sam does visual QA manually — no screenshots.

---

## Prompt

```text
UX IMPLEMENT — execute the brief exactly. No scope expansion.

Read first:
- `.cursor/SYSTEM-NOTES.md`
- `.cursor/skills/design-tokens/SKILL.md`
- `.cursor/skills/component-patterns/SKILL.md`
- `.cursor/skills/framework-conventions/SKILL.md`
- `.cursor/skills/known-bug-patterns/SKILL.md`
- FOLDER/task-brief.md (source of truth)
- FOLDER/research.md (context only)

FOLDER: PASTE_Documentation/reviews/ux/YYYY-MM-DD-slug/

## Rules
- App root is the marketing Next app (repo root for this project — not `hosting/`, not nested stale copies)
- Follow task-brief.md only. If something is unclear, stop and ask — do not invent scope
- Smallest diff. Reuse tokens/components. No drive-by refactors
- Do not touch the Do-not-touch list
- No screenshots / ui:capture / browser MCP — Sam does manual visual checks
- No commit unless Sam asks
- NEVER run `npm run build` while Sam’s `next dev` is running (corrupts `.next` → white screen)
- NEVER `rm -rf .next`, kill ports 3000–3002, or restart the dev server unless Sam asks

## Phase 1 — Confirm brief
1. Confirm goal, files, acceptance criteria, out of scope
2. Do not start the app or open a browser for visual QA

## Phase 2 — Implement
1. Apply implementation steps in order
2. Match token/spacing maps from the brief
3. Preserve motion, routing, copy, and behaviour called out in "must NOT change"
4. If a similar in-scope surface is listed in the brief, fix it too — nothing else

## Phase 3 — Verify (code only)
1. Run: `npm run lint`
   - Do NOT run `npm run build` if `next dev` is listening (check ports 3000–3002). Build overwrites `.next` and whitescreens the open app.
   - Only run `npm run build && npm run lint` when Sam asked for a production build check and no dev server is active.
2. Confirm code matches the brief’s acceptance criteria as written (classes/tokens/structure)
3. Status stays **Partial — pending Sam visual QA** until Sam confirms

## Phase 4 — Document
Write/update in the folder:

1. implementation-summary.md

# Implementation summary — [title]

## Goal
## Change scope
## Status
Partial — pending Sam visual QA | Done (only if Sam already confirmed)
## What changed (user-visible)
## Token / spacing changes
## Files changed
| File | Change |
## Visual acceptance criteria
| # | Criterion | Code matches brief? | Sam visual QA |
(Leave Sam visual QA column blank / Not run)
## Manual check list for Sam
Copy the brief’s manual test plan here as a short checklist (routes, viewports, themes).
## Deferred / follow-ups
## Known-bug-patterns
Append any new recurring pattern to `.cursor/skills/known-bug-patterns/SKILL.md` if applicable.

2. README.md — status Partial (pending Sam visual QA); link summary; list what Sam should click-test
3. SAM's CHANGES.md — note implemented + link to folder; visual QA pending unless Sam said Done

## Phase 5 — Report to Sam
Short report:
- Status: Partial — pending your visual QA
- Files changed
- Lint: pass | fail (note if build was skipped because next dev was active)
- Manual check list (routes / themes / viewports)
- Anything deferred
- Anything that needs judgment

## Stop when
Code matches brief, lint passes, docs updated, and Sam has a clear manual check list. Do not capture screenshots. Do not restart the app.
```

## Example

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/
```
