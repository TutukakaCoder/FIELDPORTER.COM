# /ui-audit

Run all UI/UX specialist subagents in **audit-only mode**. No code changes unless user explicitly asks to fix. Code review only — no browser MCP / screenshots.

---

## Prompt

```text
UI AUDIT — audit-only pipeline. Read `.cursor/skills/ui-ux-pipeline/SKILL.md` first.

TARGET: PASTE_TARGET_OR_LEAVE_EMPTY
MODE: audit

## Target resolution
If TARGET empty: use currently open editor file → route; else default `/` (homepage). Note assumption — do not ask.

## Hard rules
- No browser MCP. No ui:capture. No opening the app.
- Audit from source code + design tokens / known patterns.

## Run these subagents (parallel where possible)
Use each custom subagent from `.cursor/agents/` with MODE=audit:
1. visual-design-reviewer
2. accessibility-auditor
3. responsive-layout-fixer
4. component-consistency-checker
5. interaction-polish-agent
6. performance-ui-agent
7. copy-ux-writer
8. cross-browser-agent
9. form-ux-agent (skip if no forms on target)

## Deliverable
Single consolidated report grouped by **severity** (critical → major → minor), NOT by agent.
Use issue format from ui-ux-pipeline skill.

End with:
- Assumption made (if any)
- Total counts by severity
- Top 3 recommended fixes
- Manual check list for Sam (optional, if useful)

No code changes. No commit.
```

## Example

`/ui-audit services` → audit `/services` page from source, both themes considered in code.
