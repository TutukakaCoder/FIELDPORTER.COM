# Research — Insights “Stay Ahead” newsletter spacing

## 1. Issue summary

| Field     | Detail                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| User goal | Read and use the Insights newsletter CTA as a clean, well-spaced signup block                                                         |
| Pain      | Card feels messy / cramped internally; large void above separates it from content                                                     |
| Current   | “Stay Ahead with AI Insights” GlassCard has near-zero intentional padding/gaps; BlogGrid + newsletter both add large vertical padding |
| Expected  | Balanced internal rhythm (icon → copy → benefits → form → note) and a normal section join with the grid above                         |
| Surfaces  | `/insights` — bottom newsletter signup only                                                                                           |
| Severity  | confusing                                                                                                                             |

## 2. Change scope + rationale

**Localized** — almost all of the mess is in `components/insights/newsletter-signup.tsx`. Three class names (`card-spacing-lg`, `component-spacing`, `text-spacing`) are used but **not defined** anywhere in `globals.css` or Tailwind config, so they apply no styles. Adjacent BlogGrid bottom padding may need a light trim (known-bug #7 double rhythm). No new design tokens required for v1; mirror Services / homepage CTA spacing patterns already in the repo.

## 3. Success criteria (draft)

1. Newsletter GlassCard has visible, even padding on mobile and desktop (comparable to success state `p-8 md:p-12` or Services contact card).
2. Vertical gaps between icon, headline/subhead, benefits, form, privacy line, and social-proof row read as deliberate (not stacked flush or uneven).
3. Gap between BlogGrid bottom CTA and newsletter card is tighter than today; sections still feel distinct.
4. Light + dark themes keep readable text and borders.
5. Form still submits; success state layout unchanged or equally padded.
6. Touch targets on email + button stay ≥ 44–48px.

## 4. Assumptions vs facts

| Claim                                                                                                            | Source                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Target is “Stay Ahead with AI Insights” on `/insights`                                                           | User-reported (wording “Stay ahead with Insights”); Observed heading L182 |
| Component is `NewsletterSignup` at page bottom                                                                   | Observed `app/insights/page.tsx` L50–52                                   |
| `card-spacing-lg`, `component-spacing`, `text-spacing` appear only on this signup (default state)                | Observed — grep; only `newsletter-signup.tsx`                             |
| Those three classes are **undefined** in `app/globals.css` / Tailwind                                            | Observed — no `@apply` / utility definitions                              |
| `GlassCard` has no default padding                                                                               | Observed `components/ui/card.tsx` L139–144                                |
| Success state uses real padding `p-8 md:p-12`                                                                    | Observed L80                                                              |
| BlogGrid section uses `py-16 sm:py-20 lg:py-24`                                                                  | Observed `blog-grid.tsx` L41                                              |
| Newsletter section uses `section-spacing-lg` → `py-12 lg:py-28`                                                  | Observed `globals.css` L423–424                                           |
| Combined bottom+top padding creates large inter-section gap                                                      | Inferred (matches Sam’s CHANGES note + known-bug #7)                      |
| “Messy” includes density (benefits + privacy + “Join 500+” + three checkmarks)                                   | Inferred from structure; Sam emphasized spacing                           |
| “Join 500+ executives…” is unverified social proof                                                               | Inferred (positioning rule: keep unverified stats out)                    |
| Nested `FIELDPORTER.COM/components/insights/newsletter-signup.tsx` is a stale duplicate with better real classes | Observed — do not edit nested copy for live site                          |

## 5. Surfaces & routes

| Route       | Entry                   | Stack                                                |
| ----------- | ----------------------- | ---------------------------------------------------- |
| `/insights` | `app/insights/page.tsx` | `InsightsHero` → `BlogGrid` → **`NewsletterSignup`** |

In-scope:

```
NewsletterSignup (components/insights/newsletter-signup.tsx)
  → section#newsletter-signup.section-spacing-lg
  → GlassCard.card-spacing-lg          ← phantom; no padding
  → .component-spacing / .text-spacing ← phantom; no gaps
  → benefits grid, form, privacy, social proof

Optional adjacent:
BlogGrid bottom padding / mid-page “Get New Articles” scroll-target CTA
```

## 6. Similar surfaces map

| Cluster                      | Route              | File                                        | Same pattern?                          | In scope?           |
| ---------------------------- | ------------------ | ------------------------------------------- | -------------------------------------- | ------------------- |
| Insights newsletter          | `/insights`        | `newsletter-signup.tsx`                     | Yes — broken spacing                   | **Yes**             |
| Insights BlogGrid mid CTA    | `/insights`        | `blog-grid.tsx` L228–263                    | Related join; has real `p-8`           | Optional — gap only |
| Services contact card        | `/services`        | `contact-section.tsx`                       | Reference: `p-5 md:p-12` + `space-y-8` | No — reference      |
| Homepage CTA                 | `/`                | `cta-section.tsx`                           | Reference: real padding + `space-y-*`  | No — reference      |
| Contact secondary newsletter | `/contact`         | `secondary-conversions.tsx`                 | Similar intent, different Card layout  | Defer               |
| Nested stale Insights        | (unused)           | `FIELDPORTER.COM/.../newsletter-signup.tsx` | Already uses real `p-8 md:p-10` + grid | No — do not edit    |
| Article end CTA              | `/insights/[slug]` | `article-layout.tsx`                        | GlassCard with `p-8 md:p-12`           | No                  |

## 7. Layout / token forensics

| Element                                          | Today                                     | Problem                                                                                       |
| ------------------------------------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| Default GlassCard (`newsletter-signup.tsx` L168) | `className="card-spacing-lg"`             | Class undefined → **no card padding**                                                         |
| Inner stack (L169)                               | `text-center component-spacing`           | Class undefined → **no vertical gap** between icon / copy / benefits / form / privacy / proof |
| Title block (L180)                               | `text-spacing`                            | Class undefined → headline and body can sit flush                                             |
| Section (L157)                                   | `section-spacing-lg` (= `py-12 lg:py-28`) | Real; stacks with BlogGrid bottom `py-*` → large gap above                                    |
| Success GlassCard (L80)                          | `p-8 md:p-12`                             | Correct pattern — default state should match                                                  |
| Benefits (L191–210)                              | `gap-4` + `p-2` hover rows                | Fine once parent spacing exists; density may still feel busy                                  |
| Social proof (L275–283)                          | `pt-8 border-t` + three ✓ spans           | Extra chrome; `space-x-8` can crowd on narrow widths                                          |
| Unverified claim (L277)                          | “Join 500+ executives…”                   | Copy risk (positioning); plan should confirm keep/remove                                      |

**Canonical replacements (existing patterns):**

- Card padding: `p-8 md:p-12` (success state / article cards) or `p-5 md:p-12` (Services contact)
- Stack gaps: `space-y-6` / `space-y-8` (homepage CTA, Services contact)
- Title/body: `space-y-3` or `space-y-4`
- Section rhythm: prefer `section-rhythm` / `section-rhythm-tight` over legacy `section-spacing-lg` alias, and reduce one side of the BlogGrid↔newsletter join

## 8. Options

### A — Fix phantom classes + tighten join (recommended for `/ux-plan`)

Replace undefined classes with real Tailwind matching success/Services patterns; switch section to `section-rhythm` or asymmetric `pt-* pb-*` so the gap above shrinks; keep structure (benefits + form + privacy + proof) unless Sam trims copy.

- Risk: Low · Regression: Insights newsletter + success state · Effort: S

### B — Option A + simplify density

Same spacing fix; also drop or merge redundant footer chrome (e.g. three ✓ row overlapping privacy copy) and/or remove unverified “500+” line pending Sam.

- Risk: Low · Needs Sam copy decision · Effort: S

### C — Adopt two-column layout from nested stale file

Port the nested `FIELDPORTER.COM` newsletter layout (copy left, form right on `lg`). Bigger visual change; still must not edit the nested duplicate as the live source.

- Risk: Medium · Regression: mobile stack + form UX · Effort: M

### D — Define global `card-spacing-*` / `component-spacing` tokens

Add missing utilities in `globals.css`. Fixes this call site but invents a parallel spacing system next to `section-rhythm-*` / plain Tailwind.

- Risk: Medium systemic debt · Effort: S–M · **Not recommended for v1**

## 9. Open questions for plan

1. Keep benefits list + social-proof strip, or simplify (Option B)?
2. Keep / rewrite / remove “Join 500+ executives…” (unverified)?
3. Should BlogGrid’s mid-page “Get New Articles” box stay as a scroll teaser, or is newsletter the only subscribe surface to polish?
4. Prefer success-state padding (`p-8 md:p-12`) or Services contact (`p-5 md:p-12`)?
5. How tight should the BlogGrid → newsletter join be (visual QA by Sam)?

## 10. Handoff

- Folder: `Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/`
- Next: `/ux-plan`
- Out of scope (so far): Contact page newsletter card, article pages, nested `FIELDPORTER.COM/` duplicate, newsletter API behavior, full Insights hero redesign
