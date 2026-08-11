# FieldPorter Website - Task Index

**Created:** June 2025  
**Status:** Homepage and services copy implemented (June 2025)  
**Purpose:** Break voice-note feedback into separate chats. Each linked doc has context, file paths, and a research prompt.

---

## Content strategy (summary)

FIELDPORTER should read as a **custom software development company** with strong AI capability, not an AI consultancy. Lead with custom portals, internal tools, databases, dashboards, workflow systems, and production software that clients and teams use daily.

AI should be framed as a capability inside these systems: secure chat over company data, document extraction, workflow triage, SOP checks, and analysis. AIOS stays secondary and should sit lower in the homepage flow.

Use one primary services hierarchy: **Custom Software Development** with supporting capabilities for portals, data/reporting, workflow automation/integrations, and AI capability/team enablement.

Persistent positioning guidance is now stored in `.cursor/rules/fieldporter-positioning.mdc`.

---

## Task documents

| # | Task | Doc | Priority |
|---|------|-----|----------|
| 1 | Homepage content overhaul | [01-homepage-content-overhaul.md](./01-homepage-content-overhaul.md) | High |
| 2 | AI chat fix (model + API) | [02-ai-chat-fix.md](./02-ai-chat-fix.md) | High |
| 3 | Services page + FAQ + research carousel | [03-services-content-overhaul.md](./03-services-content-overhaul.md) | High |
| 4 | About page (team update) | [04-about-page-update.md](./04-about-page-update.md) | Medium |
| 5 | Contact page copy | [05-contact-page-update.md](./05-contact-page-update.md) | Medium |
| 6 | Insights page refresh | [06-insights-page-update.md](./06-insights-page-update.md) | Medium |
| 7 | Portfolio updates | [07-portfolio-updates.md](./07-portfolio-updates.md) | Medium |
| 8 | Design, mobile, theme audit | [08-design-mobile-theme-overhaul.md](./08-design-mobile-theme-overhaul.md) | Medium |
| 9 | Entrance animation | [09-entrance-animation.md](./09-entrance-animation.md) | Low |
| 10 | Mobile UX overhaul (type, density, portfolio, contact) | [10-mobile-ux-overhaul-master-plan.md](./10-mobile-ux-overhaul-master-plan.md) | High |
| 12 | 20-point website launch readiness programme | [12-website-launch-readiness-master-plan.md](./12-website-launch-readiness-master-plan.md) | Critical |

Task 12 uses a persistent [progress log](./12-WEBSITE-IMPROVEMENT-LOG.md) and a [reusable fork-chat prompt](./12-REUSABLE-FORK-CHAT-PROMPT.md). Paste the same prompt into each new Cursor chat; the log selects the next task.

---

## Not a code task (Cal.com)

**Update discovery call availability in Cal.com dashboard** — booking times live in Cal.com, not in this repo. `components/booking/BookingWidget.tsx` embeds Cal.com; change slots/availability in the Cal.com admin UI.

---

## Cross-cutting concerns

These touch multiple docs - keep messaging aligned when doing any single task:

- `config/constants.ts` — hero, brand, CORE_OFFER_HIERARCHY
- `lib/chat/prompts.ts` + `lib/chatbot-knowledge-base.ts` + `lib/company-knowledge.ts` — chat must match site copy after content changes
- `lib/chat/prompts.ts` — update after services repositioning
- SEO metadata in `app/page.tsx`, `app/layout.tsx`, structured data

---

## Suggested order

1. Homepage content (sets positioning)
2. Services content (extends homepage)
3. AI chat fix (broken + must reflect new positioning)
4. About, Contact, Portfolio, Insights (page-by-page)
5. Design/mobile/theme (visual pass after copy is stable)
6. Mobile UX overhaul (Task 10 — phone density, portfolio nav, contact FAB)
7. Entrance animation (last - depends on brand direction)
