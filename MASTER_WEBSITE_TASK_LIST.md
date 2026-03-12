# FIELDPORTER Website Master Task List

Consolidated from the full website audit, code review, and follow-up strategy notes.

## Non-Negotiables

- Keep the `Insights` page, but turn it into a real content hub.
- Remove all public-facing `Client Portal` references.
- Prioritize mobile quality, clarity, trust, and conversion over decorative effects.
- Prefer sharper, more specific business language over broad AI/agency language.

## P0 Critical Fixes

- [x] Remove the `Client Portal` CTA label from the desktop header in `components/layout/header.tsx`.
- [x] Remove the `Client Portal` CTA label from the mobile header in `components/layout/header.tsx`.
- [x] Replace the old portal CTA with one real CTA label that matches the destination, likely `Book a Call` or `Start Project`.
- [x] Remove leftover client portal promises from `lib/email-service.ts`.
- [x] Remove dead `/portal` layout handling from `components/layout/conditional-layout.tsx` if the portal is fully gone.
- [x] Search for and remove remaining public-facing portal references across the site and emails.
- [x] Replace the `/insights` coming-soon page with a real insights index in `app/insights/page.tsx`.
- [x] Wire up the existing article grid from `components/insights/blog-grid.tsx` or replace it with a better live article index.
- [x] Remove stale timeline messaging from `components/insights/insights-coming-soon.tsx` if that component is retired.
- [x] Fix broken footer service anchor links in `components/layout/footer.tsx` so they match actual service ids in `app/services/page.tsx`.
- [x] Remove the conversion-killing `We're in Transition` message from `components/about/about-cta.tsx`.
- [x] Secure or remove the public `app/admin/init-knowledge/page.tsx` route.

## P1 Positioning And Offer Clarity

- [ ] Choose one primary buyer for the marketing site instead of speaking to founders, SMBs, VC firms, staffing firms, and `$2M+ ARR` companies at the same time.
- [ ] Define one clear core offer hierarchy for the site: what FIELDPORTER does first, what it also does second, and what is supporting proof.
- [ ] Standardize the main positioning line across metadata, hero sections, footer, and config constants.
- [ ] Remove brand language drift between `AI integration & automation`, `Strategic Research & Business Development`, `Strategic Research & AI Implementation`, and `Building AI-Powered Futures`.
- [ ] Clarify whether FIELDPORTER is primarily a consulting firm, a product studio, or a hybrid model, then make the whole site reflect that clearly.
- [ ] Decide whether `AIOS` is a core offer, a lead magnet, or a product and position it consistently.
- [ ] Make the first-screen value proposition say exactly what FIELDPORTER does, for whom, and what outcome it improves.
- [ ] Replace vague “cool AI” framing with a sharper business promise around workflow improvement, margin protection, speed, or decision quality.

## P1 CTA And Conversion Fixes

- [x] Standardize the main CTA language across the site instead of mixing `Client Portal`, `Start Building`, `Contact Us`, `Book a Call`, `Schedule Strategy Discussion`, `Start Project`, and `Schedule Consultation`.
- [x] Rewrite the homepage hero CTA `Start Building` to something buyer-facing and outcome-driven.
- [x] Rewrite `Let's Explore Your Options` in `components/homepage/cta-section.tsx` to something more direct and commercial.
- [x] Rewrite `Contact Us` and `View Our Work` buttons in the homepage CTA section so they feel less generic.
- [x] Rewrite the services hero CTA `Schedule Strategy Discussion` so it feels more concrete and less consultant-generic.
- [ ] Make the AIOS final CTA accurate if it links to `/contact` instead of actually starting the assessment.
- [ ] Add clearer expectation-setting on the contact page about who should book, what they get, and what happens next.
- [ ] Add basic qualification copy on the contact page: fit, minimum scope, timeline, and whether FIELDPORTER is right for them.
- [ ] Add privacy/NDA/data-handling reassurance near contact and booking flows.
- [ ] Move the strongest proof closer to the first CTA instead of making people dig deep before trusting the business.

## P1 Homepage Tasks

- [x] Rewrite the homepage hero subheadline in `components/homepage/hero-section.tsx` to be more specific and less slogan-based.
- [ ] Decide whether `Build Your Own AI Advantage` stays as the main headline or becomes a supporting line under a clearer commercial headline.
- [ ] Remove generic slogan copy like `Stop Lagging. Start Leading.` unless it is immediately backed by specific proof.
- [ ] Rewrite the four service card headlines in `components/homepage/services-section.tsx` so they sound like clear offers, not ad slogans.
- [ ] Replace filler lines like `We don't sell "AI". We sell outcomes.` with more concrete proof-led copy.
- [x] Remove the `Public Beta • Feedback Wanted` badge from `components/homepage/ai-audit-section.tsx`.
- [ ] Decide whether the AI assessment is staffing-specific or broader and align homepage copy with the AIOS page.
- [ ] Build a real mobile version of the AI readiness visual instead of hiding it behind `hidden md:block` in `components/homepage/ai-audit-section.tsx`.
- [ ] Replace the hardcoded AI readiness sample bars with a more believable sample output or interactive preview.
- [ ] Rewrite the homepage portfolio card taglines that feel junior or self-referential, especially `demonstrating full-stack capabilities`.
- [ ] Separate client proof from in-house experiments more clearly on the homepage.
- [ ] Replace the abstract trust indicator bar in `components/homepage/trust-indicator-bar.tsx` with proof-backed metrics or statements.
- [ ] Make the final homepage CTA more direct about the first step and expected outcome.

## P1 About Page Tasks

- [ ] Unify the `I` versus `we` voice across `components/about/*`.
- [ ] Clarify the founder-led operating model in one clean explanation instead of repeating it in multiple slightly different ways.
- [ ] Remove or rewrite vague claims about a `specialized network`, `expert network`, or `senior advisors` unless named proof can support them.
- [ ] Tighten `components/about/company-foundation.tsx` so it explains execution clearly without sounding inflated.
- [ ] Rewrite `components/about/systematic-approach.tsx` to focus more on business outcomes and less on tool names.
- [ ] Tighten `components/about/technical-capability.tsx` so it sounds commercially credible, not like training catalog copy.
- [ ] Reduce repetition between `AboutHero`, `CompanyFoundation`, `SystematicApproach`, and `TechnicalCapability`.
- [ ] Remove the signal that FIELDPORTER is moving away from consulting if consulting is still being sold.
- [ ] Fix the mismatch between `Explore Our Products` and the current `/portfolio` destination.

## P1 Services Page Tasks

- [ ] Rewrite the services hero in `app/services/page.tsx` so it sells one coherent offer, not several adjacent businesses.
- [ ] Align the `small and medium businesses` framing with the rest of the site’s actual target audience.
- [ ] Decide whether the services page is targeting owner-led SMBs, mid-market operators, or investor-backed businesses.
- [ ] Rewrite service descriptions to be more specific about deliverables, who each service is for, and what happens at the end.
- [ ] Replace unattributed proof blurbs like `Client saved 15+ hours weekly` with named or contextual proof.
- [ ] Add stronger proof next to performance claims like `3-5x improvement` and `production-ready systems in 1-3 weeks`.
- [ ] Simplify the interactive service showcase if it adds motion without adding clarity.
- [ ] Check mobile usability of the service selector pills and detail panels.
- [ ] Standardize spelling across `optimization` and `optimisation`.
- [ ] Review whether the methodology section is too long and tool-heavy for a sales page.
- [ ] Remove any scroll gimmicks or motion that hurts mobile battery life or scroll smoothness.

## P1 AIOS Page Tasks

- [x] Remove `secure portal` language from `app/aios/page.tsx` step 1.
- [ ] Clarify exactly what the AIOS deliverable is: report, score, roadmap, call, or all of the above.
- [ ] Add a sample report, screenshot, or example output so visitors know what they are buying or starting.
- [ ] Clarify whether AIOS is paid, free, beta, or lead qualification.
- [ ] Clarify how long AIOS takes and what the user gets immediately versus later.
- [ ] Align AIOS targeting with the homepage so it is not staffing-specific in one place and broad in another.
- [ ] Move AIOS off `fieldporter-aios.web.app` to a stronger branded domain or subdomain if it remains a core offer.
- [ ] Rewrite the final CTA if it does not actually start the assessment.

## P1 Portfolio Page Tasks

- [ ] Split client work and internal ventures more clearly in `app/portfolio/page.tsx`.
- [ ] Turn vague entries into sharper case studies with clearer before/after outcomes.
- [ ] Remove or rewrite `Multiple Strategic Engagements`.
- [ ] Remove or rewrite `MORE IN-HOUSE VENTURES COMING!`.
- [ ] Rewrite weak portfolio language like `demonstrating full-stack capabilities`.
- [ ] Make each portfolio item answer: who it was for, what problem it solved, what changed, and what proof exists.
- [ ] Reduce the sense that FIELDPORTER works across every industry under the sun.
- [ ] Re-evaluate the `Deep Domain Specialization` section if those verticals are only exploratory interests.
- [ ] Add more context to metrics so they feel believable, not floating claims.
- [ ] Check portfolio card height, floating numbers, and spacing on mobile.

## P1 Contact Page Tasks

- [ ] Rewrite the contact page hero in `app/contact/contact-page-client.tsx` so it feels like a serious buyer funnel, not a generic contact screen.
- [ ] Match booking page copy to the full FIELDPORTER offer, not just `automation needs`.
- [ ] Add a short `who this is for` section.
- [ ] Add a short `what we will cover on the call` section.
- [ ] Add a short `best fit / not a fit` section.
- [ ] Add privacy/confidentiality reassurance near the form and booking flow.
- [ ] Check the Cal embed on mobile for clipping, scroll friction, and perceived loading quality.

## P1 Insights Tasks

- [ ] Keep `Insights`, but convert it into a real article hub.
- [ ] Publish the three existing long-form articles from the main `/insights` page.
- [ ] Remove `Coming Soon` messaging from public insights surfaces.
- [ ] Update stale article dates and metadata where needed.
- [ ] Ensure article categories are consistent.
- [ ] Make `Back to Insights` in `components/insights/article-layout.tsx` return to a real content index.
- [ ] Keep newsletter signup as a secondary CTA, not the entire page.
- [ ] Review article CTA language so it promotes more reading first and consultation second.
- [ ] Verify `app/sitemap.ts` still makes sense once the insights index is fixed.

## P1 Trust And Credibility Tasks

- [ ] Pull the strongest proof points higher up the site.
- [ ] Replace abstract credibility statements with named outcomes and context.
- [ ] Improve testimonial quality by pairing each quote with a clearer project result.
- [ ] Add more proof around founder expertise without over-relying on vague `expert network` language.
- [ ] Show sample outputs where possible: reports, dashboards, AI workflows, or audit outputs.
- [ ] Make the business feel safer to buy from by explaining process, scope, and handoff more clearly.
- [ ] Consider dedicated case study pages if portfolio proof becomes a major conversion lever.

## P2 Mobile UX Tasks

- [ ] Review all key pages with mobile as the default experience, not a fallback.
- [ ] Fix the homepage AI assessment section so mobile users do not lose the core visual explanation.
- [ ] Audit card stacking, section spacing, and vertical rhythm across homepage, services, about, portfolio, and contact.
- [ ] Check tap targets in nav, footer accordion, CTA buttons, and chat controls.
- [ ] Check all floating UI elements for overlap on mobile: chat, back-to-top, nav, and sticky elements.
- [ ] Review card min-heights and overflow on mobile for portfolio and services components.
- [ ] Make sure large headings do not feel oversized or break awkwardly on small screens.
- [ ] Remove any desktop-first effects that disappear on mobile without a real replacement.
- [ ] Fix the mobile chat safe-area class mismatch in `components/chat/mobile-chat-interface.tsx`.
- [ ] Make safe-area utilities consistent with the global CSS utility names in `app/globals.css`.

## P2 Design System Tasks

- [ ] Reduce visual mud caused by stacking too many blurred backgrounds, glows, and gradient layers.
- [ ] Pick one stronger button system and standardize it across homepage, services, about, portfolio, contact, and insights.
- [ ] Make glassmorphism more restrained so the site feels premium instead of overloaded.
- [ ] Standardize spacing rhythm instead of solving page layouts one section at a time.
- [ ] Standardize card treatment, border opacity, blur depth, and hover behavior across sections.
- [ ] Standardize headline style, supporting copy style, and badge style sitewide.
- [ ] Remove self-conscious decorative effects that do not improve clarity.
- [ ] Tighten visual hierarchy so important proof and CTAs stand out more clearly.

## P2 Motion And Animation Tasks

- [ ] Remove or reduce section-level background effects when the page already has a strong global background.
- [ ] Simplify the homepage and portfolio background stacks so they do not compete with the content.
- [ ] Reduce `animate-pulse` overuse across backgrounds and decorative layers.
- [ ] Make mobile/tablet default to a lighter hero background experience in `components/homepage/hero-section.tsx`.
- [ ] Ensure reduced-motion preferences are respected consistently across hero and shell animations.
- [ ] Reduce shell-level motion stacking from page transitions, header, footer, back-to-top, and cursor effects.
- [ ] Review whether the custom cursor in `components/layout/conditional-fieldporter-extras.tsx` adds value or just adds noise.
- [ ] Speed up or remove the footer fade-in so it does not feel like blank space while scrolling.
- [ ] Make micro-interactions more purposeful and less decorative.
- [ ] Animate real explanatory elements, not just ambient backgrounds.
- [ ] Consider animating the AI readiness bars only if that improves comprehension.

## P2 Performance Tasks

- [ ] Stop globally hiding all scrollbars in `app/globals.css`.
- [ ] Review whether hidden scrollbars make chat, modals, embeds, and article content feel broken.
- [ ] Align mobile breakpoints across `useStableMobile`, `useDeviceCapability`, and visual components.
- [ ] Reduce 3D and animated hero cost on phones and tablets.
- [ ] Replace `window.location.href` navigations with `Link` or router navigation where appropriate.
- [ ] Review heavy blurred backgrounds and remove duplicates.
- [ ] Audit unused heavy visual components and delete dead code if not needed.
- [ ] Review back-to-top and chat widgets for overlap and repaint cost on mobile.
- [ ] Check Cal embed, article pages, and chat for scroll performance once scrollbar rules are fixed.

## P2 Copy Cleanup Tasks

- [ ] Remove generic agency-style phrases across the site.
- [ ] Replace filler copy with specific outcomes, deliverables, or constraints.
- [ ] Remove buzzword-heavy lines that sound broader than the actual offer.
- [ ] Replace junior-sounding phrases like `demonstrating full-stack capabilities`.
- [ ] Rewrite copy that tries to sound smart instead of useful.
- [ ] Make every main page answer the buyer’s likely next question instead of repeating brand claims.
- [ ] Standardize terminology for AI, automation, research, consulting, implementation, and products.
- [ ] Standardize British vs American spelling across public content.

## P2 About Tech Stack Tasks

- [ ] Cut the `TechStack` wall in `components/about/tech-stack.tsx` from 34 tools to a curated shortlist.
- [ ] Group the shortened tech stack around outcomes, not just tool names.
- [ ] Remove inaccurate or inflated version claims if they do not match the real codebase or matter to buyers.
- [ ] Consider replacing the long tool wall with a smaller `how we build` section plus 3-4 real examples.

## P2 Footer And Navigation Tasks

- [ ] Verify every nav item earns its place and leads to a clear destination.
- [ ] Re-evaluate whether `AIOS` is self-explanatory enough in the main nav.
- [ ] Verify footer service anchors and company links.
- [ ] Review the footer accordion max height in `components/layout/footer.tsx`.
- [ ] Replace the footer tagline `Building AI-Powered Futures` with sharper positioning if needed.
- [ ] Remove or fix any outdated or inconsistent route references in config/constants.

## P2 Technical Consistency Tasks

- [ ] Clean up stale messaging in `config/constants.ts`.
- [ ] Remove old enterprise/Fortune 500 framing if it no longer matches FIELDPORTER’s actual market.
- [ ] Audit `FOOTER_LINKS`, `FEATURES`, and related constants for dead ideas and unused routes.
- [ ] Review whether `/case-studies` or other configured resources point to non-existent pages.
- [ ] Remove stale route assumptions around `auth` and `portal` if those products are gone.
- [ ] Check metadata descriptions so they match the current public positioning.
- [ ] Review the hidden `think-global-voluntas` route and ensure it stays isolated from core brand confusion.

## P3 Small But Important Cleanup Tasks

- [ ] Replace hardcoded article dates if they are misleading.
- [ ] Verify social links in config are current and correct.
- [ ] Check for typos like `accessble` and other polish issues in portfolio copy.
- [ ] Normalize section badge styles and wording.
- [ ] Review whether the homepage trust bar should include icons or stronger wording.
- [ ] Tighten footer reveal timing and overall shell polish.
- [ ] Check whether `Services` is the right accordion label in footer on mobile or if a simpler static list is better.
- [ ] Review chat opening text so it matches the site’s sharper positioning.

## Suggested First 15 Tasks

- [x] Remove all public-facing `Client Portal` references.
- [x] Replace `/insights` with a real article index.
- [x] Remove `We're in Transition` from the About page.
- [x] Rewrite the homepage hero subheadline and CTA.
- [ ] Remove the `Public Beta` badge from the AI assessment.
- [x] Fix broken footer service anchors.
- [x] Standardize the main CTA language sitewide.
- [ ] Decide and lock the primary target audience.
- [ ] Decide and lock the main FIELDPORTER positioning line.
- [ ] Build a mobile-friendly AI assessment visual.
- [ ] Reduce the layered background and blur effects.
- [ ] Cut the About tech stack wall to a curated shortlist.
- [ ] Rewrite weak portfolio taglines and vague case entries.
- [ ] Improve contact page fit, expectation, and trust copy.
- [x] Secure or remove the public admin route.

## Notes For Execution

- Make content changes before visual polish, otherwise the site will just become a prettier version of the same unclear story.
- Fix the stale portal and insights problems before doing any larger brand/design pass.
- When rewriting copy, prefer specificity over hype.
- When redesigning, optimize for mobile first and reduce decorative motion that does not improve clarity.
