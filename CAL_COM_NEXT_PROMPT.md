# PROMPT: Final Polish & Deployment Preparation

## Context

We have completed the Cal.com integration, mobile design polish, and layout adjustments. The contact page now defaults to "Book a Call", handles mobile screens beautifully (stacked toggles, full width), and we have documented the Teams integration steps. The build is passing.

## Current Status

- ✅ Contact page defaults to "Book a Call"
- ✅ "Get in Touch" header properly centered
- ✅ Mobile toggle buttons stack correctly
- ✅ Calendar uses full width on mobile
- ✅ Contact form inputs are wider and easier to use
- ✅ Teams integration steps documented
- ⚠️ Console warnings exist but are non-critical (library internal)

## Immediate Tasks (Priority Order)

### 1. Final User Acceptance Testing

**Goal:** Verify everything works in the "real world".
**Action:**

- User to follow `MANUAL_STEPS_CALCOM.md` to set up Teams.
- User to check mobile view on actual device.

### 2. Deployment

**Goal:** Push changes to production.
**Action:**

- Deploy to Vercel/Netlify/Firebase (whichever is used).
- Verify the live URL.

### 3. Analytics & Tracking (Optional)

**Goal:** Ensure we track bookings vs. messages.
**Action:**

- Verify `gtag` events in `simple-contact-form.tsx`.
- Add tracking to `BookingWidget` (Cal.com emits events we can listen to).

## Files to Review

- `MANUAL_STEPS_CALCOM.md` (for Teams setup)

## Success Criteria

- [ ] User confirms Teams link is generating correctly
- [ ] Mobile experience is smooth and "premium"
- [ ] No layout shifts or glitches
- [ ] Deploy is successful

## Ready to Start?

"Let's deploy this and verify the live site."
