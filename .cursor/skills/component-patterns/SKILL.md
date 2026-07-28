---
name: component-patterns
description: >-
  Canonical FIELDPORTER UI component patterns for buttons, inputs, cards, nav,
  modals, and sections. Use when building or fixing UI so agents reuse shared
  components instead of one-offs.
---

# Component Patterns — FIELDPORTER

App root: `FIELDPORTER.COM/`. Import alias: `@/`.

## Buttons

**Source:** `components/ui/button.tsx` (shadcn + CVA)

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="invert">Light CTA on dark bg</Button>
<Button variant="ghost">Tertiary</Button>
```

Rules:

- `min-h-[48px]` on primary CTAs (`.cta-primary` utility)
- Never raw `<button className="bg-blue-500">` — extend `Button` variants
- Include hover, focus-visible ring, disabled opacity

## Inputs & forms

**Source:** `components/ui/input.tsx`, `label.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`

Use `.form-input` from globals.css for enterprise styling. Pair every input with `<Label htmlFor=…>`.

Forms live in page sections or `components/contact/`, `components/homepage/ai-audit-section.tsx`.

## Cards

| Pattern               | Class / component                                         |
| --------------------- | --------------------------------------------------------- |
| Section card          | `.card-section` + optional `.card-section-hover`          |
| Grid equal height     | Parent `grid` + child `h-full` on wrapper AND inner panel |
| Service/process cards | Match `services-section.tsx` or `results-section.tsx`     |

**Equal-height grid fix:**

```tsx
<div className="grid md:grid-cols-3 gap-6">
  {items.map((item) => (
    <motion.div key={item.id} className="relative group h-full">
      <div className="card-section h-full flex flex-col">…</div>
    </motion.div>
  ))}
</div>
```

## Layout shell

| Piece        | File                                 |
| ------------ | ------------------------------------ |
| Page wrapper | `components/layout/page-wrapper.tsx` |
| Header / nav | `components/layout/header.tsx`       |
| Footer       | `components/layout/footer.tsx`       |
| Theme toggle | `components/layout/theme-toggle.tsx` |

Pages compose: `<PageWrapper>` → sections with `section-rhythm-*`.

## Modals / dialogs

**Source:** `components/ui/dialog.tsx` (Radix)

Focus trap, `DialogTitle`, `DialogDescription` required for a11y.

## Navigation

- Desktop: horizontal links in header
- Mobile: hamburger → sheet/drawer pattern
- Active route: match existing `usePathname()` styling in header

## Section template

```tsx
<section className="relative section-rhythm-lg overflow-hidden">
  <div className="content-container">
    <span className="section-badge">Label</span>
    <h2 className="section-headline mt-4">Title</h2>
    <p className="section-copy mt-4 max-w-2xl">Body</p>
  </div>
</section>
```

## Anti-patterns (do not create)

- Duplicate button styles inline
- `min-h-screen` on heroes when content below fold matters (portfolio)
- White gradient text without `dark:` pair
- Fixed heights that clip dynamic copy
- New spacing utilities when `section-rhythm-*` exists
