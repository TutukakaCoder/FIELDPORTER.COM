# Portfolio page — category tabs position

|                 |                                                                         |
| --------------- | ----------------------------------------------------------------------- |
| **Folder**      | `Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/` |
| **Date**        | 2026-07-28                                                              |
| **Reported by** | Sam                                                                     |
| **Status**      | Partial — pending Sam visual QA                                         |

## Issue

On `/portfolio`, the four category chips sat too low under the Portfolio hero, and the sticky bar’s bottom line covered content beneath when scrolling.

## Change scope

**Localized** — `PortfolioHero` height + `InteractivePortfolioShowcase` top rhythm and sticky chip chrome in `app/portfolio/page.tsx`.

## Approach

**Option A** — Content-sized hero (no `min-h-screen`), `section-rhythm` on showcase, translucent sticky chips with no `border-b`.

## Documents

| Document                                                 | Status                            |
| -------------------------------------------------------- | --------------------------------- |
| [research.md](./research.md)                             | ✓ Complete                        |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                        |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — Sam visual QA pending |

## What Sam should click-test

1. `/portfolio` light + dark at 1280 — title + four chips on first paint
2. Sticky scroll — no hard line cutting project content
3. 768 / 375 — tight gap, chip scroll, no header overlap
4. Category click / swipe / accordion still work
5. `/about` and `/services` heroes unchanged

## Next step

Sam: visual QA on the checklist in [implementation-summary.md](./implementation-summary.md). Mark Done when satisfied.
