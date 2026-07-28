# /design-review

Compare implementation against a reference design, or run design-system self-consistency review. Code review only — no browser MCP / screenshots unless Sam asks.

---

## Prompt

```text
DESIGN REVIEW — read `.cursor/skills/ui-ux-pipeline/SKILL.md`.

TARGET: PASTE_TARGET_OR_ROUTE
REFERENCE: PASTE_FIGMA_URL_SCREENSHOT_OR_LEAVE_EMPTY
MODE: audit

## Hard rules
- No browser MCP. No ui:capture. No opening the app.
- Review from source + any REFERENCE Sam already provided.

## If REFERENCE provided (Figma link, screenshot, image path)
1. Read TARGET implementation source (page → sections)
2. Compare implementation vs reference:
   - Layout geometry (spacing, alignment, sizing)
   - Typography (family, size, weight, color)
   - Color palette vs design tokens
   - Component shapes (radius, shadows, borders)
   - Imagery and icon treatment
3. List deviations ranked by visual impact — not pixel-perfect nitpicks unless user asked

## If no REFERENCE
Fall back to design-system self-consistency:
- Dispatch visual-design-reviewer + component-consistency-checker (MODE=audit)
- Compare TARGET against canonical patterns in component-patterns skill
- Flag off-token colors, spacing scale violations, inconsistent components

## Output
| Deviation | Severity | Location | Reference shows | Implementation has | Suggested fix |

End with: reference used (or "design-system only") + files reviewed.

Fix mode: if user says "fix" or invoked as part of /ui-fix, implement token-compliant fixes and verify with build/lint only.
```

## Example

`/design-review /services` → self-consistency review, no reference.
`/design-review homepage https://figma.com/...` → compare hero to Figma.
