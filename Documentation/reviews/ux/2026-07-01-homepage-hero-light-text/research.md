# Research — Homepage hero light-mode text contrast

## 1. Issue summary

| Field                  | Detail                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User goal**          | Read the homepage hero headline and value proposition clearly in light mode                                                                                                                                                                                                                                                                    |
| **Pain point**         | Headline appears white/washed out; subhead is too faint — feels broken and untrustworthy                                                                                                                                                                                                                                                       |
| **Current behaviour**  | Hero H1 uses a fixed white gradient (`from-white to-white/70`) regardless of theme. Supporting badge and value prop use `text-gray-300` / `text-gray-400` with no light-mode overrides. A dark `bg-black/40` glow sits behind copy in both themes. Background in light mode is gray/white (`UnifiedAuroraBackground` + hero tier backgrounds). |
| **Expected behaviour** | In light mode: headline in black (or near-black); subhead in a darker gray with WCAG AA contrast; no white-only copy in the hero fold                                                                                                                                                                                                          |
| **Surfaces affected**  | Homepage hero primarily; user also mentioned “any existing white font” on the main homepage — audit shows issue is concentrated in hero, not lower sections                                                                                                                                                                                    |
| **Contexts**           | Light theme toggle (`ThemeToggle` → `html.light` / no `.dark`); desktop full 3D hero bg vs mobile/tablet `LightHeroBackground`; animation on load (Framer Motion stagger, no color change)                                                                                                                                                     |
| **Severity**           | Confusing — blocks comprehension of primary value prop above the fold                                                                                                                                                                                                                                                                          |

## 2. Change scope + rationale

**Localized**

User explicitly scoped the main homepage hero copy. The fix is component-level theme pairing, matching patterns already used in `CTASection`, `ServicesSection`, and `TrustIndicatorBar`. Not a site-wide typography token change (though orphan `.text-display` in `globals.css` still hardcodes white — hero does not use it).

**Codebase path note:** UX commands reference `hosting/`; the production marketing site lives in **`FIELDPORTER.COM/`**. All file paths below use that directory.

## 3. Success criteria (draft)

1. In light mode at `/`, hero H1 “AI Systems Your Team Can Actually Use” renders as black or `text-gray-900` — readable at a glance on the light aurora background.
2. Value prop “We build AI automations…” uses at least `text-gray-600` or darker in light mode (target ≥ 4.5:1 contrast on `gray-50`/`white` background).
3. Supporting badge “Practical AI, Shipped Fast” is legible in light mode (not `text-gray-300` on pale glass).
4. Dark mode hero appearance is unchanged or intentionally equivalent (white/light gradient headline preserved).
5. Secondary hero CTA (“View Portfolio” outline) remains visible and tappable in light mode (~44px touch target preserved).

## 4. Assumptions vs facts

| Claim                                                          | Source                                                                                         |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Hero headline copy is `HERO_HEADLINE` in `config/constants.ts` | Observed in code                                                                               |
| H1 uses white gradient with no `dark:` variant                 | Observed in `hero-section.tsx` L286                                                            |
| Value prop is `HERO_VALUE_PROP`, class `text-gray-400` only    | Observed in code                                                                               |
| Light page background is gray/white gradient                   | Observed in `app/page.tsx` `UnifiedAuroraBackground`                                           |
| User sees white/unreadable text in light mode                  | User reported                                                                                  |
| “Any white font” spans entire homepage                         | Inferred partial — grep shows lower sections already theme-aware                               |
| Issue affects mobile and desktop equally                       | Inferred — same classes apply; mobile uses lighter `LightHeroBackground` (may worsen contrast) |
| About/Services heroes share same anti-pattern                  | Observed — out of user scope for this task                                                     |

## 5. Reference UI notes

No reference UI supplied. Internal authority: homepage sections below the fold (`cta-section.tsx`, `services-section.tsx`) already implement `text-gray-900 dark:text-white` and `text-gray-600 dark:text-gray-300` — use as pattern, do not copy competitor sites.

## 6. Surfaces & routes

| Route | Entry file                     | Key sections                                                                                       |
| ----- | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| `/`   | `FIELDPORTER.COM/app/page.tsx` | HeroSection → TrustIndicatorBar → AIAuditSection → ServicesSection → PortfolioSection → CTASection |

**Layout stack:**

```
Page (app/page.tsx)
  → PageWrapper (components/layout)
  → UnifiedAuroraBackground (fixed, light: gray-50→white)
  → HeroSection (min-h-screen, pt-20 pb-24)
      → TieredBackground (3D / aurora / LightHeroBackground)
      → BackgroundPattern
      → Badge + H1 + HERO_VALUE_PROP + CTAs + HERO_PROOF_LINE
  → TrustIndicatorBar (section-rhythm-tight)
  → … (theme-aware sections)
```

## 7. Similar surfaces map

| Surface cluster            | Route(s)    | File(s)                                         | Same pattern as trigger?                                                     | In scope for fix?             |
| -------------------------- | ----------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Homepage hero**          | `/`         | `components/homepage/hero-section.tsx`          | **Yes** — white H1 gradient, gray-300/400 copy, dark glow, white-glass badge | **Yes**                       |
| **Homepage trust bar**     | `/`         | `components/homepage/trust-indicator-bar.tsx`   | No — `text-gray-900 dark:text-white`                                         | No                            |
| **Homepage services**      | `/`         | `components/homepage/services-section.tsx`      | No — theme pairs throughout                                                  | No                            |
| **Homepage portfolio**     | `/`         | `components/homepage/portfolio-section.tsx`     | No — theme pairs throughout                                                  | No                            |
| **Homepage CTA**           | `/`         | `components/homepage/cta-section.tsx`           | No — theme pairs throughout                                                  | No                            |
| **Homepage AI audit**      | `/`         | `components/homepage/ai-audit-section.tsx`      | No — theme pairs; blue primary button `text-white` intentional               | No                            |
| **About hero**             | `/about`    | `components/about/about-hero.tsx`               | Partial — `text-white`, `text-gray-300/400`, dark-only backgrounds           | Defer                         |
| **Services hero**          | `/services` | `components/services/service-hero.tsx`          | Partial — same as About hero                                                 | Defer                         |
| **Shared header/footer**   | all         | `components/layout/header.tsx`, `footer.tsx`    | No — already theme-aware                                                     | No                            |
| **globals.css typography** | site-wide   | `.text-display`, `.text-heading` hardcode white | Partial orphan tokens                                                        | Defer (hero doesn't use them) |

## 8. Layout / chrome audit

| Element                | File                    | Today (class/prop/token)                    | Problem                                                                 |
| ---------------------- | ----------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Hero min-height        | `hero-section.tsx` L254 | `min-h-screen flex … pt-20 pb-24`           | Not the contrast issue; defines fold geometry                           |
| Page aurora bg (light) | `app/page.tsx` L18      | `from-gray-50 via-gray-100 to-white`        | Light surface behind white text                                         |
| Hero tier bg (mobile)  | `hero-section.tsx` L153 | `from-gray-100 via-gray-50 to-white dark:…` | Reinforces light canvas                                                 |
| Readability glow       | `hero-section.tsx` L273 | `bg-black/40 dark:bg-black/40 blur-[100px]` | Darkens light bg behind faint white text; wrong polarity for light mode |
| Supporting badge shell | L276                    | `bg-white/5 border-white/10`                | Designed for dark glass; invisible on light                             |
| Supporting line        | L278                    | `text-gray-300`                             | ~2.5:1 on light — fails                                                 |
| H1 headline            | L286                    | `bg-gradient-to-b from-white to-white/70`   | White on white/gray — effectively invisible                             |
| Value prop             | L293                    | `text-gray-400` (both themes)               | ~3.8:1 on gray-50 — below AA for body text                              |
| Proof line             | L301                    | `text-gray-500 dark:text-gray-400`          | Light side OK; not user complaint                                       |
| Secondary CTA          | L215                    | `bg-white/[0.02] border-white/10 …`         | Low visibility on light bg                                              |
| Bottom fade            | L262                    | `from-gray-50 … dark:from-gray-950`         | Correctly theme-aware                                                   |

### Layout forensics (spacing)

Not a spacing complaint. Vertical stack: badge → H1 → value prop → CTAs → proof line with `space-y-6` / `space-y-8 md:space-y-12`. No double-padding or min-height stacking causing the readability issue.

### UX diagnosis

- **Hierarchy:** Headline should dominate; today it disappears in light mode while badge and CTAs compete for attention.
- **Proximity:** Copy block is correctly grouped; color fails the group.
- **Density:** Internally fine; externally the hero feels “empty” because text blends into background.

### Accessibility pre-check

| Check                   | Risk                                       |
| ----------------------- | ------------------------------------------ |
| Contrast (light hero)   | **Fail** — H1, badge, value prop           |
| Touch targets           | CTAs meet ~56px height — OK                |
| Focus order             | Logical top-to-bottom — OK                 |
| Heading structure       | Single H1 — OK                             |
| Reduced motion          | Animations respect `useReducedMotion` — OK |
| Color change regression | Must verify dark mode unchanged            |

## 9. Code map

```
HeroSection (FIELDPORTER.COM/components/homepage/hero-section.tsx)
  → fixed TieredBackground + BackgroundPattern (z-0)
  → bottom gradient fade (theme-aware)
  → motion container (space-y-8 md:space-y-12)
      → glow div (bg-black/40 both themes)          ← contrast contributor
      → badge (HERO_SUPPORTING_LINE)                 ← text-gray-300
      → h1 (HERO_HEADLINE)                           ← white gradient
      → p (HERO_VALUE_PROP)                          ← text-gray-400
      → AnimatedCTA (Book a Call invert + View Portfolio outline)
      → p (HERO_PROOF_LINE)                          ← theme-aware
```

**Constants** (`FIELDPORTER.COM/config/constants.ts`):

- `HERO_HEADLINE` = "AI Systems Your Team Can Actually Use"
- `HERO_SUPPORTING_LINE` = "Practical AI, Shipped Fast"
- `HERO_VALUE_PROP` = "We build AI automations, internal tools, and workflows for growing companies."

**Existing semantic tokens** (`FIELDPORTER.COM/app/globals.css` L413–422):

- `.section-headline` → `text-gray-900 dark:text-white`
- `.section-copy` → `text-gray-600 dark:text-gray-300`
- `.section-badge` → theme-aware border/bg/text

Hero does **not** use these classes today.

## 10. Authority stack

| Source                                | What it says                                     | Conflicts with issue?                           |
| ------------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| `globals.css` `:root`                 | `--foreground` dark text for light theme         | Hero ignores semantic foreground                |
| `.section-headline` / `.section-copy` | Theme-aware section typography                   | Hero bypasses these tokens                      |
| `.text-display`                       | Hardcoded `fieldporter.white`                    | Orphan for hero; systemic debt                  |
| `CTASection`, `ServicesSection`       | `text-gray-900 dark:text-white` pattern          | Hero is inconsistent with siblings on same page |
| `SAM's CHANGES.md`                    | Trust bar spacing under same headline            | Related page area, different issue              |
| User request                          | Black headline, darker subhead on light homepage | Confirms hero is wrong today                    |

**Tension:** Site was built dark-first (default theme `dark`, body defaults to black bg). Hero styling was never paired for light mode while lower homepage sections were updated.

## 11. Current behaviour

With theme toggle set to light (`html` without `.dark`):

1. Page renders pale gray/white aurora background.
2. Hero H1 gradient resolves to white → low-opacity white — visually absent or ghost-like.
3. Badge text `gray-300` on near-transparent white glass — faint.
4. Value prop `gray-400` — user-reported “barely readable.”
5. Dark glow blob adds gray mud behind text without improving contrast.
6. Primary CTA “Book a Call” uses `variant="invert"` (white button, black text) — readable.
7. Secondary “View Portfolio” outline uses white-tinted borders — low contrast on light.

Dark mode: current styling is intentional and readable against dark 3D/aurora backgrounds.

## 12. Root cause

1. **Historical — dark-first hero never updated for light theme** — Hero classes were written for starfield/3D dark backgrounds; light theme was added sitewide but hero text stayed white-only.
2. **Token bypass** — Hero uses inline Tailwind one-offs instead of existing `.section-headline` / `.section-copy` semantic classes used elsewhere on the same page.
3. **Layout geometry — wrong polarity glow** — `bg-black/40` readability halo helps white text on stars in dark mode; in light mode it works against dark text goals.
4. **Architectural — gradient headline locked to white** — `from-white to-white/70` has no `dark:` counterpart (inverse of normal pattern elsewhere).
5. **Responsive** — Mobile/tablet `LightHeroBackground` increases light surface area, amplifying the contrast failure (not a separate bug, same classes).

## 13. Flow-on effects matrix

| Area                             | Risk if changed                                                 | Mitigation                                                  |
| -------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| Sibling TrustIndicatorBar        | Low — already dark text in light mode                           | No change needed                                            |
| Lower homepage sections          | Low — already theme-aware                                       | Visual QA only                                              |
| Dark mode hero                   | Med — regression if classes edited without `dark:` pairs        | Preserve `dark:from-white dark:to-white/70` gradient        |
| Hero 3D background (desktop)     | Low — dark text on semi-transparent dark 3D may need glow tweak | Test desktop light + 3D tier; adjust/remove light-mode glow |
| Mobile safe-area                 | Low                                                             | Keep `pt-20` header offset                                  |
| Light + dark themes              | Med                                                             | Toggle QA both ways                                         |
| Animation / LCP / CLS            | Low — class-only change                                         | No layout shift expected                                    |
| a11y contrast                    | Positive                                                        | Target AA on value prop                                     |
| Content / SEO / chatbot          | None — copy unchanged                                           | N/A                                                         |
| About/Services heroes (deferred) | Future inconsistency                                            | Separate research if light-mode sitewide hero pass desired  |
| Button outline variant           | Med — hero secondary CTA uses white borders                     | Add light-mode border/text classes on hero button instance  |

**Paired updates:** If light-mode glow is removed/lightened, no spacing changes required. If badge shell switches to `.section-badge`, verify pulse dot still visible.

## 14. Options (ranked by regression risk)

### Option A — Hero component theme pairs (recommended v1)

**Summary:** Update `hero-section.tsx` only. H1: `from-gray-900 to-gray-700 dark:from-white dark:to-white/70`. Badge: adopt `.section-badge` or `text-gray-700 dark:text-gray-300` + `border-gray-900/10 bg-gray-900/[0.04] dark:…`. Value prop: `text-gray-600 dark:text-gray-300` (or `.section-copy` at larger size). Glow: `hidden dark:block` or `bg-white/40 dark:bg-black/40`. Secondary CTA: light border `border-gray-900/20 text-gray-900 dark:…`.

| Field                    | Value                                                                    |
| ------------------------ | ------------------------------------------------------------------------ |
| Files touched            | `FIELDPORTER.COM/components/homepage/hero-section.tsx`                   |
| Change scope             | Localized                                                                |
| Design-system compliance | Partial — mirrors `.section-*` patterns inline; does not add new globals |
| Regression risk          | **Low**                                                                  |
| Visual QA effort         | **Low** — `/` light + dark, mobile + desktop                             |
| Similar surfaces         | Homepage hero row only                                                   |
| Downside                 | About/Services heroes remain inconsistent until separate task            |

### Option B — Semantic hero tokens in globals.css

**Summary:** Add `.hero-headline`, `.hero-subhead`, `.hero-badge`, `.hero-glow` in `globals.css` with full light/dark pairs; apply in `hero-section.tsx`.

| Field                    | Value                                                                          |
| ------------------------ | ------------------------------------------------------------------------------ |
| Files touched            | `FIELDPORTER.COM/app/globals.css`, `hero-section.tsx`                          |
| Change scope             | Systemic (token) + Localized (application)                                     |
| Design-system compliance | **Yes** — extends section typography system                                    |
| Regression risk          | **Med** — new globals could be misused                                         |
| Visual QA effort         | Med                                                                            |
| Similar surfaces         | Enables future About/Services hero migration                                   |
| Downside                 | Slightly more scope than user asked; needs discipline to adopt on other heroes |

### Option C — Minimal headline + subhead only

**Summary:** Change only H1 and HERO_VALUE_PROP classes; leave badge, glow, secondary CTA as-is.

| Field                    | Value                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| Files touched            | `hero-section.tsx` (2 class strings)                                                        |
| Change scope             | Localized                                                                                   |
| Design-system compliance | Partial                                                                                     |
| Regression risk          | **Low**                                                                                     |
| Visual QA effort         | Low                                                                                         |
| Similar surfaces         | Partial hero fix                                                                            |
| Downside                 | Badge and secondary CTA still broken in light mode; incomplete vs user “any white font” ask |

### Option D — Force dark hero in light mode

**Summary:** Keep white text; darken hero background panel in light mode to maintain contrast.

| Field                    | Value                                                            |
| ------------------------ | ---------------------------------------------------------------- |
| Files touched            | `hero-section.tsx`, possibly `TieredBackground`                  |
| Change scope             | Localized                                                        |
| Design-system compliance | No — fights site light theme                                     |
| Regression risk          | Med                                                              |
| Visual QA effort         | Med                                                              |
| Similar surfaces         | Homepage hero only                                               |
| Downside                 | Opposite of user intent (they want black text, not darker panel) |

## 15. Recommended direction

**Primary:** Option A for `/ux-implement` v1 — full hero theme pairing in `hero-section.tsx`, aligned with `.section-headline` / `.section-copy` values.

**Phasing:**

- **v1:** Option A — headline, subhead, badge, glow, secondary CTA
- **Defer:** Option B token extraction; About/Services hero light-mode pass (separate folder)

**Copy direction:** No copy changes — color/contrast only.

## 16. Out of scope

- `hosting/` stub app
- About, Services, Portfolio, Insights hero pages (defer)
- Trust indicator bar spacing ([SAM's CHANGES.md](../../../SAM's%20CHANGES.md) separate item)
- Firebase, chatbot, API, env
- Global `.text-display` / `.text-heading` refactor
- Theme toggle default (stays dark-first)

## 17. Open questions (for `/ux-change-plan`)

1. Headline in light mode: flat `text-gray-900` vs subtle dark gradient (`from-gray-900 to-gray-700`)?
2. Remove light-mode glow entirely or replace with subtle `bg-white/60` halo?
3. Should hero adopt `.section-badge` / `.section-copy` classes verbatim or match sizes with inline Tailwind?
4. Secondary “View Portfolio” button: hero-local light styling vs extending `button.tsx` `outline` variant sitewide?
5. Include proof line darkening in light mode (`text-gray-600`) for consistency?

## 18. Handoff

- **Next command:** `/ux-change-plan`
- **Folder:** `Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/`
- **Visual regression routes:** `/` (light + dark, 375px + 1280px+, reduced-motion spot check)
