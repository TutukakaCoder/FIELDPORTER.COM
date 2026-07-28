# Homepage hero — light mode text contrast

|                 |                                                                 |
| --------------- | --------------------------------------------------------------- |
| **Folder**      | `Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/` |
| **Date**        | 2026-07-01                                                      |
| **Reported by** | Sam                                                             |
| **Status**      | Partial — build/lint pass; Sam visual QA pending                |

## Issue

On the FIELDPORTER homepage (`/`) in **light mode**, the hero headline (“AI Systems Your Team Can Actually Use”) and subhead (“We build AI automations, internal tools, and workflows for growing companies”) are hard to read because they use white or very light gray text on a light background. User request: headline in black; subhead darker; any remaining white hero copy switched to dark text in light mode.

## Change scope

**Localized** — homepage hero section (`hero-section.tsx`). Other homepage sections already use theme-aware `text-gray-900 dark:text-white` pairs.

## SAM's CHANGES.md

New entry added under Design & UX (see repo root [`SAM's CHANGES.md`](../../../SAM's%20CHANGES.md)).

## Reference assets

None supplied.

## Documents

| Document                                                 | Status                        |
| -------------------------------------------------------- | ----------------------------- |
| [research.md](./research.md)                             | ✓ Complete                    |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                    |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — visual QA pending |

## Result

Hero light-mode text uses dark headline/subhead/badge/CTA styling in `hero-section.tsx`; dark mode preserved.

## Next step

Sam: visual QA on `/` (light + dark, mobile + desktop). Mark Done in UX index when satisfied.

**Note:** Live marketing app code is under `FIELDPORTER.COM/` (not the `hosting/` stub).
