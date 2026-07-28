# /ui-fix

**Primary command.** Run full UI/UX pipeline in **fix mode**: audit → fix → code verify → report. Sam handles visual testing — no browser MCP / screenshots.

---

## Prompt

```text
UI FIX — default fix pipeline. Read `.cursor/skills/ui-ux-pipeline/SKILL.md` first.

TARGET: PASTE_TARGET_OR_LEAVE_EMPTY
MODE: fix

## Target resolution (no questions unless blocked)
- Empty → open file in editor → route/component; else `/`
- "homepage" → `/`
- "fix the X" → map X to route (see ui-ux-pipeline table)
Note assumption in output.

## Hard rules
- No browser MCP. No ui:capture. No opening the app for visual QA.
- Sam does visual testing. Focus on code analysis + actual fixes.

## Phase 1 — Code audit
Read TARGET route/page → section components. Dispatch all subagents (fix mode, parallel).
Each agent from `.cursor/agents/` with MODE=fix, TARGET=ROUTE:
visual-design-reviewer, accessibility-auditor, responsive-layout-fixer,
component-consistency-checker, interaction-polish-agent, performance-ui-agent,
copy-ux-writer, cross-browser-agent, form-ux-agent

Read skills: design-tokens, component-patterns, framework-conventions, known-bug-patterns.

## Phase 2 — Implement fixes
- Smallest diff in FIELDPORTER.COM/
- Systemic tokens → globals.css; localized → components
- Append recurring patterns to known-bug-patterns skill

## Phase 3 — Verify (code only)
npm run lint  # never npm run build while next dev is running (whitescreens the app)
Confirm classes/tokens/structure match intended fixes. Do not capture screenshots.

## Phase 4 — Report
Consolidated by severity. Sections:
- **Fixed** (with files changed)
- **Needs your judgment** (design/copy/IA decisions)
- **Verification** (build/lint)
- **Manual check list for Sam** (routes / themes / viewports)
- **Assumption**
- Status: Partial — pending Sam visual QA (unless Sam already confirmed)

No commit unless asked.
```

## Example

`/ui-fix` → fix whatever's open or homepage.
`/ui-fix homepage hero` → `/` hero section.
