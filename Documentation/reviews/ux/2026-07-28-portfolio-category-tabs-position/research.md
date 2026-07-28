# Research — Portfolio category tabs too low / sticky line clips content

## 1. Issue summary

| Field     | Detail                                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| User goal | Land on `/portfolio` and immediately use the four category filters under the title                                                      |
| Pain      | Chips sit in a weird low spot; a line also cuts off content underneath                                                                  |
| Current   | Full-viewport hero pushes chips below the fold; sticky chip bar has an opaque bg + bottom border that covers project content when stuck |
| Expected  | Title + chips feel connected; chips sit higher (nearer first viewport); sticky chrome does not clip content below                       |
| Surfaces  | `/portfolio` — hero + category chip row                                                                                                 |
| Severity  | confusing                                                                                                                               |

## 2. Change scope + rationale

**Localized** — one page file: `app/portfolio/page.tsx` (`PortfolioHero` + sticky chip wrapper inside `InteractivePortfolioShowcase`). Same anti-pattern as known-bug #4 (`min-h-screen` on a content-heavy page). About/Services also use full-viewport heroes, but they do not place primary filters immediately under the title, so they stay out of v1 unless Sam expands scope.

## 3. Success criteria (draft)

1. On first paint at desktop (`lg` / ~1280), Portfolio title and the four category chips are both visible without scrolling (or chips require at most a short nudge).
2. Vertical gap between hero copy block and chip row feels like one section, not a void.
3. When the chip row sticks under the header, project titles/cards below are not covered by an opaque bar edge or hard `border-b` cut line.
4. Mobile (`sm` / ~375): chips remain usable (horizontal scroll OK); no new overlap with the fixed header.
5. Light and dark: sticky background still readable; no white-only / black-only regressions.
6. Tab switching, swipe, accordion expand, and project media unchanged in behaviour.

## 4. Assumptions vs facts

| Claim                                                                                   | Source                                                                                    |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Four labels are Client Platforms, AI Automation, Strategic Research, In-House Ventures  | Observed — `portfolioSections` titles in `app/portfolio/page.tsx` L85–329                 |
| Chips live in `InteractivePortfolioShowcase`, not inside `PortfolioHero`                | Observed — L400–448 vs L950–990                                                           |
| Hero uses `min-h-[70vh] md:min-h-screen` + `flex items-center justify-center`           | Observed — L407                                                                           |
| Showcase uses `section-rhythm-2xl` (`py-16 lg:py-40`)                                   | Observed — L951 + `globals.css` L426–428                                                  |
| Sticky chips: `sticky top-24 z-30 … bg-white dark:bg-black border-b …`                  | Observed — L956                                                                           |
| Hero also draws a decorative `h-px` gradient rule under the copy                        | Observed — L442–444                                                                       |
| Sam’s “line cutting off things beneath” is primarily the sticky bar border/bg           | Inferred — “cutting off” fits sticky overlay; decorative hero rule is thin and non-sticky |
| Sam wants chips “centered a little higher” = move chip row up the page toward the title | User-reported + Inferred                                                                  |
| Prior SAM log already named this gap as `min-h-screen`                                  | Observed — `SAM's CHANGES.md` + known-bug #4                                              |

## 5. Surfaces & routes

| Route        | Entry                    | Stack                                                                                                               |
| ------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `/portfolio` | `app/portfolio/page.tsx` | `PageWrapper` → **`PortfolioHero`** → **`InteractivePortfolioShowcase`** (sticky chips + projects) → `PortfolioCTA` |

In-scope:

```
PortfolioHero                          ← height / vertical placement
InteractivePortfolioShowcase
  → section.section-rhythm-2xl         ← top padding after hero
  → sticky chip row (border-b)         ← clip / line issue
  → project cards / marketing chrome   ← out of scope unless sticky fix needs scroll-padding
```

## 6. Similar surfaces map

| Cluster                     | Route        | File                                      | Same pattern?                                                  | In scope?                  |
| --------------------------- | ------------ | ----------------------------------------- | -------------------------------------------------------------- | -------------------------- |
| Portfolio hero + chips      | `/portfolio` | `app/portfolio/page.tsx` L400–990         | Yes — full-vh hero then filters                                | **Yes**                    |
| About hero                  | `/about`     | `components/about/about-hero.tsx`         | Partial — `min-h-screen`, no filter chips under title          | No (v1)                    |
| Services hero               | `/services`  | `components/services/service-hero.tsx`    | Partial — `min-h-screen`; tabs sit in later section            | No (v1)                    |
| Homepage hero               | `/`          | `components/homepage/hero-section.tsx`    | Partial — intentional full-viewport brand hero                 | No                         |
| Contact sticky control      | `/contact`   | `app/contact/contact-page-client.tsx` L86 | Related — sticky + `border-b`, but `md:static` / `md:border-0` | Reference only             |
| Services What We Build tabs | `/services`  | `app/services/page.tsx`                   | Different — equal-size grid tabs, not position under hero      | No                         |
| Shared header               | all          | `components/layout/header.tsx`            | Sticky offset (`top-24` on chips) depends on header height     | Touch only if offset wrong |

## 7. Layout / token forensics

| Element                         | Today                                                                                      | Problem                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `PortfolioHero` section (L407)  | `min-h-[70vh] md:min-h-screen flex items-center justify-center`                            | Desktop hero claims full viewport; centered title leaves a large empty band below before next section |
| Hero decorative rule (L442–444) | `w-24 h-px` gradient under copy                                                            | Mild visual separator; unlikely the “cutting off” issue alone                                         |
| Showcase section (L951)         | `section-rhythm-2xl` → `py-16 lg:py-40`                                                    | Adds another large top gap after an already tall hero                                                 |
| Sticky chip wrapper (L956)      | `sticky top-24 z-30 bg-white dark:bg-black border-b border-gray-900/5 dark:border-white/5` | Opaque plate + hard bottom edge sits over content when stuck; reads as a line clipping what’s beneath |
| Chip margin (L956)              | `mb-8 md:mb-10 lg:mb-14`                                                                   | Secondary; SAM notes mentioned older larger `mb-20+` values already reduced                           |
| Page shell (L1131)              | Extra `min-h-screen` on page wrapper                                                       | Harmless alone; not the gap driver                                                                    |

**Compound effect (Inferred):** full-vh hero + largest section rhythm = chips start near or below the fold on desktop; sticky chrome then reinforces a harsh cut when scrolling.

## 8. Options

### A — Shrink hero + tighten rhythm + soften sticky (recommended for v1)

- Change hero to content-sized or modest min-height (e.g. drop `md:min-h-screen`; use padding / `min-h-[40vh]`–`50vh` or no min-h).
- Align content with header clearance (`pt-*`) rather than vertical centering in a full viewport if needed.
- Drop showcase to `section-rhythm` / `section-rhythm-lg`, or reduce top padding only.
- Sticky row: remove `border-b`, or use translucent `bg-*/80 backdrop-blur` (and optional `scroll-mt` on content). Match Contact’s “sticky on mobile only” if desktop sticky is unnecessary.
- **Risk:** Low. **Regression:** Portfolio first viewport only. **Effort:** S.

### B — Pull chips into the hero (one composition)

- Move the four buttons into `PortfolioHero` under the subtitle; showcase starts with projects only.
- Sticky behaviour either stays (sticky inside hero flow) or becomes a second sticky clone — more state/layout care.
- **Risk:** Medium (structure + sticky). **Effort:** M.

### C — Keep full-vh hero; only reposition with flex/`items-end`

- Push title block toward lower-mid hero so chips appear sooner in the scroll, without changing section split.
- Does not fix “title and tabs feel disconnected”; sticky clip still needs a separate fix.
- **Risk:** Low–medium (awkward empty top). **Effort:** S. Not preferred.

### D — Systemic: ban `min-h-screen` on non-homepage marketing heroes

- About + Services + Portfolio together. Larger blast radius; Sam visual QA across three routes.
- **Risk:** Higher. **Effort:** L. Defer unless Sam wants a hero-height pass site-wide.

**Primary recommendation:** **Option A**.

## 9. Open questions for plan

1. Target first-viewport composition: title + subhead + all four chips visible at 1280 without scroll — hard requirement?
2. Hero height target: content + padding, `min-h-[50vh]`, or something else?
3. Sticky chips on desktop: keep sticky, sticky-mobile-only (Contact pattern), or never sticky?
4. Sticky “line”: remove border entirely, or keep a softer fade/blur edge?
5. Leave About/Services `min-h-screen` alone for this ticket?

## 10. Handoff

- Folder: `Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/`
- Next: `/ux-plan`
- Out of scope (so far): project card content, category IA (e.g. Strategic Research retirement), Services/About heroes, equal-width chip grid, CTA section, chatbot copy
