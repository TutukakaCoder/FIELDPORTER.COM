# Research — About page “Our Process” card height mismatch

## 1. Issue summary

| Field                  | Detail                                                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User goal**          | Three process step cards under “Our Process” on `/about` should appear the same size                                                                              |
| **Pain point**         | Cards 01 and 02 are shorter than card 03; row looks uneven and “doesn’t fit properly”                                                                             |
| **Current behaviour**  | `SystematicApproach` renders a 3-column grid (`md:grid-cols-3`) but card wrappers and inner panels have no height stretch — each box sizes to its own copy length |
| **Expected behaviour** | All three cards share one row height on desktop, matching the tallest card (step 03 — longest title and description)                                              |
| **Surfaces affected**  | About page — `SystematicApproach` section only (user-scoped)                                                                                                      |
| **Contexts**           | Desktop ≥768px (3-column row); mobile stacks single column (height parity less relevant); light + dark themes; Framer Motion hover (`y: -8`, `scale: 1.02`)       |
| **Severity**           | Cosmetic — layout polish, not blocking content                                                                                                                    |

## 2. Change scope + rationale

**Localized**

User scoped the About page “Our Process” three text boxes. Fix is component-level grid stretch in one file. Not a site-wide spacing token change.

**Codebase path note:** UX commands reference `hosting/`; the production marketing site lives in **`FIELDPORTER.COM/`**.

## 3. Success criteria (draft)

1. On `/about` at ≥768px width, all three “Our Process” cards share identical outer box height in the same row.
2. Row height is driven by the tallest card (step 03 content) — no arbitrary fixed `min-h-*` that could clip future copy edits.
3. Card borders, connectors, hover animation, and internal padding unchanged.
4. Mobile stacked layout unchanged (each card still content-height).
5. Light and dark themes both show equal-height row on desktop.

## 4. Assumptions vs facts

| Claim                                                                               | Source                                   |
| ----------------------------------------------------------------------------------- | ---------------------------------------- |
| Section is `SystematicApproach` with heading “Our Process”                          | Observed in `systematic-approach.tsx`    |
| Grid uses `grid-cols-1 md:grid-cols-3` without `h-full` on items                    | Observed in code                         |
| Step 03 has longest title (“Implementation & Optimization”) and longest description | Observed in `systematicApproach` array   |
| User wants cards sized to match third box                                           | User reported                            |
| Issue affects mobile 3-up layout                                                    | Inferred false — mobile is single column |
| TechnicalCapability section below has same anti-pattern                             | Observed — out of user scope             |

## 5. Reference UI notes

No reference UI supplied. Internal authority: `results-section.tsx` and `blog-grid.tsx` already use `h-full` on grid children; homepage `services-section.tsx` uses explicit `min-h-[...]` on service cards — stretch pattern preferred here for copy-driven height.

## 6. Surfaces & routes

| Route    | Entry file                           | Key sections                                                                                        |
| -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `/about` | `FIELDPORTER.COM/app/about/page.tsx` | AboutHero → CompanyFoundation → **SystematicApproach** → TechnicalCapability → TechStack → AboutCTA |

**Layout stack (in-scope section):**

```
SystematicApproach (systematic-approach.tsx)
  → section-rhythm-lg
  → heading block (mb-12 md:mb-16)
  → grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12
      → motion.div × 3 (no h-full)
          → bordered card div (no h-full)
              → number + title + description
              → connector pseudo-lines (absolute)
```

## 7. Similar surfaces map

| Surface cluster                      | Route(s)    | File(s)                                       | Same pattern as trigger?                          | In scope for fix?                                                             |
| ------------------------------------ | ----------- | --------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| **About — Our Process**              | `/about`    | `components/about/systematic-approach.tsx`    | **Yes** — 3-col glass cards, no height stretch    | **Yes**                                                                       |
| About — AI Training & Implementation | `/about`    | `components/about/technical-capability.tsx`   | **Yes** — same grid/card shell, no `h-full`       | **Defer** — user scoped “Our Process” only; replicate in follow-up if desired |
| Homepage services cards              | `/`         | `components/homepage/services-section.tsx`    | Partial — 3 cards but uses fixed `min-h-[360px+]` | No — different height strategy, already uniform                               |
| Services results grid                | `/services` | `components/services/results-section.tsx`     | Partial — already uses `h-full` on cards          | No                                                                            |
| Insights blog grid                   | `/insights` | `components/insights/blog-grid.tsx`           | Partial — already uses `h-full`                   | No                                                                            |
| Services methodology carousel        | `/services` | `components/services/methodology-section.tsx` | No — horizontal scroll, fixed card width          | No                                                                            |

## 8. Layout / chrome audit

| Element       | File                          | Today                                                      | Problem                                            |
| ------------- | ----------------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| Process grid  | `systematic-approach.tsx` L52 | `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12` | Default stretch blocked by child not filling cell  |
| Card wrapper  | L54–61                        | `motion.div` `className="relative group"`                  | No `h-full`                                        |
| Card panel    | L63–65                        | `div` with padding/border only                             | No `h-full` / flex column                          |
| Step 03 title | data L22                      | “Implementation & Optimization”                            | Wraps on md — adds height                          |
| Step 03 body  | data L23–24                   | Longest description (~3 lines desktop)                     | Sets implicit row max height                       |
| Connectors    | L88–94                        | `absolute` horizontal/vertical lines                       | Must remain centered on card midline after stretch |

### Layout forensics

- **Root cause:** Grid row stretch is the CSS default (`align-items: stretch`), but only applies if the grid item’s child fills 100% height. Motion wrapper + card div are `height: auto`.
- **Not a padding/gap issue:** `gap-6 md:gap-8 lg:gap-12` is consistent; unevenness is per-card content height only.

## 9. Code map

```
SystematicApproach
  → systematicApproach[] (3 steps)
  → map → motion.div (hover animation)
      → card div (border, backdrop-blur, p-6 md:p-8)
          → number row + title + description
          → optional connector to next card
```

## 10. Root cause

1. **Missing height chain** — Grid item children do not use `h-full`, so each card collapses to content height.
2. **Uneven copy length** — Step 03 title and description are longer than steps 01–02.
3. **Architectural** — Same pattern exists in `technical-capability.tsx` but was not built with the `h-full` pattern used elsewhere (`results-section`, `blog-grid`).

## 11. Options (ranked by regression risk)

### Option A — Grid stretch + `h-full` flex column (recommended)

Add `h-full` to `motion.div` and inner card; optional `flex flex-col` on card for stable internal layout. Row height = tallest card (03).

| Field           | Value                                   |
| --------------- | --------------------------------------- |
| Files           | `systematic-approach.tsx` only          |
| Scope           | Localized                               |
| Regression risk | **Low**                                 |
| QA              | `/about` desktop + mobile, light + dark |

### Option B — Fixed `min-h-[...]` from card 03 measurement

Hard-code min height (e.g. `min-h-[280px] md:min-h-[320px]`).

| Field           | Value                                                           |
| --------------- | --------------------------------------------------------------- |
| Regression risk | **Med** — breaks on copy/font/viewport changes                  |
| Downside        | Opposite of user intent (“size of third box” should be dynamic) |

### Option C — Systemic card utility in globals.css

New `.card-grid-equal` utility.

| Field           | Value                                       |
| --------------- | ------------------------------------------- |
| Regression risk | **Med** — unnecessary scope for one section |

## 12. Recommended direction

**Option A** for `/ux-implement` v1 — mirror existing `h-full` grid child pattern from `results-section.tsx` / `blog-grid.tsx`.

**Defer:** `technical-capability.tsx` equal-height pass (same page, separate request).

## 13. Out of scope

- `hosting/` stub app
- Copy changes / folding Strategic Research step (separate SAM's CHANGES item)
- TechnicalCapability, TechStack, About hero/CTA
- Firebase, chatbot, API, env
- Global CSS tokens

## 14. Handoff

- **Next command:** `/ux-change-plan`
- **Folder:** `Documentation/reviews/ux/2026-07-01-about-process-card-height/`
- **Visual regression routes:** `/about` (375px + 1280px, light + dark)
