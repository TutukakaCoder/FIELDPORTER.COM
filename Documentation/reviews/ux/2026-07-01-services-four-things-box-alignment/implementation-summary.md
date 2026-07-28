# Implementation summary — Services page “Four Things We Do” box alignment

## Goal

On `/services`, the four service selector boxes under “Four Things We Do” form a uniform grid with equal width and height per cell.

## Change scope

**Localized**

## Status

**Partial** — build and lint pass; Sam visual QA pending (no browser run in implement session).

## Similar surfaces covered

| Cluster                                                  | Met?     | Notes                          |
| -------------------------------------------------------- | -------- | ------------------------------ |
| Services — Four Things tab row (`app/services/page.tsx`) | Yes      | Flex → grid; full-size buttons |
| Portfolio category tabs                                  | Deferred | Out of scope per brief         |
| Homepage services cards                                  | N/A      | Different UX; not in scope     |

## What changed

- Tab selector row converted from `flex flex-wrap` to `grid grid-cols-2 lg:grid-cols-4 items-stretch max-w-5xl mx-auto`.
- Each tab button fills its grid cell (`w-full h-full min-h-[44px]`) with centered icon + label.
- Long titles clamp to two lines (`line-clamp-2`); desktop type reduced to `lg:text-base lg:leading-snug`.
- Active/inactive styles, hash anchors, detail carousel, and section rhythm unchanged.

## Token changes

None — localized class changes only.

## Spacing changes

| File                    | Location    | Before                                           | After                                                                                               |
| ----------------------- | ----------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `app/services/page.tsx` | Tab wrapper | `flex justify-center … flex-wrap px-4`           | `grid grid-cols-2 lg:grid-cols-4 … px-4 max-w-5xl mx-auto items-stretch`                            |
| `app/services/page.tsx` | Tab button  | `min-h-[44px] px-4 md:px-4 lg:px-8 … lg:text-lg` | `w-full h-full min-h-[44px] flex … px-3 md:px-4 lg:px-4 … lg:text-base lg:leading-snug text-center` |
| `app/services/page.tsx` | Inner span  | `flex items-center gap-1 md:gap-2 lg:gap-3`      | `flex items-center justify-center gap-1 md:gap-2 lg:gap-2 w-full`                                   |
| `app/services/page.tsx` | Title spans | No clamp                                         | `line-clamp-2` on all three breakpoint variants                                                     |

## Files changed

- `FIELDPORTER.COM/app/services/page.tsx`

## Visual acceptance criteria

| #   | Criterion                              | Met?    |
| --- | -------------------------------------- | ------- |
| 1   | Desktop (1280px) — equal widths        | Not run |
| 2   | Desktop (1280px) — equal heights       | Not run |
| 3   | Desktop (1280px) — active state        | Not run |
| 4   | Tablet (768px) — 2×2 grid              | Not run |
| 5   | Mobile (375px) — 2×2 grid, ≥44px touch | Not run |
| 6   | Long title fits in cell (2 lines max)  | Not run |
| 7   | Hash deep links                        | Not run |
| 8   | Keyboard focus + activation            | Not run |
| 9   | Light + dark themes                    | Not run |
| 10  | Detail carousel unchanged              | Not run |

## Visual QA table

| #   | Route                         | Viewport | Check                | Result  | Notes                     |
| --- | ----------------------------- | -------- | -------------------- | ------- | ------------------------- |
| 1   | `/services`                   | 1280px   | Equal-width tab grid | Not run | Sam to verify             |
| 2   | `/services`                   | 1280px   | Equal-height tab row | Not run | Sam to verify             |
| 3   | `/services`                   | 1280px   | Active tab styling   | Not run | Sam to verify             |
| 4   | `/services`                   | 768px    | 2×2 grid alignment   | Not run | Sam to verify             |
| 5   | `/services`                   | 375px    | 2×2 mobile grid      | Not run | Sam to verify             |
| 6   | `/services`                   | 1280px   | Long title clamp     | Not run | “Process Efficiency…” tab |
| 7   | `/services#rapid-development` | 1280px   | Hash deep link       | Not run | Sam to verify             |
| 8   | `/services#ai-strategy`       | 1280px   | Hash deep link       | Not run | Sam to verify             |
| 9   | `/services`                   | 1280px   | Light + dark themes  | Not run | Sam to verify             |
| 10  | `/services`                   | 1280px   | Prev/next carousel   | Not run | Sam to verify             |

## Before / after

| Before                                                         | After                                                                      |
| -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Four tab pills in flex row; uneven widths/heights; ragged wrap | Four tabs in CSS grid; equal cell dimensions; 2×2 below `lg`, 1×4 at `lg+` |
| Content-sized button width                                     | `w-full h-full` fills grid track                                           |
| Tab click → detail panel                                       | Unchanged                                                                  |
| Hash navigation                                                | Unchanged                                                                  |

## Reference comparison

No reference UI supplied.

## Build & lint

```bash
cd FIELDPORTER.COM && npm run build   # ✓ pass
cd FIELDPORTER.COM && npm run lint    # ✓ pass (no warnings)
```

## Knowledge / content updates

None — layout-only change.

## Follow-ups

- Sam visual QA on `/services` (375 / 768 / 1280px; light + dark; hash links).
- Portfolio category tabs (`app/portfolio/page.tsx`) — same flex-wrap pattern; replicate grid in follow-up if desired.

## Blockers

None for code merge. Status **Partial** until Sam completes visual QA.
