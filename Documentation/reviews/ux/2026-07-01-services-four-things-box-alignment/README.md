# Services page — Four Things We Do box alignment

|                 |                                                                           |
| --------------- | ------------------------------------------------------------------------- |
| **Folder**      | `Documentation/reviews/ux/2026-07-01-services-four-things-box-alignment/` |
| **Date**        | 2026-07-01                                                                |
| **Reported by** | Sam                                                                       |
| **Status**      | Partial — build/lint pass; Sam visual QA pending                          |

## Issue

On the Services page (`/services`), under the “Four Things We Do” heading, the four service selector boxes should be aligned vertically and horizontally and all the same size.

## Change scope

**Localized** — `InteractiveServiceShowcase` tab selector row in `FIELDPORTER.COM/app/services/page.tsx`.

## SAM's CHANGES.md

[`SAM's CHANGES.md`](../../../SAM's%20CHANGES.md) — “Four Things We Do tab boxes uneven size”

## Documents

| Document                                                 | Status                        |
| -------------------------------------------------------- | ----------------------------- |
| [research.md](./research.md)                             | ✓ Complete                    |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                    |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — visual QA pending |

## Result

Tab row uses CSS grid (`grid-cols-2 lg:grid-cols-4`) with full-size buttons so all four selectors share equal cell dimensions.

## Next step

Sam: visual QA on `/services` (light + dark, 375 / 768 / 1280px). Mark Done in UX index when satisfied.

**Note:** Live marketing app code is under `FIELDPORTER.COM/` (not the `hosting/` stub).
