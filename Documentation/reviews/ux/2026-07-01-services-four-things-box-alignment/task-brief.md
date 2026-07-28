# Task brief — Services page “Four Things We Do” box alignment

## 1. Goal

On `/services`, the four service selector boxes under “Four Things We Do” form a uniform grid with equal width and height per cell, so the row looks aligned and balanced at every breakpoint.

## 2. Folder

`Documentation/reviews/ux/2026-07-01-services-four-things-box-alignment/`

## 3. Change scope

**Localized** — user scoped the Services page “Four Things We Do” tab selector row only. Single-file layout change in `InteractiveServiceShowcase`; no site-wide token or spacing changes.

**App code root:** `FIELDPORTER.COM/` (command templates say `hosting/`; that directory is a stub — all paths below use the live app).

## 4. Chosen approach

**Option 1 — Grid equal cells on tab buttons** (from research). Replace the tab row `flex flex-wrap` with a CSS grid (`grid-cols-2 lg:grid-cols-4`, `items-stretch`, `max-w-5xl mx-auto`). Each `<button>` fills its cell (`w-full h-full min-h-[44px]`) with centered content and optional `line-clamp-2` for long titles at `lg`. Preserves tab + detail carousel UX with lowest regression risk; mirrors the About “Our Process” stretch pattern without changing page IA.

**Plan defaults** (research open questions resolved for v1):

| Question                            | Decision                                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Tab selectors vs full content cards | **Tab selectors** — keep carousel below                                                         |
| Desktop layout                      | **2×2** below `lg`; **1×4** at `lg+`                                                            |
| Long titles                         | **Two lines max** via `line-clamp-2`; use `lg:text-base` (keep `text-xs md:text-sm` below `lg`) |
| Portfolio tab parity                | **Defer** to follow-up                                                                          |
| Max width cap                       | **Yes** — `max-w-5xl mx-auto` on grid wrapper                                                   |

## 5. Rejected options

| Option                                          | Reason                                                          |
| ----------------------------------------------- | --------------------------------------------------------------- |
| **Option 2 — Grid + fixed `min-h-[72px]`**      | Brittle on copy/font changes; grid stretch should suffice       |
| **Option 3 — Always-visible 2×2 content cards** | High regression; changes interaction model; duplicates homepage |
| **Option 4 — Services + Portfolio in one pass** | Broader than user scope; Portfolio deferred                     |

## 6. Similar surfaces map (from research)

| Surface cluster                    | Route(s)     | File(s)                                    | Same pattern?           | In scope? | Planned change                                                 |
| ---------------------------------- | ------------ | ------------------------------------------ | ----------------------- | --------- | -------------------------------------------------------------- |
| **Services — Four Things tab row** | `/services`  | `FIELDPORTER.COM/app/services/page.tsx`    | Yes                     | **Yes**   | Flex → grid; `w-full h-full` buttons; label clamp/center       |
| Homepage services cards            | `/`          | `components/homepage/services-section.tsx` | Partial (content cards) | No        | Different UX; already uniform via `min-h-*`                    |
| Portfolio category tabs            | `/portfolio` | `app/portfolio/page.tsx`                   | Yes                     | **Defer** | User scoped Services only; replicate grid pattern in follow-up |
| About — Our Process                | `/about`     | `systematic-approach.tsx`                  | Partial (grid stretch)  | No        | Already fixed                                                  |
| About — AI Training                | `/about`     | `technical-capability.tsx`                 | Partial                 | No        | Out of scope                                                   |
| Services results grid              | `/services`  | `results-section.tsx`                      | Partial                 | No        | Not on live page stack                                         |

## 7. Files to change

| File                                    | Change                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `FIELDPORTER.COM/app/services/page.tsx` | Tab selector row grid layout + button stretch classes (only in-scope file) |

**Not changing:** `globals.css`, nav/footer, knowledge files, detail carousel, MethodologySection, FAQSection, Portfolio page.

**Copy-only, no chatbot update needed** — no wording changes.

## 8. Do not touch

- `hosting/` stub app
- Auth, APIs, Firebase config, env
- Chatbot backend / knowledge base files
- `AnimatePresence` detail panel, proof card, prev/next controls
- ServiceHero, MethodologySection, FAQSection spacing (separate SAM item)
- `app/portfolio/page.tsx` (deferred)
- `components/homepage/services-section.tsx`
- Hash anchor elements (`absolute -top-20` per service id)
- Button active/inactive color classes, focus rings, `onClick` / `setActiveService` logic

## 9. Token map

**N/A** — Change scope is **Localized**. No `globals.css` variable changes.

## 10. Spacing map

| Location              | Current classes                                                                      | Planned classes                                                                                                                            | Expected visual effect                                                                                |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Tab selector wrapper  | `flex justify-center gap-2 md:gap-3 lg:gap-6 mb-16 md:mb-20 lg:mb-32 flex-wrap px-4` | `grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-6 mb-16 md:mb-20 lg:mb-32 px-4 max-w-5xl mx-auto items-stretch`                     | Equal-width columns; 2×2 below `lg`, four equal columns at `lg+`; row capped at ~1024px content width |
| Tab `<button>`        | `min-h-[44px] px-4 md:px-4 lg:px-8 py-3 …` (content width)                           | Add `w-full h-full flex items-center justify-center text-center`; keep `min-h-[44px]`; reduce horizontal padding to `px-3 md:px-4 lg:px-4` | Each cell fills grid track; siblings in same row share height                                         |
| Button inner `<span>` | `flex items-center gap-1 md:gap-2 lg:gap-3`                                          | `flex items-center justify-center gap-1 md:gap-2 lg:gap-2 w-full`                                                                          | Icon + label centered in cell                                                                         |
| Title text spans      | `lg:text-lg` on button                                                               | `lg:text-base leading-snug line-clamp-2` on title spans                                                                                    | Longest title wraps to 2 lines max without breaking grid height parity                                |
| Section heading block | `mb-20 md:mb-32 lg:mb-40`                                                            | **Unchanged**                                                                                                                              | No change to title-to-tabs gap                                                                        |
| Detail panel below    | `grid lg:grid-cols-2 …`                                                              | **Unchanged**                                                                                                                              | Carousel behaviour unchanged                                                                          |

**Geometry targets:**

- **375px:** 2×2 grid; all four buttons equal width (~50% minus gap); row pair heights equal within each row (stretch).
- **768px:** Same 2×2; two-word labels; no ragged flex-wrap rows.
- **1280px:** 1×4 row; four buttons equal width (~25% minus gaps); single row height = tallest button (longest 2-line title).
- Tab row bottom margin to detail panel unchanged: 64px → 80px → 128px (`mb-16 md:mb-20 lg:mb-32`).
- Grid gaps unchanged from current intent: 8px → 12px → 24px (`gap-2 md:gap-3 lg:gap-6`).

**Motion:** No animation on tab row. Preserve `AnimatePresence` fade on detail panel below — unchanged.

## 11. Visual acceptance criteria

1. **Desktop (1280px) — equal widths:** On `/services`, scroll to “Four Things We Do”. Four tab buttons sit in one row with identical widths. Before: pills vary by title length. After: flush column edges; grid spans `max-w-5xl`.

2. **Desktop (1280px) — equal heights:** All four buttons in the row share the same outer box height (driven by longest 2-line title). Before: single-line pills may differ in height if one wraps. After: bottom edges aligned.

3. **Desktop (1280px) — active state:** Click each tab; active blue tint, border glow, and icon color still apply correctly on the full-width cell.

4. **Tablet (768px) — 2×2 grid:** Four buttons in two rows of two; each row’s pair has equal width and height. Before: flex-wrap ragged layout. After: regular 2×2 block.

5. **Mobile (375px) — 2×2 grid:** Single-word labels; four equal cells; touch targets ≥44px height. No horizontal overflow.

6. **Long title:** “Process Efficiency & Workflow Optimization” at `lg+` fits within its cell (max 2 lines, no overflow clipping of focus ring).

7. **Hash deep links:** Visit `/services#rapid-development` and `/services#ai-strategy` — correct tab active and detail panel loads.

8. **Keyboard:** Tab through four buttons; focus ring visible on full cell; Enter/Space still activates tab.

9. **Light + dark themes:** Criteria 1–6 pass in both modes.

10. **Detail carousel unchanged:** Prev/next arrows, proof card, and content cross-fade still work after tab selection.

## 12. Implementation steps

1. Open `FIELDPORTER.COM/app/services/page.tsx`, locate `InteractiveServiceShowcase` tab row (~L334).

2. **Grid wrapper:** Replace `flex justify-center … flex-wrap` with:
   `grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-6 mb-16 md:mb-20 lg:mb-32 px-4 max-w-5xl mx-auto items-stretch`

3. **Button element:** Append to existing button classes:
   `w-full h-full flex items-center justify-center text-center`
   Adjust padding: `px-3 md:px-4 lg:px-4` (replace `lg:px-8`).

4. **Typography:** On button, change `lg:text-lg` → `lg:text-base leading-snug`.

5. **Inner span:** Update to `flex items-center justify-center gap-1 md:gap-2 lg:gap-2 w-full`.

6. **Title spans:** Add `line-clamp-2` to each of the three responsive title `<span>` elements (lg full title, sm 2-word, mobile 1-word).

7. **Do not change** `onClick`, `activeService` logic, `services` data, detail `AnimatePresence` block, or section rhythm on parent `<section>`.

8. Run build + lint (see §18). Visual QA per §11 and §17.

## 13. Design checklist

- [x] Uses existing gap scale (`gap-2 md:gap-3 lg:gap-6`) — no new spacing tokens
- [x] 8px grid respected — gaps are 8/12/24px; `min-h-[44px]` preserved
- [x] Framer Motion wrappers accounted for — tab row has none; detail panel untouched
- [x] No new one-off spacing except localized `max-w-5xl` cap (rationale: prevent over-stretched pills on ultra-wide)

## 14. Behaviour contract

| Before                                       | After                                        |
| -------------------------------------------- | -------------------------------------------- |
| Four tabs in flex row; uneven widths/heights | Four tabs in CSS grid; equal cell dimensions |
| Click tab → updates detail panel             | **Same**                                     |
| URL hash selects tab on load                 | **Same**                                     |
| Active/inactive visual styles                | **Same** classes                             |
| Prev/next carousel controls                  | **Same**                                     |
| Responsive label truncation breakpoints      | **Same** breakpoints; add line-clamp only    |

**Must NOT change:** routing, service count (4), data fetching, detail panel animation timing, hash anchor IDs, section vertical rhythm above/below tab row.

## 15. Flow-on effects

| Area                | Mitigation                                                               |
| ------------------- | ------------------------------------------------------------------------ |
| Long titles at `lg` | `line-clamp-2` + `lg:text-base`                                          |
| Ultra-wide screens  | `max-w-5xl mx-auto` prevents stretched pills                             |
| Portfolio tab row   | Defer; document as follow-up UX item                                     |
| Future 3-service IA | Grid cols would need update if Strategic Research removed — out of scope |
| Detail panel layout | Isolated change; no paired update needed                                 |

## 16. Visual regression routes

| Route                          | Why                                                             |
| ------------------------------ | --------------------------------------------------------------- |
| `/services`                    | **In-scope** — Four Things tab row + detail carousel smoke test |
| `/services#strategic-research` | Hash deep link                                                  |
| `/services#ai-strategy`        | Hash deep link (longest title tab)                              |

**Viewports:** 375px, 768px, 1280px (minimum).

**Themes:** Light and dark.

**Not required this pass:** `/portfolio` (deferred), `/`, `/about`.

## 17. Manual test plan

1. Open `/services` at 1280px light mode → verify criteria 1–3, 9–10.
2. Toggle dark mode → repeat criteria 1–3.
3. Resize to 768px → verify criterion 4.
4. Resize to 375px → verify criterion 5.
5. At 1280px, inspect “Process Efficiency…” tab → criterion 6.
6. Navigate to `/services#rapid-development` → criterion 7.
7. Navigate to `/services#ai-strategy` → criterion 7.
8. Keyboard-tab through four buttons → criterion 8.
9. Click prev/next on detail panel → criterion 10.
10. Scroll to Methodology + FAQ — confirm no accidental spacing changes above FAQ.

## 18. Build & docs

```bash
cd FIELDPORTER.COM && npm run build
cd FIELDPORTER.COM && npm run lint
```

After `/ux-implement` + visual QA:

- Update [`SAM's CHANGES.md`](../../../SAM's%20CHANGES.md) entry — status “Fixed in code — Sam visual QA pending”
- Update folder `README.md` and UX index status

## 19. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-01-services-four-things-box-alignment/
Out of scope: Portfolio tabs, detail carousel content, MethodologySection/FAQ spacing, homepage services cards, globals.css tokens, chatbot/knowledge files, Strategic Research IA changes
```
