---
name: a11y-checklist
description: >-
  WCAG 2.1 AA checklist tailored to FIELDPORTER Next.js + Tailwind + Radix
  stack. Use for accessibility audits and fixes.
---

# A11y Checklist — WCAG 2.1 AA

Stack: Next.js, Tailwind, Radix/shadcn, Framer Motion.

## 1. Perceivable

- [ ] **1.4.3 Contrast** — Normal text ≥ 4.5:1; large text (≥18px bold / 24px) ≥ 3:1. Check light AND dark themes.
- [ ] **1.4.11 Non-text contrast** — UI boundaries, focus rings, icons ≥ 3:1 against adjacent colors.
- [ ] **1.1.1 Alt text** — Meaningful `alt` on `<Image>`; decorative images `alt=""`.
- [ ] **1.4.4 Resize** — No horizontal scroll at 200% zoom; body ≥ 16px on mobile inputs.
- [ ] **1.4.10 Reflow** — Content reflows at 320px width without two-axis scroll.
- [ ] **1.4.12 Text spacing** — Content survives increased letter/word/line spacing.

## 2. Operable

- [ ] **2.1.1 Keyboard** — All interactive elements reachable via Tab; no keyboard traps.
- [ ] **2.4.3 Focus order** — Logical tab order matches visual order.
- [ ] **2.4.7 Focus visible** — `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` on custom controls.
- [ ] **2.5.5 Target size** — Touch targets ≥ 44×44px (`min-h-[44px] min-w-[44px]`).
- [ ] **2.3.1 Three flashes** — No flashing content > 3/sec.
- [ ] **2.3.3 Motion** — Respect `prefers-reduced-motion` (project hook: `useReducedMotion()`).

## 3. Understandable

- [ ] **3.3.1 Error identification** — Form errors named in text, not color alone.
- [ ] **3.3.2 Labels** — Every input has visible `<Label>` or `aria-label`.
- [ ] **3.2.4 Consistent identification** — Same icons/labels for same functions.
- [ ] **1.3.1 Info & relationships** — Headings sequential (h1 → h2 → h3); lists use `<ul>/<ol>`.

## 4. Robust

- [ ] **4.1.2 Name, role, value** — Radix components keep default ARIA; custom widgets need roles.
- [ ] **4.1.3 Status messages** — Loading/error use `aria-live="polite"` where appropriate.

## FIELDPORTER-specific checks

| Area                              | Check                                                           |
| --------------------------------- | --------------------------------------------------------------- |
| Theme toggle                      | Announces state; icon + sr-only label                           |
| Hero 3D                           | Decorative — must not block screen readers; text remains in DOM |
| Chat widget                       | Focus trap, escape to close, visible focus                      |
| Tab controls (services/portfolio) | `role="tablist"`, `aria-selected`, keyboard arrows              |
| Framer Motion                     | `useReducedMotion()` → skip or simplify motion                  |

## Verification tools

```bash
cd FIELDPORTER.COM && npm run lint   # eslint-plugin-jsx-a11y
# Sam does keyboard / visual checks in the browser — do not open browser MCP unless asked
```

## Fix priority

1. **Critical** — Blocks keyboard users or fails contrast on primary CTA/copy
2. **Major** — Missing labels, wrong heading order, small touch targets on main actions
3. **Minor** — Secondary links, decorative contrast, redundant ARIA
