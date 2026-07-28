# Implementation summary — Insights “Stay Ahead” newsletter spacing

## Goal

Make the `/insights` “Stay Ahead with AI Insights” newsletter card evenly spaced and close the oversized gap above it.

## Change scope

**Localized** — `components/insights/newsletter-signup.tsx` only (Option A).

## Status

**Partial — pending Sam visual QA**

## What changed (user-visible)

- Newsletter card now has real padding and vertical rhythm between icon, copy, benefits, form, privacy, and social proof.
- Section top padding reduced so the card sits closer under the blog grid; bottom padding kept solid.
- Social-proof checkmarks wrap on narrow widths instead of forcing a wide single row.

## Token / spacing changes

| Location                    | Before                          | After                                           |
| --------------------------- | ------------------------------- | ----------------------------------------------- |
| Section (default + success) | `section-spacing-lg`            | `pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24` |
| Default GlassCard           | `card-spacing-lg` (undefined)   | `p-8 md:p-12`                                   |
| Inner stack                 | `component-spacing` (undefined) | `space-y-6 md:space-y-8`                        |
| Title block                 | `text-spacing` (undefined)      | `space-y-3`                                     |
| Social-proof row            | `space-x-8`                     | `flex-wrap gap-x-6 gap-y-2`                     |

## Files changed

| File                                                                | Change                                                                     |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `components/insights/newsletter-signup.tsx`                         | Asymmetric section padding; real card/stack spacing; wrap social-proof row |
| `Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/*` | Docs                                                                       |
| `SAM's CHANGES.md`                                                  | Status update                                                              |
| `.cursor/skills/known-bug-patterns/SKILL.md`                        | Pattern #10 appended                                                       |

## Visual acceptance criteria

| #   | Criterion                                           | Code matches brief? | Sam visual QA |
| --- | --------------------------------------------------- | ------------------- | ------------- |
| 1   | Desktop 1280 light — clear padding + even gaps      | Yes                 | Not run       |
| 2   | Desktop 1280 dark — same spacing; readable          | Yes                 | Not run       |
| 3   | Gap above tighter; still distinct section           | Yes                 | Not run       |
| 4   | 768 / 375 — padding holds; form stacks; proof wraps | Yes                 | Not run       |
| 5   | Success state padded; same section shell            | Yes                 | Not run       |
| 6   | No theme contrast regressions from this change      | Yes (classes only)  | Not run       |
| 7   | Submit / scroll-to `#newsletter-signup` unchanged   | Yes                 | Not run       |

## Manual check list for Sam

- [ ] `/insights` @ 1280 light — scroll to newsletter; padding + tighter gap above
- [ ] Toggle dark — same spacing; readable glass/text
- [ ] 768 and 375 — padding; form stack; proof wraps; no horizontal overflow
- [ ] Mid-page “Subscribe for Updates” scrolls to newsletter
- [ ] Error/success layouts look padded (optional live submit)
- [ ] Spot-check `/contact` newsletter card unchanged

## Deferred / follow-ups

- Option B: simplify density / remove unverified “Join 500+…”
- Option C: two-column layout
- BlogGrid bottom `py-*` trim (join fixed from newsletter top only)
- Contact secondary newsletter card

## Known-bug-patterns

Appended **#10 Undefined spacing utility class names (phantom classes)**.
