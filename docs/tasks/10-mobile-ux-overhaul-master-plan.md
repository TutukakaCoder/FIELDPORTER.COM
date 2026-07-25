# Task 10: Mobile UX Overhaul — Master Plan

**Created:** July 2026  
**Status:** Executed July 2026 (Phases 0–3 + browser QA)  
**Scope:** `FIELDPORTER.COM` only (not AIOS UI unless noted)  
**Goal:** Premium phone UX — smaller type, less chrome, progressive disclosure, clearer journeys on Home, Portfolio, Contact.

---

## How to use this in a new chat

Paste this entire file into a new Cursor Agent chat, then send:

```
You are the orchestrator for Task 10 (Mobile UX Overhaul).

Rules:
1. Work phases in order. Do not start Phase N+1 until Phase N is done (except where noted parallel-safe).
2. For each workstream, launch a subagent with the exact AGENT PROMPT in that section. Prefer model: cursor-grok-4.5-high (or inherit if unavailable).
3. Each implementer must: read files first, make focused changes, run `npm run build` in FIELDPORTER.COM, report files changed + residual risks.
4. Do not redesign brand (keep dark glass). Do not expand unused components (TrustIndicatorBar, AIAuditSection, ConsultationForm, ContactHero, SecondaryConversions).
5. Never use && in shell commands.
6. After ALL implement phases complete, run Phase QA yourself with the browser tools (cursor-ide-browser). Use the QA checklist. Fix P0 visual bugs found in QA before declaring done.
7. End with one short report: what changed, build status, QA pass/fail, what Freddy should add to Claude knowledge.

Start Phase 0 now.
```

---

## Constraints (all agents)

- Brand: dark glassmorphism, sophisticated, not purple glow spam
- Mobile-first: fix phone (`~375px`); desktop must not regress
- Accessibility: keep ≥44px tap targets; form inputs stay `text-base` (16px) on iOS
- Premium mobile formula: **smaller type + less nested chrome + collapse secondary content** — not more padding
- Ban on phone: `text-5xl` / `text-6xl` / `text-7xl` as base; default `section-rhythm-lg` as `py-20+`
- Run build after changes: `cd FIELDPORTER.COM` then `npm run build`
- Concise report only — no emoji

---

## Phone type & spacing ramp (canonical)

| Token | Phone | Tailwind | Use |
|-------|-------|----------|-----|
| display | 2rem | `text-3xl` | Page H1 only |
| title | 1.5rem | `text-2xl` | Section H2 |
| subtitle | 1.125rem | `text-lg` | Card/project titles |
| body | ~1rem | `text-base` | Default copy |
| meta | 0.75–0.8125rem | `text-xs` | Badges, chips |
| section-y | 3rem | `py-12` | Default section on phone |
| card-pad | 1rem | `p-4 md:p-6` | Cards on phone |

Scale up only at `md` / `lg`.

---

## Phase map

| Phase | Workstream | Parallel? | Depends on |
|-------|------------|-----------|------------|
| 0 | Orchestrator prep + inventory | — | — |
| 1 | Global tokens (`globals.css` + card primitives) | Solo | 0 |
| 2A | Homepage mobile | After 1 | 1 |
| 2B | Portfolio mobile | Parallel with 2A | 1 |
| 2C | Contact / forms / chat FAB | Parallel with 2A | 1 |
| 3 | Secondary pages (services, about, insights heroes) | After 2* | 1 |
| QA | Browser mobile verification + fixes | After 2–3 | 2A–2C, 3 |

\*Phases 2A / 2B / 2C may run as three parallel subagents after Phase 1 lands.

---

## Phase 0 — Orchestrator prep

### Goal
Confirm repo paths, kill stale servers if needed, note current branch state. No product code changes.

### AGENT PROMPT (orchestrator only — do not subagent)

```
Phase 0 prep for FIELDPORTER mobile UX overhaul.

1. Confirm workspace root and that FIELDPORTER.COM exists.
2. List key files:
   - app/globals.css
   - components/homepage/{hero,services,portfolio,cta}-section.tsx
   - app/portfolio/page.tsx
   - app/contact/contact-page-client.tsx
   - components/contact/simple-contact-form.tsx
   - components/booking/BookingWidget.tsx
   - components/chat/responsive-chat-manager.tsx
   - components/ui/card.tsx
   - components/layout/header.tsx
3. Check if a dev server is already running (terminals). Do not start one yet unless needed later for QA.
4. Reply with: ready for Phase 1, any blockers.
```

### Done when
Orchestrator says ready; no blockers.

---

## Phase 1 — Global mobile type & spacing system

### Goal
Make shared tokens phone-first so later page work inherits calmer density.

### Files
- `FIELDPORTER.COM/app/globals.css`
- `FIELDPORTER.COM/components/ui/card.tsx` (padding defaults)
- Optionally `FIELDPORTER.COM/components/layout/header.tsx` (reduce phone inset only)

### AGENT PROMPT

```
You are implementing Phase 1 of FIELDPORTER mobile UX overhaul.

Workspace: FIELDPORTER.COM inside the FieldPorter website monorepo.

GOAL
Make globals + card primitives mobile-first so phone density improves sitewide without one-off hacks.

READ FIRST
- app/globals.css (section-rhythm*, section-headline, section-copy, text-display*, card-section, any text-mobile helpers)
- components/ui/card.tsx
- components/layout/header.tsx (phone inset only if quick)

IMPLEMENT
1. Remap section rhythm for phone (keep large desktop):
   - section-rhythm / section-padding / section-spacing → py-12 lg:py-24 (or equivalent)
   - section-rhythm-lg / section-spacing-lg → py-12 lg:py-28 (NOT py-20 on mobile)
   - section-rhythm-xl → py-14 lg:py-32
   - section-rhythm-2xl → py-16 lg:py-40
   - section-rhythm-tight → py-8 lg:py-16
2. Ensure section-headline / section-copy stay calm on phone (headline ~text-2xl, copy ~text-base).
3. Soften text-display* utilities so phone never starts at 48px+ for marketing heroes (display base ~text-3xl; scale at lg).
4. card-section: p-4 md:p-6 (not p-6 md:p-8) on phone.
5. card.tsx: reduce default Header/Content padding on phone to p-4 md:p-6; EnterpriseCard must not force p-8 on phone.
6. Header (optional S): on phone reduce floating inset (e.g. left-3 right-3 / top-3) without breaking desktop.

DO NOT
- Rewrite page components (homepage/portfolio/contact) — later phases
- Change brand colors / glass aesthetic
- Touch AIOS

VERIFY
- Run npm run build in FIELDPORTER.COM
- Report: files changed, token table before/after, build OK/fail

Return a short completion note only.
```

### Done when
Build passes; rhythm/type/card tokens updated.

---

## Phase 2A — Homepage mobile

### Goal
Lighter first visit: smaller hero, services accordion on mobile, thinner portfolio teaser.

### Files
- `components/homepage/hero-section.tsx`
- `components/homepage/services-section.tsx`
- `components/homepage/portfolio-section.tsx`
- `components/homepage/cta-section.tsx` (light touch only)
- `app/page.tsx` (only if needed)

### AGENT PROMPT

```
You are implementing Phase 2A — Homepage mobile UX for FIELDPORTER.COM.

DEPENDS ON
Phase 1 globals tokens already landed. Use section-headline / section-copy / updated section-rhythm where sensible.

GOAL
Phone homepage should feel premium and scannable: brand + promise + Book a Call first; less bulk; progressive disclosure for services.

READ FIRST
- app/page.tsx (live sections only: Hero, Services, Portfolio, CTA)
- components/homepage/hero-section.tsx
- components/homepage/services-section.tsx
- components/homepage/portfolio-section.tsx
- components/homepage/cta-section.tsx

IMPLEMENT
1. Hero (mobile):
   - H1 base text-3xl or text-4xl (NOT text-5xl). Scale up at md/lg.
   - Value prop text-base on phone (not text-lg/xl).
   - Primary CTA full width "Book a Call"; demote "View Work" to text/outline smaller control (not dual h-14 stack).
   - Keep min-h-screen if needed but tighten vertical spacing (space-y / pt/pb).
2. Services (mobile only):
   - Collapsed-by-default accordion: show phase/title + one-line tagline + chevron.
   - Expand reveals benefits + timeline + Learn More.
   - Desktop (≥md/lg): keep existing card grid.
3. Portfolio teaser (mobile):
   - Short titles (add shortTitle in data if needed).
   - Status on its own row (no title+status fight in one flex row).
   - Truncate long taglines; shorten or collapse full testimonial (name/role or 2-line quote max).
   - Less card padding; link to /portfolio remains clear.
4. CTA: keep light; ensure type uses tokens; no new sections.

DO NOT
- Remount TrustIndicatorBar or AIAuditSection
- Change desktop layout radically
- Edit portfolio full page (Phase 2B)

VERIFY
- npm run build in FIELDPORTER.COM
- Mentally check ~375px journey: hero fits, services not 4 full essays, portfolio teaser scannable

Return short completion note: files + behavior changes.
```

### Done when
Build passes; mobile accordion + hero scale + thinner teaser done.

---

## Phase 2B — Portfolio mobile

### Goal
Project-first phone journey; fix wrapping chips/titles; collapse secondary detail.

### Files
- `app/portfolio/page.tsx`
- `components/homepage/portfolio-section.tsx` only if shortTitle shared — prefer keep data local or shared constant if clean

### AGENT PROMPT

```
You are implementing Phase 2B — Portfolio mobile UX for FIELDPORTER.COM.

DEPENDS ON
Phase 1 tokens landed.

GOAL
On ~375px: navigate projects in ≤2 taps; stop fully expanded category dumps; stop 2-line title/status fights; less nested glass.

READ FIRST
- app/portfolio/page.tsx (InteractivePortfolioShowcase, project cards, chips, media order)
- components/homepage/portfolio-section.tsx (align short titles if easy)

IMPLEMENT
1. Navigation
   - Sticky horizontal-scroll filter chips (flex-nowrap, overflow-x-auto, snap). Clear short labels (not first-word truncation like "Client").
   - Prefer project-first accordion: collapsed row = short title + status + 1-line outcome; expand = detail.
   - OR swipeable project pager if accordion is too large a rewrite — pick the smaller solid path that achieves project-first.
   - If section swipe remains, it must not be the only way to move between projects.
2. Wrapping / density
   - Add shortTitle (or mobileTitle) for long names (e.g. VOLOCEAN…).
   - Category + status: stack on mobile (flex-col); shorter status labels; whitespace-nowrap on status pill.
   - Reduce mb-20 under chips; drop redundant section marketing chrome on mobile where possible.
3. Progressive disclosure
   - Collapse by default on mobile: capabilities, metrics sentences, tech stack, vision/philosophy, long testimonials.
   - Primary visible: short title, status, 1 outcome line, media, one CTA.
4. Media
   - Title before media on mobile (remove order-first that puts media above headline).
   - Flatten nested rounded-3xl + padding frames (one radius layer; less padding on phone).
5. Desktop
   - Keep lg two-column media+copy behavior.

DO NOT
- Delete real project content/assets
- Redesign brand colors
- Break desktop showcase entirely

VERIFY
- npm run build
- Confirm chip labels readable; titles preferably one line via shortTitle; details expand on tap

Return short completion note.
```

### Done when
Build passes; mobile project scan/expand works; wrapping fixed.

---

## Phase 2C — Contact, forms, chat FAB

### Goal
Faster book/message path; tidy form density; FAB must not cover Submit.

### Files
- `app/contact/contact-page-client.tsx`
- `components/contact/simple-contact-form.tsx`
- `components/contact/contact-methods.tsx`
- `components/booking/BookingWidget.tsx`
- `components/chat/responsive-chat-manager.tsx` (and related if needed)
- `app/services/page.tsx` (tab labels only — small)

### AGENT PROMPT

```
You are implementing Phase 2C — Contact / forms / mobile chrome for FIELDPORTER.COM.

DEPENDS ON
Phase 1 tokens landed.

GOAL
Mobile conversion path is tidy: less pre-copy, clear Book/Message, denser form, calendar usable, chat FAB not covering CTAs.

READ FIRST
- app/contact/contact-page-client.tsx
- components/contact/simple-contact-form.tsx
- components/contact/contact-methods.tsx
- components/booking/BookingWidget.tsx
- components/chat/responsive-chat-manager.tsx
- components/ui/input.tsx (reuse patterns — do not break text-base / min-h-[44px])
- app/services/page.tsx (mobile tab label truncation)

IMPLEMENT
1. Contact page chrome
   - Cut/collapse "What to expect" / Fit pre-copy into a short accordion or 2 lines.
   - Sticky or early Book / Message segmented control (no huge delay before action).
   - Remove duplicate H1 when message mode shows SimpleContactForm (form should not re-announce page title).
2. SimpleContactForm
   - Tighten vertical rhythm (space-y-8 → denser on mobile).
   - Prefer label OR placeholder; helper only when needed (challenge field).
   - Fix light-mode contrast bugs (org/textarea white-on-light).
   - Prefer shared Input/Textarea/Label primitives if drop-in safe; else fix classes in place.
   - Keep ≥44px targets and text-base on inputs.
3. BookingWidget
   - On mobile use a Cal layout better than month_view if the embed API allows (column_view or week_view).
   - Reduce min-h-[600px] pain if possible; collapse benefit cards under accordion on phone.
4. Chat FAB
   - Hide chat FAB on /contact (and ideally when booking UI focused), OR relocate so it never covers Submit.
   - Chat is coming-soon — do not invest in chat UX beyond conflict removal.
5. ContactMethods
   - Collapse secondary process/email blocks on mobile to a one-liner or accordion after the form.
6. Services tabs (small)
   - Stop first-word-only labels on mobile; use readable short labels + horizontal scroll if needed.

DO NOT
- Mount unused ConsultationForm / SecondaryConversions / ContactHero
- Remove book-first default
- Shrink input text below 16px

VERIFY
- npm run build
- Mentally walk: /contact → Book and Message without FAB covering primary button

Return short completion note.
```

### Done when
Build passes; contact path denser; FAB conflict resolved.

---

## Phase 3 — Secondary page heroes (consistency)

### Goal
Align About / Services / Insights / AIOS marketing heroes to the same phone type ramp (no more text-5xl clones).

### Files
- `components/about/about-hero.tsx`
- `components/services/service-hero.tsx`
- `components/insights/insights-hero.tsx` (already closer — light touch)
- `components/contact/*` only if a leftover hero still mounts
- `app/aios/page.tsx` hero/type only

### AGENT PROMPT

```
You are implementing Phase 3 — Secondary page mobile hero/type consistency for FIELDPORTER.COM.

DEPENDS ON
Phase 1 done. Prefer after 2A–2C but can run once Phase 1 is merged if no file conflicts.

GOAL
Kill the sitewide mobile hero anti-pattern: text-5xl md:text-7xl + text-xl body. Match the phone ramp (display ~text-3xl, body text-base).

READ
- components/about/about-hero.tsx
- components/services/service-hero.tsx
- components/insights/insights-hero.tsx
- app/aios/page.tsx
- Spot-check services/about section cards for p-8 / text-xl body on phone; tighten only obvious clones.

IMPLEMENT
1. Page H1s: text-3xl md:text-5xl lg:text-6xl (or use shared display tokens) — never text-5xl base on phone.
2. Support copy: text-base md:text-lg.
3. Reduce excessive section padding classes that still hardcode py-20+ on these pages if easy.
4. Do not rewrite page content strategy — visual density only.

VERIFY
- npm run build
- List pages touched

Return short completion note.
```

### Done when
Build passes; heroes consistent on phone.

---

## Phase QA — Browser mobile verification (orchestrator)

### Goal
Manually verify on a real browser at phone width; fix blockers.

### AGENT PROMPT (orchestrator — use browser tools)

```
Phase QA for FIELDPORTER mobile UX overhaul.

SETUP
1. Start or reuse local dev server for FIELDPORTER.COM (`npm run dev`). Note the URL (usually http://localhost:3000).
2. Use cursor-ide-browser tools.
3. Set viewport to ~390x844 (iPhone-ish) via CDP or device metrics if available; otherwise resize and screenshot.

TEST MATRIX (visit each; screenshot key states)
A. Home /
   - Hero: brand + headline + primary CTA visible without feeling shouty
   - Services: collapsed accordion; expand one item works
   - Portfolio teaser: titles prefer one line; status not fighting title
   - Book a Call works
B. Portfolio /portfolio
   - Chips readable and scroll horizontally
   - Projects collapsed or pager; expand one project
   - Media not above title on mobile
   - Jump between 2 projects in ≤2 taps
C. Contact /contact
   - Book/Message reachable quickly
   - Chat FAB does NOT cover Submit / primary booking controls
   - Form fields readable in light AND dark if theme toggle exists
   - Optional: open keyboard on a field — CTA still usable
D. Services /services
   - Tab labels readable (not truncated to useless first word)
E. About /about and Insights /insights
   - Hero type not text-5xl shouty

PASS/FAIL
- File bugs found as P0 (blocks premium feel / broken) or P1 (polish)
- Fix all P0 immediately in code, rebuild, re-check
- Write one short QA report: pass/fail per page, screenshots notes, residual P1s

Also run npm run build one final time.
```

### Done when
QA checklist completed; P0s fixed; final build green.

---

## Suggested orchestrator launch order

```
1. Phase 0 (you)
2. Subagent: Phase 1
3. Wait for Phase 1
4. Parallel subagents: Phase 2A + 2B + 2C
5. Wait for 2A–2C
6. Subagent: Phase 3
7. You: Phase QA in browser + fix P0s
8. Final short report to Freddy
```

---

## Out of scope (do not do in this plan)

- AIOS assessment question renderer UI (not shipped in marketing site)
- Reviving TrustIndicatorBar / AIAuditSection / ConsultationForm / SecondaryConversions
- Entrance video / 3D hero upgrades (see task 08 / 09)
- Content strategy rewrite (positioning already set)
- Force-push / deploy (Freddy decides)

---

## Final report template (orchestrator → Freddy)

```
## Mobile UX overhaul — done

### Changed
- Phase 1: …
- Phase 2A: …
- Phase 2B: …
- Phase 2C: …
- Phase 3: …

### Build
- npm run build: PASS/FAIL

### Browser QA (~390px)
- Home: PASS/FAIL
- Portfolio: PASS/FAIL
- Contact: PASS/FAIL
- Services/About/Insights: PASS/FAIL
- P0 fixes during QA: …

### Add to Claude knowledge
- …
```

---

## Add to Claude project knowledge

- Task 10 master plan lives at `FIELDPORTER.COM/docs/tasks/10-mobile-ux-overhaul-master-plan.md`
- Premium mobile = smaller type + less chrome + collapse secondary content
- Execute Phase 1 tokens before page agents
- Live homepage = Hero → Services → Portfolio → CTA only
- Portfolio mobile = project-first, not section dumps
- Contact: hide chat FAB conflict; unused contact components stay unused
