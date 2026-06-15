# Task 03: Services Page Content Overhaul

## Goal

Make `/services` support the same message as the homepage: FIELDPORTER builds custom business software, especially portals and internal systems, with AI added where it makes the product more useful.

The page should not present four unrelated services. It should present one main service with supporting capabilities.

## Current Problem

- The services page leads with AI systems and automation, not custom software.
- Strategic Research, Rapid AI Development, Workflow Automation, and AI Training are currently equal weight.
- "1-3 weeks" and "MVP in 2 weeks" make larger portal builds sound smaller than they are.
- The research methodology carousel is too prominent for the new positioning.
- FAQ copy name-drops AI tools and still says FIELDPORTER is focused on AI innovation, not long-term development.

## Primary Service

Name:

> Custom Software Development

Plain-English description:

> We build custom portals, internal tools, dashboards, databases, and workflow systems for companies that have outgrown spreadsheets, email handoffs, and generic SaaS.

Positioning:

- Best for companies with a clear operational workflow that generic tools do not fit.
- Typical projects include client portals, investor portals, admin dashboards, deal flow systems, document intake workflows, and AI-assisted review tools.
- AI is included when it improves the workflow: search, chat over company data, document extraction, scoring, triage, or compliance support.
- The client should own the system, data model, and workflow logic.

Timeline and pricing wording:

> Focused custom software projects usually start around 8-10 weeks. A tightly scoped 8-week build is often around $20K USD, with final pricing set after discovery and fixed milestones.

Do not make this sound like a guaranteed price for every project.

## Four Supporting Capabilities

Use these as the four cards on `/services` and mirror them on the homepage.

1. Custom Portals and Internal Tools
   - Role-based systems for clients, staff, admins, investors, partners, or suppliers.
   - Secure login, dashboards, permissions, forms, uploads, and status tracking.
   - Replaces scattered spreadsheets, inboxes, and generic tools.

2. Databases, Dashboards and Reporting
   - Custom data structures for the information the business actually needs.
   - Admin views, reporting screens, activity logs, and decision dashboards.
   - Sets up clean data so automation and AI can work properly.

3. Workflow Automation and Integrations
   - Automate document intake, approvals, notifications, handoffs, and repeatable admin.
   - Connect CRMs, finance tools, email, forms, storage, and existing systems.
   - Use n8n for practical automation where it fits, custom code where it needs to be owned and robust.

4. AI Capability and Team Enablement
   - Controlled AI features inside real systems, not loose chatbot demos.
   - AI chat over approved business data, document extraction, SOP checks, triage, and summaries.
   - Practical team training for using AI safely inside daily work.

Research and strategy should appear as part of discovery, scoping, and project design. It can still be sold separately when needed, but it should not lead the services page.

## Services Hero Direction

Recommended headline:

> Custom software for workflows that generic tools do not fit.

Recommended description:

> We build portals, databases, dashboards, integrations, and AI-enabled tools around the way your business actually runs. Your clients and team get one secure place to see the right information and act on it.

CTA:

> Book a Scoping Call

Secondary CTA:

> See Client Work

## Methodology Section

Replace or shrink the current research carousel.

Better structure:

1. Understand the workflow.
2. Map roles, data, and permissions.
3. Design the portal and database.
4. Build in focused milestones.
5. Test, launch, train, and hand over.

UX recommendation:

- Use a vertical step list on mobile.
- Use cards or a simple horizontal row on desktop.
- Do not auto-scroll.
- If horizontal scrolling remains, show visible controls and a visible scrollbar.

## FAQ Direction

Replace current FAQ with practical questions:

- Do you build complete systems or prototypes?
- When is custom software better than HubSpot, Airtable, Monday, or another SaaS tool?
- How long does a portal or internal system take?
- What does a typical 8-week build include?
- Can you add AI to a portal safely?
- Who owns the code and data after launch?
- Can you train our team to use the system and AI features?

Avoid:

- Tool name lists like Claude, GPT-4, DeepSeek unless the user asks.
- "AI R&D team" language.
- Saying FIELDPORTER does not do ongoing development if the new direction includes custom builds and ongoing improvements.

## Focus Areas To Mention

- Advisory, venture capital, and private capital.
- Finance, lending, and deal flow operations.
- Construction and field operations.
- Service businesses with client portals or internal operations.

Construction wording must be careful and broad:

> For construction and field teams, this can mean document intake, project records, permit visibility, SOP checks, workbook review, and AI-assisted analysis inside a secure portal.

## Files Likely To Change

```
app/services/page.tsx
components/services/service-hero.tsx
components/services/methodology-section.tsx
components/services/faq-section.tsx
components/homepage/services-section.tsx
components/homepage/portfolio-section.tsx
components/contact/working-style-section.tsx
config/constants.ts
lib/company-knowledge.ts
lib/chat/prompts.ts
```

## Acceptance Criteria

- [ ] Services page leads with Custom Software Development.
- [ ] Four cards are supporting capabilities, not separate equal services.
- [ ] Timelines are honest. No blanket 1-3 week production claims for portal builds.
- [ ] Pricing is framed as scoped range, not a guarantee.
- [ ] Research methodology is reduced or reframed as discovery and scoping.
- [ ] FAQ matches the software-first offer.
- [ ] Construction added as a broad focus area without implying a signed client.
- [ ] No em dashes in new public copy.
- [ ] Homepage services section matches.
- [ ] `npm run build` passes after implementation.
