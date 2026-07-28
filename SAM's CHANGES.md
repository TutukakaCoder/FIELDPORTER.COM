# SAM's Changes — FIELDPORTER Website

**Purpose:** Log of possible changes, improvements, and tweaks found while reviewing the FIELDPORTER website.  
**For review with:** Freddie  
**Status:** In progress — add items as you find them. No code changes yet.

---

## How to log an item

Copy this block for each new finding:

```
### [Short title]
- **Page / area:**
- **What I noticed:**
- **Suggested change:**
- **Priority:** Low / Medium / High
- **Notes:**
```

---

## Content & copy

### Remove Strategic Research & Intelligence as a standalone service

- **Page / area:** Homepage (`/`) — Services section; also affects Services page (`/services`) and About page (`/about`)
- **What I noticed:** The business may no longer need Strategic Research & Intelligence promoted as its own standalone offering.
- **Suggested change:** Remove the Strategic Research & Intelligence box from the homepage. Fold the function into Rapid AI Development & Integration as the first big step (see Design & UX and Technical sections below for related layout changes).
- **Priority:** Medium
- **Notes:** Currently appears as service `01` in `components/homepage/services-section.tsx`, `app/services/page.tsx`, and step `01` in `components/about/systematic-approach.tsx`. Would also need updates to chatbot knowledge base, footer links, and any other references across the site.

### Add GoGoPro to live clients list

- **Page / area:** Homepage — Projects We're Building / client list (`components/homepage/portfolio-section.tsx`)
- **What I noticed:** GoGoPro is not currently listed among the live clients.
- **Suggested change:** Add GoGoPro to the live clients section, including example builds and videos where appropriate.
- **Priority:** Medium
- **Notes:** Current live client projects in the portfolio section are Voluntas, Self Development Platform (Papps), and in-house Family Care. GoGoPro would need project card content — tagline, key benefits, status, media assets, etc.

### Merge Client Experiences with Projects We're Building

- **Page / area:** Homepage (`/`) — Portfolio section
- **What I noticed:** The "Client Experiences" testimonials subsection and the "Projects We're Building" subsection feel like they could be one cohesive section rather than two separate blocks within the same area.
- **Suggested change:** Merge Client Experiences into Projects We're Building — one unified section showing real projects alongside client feedback/outcomes.
- **Priority:** Medium
- **Notes:** Both live inside `components/homepage/portfolio-section.tsx` — projects grid at ~line 731, Client Experiences testimonials at ~line 766.

### Fold Strategic Research into Rapid AI Development (Services + About)

- **Page / area:** Services page (`/services`) and About page (`/about`)
- **What I noticed:** Strategic Research & Intelligence is currently its own service/step on both pages, similar to the homepage issue.
- **Suggested change:** Include Strategic Research within the Rapid AI Development & Integration step as the first big phase — research informs the build, rather than being a separate product line.
- **Priority:** Medium
- **Notes:** On Services: `app/services/page.tsx` (service `01` vs `02`). On About: `components/about/systematic-approach.tsx` (step `01` "Strategic Research" as standalone). Methodology section on Services (`components/services/methodology-section.tsx`) is also research-focused and may need rethinking if research is folded in.

---

## Design & UX

### Homepage hero text unreadable in light mode

- **Page / area:** Homepage (`/`) — hero section
- **What I noticed:** In light mode, the headline “AI Systems Your Team Can Actually Use” uses a white gradient and is nearly invisible on the pale background. The subhead “We build AI automations, internal tools, and workflows for growing companies” is too faint (`text-gray-400`). Supporting badge also uses light gray on light glass.
- **Suggested change:** Use black/near-black headline and darker subhead in light mode (`text-gray-900` / `text-gray-600` with `dark:` pairs preserved). Fix badge, glow, and secondary CTA for light theme.
- **Priority:** High
- **Status:** Fixed in code — Sam visual QA pending
- **Notes:** Component: `FIELDPORTER.COM/components/homepage/hero-section.tsx`. UX folder: [`Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/`](Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/) · [implementation-summary.md](Documentation/reviews/ux/2026-07-01-homepage-hero-light-text/implementation-summary.md)

### About page Our Process cards uneven height

- **Page / area:** About page (`/about`) — “Our Process” section
- **What I noticed:** The three process step cards are different heights; cards 01 and 02 are shorter than card 03.
- **Suggested change:** Equalize card heights on desktop so all three match the tallest (step 03).
- **Priority:** Low
- **Status:** Superseded — fixed together with AI Training cards (2026-07-28); Sam visual QA pending
- **Notes:** See combined entry below. Old folder: [`2026-07-01-about-process-card-height`](Documentation/reviews/ux/2026-07-01-about-process-card-height/)

### About page Process + AI Training cards uneven height

- **Page / area:** About page (`/about`) — “Our Process” and “AI Training & Implementation”
- **What I noticed:** Both 3-card rows have uneven heights (Process ~346/298/378px; AI Training ~422/370/318px at 1280px).
- **Suggested change:** Apply grid stretch + `h-full` flex column on wrappers and inner cards in both sections so each row matches its tallest card.
- **Priority:** Low
- **Status:** Fixed in code — Sam visual QA pending
- **Notes:** Components: `components/about/systematic-approach.tsx`, `components/about/technical-capability.tsx`. UX folder: [`Documentation/reviews/ux/2026-07-28-about-equal-card-heights/`](Documentation/reviews/ux/2026-07-28-about-equal-card-heights/) · [implementation-summary.md](Documentation/reviews/ux/2026-07-28-about-equal-card-heights/implementation-summary.md)

### Trust indicator bar spacing feels off

- **Page / area:** Homepage (`/`) — row directly under the hero headline "AI Systems Your Team Can Actually Use"
- **What I noticed:** The stats row (85% onboarding time saved, 15+ hrs weekly reclaimed, 1–3 weeks to first useful system) feels like it's floating in the middle of nowhere — too much empty space above and below it.
- **Suggested change:** Tighten vertical spacing so the bar sits more naturally between the hero and the next section. Could also reconsider whether this bar belongs here at all, or if the stats should live elsewhere (e.g. woven into the hero or a project card).
- **Priority:** Medium
- **Notes:** Component: `components/homepage/trust-indicator-bar.tsx`. Sits between `<HeroSection />` and `<AIAuditSection />` in `app/page.tsx`. Uses `section-rhythm-tight` class — may need spacing adjustment or repositioning.

### Four Things We Do tab boxes uneven size

- **Page / area:** Services page (`/services`) — “Four Things We Do” section (older copy)
- **What I noticed:** The four service selector boxes under the heading are different sizes and wrap unevenly — not aligned on a uniform grid.
- **Suggested change:** Use a CSS grid so all four boxes share equal width and height (2×2 on tablet, four-across or 2×2 on desktop).
- **Priority:** Low
- **Status:** Superseded — fix landed on nested stale `FIELDPORTER.COM/` copy only; live site now uses “What We Build” (see next item)
- **Notes:** Component was `FIELDPORTER.COM/app/services/page.tsx`. UX folder: [`Documentation/reviews/ux/2026-07-01-services-four-things-box-alignment/`](Documentation/reviews/ux/2026-07-01-services-four-things-box-alignment/)

### What We Build selector boxes uneven size

- **Page / area:** Services page (`/services`) — “What We Build” section
- **What I noticed:** The four capability text boxes (Custom Portals and Internal Tools; Databases, Dashboards and Reporting; Workflow Automation and Integrations; AI Capability and Team Enablement) are different widths and wrap unevenly instead of stacking as equal-size cells.
- **Suggested change:** Convert the tab row from content-sized flex to a CSS grid with equal cells (`grid-cols-2` / `lg:grid-cols-4`, `w-full h-full` buttons).
- **Priority:** Low
- **Status:** Implemented in code — Sam visual QA pending · [`implementation-summary.md`](Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/implementation-summary.md)
- **Notes:** Live file: `app/services/page.tsx` (`InteractiveServiceShowcase` ~L303–338). Measured on production at 1280px: ~382 / 429 / 429 / 399 px. UX folder: [`Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/`](Documentation/reviews/ux/2026-07-28-services-what-we-build-box-size/)

### How a custom build works steps feel heavy / hard to scan

- **Page / area:** Services page (`/services`) — “How a custom build works”
- **What I noticed:** Five process steps show as bordered cards; on desktop they sit in a horizontal carousel with prev/next arrows, so the full sequence is not visible at once and the section feels busier than it needs to.
- **Suggested change:** Replace the carousel + card strip with a cleaner vertical numbered list/timeline (or consolidate to fewer steps + a simple grid). Also drop double section padding if fixing in the same pass.
- **Priority:** Medium
- **Status:** Implemented in code — Sam visual QA pending · [`implementation-summary.md`](Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/implementation-summary.md)
- **Notes:** Data in `app/services/page.tsx` (`methodologyData`); UI in `components/services/methodology-section.tsx`. UX folder: [`Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/`](Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/)

### Remove blank gap above Common Questions on Services page

- **Page / area:** Services page (`/services`) — area above the "Common Questions" FAQ section
- **What I noticed:** There is a large blank gap with nothing in it between the content above and the Common Questions section.
- **Suggested change:** Remove or reduce the empty space so the FAQ section flows naturally from the content above.
- **Priority:** Medium
- **Status:** Partially addressed — nested Methodology `py-*` removed with custom-build steps cleanup; Methodology + FAQ still both use `section-rhythm-xl`. Confirm on visual QA; tighten FAQ wrapper if gap remains.
- **Notes:** Page structure in `app/services/page.tsx`: ServiceHero → InteractiveServiceShowcase → MethodologySection (wrapped in `section-rhythm-xl`) → FAQSection (also `section-rhythm-xl`). Related: [`2026-07-28-services-custom-build-steps-cleanup`](Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/)

### Big gap between Portfolio title and category tabs

- **Page / area:** Portfolio page (`/portfolio`)
- **What I noticed:** There is a large empty gap between the "Portfolio" hero title and the tab buttons below it (Client Platforms, AI Automation, Strategic Research, In-House Ventures). Chips also need to sit higher; the sticky bar’s bottom line covers content underneath when scrolling.
- **Suggested change:** Reduce the vertical space so the tabs sit closer to the hero — the title and tabs should feel like one section, not two disconnected blocks. Soften or remove the sticky chip `border-b` / opaque plate so it does not clip project content.
- **Priority:** Medium
- **Status:** Implemented in code — Sam visual QA pending · [`implementation-summary.md`](Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/implementation-summary.md)
- **Notes:** Applied Option A: content-sized hero (`pt-28 pb-8 md:pt-32 md:pb-10`), showcase `section-rhythm`, sticky `bg-white/80 dark:bg-black/80 backdrop-blur-md` (no `border-b`). Known-bug #4 Partial. UX folder: [`Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/`](Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/)

### "Stay Ahead with AI Insights" section cramped with gap above

- **Page / area:** Insights page (`/insights`) — newsletter signup at the bottom
- **What I noticed:** The "Stay Ahead with AI Insights" block feels cramped internally (content packed tight) but has a big empty gap above it, separating it awkwardly from the blog grid above.
- **Suggested change:** Reduce the top spacing above the section and give the content inside more breathing room — balance the padding so it doesn't feel squeezed in a void.
- **Priority:** Medium
- **Status:** Implemented in code — Sam visual QA pending · [`implementation-summary.md`](Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/implementation-summary.md)
- **Notes:** Applied Option A: real `p-8 md:p-12` + `space-y-6 md:space-y-8` + `space-y-3`; asymmetric section `pt-6… lg:pt-10` / solid bottom; social-proof `flex-wrap`. Copy/structure kept for v1. Known-bug #10. UX folder: [`Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/`](Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/)

---

## Mobile & responsive

<!-- Add items here -->

---

## Accessibility

<!-- Add items here -->

---

## Performance

<!-- Add items here -->

---

## SEO & metadata

<!-- Add items here -->

---

## Technical / code

### Strategic Research removal — downstream updates

- **Page / area:** Site-wide
- **What I noticed:** Removing or folding Strategic Research is not just a homepage change — it touches multiple files and systems.
- **Suggested change:** When implementing, audit and update: `components/homepage/services-section.tsx`, `app/services/page.tsx`, `components/about/systematic-approach.tsx`, `components/services/methodology-section.tsx`, footer/nav links, `lib/company-knowledge.ts`, `lib/chatbot-knowledge-base.ts`, and chat prompts in `lib/chat/prompts.ts`.
- **Priority:** Low (implementation note)
- **Notes:** Flag for Freddie so nothing is missed when the content changes go in.

---

## Other / misc

<!-- Add items here -->

---

## Summary for Freddie

_Quick bullet list of the top priorities so far:_

- **Homepage spacing:** Trust indicator stats row under the hero has too much dead space above/below — tighten or reposition.
- **Strategic Research:** Likely being retired as a standalone service — remove from homepage, fold into Rapid AI Development as step one on Services and About.
- **GoGoPro:** Add to live clients list with example builds and videos.
- **Portfolio section:** Consider merging "Client Experiences" and "Projects We're Building" into one section.
- **Services page:** “How a custom build works” cleanup implemented (vertical list) — Sam visual QA pending; FAQ gap may still need a second pass if dual `section-rhythm-xl` feels large.
- **Portfolio page:** Category tabs position + sticky clip — implemented, Sam visual QA pending ([`2026-07-28-portfolio-category-tabs-position`](Documentation/reviews/ux/2026-07-28-portfolio-category-tabs-position/)).
- **Insights page:** "Stay Ahead with AI Insights" newsletter spacing — implemented, Sam visual QA pending ([`2026-07-28-insights-newsletter-spacing`](Documentation/reviews/ux/2026-07-28-insights-newsletter-spacing/)).

---

_Last updated: July 28, 2026_
