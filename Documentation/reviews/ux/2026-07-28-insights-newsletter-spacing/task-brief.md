# Task brief — Insights “Stay Ahead” newsletter spacing

## 1. Goal

On `/insights`, make the “Stay Ahead with AI Insights” newsletter card readable and evenly spaced, and close the oversized gap above it so it sits naturally under the blog grid.

## 2. Folder

`Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/`

## 3. Change scope

**Localized** — default (and matching section shell on success) spacing in `components/insights/newsletter-signup.tsx` only. No new tokens. No copy/IA redesign. Contact / article / nested duplicate deferred.

## 4. Chosen approach

**Option A — Fix phantom classes + tighten join** (research recommendation; DECISIONS empty).

### Locked decisions

| Question                                | Decision                                                                          | Basis                                                            |
| --------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Approach                                | Option A                                                                          | Research primary recommendation                                  |
| Card padding                            | `p-8 md:p-12` on default GlassCard                                                | Match success state L80; article GlassCards                      |
| Inner stack gaps                        | `space-y-6 md:space-y-8`                                                          | Homepage CTA / Services contact pattern                          |
| Title / body gap                        | `space-y-3` on headline block                                                     | 8px scale; readable without flush text                           |
| Benefits + privacy + social-proof strip | **Keep** structure for v1                                                         | Option A = spacing only; Option B deferred                       |
| “Join 500+…” line                       | **Keep** for v1                                                                   | Copy decision deferred; spacing ticket only                      |
| BlogGrid mid “Get New Articles” teaser  | **Leave** markup/copy                                                             | Out of scope; scroll target still works                          |
| BlogGrid section `py-*`                 | **Do not change**                                                                 | Join fixed from newsletter top only (smallest blast)             |
| Section rhythm                          | Replace `section-spacing-lg` with asymmetric padding: less top, keep solid bottom | Known-bug #7; avoid stacked `lg:py-28` on top of BlogGrid bottom |
| Success-state card                      | Leave `p-8 md:p-12`; align **section** class with default                         | Same join/padding shell                                          |
| Prefer Services `p-5 md:p-12`?          | No — use success `p-8 md:p-12`                                                    | Same component’s correct state                                   |
| Global `card-spacing-*` utilities       | **Do not add**                                                                    | Option D rejected                                                |
| Two-column layout                       | **Defer**                                                                         | Option C; larger visual change                                   |
| Nested `FIELDPORTER.COM/` copy          | **Do not edit**                                                                   | Stale duplicate                                                  |

## 5. Rejected options

| Option                                    | Why not                                                         |
| ----------------------------------------- | --------------------------------------------------------------- |
| **B — Also simplify density / drop 500+** | Needs Sam copy lock; can follow after A if still feels busy     |
| **C — Two-column from nested file**       | Larger layout rewrite; not needed to fix phantom spacing        |
| **D — Define global spacing utilities**   | Parallel system vs `section-rhythm-*` / Tailwind; systemic debt |

## 6. Similar surfaces map

| Cluster                      | Route              | File                                        | In scope? | Action                       |
| ---------------------------- | ------------------ | ------------------------------------------- | --------- | ---------------------------- |
| Insights newsletter          | `/insights`        | `newsletter-signup.tsx`                     | **Yes**   | Option A                     |
| Insights BlogGrid            | `/insights`        | `blog-grid.tsx`                             | No        | Leave `py-*` and mid CTA     |
| Services contact card        | `/services`        | `contact-section.tsx`                       | Reference | Spacing inspiration only     |
| Homepage CTA                 | `/`                | `cta-section.tsx`                           | Reference | `space-y-*` inspiration only |
| Contact secondary newsletter | `/contact`         | `secondary-conversions.tsx`                 | Defer     | Different Card pattern       |
| Nested stale newsletter      | unused             | `FIELDPORTER.COM/.../newsletter-signup.tsx` | No        | Do not edit                  |
| Article end CTA              | `/insights/[slug]` | `article-layout.tsx`                        | No        | Already padded               |

## 7. Files to change

| File                                        | Change                                                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `components/insights/newsletter-signup.tsx` | Default + success **section** classes; default GlassCard + inner spacing classes; optional mobile wrap on social-proof row |

## 8. Do not touch

- `components/insights/blog-grid.tsx` (including mid-page subscribe teaser)
- `app/insights/page.tsx` composition order
- Benefits copy, headline, privacy copy, “Join 500+” wording (v1)
- Newsletter API / Firebase / analytics events
- `GlassCard` primitive defaults in `components/ui/card.tsx`
- `app/globals.css` (no new utilities)
- Contact / Services / homepage CTAs
- Nested `FIELDPORTER.COM/` tree
- `hosting/` stub
- Browser MCP / `ui:capture`

## 9. Token / spacing map

Reuse existing Tailwind + theme pairs only. No new hex or custom utilities.

| Location                               | Current                                            | Planned                                                                                                  |
| -------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Default section (`#newsletter-signup`) | `section-spacing-lg relative` (= `py-12 lg:py-28`) | `relative pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24`                                                 |
| Success section                        | `section-spacing-lg relative`                      | Same asymmetric classes as default                                                                       |
| Default GlassCard                      | `card-spacing-lg` (undefined)                      | `p-8 md:p-12`                                                                                            |
| Inner stack                            | `text-center component-spacing` (undefined)        | `text-center space-y-6 md:space-y-8`                                                                     |
| Title block                            | `text-spacing` (undefined)                         | `space-y-3`                                                                                              |
| Benefits grid                          | `grid … gap-4 max-w-2xl mx-auto`                   | Unchanged                                                                                                |
| Form / input / button                  | Existing                                           | Unchanged (keep `min-h-[48px]`)                                                                          |
| Privacy note                           | Existing                                           | Unchanged                                                                                                |
| Social-proof row                       | `flex … space-x-8`                                 | `flex flex-wrap items-center justify-center gap-x-6 gap-y-2` (prevents overflow; still Option A spacing) |
| Social-proof wrap                      | `pt-8 border-t …`                                  | Unchanged                                                                                                |

## 10. Visual acceptance criteria

1. **Desktop 1280 light:** Newsletter card has clear padding; icon → headline → body → benefits → form → privacy → proof are separated by even gaps (not flush).
2. **Desktop 1280 dark:** Same spacing; text/borders readable on glass.
3. **Gap above:** Space between BlogGrid bottom (incl. mid CTA) and newsletter card is visibly tighter than before; still a distinct section, not colliding.
4. **Tablet 768 / mobile 375:** Card padding holds; form stacks cleanly; social-proof checks wrap without horizontal overflow.
5. **Success state:** After subscribe, success card remains well padded; section vertical join matches default shell.
6. **Themes:** No new light-mode white-on-pale or dark-mode contrast regressions on this card.
7. **Behaviour:** Email submit, loading, error, and success CTAs still work; `#newsletter-signup` scroll from BlogGrid still lands on the card.

## 11. Implementation steps

1. **Default section (~L157)** — Replace `section-spacing-lg relative` with `relative pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24`.
2. **Success section (~L70)** — Apply the same section class string (keep `id="newsletter-signup"`).
3. **Default GlassCard (~L168)** — `card-spacing-lg` → `p-8 md:p-12`.
4. **Inner stack (~L169)** — `text-center component-spacing` → `text-center space-y-6 md:space-y-8`.
5. **Title block (~L180)** — `text-spacing` → `space-y-3`.
6. **Social-proof checks (~L279)** — `space-x-8` → `flex-wrap … gap-x-6 gap-y-2` (keep parent `pt-8 border-t`).
7. **Verify** — Confirm no remaining `card-spacing-lg` / `component-spacing` / `text-spacing` in this file. `npm run lint` only (never `npm run build` while `next dev` is running).
8. **Docs** — `implementation-summary.md`; README → Partial — pending Sam visual QA; update `SAM's CHANGES.md`; append known-bug pattern for undefined spacing utility classes.

## 12. Behaviour contract

| Before                                        | After                                        |
| --------------------------------------------- | -------------------------------------------- |
| Card effectively unpadded (phantom classes)   | Real `p-8 md:p-12` padding                   |
| Blocks stacked with little/no intentional gap | `space-y-6 md:space-y-8` + `space-y-3` title |
| Large void above newsletter                   | Tighter asymmetric section top padding       |
| Form / API / success flow                     | Unchanged                                    |
| Benefits / “500+” / privacy copy              | Unchanged wording                            |

**Must NOT change:** API payload, gtag event, benefits list content, headline/subhead wording, BlogGrid, other routes, GlassCard primitive.

## 13. Flow-on effects

| Area                      | Mitigation                                                                    |
| ------------------------- | ----------------------------------------------------------------------------- |
| Light / dark              | Keep existing `text-gray-900 dark:text-white` / `text-fieldporter-gray` pairs |
| Mobile / desktop          | Asymmetric `pt/pb` + `flex-wrap` on proof row                                 |
| Motion                    | Leave Framer hover/reveal as-is                                               |
| A11y                      | Keep `aria-label` on email; touch `min-h-[48px]`; no focus-ring changes       |
| Shared GlassCard          | Class override on instance only                                               |
| Copy / chatbot            | No wording changes in v1                                                      |
| Mid-page Subscribe button | Still scrolls to `#newsletter-signup`                                         |

## 14. Manual visual check routes (Sam)

| Route                                               | Themes       | Viewports                                                     |
| --------------------------------------------------- | ------------ | ------------------------------------------------------------- |
| `/insights` (primary) — scroll to newsletter        | Light + dark | 375, 768, 1280                                                |
| `/insights` — click “Subscribe for Updates” mid CTA | Light        | 1280                                                          |
| `/contact`                                          | —            | Spot-check only that secondary newsletter was **not** changed |

No automated capture / browser MCP.

## 15. Manual test plan

1. Open `/insights` at 1280 light; scroll to “Stay Ahead with AI Insights”.
2. Confirm card padding and even vertical rhythm; confirm gap above is tighter.
3. Toggle dark — same spacing; readable glass/text.
4. At 768 and 375 — padding holds; form stacks; proof row wraps; no horizontal scroll from the card.
5. Click mid-page “Subscribe for Updates” — smooth scroll lands on newsletter.
6. Submit invalid/empty (if browser allows) and a valid email path if safe — error/success layouts look padded.
7. Spot-check `/contact` newsletter card unchanged.

## 16. Build & docs on complete

```bash
npm run lint   # never npm run build while next dev is running
```

Then: `implementation-summary.md`, README status, `SAM's CHANGES.md`, known-bug-patterns append.

## 17. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/
Out of scope: BlogGrid py/mid CTA; copy trim / “Join 500+”; two-column layout; globals.css utilities; Contact newsletter; nested FIELDPORTER.COM/; API; browser capture
```
