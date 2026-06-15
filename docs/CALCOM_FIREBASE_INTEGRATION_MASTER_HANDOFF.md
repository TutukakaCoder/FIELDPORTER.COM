# Cal.com + Firebase Integration Master Handoff

## Purpose

Single-source handoff document for reusing the same **integration mechanics** in a different Next.js + Firebase app (different brand, different calendar owner, different routes/copy).

This document merges:
- actual implemented code behavior
- relevant existing research/implementation docs in this repo
- migration guidance for a new project context

---

## Sources Consolidated

### Code (source of truth)
- `components/booking/BookingWidget.tsx`
- `app/contact/contact-page-client.tsx`
- `app/api/webhooks/calcom/route.ts`
- `lib/firebase.ts`
- `firestore.rules`
- `firebase.json`
- `env.example`
- `scripts/test-calcom-api.js`
- `functions/src/index.ts`

### Existing research/docs merged into this handoff
- `CAL_COM_BOOKING_IMPLEMENTATION_REPORT.md`
- `CAL_COM_SESSION_SUMMARY.md`
- `CAL_COM_NEXT_PROMPT.md`
- `MANUAL_STEPS_CALCOM.md`
- `DEPLOYMENT_VERIFICATION.md`
- `DEPLOYMENT_REPORT.md`
- `BOOKING_SYSTEM_CONTEXT_PLAN.md`
- `docs/README.md`

---

## 1) End-to-End Flow (implemented)

1. User opens `/contact`.
2. Contact client page defaults to booking mode (`mode = "book"`).
3. Booking widget is dynamically imported with `ssr: false` (client-only).
4. Widget initializes Cal embed via `getCalApi()`, then renders `<Cal calLink="username/eventSlug" />`.
5. User completes booking in Cal widget UI.
6. If webhook is configured in Cal dashboard, Cal sends POST to `/api/webhooks/calcom`.
7. Route reads raw body + header `x-cal-signature-256`.
8. Signature is validated with HMAC SHA256 **only when** `CALCOM_WEBHOOK_SECRET` exists.
9. Route tries Firebase Admin init from:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
10. On success, writes/updates Firestore `bookings/{booking.uid}` by event type:
   - `BOOKING_CREATED` -> `set(...)`
   - `BOOKING_RESCHEDULED` -> `update(...)`
   - `BOOKING_CANCELLED` -> `update(...)`
11. If Admin init fails, webhook still returns success but logs booking only (`stored: false`).

---

## 2) Cal.com Integration Details

## Integration style
- Implemented: **embed widget** (`@calcom/embed-react`).
- Not implemented in app runtime: Cal API booking creation/update calls.

## Calendar link model
- `calLink` is built from:
  - `NEXT_PUBLIC_CAL_USERNAME` (fallback currently set in code)
  - `NEXT_PUBLIC_CAL_EVENT_SLUG` (fallback currently set in code)

## Webhook events handled
- `BOOKING_CREATED`
- `BOOKING_RESCHEDULED`
- `BOOKING_CANCELLED`

## Webhook security
- Expected signature header: `x-cal-signature-256`
- Verification uses `CALCOM_WEBHOOK_SECRET`
- If secret missing, verification is skipped (current behavior)

## Teams / conferencing setup
- Manual setup is documented in `MANUAL_STEPS_CALCOM.md`.
- Implemented code does not programmatically configure conferencing provider.

## Cal org/team setup
- Not found in repo.

---

## 3) Firebase Integration Details

## Firebase products used in this Cal flow
- Firestore: yes
- Firebase Admin SDK: yes (server route)
- Firebase Auth: initialized in `lib/firebase.ts`, but not used for booking identity in this flow
- Realtime DB / Storage in Cal flow: not found
- Cloud Functions booking logic: not found (functions scaffold exists, no exported triggers)

## Firestore write target (Cal flow)
- Collection: `bookings`
- Doc ID: `booking.uid` from Cal webhook payload
- Fields written (from webhook route):
  - `bookingId`
  - `uid`
  - `eventType` (currently hardcoded `"discovery-call"`)
  - `title`
  - `description`
  - `startTime`
  - `endTime`
  - `attendee` (`name`, `email`, `timeZone`)
  - `organizer` (`name`, `email`, `timeZone`)
  - `location`
  - `status`
  - `triggerEvent`
  - `metadata`
  - `createdAt`
  - `updatedAt`
  - `rescheduledAt` (rescheduled only)
  - `cancelledAt` (cancelled only)

## Identity linkage
- Booking identity key: Cal `uid`
- Person identity in doc: attendee `email`
- Firebase `auth.uid` linkage: not implemented

## Security rules currently present
- `firestore.rules` allows:
  - `bookings`: `allow write: if true`
  - `bookings` read: admin-only role check on `/users/{uid}.role`
- Important: this does **not** enforce webhook-only writes at rules level.

---

## 4) Env Vars (no values) + Failure Behavior

## Cal/Firebase vars used directly by booking flow
- `NEXT_PUBLIC_CAL_USERNAME`
  - read in `components/booking/BookingWidget.tsx`
  - if missing: fallback username is used
- `NEXT_PUBLIC_CAL_EVENT_SLUG`
  - read in `components/booking/BookingWidget.tsx`
  - if missing: fallback slug is used
- `CALCOM_WEBHOOK_SECRET`
  - read in `app/api/webhooks/calcom/route.ts`
  - if missing: webhook signature verification skipped
- `FIREBASE_PROJECT_ID`
  - read in `app/api/webhooks/calcom/route.ts`
  - if invalid/missing: Admin init can fail, webhook logs only
- `FIREBASE_CLIENT_EMAIL`
  - same behavior as above
- `FIREBASE_PRIVATE_KEY`
  - same behavior as above

## Cal API key usage
- `CALCOM_API_KEY`
  - used by `scripts/test-calcom-api.js` only
  - not used by runtime booking widget/webhook logic

## Firebase client vars (app-wide initialization)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

---

## 5) Code Map (concern -> file -> symbol -> trigger)

| Concern | File | Symbol | Trigger |
|---|---|---|---|
| Contact page chooses booking mode | `app/contact/contact-page-client.tsx` | `ContactPageClient` | User opens `/contact` |
| Client-only Cal loading | `app/contact/contact-page-client.tsx` | dynamic `BookingWidget` import | mode is `book` |
| Cal widget init + render | `components/booking/BookingWidget.tsx` | `BookingWidget`, `getCalApi`, `<Cal />` | component mount |
| Receive webhook | `app/api/webhooks/calcom/route.ts` | `POST` | Cal webhook POST |
| Verify webhook signature | `app/api/webhooks/calcom/route.ts` | `verifySignature` | POST with secret configured |
| Init Firebase Admin | `app/api/webhooks/calcom/route.ts` | `getAdminDb` | first write attempt |
| Persist booking events | `app/api/webhooks/calcom/route.ts` | event `switch(triggerEvent)` | Cal event received |
| Rules for booking access | `firestore.rules` | `match /bookings/{document=**}` | Firestore read/write attempts |

---

## 6) Reusable Porting Recipe (for a new unrelated app)

## Required env vars in new app
- `NEXT_PUBLIC_CAL_USERNAME`
- `NEXT_PUBLIC_CAL_EVENT_SLUG`
- `CALCOM_WEBHOOK_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- Firebase web client vars (`NEXT_PUBLIC_FIREBASE_*`)

## Minimal files/patterns to copy/adapt
1. Cal widget component pattern (from `components/booking/BookingWidget.tsx`)
2. Booking mode page/container pattern (from `app/contact/contact-page-client.tsx`)
3. Webhook route logic (from `app/api/webhooks/calcom/route.ts`)
4. Firebase client init (`lib/firebase.ts`)
5. Firestore rules section for bookings (`firestore.rules`) - but tighten writes (see checklist below)

## Firebase schema sketch (generic)
`bookings/{calBookingUid}`
- `bookingId: string`
- `uid: string`
- `eventType: string`
- `title: string`
- `description: string`
- `startTime: Timestamp`
- `endTime: Timestamp`
- `attendee: { name, email, timeZone }`
- `organizer: { name, email, timeZone }`
- `location: string`
- `status: string`
- `triggerEvent: string`
- `metadata: object`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`
- `rescheduledAt?: Timestamp`
- `cancelledAt?: Timestamp`

## Security checklist for new app
1. Enforce webhook signature verification in all environments.
2. Remove public write access to `bookings`.
3. Restrict booking writes to server-only path (Admin SDK in API route).
4. Add replay protection/idempotency checks if needed.
5. Validate expected event types and payload shape.
6. Keep Cal identity and internal user identity mapping explicit.

---

## 7) Edge Cases and Gaps Found

## Implemented handling
- Timezones preserved in attendee/organizer fields.
- Duplicate create events are naturally idempotent by doc ID (`booking.uid`) with `set`.
- Cancellation and reschedule support included.
- SSR/client boundary handled (widget is client-only).

## Risk points in current code
- Signature verification is skipped when secret missing.
- `BOOKING_RESCHEDULED`/`BOOKING_CANCELLED` use `update`; fails if create event was never stored first.
- Firestore rules currently allow any client to write `bookings`.
- No explicit rate limiting on webhook route.

## Not found in repo
- No Cal org/team API automation.
- No active n8n integration for Cal booking flow.
- No Cloud Functions-based Cal sync logic.
- No explicit CORS logic in Cal webhook route.

---

## 8) Research Docs Reconciled Into This Handoff

## What those docs contributed
- `MANUAL_STEPS_CALCOM.md`: manual Teams + event config steps.
- `CAL_COM_BOOKING_IMPLEMENTATION_REPORT.md`: implementation intent, event list, operational notes.
- `CAL_COM_SESSION_SUMMARY.md`: UX/mobile decisions and known embed warnings.
- `DEPLOYMENT_VERIFICATION.md` + `DEPLOYMENT_REPORT.md`: deployment checklist/context.
- `BOOKING_SYSTEM_CONTEXT_PLAN.md`: original architecture decision path.

## Clarifications where docs and code differ
- Some docs mention `CALCOM_API_KEY` as runtime requirement for booking/webhook; code shows runtime booking path is embed + webhook secret + Firebase Admin, while API key is only used by test script.
- Plan docs mention possible n8n future extension; current active booking flow has no n8n wiring.

---

## 9) Immediate Actions Before Reusing Elsewhere

1. Replace fallback `NEXT_PUBLIC_CAL_USERNAME` and `NEXT_PUBLIC_CAL_EVENT_SLUG` defaults with env-only or safe generic defaults.
2. Require `CALCOM_WEBHOOK_SECRET` in production and reject unsigned requests.
3. Tighten Firestore rules for `bookings` (remove public writes).
4. Handle update-before-create case (upsert for reschedule/cancel or create-if-missing).
5. Parameterize `eventType` instead of hardcoding `"discovery-call"`.
6. Remove/rotate any accidental credential exposures in docs.

---

## Important Security Note

- `CAL_COM_BOOKING_IMPLEMENTATION_REPORT.md` contains a plaintext Cal API key string in the document body.
- Treat as exposed: rotate/revoke key and remove from repository history/docs.

---

## Files To Read First (ordered)

1. `app/api/webhooks/calcom/route.ts`
2. `components/booking/BookingWidget.tsx`
3. `app/contact/contact-page-client.tsx`
4. `firestore.rules`
5. `env.example`
6. `lib/firebase.ts`
7. `scripts/test-calcom-api.js`
8. `MANUAL_STEPS_CALCOM.md`
9. `CAL_COM_BOOKING_IMPLEMENTATION_REPORT.md`
10. `DEPLOYMENT_VERIFICATION.md`

