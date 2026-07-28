# Task brief — About page equal card heights (Process + AI Training)

## 1. Goal

On `/about`, the three Our Process cards and the three AI Training & Implementation cards each share one uniform row height on desktop (matching the tallest card in that row).

## 2. Folder

`Documentation/reviews/ux/2026-07-28-about-equal-card-heights/`

## 3. Change scope

**Pattern (2 surfaces)** — Same missing `h-full` height chain on two adjacent About sections. User named both. No new tokens or globals.css changes.

**Implement against:** workspace-root live/git-tracked files (`components/about/*`). Do not edit the nested untracked `FIELDPORTER.COM/` duplicate.

## 4. Chosen approach

**Option A — Grid stretch + `h-full` flex column** (research recommendation).

Propagate CSS grid row stretch into each card via `h-full` on the Framer Motion wrapper and inner panel, plus `flex flex-col` so shorter cards fill to the tallest sibling. Matches `component-patterns` equal-height recipe and existing `results-section.tsx` / `blog-grid.tsx`.

### Locked decisions

| Question                       | Decision                                                  | Basis                                        |
| ------------------------------ | --------------------------------------------------------- | -------------------------------------------- |
| Implement target               | Workspace-root `components/about/*` (live app on `:3000`) | Research recommendation + measured DOM       |
| Contact + AIOS same pattern    | **Defer**                                                 | Smallest safe fix; user scoped About only    |
| Nested `FIELDPORTER.COM/` copy | **Ignore** this pass                                      | Not the running app; optional Sam sync later |
| TechStack grid                 | Out of scope                                              | Not named by user                            |
| Fixed `min-h-*`                | Do not use                                                | Fragile vs copy edits                        |

## 5. Rejected options

| Option                              | Why not                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| **B — Fixed `min-h-[…]`**           | Breaks when copy/font/viewport change; fights “match tallest” intent |
| **C — Systemic `.card-grid-equal`** | Overscope for two About sections                                     |

## 6. Similar surfaces map

| Cluster                          | Route                    | File                                        | In scope? | Action         |
| -------------------------------- | ------------------------ | ------------------------------------------- | --------- | -------------- |
| About — Our Process              | `/about`                 | `components/about/systematic-approach.tsx`  | **Yes**   | Apply Option A |
| About — AI Training              | `/about`                 | `components/about/technical-capability.tsx` | **Yes**   | Apply Option A |
| About — Tech stack               | `/about`                 | `components/about/tech-stack.tsx`           | No        | Leave          |
| Contact process steps            | `/contact`               | `components/contact/contact-methods.tsx`    | Defer     | Leave          |
| AIOS steps                       | `/aios`                  | `app/aios/page.tsx`                         | Defer     | Leave          |
| Services results / Insights blog | `/services`, `/insights` | already `h-full`                            | No        | Reference only |

## 7. Files to change

| File                                        | Change                                                                                                      |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `components/about/systematic-approach.tsx`  | `items-stretch` on grid; `h-full` on motion wrapper + card; `flex flex-col flex-1 min-h-0` on inner content |
| `components/about/technical-capability.tsx` | Same height-chain classes on grid / wrapper / card / inner content                                          |

## 8. Do not touch

- Nested `FIELDPORTER.COM/` duplicate tree
- `hosting/` stub
- `globals.css`, design tokens, section rhythm classes
- Copy / titles / outcome strings in either data array
- Motion props (`whileHover`, stagger, viewport)
- Process connector markup (verify only after stretch)
- `tech-stack.tsx`, heroes, CTAs, Contact, AIOS
- Chatbot / knowledge / Firebase / APIs
- Strategic Research fold (separate SAM's CHANGES item)

## 9. Token / spacing map

**N/A for tokens** — layout classes only; no new spacing scale or hex.

| Location                    | Current                                                    | Planned                            | Effect                        |
| --------------------------- | ---------------------------------------------------------- | ---------------------------------- | ----------------------------- |
| Process grid (~L52)         | `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12` | Add `items-stretch`                | Documents stretch intent      |
| Process `motion.div` (~L61) | `relative group`                                           | `relative group h-full`            | Fills grid cell               |
| Process card (~L63–64)      | `relative p-6 md:p-8 rounded-2xl …`                        | Add `h-full flex flex-col`         | Panel matches tallest sibling |
| Process content (~L68)      | `relative z-10 space-y-4 md:space-y-6`                     | Add `flex flex-col flex-1 min-h-0` | Top-aligned copy; slack below |
| AI grid (~L57)              | `grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12`          | Add `items-stretch`                | Same                          |
| AI `motion.div` (~L66)      | `relative group`                                           | `relative group h-full`            | Same                          |
| AI card (~L68–69)           | `relative p-5 md:p-8 rounded-2xl …`                        | Add `h-full flex flex-col`         | Same                          |
| AI content (~L73)           | `relative z-10 space-y-6`                                  | Add `flex flex-col flex-1 min-h-0` | Same                          |

**Gaps / padding unchanged:** Process `gap-6 md:gap-8 lg:gap-12`, `p-6 md:p-8`; AI `gap-8 lg:gap-12`, `p-5 md:p-8`.

## 10. Visual acceptance criteria

1. **Desktop 1280px — Process:** Cards 01–03 identical outer height; bottom edges flush. Before: ~346 / 298 / 378.
2. **Desktop 1280px — AI Training:** Three cards identical outer height. Before: ~422 / 370 / 318.
3. **Content alignment:** Numbers/icons, titles, body (and AI outcome lines) top-aligned; shorter cards show empty space below, not clipped text.
4. **Process connectors:** Horizontal connectors still at vertical midline between cards.
5. **Hover:** `y: -8` / `scale: 1.02` still works; no overflow clipping.
6. **Mobile 375px:** Single-column stacks; each card content-height; gaps unchanged.
7. **Themes:** Criteria 1–5 pass in light and dark.
8. **Adjacent sections:** Company Foundation above and TechStack below keep current `section-rhythm-lg` spacing.

## 11. Implementation steps

1. Edit `components/about/systematic-approach.tsx`:
   - Grid: add `items-stretch`
   - `motion.div`: add `h-full`
   - Card panel: add `h-full flex flex-col`
   - Inner `z-10` content: add `flex flex-col flex-1 min-h-0`
2. Edit `components/about/technical-capability.tsx` with the same four class changes (keep existing `p-5 md:p-8` and hover shadow classes).
3. Do not change data arrays, connectors, or motion props.
4. Visual QA per §10 / §15 (Playwright measure heights ≈ equal within 1px).
5. `npm run build && npm run lint` from app root (workspace root for live site).
6. Write `implementation-summary.md`; update README + SAM's CHANGES; append known-bug-patterns if needed.

## 12. Behaviour contract

| Before                              | After                                     |
| ----------------------------------- | ----------------------------------------- |
| Process cards uneven (~346/298/378) | Process cards equal height (tallest wins) |
| AI cards uneven (~422/370/318)      | AI cards equal height (tallest wins)      |
| Mobile content-height stack         | Unchanged                                 |
| Hover / connectors / copy           | Unchanged                                 |

**Must NOT change:** section order, copy, border colors, motion timing, section rhythm, padding/gaps, nested duplicate tree.

## 13. Flow-on effects

| Area                             | Mitigation                                       |
| -------------------------------- | ------------------------------------------------ |
| Process connectors after stretch | Visual check criterion 4                         |
| Hover scale clipping             | Criterion 5                                      |
| Future copy edits                | Dynamic stretch auto-adjusts — preferred         |
| Contact / AIOS still uneven      | Deferred; leave in SAM's CHANGES if logged       |
| Nested duplicate still diverges  | Ignore this pass; Sam may sync later             |
| Known bug pattern #2             | Mark Process + AI Training fixed after implement |

## 14. Visual regression routes

| Route    | Viewport | Theme | Check              |
| -------- | -------- | ----- | ------------------ |
| `/about` | 1280px   | Light | Criteria 1–5, 8    |
| `/about` | 1280px   | Dark  | Criteria 1–5, 7    |
| `/about` | 375px    | Light | Criterion 6        |
| `/about` | 375px    | Dark  | Criterion 6 (spot) |

Spot-check only: Company Foundation + TechStack spacing unchanged.

## 15. Manual test plan

1. `/about` @ 1280 light → scroll Process → equal heights, connectors, hover.
2. Same viewport → scroll AI Training → equal heights, hover.
3. Toggle dark @ 1280 → repeat 1–2.
4. `/about` @ 375 → both sections stack cleanly; no forced equal height.
5. Toggle theme on mobile → no layout jump.
6. Scroll full About page → adjacent section spacing OK.

## 16. Build & docs on complete

```bash
cd /Users/samal/FIELDPORTER.COM && npm run build && npm run lint
```

Then: `implementation-summary.md`, README status → Done (or Partial if QA pending), update `SAM's CHANGES.md`, append/refresh known-bug-patterns entry #2.

## 17. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-28-about-equal-card-heights/
Out of scope: nested FIELDPORTER.COM/ duplicate, hosting/ stub, TechStack, Contact, AIOS, globals.css tokens, copy/IA, chatbot/knowledge, motion/connectors beyond height stretch
```
