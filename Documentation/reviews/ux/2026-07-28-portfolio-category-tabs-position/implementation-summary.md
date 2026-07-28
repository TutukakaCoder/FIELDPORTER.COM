# Implementation summary — Portfolio category tabs position

## Goal

Pull the four category chips up under the Portfolio title and stop the sticky chip bar from hard-cutting project content.

## Change scope

**Localized** — `app/portfolio/page.tsx` only (`PortfolioHero` + showcase rhythm + sticky chip chrome).

## Status

**Partial — pending Sam visual QA** (follow-up: chips centered + pulled higher after Sam feedback 2026-07-28)

## What changed (user-visible)

- Portfolio hero no longer fills the viewport; title sits under the header with compact padding.
- Category chips centered as a group under the hero (were left-aligned in a wider column, so they looked too far left).
- Chip row pulled tighter under the hero (almost no top gap); sticky bar stays translucent with no hard border.

## Token / spacing changes

| Location       | Before                                                          | After                                                                  |
| -------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Hero section   | `min-h-[70vh] md:min-h-screen flex items-center justify-center` | `pt-28 pb-8 md:pt-32 md:pb-10` (no min-h)                              |
| Hero rule wrap | `pt-4 md:pt-8`                                                  | `pt-2 md:pt-4`                                                         |
| Showcase       | `section-rhythm-2xl` → then `section-rhythm`                    | `pt-2 md:pt-4 pb-12 lg:pb-24` (tight under hero)                       |
| Sticky chips   | solid bg + `border-b`, left-aligned flex                        | translucent blur, no border, `w-max max-w-full mx-auto justify-center` |

## Files changed

| File                                                                     | Change                                                                            |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `app/portfolio/page.tsx`                                                 | Hero height/padding, decorative rule padding, showcase rhythm, sticky chip chrome |
| `Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/*` | Docs                                                                              |
| `SAM's CHANGES.md`                                                       | Status → implemented, visual QA pending                                           |
| `.cursor/skills/known-bug-patterns/SKILL.md`                             | Pattern #4 → Partial                                                              |

## Visual acceptance criteria

| #   | Criterion                                        | Code matches brief?                | Sam visual QA |
| --- | ------------------------------------------------ | ---------------------------------- | ------------- |
| 1   | 1280 light: title + chips visible without scroll | Yes (structure)                    | Not run       |
| 2   | 1280 dark: same; sticky readable                 | Yes                                | Not run       |
| 3   | 768: connected title↔chips                      | Yes                                | Not run       |
| 4   | 375: no header overlap; chip scroll works        | Yes                                | Not run       |
| 5   | Sticky: no hard border cutting content           | Yes (border removed + translucent) | Not run       |
| 6   | Themes: sticky/hero text pairs OK                | Yes                                | Not run       |
| 7   | Behaviour unchanged                              | Yes (classes only)                 | Not run       |

## Manual check list for Sam

- [ ] `/portfolio` @ 1280 light — title + four chips on first paint, no scroll
- [ ] Toggle dark — same composition; sticky plate readable
- [ ] Click each category chip — panel switches
- [ ] Scroll until chips stick — no hard border cutting project titles
- [ ] 768 and 375 — small hero→chips gap; horizontal chip scroll; no header overlap
- [ ] Mobile accordion expand + category swipe
- [ ] Spot-check `/about` and `/services` heroes unchanged

## Deferred / follow-ups

- About / Services `min-h-screen` heroes (Option D)
- Pull chips into hero (Option B) if composition still feels split after QA
- Sticky opacity bump to `/90` only if `/80` washes out over media
- Equal-width chip grid (separate concern)

## Known-bug-patterns

Updated #4 (Portfolio hero `min-h-screen`) to Partial — pending Sam visual QA (2026-07-28).

## Verify

- `npm run lint` — pass
- `npm run build` — skipped (`next dev` listening on port 3000)
