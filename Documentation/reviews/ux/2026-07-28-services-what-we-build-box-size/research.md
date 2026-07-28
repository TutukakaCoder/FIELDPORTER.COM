# Research — Services “What We Build” equal-size boxes

## 1. Issue summary

| Field     | Detail                                                                                     |
| --------- | ------------------------------------------------------------------------------------------ |
| User goal | Scan the four capability selectors under What We Build as a neat, uniform set              |
| Pain      | Boxes look different sizes and stack unevenly; comparison feels sloppy                     |
| Current   | Four tab buttons size to label length; at desktop they wrap to a ragged 2×2; widths differ |
| Expected  | All four boxes same width and height, stacked on a regular grid                            |
| Surfaces  | `/services` — What We Build selector row only                                              |
| Severity  | polish                                                                                     |

## 2. Change scope + rationale

**Localized** — one flex row inside `InteractiveServiceShowcase` in `app/services/page.tsx`. Same equal-cell pattern as the About process cards / prior Four Things grid fix. No token or site-wide layout change required for v1.

**App path note:** Live marketing site is the **repo root** Next app (`app/`, `components/`). Nested `FIELDPORTER.COM/` is a stale duplicate; do not edit it for this fix.

## 3. Success criteria (draft)

1. On `/services` under What We Build, the four selectors share equal width and height within each breakpoint layout.
2. Desktop (`lg+`): either one equal 1×4 row or a tidy equal 2×2 (plan locks which); column edges align when wrapped.
3. Tablet / mobile: equal cells (prefer 2×2); touch target ≥ `min-h-[44px]` preserved.
4. Active / inactive styles, focus rings, hash deep links (`#custom-portals`, etc.), and detail panel unchanged.
5. Light and dark themes both show equal boxes.

## 4. Assumptions vs facts

| Claim                                                                                             | Source                                                    |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Heading is “What We Build”; four titles match Sam’s list                                          | Observed on production + `app/services/page.tsx` L291–335 |
| Selectors are `<button>` tabs, not four always-visible content cards                              | Observed L314–336                                         |
| Row uses `flex` + `md:flex-wrap` + `shrink-0` (content width)                                     | Observed L304, L318                                       |
| At 1280px widths ≈ 382 / 429 / 429 / 399 px; heights 62; wraps to 2 rows with uneven left edges   | Observed (Playwright measure on fieldporter.com)          |
| At 768px short labels still unequal ≈ 155 / 172 / 137 / 138 px                                    | Observed                                                  |
| Prior July 2026 grid fix applied to nested `FIELDPORTER.COM/app/services/page.tsx`, not live root | Observed (diff of both files + known-bug #3 status)       |
| User wants equal **tab boxes**, not full content-card redesign                                    | Inferred from “text boxes… same size… stacked neatly”     |

## 5. Surfaces & routes

| Route       | Entry                   | Stack                                                                                  |
| ----------- | ----------------------- | -------------------------------------------------------------------------------------- |
| `/services` | `app/services/page.tsx` | `ServiceHero` → **`InteractiveServiceShowcase`** → `MethodologySection` → `FAQSection` |

In-scope:

```
InteractiveServiceShowcase
  → section#services-showcase
  → heading “What We Build”
  → scroll wrapper → flex row of 4 buttons   ← IN SCOPE
  → AnimatePresence detail panel             ← out of scope
```

## 6. Similar surfaces map

| Cluster                      | Route        | File                                       | Same pattern?                                     | In scope?       |
| ---------------------------- | ------------ | ------------------------------------------ | ------------------------------------------------- | --------------- |
| Services What We Build tabs  | `/services`  | `app/services/page.tsx` L303–338           | Yes — flex content pills                          | **Yes**         |
| Homepage What We Build cards | `/`          | `components/homepage/services-section.tsx` | No — 2×2 content cards with `min-h-[320px+]`      | No              |
| Portfolio category chips     | `/portfolio` | `app/portfolio/page.tsx` ~L957             | Partial — horizontal scroll `flex-shrink-0` chips | Defer           |
| Nested stale services page   | (unused)     | `FIELDPORTER.COM/app/services/page.tsx`    | Already grid-fixed (old copy)                     | No — do not use |
| About Our Process            | `/about`     | `components/about/systematic-approach.tsx` | Reference: grid + `h-full`                        | No              |

## 7. Layout / token forensics

| Element                   | Today                                                          | Problem                                                                   |
| ------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Tab row (`page.tsx` L304) | `flex … md:flex-wrap … w-max md:w-auto`                        | Content-driven widths; wrap creates ragged 2×2                            |
| Tab button (L318)         | `shrink-0 min-h-[44px] px-3…lg:px-8` — no `w-full` / grid cell | Width follows longest visible label                                       |
| Labels (L330–333)         | Full title at `lg:inline`; short labels below `lg`             | Desktop titles vary most (longest: “Databases, Dashboards and Reporting”) |
| Outer scroller (L303)     | `overflow-x-auto` + negative margin                            | Mobile horizontal scroll OK; fights equal grid if left as-is on `md+`     |

**Measured (production, light):**

| Viewport | Widths (px)                | Notes                                                  |
| -------- | -------------------------- | ------------------------------------------------------ |
| 1280     | 381.7, 428.9, 428.7, 398.5 | 2×2 wrap; left edges misaligned (~221 vs ~213)         |
| 768      | 155.3, 172, 136.7, 138     | Single row; still unequal                              |
| Height   | 62 (1280) / 46 (768)       | Height equal when single-line; risk if any title wraps |

Baselines: `baseline-1280-light.png`, `baseline-768-light.png` in this folder.

## 8. Options

### A — CSS grid equal cells (recommended for `/ux-plan`)

Replace flex row with `grid grid-cols-2 lg:grid-cols-4 gap-* items-stretch max-w-5xl mx-auto`. Buttons: `w-full h-full min-h-[44px] flex items-center justify-center text-center` + optional `line-clamp-2`. Drop `shrink-0` / content-only width on `md+`; keep optional horizontal scroll only below `sm` if needed.

- Risk: Low · Regression: Services tabs + hash links · Effort: S

### B — Option A + shared min-height

Same grid, plus tuned `min-h-[…]` so both rows of a 2×2 match even if one label wraps.

- Risk: Low · Effort: S · Downside: one-off min-height if copy shortens

### C — Always 2×2 equal grid (all breakpoints)

`grid-cols-2` only (no 4-across). Maximises neat stacking; four equal cells always.

- Risk: Low · Effort: S · Open: Sam may prefer 1×4 on wide desktop

### D — Also fix Portfolio chips in same PR

Broader than request; chip row is intentionally scrollable, not a 2×2 capability grid.

- Risk: Med · Effort: M · Recommend defer

**Primary for v1:** **Option A** (mirror proven About / prior Four Things fix). Prefer **C** only if Sam wants 2×2 at every width.

## 9. Open questions for plan

1. Desktop layout: **1×4** equal columns (`lg:grid-cols-4`) or always **2×2**?
2. Keep short labels below `lg`, or show full titles with `line-clamp-2` in equal cells?
3. Remove horizontal scroll wrapper on `md+` (recommended) or keep for edge cases?
4. Touch Portfolio chips in a follow-up only? (default: yes, defer)

## 10. Handoff

- Folder: `Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/`
- Next: `/ux-plan`
- Out of scope (so far): detail carousel, methodology, FAQ, homepage cards, nested `FIELDPORTER.COM/` duplicate, Portfolio chips, copy changes
