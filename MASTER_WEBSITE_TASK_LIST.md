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

- [x] Choose one primary buyer for the marketing site instead of speaking to founders, SMBs, VC firms, staffing firms, and `$2M+ ARR` companies at the same time.
- [x] Define one clear core offer hierarchy for the site: what FIELDPORTER does first, what it also does second, and what is supporting proof.
- [x] Standardize the main positioning line across metadata, hero sections, footer, and config constants.
- [x] Remove brand language drift between `AI integration & automation`, `Strategic Research & Business Development`, `Strategic Research & AI Implementation`, and `Building AI-Powered Futures`.
- [x] Clarify whether FIELDPORTER is primarily a consulting firm, a product studio, or a hybrid model, then make the whole site reflect that clearly.
- [x] Decide whether `AIOS` is a core offer, a lead magnet, or a product and position it consistently.
- [x] Make the first-screen value proposition say exactly what FIELDPORTER does, for whom, and what outcome it improves.
- [x] Replace vague “cool AI” framing with a sharper business promise around workflow improvement, margin protection, speed, or decision quality.

## P1 CTA And Conversion Fixes

- [x] Standardize the main CTA language across the site instead of mixing `Client Portal`, `Start Building`, `Contact Us`, `Book a Call`, `Schedule Strategy Discussion`, `Start Project`, and `Schedule Consultation`.
- [x] Rewrite the homepage hero CTA `Start Building` to something buyer-facing and outcome-driven.
- [x] Rewrite `Let's Explore Your Options` in `components/homepage/cta-section.tsx` to something more direct and commercial.
- [x] Rewrite `Contact Us` and `View Our Work` buttons in the homepage CTA section so they feel less generic.
- [x] Rewrite the services hero CTA `Schedule Strategy Discussion` so it feels more concrete and less consultant-generic.
- [x] Make the AIOS final CTA accurate if it links to `/contact` instead of actually starting the assessment.
- [x] Add clearer expectation-setting on the contact page about who should book, what they get, and what happens next.
- [x] Add basic qualification copy on the contact page: fit, minimum scope, timeline, and whether FIELDPORTER is right for them.
- [x] Add privacy/NDA/data-handling reassurance near contact and booking flows.
- [x] Move the strongest proof closer to the first CTA instead of making people dig deep before trusting the business.

## P1 Homepage Tasks

- [x] Rewrite the homepage hero subheadline in `components/homepage/hero-section.tsx` to be more specific and less slogan-based.
- [x] Decide whether `Build Your Own AI Advantage` stays as the main headline or becomes a supporting line under a clearer commercial headline.
- [x] Remove generic slogan copy like `Stop Lagging. Start Leading.` unless it is immediately backed by specific proof.
- [x] Rewrite the four service card headlines in `components/homepage/services-section.tsx` so they sound like clear offers, not ad slogans.
- [x] Replace filler lines like `We don't sell "AI". We sell outcomes.` with more concrete proof-led copy.
- [x] Remove the `Public Beta • Feedback Wanted` badge from `components/homepage/ai-audit-section.tsx`.
- [x] Decide whether the AI assessment is staffing-specific or broader and align homepage copy with the AIOS page.
- [x] Build a real mobile version of the AI readiness visual instead of hiding it behind `hidden md:block` in `components/homepage/ai-audit-section.tsx`.
- [x] Replace the hardcoded AI readiness sample bars with a more believable sample output or interactive preview.
- [x] Rewrite the homepage portfolio card taglines that feel junior or self-referential, especially `demonstrating full-stack capabilities`.
- [x] Separate client proof from in-house experiments more clearly on the homepage.
- [x] Replace the abstract trust indicator bar in `components/homepage/trust-indicator-bar.tsx` with proof-backed metrics or statements.
- [x] Make the final homepage CTA more direct about the first step and expected outcome.

## P1 About Page Tasks

- [x] Unify the `I` versus `we` voice across `components/about/*`.
- [x] Clarify the founder-led operating model in one clean explanation instead of repeating it in multiple slightly different ways.
- [x] Remove or rewrite vague claims about a `specialized network`, `expert network`, or `senior advisors` unless named proof can support them.
- [x] Tighten `components/about/company-foundation.tsx` so it explains execution clearly without sounding inflated.
- [x] Rewrite `components/about/systematic-approach.tsx` to focus more on business outcomes and less on tool names.
- [x] Tighten `components/about/technical-capability.tsx` so it sounds commercially credible, not like training catalog copy.
- [x] Reduce repetition between `AboutHero`, `CompanyFoundation`, `SystematicApproach`, and `TechnicalCapability`.
- [x] Remove the signal that FIELDPORTER is moving away from consulting if consulting is still being sold.
- [x] Fix the mismatch between `Explore Our Products` and the current `/portfolio` destination.

## P1 Services Page Tasks

- [x] Rewrite the services hero in `app/services/page.tsx` so it sells one coherent offer, not several adjacent businesses.
- [x] Align the `small and medium businesses` framing with the rest of the site’s actual target audience.
- [x] Decide whether the services page is targeting owner-led SMBs, mid-market operators, or investor-backed businesses.
- [x] Rewrite service descriptions to be more specific about deliverables, who each service is for, and what happens at the end.
- [x] Replace unattributed proof blurbs like `Client saved 15+ hours weekly` with named or contextual proof.
- [x] Add stronger proof next to performance claims like `3-5x improvement` and `production-ready systems in 1-3 weeks`.
- [x] Simplify the interactive service showcase if it adds motion without adding clarity.
- [x] Check mobile usability of the service selector pills and detail panels.
- [x] Standardize spelling across `optimization` and `optimisation`.
- [x] Review whether the methodology section is too long and tool-heavy for a sales page.
- [x] Remove any scroll gimmicks or motion that hurts mobile battery life or scroll smoothness.

## P1 AIOS Page Tasks

- [x] Remove `secure portal` language from `app/aios/page.tsx` step 1.
- [x] Clarify exactly what the AIOS deliverable is: report, score, roadmap, call, or all of the above.
- [x] Add a sample report, screenshot, or example output so visitors know what they are buying or starting.
- [x] Clarify whether AIOS is paid, free, beta, or lead qualification.
- [x] Clarify how long AIOS takes and what the user gets immediately versus later.
- [x] Align AIOS targeting with the homepage so it is not staffing-specific in one place and broad in another.
- [x] Move AIOS off `fieldporter-aios.web.app` to a stronger branded domain or subdomain if it remains a core offer.
- [x] Rewrite the final CTA if it does not actually start the assessment.

## P1 Portfolio Page Tasks

- [x] Split client work and internal ventures more clearly in `app/portfolio/page.tsx`.
- [x] Turn vague entries into sharper case studies with clearer before/after outcomes.
- [x] Remove or rewrite `Multiple Strategic Engagements`.
- [x] Remove or rewrite `MORE IN-HOUSE VENTURES COMING!`.
- [x] Rewrite weak portfolio language like `demonstrating full-stack capabilities`.
- [x] Make each portfolio item answer: who it was for, what problem it solved, what changed, and what proof exists.
- [x] Reduce the sense that FIELDPORTER works across every industry under the sun.
- [x] Re-evaluate the `Deep Domain Specialization` section if those verticals are only exploratory interests.
- [x] Add more context to metrics so they feel believable, not floating claims.
- [x] Check portfolio card height, floating numbers, and spacing on mobile.

## P1 Contact Page Tasks

- [x] Rewrite the contact page hero in `app/contact/contact-page-client.tsx` so it feels like a serious buyer funnel, not a generic contact screen.
- [x] Match booking page copy to the full FIELDPORTER offer, not just `automation needs`.
- [x] Add a short `who this is for` section.
- [x] Add a short `what we will cover on the call` section.
- [x] Add a short `best fit / not a fit` section.
- [x] Add privacy/confidentiality reassurance near the form and booking flow.
- [x] Check the Cal embed on mobile for clipping, scroll friction, and perceived loading quality.

## P1 Insights Tasks

- [x] Keep `Insights`, but convert it into a real article hub.
- [x] Publish the three existing long-form articles from the main `/insights` page.
- [x] Remove `Coming Soon` messaging from public insights surfaces.
- [x] Update stale article dates and metadata where needed.
- [x] Ensure article categories are consistent.
- [x] Make `Back to Insights` in `components/insights/article-layout.tsx` return to a real content index.
- [x] Keep newsletter signup as a secondary CTA, not the entire page.
- [x] Review article CTA language so it promotes more reading first and consultation second.
- [x] Verify `app/sitemap.ts` still makes sense once the insights index is fixed.

## P1 Trust And Credibility Tasks

- [x] Pull the strongest proof points higher up the site.
- [x] Replace abstract credibility statements with named outcomes and context.
- [x] Improve testimonial quality by pairing each quote with a clearer project result.
- [x] Add more proof around founder expertise without over-relying on vague `expert network` language.
- [x] Show sample outputs where possible: reports, dashboards, AI workflows, or audit outputs.
- [x] Make the business feel safer to buy from by explaining process, scope, and handoff more clearly.
- [x] Consider dedicated case study pages if portfolio proof becomes a major conversion lever.

## P2 Mobile UX Tasks

- [x] Review all key pages with mobile as the default experience, not a fallback.
- [x] Fix the homepage AI assessment section so mobile users do not lose the core visual explanation.
- [x] Audit card stacking, section spacing, and vertical rhythm across homepage, services, about, portfolio, and contact.
- [x] Check tap targets in nav, footer accordion, CTA buttons, and chat controls.
- [x] Check all floating UI elements for overlap on mobile: chat, back-to-top, nav, and sticky elements.
- [x] Review card min-heights and overflow on mobile for portfolio and services components.
- [x] Make sure large headings do not feel oversized or break awkwardly on small screens.
- [x] Remove any desktop-first effects that disappear on mobile without a real replacement.
- [x] Fix the mobile chat safe-area class mismatch in `components/chat/mobile-chat-interface.tsx`.
- [x] Make safe-area utilities consistent with the global CSS utility names in `app/globals.css`.

## P2 Design System Tasks

- [x] Reduce visual mud caused by stacking too many blurred backgrounds, glows, and gradient layers.
- [x] Pick one stronger button system and standardize it across homepage, services, about, portfolio, contact, and insights.
- [x] Make glassmorphism more restrained so the site feels premium instead of overloaded.
- [x] Standardize spacing rhythm instead of solving page layouts one section at a time.
- [x] Standardize card treatment, border opacity, blur depth, and hover behavior across sections.
- [x] Standardize headline style, supporting copy style, and badge style sitewide.
- [x] Remove self-conscious decorative effects that do not improve clarity.
- [x] Tighten visual hierarchy so important proof and CTAs stand out more clearly.

## P2 Motion And Animation Tasks

- [x] Remove or reduce section-level background effects when the page already has a strong global background.
- [x] Simplify the homepage and portfolio background stacks so they do not compete with the content.
- [x] Reduce `animate-pulse` overuse across backgrounds and decorative layers.
- [x] Make mobile/tablet default to a lighter hero background experience in `components/homepage/hero-section.tsx`.
- [x] Ensure reduced-motion preferences are respected consistently across hero and shell animations.
- [x] Reduce shell-level motion stacking from page transitions, header, footer, back-to-top, and cursor effects.
- [x] Review whether the custom cursor in `components/layout/conditional-fieldporter-extras.tsx` adds value or just adds noise.
- [x] Speed up or remove the footer fade-in so it does not feel like blank space while scrolling.
- [x] Make micro-interactions more purposeful and less decorative.
- [x] Animate real explanatory elements, not just ambient backgrounds.
- [x] Consider animating the AI readiness bars only if that improves comprehension.

## P2 Performance Tasks

- [x] Stop globally hiding all scrollbars in `app/globals.css`.
- [x] Review whether hidden scrollbars make chat, modals, embeds, and article content feel broken.
- [x] Align mobile breakpoints across `useStableMobile`, `useDeviceCapability`, and visual components.
- [x] Reduce 3D and animated hero cost on phones and tablets.
- [x] Replace `window.location.href` navigations with `Link` or router navigation where appropriate.
- [x] Review heavy blurred backgrounds and remove duplicates.
- [x] Audit unused heavy visual components and delete dead code if not needed.
- [x] Review back-to-top and chat widgets for overlap and repaint cost on mobile.
- [x] Check Cal embed, article pages, and chat for scroll performance once scrollbar rules are fixed.

## P2 Copy Cleanup Tasks

- [x] Remove generic agency-style phrases across the site.
- [x] Replace filler copy with specific outcomes, deliverables, or constraints.
- [x] Remove buzzword-heavy lines that sound broader than the actual offer.
- [x] Replace junior-sounding phrases like `demonstrating full-stack capabilities`.
- [x] Rewrite copy that tries to sound smart instead of useful.
- [x] Make every main page answer the buyer’s likely next question instead of repeating brand claims.
- [x] Standardize terminology for AI, automation, research, consulting, implementation, and products.
- [x] Standardize British vs American spelling across public content.

## P2 About Tech Stack Tasks

- [x] Cut the `TechStack` wall in `components/about/tech-stack.tsx` from 34 tools to a curated shortlist.
- [x] Group the shortened tech stack around outcomes, not just tool names.
- [x] Remove inaccurate or inflated version claims if they do not match the real codebase or matter to buyers.
- [x] Consider replacing the long tool wall with a smaller `how we build` section plus 3-4 real examples.

## P2 Footer And Navigation Tasks

- [x] Verify every nav item earns its place and leads to a clear destination.
- [x] Re-evaluate whether `AIOS` is self-explanatory enough in the main nav.
- [x] Verify footer service anchors and company links.
- [x] Review the footer accordion max height in `components/layout/footer.tsx`.
- [x] Replace the footer tagline `Building AI-Powered Futures` with sharper positioning if needed.
- [x] Remove or fix any outdated or inconsistent route references in config/constants.

## P2 Technical Consistency Tasks

- [x] Clean up stale messaging in `config/constants.ts`.
- [x] Remove old enterprise/Fortune 500 framing if it no longer matches FIELDPORTER’s actual market.
- [x] Audit `FOOTER_LINKS`, `FEATURES`, and related constants for dead ideas and unused routes.
- [x] Review whether `/case-studies` or other configured resources point to non-existent pages.
- [x] Remove stale route assumptions around `auth` and `portal` if those products are gone.
- [x] Check metadata descriptions so they match the current public positioning.
- [x] Review the hidden `think-global-voluntas` route and ensure it stays isolated from core brand confusion.

## P3 Small But Important Cleanup Tasks

- [x] Replace hardcoded article dates if they are misleading.
- [x] Verify social links in config are current and correct.
- [x] Check for typos like `accessble` and other polish issues in portfolio copy.
- [x] Normalize section badge styles and wording.
- [x] Review whether the homepage trust bar should include icons or stronger wording.
- [x] Tighten footer reveal timing and overall shell polish.
- [x] Check whether `Services` is the right accordion label in footer on mobile or if a simpler static list is better.
- [x] Review chat opening text so it matches the site’s sharper positioning.

## Suggested First 15 Tasks

- [x] Remove all public-facing `Client Portal` references.
- [x] Replace `/insights` with a real article index.
- [x] Remove `We're in Transition` from the About page.
- [x] Rewrite the homepage hero subheadline and CTA.
- [x] Remove the `Public Beta` badge from the AI assessment.
- [x] Fix broken footer service anchors.
- [x] Standardize the main CTA language sitewide.
- [x] Decide and lock the primary target audience.
- [x] Decide and lock the main FIELDPORTER positioning line.
- [x] Build a mobile-friendly AI assessment visual.
- [x] Reduce the layered background and blur effects.
- [x] Cut the About tech stack wall to a curated shortlist.
- [x] Rewrite weak portfolio taglines and vague case entries.
- [x] Improve contact page fit, expectation, and trust copy.
- [x] Secure or remove the public admin route.

## Notes For Execution

- Make content changes before visual polish, otherwise the site will just become a prettier version of the same unclear story.
- Fix the stale portal and insights problems before doing any larger brand/design pass.
- When rewriting copy, prefer specificity over hype.
- When redesigning, optimize for mobile first and reduce decorative motion that does not improve clarity.
