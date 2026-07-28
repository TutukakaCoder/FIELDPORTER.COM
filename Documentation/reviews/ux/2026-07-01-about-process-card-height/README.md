# About page — Our Process equal card heights

|                 |                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Folder**      | `Documentation/reviews/ux/2026-07-01-about-process-card-height/`                                                                                 |
| **Date**        | 2026-07-01                                                                                                                                       |
| **Reported by** | Sam                                                                                                                                              |
| **Status**      | Superseded — live app still uneven; see [`2026-07-28-about-equal-card-heights`](../2026-07-28-about-equal-card-heights/) (Process + AI Training) |

## Issue

On the About page (`/about`), under “Our Process”, the three step cards are uneven heights — cards 01 and 02 are shorter than card 03. User request: make all three text boxes the same size, matching the third (tallest) box.

## Change scope

**Localized** — `components/about/systematic-approach.tsx` only.

## Documents

| Document                                                 | Status                        |
| -------------------------------------------------------- | ----------------------------- |
| [research.md](./research.md)                             | ✓ Complete                    |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                    |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — visual QA pending |

## Result

Grid stretch + `h-full` on Our Process cards so desktop row height matches tallest card (step 03).

## Next step

Sam: visual QA on `/about` (light + dark, mobile + desktop). Mark Done in UX index when satisfied.

**Note:** Live marketing app code is under `FIELDPORTER.COM/` (not the `hosting/` stub).
