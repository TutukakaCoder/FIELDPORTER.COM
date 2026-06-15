# Task 08: Design, Mobile & Theme Overhaul

## Goal

Premium, minimal feel site-wide. Fix mobile landing (especially hero). Improve 3D background. Audit light/dark mode visibility issues.

---

## Current state (code)

| Area | File | Notes |
|------|------|-------|
| Hero 3D | `components/homepage/hero-3d-background.tsx` | Full R3F particles |
| Simplified 3D | `hero-3d-background-simplified.tsx` | Lighter variant |
| Device tier | `hooks/use-device-capability.ts` | full / simplified / css-only |
| Mobile hero | `hero-section.tsx` | **Mobile uses `LightHeroBackground` — no 3D** |
| Page background | `app/page.tsx` | `UnifiedAuroraBackground` — static gradient blobs |
| Theme | `tailwind.config.ts` `darkMode: 'class'` | |
| Toggle | `components/ui/theme-toggle.tsx` | localStorage, default dark |
| Root | `app/layout.tsx` | `<html className="dark">` + inline script |
| Globals | `app/globals.css` | CSS variables, scrollbar |
| Known issue | `services-section.tsx` headline | Blue text where white expected in dark mode |

User preferences:
- Keep 3JS/R3F background animation in principle
- Maybe lighter overall — unsure, wants more premium/minimal
- Mobile landing needs better animation/background treatment
- Map all light/dark visibility bugs

---

## Requested changes

### Visual direction
- More premium, less busy
- Consider slightly lighter palette (user open to exploration)
- Background should feel cohesive desktop + mobile
- Minimal content density supports design pass (Task 01 reduces noise)

### Mobile landing
- Currently degrades to flat gradient — user wants nicer background on mobile
- Balance performance vs visual quality (`use-device-capability.ts`)

### Light / dark mode audit
- Find components with wrong contrast, invisible text, blue accents on dark headlines
- Document fixes page by page

### Not in scope here (separate task)
- Entrance video — see [09-entrance-animation.md](./09-entrance-animation.md)

---

## Files likely to change

```
components/homepage/hero-section.tsx
components/homepage/hero-3d-background.tsx
components/homepage/hero-3d-background-simplified.tsx
hooks/use-device-capability.ts
app/page.tsx
app/globals.css
tailwind.config.ts
components/homepage/services-section.tsx  (colour bug)
+ any components flagged in audit
```

Reference docs: `docs/technical/3d-background-system.md`, `docs/technical/hero-section-implementation.md`

---

## Open questions

1. Stay dark-default or push lighter premium aesthetic?
2. Accept simplified 3D on mid-tier mobile or push CSS animated alternative?
3. Full site audit or homepage + services first?

---

## Research prompt (paste into new chat)

```
FieldPorter design pass — premium minimal dev studio, dark glassmorphism, R3F particle hero. Mobile currently drops 3D for flat gradient.

Research task:
1. Reference 3–5 premium minimal B2B studio sites — what makes them feel "premium" (spacing, type, motion restraint, colour).
2. Mobile WebGL performance patterns: when to use simplified particles vs CSS mesh gradient vs static.
3. Light/dark audit checklist for Tailwind `dark:` class strategy.
4. Fix pattern for headline showing blue in dark mode (services-section.tsx).

Files: hero-section.tsx, hero-3d-background*.tsx, use-device-capability.ts, globals.css

Return: design direction memo (lighter vs current dark), mobile background recommendation, audit list of pages to check. Then implement homepage first.
```

---

## Acceptance criteria

- [ ] Mobile landing visually improved without major perf regression
- [ ] Headline colour bug fixed
- [ ] Light/dark audit completed with issues fixed or logged
- [ ] Background feels more premium/minimal
- [ ] `npm run build` passes
- [ ] Test on real mobile device or responsive emulation
