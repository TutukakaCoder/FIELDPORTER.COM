# Task brief — Services “What We Build” equal-size boxes

## 1. Goal

On `/services`, the four What We Build capability selectors share equal width and height in a neat grid at every breakpoint.

## 2. Folder

`Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/`

## 3. Change scope

**Localized** — single tab-selector row in `InteractiveServiceShowcase`. No tokens, no copy, no shared components.

**Live app root:** repo root (`app/`, `components/`). Do **not** edit nested `FIELDPORTER.COM/` (stale duplicate) or `hosting/`.

## 4. Chosen approach

**Option A — CSS grid equal cells** (research recommendation).

Replace the flex + wrap + `shrink-0` pill row with a CSS grid (`grid-cols-2 lg:grid-cols-4`, `items-stretch`, `max-w-5xl mx-auto`). Each button fills its cell. Keeps tab + detail-panel UX; mirrors About process / prior Four Things grid pattern.

**Locked decisions** (research open questions; no Sam overrides provided):

| Question                            | Decision                                                               |
| ----------------------------------- | ---------------------------------------------------------------------- |
| Tab selectors vs full content cards | **Tabs** — keep detail panel below                                     |
| Desktop layout                      | **2×2** below `lg`; **1×4** at `lg+`                                   |
| Labels                              | Keep short labels below `lg`; full titles at `lg+` with `line-clamp-2` |
| Horizontal scroll wrapper           | **Remove** for all breakpoints — grid is the layout                    |
| Portfolio chips                     | **Defer**                                                              |
| Max width                           | **Yes** — `max-w-5xl mx-auto` on grid                                  |
| Fixed min-height beyond 44px        | **No** — rely on `items-stretch` + `h-full`                            |

## 5. Rejected options

| Option                             | Why not                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| B — Grid + fixed shared min-height | Brittle; stretch should equalize rows                    |
| C — Always 2×2                     | Viable, but research default prefers 1×4 on wide desktop |
| D — Portfolio chips same PR        | Out of user scope; chips are intentional scroll filters  |

## 6. Similar surfaces map

| Cluster                      | Route        | File                                       | In scope? | Action                         |
| ---------------------------- | ------------ | ------------------------------------------ | --------- | ------------------------------ |
| What We Build tabs           | `/services`  | `app/services/page.tsx`                    | **Yes**   | Flex → grid; full-cell buttons |
| Homepage What We Build cards | `/`          | `components/homepage/services-section.tsx` | No        | Already card grid              |
| Portfolio category chips     | `/portfolio` | `app/portfolio/page.tsx`                   | Defer     | Follow-up                      |
| Nested stale services page   | —            | `FIELDPORTER.COM/app/services/page.tsx`    | No        | Do not edit                    |
| About Our Process            | `/about`     | `systematic-approach.tsx`                  | No        | Reference only                 |

## 7. Files to change

| File                    | Change                                                    |
| ----------------------- | --------------------------------------------------------- |
| `app/services/page.tsx` | Selector wrapper + button layout classes only (~L303–338) |

## 8. Do not touch

- Nested `FIELDPORTER.COM/`, `hosting/`
- Heading / subtitle copy
- `services` data array, icons, shortLabels map values
- Active/inactive color classes, focus rings, `onClick` / hash `useEffect`
- Detail panel (`AnimatePresence`), methodology, FAQ, hero
- Homepage, Portfolio, About, chatbot/knowledge files
- `globals.css` tokens

## 9. Token / spacing map

**Tokens:** N/A — localized classes only.

| Location                | Before                                                                                            | After                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outer scroller (L303)   | `mb-10 md:mb-14 -mx-4 px-4 md:mx-0 md:px-4 overflow-x-auto scrollbar-hide` wrapping an inner flex | **Collapse to one wrapper:** `grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-10 md:mb-14 px-0 md:px-4 max-w-5xl mx-auto items-stretch`                        |
| Inner flex (L304)       | `flex … md:flex-wrap … w-max …`                                                                   | **Remove** — map buttons directly in the grid                                                                                                                             |
| Button (L318)           | `shrink-0 min-h-[44px] px-3 md:px-4 lg:px-8 … lg:text-lg`                                         | Drop `shrink-0`; add `w-full h-full flex items-center justify-center text-center`; padding `px-3 md:px-4 lg:px-4`; type `text-xs md:text-sm lg:text-base lg:leading-snug` |
| Inner span (L326)       | `flex items-center gap-2 lg:gap-3`                                                                | `flex items-center justify-center gap-2 lg:gap-2 w-full`                                                                                                                  |
| Title spans (L330–333)  | No clamp                                                                                          | Add `line-clamp-2` on both full and short label spans                                                                                                                     |
| Active/inactive classes | Unchanged                                                                                         | Unchanged                                                                                                                                                                 |

Gaps stay on the 8px scale: `gap-2` → `md:gap-3` → `lg:gap-4` (match current intent; do not invent new spacing).

## 10. Visual acceptance criteria

1. **1280 light — equal widths:** Four tabs in one row, identical widths inside `max-w-5xl`.
2. **1280 light — equal heights:** Bottom edges of all four aligned (tallest 2-line title drives row).
3. **1280 — active state:** Click each tab; blue active styles fill the full cell; detail panel updates.
4. **768 — 2×2:** Two equal columns; both rows aligned; short labels; no ragged flex wrap.
5. **375 — 2×2:** Equal cells; height ≥ 44px; no horizontal page overflow from the tab row.
6. **Long title:** “Databases, Dashboards and Reporting” fits with ≤2 lines, no overflow of focus ring.
7. **Hash:** `/services#workflow-automation` and `/services#ai-capability` activate the correct tab.
8. **Keyboard:** Tab focus ring on full cell; Enter/Space activates.
9. **Dark:** Criteria 1–6 pass in dark theme.
10. **Detail panel:** Prev/next, outcomes list, proof card still work.

## 11. Implementation steps

1. Open `app/services/page.tsx` → `InteractiveServiceShowcase` selector block (~L303–338).
2. Replace the outer scroll + inner flex wrappers with a single `grid … items-stretch max-w-5xl mx-auto` container; map the four buttons as direct grid children.
3. Update each `<button>` className: remove `shrink-0`; add `w-full h-full flex items-center justify-center text-center`; tighten `lg` padding/type as in §9.
4. Update inner span to `justify-center w-full`; add `line-clamp-2` to label spans.
5. Leave active/inactive, icons, shortLabels, and everything below the grid untouched.
6. Sanity-check in browser: 375 / 768 / 1280, light + dark; click all four tabs; hash links.
7. Run `npm run build && npm run lint` from repo root.
8. Write `implementation-summary.md`; set README status; update `SAM's CHANGES.md` + known-bug-patterns.

## 12. Behaviour contract

|                     |                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| **Before**          | Content-width flex pills; uneven widths; ragged 2×2 wrap on desktop                                     |
| **After**           | Equal grid cells; 2×2 below `lg`, 1×4 at `lg+`; neat alignment                                          |
| **Must NOT change** | Copy, service data, tab click behaviour, hash navigation, detail panel, theme colors, focus ring styles |

## 13. Flow-on effects

| Area           | Mitigation                                            |
| -------------- | ----------------------------------------------------- |
| Light / dark   | Layout-only; re-check both                            |
| Mobile         | Grid replaces horizontal scroll — confirm no overflow |
| a11y           | Keep `min-h-[44px]` + existing focus-visible rings    |
| Motion         | No tab-row motion; leave `AnimatePresence` alone      |
| Chatbot / copy | None                                                  |

## 14. Manual visual check routes (Sam)

| Route                      | Viewport | Theme | What to check          |
| -------------------------- | -------- | ----- | ---------------------- |
| `/services`                | 1280     | light | Equal 1×4 row          |
| `/services`                | 1280     | dark  | Same                   |
| `/services`                | 768      | light | Equal 2×2              |
| `/services`                | 375      | light | Equal 2×2, no overflow |
| `/services#custom-portals` | 1280     | light | Hash → first tab       |

## 15. Manual test plan

1. Open `/services` light desktop → scroll to What We Build → confirm equal boxes.
2. Click each of the four tabs → detail updates; active style correct.
3. Toggle dark → still equal.
4. Resize to tablet then mobile → tidy 2×2, targets ≥44px.
5. Visit hash URLs for two services → correct active tab.
6. Keyboard-tab through selectors → focus + activate.
7. Use prev/next on detail panel once → still works.

## 16. Build & docs on complete

```bash
npm run build && npm run lint
```

Then: `implementation-summary.md`, README → Done / Pending Sam QA, `SAM's CHANGES.md` status, append known-bug-patterns if useful.

## 17. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/
Out of scope: detail panel, homepage cards, Portfolio chips, nested FIELDPORTER.COM/, copy, tokens
```
