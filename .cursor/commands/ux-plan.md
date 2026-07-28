# /ux-plan

**Step 2 of 3.** Turn research into a locked implementation brief. No code changes.

---

## Prompt

```text
UX PLAN — plan only. No code changes.

Read first:
- `.cursor/SYSTEM-NOTES.md`
- `.cursor/skills/design-tokens/SKILL.md`
- `.cursor/skills/component-patterns/SKILL.md`
- `.cursor/skills/framework-conventions/SKILL.md`
- The research folder below (README.md + research.md)

FOLDER: PASTE_Documentation/reviews/ux/YYYY-MM-DD-slug/
DECISIONS: PASTE_ANY_LOCKS_OR_LEAVE_EMPTY_TO_USE_RESEARCH_RECOMMENDATION

## Rules
- App root is **FIELDPORTER.COM/**
- Plan must be implementable by `/ux-implement` without further research
- Prefer smallest safe fix. Reject scope creep.
- Lock open questions using DECISIONS, or research recommendation + explicit assumption
- Do not implement

## Phase 1 — Load research
Confirm: issue, scope, recommended option, similar surfaces, open questions.
If FOLDER missing, find latest matching research under Documentation/reviews/ux/ from the issue text.

## Phase 2 — Lock the approach
1. Chosen option + why
2. Rejected options + why not
3. Resolve every open question into a decision table
4. Final change scope: Localized | Pattern | Systemic

## Phase 3 — Blast radius
1. Files to change (exact paths under FIELDPORTER.COM/)
2. Do not touch list
3. Similar surfaces: in-scope changes vs deferred
4. Flow-on effects: dark/light, mobile/desktop, shared components, a11y, motion, chatbot/copy if wording changes

## Phase 4 — Spec the fix
1. Token map (reuse existing tokens; invent nothing if a token exists)
2. Spacing map if layout (use design-tokens scale only)
3. Step-by-step implementation (file → line/area → concrete class/token change)
4. Behaviour contract: before → after; must NOT change
5. Visual acceptance criteria (numbered, pass/fail, themes + viewports) — for Sam's manual QA
6. Manual test plan (ordered clicks/toggles for Sam)
7. Routes/viewports Sam should check (min: primary route light+dark, mobile+desktop)
Do not require or run ui:capture / browser MCP.

## Phase 5 — Write task-brief.md
Create/overwrite:
Documentation/reviews/ux/YYYY-MM-DD-<slug>/task-brief.md

Use this structure (tight):

# Task brief — [title]

## 1. Goal
One sentence.

## 2. Folder
Path.

## 3. Change scope
Localized | Pattern | Systemic + rationale.

## 4. Chosen approach
Option + locked decisions table.

## 5. Rejected options
Table.

## 6. Similar surfaces map
In scope vs defer.

## 7. Files to change
| File | Change |

## 8. Do not touch
Bullets.

## 9. Token / spacing map
Or N/A.

## 10. Visual acceptance criteria
Numbered.

## 11. Implementation steps
Ordered, concrete.

## 12. Behaviour contract
Before/after + must NOT change.

## 13. Flow-on effects
| Area | Mitigation |

## 14. Manual visual check routes (Sam)
Table — no automated capture.

## 15. Manual test plan
Ordered.

## 16. Build & docs on complete
npm run lint  # never npm run build while next dev is running (whitescreens the app)
Then: implementation-summary.md, README status, SAM's CHANGES.md update.

## 17. Implement handoff
```

/ux-implement
Folder: Documentation/reviews/ux/YYYY-MM-DD-<slug>/
Out of scope: …

```

Update folder README.md status → Planned.

## Stop when
task-brief.md is complete and handoff block is ready.
Do not write code.
```

## Example

```
/ux-plan
Folder: Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/
Decisions: Use Option A; defer About/Services heroes
```
