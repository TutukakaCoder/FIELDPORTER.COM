# Task 01: Homepage Content Overhaul

## Goal

Make the homepage explain FIELDPORTER in plain English: custom portals, internal tools, databases, dashboards, automation, and AI features built around how a business actually works.

The site should read as a custom software company with strong AI capability, not an AI consultancy with vague automation language.

## Current Problem

- The hero says "AI Systems Your Team Can Actually Use", so visitors assume AI consulting first.
- AIOS appears before services, so the assessment feels like the main product.
- Services are shown as four equal offers, but most of them are really capabilities inside a custom software build.
- Strong proof exists in portfolio content, but the homepage does not lead with the real business outcome: building useful systems people log into and use daily.
- Some copy overclaims timelines, especially "1-3 weeks" and "Launch MVP in 2 weeks".

## Research Takeaways

Comparable sites that felt closer to the target message used these patterns:

- Lead with the thing being built: client portals, internal tools, admin dashboards, workflow systems, custom platforms.
- Explain why custom software beats generic SaaS: fewer unused licenses, better fit for the workflow, owned data, fewer spreadsheet and email handoffs.
- Put AI inside the product story: document review, controlled chat over company data, extraction, triage, recommendations.
- Use direct proof and plain language. Avoid "AI transformation", "McKinsey-level", "AI R&D team", and tool name dropping.
- Price and timeline should be framed as ranges tied to scope. Good wording: "Focused portals often start around 8-10 weeks. We scope fixed milestones before build starts."

Sites checked for positioning patterns:

- Escapement: custom platforms, real code, no templates.
- ScaleLabs and Greta Agency: client portals as one secure place for updates, files, approvals, and messages.
- Kwayse and QuickAutomation: internal tools, admin dashboards, workflow systems, reporting, approvals.
- Catalyst Studio and Agenteek: custom platforms with AI woven in where useful, full ownership, less generic SaaS dependency.
- PermitFlow and PermitSage: construction examples around permit management, document review, compliance, project workspaces.

## Recommended Homepage Story

1. Hero: custom portals and internal tools.
2. Proof strip: real platform outcomes, but keep any unverified numbers out of the hero.
3. Services: one main offer, Custom Software Development, with four capability cards underneath.
4. AIOS: move near the bottom as a helpful diagnostic, not a primary offer.
5. Portfolio: show proof through Voluntas, coaching platform, and relevant client work.
6. Focus areas: advisory and capital, finance and lending, construction and field operations, service businesses.
7. CTA: invite a practical scoping call, not a scored roadmap unless AIOS is the specific section.

## Hero Copy Direction

Recommended headline:

> Custom portals and internal tools, built fast.

Recommended supporting line:

> Custom Software, AI Where It Helps

Recommended subtext:

> We build the systems your clients, staff, admins, and investors log into: custom databases, dashboards, document workflows, and secure AI features connected to the right information.

Alternative headline options:

- Custom software for the way your business actually runs.
- Business portals, internal tools, and AI features built around your workflow.
- Replace messy workflows with custom software your team owns.

Avoid:

- AI Systems Your Team Can Actually Use
- Practical AI, Shipped Fast
- AI transformation
- AI R&D team
- Generic "automation consultancy" language

## Homepage Services Structure

Primary offer:

> Custom Software Development

Four capability cards:

1. Custom Portals and Internal Tools
   - Role-based portals for clients, staff, admins, investors, or partners.
   - Dashboards, forms, approvals, permissions, and activity tracking.
   - Typical fit: replacing spreadsheet/email workflows or oversized SaaS tools.

2. Databases, Dashboards and Reporting
   - Clean data models, custom databases, management screens, and reporting.
   - Make the right information visible to the right people.
   - Build the data layer needed before AI can be useful.

3. Workflow Automation and Integrations
   - Document intake, notifications, approvals, CRM replacement, API connections.
   - Reduce manual handoffs and duplicate entry.
   - Use n8n or custom code depending on the job.

4. AI Capability and Team Enablement
   - Controlled AI chat over business information.
   - Document extraction, review, triage, and recommendations inside portals.
   - Training so teams use AI safely and practically.

Research and strategy should be described as part of discovery and scoping, not a co-equal homepage service unless the page specifically sells research.

## AIOS Placement

Move AIOS lower on the homepage, ideally after services or near the final CTA.

New framing:

> Not sure what to build first? Start with an AI Readiness check.

Keep the visual if it looks good, but make it secondary. Do not let it interrupt the main "we build custom systems" message.

## Focus Areas

Update sectors to match actual and near-term work:

- Advisory, venture capital, and private capital.
- Finance, lending, and deal flow operations.
- Construction and field operations.
- Service businesses with client portals or internal operations.

Construction wording must stay broad. Do not imply a deal is signed. Safe wording:

> Construction and field teams that need document intake, project records, permit visibility, SOP checks, and AI-assisted review inside a secure workflow.

Consider removing or demoting:

- Smart Manufacturing, unless there is real proof.
- ESG Intelligence, unless there is a stronger current business reason.

## Files Likely To Change

```
config/constants.ts
app/page.tsx
components/homepage/hero-section.tsx
components/homepage/trust-indicator-bar.tsx
components/homepage/services-section.tsx
components/homepage/ai-audit-section.tsx
components/homepage/portfolio-section.tsx
components/homepage/cta-section.tsx
app/layout.tsx
components/layout/fieldporter-structured-data.tsx
lib/company-knowledge.ts
lib/chat/prompts.ts
```

## Acceptance Criteria

- [ ] Hero leads with custom portals, internal tools, and business software.
- [ ] AI is positioned as a capability inside builds, not the whole company identity.
- [ ] AIOS moved lower or demoted from the top flow.
- [ ] Services show one primary offer with four supporting capabilities.
- [ ] Construction added as a broad focus area without claiming a closed deal.
- [ ] No em dashes in new public copy.
- [ ] No unverified stats above the fold.
- [ ] Chat/company knowledge updated after final copy changes.
- [ ] `npm run build` passes after implementation.
