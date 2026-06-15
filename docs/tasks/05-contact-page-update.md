# Task 05: Contact Page Update

## Goal

Simplify contact page — remove or rework **"What to expect"** block above the booking widget. Keep booking flow clean.

---

## Current state (code)

| Area | File |
|------|------|
| Contact page | `app/contact/contact-page-client.tsx` — main content inline |
| Hero | `components/contact/contact-hero.tsx` |
| Booking | `components/booking/BookingWidget.tsx` — Cal.com embed |
| Form | `components/contact/simple-contact-form.tsx` |
| Methods | `components/contact/contact-methods.tsx` |
| Working style | `components/contact/working-style-section.tsx` — lists four services |
| Secondary CTAs | `components/contact/secondary-conversions.tsx` |

**"What to expect" content today:**
- Who: leaders/operators improving workflows with AI/automation
- Cover: goals, setup, project vs ongoing; no pitch-heavy sales
- Next: call confirmed → follow-up or proposal
- Also: "Best fit" / "Not a fit" lists

Headline: "Book a call or send a message"

---

## Requested changes

- Remove or significantly shorten "What to expect" above "Book a discovery call"
- User dislikes current framing — likely feels like friction before booking
- May still want brief reassurance elsewhere (footer of form, or one line under CTA)

**Cal.com availability** — not a code change. Update times in Cal.com dashboard (see Task Index).

---

## Files likely to change

```
app/contact/contact-page-client.tsx  (primary)
components/contact/contact-hero.tsx  (if headline tied to expect block)
components/contact/working-style-section.tsx  (optional — still lists old four services)
```

---

## Open questions

1. Delete "What to expect" entirely or replace with one line?
2. Keep "Best fit / Not a fit" lists?
3. Update working-style section when services overhaul done (Task 03)?

---

## Research prompt (paste into new chat)

```
FieldPorter contact page — user wants to remove "what to expect" text above Cal.com booking widget. Feels like friction.

Research task:
1. How do premium B2B dev/consultancy contact pages handle booking — minimal copy above embed vs trust signals below?
2. One-line alternatives to a full "what to expect" section.
3. Whether "best fit / not a fit" helps or hurts conversion for ~$20K project leads.

File: app/contact/contact-page-client.tsx

Return: recommended simplified layout (wire description). Then implement.
```

---

## Acceptance criteria

- [ ] No bulky "What to expect" block above booking
- [ ] Booking widget still prominent
- [ ] Page still accessible and clear on mobile
- [ ] `npm run build` passes
