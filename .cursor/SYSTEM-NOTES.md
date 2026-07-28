# UI/UX Agent System — Stack Notes

Last updated: 2026-07-28

## App locations

| Path                   | Role                                                                             |
| ---------------------- | -------------------------------------------------------------------------------- |
| **`FIELDPORTER.COM/`** | **Primary marketing site** — Next.js 14 App Router, all UI/UX work happens here  |
| `hosting/`             | Firebase "coming soon" placeholder — plain CSS, **not** the design system target |
| Repo root              | Docs, Firebase config, UX review folders                                         |

> All UI/UX commands target **`FIELDPORTER.COM/`** (not the `hosting/` stub).

## Framework & styling

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS 3.4 + custom utilities in `FIELDPORTER.COM/app/globals.css`
- **Component library:** shadcn/ui (Radix primitives) — `FIELDPORTER.COM/components/ui/`
- **Animation:** Framer Motion; 3D heroes via `@react-three/fiber` + drei
- **Icons:** lucide-react
- **Theme:** `darkMode: 'class'` — default dark; light via `html` without `.dark`
- **Design tokens:** CSS variables in `globals.css` (`:root` / `.dark`) + `tailwind.config.ts` extensions

## Key token files

- `FIELDPORTER.COM/app/globals.css` — shadcn vars, section rhythm, semantic typography
- `FIELDPORTER.COM/tailwind.config.ts` — brand colors, spacing scale, breakpoints, shadows
- Skill: `.cursor/skills/design-tokens/SKILL.md`

## Breakpoints (audit these)

| Name | Width  | Use             |
| ---- | ------ | --------------- |
| xs   | 320px  | iPhone SE       |
| sm   | 375px  | Standard mobile |
| md   | 768px  | Tablet          |
| lg   | 1024px | Desktop         |
| xl   | 1280px | Large desktop   |

## Marketing routes (full-sweep scope)

```
/  /about  /services  /portfolio  /insights  /contact  /aios
/think-global-voluntas  /privacy-policy  /terms-of-service
/insights/real-cost-not-automating
/insights/vc-portfolio-optimization
/insights/why-ai-consulting-fails
```

Exclude: `/admin/*`, API routes.

## Surface clusters

Homepage · Services · About · Portfolio · Insights · Shared (header/footer/nav/chat)

## Visual QA (Sam-owned)

- **Do not** open browser MCP or run `ui:capture` unless Sam explicitly asks.
- Agents analyze source and make code changes; Sam does visual testing.
- Optional tooling still exists (`npm run ui:capture`, Playwright) but is **opt-in only**.
- After fixes: **lint** + short manual check list; status usually Partial — pending Sam visual QA.

## Dev-server safety (mandatory — prevents white screens)

Running `next build` / `npm run build` while `next dev` is up **overwrites `.next`** and causes chunk 404s → blank/white page in the browser.

**UX agents must NEVER:**

- Run `npm run build` / `next build` if anything is listening on ports 3000–3002 (Sam’s usual `next dev`)
- `rm -rf .next`
- Kill, restart, or rebind Sam’s `next dev` / ports 3000–3002
- Open browser MCP or `ui:capture` unless Sam asks

**Safe default verify for all UI/UX commands:**

```bash
# From marketing app root (repo root for this project)
npm run lint
```

Only run `npm run build` when Sam explicitly asks, or when no `next dev` is listening and a production compile check is required. If a brief still says “build && lint”, prefer **lint only** when dev is active and note that in the report.

If the site goes white: stop competing Next processes, delete `.next` once, restart a single `npm run dev` — do not do this mid-UX-fix unless Sam asks.

## Two UI/UX tracks

### Track A — Issue succession (scoped fixes you spotted)

Use when you found a specific problem and want research → plan → implement.

| Step | Command         | Writes                                                 | Code? |
| ---- | --------------- | ------------------------------------------------------ | ----- |
| 1    | `/ux-research`  | `Documentation/reviews/ux/<date>-<slug>/research.md`   | No    |
| 2    | `/ux-plan`      | `task-brief.md` in that folder                         | No    |
| 3    | `/ux-implement` | Code + `implementation-summary.md` + manual check list | Yes   |

Aliases (same commands): `/ux-issue-research`, `/ux-change-plan`.

### Track B — Fast audit / fix pipeline

Use when you want agents to scan a page and fix issues without a research folder.

| Command           | Role                                     |
| ----------------- | ---------------------------------------- |
| `/ui-fix`         | Full audit → fix → code verify (default) |
| `/ui-audit`       | Report only                              |
| `/design-review`  | Visual / design-system review            |
| `/a11y-fix`       | Accessibility fixes                      |
| `/responsive-fix` | Breakpoint / overflow fixes              |
| `/polish`         | Interaction + copy polish                |
| `/full-sweep`     | All marketing routes audit               |

## Agent system layout

```
.cursor/
├── SYSTEM-NOTES.md          ← this file
├── agents/                  ← 10 specialist subagents
├── commands/                ← slash commands (/ui-fix, etc.)
├── rules/                   ← always-apply agent rules
└── skills/                  ← shared design/a11y/convention knowledge
```
