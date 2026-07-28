# Services page — How a custom build works (steps cleanup)

|                 |                                                                            |
| --------------- | -------------------------------------------------------------------------- |
| **Folder**      | `Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/` |
| **Date**        | 2026-07-28                                                                 |
| **Reported by** | Sam                                                                        |
| **Status**      | Partial — pending Sam visual QA                                            |

## Issue

On `/services`, the **How a custom build works** section used five card-style steps in a horizontal carousel (desktop) / stacked cards (mobile). It felt heavier and harder to scan than it needed to.

## Change scope

**Localized** — Services methodology UI. Kept 5 phases; layout-only.

## Approach

**Option A** — Vertical numbered `<ol>` timeline; nested `py-*` removed so page `section-rhythm-xl` owns vertical rhythm.

## Documents

| Document                                                 | Status                            |
| -------------------------------------------------------- | --------------------------------- |
| [research.md](./research.md)                             | ✓ Complete                        |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                        |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — Sam visual QA pending |

## What Sam should click-test

1. `/services` light + dark @ 1280 — vertical list, all 5 steps, no carousel/arrows
2. 768 and 375 — same list, no card chrome
3. Gap into Common Questions — should feel tighter
4. What We Build tabs still work

## Next step

Sam: visual QA on the checklist in [implementation-summary.md](./implementation-summary.md). Mark Done when satisfied.
