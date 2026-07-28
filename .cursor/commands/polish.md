# /polish

Run **interaction-polish-agent** + **copy-ux-writer** together for "does this feel finished?" polish. Code changes only — no browser MCP / screenshots.

---

## Prompt

```text
POLISH — read ui-ux-pipeline, component-patterns skills.

TARGET: PASTE_TARGET_OR_LEAVE_EMPTY
MODE: fix

Target resolution: empty → open file → route; else `/`. Note assumption.

## Hard rules
- No browser MCP. No ui:capture. No opening the app.
- Review interaction/copy from source; Sam spot-checks in browser.

## Run (parallel)
1. interaction-polish-agent — hover/focus/loading/empty/error states, transitions
2. copy-ux-writer — CTA wording, clarity, tone, truncation, error messages

## Fix
Implement obvious polish fixes. Flag brand/copy strategy rewrites as **Needs your judgment**.

## Verify
npm run lint  # never npm run build while next dev is running (whitescreens the app)

## Report
- Interaction fixes applied
- Copy fixes applied
- Judgment-call items
- Manual check list for Sam (hover/focus/empty/error states to click-test)
- Status: Partial — pending Sam visual QA
No commit unless asked.
```

## Example

`/polish services` → polish interactions and copy on `/services`.
