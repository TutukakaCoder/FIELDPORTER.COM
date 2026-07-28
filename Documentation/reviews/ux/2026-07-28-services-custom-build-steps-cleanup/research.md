# Research — Services “How a custom build works” cleanup

## 1. Issue summary

| Field     | Detail                                                                                        |
| --------- | --------------------------------------------------------------------------------------------- |
| User goal | Make the custom-build process section easier and cleaner to read                              |
| Pain      | Five heavy step cards + desktop carousel feel busy; process is harder to scan than necessary  |
| Current   | 5 phases as bordered cards; mobile stacked list; desktop horizontal scroll + prev/next arrows |
| Expected  | A calmer, at-a-glance process that reads as one sequence without carousel chrome              |
| Surfaces  | `/services` → Methodology only (v1)                                                           |
| Severity  | polish                                                                                        |

## 2. Change scope + rationale

**Localized** — primary surface is `MethodologySection` on Services. Site-wide process grids (About, Contact, AIOS) already use simpler 3-card layouts and are **out of scope** for v1 unless Sam expands. Optional copy consolidation (5 → 3–4 steps) stays Localized content change, not a design-system change.

## 3. Success criteria (draft)

1. At md+ and lg, the full process is understandable without horizontal scrolling or arrow controls.
2. Mobile shows a short, scannable sequence (not five tall equal cards unless still needed).
3. Light + dark: step labels, titles, and body remain readable (`text-gray-900` / `dark:text-white` + muted body pairs).
4. Section padding does not double-stack with the page wrapper (no extra dead space before FAQ).
5. Visual weight is below the “What We Build” showcase above it (supporting section, not a second product carousel).

## 4. Assumptions vs facts

| Claim                                                                             | Source                                                           |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Section title is “How a custom build works” with 5 phases                         | Observed — `methodologyData` in `app/services/page.tsx` L129–164 |
| Desktop uses horizontal scroll + prev/next; mobile stacks cards                   | Observed — `methodology-section.tsx` L61–128                     |
| Cards are fixed ~300–340px wide (`flex-shrink-0`) so 5 cannot fit one viewport    | Observed — L95                                                   |
| Sam wants it “easier and cleaner”                                                 | User-reported                                                    |
| Carousel + 5 cards is the main clutter driver                                     | Inferred from layout + Sam ask                                   |
| Steps 01–02 overlap (workflow vs roles/data) and could merge                      | Inferred from copy side-by-side                                  |
| Double rhythm: page `section-rhythm-xl` + component `py-16 md:py-24` adds FAQ gap | Observed structure; gap already logged in SAM's CHANGES          |

## 5. Surfaces & routes

`/services` → `app/services/page.tsx` (`ServicesPage` L472–489)  
→ wraps `<MethodologySection {...methodologyData} />` in `section-rhythm-xl`  
→ `components/services/methodology-section.tsx`

Data: `methodologyData.phases` — 01 Understand → 02 Map roles → 03 Design → 04 Build → 05 Test/launch/train.

## 6. Similar surfaces map

| Cluster                       | Route       | File                                          | Same pattern?                              | In scope?           |
| ----------------------------- | ----------- | --------------------------------------------- | ------------------------------------------ | ------------------- |
| Services methodology          | `/services` | `components/services/methodology-section.tsx` | Target (5-card carousel)                   | Yes                 |
| About process                 | `/about`    | `components/about/systematic-approach.tsx`    | Related (3 equal cards, grid, no carousel) | No — reference only |
| Contact next steps            | `/contact`  | `components/contact/contact-methods.tsx`      | Related (3 cards / mobile compact list)    | No                  |
| AIOS how it works             | `/aios`     | `app/aios/page.tsx`                           | Related (3 icon cards, grid)               | No                  |
| Homepage services             | `/`         | `components/homepage/services-section.tsx`    | Different (offer cards, not build steps)   | No                  |
| Portfolio / Insights / Shared | —           | —                                             | No matching 5-step carousel                | No                  |

## 7. Layout / token forensics

| Element         | Today                                                        | Problem                                                   |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| Desktop layout  | `flex` + `overflow-x-auto` + `snap-x` + arrow buttons        | Hides later steps; carousel chrome for a linear process   |
| Card chrome     | `rounded-2xl border … bg-white dark:bg-black p-5 md:p-8` × 5 | High visual density for supporting content                |
| Card width      | `w-[300px] lg:w-[340px] flex-shrink-0`                       | Forces scroll at typical desktop widths                   |
| Step label      | `Step {phase}` + blue (`text-blue-500`)                      | Fine; “Step 01” is slightly redundant with numbered phase |
| Section padding | Outer `section-rhythm-xl` + inner `py-16 md:py-24`           | Double vertical rhythm (known pattern #7); feeds FAQ gap  |
| Mobile          | Full card stack × 5                                          | Readable but long; no progressive disclosure              |

## 8. Options

**A — Vertical numbered list / timeline (recommend for `/ux-plan`)**  
Drop carousel and card strip. One column (or narrow max-width) with number, title, short description, light connectors optional.

- Risk: low. Regression: Services methodology only. Effort: S.

**B — Static responsive grid, keep 5 cards**  
e.g. `grid-cols-1 md:grid-cols-2 xl:grid-cols-5` or 2+3 wrap; remove scroll/arrows.

- Risk: low–med (5 cols still cramped at xl; uneven last row). Effort: S.

**C — Consolidate to 3–4 steps + About-style grid**  
Merge overlapping phases (e.g. 01+02, and/or fold train into launch), then 3–4 equal cards like About.

- Risk: med (copy/IA decisions). Effort: M. Cleanest long-term if Sam wants fewer beats.

**D — Keep carousel, polish only**  
Tighten padding, smaller cards, better scroll affordance.

- Risk: low. Does not solve “easier/cleaner.” Effort: S. Not recommended.

**Primary recommendation:** **A** for v1. Ask Sam in plan whether to also do **C** (fewer steps) in the same pass.

## 9. Open questions for plan

1. Keep all **5** phases, or consolidate (candidate merges: 01+02; train into 05 already combined)?
2. Prefer **list/timeline (A)** vs **grid of cards (B/C)** for brand consistency with About?
3. Fix **double section padding** in the same pass (helps FAQ gap already logged)?
4. Any copy rewrite beyond layout, or layout-only for v1?

## 10. Handoff

- Folder: `Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/`
- Next: `/ux-plan`
- Out of scope (so far): About / Contact / AIOS process sections; What We Build showcase; FAQ content
