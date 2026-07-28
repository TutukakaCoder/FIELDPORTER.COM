---
name: design-tokens
description: >-
  FIELDPORTER design tokens — colors, spacing, typography, radius, shadows.
  Use when fixing UI styling, auditing visual consistency, or choosing class
  values. Never invent raw hex when a token exists.
---

# Design Tokens — FIELDPORTER

Read `.cursor/SYSTEM-NOTES.md` for app path (`FIELDPORTER.COM/`).

**Authority files:** `FIELDPORTER.COM/app/globals.css`, `FIELDPORTER.COM/tailwind.config.ts`

## Colors

### shadcn CSS variables (`globals.css`)

Light `:root` / dark `.dark`: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--card`, `--popover` (+ `-foreground` pairs).

Use via Tailwind: `bg-background`, `text-foreground`, `border-border`, etc.

### Brand

| Token | Value     | Tailwind                                      |
| ----- | --------- | --------------------------------------------- |
| Black | `#000000` | `fieldporter-black`, `text-fieldporter-black` |
| Blue  | `#0969DA` | `fieldporter-blue`                            |
| White | `#FFFFFF` | `fieldporter-white`                           |
| Gray  | `#6B7280` | `fieldporter-gray`                            |

Functional: `success`, `warning`, `error`, `info`.

### Theme-aware text (prefer these)

| Class               | Light           | Dark            |
| ------------------- | --------------- | --------------- |
| `.section-headline` | `text-gray-900` | `text-white`    |
| `.section-copy`     | `text-gray-600` | `text-gray-300` |
| `.section-badge`    | gray glass      | white glass     |

**Rule:** Pair every light/dark surface with `text-gray-900 dark:text-white` (headlines) and `text-gray-600 dark:text-gray-300` (body). Never white-only text on light backgrounds.

## Spacing (8px grid)

Tailwind spacing follows 8px base. Touch targets: `min-h-[44px]` minimum, `min-h-[48px]` premium (`touch-target`, `touch-target-premium`).

### Section rhythm (use instead of ad-hoc `py-*` on sections)

| Class                                  | Padding          |
| -------------------------------------- | ---------------- |
| `.section-rhythm` / `.section-padding` | `py-16 lg:py-24` |
| `.section-rhythm-tight`                | `py-12 lg:py-16` |
| `.section-rhythm-lg`                   | `py-20 lg:py-28` |
| `.section-rhythm-xl`                   | `py-24 lg:py-32` |
| `.section-rhythm-2xl`                  | `py-24 lg:py-40` |

### Containers

`.content-container` / `.section-container` → `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## Typography

Font: **Inter** (`font-sans`, `font-inter`).

| Scale                       | Use                    |
| --------------------------- | ---------------------- |
| `display-xl` … `display-sm` | Hero headlines (clamp) |
| `heading-xl` … `heading-sm` | Section titles         |
| `body-md` (16px min)        | Body — iOS zoom-safe   |
| `.section-headline`         | Standard section H2    |

## Radius & shadow

- `--radius: 0.5rem` → `rounded-lg/md/sm` via shadcn
- Cards: `rounded-2xl`, `.card-section`
- Shadows: `shadow-glass`, `shadow-glass-sm`, `shadow-glass-lg`, `shadow-mobile`

## Glass / cards

`.card-section` — `rounded-2xl p-6 md:p-8 backdrop-blur-md border border-gray-900/10 dark:border-white/10`

`.card-section-hover:hover` — subtle bg/border lift

## Fix discipline

1. **Systemic** color/spacing/radius → edit `globals.css` variables or rhythm classes
2. **Localized** → use existing semantic classes; no orphan hex
3. Grep for one-off overrides before declaring done
