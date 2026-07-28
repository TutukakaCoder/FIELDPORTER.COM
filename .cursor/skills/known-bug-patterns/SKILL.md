---
name: known-bug-patterns
description: >-
  Running log of recurring UI bugs fixed in FIELDPORTER. Check before audits;
  append after every fix. Helps agents catch patterns faster.
---

# Known Bug Patterns — FIELDPORTER

**Append a new entry after every UI fix** (date, pattern, location, fix).

## Patterns

### 1. Dark-first hero text without light theme pair

- **Symptom:** White gradient headline invisible on light aurora background
- **Location:** `components/homepage/hero-section.tsx`; also About/Services heroes
- **Fix:** `text-gray-900 dark:text-white` pairs; badge/subhead `text-gray-600 dark:text-gray-300`
- **Status:** Homepage fixed 2026-07-01; About/Services heroes deferred

### 2. Grid cards unequal height

- **Symptom:** Cards in 3-col row different heights; tallest is step 03 / longest copy card
- **Location:** `components/about/systematic-approach.tsx`, `components/about/technical-capability.tsx`
- **Fix:** `items-stretch` on grid; `h-full` on motion wrapper + inner card; `flex flex-col flex-1 min-h-0` on content
- **Status:** Fixed 2026-07-28 (Process + AI Training); Contact/AIOS same pattern still deferred

### 3. Flex-wrap tab/button row unequal widths

- **Symptom:** Service showcase tabs different widths/heights in a row (content-sized flex pills)
- **Location:** `app/services/page.tsx` InteractiveServiceShowcase (What We Build)
- **Fix:** `grid grid-cols-2 lg:grid-cols-4 items-stretch` + `w-full h-full` buttons; optional `line-clamp-2`; drop horizontal scroll wrapper
- **Status:** Fixed 2026-07-28 on live root app (earlier 2026-07-01 pass only hit nested stale `FIELDPORTER.COM/` copy)

### 4. Hero `min-h-screen` pushes content below fold

- **Symptom:** Portfolio tabs far below viewport on load; sticky opaque chip bar + `border-b` hard-cuts content
- **Location:** `app/portfolio/page.tsx` PortfolioHero + InteractivePortfolioShowcase sticky chips
- **Fix:** Drop viewport `min-h-*` / vertical centering; use `pt-28 pb-8 md:pt-32 md:pb-10`; showcase `section-rhythm` (not `2xl`); sticky `bg-white/80 dark:bg-black/80 backdrop-blur-md` with no `border-b`
- **Status:** Partial — code 2026-07-28; pending Sam visual QA · [`2026-07-28-portfolio-category-tabs-position`](../../../Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/)

### 5. Trust bar floating with excess vertical space

- **Symptom:** Stats row feels disconnected from hero
- **Location:** `components/homepage/trust-indicator-bar.tsx` between hero and AI audit
- **Fix:** Tighten `section-rhythm-tight` or reposition stats into hero
- **Status:** Open

### 6. Orphan typography tokens hardcode white

- **Symptom:** `.text-display` always white — breaks if applied in light mode
- **Location:** `app/globals.css`
- **Fix:** Add theme pairs or deprecate in favor of `.section-headline`
- **Status:** Open (hero doesn't use it; systemic debt)

### 7. Double section rhythm padding

- **Symptom:** Excessive gap between sections (e.g. Methodology → FAQ on Services)
- **Location:** Adjacent sections both using `section-rhythm-xl`; also nested `py-*` inside a section that already has `section-rhythm-*`
- **Fix:** One rhythm owner only — page shell OR component, not both. Prefer remove inner `py-*` when parent has `section-rhythm-*`. For adjacent sections, use tight variant on one.
- **Status:** Partial — nested Methodology `py-16 md:py-24` removed 2026-07-28; Methodology + FAQ both still `section-rhythm-xl` (Sam visual QA may still want FAQ wrapper tightened)

### 9. Concurrent `next build` while `next dev` whitescreens the app

- **Symptom:** Blank/white page; console 404s for `/_next/static/chunks/*.js` (MIME text/html); server `Cannot find module './NNN.js'`
- **Cause:** `npm run build` (or `rm -rf .next` / competing Next processes) overwrites the live `.next` cache used by `next dev`
- **Location:** UX verify steps that used to mandate `npm run build && npm run lint`
- **Fix:** While Sam has `next dev` open, verify with `npm run lint` only. Never build, never delete `.next`, never kill ports 3000–3002 unless Sam asks. Hard-refresh after HMR is enough for UI checks.
- **Status:** Fixed in agent instructions 2026-07-28; if white screen recurs, one clean `next dev` restart (Sam-approved) restores it

### 10. Undefined spacing utility class names (phantom classes)

- **Symptom:** Card looks cramped / messy; padding and gaps missing though class names look intentional
- **Location:** `components/insights/newsletter-signup.tsx` used `card-spacing-lg`, `component-spacing`, `text-spacing` with no definitions in `globals.css`
- **Fix:** Replace with real Tailwind (`p-8 md:p-12`, `space-y-6 md:space-y-8`, `space-y-3`). Do not invent parallel `*-spacing` utilities; reuse existing patterns. Also tighten stacked section top padding when adjacent to BlogGrid (known-bug #7).
- **Status:** Fixed 2026-07-28 on Insights newsletter · Partial — pending Sam visual QA · [`2026-07-28-insights-newsletter-spacing`](../../../Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/)

```markdown
### N. [Short title]

- **Symptom:**
- **Location:** `path/to/file.tsx`
- **Fix:**
- **Status:** Fixed YYYY-MM-DD | Open
```
