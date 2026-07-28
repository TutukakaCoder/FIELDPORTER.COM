# Insights — Stay Ahead newsletter spacing

|                 |                                                                    |
| --------------- | ------------------------------------------------------------------ |
| **Folder**      | `Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/` |
| **Date**        | 2026-07-28                                                         |
| **Reported by** | Sam                                                                |
| **Status**      | Partial — pending Sam visual QA                                    |

## Issue

On `/insights`, the “Stay Ahead with AI Insights” newsletter card felt messy and cramped inside, with a large empty gap above it relative to the blog grid.

## Change scope

**Localized** — `components/insights/newsletter-signup.tsx` only. Replaced undefined spacing classes with real padding/`space-y-*`; tightened section top padding.

## Approach

**Option A** — Fix phantom classes + asymmetric section padding. Match success-state card padding `p-8 md:p-12`.

## Documents

| Document                                                 | Status                            |
| -------------------------------------------------------- | --------------------------------- |
| [research.md](./research.md)                             | ✓ Complete                        |
| [task-brief.md](./task-brief.md)                         | ✓ Complete                        |
| [implementation-summary.md](./implementation-summary.md) | ✓ Partial — Sam visual QA pending |

## What Sam should click-test

1. `/insights` light + dark at 1280 — newsletter card padding and gap above
2. 768 / 375 — form stack and social-proof wrap
3. Mid-page “Subscribe for Updates” scroll target
4. Optional subscribe success state padding
5. `/contact` newsletter unchanged

## Next step

Sam: visual QA on the checklist in [implementation-summary.md](./implementation-summary.md). Mark Done when satisfied.
