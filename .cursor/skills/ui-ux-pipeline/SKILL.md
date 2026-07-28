---
name: ui-ux-pipeline
description: >-
  Master orchestration for FIELDPORTER UI/UX audit-and-fix pipeline. Use when
  running /ui-audit, /ui-fix, /full-sweep, or any multi-agent UI workflow.
---

# UI/UX Pipeline — Orchestration

## Before every run

1. Read `.cursor/SYSTEM-NOTES.md`
2. Read skills: `design-tokens`, `component-patterns`, `framework-conventions`, `known-bug-patterns` (+ `a11y-checklist` for a11y work)
3. App root: **`FIELDPORTER.COM/`**

## Hard rules (visual QA + do not break the running app)

- **No browser MCP** unless Sam explicitly asks.
- **No `ui:capture`** / automated screenshots unless Sam explicitly asks.
- Do not open the app for visual QA. Sam handles visual testing.
- Focus on source analysis + code changes. Verify with **lint** (see safe verify below).
- After fixes, status is usually **Partial — pending Sam visual QA** plus a short manual check list.
- **Never** run `npm run build` / `next build` while `next dev` is running — it corrupts `.next` and whitescreens the browser.
- **Never** `rm -rf .next`, kill port 3000/3001, or restart Sam’s dev server as part of a UX command.

## Target resolution (default — do not ask unless blocked)

| User input                            | Resolve to                                               |
| ------------------------------------- | -------------------------------------------------------- |
| Empty / `/ui-fix` alone               | Currently open file → route/component; else homepage `/` |
| "homepage", "home"                    | `/` + `components/homepage/`                             |
| "services"                            | `/services`                                              |
| "about"                               | `/about`                                                 |
| "portfolio"                           | `/portfolio`                                             |
| "insights", "blog"                    | `/insights`                                              |
| "contact"                             | `/contact`                                               |
| "checkout", "booking", "contact form" | `/contact` + form components                             |
| File path                             | Map to route + component                                 |
| URL                                   | Extract pathname                                         |

If still ambiguous → pick most likely target, **note assumption**, proceed.

## Mode flag

- **`MODE=fix`** (default) — implement fixes + code verify
- **`MODE=audit`** — report only; no code changes unless user said "audit only"

User saying "audit only" / "report only" → `MODE=audit`.

## Code verification (mandatory for fix mode)

```bash
# Default — safe while Sam has npm run dev open
npm run lint
```

If Sam explicitly wants a production compile check **and** no `next dev` is listening on 3000–3002:

```bash
npm run build && npm run lint
```

Confirm classes/tokens/structure match the intended fix. Leave a **manual check list for Sam** (routes, themes, viewports). Do not treat visual confirmation as agent-owned.

## Subagents (`.cursor/agents/`)

| Agent                           | Focus                                    |
| ------------------------------- | ---------------------------------------- |
| `visual-design-reviewer`        | Hierarchy, spacing, contrast, typography |
| `accessibility-auditor`         | WCAG 2.1 AA                              |
| `responsive-layout-fixer`       | Breakpoints, overflow, grids             |
| `component-consistency-checker` | Duplicates, token violations             |
| `interaction-polish-agent`      | Hover/focus/loading/empty states         |
| `performance-ui-agent`          | Images, CLS, lazy load, bundle           |
| `copy-ux-writer`                | Copy clarity, CTAs, truncation           |
| `cross-browser-agent`           | Safari/Firefox CSS risks                 |
| `form-ux-agent`                 | Validation, labels, autofill             |

Dispatch: _"Use the \<agent-name\> subagent with TARGET=… MODE=…"_

Run independent agents **in parallel** when possible.

## Standard issue format

Each agent outputs:

```markdown
### [ID] Title

- **Severity:** critical | major | minor
- **Agent:** agent-name
- **Location:** file:line or route + selector
- **Evidence:** code path / class / token (not a screenshot unless Sam provided one)
- **Issue:** one sentence
- **Suggested fix:** concrete class/token/component change
- **Fixed:** yes | no | n/a (audit mode)
```

## Consolidated report (orchestrator merges by severity)

```markdown
# UI/UX Report — [target] — [date]

**Assumption:** …
**Mode:** fix | audit

## Critical

…

## Major

…

## Minor

…

## Fixed (fix mode)

- …

## Needs your judgment

- Design decisions, copy rewrites, IA changes

## Verification

- Build/lint: pass | fail
- Status: Partial — pending Sam visual QA (when fixes applied)

## Manual check list for Sam

- Routes / themes / viewports to click-test
```

## Command → agents map

| Command           | Agents                                                 |
| ----------------- | ------------------------------------------------------ |
| `/ui-audit`       | All 10 (audit mode)                                    |
| `/ui-fix`         | All 10 (fix mode)                                      |
| `/design-review`  | visual-design-reviewer + component-consistency-checker |
| `/a11y-fix`       | accessibility-auditor                                  |
| `/responsive-fix` | responsive-layout-fixer                                |
| `/polish`         | interaction-polish-agent + copy-ux-writer              |
| `/full-sweep`     | All routes × ui-audit agents → master list             |

## After fixes

Append new recurring patterns to `.cursor/skills/known-bug-patterns/SKILL.md`.

## Track A — Issue succession (prefer for known issues)

When Sam already spotted a problem and wants a documented fix:

| Step        | Command         | Output                                                 |
| ----------- | --------------- | ------------------------------------------------------ |
| 1 Research  | `/ux-research`  | `Documentation/reviews/ux/<date>-<slug>/research.md`   |
| 2 Plan      | `/ux-plan`      | `task-brief.md`                                        |
| 3 Implement | `/ux-implement` | Code + `implementation-summary.md` + manual check list |

Aliases: `/ux-issue-research`, `/ux-change-plan` → same as research/plan.

**Use Track A when:** known bug, layout/contrast issue, multi-surface pattern, needs blast-radius thinking.
**Use Track B (`/ui-fix`, etc.) when:** "scan this page and fix what's wrong" with no research folder needed.
