# /full-sweep

Crawl all marketing routes (in code), run full UI audit on each, return one prioritized master issue list. No target needed. No browser MCP / screenshots.

---

## Prompt

```text
FULL SWEEP — site-wide UI audit. Read `.cursor/SYSTEM-NOTES.md` and ui-ux-pipeline skill.

MODE: audit
(If user says "fix everything" or "/full-sweep fix" → MODE=fix, but fix critical/major only unless user says fix all)

## Hard rules
- No browser MCP. No ui:capture. No opening the app.
- Audit from route files + components.

## Routes
Read FIELDPORTER.COM/scripts/ui-audit/routes.json → marketing array.
Skip /admin/*.

## Process
1. For each route (batch in parallel groups of 3-4):
   - Read page + section components
   - Dispatch subagents in audit mode (lighter pass OK per route — prioritize visual, a11y, responsive code smells)
2. De-duplicate issues found on multiple routes (e.g. hero light-mode pattern → one systemic entry)

## Master report
Single list grouped by severity across entire site:

### Critical (site-wide or blocking)
### Major
### Minor

Include:
- Route(s) affected per issue
- Systemic vs localized classification
- Recommended fix order (1, 2, 3…)
- Count: X critical, Y major, Z minor across N routes

If MODE=fix: fix critical items site-wide first, then re-audit affected routes in code.
Verify with: npm run lint  # never npm run build while next dev is running (whitescreens the app)
Leave a short manual check list for Sam. Status Partial — pending Sam visual QA.

No commit unless asked.
```

## Example

`/full-sweep` → audit every marketing page, prioritized master list.
`/full-sweep fix critical` → fix only critical issues found.
