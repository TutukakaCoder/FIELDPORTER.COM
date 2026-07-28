# Implementation summary — Services “What We Build” equal-size boxes

## Goal

On `/services`, the four What We Build capability selectors share equal width and height in a neat grid at every breakpoint.

## Change scope

**Localized**

## Status

**Partial — pending Sam visual QA**

## What changed (user-visible)

- What We Build selector row is now a regular CSS grid: 2×2 below `lg`, 1×4 at `lg+`.
- All four tabs fill equal cells (same width/height within a row).
- Horizontal scroll pill row removed; long titles clamp to two lines at desktop.
- Active/inactive styles, clicks, hash links, and detail panel unchanged.

## Token / spacing changes

None in `globals.css`. Localized class updates only:

| Location         | Before                          | After                                                               |
| ---------------- | ------------------------------- | ------------------------------------------------------------------- |
| Selector wrapper | flex + wrap + overflow-x scroll | `grid grid-cols-2 lg:grid-cols-4 … max-w-5xl mx-auto items-stretch` |
| Buttons          | `shrink-0` content width        | `w-full h-full` + centered flex + `lg:text-base`                    |
| Labels           | no clamp                        | `line-clamp-2`                                                      |

## Files changed

| File                    | Change                                      |
| ----------------------- | ------------------------------------------- |
| `app/services/page.tsx` | Selector row flex → grid; full-cell buttons |

## Visual acceptance criteria

| #   | Criterion               | Code matches brief?   | Sam visual QA |
| --- | ----------------------- | --------------------- | ------------- |
| 1   | 1280 equal widths       | Yes                   | Not run       |
| 2   | 1280 equal heights      | Yes                   | Not run       |
| 3   | Active state fills cell | Yes                   | Not run       |
| 4   | 768 2×2                 | Yes                   | Not run       |
| 5   | 375 2×2, ≥44px          | Yes                   | Not run       |
| 6   | Long title ≤2 lines     | Yes                   | Not run       |
| 7   | Hash deep links         | Yes (logic untouched) | Not run       |
| 8   | Keyboard focus          | Yes (rings preserved) | Not run       |
| 9   | Dark theme              | Yes (layout-only)     | Not run       |
| 10  | Detail panel unchanged  | Yes                   | Not run       |

## Manual check list for Sam

- [ ] `/services` @ 1280 light — equal 1×4 row under What We Build
- [ ] `/services` @ 1280 dark — same
- [ ] `/services` @ 768 light — equal 2×2
- [ ] `/services` @ 375 light — equal 2×2, no horizontal overflow
- [ ] Click each of the four tabs — detail updates; active style correct
- [ ] `/services#custom-portals` (and one other hash) — correct tab active
- [ ] Keyboard-tab through selectors — focus ring + Enter/Space
- [ ] Detail panel prev/next still works

## Deferred / follow-ups

- Portfolio category chips (intentional scroll filters)
- Nested stale `FIELDPORTER.COM/app/services/page.tsx` (do not edit)

## Known-bug-patterns

Updated pattern #3 to reflect the live root `app/services/page.tsx` fix (2026-07-28).
