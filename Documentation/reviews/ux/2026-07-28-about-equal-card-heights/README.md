# About page — equal card heights (Process + AI Training)

|                 |                                                                 |
| --------------- | --------------------------------------------------------------- |
| **Folder**      | `Documentation/reviews/ux/2026-07-28-about-equal-card-heights/` |
| **Date**        | 2026-07-28                                                      |
| **Reported by** | Sam                                                             |
| **Status**      | Partial — pending Sam visual QA                                 |
| **Route**       | `/about`                                                        |

## Issue

On the About page, the three cards under **Our Process** and the three cards under **AI Training & Implementation** are different heights. They should share one uniform size within each row.

## Change scope

**Pattern (2 surfaces)** — same missing `h-full` height chain in:

- `components/about/systematic-approach.tsx`
- `components/about/technical-capability.tsx`

## Chosen approach

**Option A** — grid `items-stretch` + `h-full` / `flex flex-col` on wrappers and cards (both sections). Defer Contact/AIOS; ignore nested duplicate tree.

## Documents

| Document                                                           | Status                            |
| ------------------------------------------------------------------ | --------------------------------- |
| [research.md](./research.md)                                       | ✓ Complete                        |
| [task-brief.md](./task-brief.md)                                   | ✓ Complete                        |
| [implementation-summary.md](./implementation-summary.md)           | ✓ Partial — pending Sam visual QA |
| [about-process-cards-before.png](./about-process-cards-before.png) | Baseline (Process row)            |

## What Sam should click-test

1. `/about` @ **1280** light — Process cards equal height; connectors; hover
2. Same — AI Training cards equal height; hover
3. Toggle **dark** @ 1280 — both rows still equal
4. `/about` @ **375** — stacked cards, natural heights
5. Theme toggle on mobile — no jump
6. Adjacent sections (Company Foundation / TechStack) spacing unchanged

Dev server: `http://localhost:3000/about` (already running from workspace root).

## Related prior work

[`2026-07-01-about-process-card-height`](../2026-07-01-about-process-card-height/) scoped Process only; this folder supersedes that work for both sections.

## Next step

Sam: visual QA on `/about`. Mark Done when satisfied.
