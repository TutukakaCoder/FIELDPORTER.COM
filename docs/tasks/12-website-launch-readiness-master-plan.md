# Task 12: Website Launch Readiness — Master Plan

**Created:** August 2026  
**Scope:** `FIELDPORTER.COM` only  
**Status source:** [`12-WEBSITE-IMPROVEMENT-LOG.md`](./12-WEBSITE-IMPROVEMENT-LOG.md)  
**Reusable execution prompt:** [`12-REUSABLE-FORK-CHAT-PROMPT.md`](./12-REUSABLE-FORK-CHAT-PROMPT.md)

## Goal

Finish the 20-point launch audit without losing context between Cursor chats. Each new chat should complete one sensible unit of work end to end, verify it, and update the log before stopping.

The target is not merely to tick 20 boxes. The finished site must:

- explain FIELDPORTER clearly as a custom software company with strong automation and AI capability;
- earn trust with accurate claims, real proof, and real people;
- turn qualified visitors into booked calls or messages;
- work well on phones, keyboards, screen readers, and slower devices;
- provide accurate search, sharing, privacy, and analytics foundations;
- avoid fake local-business signals, invented reviews, and promises operations cannot keep.

## Source Checklist Scraped From The Image

1. Custom 404 page
2. CTA above the fold
3. Internal links
4. Thank-you page
5. Breadcrumbs
6. Case studies
7. Five FAQs
8. Response-time promise
9. Sticky mobile CTA
10. `robots.txt`
11. Unique page titles
12. Meta descriptions
13. Social share image
14. Maps and directions
15. Real reviews
16. Alt text on images
17. Local schema
18. Privacy policy page
19. Google Analytics
20. Team photo

## Project Truth That Must Not Drift

- Main application: `FIELDPORTER.COM`, Next.js App Router with TypeScript.
- Positioning: custom software development first; portals, dashboards, workflow systems, integrations, and useful AI inside those systems.
- Primary conversion: `Book a Call` or a qualified message through `/contact`.
- Brand: dark, restrained glassmorphism. Clarity and speed outrank decorative effects.
- Audience: growing companies that need operational software, automation, and practical AI capability.
- Delivery truth currently used on core pages: assessments can take 2–5 days; focused portal builds are normally around 8–10 weeks. Re-check before publishing.
- FIELDPORTER is remote/worldwide with Auckland positioning. It is not a public walk-in office.
- Never fabricate addresses, testimonials, star ratings, business hours, metrics, or team images.
- Keep bundles small, mobile first, accessible, and fast.
- Do not expose secrets or copy environment values into documentation.

## Operating Rules For Every Task

1. Read this plan, the progress log, and the selected research report.
2. Treat old research as a lead, not proof. Re-check the current code before editing.
3. Select one task or one tightly coupled task group. Do not perform unrelated cleanup.
4. Use targeted sub-agents to inspect implementation, risk, and testing before coding.
5. Write a concrete implementation plan based on current evidence.
6. Resolve root causes and shared sources of truth instead of patching repeated strings.
7. Keep changes focused. Do not revive unused components unless the task requires them.
8. Test changed behavior, check lints, run type checking when relevant, and always run `npm run build`.
9. Use browser QA for visible or interactive changes at mobile and desktop sizes.
10. Update the progress log with evidence, files, checks, blockers, and the next recommended task.
11. Return one concise report: outcome, files changed, verification, and what Freddy must check.
12. Never use `&&` in shell commands.

## Dependency Order

### Phase A — Trust, legal accuracy, and measurement

Complete these first because later conversion tracking and public promises depend on them:

1. `T18` Privacy policy accuracy and consent decision
2. `T08` Response-time promise
3. `T19` Analytics and consent-controlled measurement
4. `T04` Thank-you and conversion completion flow

### Phase B — Technical launch foundations

5. `T01` Custom 404
6. `T11` Unique page titles
7. `T12` Meta descriptions
8. `T10` Robots and crawler controls
9. `T13` Social sharing metadata
10. `T17` Organization and page structured data
11. `T07` FAQ structured data and accessibility
12. `T05` Insight breadcrumbs
13. `T16` Image and media accessibility

### Phase C — Conversion journeys

14. `T03` Internal links
15. `T02` Above-fold CTAs
16. `T09` Mobile persistent CTA

### Phase D — Proof and human trust

17. `T06` Case studies
18. `T15` Real reviews
19. `T20` Real team photography

### Phase E — Applicability decision and final QA

20. `T14` Maps and directions: record as intentionally not applicable unless a public office exists.
21. Run the final cross-site QA gate.

Tasks can be grouped only when they share code and acceptance tests. Recommended groups are `T11 + T12`, `T17 + T07 + T05`, and `T06 + T15` after approved content exists.

## Research Index

Every original sub-agent report is linked here. The task sections below also consolidate the important findings so the plan remains usable if a report link is unavailable.

1. [Custom 404 research](2a384a2b-7b50-4a2b-9782-394db288c2e6)
2. [Above-fold CTA research](d95f0746-e49c-4144-a038-e959dd76c66d)
3. [Internal links research](099268bc-2f72-489a-8681-cc2751ffe648)
4. [Thank-you flow research](810954fb-d872-47b8-9ca7-df8939208181)
5. [Breadcrumb research](63086cbb-ffff-453a-983e-4554568f8c65)
6. [Case studies research](716ca94e-fa82-4e30-89e6-ae4fcf98cf67)
7. [FAQ research](92c81204-efa2-4c6d-99d7-91557da681f7)
8. [Response-time research](93042a18-5ddb-4356-a1e4-780f2b1daadc)
9. [Sticky mobile CTA research](fdfb153f-720f-4db7-8833-2c055d5fa50f)
10. [Robots research](32d927ff-f0e8-432a-b3cc-05022936f065)
11. [Page-title research](579dcd5e-388c-4384-a039-01111e89e2db)
12. [Meta-description research](3a92ec49-f7f3-4853-8c84-b71b3f31b98e)
13. [Social-share-image research](e0360940-a5a4-4367-9302-e0f4428b6bdc)
14. [Maps and directions research](13337ef8-8e54-423e-a9cd-c3570f31b631)
15. [Reviews and testimonials research](04d66932-9487-4849-ac0b-774907054d0c)
16. [Image alt-text research](30cad2a5-4966-4b78-b27b-f33d22171ace)
17. [Structured-data research](6a904f9c-be1a-4899-b85a-be6a5efc7bd7)
18. [Privacy-policy research](5730cdd6-38ec-42d9-af56-0d022ffd375f)
19. [Analytics research](eafae06f-8cb8-46b8-bccb-75c020311fae)
20. [Team-photography research](377e98d3-dd92-488d-b542-cf5bb79bc937)

## Detailed Task Plans

### T18 — Make The Privacy Policy Match Reality

**Priority:** Critical  
**Baseline:** Partial and potentially misleading  
**Research:** [Privacy-policy report](5730cdd6-38ec-42d9-af56-0d022ffd375f)

**Current evidence**

- Policy route and footer link exist.
- Policy claims a cookie banner, Google Analytics/Hotjar behavior, DeepSeek processing, and automatic retention deletion.
- Current code has no consent banner, chat uses Gemini/Firebase AI, and no retention purge job was found.
- Contact and newsletter forms do not clearly link to the privacy policy.
- Policy and code disagree about collected fields and storage behavior.

**Primary files**

- `app/privacy-policy/page.tsx`
- `app/privacy-policy/layout.tsx`
- `app/terms-of-service/page.tsx`
- `components/layout/footer.tsx`
- `components/contact/simple-contact-form.tsx`
- `components/insights/newsletter-signup.tsx`
- `app/api/contact/route.ts`
- `app/api/newsletter/route.ts`
- `app/api/chat/route.ts`
- `lib/optimized-firebase-chat-service.ts`
- `lib/firebase-analytics.ts`

**Implementation**

- Inventory every live data flow and processor from code.
- Decide whether analytics consent will be implemented now or tracking claims removed until it is.
- Rewrite policy statements to describe actual Firebase, Gemini, Cal.com, email, storage, and retention behavior.
- Remove unverified “automatic deletion”, security, audit, and compliance claims unless implemented and evidenced.
- Add concise privacy notices and policy links near contact and newsletter submissions.
- Use a real monitored inbox for privacy requests. Current interim contact is `freddy@fieldporter.com` (see log D006). Later stage: optionally add `privacy@fieldporter.com` via Cloudflare Email Routing or Microsoft 365 alias and update policy/contact copy.
- Ask legal counsel to review the final wording. Code agents must not claim legal approval.

**Done when**

- Every material policy claim maps to current code or a documented operational process.
- Forms disclose data handling and link to the policy.
- Processor names, collection fields, retention, cookies, and contact details are accurate.
- Build passes and legal review remains clearly logged if outstanding.

### T08 — Standardise The Enquiry Response Promise

**Priority:** Critical  
**Baseline:** Failing due to conflicting promises  
**Research:** [Response-time report](93042a18-5ddb-4356-a1e4-780f2b1daadc)

**Current evidence**

- Public pages, form success, portfolio, and chat say “within 24 hours”.
- Welcome email says “1–2 business days”.
- Metadata says “shortly”.
- A strict 24-hour promise includes weekends and may not be operationally safe.

**Primary files**

- `app/contact/contact-page-client.tsx`
- `components/contact/simple-contact-form.tsx`
- `components/contact/contact-methods.tsx`
- `app/portfolio/page.tsx`
- `lib/email-service.ts`
- `lib/chat/response-format.ts`
- `config/constants.ts`
- `app/contact/page.tsx`

**Implementation**

- Confirm an operationally honest target with Freddy.
- Recommended default: “We aim to reply within 1–2 business days.”
- Put the approved phrase in one shared constant.
- Replace every live and dormant conflicting phrase.
- Keep the privacy-request response period separate and clearly scoped.

**Done when**

- Website, form success, email, chat, and metadata use the same approved wording.
- No absolute promise remains accidentally.
- Search confirms old phrases are gone or intentionally scoped.

### T19 — Implement Consent-Controlled Analytics

**Priority:** Critical  
**Baseline:** Analytics scaffolding exists; browser GA is not running  
**Research:** [Analytics report](eafae06f-8cb8-46b8-bccb-75c020311fae)

**Current evidence**

- A GA measurement ID is configured, but no GA script is loaded in the root layout.
- Environment names disagree: `GA_MEASUREMENT_ID`, `GA_ID`, and old documentation aliases.
- Form calls to `window.gtag` are currently no-ops when the script is absent.
- Custom Firestore interaction tracking exists and may double-count if GA is added blindly.
- No consent UI or App Router page-view tracking exists.

**Primary files**

- `app/layout.tsx`
- `lib/env.ts`
- `lib/utils.ts`
- `lib/firebase-analytics.ts`
- `config/constants.ts`
- `types/global.d.ts`
- conversion forms and booking integration

**Implementation**

- Complete `T18` tracking/consent decision first.
- Standardise one public GA environment variable.
- Add a small client analytics component that loads only when configured and consented.
- Track App Router page views.
- Centralise event names and key conversions: contact success, qualified lead, newsletter success, and completed booking where Cal.com supports it.
- Decide whether Firestore interaction tracking stays, is reduced, or becomes the internal source while GA handles marketing attribution.
- Implement consent preferences if non-essential tracking is enabled.
- Remove unused Hotjar and stale aliases unless Hotjar is intentionally adopted.

**Done when**

- GA DebugView receives page views and approved conversion events.
- Analytics does not load before required consent.
- Event names and environment keys have one source of truth.
- Privacy wording matches implementation.
- No secret values are logged or documented.

### T04 — Add A Reliable Thank-You Flow

**Priority:** High  
**Baseline:** Partial; inline success only  
**Research:** [Thank-you report](810954fb-d872-47b8-9ca7-df8939208181)

**Current evidence**

- Contact messages remain on `/contact` and show inline success.
- No `/thank-you` route exists.
- Cal.com bookings have no site-level success redirect or conversion event.
- Event naming differs from constants.

**Primary files**

- `components/contact/simple-contact-form.tsx`
- `app/api/contact/route.ts`
- `components/booking/BookingWidget.tsx`
- `app/api/webhooks/calcom/route.ts`
- new `app/thank-you/page.tsx`

**Implementation**

- Add a branded, mobile-first, `noindex` thank-you page.
- Confirm submission, set expectations, and offer Portfolio/Insights/Home links.
- Navigate there only after a successful accepted contact request.
- Preserve an accessible inline fallback if navigation fails.
- Fire one central conversion event after success without double-counting refreshes.
- Research Cal.com’s supported success callback before adding booking handling.

**Done when**

- Successful message submission reaches a clear confirmation state.
- Refresh cannot resubmit the form.
- The conversion is measurable.
- Booking behavior is either integrated or explicitly logged as a separate follow-up.

### T01 — Add A Branded Custom 404

**Priority:** High  
**Baseline:** Missing  
**Research:** [Custom 404 report](2a384a2b-7b50-4a2b-9782-394db288c2e6)

**Current evidence**

- `app/not-found.tsx` does not exist.
- Invalid insight slugs call `notFound()` and receive Next.js default output.
- `app/error.tsx` provides an existing visual pattern.

**Implementation**

- Add `app/not-found.tsx` using the restrained error-page design.
- Explain the problem simply.
- Add Home, Services or Insights, and Contact recovery links.
- Ensure 404 output is not indexed.

**Done when**

- Unknown URLs and invalid insight slugs show the branded page.
- Keyboard, phone layout, links, and metadata are correct.

### T11 — Clean Up Unique Page Titles

**Priority:** High  
**Baseline:** Unique but many double-brand  
**Research:** [Page-title report](579dcd5e-388c-4384-a039-01111e89e2db)

**Current evidence**

- Root template is `FIELDPORTER | %s`.
- Several child titles already include FIELDPORTER, creating titles such as `FIELDPORTER | Contact Us | FIELDPORTER`.
- Services title does not fully match current custom-software-first positioning.

**Primary files**

- `app/layout.tsx`
- page and nested route metadata files
- `config/constants.ts`
- `config/insights-articles.ts`

**Implementation**

- Keep child titles segment-only so the root template adds the brand once.
- Keep Home absolute.
- Use article title only for dynamic insight metadata.
- Give private partnership metadata an intentional absolute title if brand prefix is unwanted.
- Add the 404 title with `T01`.

**Done when**

- Every indexable route has one unique, intent-matched title.
- No title repeats the brand.
- Browser output is verified, not only source strings.

### T12 — Rewrite Weak Or Incorrect Meta Descriptions

**Priority:** High  
**Baseline:** Complete coverage, partial quality  
**Research:** [Meta-description report](3a92ec49-f7f3-4853-8c84-b71b3f31b98e)

**Current evidence**

- All public routes have descriptions.
- Home/default/About are near-duplicates.
- Services claims a 1–3 week useful system while current page truth is around 8–10 weeks.
- Contact and legal descriptions are generic or use stale consulting framing.

**Implementation**

- Give each page one job and a distinct 120–160 character description.
- Correct timeline and offer claims.
- Align defaults with Home without causing duplicate page descriptions.
- Preserve strong unique article excerpts.

**Done when**

- All indexable routes have accurate, distinct descriptions.
- No unsupported timeline or outdated positioning remains.

### T10 — Harden Robots And Crawler Controls

**Priority:** High  
**Baseline:** Partial  
**Research:** [Robots report](32d927ff-f0e8-432a-b3cc-05022936f065)

**Current evidence**

- `public/robots.txt` permits production crawling but blocks `/_next/`.
- Preview/default Firebase hosts are not environment-gated.
- `/think-global-voluntas` is noindex but not disallowed.
- Search Console verification is a placeholder.

**Primary files**

- `public/robots.txt` or a replacement `app/robots.ts`
- `app/sitemap.ts`
- `app/layout.tsx`
- `firebase.json`

**Implementation**

- Prefer `app/robots.ts` if it can safely distinguish canonical production from previews.
- Do not block Next.js assets required to render pages.
- Keep `/api/` blocked and intentionally isolate private routes.
- Ensure sitemap uses the canonical production origin.
- Remove placeholder verification or replace it through the correct deployment secret/config process.

**Done when**

- Production is crawlable.
- Preview/non-canonical deployments are protected as intended.
- Render-critical assets are not blocked.
- Live robots and sitemap URLs are manually checked after deployment.

### T13 — Make Social Sharing Consistent

**Priority:** Medium  
**Baseline:** Partial  
**Research:** [Social-image report](e0360940-a5a4-4367-9302-e0f4428b6bdc)

**Current evidence**

- Dynamic 1200×630 Open Graph and Twitter images exist.
- Root and some pages point to `/opengraph-image`.
- `SEO_DEFAULTS.ogImage` points to missing `/og-image.jpg`.
- Several routes omit page-specific Twitter/OG coverage.
- All articles share one generic brand image.

**Implementation**

- Remove or correct the stale image constant.
- Create a shared metadata helper for default social images.
- Cover all important marketing routes consistently.
- Update image alt copy to current positioning.
- Add per-article images only if they remain easy to maintain and small.

**Done when**

- Home, Services, About, Portfolio, AIOS, Contact, Insights, and articles produce valid previews.
- No metadata points to missing assets.
- LinkedIn/Facebook/X preview tools confirm production output.

### T17 — Correct And Extend Structured Data

**Priority:** Medium  
**Baseline:** Partial  
**Research:** [Structured-data report](6a904f9c-be1a-4899-b85a-be6a5efc7bd7)

**Current evidence**

- Organization JSON-LD exists.
- Schema email uses `hello@` while visible contact uses `freddy@`.
- City/country are present but no real public street address exists.
- No FAQ, Article, Breadcrumb, or WebSite schemas exist.

**Implementation**

- Keep `Organization`; do not claim `LocalBusiness`.
- Pull contact identity from shared constants.
- Add truthful legal identifiers, area served, founder information, and a proper logo if available.
- Render schema in a crawler-friendly server path.
- Add page-specific schema through `T07` and `T05`; add Article schema to insights.
- Add WebSite schema only with accurate functionality; do not invent SearchAction without site search.

**Done when**

- Structured data matches visible identity and current services.
- Google Rich Results and Schema Validator show no material errors.
- No street, phone, hours, ratings, or local claims are fabricated.

### T07 — Finish FAQ Accessibility And Schema

**Priority:** Medium  
**Baseline:** Seven useful FAQs exist  
**Research:** [FAQ report](92c81204-efa2-4c6d-99d7-91557da681f7)

**Current evidence**

- Services contains seven relevant FAQs.
- No `FAQPage` JSON-LD exists.
- Closed answers may remain exposed to assistive technology.
- Motion does not fully respect reduced-motion preferences.
- Old chat knowledge FAQ copy may be stale.

**Implementation**

- Move FAQ content into one shared data source.
- Render UI and FAQ schema from that source.
- Properly hide or unmount collapsed content.
- Respect reduced motion and improve section labelling.
- Sync or retire stale chatbot FAQ entries.
- Add a clear post-FAQ CTA only if it improves the existing journey.

**Done when**

- Keyboard and screen-reader behavior is correct.
- Visible FAQ and schema cannot drift.
- Rich Results validation passes.

### T05 — Use Breadcrumbs Only Where They Help

**Priority:** Low/Medium  
**Baseline:** Component exists but is unused  
**Research:** [Breadcrumb report](63086cbb-ffff-453a-983e-4554568f8c65)

**Current evidence**

- The site is mostly flat.
- Only `/insights/[slug]` has a meaningful hierarchy.
- Existing component builds labels from URL slugs and is not mounted.
- Articles currently have “Back to Insights” only.

**Implementation**

- Do not add global breadcrumbs to flat marketing pages.
- Add explicit Home → Insights → Article items to article pages.
- Use the real article title, not transformed slug text.
- Add matching `BreadcrumbList` JSON-LD.

**Done when**

- Article breadcrumbs are accessible and correct.
- Structured data matches visible navigation.
- No unnecessary global clutter is introduced.

### T16 — Improve Image And Media Accessibility

**Priority:** Medium  
**Baseline:** Alt coverage exists; quality is uneven  
**Research:** [Alt-text report](30cad2a5-4966-4b78-b27b-f33d22171ace)

**Current evidence**

- No bare missing image alt attributes were found.
- Thinking GIF alt text duplicates nearby status text.
- Some headshot, logo, product, and gallery descriptions are generic.
- Portfolio videos need accessible naming and may need captions.

**Implementation**

- Use empty alt text for decorative/status images already explained by visible text.
- Give meaningful screenshots functional descriptions.
- Avoid repeating nearby names in headshot alt text when the photo is decorative.
- Improve video accessible names; provide captions/transcript when speech or information requires it.
- Keep CSS texture backgrounds decorative.

**Done when**

- Every image is intentionally meaningful or decorative.
- Videos have an accessible treatment.
- Lint and manual screen-reader-oriented checks pass.

### T03 — Strengthen Internal Linking

**Priority:** Medium  
**Baseline:** Partial  
**Research:** [Internal-link report](099268bc-2f72-489a-8681-cc2751ffe648)

**Current evidence**

- Main navigation covers core pages.
- Footer resource links are defined but not rendered.
- About copy mentions booking without linking to Contact.
- Homepage does not intentionally link to AIOS/Insights/About in body content.
- Insight articles have no related-article links.
- The private partnership route is intentionally isolated.

**Implementation**

- Fix About’s conversion path.
- Render an intentional footer link structure without duplicates.
- Add relevant body links, not keyword stuffing.
- Add related insight links and context-matched Services/AIOS CTAs.
- Keep the partnership route isolated.
- Remove or wire dead navigation components and constants.

**Done when**

- Every public route has a clear inbound path.
- Important pages are linked contextually.
- All internal links and service anchors work without broken destinations.

### T02 — Put The Right CTA Above The Fold

**Priority:** High  
**Baseline:** Partial  
**Research:** [Above-fold CTA report](d95f0746-e49c-4144-a038-e959dd76c66d)

**Current evidence**

- Home, Services, AIOS, Insights, and Contact have usable first-screen actions.
- About and Portfolio heroes lack conversion CTAs.
- Mobile header CTA requires opening the menu.
- Home proof line is empty.
- About’s lower CTA copy and destinations do not match.

**Implementation**

- Add a clear Contact conversion action to About and Portfolio heroes without crowding mobile.
- Fix About’s lower CTA destination.
- Add only verified proof near Home’s first CTA.
- Decide whether AIOS starts an assessment or falls back to Contact and label it honestly.
- Coordinate mobile treatment with `T09`.

**Done when**

- Every commercial landing page has one obvious first action.
- Button labels match destinations.
- First-screen phone layouts remain readable and compact.

### T09 — Add A Safe Mobile Persistent CTA

**Priority:** Medium  
**Baseline:** Missing  
**Research:** [Sticky-mobile-CTA report](fdfb153f-720f-4db7-8833-2c055d5fa50f)

**Current evidence**

- No sticky bottom conversion bar exists.
- Back-to-top occupies the lower-left area.
- Chat FAB code can occupy the lower-right if remounted.
- Contact already has a sticky top Book/Message selector.

**Implementation**

- First compare a compact mobile-header CTA with a bottom bar; choose the lower-risk option.
- If using a bottom bar, hide it on Contact, when the main CTA is visible, near the footer, and when overlays are open.
- Respect safe-area insets and preserve content bottom padding.
- Coordinate BackToTop and any chat FAB positions.
- Use lightweight CSS and existing scroll state; avoid another expensive listener.

**Done when**

- CTA never obscures content, forms, menus, cookie controls, or floating buttons.
- It is keyboard accessible and at least 44px.
- It improves the journey on Home, Services, About, Portfolio, and Insights.

### T06 — Turn Portfolio Entries Into Strong Case Studies

**Priority:** High  
**Baseline:** Partial  
**Research:** [Case-study report](716ca94e-fa82-4e30-89e6-ae4fcf98cf67)

**Current evidence**

- Case studies currently live on `/portfolio`; there are no dedicated case routes.
- VOLOCEAN has the strongest proof: visuals, walkthrough, named quote, and context.
- GoGoProp has visuals but limited outcomes.
- Other entries have uneven evidence or are internal concepts.
- Existing metadata says “Portfolio & Case Studies” without deep-linkable case stories.

**Implementation**

- Select three strongest stories only after confirming permission and evidence.
- Use a consistent structure: client context, problem, approach, delivered system, result, proof, and next-step CTA.
- Explain metric source/context; remove floating claims.
- Clearly label client work, internal ventures, demos, and concepts.
- Centralise portfolio data to avoid Homepage/Portfolio/chat drift.
- Create `/portfolio/[slug]` pages only after content depth justifies them.
- Use “Discuss a similar build” conversion links with project context.

**Done when**

- At least three credible stories answer what changed and how it is known.
- Claims have approved attribution or honest anonymisation.
- Mobile media is optimised and accessible.
- New routes, if added, have metadata, sitemap, social image, schema, and links.

### T15 — Publish Only Real, Consented Reviews

**Priority:** High  
**Baseline:** Partial  
**Research:** [Review report](04d66932-9487-4849-ac0b-774907054d0c)

**Current evidence**

- Jason Holdsworth has the strongest named testimonial and a photo.
- Steve is first-name-only and accompanied by five stars without a third-party source.
- No Google, Clutch, Trustpilot, or similar source is integrated.
- No consent/source data model or Review schema exists.

**Implementation**

- Obtain written permission for exact quote, name, role, company, image, and optional profile link.
- Store consent records privately outside git.
- Remove star graphics unless tied to a real rating source.
- Centralise approved testimonials and link each to a relevant case study.
- Add Review schema only for real, consented reviews; do not add AggregateRating without a genuine source and calculation.
- Remove unused profile images if permission is absent.

**Done when**

- Every public quote has a documented source and permission.
- Attribution is honest and useful.
- No visual or schema rating is invented.

### T20 — Add Real Team Photography

**Priority:** High for trust; blocked on assets  
**Baseline:** Missing  
**Research:** [Team-photo report](377e98d3-dd92-488d-b542-cf5bb79bc937)

**Current evidence**

- About leadership cards show initials for Freddy Hopkins and Sam Allais.
- No founder/team photographs exist in `public/`.
- Structured data names Freddy but not Sam.

**Required external input**

- Real approved headshots or one real team photograph.
- Correct names, roles, short bios, and optional LinkedIn URLs.

**Implementation**

- Prepare square, compressed WebP/JPEG images at sensible dimensions and file size.
- Extend leadership data with image, role, bio, and optional link.
- Use `next/image` and intentional alt treatment.
- Update founder structured data only with approved facts.
- Do not use AI-generated faces or stock team imagery.

**Done when**

- About shows real, approved team imagery.
- Assets remain small and sharp on mobile/desktop.
- Names, roles, bios, visible copy, and schema agree.

### T14 — Record Maps And Directions As Not Applicable

**Priority:** No implementation  
**Baseline:** Correctly absent  
**Research:** [Maps report](13337ef8-8e54-423e-a9cd-c3570f31b631)

**Decision**

- FIELDPORTER is remote and does not advertise a public walk-in office.
- Keep “Auckland • Worldwide” if useful.
- Do not add a map, directions, fake address, geo coordinates, opening hours, or LocalBusiness schema.
- Reopen this task only if a genuine public customer location and Google Business Profile are established.

**Done when**

- The log records the task as `Not applicable — intentional`.
- Contact, policy, footer, and schema remain consistent with remote operation.

## External Inputs Freddy May Need To Supply

- Confirm the truthful enquiry response target.
- Confirm analytics consent approach and desired marketing tools.
- Privacy contact interim: `freddy@fieldporter.com` (D006). Later: create `privacy@fieldporter.com` forwarding if desired, then update policy and any schema/contact fields.
- Arrange legal review of Privacy Policy and Terms.
- Supply approved team photographs, roles, bios, and links.
- Obtain testimonial publication consent and source details.
- Confirm case-study permissions and metric evidence.
- Replace Search Console verification through the correct deployment process.

The execution chat must make all safe code progress first, then log only genuine external blockers. It must not invent missing business facts to finish a checkbox.

## Final Cross-Site QA Gate

Do not mark the programme complete until all applicable tasks pass:

- `npm run type-check`
- `npm run build`
- IDE lint check on changed files
- Mobile browser QA around 375px
- Desktop browser QA around 1440px
- Keyboard-only navigation
- Reduced-motion behavior
- Contact message success and thank-you flow
- Booking flow smoke test
- 404 and invalid insight slug
- No broken navigation, footer, related, breadcrumb, or CTA links
- Valid page titles, descriptions, canonicals, OG/Twitter previews
- Live `robots.txt` and sitemap after deployment
- Structured-data validation
- Consent behavior before and after preference selection
- GA DebugView conversion verification
- Privacy policy matches actual network/storage behavior
- Real reviews and team assets have approval
- Lighthouse or equivalent check for major accessibility/performance regressions

## Programme Completion Definition

The programme is complete only when:

- every task is `Complete`, `Not applicable`, or `Blocked externally` with a named owner;
- all applicable acceptance criteria are evidenced in the log;
- no Critical or High code task remains;
- build passes on the final state;
- final mobile and desktop browser QA passes;
- remaining manual deployment/legal/content checks are clearly handed to Freddy.
