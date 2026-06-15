# Task 07: Portfolio Updates

## Goal

Update `/portfolio` — rename Voluntas → **Volotion**, new demo video, add **SOP AI analysis demo** case (construction firms), cut fluff.

---

## Current state (code)

| Area | File |
|------|------|
| Portfolio page | `app/portfolio/page.tsx` — client component, project cards |
| Homepage teaser | `components/homepage/portfolio-section.tsx` |
| Partner page | `app/think-global-voluntas/page.tsx` — separate Think Global × Voluntas page |

**Note:** Codebase uses **"Voluntas"** everywhere — user said **"Volotion"** (likely rebrand). Confirm spelling before mass rename.

**Voluntas project today:**
- "Voluntas Client and Investment Management Platform"
- LIVE, 21 clients, 85% onboarding saved
- URL: voluntas.web.app
- Testimonial: Jason Holdsworth

**Other portfolio categories:** Strategic Research, industry cards, testimonials

---

## Requested changes

### Volotion (was Voluntas)
- Rename across portfolio + homepage teaser
- **New video** for client platform — user will produce asset; wire into portfolio card
- Confirm live URL if changed from voluntas.web.app

### New portfolio piece
- **SOP AI analysis software demo for construction firms**
- Status: demo / visualization platform — **not full production build yet**
- Purpose: helped client understand where to invest and what's possible
- User will supply content in follow-up chat

### General
- Remove fluff from portfolio copy
- Keep real outcomes where verified (85% onboarding may stay on Volotion card, not hero)

---

## Files likely to change

```
app/portfolio/page.tsx
components/homepage/portfolio-section.tsx
public/videos/  (new Volotion video)
app/think-global-voluntas/page.tsx  (only if partner branding changes — may stay Voluntas)
docs/  (any hardcoded references)
```

---

## Open questions

1. **Volotion vs Voluntas** — exact client brand spelling
2. New video file name / format
3. SOP construction client — name anonymised or named?
4. Screenshots/demo URL for SOP project?
5. Does Think Global partner page stay separate?

---

## Research prompt (paste into new chat)

```
FieldPorter portfolio updates:

1. Rename Voluntas client platform to Volotion (confirm spelling with user).
2. Add new case study: demo/visualization platform for SOP AI analysis for construction firms — pre-build engagement, helped client decide investment areas.
3. Cut marketing fluff from portfolio cards.

Research task:
1. How to present "demo / prototype" work credibly without overselling as shipped product.
2. Portfolio card structure: problem → what we built → outcome → status badge (Demo vs Live).

Files: app/portfolio/page.tsx, components/homepage/portfolio-section.tsx

User will supply Volotion video + SOP copy separately.

Return: card copy template + implementation plan. Then implement.
```

---

## Acceptance criteria

- [ ] Volotion naming consistent (per confirmed spelling)
- [ ] New video embedded where appropriate
- [ ] SOP construction demo case visible on portfolio
- [ ] Demo vs Live clearly labelled
- [ ] `npm run build` passes
