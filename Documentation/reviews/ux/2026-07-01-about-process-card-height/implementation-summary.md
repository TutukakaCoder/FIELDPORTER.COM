# Implementation summary — About page “Our Process” equal card heights

## Goal

On `/about`, the three “Our Process” step cards render at the same height on desktop, matching the tallest card (step 03).

## Change scope

**Localized**

## Status

**Partial** — build and lint pass; Sam visual QA pending (no browser run in implement session).

## Similar surfaces covered

| Cluster                                              | Met?     | Notes                    |
| ---------------------------------------------------- | -------- | ------------------------ |
| About — Our Process (`systematic-approach.tsx`)      | Yes      | `h-full` stretch applied |
| About — AI Training & Implementation                 | Deferred | Out of scope per brief   |
| Homepage services / Services results / Insights blog | N/A      | Not in scope             |

## What changed

- Process grid uses explicit `items-stretch` so row height follows the tallest card.
- Each grid item (`motion.div`) and inner card panel use `h-full flex flex-col` so cards 01–02 stretch to match card 03 on desktop.
- Inner content wrapper uses `flex flex-col flex-1 min-h-0` so copy stays top-aligned with neutral space below on shorter cards.
- Copy, motion, connectors, padding, and section rhythm unchanged.

## Token changes

None — localized class changes only.

## Spacing changes

| File                      | Location      | Before                                    | After                                                               |
| ------------------------- | ------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| `systematic-approach.tsx` | Process grid  | `grid grid-cols-1 md:grid-cols-3 gap-6 …` | `… items-stretch gap-6 …`                                           |
| `systematic-approach.tsx` | Grid item     | `relative group`                          | `relative group h-full`                                             |
| `systematic-approach.tsx` | Card panel    | `relative p-6 md:p-8 rounded-2xl …`       | `relative h-full flex flex-col p-6 md:p-8 …`                        |
| `systematic-approach.tsx` | Content block | `relative z-10 space-y-4 md:space-y-6`    | `relative z-10 flex flex-col flex-1 min-h-0 space-y-4 md:space-y-6` |

## Files changed

- `FIELDPORTER.COM/components/about/systematic-approach.tsx`

## Visual acceptance criteria

| #   | Criterion                               | Met?    |
| --- | --------------------------------------- | ------- |
| 1   | Desktop 1280px — equal card heights     | Not run |
| 2   | Desktop 1280px — top-aligned content    | Not run |
| 3   | Desktop 1280px — connectors at midline  | Not run |
| 4   | Desktop 1280px — hover without clipping | Not run |
| 5   | Mobile 375px — stacked layout unchanged | Not run |
| 6   | Light + dark themes                     | Not run |
| 7   | Adjacent sections spacing unchanged     | Not run |

## Visual QA table

| #   | Route    | Viewport | Check                                   | Result  | Notes                          |
| --- | -------- | -------- | --------------------------------------- | ------- | ------------------------------ |
| 1   | `/about` | 1280px   | Equal card heights (criteria 1–4)       | Not run | Sam click-test                 |
| 2   | `/about` | 1280px   | Dark theme (criterion 6)                | Not run | Sam click-test                 |
| 3   | `/about` | 375px    | Stacked cards (criterion 5)             | Not run | Sam click-test                 |
| 4   | `/about` | 1280px   | Company Foundation above (spot-check)   | Not run | No code touched                |
| 5   | `/about` | 1280px   | Technical Capability below (spot-check) | Not run | Deferred uneven cards expected |

## Before / after

| Before                               | After                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| Desktop: cards 01–02 shorter than 03 | Desktop: grid stretch + `h-full` — all cards should match tallest row height |
| Mobile: content-height cards         | Mobile: unchanged (single column, no forced equal height)                    |
| Hover / connectors / copy            | Unchanged                                                                    |

## Reference comparison

No reference images supplied.

## Build & lint

```bash
cd FIELDPORTER.COM && npm run build   # ✓ pass
cd FIELDPORTER.COM && npm run lint    # ✓ pass, no warnings
```

## Knowledge / content updates

None.

## Follow-ups

- Sam: visual QA on `/about` (light + dark, 375px + 1280px) — mark UX index **Done** when satisfied.
- Optional follow-up: apply same `h-full` pattern to `technical-capability.tsx` on the same page.

## Blockers

None — visual QA deferred to Sam.
