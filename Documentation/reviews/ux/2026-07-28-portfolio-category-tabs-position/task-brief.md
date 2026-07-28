# Task brief — Portfolio category tabs position

## 1. Goal

On `/portfolio`, pull the four category chips up under the Portfolio title so the first viewport reads as one composition, and stop the sticky chip bar from hard-cutting project content beneath it.

## 2. Folder

`Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/`

## 3. Change scope

**Localized** — `PortfolioHero` height/alignment + `InteractivePortfolioShowcase` top rhythm and sticky chip chrome in `app/portfolio/page.tsx` only. No new tokens. About / Services heroes deferred.

## 4. Chosen approach

**Option A — Shrink hero + tighten rhythm + soften sticky** (research recommendation; DECISIONS empty).

### Locked decisions

| Question                         | Decision                                                                                                 | Basis                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Approach                         | Option A                                                                                                 | Research primary recommendation                                   |
| First viewport @ 1280            | Title + subhead + all four chips visible **without** scroll                                              | Research success criterion 1 — treat as hard                      |
| Hero height                      | **No** `min-h-[70vh]` / `md:min-h-screen`. Content-sized hero with header clearance padding only         | Known-bug #4; smallest fix that reconnects title ↔ chips         |
| Hero alignment                   | Drop `flex items-center justify-center` (was centering in a tall void). Use top padding for fixed header | Content sits higher; chips follow sooner                          |
| Showcase top rhythm              | `section-rhythm-2xl` → `section-rhythm` (`py-12 lg:py-24`)                                               | Existing token; cuts `lg:py-40` after a shorter hero              |
| Sticky on desktop                | **Keep** sticky at all breakpoints (`sticky top-24`)                                                     | Long project lists benefit; Contact mobile-only not required here |
| Sticky “line”                    | **Remove** `border-b`. Use translucent plate: `bg-white/80 dark:bg-black/80 backdrop-blur-md`            | Fixes clip without losing sticky readability                      |
| Decorative hero `h-px` rule      | Keep; tighten its top padding (`pt-4 md:pt-8` → `pt-2 md:pt-4`)                                          | Mild separator; not the clip culprit                              |
| Chip row bottom margin           | `mb-8 md:mb-10 lg:mb-14` → `mb-6 md:mb-8 lg:mb-10`                                                       | Modest tighten; 8px scale                                         |
| About / Services `min-h-screen`  | **Defer**                                                                                                | Out of scope for this ticket                                      |
| Structure move (chips into hero) | Reject for v1 (Option B)                                                                                 | Extra state/sticky risk; A meets the goal                         |

## 5. Rejected options

| Option                                 | Why not                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **B — Pull chips into hero**           | Meets composition goal but larger structural move + sticky ownership; defer unless A fails visual QA |
| **C — Keep full-vh; `items-end` only** | Leaves title/tabs disconnected; empty top band remains                                               |
| **D — Systemic hero-height pass**      | About + Services blast radius; Sam did not ask                                                       |

## 6. Similar surfaces map

| Cluster                | Route        | File                                   | In scope? | Action                                             |
| ---------------------- | ------------ | -------------------------------------- | --------- | -------------------------------------------------- |
| Portfolio hero + chips | `/portfolio` | `app/portfolio/page.tsx`               | **Yes**   | Apply Option A                                     |
| About hero             | `/about`     | `components/about/about-hero.tsx`      | Defer     | Leave `min-h-screen`                               |
| Services hero          | `/services`  | `components/services/service-hero.tsx` | Defer     | Leave                                              |
| Homepage hero          | `/`          | `components/homepage/hero-section.tsx` | No        | Intentional full-vh                                |
| Contact sticky control | `/contact`   | `app/contact/contact-page-client.tsx`  | Reference | Translucent / no-border inspiration only           |
| Shared header          | all          | `components/layout/header.tsx`         | No        | Keep `top-24` unless implement finds clear overlap |

## 7. Files to change

| File                     | Change                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `app/portfolio/page.tsx` | `PortfolioHero` classes (~L407); hero rule padding (~L442); showcase `section-rhythm-*` (~L951); sticky chip wrapper classes (~L956) |

## 8. Do not touch

- Project card markup, media, accordion, swipe, category data / IA
- Portfolio CTA copy or layout
- About / Services / homepage heroes
- `globals.css` / new design tokens
- Header / footer / PageWrapper geometry
- Chatbot / knowledge base / Firebase
- `hosting/` stub
- Browser MCP / `ui:capture`

## 9. Token / spacing map

Reuse existing rhythm + theme utilities only. No new hex or custom utilities.

| Location                  | Current                                                                                                                           | Planned                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Hero section              | `relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden`                                          | `relative overflow-hidden pt-28 pb-8 md:pt-32 md:pb-10`                                                                      |
| Hero inner                | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center`                                                                              | Unchanged                                                                                                                    |
| Hero copy stack           | `space-y-6 md:space-y-8`                                                                                                          | Unchanged                                                                                                                    |
| Hero decorative rule wrap | `flex justify-center pt-4 md:pt-8`                                                                                                | `flex justify-center pt-2 md:pt-4`                                                                                           |
| Showcase section          | `relative section-rhythm-2xl overflow-hidden`                                                                                     | `relative section-rhythm overflow-hidden`                                                                                    |
| Sticky chip wrapper       | `sticky top-24 z-30 -mx-4 px-4 py-2 mb-8 md:mb-10 lg:mb-14 bg-white dark:bg-black border-b border-gray-900/5 dark:border-white/5` | `sticky top-24 z-30 -mx-4 px-4 py-2 mb-6 md:mb-8 lg:mb-10 bg-white/80 dark:bg-black/80 backdrop-blur-md` (**no** `border-b`) |
| Chip buttons / labels     | Existing active/inactive classes                                                                                                  | Unchanged                                                                                                                    |

`pt-28` / `md:pt-32` clear the fixed header (same ballpark as sticky `top-24`). If implement finds header collision on a breakpoint, nudge top padding by one step on the 8px scale only — do not reintroduce `min-h-screen`.

## 10. Visual acceptance criteria

1. **Desktop 1280 light:** On load, Portfolio title, subhead, and all four category chips are visible without scrolling.
2. **Desktop 1280 dark:** Same composition; chips and sticky plate readable over content.
3. **Tablet 768:** Title and chips feel connected (no large empty band); chips usable (scroll row OK).
4. **Mobile 375:** Chips sit under hero without header overlap; horizontal chip scroll still works.
5. **Sticky scroll:** With chips stuck under the header, project titles/cards below are not hard-cut by an opaque bar edge or bottom border line (content may soft-fade under blur — no solid knife-edge).
6. **Themes:** Light and dark sticky backgrounds remain legible; no white-only / black-only text regressions on hero.
7. **Behaviour:** Category switch, swipe, accordion expand, media unchanged.

## 11. Implementation steps

1. **`PortfolioHero` (~L407)**
   - Replace `min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden` with `overflow-hidden pt-28 pb-8 md:pt-32 md:pb-10`.
2. **Hero decorative rule (~L442)**
   - Change wrap to `pt-2 md:pt-4`.
3. **`InteractivePortfolioShowcase` section (~L951)**
   - `section-rhythm-2xl` → `section-rhythm`.
4. **Sticky chip wrapper (~L956)**
   - Remove `border-b border-gray-900/5 dark:border-white/5`.
   - Replace solid `bg-white dark:bg-black` with `bg-white/80 dark:bg-black/80 backdrop-blur-md`.
   - Tighten margin to `mb-6 md:mb-8 lg:mb-10`.
   - Keep `sticky top-24 z-30` and horizontal chip row markup.
5. **Verify** — `npm run lint` only (never `npm run build` while `next dev` is running).
6. **Docs** — `implementation-summary.md`; README → Partial — pending Sam visual QA; update `SAM's CHANGES.md`; mark known-bug #4 Fixed (or Partial) with date.

## 12. Behaviour contract

| Before                                       | After                                                   |
| -------------------------------------------- | ------------------------------------------------------- |
| Full-viewport hero; chips often below fold   | Compact hero; title + chips in first viewport @ desktop |
| Large void between title and chips           | Tight vertical connection                               |
| Sticky opaque bar + `border-b` clips content | Translucent blurred sticky; no hard bottom border       |
| Tab / swipe / accordion / media              | Unchanged                                               |

**Must NOT change:** category labels/data, chip active styles, project cards, CTA, routes other than `/portfolio` layout chrome above.

## 13. Flow-on effects

| Area                           | Mitigation                                                           |
| ------------------------------ | -------------------------------------------------------------------- |
| Light / dark                   | Theme-paired translucent sticky bg; keep existing text pairs on hero |
| Mobile / desktop               | Same class changes; confirm `top-24` + `pt-28` clear header          |
| Sticky readability over images | `/80` + `backdrop-blur-md`; if washout on QA, bump to `/90` only     |
| Motion                         | Existing Framer hero/section motion untouched                        |
| A11y                           | Focus rings on chips unchanged; no sticky focus trap                 |
| Shared components              | None — page-local classes only                                       |
| Copy / chatbot                 | No wording changes                                                   |

## 14. Manual visual check routes (Sam)

| Route                  | Themes       | Viewports                                        |
| ---------------------- | ------------ | ------------------------------------------------ |
| `/portfolio` (primary) | Light + dark | 375, 768, 1280                                   |
| `/about`, `/services`  | —            | Spot-check only that heroes were **not** changed |

No automated capture / browser MCP.

## 15. Manual test plan

1. Open `/portfolio` at 1280 light — confirm title + four chips on first paint without scroll.
2. Toggle dark — same composition; sticky plate readable.
3. Click each category chip; confirm project panel switches.
4. Scroll until chips stick — confirm no hard border cutting project titles; content soft under blur OK.
5. At 768 and 375 — hero→chips gap small; chip row scrolls horizontally; no header overlap.
6. Expand a mobile accordion project; swipe categories if used.
7. Quick glance `/about` and `/services` heroes unchanged.

## 16. Build & docs on complete

```bash
npm run lint   # never npm run build while next dev is running
```

Then: `implementation-summary.md`, README status, `SAM's CHANGES.md`, known-bug #4 status update.

## 17. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/
Out of scope: About/Services/homepage heroes; project cards/IA; equal-width chip grid; CTA; globals.css tokens; chatbot; browser capture
```
