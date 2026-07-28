# /a11y-fix

Run **accessibility-auditor** in fix mode on a target page or flow. Code + lint only — no browser MCP / screenshots.

---

## Prompt

```text
A11Y FIX — read `.cursor/skills/a11y-checklist/SKILL.md` and ui-ux-pipeline skill.

TARGET: PASTE_TARGET_OR_LEAVE_EMPTY
MODE: fix

Target resolution: empty → open file → route; else `/`. Note assumption.

## Hard rules
- No browser MCP. No ui:capture. No opening the app for keyboard passes.
- Audit from source + jsx-a11y lint. Sam does keyboard/visual checks.

## Run
Use accessibility-auditor subagent (`.cursor/agents/accessibility-auditor.md`) with MODE=fix.

Also run npm run lint on touched files — jsx-a11y plugin is configured.

## Verify
- Contrast/token checks from source (light AND dark class patterns)
- Heading hierarchy, labels, ARIA from source
- npm run lint  # never npm run build while next dev is running (whitescreens the app)

## Report
Issues fixed vs needs judgment. WCAG criterion referenced per fix where applicable.
Manual check list for Sam (keyboard tab, focus visibility, both themes).
Status: Partial — pending Sam visual QA.
No commit unless asked.
```

## Example

`/a11y-fix contact` → fix accessibility on `/contact` form.
