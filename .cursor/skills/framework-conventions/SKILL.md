---
name: framework-conventions
description: >-
  FIELDPORTER project conventions — file structure, naming, imports, state,
  and build patterns. Use when implementing UI fixes so code matches the repo.
---

# Framework Conventions — FIELDPORTER

## App root

All site code: **`FIELDPORTER.COM/`** (not repo-root `hosting/`).

```bash
cd FIELDPORTER.COM && npm run dev|build|lint
```

## File structure

```
FIELDPORTER.COM/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout, providers
│   ├── globals.css         # Tokens + utilities
│   └── <route>/page.tsx
├── components/
│   ├── ui/                 # shadcn primitives
│   ├── layout/             # Header, footer, page wrapper
│   ├── homepage/           # Homepage sections
│   ├── about/              # About sections
│   ├── services/           # Services sections
│   ├── portfolio/          # Portfolio sections
│   └── insights/           # Blog/insights
├── config/constants.ts     # Marketing copy constants
├── hooks/                  # useReducedMotion, useDeviceCapability, etc.
├── lib/                    # Utils, Firebase, chat, knowledge base
└── types/
```

## Naming

- Components: PascalCase files, named export matching filename
- Client components: `"use client"` at top when using hooks, motion, browser APIs
- Pages: default export `Page` or route name in `app/*/page.tsx`
- CSS: Tailwind utilities first; semantic classes in `@layer components` in globals.css

## Imports

```tsx
import { Button } from "@/components/ui/button";
import { HERO_HEADLINE } from "@/config/constants";
import { cn } from "@/lib/utils";
```

## State & data

- Theme: class on `<html>` via theme provider / toggle
- Forms: controlled state + zod validation where present
- Copy: prefer `config/constants.ts` for repeated marketing strings
- Knowledge sync: if copy/IA changes → `lib/company-knowledge.ts`, `lib/chatbot-knowledge-base.ts`

## Motion

- Framer Motion for section reveals; wrap with `useReducedMotion()` check
- 3D heroes: dynamic import `{ ssr: false }` with loading skeleton
- Do not re-enable `scroll-behavior: smooth` on html (scroll freeze history)

## Change scope (from UX workflow)

| Scope         | When to edit                     |
| ------------- | -------------------------------- |
| **Systemic**  | Site-wide tokens → `globals.css` |
| **Localized** | Single component/page only       |
| **Chrome**    | Header, footer, nav geometry     |

## Smallest diff rules

1. Reuse existing components and rhythm classes
2. No Firebase/API/backend changes for pure UI fixes
3. Fix parallel surfaces when same pattern grep-matches (see similar-surfaces in research)
4. Run `npm run lint` after TS/JS changes. Never `npm run build` while `next dev` is running (corrupts `.next` → white screen). Only build when Sam asks and no dev server is active.
5. Leave a manual check list for Sam — do not open browser MCP or run ui:capture unless asked; code change alone is agent-done when lint passes

## Documentation on fix

Append to `.cursor/skills/known-bug-patterns/SKILL.md` when fixing a recurring pattern.

Optional: log in `Documentation/reviews/ux/` for large changes (existing workflow).
