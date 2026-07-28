# Services page — What We Build box size

|                 |                                                                        |
| --------------- | ---------------------------------------------------------------------- |
| **Folder**      | `Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/` |
| **Date**        | 2026-07-28                                                             |
| **Reported by** | Sam                                                                    |
| **Status**      | Partial — pending Sam visual QA                                        |

## Issue

On `/services`, under **What We Build**, the four capability selector boxes were different widths and wrapped unevenly.

## Change scope

**Localized** — tab selector row in `InteractiveServiceShowcase` (`app/services/page.tsx`).

## Approach

**Option A** — CSS grid equal cells (`grid-cols-2 lg:grid-cols-4`), full-size buttons, short labels below `lg`, `line-clamp-2` on titles. Horizontal scroll wrapper removed.

## Documents

| Document                                                 | Status                                              |
| -------------------------------------------------------- | --------------------------------------------------- |
| [research.md](./research.md)                             | ✓ Complete                                          |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                                          |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — Sam visual QA pending                   |
| Baselines                                                | `baseline-1280-light.png`, `baseline-768-light.png` |

## What Sam should click-test

1. `/services` light + dark at 1280 — equal 1×4 boxes under What We Build
2. 768 and 375 — tidy equal 2×2
3. Click all four tabs; try a hash URL; keyboard focus; detail prev/next

## Next step

Sam: visual QA on the checklist in [implementation-summary.md](./implementation-summary.md). Mark Done when satisfied.
