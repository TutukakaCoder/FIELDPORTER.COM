# Task brief — Homepage hero light-mode text contrast

## 1. Goal

In light mode on `/`, the hero headline and subhead are immediately readable in black/dark gray, matching the theme-aware styling used elsewhere on the homepage, with dark mode appearance preserved.

## 2. Folder

`Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/`

## 3. Change scope

**Localized** — user scoped the homepage hero fold only. Fix is component-level theme pairing in one file; no site-wide token or spacing changes.

**App code root:** `FIELDPORTER.COM/` (command templates say `hosting/`; that directory is a stub — all paths below use the live app).

## 4. Chosen approach

**Option A — Hero component theme pairs** (from research). Single-file class updates in `hero-section.tsx` mirroring existing `.section-headline`, `.section-copy`, and `.section-badge` values from `globals.css` without adding new global tokens. Lowest regression risk, completes the user’s “any white font in the hero” ask (headline, badge, subhead, secondary CTA, glow), and avoids a sitewide `button.tsx` change.

**Open-question decisions (locked for implement):**

| Question                     | Decision                                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| Headline style in light mode | Subtle dark gradient: `from-gray-900 to-gray-700` (reads as black, keeps depth)                      |
| Light-mode glow              | Remove — `hidden dark:block` on existing glow div                                                    |
| Badge / copy classes         | Inline Tailwind matching `.section-badge` / `.section-copy` tokens; keep hero font sizes on elements |
| Secondary CTA                | Hero-local `className` overrides only on the “View Portfolio” button                                 |
| Proof line                   | Align to `text-gray-600 dark:text-gray-400` for consistency (minor)                                  |

## 5. Rejected options

| Option                                       | Reason                                                       |
| -------------------------------------------- | ------------------------------------------------------------ |
| **B — Semantic hero tokens in globals.css**  | More scope than needed; defer until About/Services hero pass |
| **C — Headline + subhead only**              | Leaves badge, glow, and secondary CTA broken in light mode   |
| **D — Darken hero background in light mode** | Opposite of user intent; fights site light theme             |

## 6. Similar surfaces map (from research)

| Surface cluster             | Route(s)    | File(s)                                                | Same pattern?  | In scope? | Planned change                                                                                                             |
| --------------------------- | ----------- | ------------------------------------------------------ | -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Homepage hero**           | `/`         | `FIELDPORTER.COM/components/homepage/hero-section.tsx` | Yes            | **Yes**   | Add light/dark text pairs for H1, badge, value prop, proof line; hide glow in light; light-mode secondary CTA borders/text |
| Homepage trust bar          | `/`         | `trust-indicator-bar.tsx`                              | No             | No        | —                                                                                                                          |
| Homepage services           | `/`         | `services-section.tsx`                                 | No             | No        | —                                                                                                                          |
| Homepage portfolio          | `/`         | `portfolio-section.tsx`                                | No             | No        | —                                                                                                                          |
| Homepage CTA                | `/`         | `cta-section.tsx`                                      | No             | No        | —                                                                                                                          |
| Homepage AI audit           | `/`         | `ai-audit-section.tsx`                                 | No             | No        | —                                                                                                                          |
| About hero                  | `/about`    | `about-hero.tsx`                                       | Partial        | **Defer** | Same anti-pattern but dark-only bg; separate issue                                                                         |
| Services hero               | `/services` | `service-hero.tsx`                                     | Partial        | **Defer** | Same as About hero                                                                                                         |
| Shared header/footer        | all         | `header.tsx`, `footer.tsx`                             | No             | No        | —                                                                                                                          |
| globals.css `.text-display` | site-wide   | `globals.css`                                          | Partial orphan | **Defer** | Hero does not use these classes                                                                                            |

## 7. Files to change

| File                                                   | Change                                        |
| ------------------------------------------------------ | --------------------------------------------- |
| `FIELDPORTER.COM/components/homepage/hero-section.tsx` | All theme/contrast fixes (only in-scope file) |

**Not changing:** `globals.css`, `config/constants.ts`, `button.tsx`, nav/footer, knowledge files.

**Copy-only, no chatbot update needed** — no wording changes.

## 8. Do not touch

- `hosting/` stub app
- Auth, APIs, Firebase config, env
- Chatbot backend / knowledge base files
- About, Services, Portfolio, Insights pages
- Trust indicator bar spacing (separate SAM's CHANGES item)
- Global `.text-display` / `.text-heading` refactor
- Theme toggle default (stays dark-first)
- Hero animation timing, 3D background components, section spacing (`min-h-screen`, `pt-20`, `space-y-*`)

## 9. Token map

**N/A** — Change scope is **Localized**. Implement reuses existing semantic values from `globals.css` (`.section-headline`, `.section-copy`, `.section-badge`) as inline Tailwind equivalents; no new CSS variables or `@layer` classes.

Reference values (read-only during implement):

| Semantic class      | Light                                                 | Dark                                            |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| `.section-headline` | `text-gray-900`                                       | `text-white`                                    |
| `.section-copy`     | `text-gray-600`                                       | `text-gray-300`                                 |
| `.section-badge`    | `border-gray-900/10 bg-gray-900/[0.04] text-gray-700` | `border-white/10 bg-white/[0.04] text-gray-300` |

## 10. Spacing map

**N/A** — Not a layout/spacing issue. No class changes to `min-h-*`, `py-*`, `section-rhythm-*`, or margins. Typography/color only.

## 11. Visual acceptance criteria

1. **Light / desktop (1280px) — H1:** On `/` with theme toggle set to light, “AI Systems Your Team Can Actually Use” renders as dark near-black text (gradient `gray-900` → `gray-700` or equivalent). Before: white/invisible on pale background. After: clearly readable at arm’s length.

2. **Light / desktop — value prop:** “We build AI automations, internal tools, and workflows for growing companies.” uses `text-gray-600` or darker. Before: faint `gray-400`. After: body text readable without squinting; contrast ≥ WCAG AA 4.5:1 on `gray-50` background.

3. **Light / desktop — badge:** “Practical AI, Shipped Fast” pill has visible border/background and `text-gray-700` (or equivalent). Before: `gray-300` on invisible white glass. After: legible label matching lower homepage sections.

4. **Light / desktop — secondary CTA:** “View Portfolio” outline button shows dark border and dark label on light background; min height ≥ 56px (`h-14`). Before: white-tinted border nearly invisible. After: clearly tappable.

5. **Light / desktop — glow:** No dark `bg-black/40` halo visible behind hero copy. Before: gray mud behind text. After: glow absent in light mode only.

6. **Dark / desktop (1280px) — no regression:** With theme dark, H1 white gradient (`from-white to-white/70`), badge, subhead, CTAs, and dark glow match current production appearance.

7. **Light / mobile (375px):** Criteria 1–5 pass on mobile viewport (uses `LightHeroBackground` — highest contrast risk).

8. **Dark / mobile (375px):** Criterion 6 passes.

9. **Proof line (both themes):** “Recent outcomes: …” uses `text-gray-600 dark:text-gray-400`; slightly darker in light mode than today; no layout shift.

10. **Motion unchanged:** Hero stagger/reveal animations still run; only color classes change. Reduced-motion path unchanged.

## 12. Implementation steps

1. Open `FIELDPORTER.COM/components/homepage/hero-section.tsx`.

2. **Readability glow (L273):** Change to `hidden dark:block` (keep existing size/blur/dark classes). Light mode: no glow element rendered.

3. **Supporting badge shell (L276):** Replace `bg-white/5 border border-white/10` with theme pair: `border-gray-900/10 bg-gray-900/[0.04] dark:border-white/10 dark:bg-white/5`.

4. **Supporting line text (L278):** `text-gray-700 dark:text-gray-300` (matches `.section-badge`).

5. **H1 headline (L286):** Replace gradient with:

   ```
   text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-700 dark:from-white dark:to-white/70
   ```

   Keep existing size/weight/tracking classes.

6. **Value prop (L293):** `text-gray-600 dark:text-gray-300` (matches `.section-copy` at hero sizes).

7. **Proof line (L301):** `text-gray-600 dark:text-gray-400` (was `text-gray-500 dark:text-gray-400`).

8. **Secondary CTA (L215):** Add light-mode overrides on the `Button` `className`:

   ```
   border-gray-900/20 text-gray-900 hover:bg-gray-900/[0.04] hover:border-gray-900/30
   dark:bg-white/[0.02] dark:hover:bg-white/[0.08] dark:border-white/10 dark:hover:border-white/20 dark:text-white
   ```

   Preserve `h-14`, backdrop-blur, and motion wrappers.

9. **Do not modify** `AnimatedCTA` primary “Book a Call” button (`variant="invert"`) — already readable in light mode.

10. Run build + lint (see §18). Visual QA per §11 and §17.

## 13. Design checklist

- [x] Uses existing section typography token **values** (inline, not new globals)
- [x] No spacing/grid changes — 8px rhythm unchanged
- [x] Framer Motion wrappers on badge, H1, value prop, CTAs untouched
- [x] No new one-off spacing; hero-local CTA styling only with rationale in §4

## 14. Behaviour contract

| Before                                         | After                                                      |
| ---------------------------------------------- | ---------------------------------------------------------- |
| Light mode: white H1, faint gray subhead/badge | Light mode: dark H1, `gray-600` subhead, theme-aware badge |
| Dark mode: white gradient H1, gray subhead     | Dark mode: unchanged                                       |
| Dark glow in both themes                       | Glow dark-mode only                                        |
| Secondary CTA white borders in both themes     | Theme-paired borders/text                                  |

**Must NOT change:**

- Routing, links (`/contact`, `/portfolio`)
- Copy strings (from `config/constants.ts`)
- Hero 3D / tiered background selection logic
- Animation variants, stagger timing, `useReducedMotion` behaviour
- Section geometry (`min-h-screen`, padding, `space-y-*`)
- Primary CTA appearance and analytics

## 15. Flow-on effects

| Area                             | Mitigation                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| Dark mode regression             | Every change uses explicit `dark:` pair; QA criterion 6                                |
| Desktop light + 3D background    | Dark text on semi-transparent 3D — verify criterion 1; glow hidden in light avoids mud |
| About/Services heroes (deferred) | Document inconsistency; future `/ux-issue-research` if needed                          |
| Sibling sections                 | No code changes; spot-check trust bar unchanged on scroll                              |
| a11y                             | Target AA on value prop; verify focus rings on updated secondary CTA                   |

## 16. Visual regression routes

| Route | Why                               | Viewports     | Themes       |
| ----- | --------------------------------- | ------------- | ------------ |
| `/`   | Only in-scope surface — hero fold | 375px, 1280px | Light + dark |

**Spot-check only (unchanged code, confirm no accidental drift):**

| Route                  | Check                                                  |
| ---------------------- | ------------------------------------------------------ |
| `/` scroll to Services | Section headings still `text-gray-900 dark:text-white` |
| `/` scroll to CTA      | Card copy still theme-aware                            |

Min 3 checks satisfied via `/` light desktop, `/` light mobile, `/` dark desktop.

## 17. Manual test plan

1. Open `/` at 1280px → toggle **light** → verify criteria 1–5, 9 (headline, subhead, badge, secondary CTA, no glow, proof line).
2. Same viewport → toggle **dark** → verify criterion 6 (white headline, familiar dark hero).
3. Open `/` at 375px → **light** → repeat step 1 (mobile background path).
4. 375px → **dark** → repeat step 2.
5. Toggle light ↔ dark twice on hero → no flash of wrong colors; no layout jump.
6. Tab to “View Portfolio” → focus ring visible; activate link → navigates to `/portfolio`.
7. Optional: enable reduced motion in OS → hero still reveals; colors correct in light mode.

## 18. Build & docs

```bash
cd FIELDPORTER.COM && npm run build
cd FIELDPORTER.COM && npm run lint
```

On completion (`/ux-implement`):

- Write `implementation-summary.md` in this folder
- Update folder `README.md` status → Done
- Update `Documentation/reviews/ux/README.md` row → Done
- Update `SAM's CHANGES.md` entry “Homepage hero text unreadable in light mode” — note fixed + link to implementation summary

## 19. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/
Out of scope: hosting/ stub, About/Services heroes, globals.css tokens, button.tsx outline variant, trust bar spacing, chatbot/knowledge files, copy changes
```
