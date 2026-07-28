# Task brief — About page “Our Process” equal card heights

## 1. Goal

On `/about`, the three “Our Process” step cards render at the same height on desktop, matching the tallest card (step 03), so the row looks even and aligned.

## 2. Folder

`Documentation/reviews/ux/2026-07-01-about-process-card-height/`

## 3. Change scope

**Localized** — user scoped the About page “Our Process” three text boxes only. Single-component height stretch; no site-wide token or spacing changes.

**App code root:** `FIELDPORTER.COM/` (command templates say `hosting/`; that directory is a stub — all paths below use the live app).

## 4. Chosen approach

**Option A — Grid stretch + `h-full` flex column** (from research). Add `h-full` to the grid item wrapper and inner card panel so CSS grid row stretch propagates to all three boxes. Row height is content-driven by step 03 (longest title + description), matching the user’s “make them the size of the third text box” intent without a brittle fixed `min-h-*`. Matches patterns already used in `results-section.tsx` and `blog-grid.tsx`.

## 5. Rejected options

| Option                                             | Reason                                                               |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| **B — Fixed `min-h-[...]`**                        | Fragile on copy/font changes; doesn’t dynamically track tallest card |
| **C — Systemic `.card-grid-equal` in globals.css** | Over-scoped for one localized section                                |

## 6. Similar surfaces map (from research)

| Surface cluster                      | Route(s)    | File(s)                                                    | Same pattern?          | In scope? | Planned change                                                                   |
| ------------------------------------ | ----------- | ---------------------------------------------------------- | ---------------------- | --------- | -------------------------------------------------------------------------------- |
| **About — Our Process**              | `/about`    | `FIELDPORTER.COM/components/about/systematic-approach.tsx` | Yes                    | **Yes**   | `h-full` on grid children + inner card; optional `flex flex-col` for stable fill |
| About — AI Training & Implementation | `/about`    | `components/about/technical-capability.tsx`                | Yes                    | **Defer** | User scoped “Our Process” only; same fix can be copied in a follow-up            |
| Homepage services cards              | `/`         | `services-section.tsx`                                     | Partial (`min-h-*`)    | No        | Already uniform via fixed min-heights                                            |
| Services results                     | `/services` | `results-section.tsx`                                      | Partial (has `h-full`) | No        | Already correct                                                                  |
| Insights blog grid                   | `/insights` | `blog-grid.tsx`                                            | Partial (has `h-full`) | No        | Already correct                                                                  |

## 7. Files to change

| File                                                       | Change                                         |
| ---------------------------------------------------------- | ---------------------------------------------- |
| `FIELDPORTER.COM/components/about/systematic-approach.tsx` | Equal-height card stretch (only in-scope file) |

**Not changing:** `globals.css`, copy/data arrays, nav/footer, knowledge files, other About sections.

**Copy-only, no chatbot update needed** — no wording changes.

## 8. Do not touch

- `hosting/` stub app
- Auth, APIs, Firebase config, env
- Chatbot backend / knowledge base files
- `technical-capability.tsx`, `tech-stack.tsx`, `about-hero.tsx`, `about-cta.tsx`
- Strategic Research fold / 3-step IA changes (separate SAM's CHANGES item)
- Connector line positioning logic beyond verifying it still aligns after stretch
- Framer Motion timing, hover scale, or section rhythm classes

## 9. Token map

**N/A** — Change scope is **Localized**. No `globals.css` variable changes.

## 10. Spacing map

| Location                       | Current classes                                            | Planned classes                                               | Expected visual effect                                                                      |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Process grid                   | `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12` | Add explicit `items-stretch` (redundant but documents intent) | Grid row uses full stretch behaviour on md+                                                 |
| Grid item (`motion.div`)       | `relative group`                                           | `relative group h-full`                                       | Item fills grid cell height                                                                 |
| Card panel (`div` with border) | `relative p-6 md:p-8 rounded-2xl …`                        | Add `h-full flex flex-col`                                    | Panel stretches to match tallest sibling (step 03)                                          |
| Inner content block            | `relative z-10 space-y-4 md:space-y-6`                     | Optional: `flex flex-col flex-1` on content wrapper           | Title/description stay top-aligned; extra height is empty space below copy in shorter cards |

**Geometry targets (desktop ≥768px):**

- Cards 01 and 02 outer border boxes match card 03 height within ±0px (same row).
- Horizontal connector lines (`top-1/2`) remain vertically centered on each card edge.
- Grid gap unchanged: 24px (`gap-6`) → 32px (`md:gap-8`) → 48px (`lg:gap-12`).
- Internal padding unchanged: `p-6 md:p-8`.
- Typography classes unchanged: titles `text-xl md:text-2xl`, body `text-sm md:text-base`.

**Motion:** Preserve `whileHover={{ y: -8, scale: 1.02 }}` and stagger delays — height change only.

## 11. Visual acceptance criteria

1. **Desktop (1280px) — equal heights:** Scroll to “Our Process” on `/about`. Cards 01, 02, and 03 share identical outer box height in one row. Before: cards 01–02 visibly shorter than 03. After: flush bottom edges aligned.

2. **Desktop (1280px) — content alignment:** Step numbers, titles, and descriptions remain top-aligned within each card; shorter cards show neutral empty space below body copy (not clipped text).

3. **Desktop (1280px) — connectors:** Horizontal gradient connectors between cards 01→02 and 02→03 still appear at vertical midline of each card.

4. **Desktop (1280px) — hover:** Hover lift/scale on any card still works; no overflow clipping from parent.

5. **Mobile (375px) — stacked layout:** Three cards stack full-width; each card height follows its own content (no forced equal height when not in 3-column row). Before/after: no regression in spacing between stacked cards (`gap-6`).

6. **Light + dark themes:** Criteria 1–4 pass in both theme modes.

7. **Adjacent sections unchanged:** “The Engine Behind The Results” above and “AI Training & Implementation” below retain current spacing (`section-rhythm-lg`); no new double-padding.

## 12. Implementation steps

1. Open `FIELDPORTER.COM/components/about/systematic-approach.tsx`.

2. **Grid container (L52):** Add `items-stretch` to the grid class list (optional clarity; grid default is stretch).

3. **Grid item wrapper (L61):** Append `h-full` to `motion.div` `className` (`relative group h-full`).

4. **Card panel (L64):** Append `h-full flex flex-col` to the bordered inner `div` className (keep all existing border/bg/padding classes).

5. **Inner content (L68, optional but recommended):** On `div.relative.z-10.space-y-*`, add `flex flex-col flex-1 min-h-0` so flex column fill is stable.

6. **Do not change** copy in `systematicApproach` array, connector markup, or motion props.

7. Run build + lint (see §18). Visual QA per §11 and §17.

## 13. Design checklist

- [x] Uses existing section rhythm (`section-rhythm-lg`) — no new spacing tokens
- [x] 8px grid respected — no new arbitrary pixel gaps; only height fill
- [x] Framer Motion wrappers accounted for (`motion.div` gets `h-full`)
- [x] No new one-off `min-h-[…]` unless stretch fails in QA (fallback only)

## 14. Behaviour contract

| Before                               | After                                                   |
| ------------------------------------ | ------------------------------------------------------- |
| Desktop: cards 01–02 shorter than 03 | Desktop: all three cards same row height (tallest = 03) |
| Mobile: content-height cards         | Mobile: unchanged stacked layout                        |
| Hover animation on cards             | Unchanged                                               |
| Connector lines between cards        | Unchanged position (verify visually)                    |

**Must NOT change:**

- Routing, page structure, or section order on `/about`
- Process step copy, titles, or numbering
- Animation variants, stagger timing, `viewport={{ once: true }}`
- Section vertical rhythm (`section-rhythm-lg`, heading `mb-12 md:mb-16`)
- Border colors per step (blue / purple / green)

## 15. Flow-on effects

| Area                                    | Mitigation                                                                |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `technical-capability.tsx` still uneven | Deferred; note in SAM's CHANGES if user wants same-page consistency later |
| Hover scale clipping                    | Card panel already in `overflow-hidden` section — verify criterion 4      |
| Future copy edits to step 03            | Dynamic stretch auto-adjusts row height — preferred over fixed min-height |
| Strategic Research fold (future)        | Separate content task; re-check card heights after copy/IA change         |

## 16. Visual regression routes

| Route    | Why                                        | Viewports     | Themes       |
| -------- | ------------------------------------------ | ------------- | ------------ |
| `/about` | Only in-scope surface — “Our Process” grid | 375px, 1280px | Light + dark |

**Spot-check only (unchanged code, confirm no accidental drift):**

| Route                                   | Check                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------ |
| `/about` — Company Foundation           | Section above process unchanged                                          |
| `/about` — AI Training & Implementation | Section below process unchanged (still may show uneven cards — deferred) |

Min 3 checks satisfied via `/about` light desktop, `/about` light mobile, `/about` dark desktop.

## 17. Manual test plan

1. Open `/about` at 1280px → scroll to “Our Process” → verify criteria 1–4 (equal card heights, top-aligned copy, connectors, hover).
2. Toggle **dark** theme at 1280px → repeat step 1 (criterion 6).
3. Open `/about` at 375px → verify criterion 5 (stacked cards, normal spacing).
4. Toggle light ↔ dark on process section → no layout jump on card heights.
5. Scroll up/down through About page → verify criterion 7 (adjacent sections spacing unchanged).

## 18. Build & docs

```bash
cd FIELDPORTER.COM && npm run build
cd FIELDPORTER.COM && npm run lint
```

On completion (`/ux-implement`):

- Write `implementation-summary.md` in this folder
- Update folder `README.md` status → Done
- Update `Documentation/reviews/ux/README.md` row → Done
- Add entry to `SAM's CHANGES.md` under Design & UX when Sam logs the finding (or update if entry added during implement)

## 19. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-01-about-process-card-height/
Out of scope: hosting/ stub, technical-capability.tsx, globals.css tokens, copy/IA changes, chatbot/knowledge files, Strategic Research fold
```
