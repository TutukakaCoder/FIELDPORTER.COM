# /ux-research

**Step 1 of 3.** Investigate a UI/UX issue. Locate it, diagnose it, map similar surfaces, and write research docs. No code changes.

---

## Prompt

```text
UX RESEARCH — diagnose only. No code changes. No plan yet.

Read first:
- `.cursor/SYSTEM-NOTES.md`
- `.cursor/skills/ui-ux-pipeline/SKILL.md`
- `.cursor/skills/design-tokens/SKILL.md`
- `.cursor/skills/component-patterns/SKILL.md`
- `.cursor/skills/known-bug-patterns/SKILL.md`

ISSUE: PASTE_THE_ISSUE_HERE
ROUTE / PAGE: PASTE_OR_LEAVE_EMPTY
REFERENCE: PASTE_SCREENSHOT_FIGMA_OR_LEAVE_EMPTY

## Rules
- App root is **FIELDPORTER.COM/** (not hosting/)
- Prefer facts over guesses. Label every claim: Observed | User-reported | Inferred
- Do not implement. Do not write task-brief.md yet.
- If route is empty, resolve from open file / issue text; note assumption and proceed.
- No browser MCP. No ui:capture. No opening the app. Diagnose from source (+ any REFERENCE Sam already provided).

## Phase 1 — Frame the issue
1. Restate user goal, pain, current behaviour, expected behaviour
2. Severity: blocking | confusing | polish
3. Change scope draft: Localized | Pattern (N surfaces) | Systemic (tokens/layout)

## Phase 2 — Locate in code
1. Find route → page file → section component(s)
2. Note exact classes, tokens, props, and line ranges that cause the issue
3. If Sam already pasted a screenshot/reference, use it; do not capture new ones

## Phase 3 — Similar surfaces map (mandatory)
Search the site for the same anti-pattern / layout / token misuse.
For each cluster: Route | File | Same pattern? | In scope? | Why

Clusters to check: homepage, services, about, portfolio, insights, contact, shared header/footer/nav.

## Phase 4 — Options (2–4)
For each option: what changes, risk, regression surface, effort.
Recommend one primary option for v1. Do not lock decisions that need Sam.

## Phase 5 — Write docs
Create:
Documentation/reviews/ux/YYYY-MM-DD-<slug>/

Files:
1. README.md — issue one-liner, status = Research, links to docs
2. research.md — use the template below (tight, not essay-length)

Also add/update an entry in `SAM's CHANGES.md` if this is a new finding.

## research.md template (keep sections; keep short)

# Research — [title]

## 1. Issue summary
| Field | Detail |
| User goal | |
| Pain | |
| Current | |
| Expected | |
| Surfaces | |
| Severity | blocking | confusing | polish |

## 2. Change scope + rationale
Localized | Pattern | Systemic — one paragraph why.

## 3. Success criteria (draft)
Numbered, testable, theme + viewport aware where relevant.

## 4. Assumptions vs facts
| Claim | Source (Observed / User-reported / Inferred) |

## 5. Surfaces & routes
Route → entry file → component stack (short).

## 6. Similar surfaces map
| Cluster | Route | File | Same pattern? | In scope? |

## 7. Layout / token forensics
Only the elements that matter. Class/token today → problem.

## 8. Options
A / B / C — recommend one for `/ux-plan`.

## 9. Open questions for plan
Decisions Sam must lock (copy, scope, token vs local, deferrals).

## 10. Handoff
- Folder: Documentation/reviews/ux/YYYY-MM-DD-<slug>/
- Next: `/ux-plan`
- Out of scope (so far): …

## Stop when
research.md + README exist, primary option recommended, open questions listed.
Do not start planning or coding.
```

## Example

```
/ux-research
Issue: Homepage hero headline unreadable in light mode — white text on pale background
Route: /
```

```
/ux-research
Issue: Services "four things" boxes misaligned at md breakpoint
Route: /services
```
