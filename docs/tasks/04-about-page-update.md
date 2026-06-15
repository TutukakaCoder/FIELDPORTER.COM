# Task 04: About Page Update

## Goal

Update `/about` to reflect team leadership: **Freddy Hopkins** and **Sam Allais** (user will supply bios/details in follow-up chat). Reduce AI-first framing where it misrepresents the company.

---

## Current state (code)

| Area | File | Current |
|------|------|---------|
| About page | `app/about/page.tsx` | Composes sections |
| Hero | `components/about/about-hero.tsx` | "AI Integration & Automation" |
| Foundation / team | `components/about/company-foundation.tsx` | **Freddy Hopkins only** — hybrid model, strategy in-house |
| Approach | `components/about/systematic-approach.tsx` | Includes "Strategic Research" step |
| Technical capability | `components/about/technical-capability.tsx` | Training focus |
| Tech stack | `components/about/tech-stack.tsx` | Tools list |
| CTA | `components/about/about-cta.tsx` | |

No dedicated team grid component exists today.

---

## Requested changes

- Add **Sam Allais** as co-lead / team member alongside Freddy
- User will provide titles, bios, photos, LinkedIn in separate chat
- Tone: software company run by named founders, not faceless AI consultancy
- Possibly soften "AI Integration & Automation" hero subtitle
- Align systematic approach steps with software-first positioning (Task 01)

---

## Files likely to change

```
components/about/company-foundation.tsx  (primary — add second person)
components/about/about-hero.tsx
components/about/systematic-approach.tsx  (optional copy pass)
app/about/page.tsx  (if new Team section component added)
public/  (new headshots if provided)
```

---

## Open questions

1. Sam's title, bio, photo asset path
2. Equal co-founders vs "led by Freddy, Sam leads X"
3. Show other team / contractors or founders only?
4. Update structured data / schema for organization?

---

## Research prompt (paste into new chat)

```
FieldPorter about page update. Adding Sam Allais alongside Freddy Hopkins as team leadership. Software company positioning.

Research task:
1. About page patterns for 2-person boutique software studios — layout (side-by-side vs stacked on mobile).
2. Copy tone: credible founder-led dev shop vs AI consultancy.
3. What to include: photo, name, role, 2–3 line bio, optional link.

I will provide Sam's bio and photo separately.

Files: components/about/company-foundation.tsx, about-hero.tsx

Return: recommended section structure + placeholder copy slots. Then implement when I supply details.
```

---

## Acceptance criteria

- [ ] Both Freddy and Sam visible on about page
- [ ] Mobile layout clean
- [ ] Copy consistent with software-first site positioning
- [ ] `npm run build` passes
