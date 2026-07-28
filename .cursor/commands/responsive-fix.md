# /responsive-fix

Run **responsive-layout-fixer** in fix mode across all breakpoints (code analysis). Sam handles visual testing — no browser MCP / screenshots.

---

## Prompt

```text
RESPONSIVE FIX — read ui-ux-pipeline skill and known-bug-patterns skill.

TARGET: PASTE_TARGET_OR_LEAVE_EMPTY
MODE: fix

Target resolution: empty → open file → route; else `/`. Note assumption.

## Hard rules
- No browser MCP. No ui:capture. No opening the app.
- Infer breakpoint behaviour from Tailwind classes and layout structure.

## Run
Use responsive-layout-fixer subagent with MODE=fix.

Focus: overflow, squished grids, unequal flex items, min-h-screen pushing content,
missing h-full on grid cards, text truncation, image scaling.

## Verify
npm run lint  # never npm run build while next dev is running (whitescreens the app)

## Report
Per-viewport code findings + files changed.
Manual check list for Sam (375 / 768 / 1280, light+dark as relevant).
Status: Partial — pending Sam visual QA.
No commit unless asked.
```

## Example

`/responsive-fix portfolio` → fix portfolio layout at all breakpoints.
