# FIELDPORTER Website Improvement Log

**Created:** August 2026  
**Master plan:** [`12-website-launch-readiness-master-plan.md`](./12-website-launch-readiness-master-plan.md)  
**Reusable prompt:** [`12-REUSABLE-FORK-CHAT-PROMPT.md`](./12-REUSABLE-FORK-CHAT-PROMPT.md)

## Purpose

This file is the source of truth between forked Cursor chats. Every execution chat must read it before selecting work and update it after verification.

Do not erase old entries. Correct mistakes with a new dated note so decisions remain traceable.

## Status Rules

- `Ready` — can be started now.
- `Waiting` — depends on another task.
- `In progress` — a chat is currently working on it.
- `Blocked externally` — needs legal approval, content, credentials, or another user action.
- `Complete` — code/content and required verification passed.
- `Not applicable` — intentionally excluded with a documented reason.
- `Needs follow-up` — first implementation landed but acceptance criteria are incomplete.

Only mark a task `Complete` when its master-plan acceptance criteria and build verification pass. A research report alone is not completion.

## Current Programme State

**Overall status:** Phase C conversion complete; remaining work is consent (B002→T19/T04) or external proof  
**Last updated:** 2026-08-11  
**Last completed task:** `T09 — Mobile persistent CTA`  
**Current task:** None  
**Recommended next task:** `T19 — Analytics` after Freddy decides B002 (else T06/T15/T20 when proof arrives)  
**Known baseline build:** `npm run build` passed 2026-08-11 after T09 (RUN-013)  
**Production deployment:** Outside this programme unless Freddy explicitly requests it

## Task Queue

- [x] `T18` — Privacy policy accuracy and consent decision — **Complete / Critical**
- [x] `T08` — Response-time promise — **Complete / Critical**
- [ ] `T19` — Analytics and measurement — **Waiting for B002 consent decision / Critical**
- [ ] `T04` — Thank-you conversion flow — **Waiting for T19 event design / High**
- [x] `T01` — Custom 404 — **Complete / High**
- [x] `T11` — Unique page titles — **Complete / High**
- [x] `T12` — Meta descriptions — **Complete / High**
- [x] `T10` — Robots and crawler controls — **Complete / High**
- [x] `T13` — Social sharing metadata — **Complete / Medium**
- [x] `T17` — Organization and page schema — **Complete / Medium**
- [x] `T07` — FAQ schema and accessibility — **Complete / Medium**
- [x] `T05` — Insight breadcrumbs — **Complete / Low/Medium**
- [x] `T16` — Image and media accessibility — **Complete / Medium**
- [x] `T03` — Internal links — **Complete / Medium**
- [x] `T02` — Above-fold CTAs — **Complete / High**
- [x] `T09` — Mobile persistent CTA — **Complete / Medium**
- [ ] `T06` — Case studies — **Blocked externally on proof/permission / High**
- [ ] `T15` — Real reviews — **Blocked externally on consent / High**
- [ ] `T20` — Team photography — **Blocked externally on real assets / High**
- [x] `T14` — Maps and directions — **Not applicable / intentional**
- [ ] `QA` — Final cross-site verification — **Waiting for applicable tasks**

## Decisions Already Locked

### D001 — No Map Or LocalBusiness Claim

**Date:** August 2026  
**Related tasks:** `T14`, `T17`  
**Decision:** FIELDPORTER is presented as Auckland-based and remote/worldwide. Do not add a customer map, directions, fake street address, opening hours, or LocalBusiness schema unless a real public office is established.  
**Evidence:** [Maps research](13337ef8-8e54-423e-a9cd-c3570f31b631), [structured-data research](6a904f9c-be1a-4899-b85a-be6a5efc7bd7)

### D002 — Organization Is The Primary Schema Type

**Date:** August 2026  
**Related task:** `T17`  
**Decision:** Keep `Organization` as the primary company schema. Add page-level schemas only when their visible content and data support them.

### D003 — Real Proof Only

**Date:** August 2026  
**Related tasks:** `T06`, `T15`, `T20`  
**Decision:** Do not invent reviews, stars, metrics, names, addresses, team photographs, or permissions. Use approved evidence or log the external blocker.

### D004 — One Task Per Forked Chat

**Date:** August 2026  
**Decision:** A forked execution chat selects one highest-priority ready task or one tightly coupled group named in the master plan. It completes implementation, verification, and logging before stopping.

### D005 — Privacy Claims Match Live Processors; No GA Until Consent

**Date:** 2026-08-11  
**Related tasks:** `T18`, `T19`  
**Decision:** Until Freddy confirms B002 and T19 ships, the privacy policy must describe live processors only (Firebase/Firestore, Resend, Cal.com), disclose first-party Firestore interaction logging, state that GA/Hotjar/marketing cookies and a consent banner are not currently used, and state that on-site chat is not active. Do not claim DeepSeek, automatic retention purge, unverified MFA/audits/uptime, or GDPR certification. T19 may add GA4 only with a matching consent control and policy update.  
**Evidence:** Code audit in RUN-001; research agents [T18 code audit](094dc0e7-ef54-4c5c-a73e-bf640f783a42), [T18 risk](e143177a-f78c-461a-8b65-a57186976f9b)

### D006 — Privacy Contact Uses freddy@ Until Dedicated Inbox Exists

**Date:** 2026-08-11  
**Related tasks:** `T18`, `T17`, later ops  
**Decision:** Public privacy-request contact is `freddy@fieldporter.com` because `privacy@fieldporter.com` is not set up. Do not advertise `privacy@` until a real mailbox or Cloudflare/Microsoft forward exists. Later stage: optionally create `privacy@fieldporter.com` forwarding, then update Privacy Policy, any Organization schema email fields, and related copy.  
**Evidence:** Freddy confirmed no privacy mailbox on 2026-08-11.

### D007 — Enquiry Reply Promise Is Soft 1–2 Business Days

**Date:** 2026-08-11  
**Related tasks:** `T08`  
**Decision:** Public enquiry wording is locked to `ENQUIRY_RESPONSE` in `config/constants.ts`: “We aim to reply within 1–2 business days.” Soft “aim to” only — not a hard SLA. Privacy-request timing stays separate at 5 business days. Change the constant if ops capacity changes; do not hardcode conflicting phrases again.  
**Evidence:** Welcome email already used 1–2 business days; absolute 24-hour claims conflicted. Research [Response-time report](93042a18-5ddb-4356-a1e4-780f2b1daadc); agents [T08 code audit](db2a57b7-c285-4df3-8f3e-361b8133ef49), [T08 risk/QA](92d86044-a3e9-40f5-b76c-fe132a60542c).

### D008 — Canonical Hosts Own Crawl Permission

**Date:** 2026-08-11  
**Related task:** `T10`  
**Decision:** Only `fieldporter.com` and `www.fieldporter.com` may allow crawling. Localhost, Firebase preview, and `*.web.app` / `*.firebaseapp.com` must serve `Disallow: /` and `X-Robots-Tag: noindex, nofollow`. Never `Disallow: /_next/`. Keep `/api/` and `/think-global-voluntas/` disallowed on production. Sitemap and robots Sitemap line always use `SITE_ORIGIN` (`https://fieldporter.com`). Google Search Console HTML verification is omitted until `GOOGLE_SITE_VERIFICATION` is set at deploy (B008).  
**Evidence:** Agents [T10 code audit](ba9e3023-410f-4f22-a275-9fd09c5a458e), [T10 SEO risk](3fab5752-c325-4305-b686-c7fc2e2057f4), [T10 QA plan](c3a76542-3a17-4aa2-84fd-2124c228db74); original [Robots report](32d927ff-f0e8-432a-b3cc-05022936f065).

### D009 — Social Previews Use Dynamic Open Graph Only

**Date:** 2026-08-11  
**Related task:** `T13`  
**Decision:** Canonical share image is `/opengraph-image` (and `/twitter-image` re-export), resolved via `metadataBase` / `SITE_ORIGIN`. Do not reference missing `/og-image.jpg`. Marketing routes use shared `pageSocial()` from `lib/social-metadata.ts`. Skip per-article OG generators for now. Never set `twitter.creator` — FIELDPORTER has no X/Twitter account (B009/D011). Partnership keeps empty social images + noindex. Privacy/Terms stay `summary` without forcing large-card images.  
**Evidence:** Agents [T13 code audit](7c796f48-d886-4d53-806d-7bdd9d28da88), [T13 risk](72189cc7-ad3e-4baf-a9bd-b6a5ce009804), [T13 QA](badbfb67-bfd7-45cd-8e78-94e885e0b35b); original [Social-image report](e0360940-a5a4-4367-9302-e0f4428b6bdc).

### D010 — Truthful Schema Graph; Crawler-Visible Mount

**Date:** 2026-08-11  
**Related tasks:** `T17`, `T07`, `T05`  
**Decision:** Ship `Organization` + `WebSite` sitewide from `FieldporterStructuredData` mounted outside `EntranceProvider`. Email/`contactPoint` use `BRAND.email` (`freddy@`). Logo is `/favicon-dark-512.png`. `sameAs` is LinkedIn + GitHub only (no Twitter — D011). No `LocalBusiness`, street, phone, hours, ratings, or `SearchAction`. FAQPage only on `/services` from `config/services-faqs.ts`. BreadcrumbList + Article only on `/insights/[slug]` with visible Home → Insights → title crumbs. Entrance provider must always SSR children so body JSON-LD reaches crawlers.  
**Evidence:** Agents [T17 code audit](c4354ea7-fdfe-46c3-a4df-51d4e71cef6d), [T17 risk](c18a9a1a-5538-47b2-a55e-3c16c1cc779a), [T17 QA](1e5dfb0a-7429-4008-b9a0-acf394900b3d); original [Structured-data report](6a904f9c-be1a-4899-b85a-be6a5efc7bd7).

### D011 — No X/Twitter Account

**Date:** 2026-08-11  
**Related tasks:** `T13`, `T17`, B009  
**Decision:** FIELDPORTER has no public X/Twitter account. Do not set `twitter.creator`, do not put Twitter in `SOCIAL_LINKS` or Organization `sameAs`. Keep Open Graph `twitter:` card tags for share-preview cards only (platform metadata, not a profile claim). Article “share on X” intent links for visitors are optional and do not imply an owned handle.  
**Evidence:** Freddy confirmed 2026-08-11.

### D012 — Media Alt And Video Accessibility Rules

**Date:** 2026-08-11  
**Related task:** `T16`  
**Decision:** Decorative/status images explained by nearby text use `alt=""` (thinking GIF, named headshots, linked card thumbnails, footer logo beside brand text). Meaningful screenshots use short functional alts from project data. Portfolio demos get `aria-label` + native controls. Muted entrance intro is decorative (`aria-hidden` on `<video>`) with an explicit Skip intro control. Do not invent caption/transcript content; VOLOCEAN run-through captions are N/A until speech-critical audio is confirmed and a real `.vtt` exists.  
**Evidence:** Agents [T16 code audit](5802e2d2-a3e8-4e4d-ae77-2f290c226bef), [T16 risk](3ce13563-d477-46d9-93a0-81c07c6f247e), [T16 QA](68189f67-9db6-44a6-a289-cae26326272c); original [Alt-text report](30cad2a5-4966-4b78-b27b-f33d22171ace).

### D013 — AIOS Primary CTA Is Contact Until App URL Exists

**Date:** 2026-08-11  
**Related task:** `T02`  
**Decision:** While `AIOS_APP_URL` is null, the general AIOS primary action is Contact via `AIOS_ASSESSMENT_CTA` (`Book an Assessment Call` → `/contact`). Do not label it as starting an in-app assessment. The staffing-only quick assessment link may stay secondary. When a general assessment URL is ready, set `AIOS_APP_URL` and point the primary CTA there.  
**Evidence:** Agents [T02 code audit](75a987d1-1aa9-40ce-920b-ff6b98140d1f), [T02 risk](0e618d4d-b0cb-4d62-9804-1baa69838cff); original [Above-fold CTA report](d95f0746-e49c-4144-a038-e959dd76c66d).

### D014 — Home Proof Line Is Verified VOLOCEAN Live Status

**Date:** 2026-08-11  
**Related task:** `T02`  
**Decision:** `HERO_PROOF_LINE` is `VOLOCEAN client platform live about 9 months.` sourced from existing portfolio VOLOCEAN copy. Do not invent ratings, client counts, or other metrics for the hero.  
**Evidence:** Portfolio project data already states live ~9 months; T02 agents above.

### D015 — Mobile Persistent CTA Is Header, Not Bottom Bar

**Date:** 2026-08-11  
**Related task:** `T09`  
**Decision:** Persistent mobile conversion uses a compact **Book** button in the floating header for viewports below `lg` (1024), with `aria-label="Book a Call"`. Do not use the full “Book a Call” label in the bar (it collides with the logo). Do not add a sticky bottom CTA bar. Hide the header CTA on `/contact` and while the mobile menu is open. Keep the menu Book a Call. Do not change BackToTop or remount chat for this task.  
**Evidence:** Agents [T09 code audit](f1a6bf9c-17d1-44a3-a9cc-7f9d7b9d81c1), [T09 a11y risk](b562eb40-eaf0-46b5-bf1c-9723fc8f6b42), [T09 QA](33c1212e-e2fb-4c6d-9968-dd2e49c288c4); original [Sticky-mobile-CTA report](fdfb153f-720f-4db7-8833-2c055d5fa50f).

## Open Business Decisions

These are not invitations to stop immediately. The execution chat should first inspect code, identify safe defaults, and make all non-blocked progress.

- `B001` — Resolved interim via D007: use “We aim to reply within 1–2 business days.” Confirm if you want different ops wording.
- `B002` — Confirm consent model and whether GA4 is required now. Interim default locked in D005: no GA/banner until T19.
- `B003` — Resolved interim via D006: use `freddy@fieldporter.com`. Optional later: create `privacy@` forward.
- `B004` — Arrange legal review for Privacy Policy and Terms after code/policy alignment.
- `B005` — Supply approved Freddy and Sam photos, roles, bios, and optional LinkedIn URLs.
- `B006` — Supply written testimonial permissions and source details.
- `B007` — Confirm case-study client permissions and metric evidence.
- `B008` — Complete real Search Console verification through deployment configuration.
- `B009` — Resolved via D011: no X/Twitter account; URL removed from `SOCIAL_LINKS`; never restore `twitter.creator` / Twitter `sameAs`.

## Baseline Research Snapshot

This summary prevents future chats from repeating the full audit. Current code must still be checked because it may have changed.

- `T01`: branded `app/not-found.tsx` live; invalid insight slugs 404 via `dynamicParams = false`; title segment + noindex.
- `T02`: About + Portfolio heroes have Book a Call → `/contact`; Home proof line set; AIOS label honest via `AIOS_ASSESSMENT_CTA` (D013/D014).
- `T03`: footer Resources renders Insights (no Portfolio dupe); About Book a Call → `/contact`; articles have related peers + category CTA + body links; AIOS links to Services; Home CTA links AIOS/Insights/About; partnership stays isolated.
- `T04`: contact form uses inline success; no `/thank-you`; booking conversion is not wired.
- `T05`: insight articles show Home → Insights → title crumbs + matching BreadcrumbList JSON-LD; unused slug breadcrumb component left unused.
- `T06`: portfolio is the case-study surface; VOLOCEAN is strongest; proof depth is uneven.
- `T07`: seven Services FAQs in `config/services-faqs.ts`; FAQPage JSON-LD; collapsed answers unmounted; reduced-motion respected.
- `T08`: enquiry surfaces aligned to soft 1–2 business days via `ENQUIRY_RESPONSE` (D007); privacy stays 5 business days.
- `T09`: compact mobile header Book a Call below `lg` (D015); hidden on `/contact` and when menu open; no bottom sticky bar.
- `T10`: host-aware `app/robots.ts` + middleware; production allows crawl without blocking `/_next/`; preview/localhost Disallow `/` + noindex; partnership disallowed; placeholder verification removed (B008).
- `T11`: child titles are segment-only under root `FIELDPORTER | %s`; Home and partnership use absolute; no double-brand.
- `T12`: public route descriptions distinct and aligned to custom-software positioning; Services uses 8–10 week portal timeline; article excerpts preserved.
- `T13`: shared `pageSocial()` + `/opengraph-image` on all marketing routes; stale JPG removed; OG copy aligned to custom software; articles share brand image by design.
- `T14`: maps are intentionally not applicable.
- `T15`: Jason testimonial is strongest; Steve attribution/stars need evidence.
- `T16`: live images intentionally meaningful or decorative; portfolio video named; entrance muted video decorative + Skip intro button; captions N/A (no speech-critical audio assets).
- `T17`: Organization + WebSite JSON-LD from constants (`freddy@`, legal identifiers, no Twitter sameAs until B009); Article schema on insight slugs; crawler-visible mount (D010).
- `T18`: privacy page rewritten to live processors; form/booking notices added; contact is `freddy@` (D006); GA/banner deferred (D005); legal review still external.
- `T19`: GA helper code exists but GA is not loaded; Firestore tracking is the current partial substitute.
- `T20`: About shows initials only; no real team photos exist in the repository.

## Change Entries

Add one entry after every execution chat using the exact structure below.

### RUN-000 — Programme Setup

**Date:** August 2026  
**Task:** Planning and handoff system  
**Status:** Complete  
**Scope completed:**

- Consolidated the image checklist and 20 sub-agent reports.
- Created the master plan, this progress log, and the reusable execution prompt.
- Recorded dependency order, acceptance criteria, external blockers, and final QA gate.

**Files changed:**

- `docs/tasks/12-website-launch-readiness-master-plan.md`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`
- `docs/tasks/12-REUSABLE-FORK-CHAT-PROMPT.md`
- `docs/tasks/00-TASK-INDEX.md`

**Verification:** All 20 research links are present; IDE lints reported no issues; `npm run build` passed on 2026-08-11.  
**Manual checks for Freddy:** Read the open business decisions above.  
**Next recommended task:** `T18`

### RUN-001 — T18 Privacy Policy Accuracy And Consent Decision

**Date:** 2026-08-11  
**Task:** `T18 — Privacy policy accuracy and consent decision`  
**Status:** Complete  
**Research agents used:** [T18 code audit](094dc0e7-ef54-4c5c-a73e-bf640f783a42), [T18 risk review](e143177a-f78c-461a-8b65-a57186976f9b), [T18 QA plan](8e9c45e7-6efa-41f9-9d8c-6dd532fe7876)

**Evidence checked before implementation:**

- Policy claimed cookie banner, GA/Hotjar, DeepSeek, auto-deletion, and fields the live forms do not collect.
- Live processors: Firebase/Firestore, Resend, Cal.com; chat Gemini code exists but widget unmounted; no consent banner; no retention purge jobs.
- Contact and newsletter forms had no privacy notice/link.

**Plan executed:**

- Locked interim consent default D005: strip false tracking claims; defer GA/banner to T19 after B002.
- Rewrote privacy policy to match live collection, processors, cookies/storage, retention, and contacts.
- Aligned Terms confidentiality/retention/acceptance copy; removed active-chat and automatic-deletion claims.
- Added privacy notices and `/privacy-policy` links on contact form, newsletter signup, and booking widget.
- Softened privacy metadata (removed unverified GDPR keyword).

**Files changed:**

- `app/privacy-policy/page.tsx`
- `app/privacy-policy/layout.tsx`
- `app/terms-of-service/page.tsx`
- `components/contact/simple-contact-form.tsx`
- `components/insights/newsletter-signup.tsx`
- `components/booking/BookingWidget.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass (twice; final after Terms acceptance fix)
- Browser QA: `/privacy-policy`, `/contact` (message + booking notice), `/insights` newsletter, `/terms-of-service` at mobile ~375px and desktop; privacy links present; no DeepSeek/banner/auto-delete claims on privacy page
- Specialist validation: policy vs code alignment checked; no legal approval claimed

**Decisions made:**

- D005 — Privacy claims match live processors; no GA until consent (see Decisions Already Locked).

**Remaining risks or blockers:**

- B003 — confirm `privacy@fieldporter.com` works and who replies (Freddy).
- B004 — legal review of Privacy + Terms still outstanding (Freddy/counsel).
- B002 — final GA4/consent model still needed before T19.
- Newsletter unsubscribe is by contact only; no unsubscribe API yet (disclosed).
- First-party Firestore `user_interactions` remains active and is now disclosed.

**Correction (2026-08-11):** B003 closed interim by D006 / RUN-002.

**Freddy must check:**

- Send a test email to `privacy@fieldporter.com` and confirm delivery/ownership.
- Decide B002: GA4 now with consent UI (unlocks T19) or keep D005 until later.
- Arrange legal review of Privacy Policy and Terms (B004). Do not treat this chat as legal approval.

**Correction (2026-08-11):** Privacy inbox check superseded by RUN-002 / D006 — use `freddy@fieldporter.com`.

**Next recommended task:** `T08`

### RUN-002 — T18 Privacy Contact Follow-Up (freddy@)

**Date:** 2026-08-11  
**Task:** `T18 — Privacy policy accuracy and consent decision` (follow-up)  
**Status:** Complete  
**Research agents used:** None (Freddy business decision)

**Evidence checked before implementation:**

- Freddy confirmed `privacy@fieldporter.com` does not exist.
- Advertising a dead inbox would make the policy inaccurate again.

**Plan executed:**

- Replaced all public `privacy@` references with `freddy@fieldporter.com`.
- Locked D006 and marked B003 interim-resolved.
- Noted later-stage `privacy@` forwarding option in master plan external inputs and T18 implementation notes.

**Files changed:**

- `app/privacy-policy/page.tsx`
- `docs/tasks/12-website-launch-readiness-master-plan.md`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: not applicable beyond text/mailto updates
- Type check: run with build
- Build: `npm run build` pass
- Browser QA: not re-run; change is mailto/copy only
- Specialist validation: no remaining `privacy@` in app source

**Decisions made:**

- D006 — Privacy contact uses `freddy@` until a dedicated inbox exists.

**Remaining risks or blockers:**

- B004 legal review still outstanding.
- Optional later ops: create `privacy@` forward, then update policy/schema.

**Freddy must check:**

- Confirm you receive mail at `freddy@fieldporter.com` for privacy requests (already your inbox).
- Legal review still needed (B004).

**Next recommended task:** `T08`

### RUN-003 — T08 Response-Time Promise

**Date:** 2026-08-11  
**Task:** `T08 — Response-time promise`  
**Status:** Complete  
**Research agents used:** [T08 code audit](db2a57b7-c285-4df3-8f3e-361b8133ef49), [T08 risk/QA](92d86044-a3e9-40f5-b76c-fe132a60542c), original [Response-time report](93042a18-5ddb-4356-a1e4-780f2b1daadc)

**Evidence checked before implementation:**

- Live contact hero, methods, form success, portfolio CTA, and chat append said “within 24 hours”.
- Contact metadata said “shortly”.
- Welcome email already said “1-2 business days”.
- No shared enquiry-reply constant existed; `SUCCESS_MESSAGES` unused and still said 24 hours.
- Privacy “5 business days” is separate and must stay.

**Plan executed:**

- Locked D007 / B001 interim: soft “We aim to reply within 1–2 business days.”
- Added `ENQUIRY_RESPONSE` (+ `PRIVACY_REQUEST_RESPONSE` marker) in `config/constants.ts`.
- Wired live UI, metadata, email, chat format/prompt, dormant contact components, and knowledge seed scripts to the same promise.

**Files changed:**

- `config/constants.ts`
- `app/contact/page.tsx`
- `app/contact/contact-page-client.tsx`
- `app/portfolio/page.tsx`
- `components/contact/simple-contact-form.tsx`
- `components/contact/contact-methods.tsx`
- `components/contact/secondary-conversions.tsx`
- `components/contact/working-style-section.tsx`
- `components/contact/consultation-form.tsx`
- `lib/email-service.ts`
- `lib/chat/response-format.ts`
- `lib/chat/prompts.ts`
- `scripts/initialize-fieldporter-knowledge.js`
- `scripts/initialize-knowledge-base.js`
- `scripts/initialize-knowledge-browser.js`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass
- Browser QA: `/contact` (meta + hero + methods), `/portfolio` CTA, `/privacy-policy` (still 5 business days) at ~375px mobile and desktop; no enquiry “24 hours” / “shortly”
- Specialist validation: grep clean in `app/`, `components/`, `config/`, `lib/` for old enquiry phrases; archive leftover ignored

**Decisions made:**

- D007 — Enquiry reply promise is soft 1–2 business days (see Decisions Already Locked).

**Remaining risks or blockers:**

- B001 still open for Freddy to confirm or override D007 wording.
- Welcome email still mentions website AI assistant “24/7”; chat widget is not active (T18/D005) — out of T08 scope.
- Knowledge scripts updated but Firestore `ai_knowledge_base` is not re-seeded by this chat.
- `simple-contact-form.tsx.backup` still has old 24h copy (backup only).

**Freddy must check:**

- Confirm B001 / D007 wording is what you want operationally.
- Optional: decide B002 so T19 can start; otherwise next code task is T01.
- Optional: if Firestore knowledge was seeded with old 24h text, re-run the initialize script when convenient.

**Next recommended task:** `T01`

### RUN-004 — T01 Custom 404

**Date:** 2026-08-11  
**Task:** `T01 — Custom 404`  
**Status:** Complete  
**Research agents used:** [T01 code audit](c9f6a534-73d1-406f-939e-f5ea4a279460), [T01 risk review](0ce88c82-eca0-4c89-8037-d3b4188bf299), [T01 QA plan](61ac549a-f349-4b65-893a-9c9ed24b5b48), original [Custom 404 report](2a384a2b-7b50-4a2b-9782-394db288c2e6)

**Evidence checked before implementation:**

- No `app/not-found.tsx`; Next default 404 for unknown URLs.
- Only `notFound()` call: `app/insights/[slug]/page.tsx` when article/body missing.
- Missing-article metadata used double-brand title and no noindex.
- Invalid insight slug returned branded UI with HTTP 200 until `dynamicParams = false`.
- Reuse glass look from `app/error.tsx` without client/framer shell.

**Plan executed:**

- Added server `app/not-found.tsx` with segment title, robots noindex/nofollow, Home/Services/Contact recovery links via `Button asChild` + `Link`.
- Hardened insights missing-article metadata (segment title + noindex).
- Set `dynamicParams = false` so unknown insight slugs return real HTTP 404.

**Files changed:**

- `app/not-found.tsx`
- `app/insights/[slug]/page.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass (`/_not-found` route present)
- Browser QA: `/this-page-does-not-exist-xyz` and `/insights/not-a-real-slug` at ~375px and ~1440px; branded page; Home recovery works; title `FIELDPORTER | Page not found`
- Specialist validation: both routes HTTP 404; head includes `noindex` / `noindex, nofollow`

**Decisions made:**

- Recovery trio is Home, Services, Contact (Services chosen over Insights for conversion).
- Insights dynamic params locked off so unknown slugs hard-404.

**Remaining risks or blockers:**

- Duplicate robots meta tags (`noindex` plus `noindex, nofollow`) from Next auto + page metadata; both noindex — acceptable residual.
- Desktop screenshot framing in automation tool was odd; a11y snapshot and mobile screenshot confirmed layout.

**Freddy must check:**

- Open any bad URL on prod after deploy and confirm branded 404 + Home/Services/Contact.
- Optional: decide B002 so T19 can start.

**Next recommended task:** `T11`

### RUN-005 — T11 + T12 Titles And Meta Descriptions

**Date:** 2026-08-11  
**Task:** `T11 + T12 — Unique page titles and meta descriptions`  
**Status:** Complete  
**Research agents used:** [T11/T12 code audit](bbb8f3ff-2304-43ab-9d36-5a3129c70d4f), [T11/T12 SEO risk](cb88a35d-2b5b-4e04-b100-26f8849c54e2), [T11/T12 QA plan](9ac52a8a-fb82-429b-8fd3-1283874c6461), original [Page-title report](579dcd5e-388c-4384-a039-01111e89e2db), [Meta-description report](3a92ec49-f7f3-4853-8c84-b71b3f31b98e)

**Evidence checked before implementation:**

- Root template `FIELDPORTER | %s` already brands; many child titles also included FIELDPORTER (Contact, Insights, AIOS, legal, About, articles).
- Services meta still claimed “1–3 weeks”; page/`TIMELINE_CLAIMS` use 8–10 weeks for focused portals.
- Home / SEO_DEFAULTS / About descriptions were near-duplicates; several descriptions were short or consulting-framed.
- Partnership page used non-absolute title (would get brand prefix).

**Plan executed:**

- Segment-only document titles on public routes; Home absolute kept; partnership absolute (no FIELDPORTER).
- Insight articles use `article.title` only; excerpts unchanged.
- Rewrote distinct descriptions; Services timeline aligned to assessments 2–5 days / portals 8–10 weeks.
- AIOS meta avoids conflicting hard day-count (page body still says 1–2 weeks; assessment constant remains 2–5 days).
- OG/Twitter titles use resolved branded form once; SEO_DEFAULTS description is fallback-only and distinct from Home.

**Files changed:**

- `config/constants.ts`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/insights/page.tsx`
- `app/insights/[slug]/page.tsx`
- `app/services/layout.tsx`
- `app/portfolio/layout.tsx`
- `app/aios/layout.tsx`
- `app/privacy-policy/layout.tsx`
- `app/terms-of-service/layout.tsx`
- `app/think-global-voluntas/layout.tsx`
- `app/think-global-voluntas/page.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass
- Browser QA: HTTP head fetch for all sitemap routes + partnership + 404; browser confirmed `/services` and `/contact` titles; no double-brand; Services has no 1–3 weeks
- Specialist validation: resolved titles match `FIELDPORTER | <segment>`; 404 remains `FIELDPORTER | Page not found` with noindex

**Decisions made:**

- Services document title segment: `Custom Software and Automation`.
- Portfolio document title segment simplified to `Portfolio` (drops “Case Studies” overclaim in title).
- AIOS meta omits hard delivery days until page body and `TIMELINE_CLAIMS` are reconciled separately.

**Remaining risks or blockers:**

- AIOS page body still says “1–2 weeks” while `TIMELINE_CLAIMS.assessment` is “2-5 days” — out of T11/T12; do not invent a new number here.
- First insight excerpt still cites “nearly nine in ten” (content claim, preserved).
- `SEO_DEFAULTS.ogImage` still points at missing `/og-image.jpg` (T13).
- Chat UI may still mention old 1–3 week phrasing (out of scope).

**Freddy must check:**

- Spot-check a few pages in browser tab title after deploy (Home, Services, Contact, one Insights article).
- Optional: decide B002 so T19 can start.
- Optional later: align AIOS page timeline wording with assessment constant.

**Next recommended task:** `T10`

### RUN-006 — T10 Robots And Crawler Controls

**Date:** 2026-08-11  
**Task:** `T10 — Robots and crawler controls`  
**Status:** Complete  
**Research agents used:** [T10 code audit](ba9e3023-410f-4f22-a275-9fd09c5a458e), [T10 SEO risk](3fab5752-c325-4305-b686-c7fc2e2057f4), [T10 QA plan](c3a76542-3a17-4aa2-84fd-2124c228db74), original [Robots report](32d927ff-f0e8-432a-b3cc-05022936f065)

**Evidence checked before implementation:**

- `public/robots.txt` blocked `/_next/` (hurts Google rendering) and was identical on all hosts.
- No `app/robots.ts`; sitemap hardcoded to `https://fieldporter.com` (good origin, not env-aware).
- `firebase.json` set global `X-Robots-Tag: all` (preview indexable).
- Home page shipped placeholder `google: fieldporter-website-verification-pending`.
- `/think-global-voluntas` had noindex meta but was not Disallow’d.

**Plan executed:**

- Added host-aware `app/robots.ts` + `middleware.ts` (D008): canonical Allow + Disallow `/api/` and `/think-global-voluntas/`; non-canonical Disallow `/` + noindex header.
- Deleted `public/robots.txt`; removed `/_next/` block and Crawl-delay.
- Centralised `SITE_ORIGIN` / `CANONICAL_HOSTS`; sitemap uses `SITE_ORIGIN`.
- Removed placeholder verification; root layout accepts optional `GOOGLE_SITE_VERIFICATION` env only.
- Dropped global `X-Robots-Tag: all` from `firebase.json`; shortened robots cache to 300s.

**Files changed:**

- `app/robots.ts` (new)
- `middleware.ts` (new)
- `lib/canonical-host.ts` (new)
- `public/robots.txt` (deleted)
- `app/sitemap.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `config/constants.ts`
- `firebase.json`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass (`ƒ /robots.txt`, middleware 26.2 kB)
- Browser/curl QA: localhost `/robots.txt` → `Disallow: /` + `x-robots-tag: noindex, nofollow`; `Host: fieldporter.com` → Allow `/`, Disallow `/api/` + `/think-global-voluntas/`, Sitemap line, no `/_next/`; sitemap 13 canonical locs; no verification meta on home
- Specialist validation: production-like host override confirmed; partnership not in sitemap

**Decisions made:**

- D008 — Canonical hosts own crawl permission (see Decisions Already Locked).

**Remaining risks or blockers:**

- B008 — real Search Console verification still needs `GOOGLE_SITE_VERIFICATION` set in Firebase production env after deploy.
- Live `fieldporter.com/robots.txt` and preview `.web.app` must be checked after deploy (CDN/hosting layer).
- Firebase preview channels share one build; host middleware is the gate — confirm preview Host headers reach Next after deploy.

**Freddy must check:**

- After deploy: open `https://fieldporter.com/robots.txt` — must Allow `/`, block `/api/` and `/think-global-voluntas/`, Sitemap line, **no** `/_next/`.
- After deploy: open preview `*.web.app/robots.txt` — must `Disallow: /`.
- B008: in Search Console get the HTML-tag token, set Firebase env `GOOGLE_SITE_VERIFICATION`, redeploy, then verify property.
- Optional: submit `https://fieldporter.com/sitemap.xml` in Search Console.

**Next recommended task:** `T13`

### RUN-007 — T13 Social Sharing Metadata

**Date:** 2026-08-11  
**Task:** `T13 — Social sharing metadata`  
**Status:** Complete  
**Research agents used:** [T13 code audit](7c796f48-d886-4d53-806d-7bdd9d28da88), [T13 risk](72189cc7-ad3e-4baf-a9bd-b6a5ce009804), [T13 QA](badbfb67-bfd7-45cd-8e78-94e885e0b35b), original [Social-image report](e0360940-a5a4-4367-9302-e0f4428b6bdc)

**Evidence checked before implementation:**

- Dynamic `/opengraph-image` existed but crashed at runtime (`width: fit-content` invalid in Satori).
- `SEO_DEFAULTS.ogImage` pointed at missing `/og-image.jpg`.
- About/Services/Portfolio/AIOS omitted explicit images; Insights omitted Twitter block.
- Unverified `twitter.creator: @fieldporter` on root/home.
- Articles already shared one brand image (acceptable for T13).

**Plan executed:**

- Added `lib/social-metadata.ts` (`pageSocial`, `socialImages`, `absoluteUrl` via `SITE_ORIGIN`).
- Wired Home, About, Services, Portfolio, AIOS, Contact, Insights, and articles through the helper.
- Fixed OG generator copy to custom-software positioning; exported `alt`; removed `fit-content`.
- Pointed `SEO_DEFAULTS.ogImage` at `/opengraph-image`; removed unverified `twitter.creator`.
- Locked D009 / B009.

**Files changed:**

- `lib/social-metadata.ts` (new)
- `app/opengraph-image.tsx`
- `config/constants.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/services/layout.tsx`
- `app/portfolio/layout.tsx`
- `app/aios/layout.tsx`
- `app/contact/page.tsx`
- `app/insights/page.tsx`
- `app/insights/[slug]/page.tsx`
- `app/privacy-policy/layout.tsx`
- `app/terms-of-service/layout.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass (twice; final after OG fit-content fix)
- Browser QA: all 11 marketing HTML routes have absolute `og:image` / `twitter:image` → `https://fieldporter.com/opengraph-image`, `twitter:card=summary_large_image`, no `og-image.jpg`, no `twitter:creator`; `/opengraph-image` and `/twitter-image` return 200 `image/png` (~102KB); visual preview shows Custom Software Development / FIELDPORTER / portals-tools-AI line
- Specialist validation: local meta + PNG only; LinkedIn/Facebook scrapers need production after deploy

**Decisions made:**

- D009 — Social previews use dynamic Open Graph only (see Decisions Already Locked).

**Remaining risks or blockers:**

- B009 — confirm real X/Twitter handle before restoring creator/`sameAs` Twitter URL (T17).
- File-based OG route plus explicit metadata images can still emit duplicate `og:image` tags; scrapers typically use the first. Acceptable residual.
- Production validators cannot run until deploy.

**Freddy must check:**

- After deploy: open LinkedIn Post Inspector and Facebook Sharing Debugger on Home, `/about`, and one Insights article — confirm title/desc/image.
- Confirm B009: is `@fieldporter` / twitter.com/fieldporter real?
- Optional: `curl -sI https://fieldporter.com/opengraph-image` should be 200 PNG.

**Next recommended task:** `T17`

### RUN-008 — T17 + T07 + T05 Schema FAQ Breadcrumbs

**Date:** 2026-08-11  
**Task:** `T17 + T07 + T05 — Organization/page schema, FAQ schema/a11y, insight breadcrumbs`  
**Status:** Complete  
**Research agents used:** [T17 code audit](c4354ea7-fdfe-46c3-a4df-51d4e71cef6d), [T17 SEO risk](c18a9a1a-5538-47b2-a55e-3c16c1cc779a), [T17 QA plan](1e5dfb0a-7429-4008-b9a0-acf394900b3d), original [Structured-data report](6a904f9c-be1a-4899-b85a-be6a5efc7bd7), [FAQ report](92c81204-efa2-4c6d-99d7-91557da681f7), [Breadcrumb report](63086cbb-ffff-453a-983e-4554568f8c65)

**Evidence checked before implementation:**

- Organization JSON-LD used `hello@`, unverified Twitter `sameAs`, weak favicon logo, client mount inside entrance gate that SSR’d only a loading overlay (schema invisible to crawlers).
- No FAQPage / BreadcrumbList / Article / WebSite schema.
- Services FAQs inline in page; collapsed answers stayed in DOM; breadcrumb component unused with slug labels.

**Plan executed:**

- Locked D010. Rebuilt Organization + WebSite from `BRAND` / `LEGAL_ENTITY` / `SITE_ORIGIN`; email `freddy@`; logo 512; LinkedIn+GitHub only; no SearchAction/LocalBusiness/foundingDate.
- Mounted sitewide schema outside `EntranceProvider`; fixed entrance to always SSR children.
- Extracted `config/services-faqs.ts`; FAQPage on `/services`; accordion unmounts closed answers + reduced motion.
- Insight articles: visible Home → Insights → title crumbs + Article/BreadcrumbList JSON-LD.

**Files changed:**

- `lib/json-ld.tsx` (new)
- `config/services-faqs.ts` (new)
- `components/layout/fieldporter-structured-data.tsx`
- `components/layout/entrance-provider.tsx`
- `components/layout/conditional-fieldporter-extras.tsx` (deleted)
- `app/layout.tsx`
- `app/services/layout.tsx`
- `app/services/page.tsx`
- `components/services/faq-section.tsx`
- `components/services/services-faq-json-ld.tsx` (new)
- `components/insights/insight-breadcrumb.tsx` (new)
- `components/insights/insight-article-json-ld.tsx` (new)
- `components/insights/article-layout.tsx`
- `app/insights/[slug]/page.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass
- Browser QA: `/`, `/services`, `/insights/from-ai-pilot-to-production` — Org/WebSite present; FAQPage 7 Qs; crumbs + Article/BreadcrumbList; closed FAQ answers unmounted; expand shows answer; no `hello@` / Twitter sameAs / LocalBusiness / SearchAction
- Specialist validation: static HTML in `.next/server/app` confirms schema strings; live DOM parse of JSON-LD scripts OK. Google Rich Results / Schema Validator need production URL after deploy.

**Decisions made:**

- D010 — Truthful schema graph; crawler-visible mount (see Decisions Already Locked).

**Remaining risks or blockers:**

- B009 — confirm X/Twitter before adding to `sameAs`.
- LinkedIn company + GitHub assumed real; verify if unsure.
- Sam not listed as founder in schema (B005 / About shows Co-founder but no approved schema expansion).
- Production Rich Results Test still required after deploy.
- Legacy `components/layout/breadcrumb.tsx` still unused (slug-based); do not mount globally.

**Freddy must check:**

- After deploy: paste Home, `/services`, and one insight URL into [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/).
- Confirm B009 (Twitter handle) so T17 `sameAs` can include or permanently drop it.
- Optional: confirm company LinkedIn/GitHub URLs are the live profiles you want public.

**Next recommended task:** `T16`

### RUN-009 — B009 No Twitter Account

**Date:** 2026-08-11  
**Task:** `B009 / D011 — No X/Twitter account`  
**Status:** Complete  
**Research agents used:** None (Freddy business decision)

**Evidence checked before implementation:**

- Freddy confirmed FIELDPORTER has no Twitter/X account.
- `SOCIAL_LINKS.twitter` still pointed at `twitter.com/fieldporter`.

**Plan executed:**

- Removed Twitter URL from `SOCIAL_LINKS`.
- Locked D011; closed B009; updated D009/D010 wording.
- Schema `sameAs` already LinkedIn + GitHub only.

**Files changed:**

- `config/constants.ts`
- `components/layout/fieldporter-structured-data.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: not applicable beyond constant removal
- Type check: run with build
- Build: `npm run build` (this run)
- Browser QA: not required (URL constant + comments)
- Specialist validation: no `SOCIAL_LINKS.twitter`; Org `sameAs` has no Twitter

**Decisions made:**

- D011 — No X/Twitter account.

**Remaining risks or blockers:**

- None for B009.

**Freddy must check:**

- None.

**Next recommended task:** `T16`

### RUN-010 — T16 Image And Media Accessibility

**Date:** 2026-08-11  
**Task:** `T16 — Image and media accessibility`  
**Status:** Complete  
**Research agents used:** [T16 code audit](5802e2d2-a3e8-4e4d-ae77-2f290c226bef), [T16 risk](3ce13563-d477-46d9-93a0-81c07c6f247e), [T16 QA](68189f67-9db6-44a6-a289-cae26326272c), original [Alt-text report](30cad2a5-4966-4b78-b27b-f33d22171ace)

**Evidence checked before implementation:**

- No live images missing `alt`; quality uneven.
- Thinking GIF duplicated “Thinking...”; headshots duplicated names; product/gallery alts generic.
- Portfolio video had controls but no accessible name; no caption tracks in repo.
- Entrance video muted/autoplay with no `aria-hidden` and skip was visual-only text.

**Plan executed:**

- Locked D012: empty alt for decorative/status; short functional alts for screenshots; named portfolio video; decorative entrance + Skip intro; captions N/A without real speech track.
- Wired portfolio `heroImageAlt` / `galleryImageAlts` / `videoLabel`; homepage linked cards use empty image alt; Jason headshot empty alt.
- Chat thinking GIFs `alt=""` + `aria-hidden`; partnership logos brand-only / decorative footer; headshots empty.
- Entrance: dialog label, video `aria-hidden`, Skip intro button.

**Files changed:**

- `app/portfolio/page.tsx`
- `components/homepage/portfolio-section.tsx`
- `components/layout/video-entrance.tsx`
- `components/chat/mobile-chat-interface.tsx`
- `components/chat/desktop-chat-sidebar.tsx`
- `components/chat/premium-thinking-sphere.tsx`
- `app/think-global-voluntas/page.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass
- Browser QA: `/` (empty card + Jason alts), `/portfolio` (functional hero/gallery alts + video `aria-label="VOLOCEAN platform product demo"`), `/think-global-voluntas` (brand logos + empty headshots/footer) — no missing alts
- Specialist validation: captions N/A documented; no fabricated VTT; CSS textures left decorative

**Decisions made:**

- D012 — Media alt and video accessibility rules (see Decisions Already Locked).

**Remaining risks or blockers:**

- Entrance overlay hard to re-trigger in automation after session flag; code path verified in source.
- If VOLOCEAN demo later has speech-critical audio, add a real `.vtt` (do not invent).
- Chat widget may be unmounted in production; GIF fix still applied for when it is active.

**Freddy must check:**

- On a fresh browser session (or clear `fieldporter-video-seen-session`), confirm Skip intro button works and intro does not trap keyboard.
- Spot-check `/portfolio` VOLOCEAN video name with a screen reader or Accessibility pane if you want extra confidence.

**Next recommended task:** `T03`

### RUN-011 — T03 Internal Links

**Date:** 2026-08-11  
**Task:** `T03 — Internal links`  
**Status:** Complete  
**Research agents used:** [T03 code audit](9742ef42-f7bf-46cc-994b-43e350976dc1), [T03 SEO/a11y risk](eb54706f-b7d7-4a31-ab25-f6b3e64fab87), [T03 QA plan](079c8843-0347-4aec-9589-7a2bdd5fa6be), original [Internal-link report](099268bc-2f72-489a-8681-cc2751ffe648)

**Evidence checked before implementation:**

- `FOOTER_LINKS.resources` defined with Insights + duplicate Portfolio; Resources column never rendered.
- About CTA said “Book a call” but buttons went to `/portfolio` and `/services` only.
- Insight articles: end CTA Insights/Contact only; no related peers; bodies had zero internal links.
- AIOS linked only to Contact; Home body had no Insights/About/AIOS links (unused `AIAuditSection` not remounted).
- Partnership route correctly isolated.

**Plan executed:**

- Rendered footer Resources with Insights only; removed Portfolio duplicate from resources constant.
- About: primary Book a Call → `/contact`; kept Portfolio/Services secondary; inline “Book a call” link.
- Articles: related title list from `INSIGHTS_ARTICLES` + category CTA (`/aios` or `/services`…); light body links.
- AIOS bottom: “See our services” → `/services`.
- Home CTA: text links to AI Readiness, Insights, About.
- Did not remount unused AIAuditSection; did not link partnership.

**Files changed:**

- `config/constants.ts`
- `config/insights-articles.ts`
- `components/layout/footer.tsx`
- `components/about/about-cta.tsx`
- `components/insights/article-layout.tsx`
- `components/insights/article-bodies.tsx`
- `components/homepage/cta-section.tsx`
- `app/insights/[slug]/page.tsx`
- `app/aios/page.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass
- Browser QA: `/`, `/about`, `/aios`, `/insights/from-ai-pilot-to-production` at ~375px and ~1440px — footer Resources/Insights; About Book a Call href `/contact`; article related + Explore AI Readiness; AIOS See our services; Home CTA body links; no partnership in public chrome
- Specialist validation: HTML fetch confirmed related peers, body workflow/AIOS links, footer Resources

**Decisions made:**

- Footer Resources = Insights only (Portfolio stays under Company).
- Related insights = plain title list (not GlassCard grid).
- Home body links via existing CTA copy; do not remount AIAuditSection for T03.

**Remaining risks or blockers:**

- About now has three CTA buttons (Contact + Portfolio + Services); T02 may tighten above-fold About/Portfolio heroes separately.
- Browser automation click on Next `Link` sometimes focused without navigation; hrefs verified in DOM/HTML.

**Freddy must check:**

- Scroll any page footer — Resources → Insights works.
- On `/about`, Book a Call goes to Contact.
- Open one Insights article — related titles + category CTA look right.

**Next recommended task:** `T02`

### RUN-012 — T02 Above-Fold CTAs

**Date:** 2026-08-11  
**Task:** `T02 — Above-fold CTAs`  
**Status:** Complete  
**Research agents used:** [T02 code audit](75a987d1-1aa9-40ce-920b-ff6b98140d1f), [T02 risk](0e618d4d-b0cb-4d62-9804-1baa69838cff), [T02 QA plan](a54cca4c-abc8-444d-bd42-76f54aa20766), original [Above-fold CTA report](d95f0746-e49c-4144-a038-e959dd76c66d)

**Evidence checked before implementation:**

- About and Portfolio heroes had no conversion CTA; lower About CTA already → `/contact` (T03).
- Home `HERO_PROOF_LINE` was empty; portfolio already documents VOLOCEAN live ~9 months.
- AIOS primary said “Book Your Assessment” but went to `/contact` while `AIOS_APP_URL` is null.
- Project Tailwind `sm` is 375px — hero CTA stacks must use `md:flex-row`, not `sm:flex-row`.

**Plan executed:**

- Added compact Book a Call → `/contact` to About and Portfolio heroes (text secondary only).
- Set verified `HERO_PROOF_LINE`; added `AIOS_ASSESSMENT_CTA` and relabelled AIOS primary/final CTAs.
- Left header sticky mobile CTA for T09; left About lower CTA as-is.

**Files changed:**

- `components/about/about-hero.tsx`
- `app/portfolio/page.tsx`
- `app/aios/page.tsx`
- `config/constants.ts`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass (twice; final after md flex fix)
- Browser QA: `/about`, `/portfolio`, `/`, `/aios` at ~375px and desktop — hero Contact CTAs present; About/Portfolio stack on phone; Home proof line visible; AIOS label honest → `/contact`
- Specialist validation: label/href match; no sticky CTA added (T09)

**Decisions made:**

- D013 — AIOS primary CTA is Contact until app URL exists.
- D014 — Home proof line is verified VOLOCEAN live status.

**Remaining risks or blockers:**

- Mobile header still hides Book a Call until menu open (T09).
- About lower section still has three buttons (acceptable; hero is the above-fold fix).
- When general AIOS assessment URL exists, set `AIOS_APP_URL` and update primary CTA.

**Freddy must check:**

- Open `/about` and `/portfolio` on phone — Book a Call visible without scrolling past the hero.
- Confirm Home proof line “VOLOCEAN client platform live about 9 months.” is wording you want public.
- Optional: decide B002 so T19 can start after T09.

**Next recommended task:** `T09`

### RUN-013 — T09 Mobile Persistent CTA

**Date:** 2026-08-11  
**Task:** `T09 — Mobile persistent CTA`  
**Status:** Complete  
**Research agents used:** [T09 code audit](f1a6bf9c-17d1-44a3-a9cc-7f9d7b9d81c1), [T09 a11y risk](b562eb40-eaf0-46b5-bf1c-9723fc8f6b42), [T09 QA](33c1212e-e2fb-4c6d-9968-dd2e49c288c4), original [Sticky-mobile-CTA report](fdfb153f-720f-4db7-8833-2c055d5fa50f)

**Evidence checked before implementation:**

- Header Book a Call was `hidden lg:flex`; mobile only had CTA inside the hamburger.
- No sticky bottom conversion bar; BackToTop owns bottom-left; chat FAB code exists but is not mounted.
- Contact already has sticky Book/Message conversion chrome.
- Master plan: compare header vs bottom bar; choose lower risk.

**Plan executed:**

- Locked D015: compact header CTA below `lg`, not a bottom bar.
- Added mobile Book a Call beside the menu button; hide on `/contact` and while menu open.
- Slight logo shrink on narrow phones so CTA + menu fit; menu keeps its own Book a Call.
- Left BackToTop and chat unmounted paths unchanged.

**Files changed:**

- `components/layout/header.tsx`
- `docs/tasks/12-WEBSITE-IMPROVEMENT-LOG.md`

**Verification:**

- IDE lints: pass on changed source files
- Type check: `npm run type-check` pass
- Build: `npm run build` pass
- Browser QA: `/`, `/about`, `/services` at ~375 — header Book a Call + menu; `/contact` — no header Book a Call; menu open — bar CTA gone, sheet Book a Call present; ~1440 — desktop nav + single header Book a Call, no mobile duplicate
- Specialist validation: no bottom bar; no BackToTop/chat conflict; ≥44px targets

**Decisions made:**

- D015 — Mobile persistent CTA is header, not bottom bar.

**Remaining risks or blockers:**

- No further Ready code tasks until B002 unlocks T19, or external proof unlocks T06/T15/T20.
- Very narrow phones (~320) may still feel tight with full “Book a Call” label — residual, acceptable at 375 QA.
- When chat remounts later, bottom-right stays free because T09 did not take a bottom bar.

**Freddy must check:**

- On a real phone: open Home — Book a Call visible without opening the menu; tap goes to Contact; Contact header has no Book a Call.
- Decide B002: GA4 now with consent UI (unlocks T19 → T04) or keep D005.

**Next recommended task:** `T19` after B002

### Correction — T09 mobile CTA overlap (2026-08-11)

Full “Book a Call” label collided with FIELDPORTER on narrow phones. Mobile bar label shortened to **Book** (`aria-label` still “Book a Call”); logo uses truncate + smaller mobile type so it cannot paint over the CTA. Rebuild verified at ~375 on `/services`.

## Entry Template

Copy this section to the bottom of the file and replace every placeholder.

```md
### RUN-XXX — TXX Short Task Name

**Date:** YYYY-MM-DD
**Task:** `TXX — Full task name`
**Status:** Complete | Needs follow-up | Blocked externally
**Research agents used:** [Agent name](agent-id), [Agent name](agent-id)

**Evidence checked before implementation:**

- Current code finding.
- Current user/business decision.

**Plan executed:**

- Focused implementation step.
- Focused implementation step.

**Files changed:**

- `path/to/file`

**Verification:**

- IDE lints: pass/fail/not applicable
- Type check: command and result
- Build: `npm run build` pass/fail
- Browser QA: routes/viewports/behavior checked
- Specialist validation: analytics/schema/social preview/etc.

**Decisions made:**

- Decision and reason.

**Remaining risks or blockers:**

- None, or exact blocker + owner.

**Freddy must check:**

- Only manual/external checks.

**Next recommended task:** `TXX`
```

## How To Update The Queue

After adding a run entry:

1. Change the completed task checkbox and status.
2. Unlock dependent tasks by changing `Waiting` to `Ready`.
3. Update Current Programme State.
4. Add any permanent decision under Decisions Already Locked.
5. Add genuine user actions under Open Business Decisions.
6. Keep the next recommendation to one task.

## Final Completion Entry Requirements

The final run must record:

- all task statuses;
- final type-check and build results;
- mobile and desktop routes tested;
- conversion and consent behavior tested;
- live post-deployment checks still required;
- legal/content approvals still outstanding;
- concise handoff for Freddy.
