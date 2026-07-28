# Research — Services page “Four Things We Do” box alignment

## 1. Issue summary

| Field                  | Detail                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User goal**          | Scan and compare the four service offerings under “Four Things We Do” in a tidy, uniform grid                                                                                                                                                                                                                                        |
| **Pain point**         | The four selector boxes look uneven — different widths/heights, ragged wrapping — which feels sloppy and makes comparison harder                                                                                                                                                                                                     |
| **Current behaviour**  | Four service tab buttons render in a centered `flex` row with `flex-wrap`. Width is content-driven (long titles like “Process Efficiency & Workflow Optimization” vs shorter labels at smaller breakpoints). Only `min-h-[44px]` is set; multi-line titles can grow height unevenly. Wrapped rows do not share equal cell dimensions |
| **Expected behaviour** | Four boxes share equal width and height, aligned on a consistent grid (horizontally and vertically), regardless of title length                                                                                                                                                                                                      |
| **Surfaces affected**  | Services page — `InteractiveServiceShowcase` selector row only (user-scoped)                                                                                                                                                                                                                                                         |
| **Contexts**           | Desktop (full titles at `lg+`), tablet (2-word truncated labels), mobile (single-word labels); light + dark themes; active tab state + hash deep links (`/services#strategic-research`); detail carousel below unchanged                                                                                                             |
| **Severity**           | Cosmetic — layout polish; does not block reading content                                                                                                                                                                                                                                                                             |

**Interpretation note:** The section shows four tab-style selector buttons, then a single active-service detail panel (2-column text + proof card). User “four boxes” most likely refers to the **four tab selectors** directly under the heading. A broader interpretation (always-visible 2×2 service summary cards like the homepage) is captured as Option 3 below.

## 2. Change scope + rationale

**Localized**

User scoped the Services page “Four Things We Do” section. The uneven boxes are the tab selector row inside `InteractiveServiceShowcase` in one page file. Not a site-wide spacing token change.

**Codebase path note:** UX commands reference `hosting/`; the production marketing site lives in **`FIELDPORTER.COM/`**.

## 3. Success criteria (draft)

1. On `/services`, the four service selector boxes under “Four Things We Do” form a regular grid (2×2 from `sm`/`md`, 1×4 at `lg+` or consistent 2×2 — to be decided in change plan) with **equal cell width and height** within each row.
2. Longest service title (“Process Efficiency & Workflow Optimization” at `lg`) fits without breaking grid uniformity — no one box visibly taller/wider than its peers.
3. Active/inactive tab styling, keyboard focus rings, and `min-h-[44px]` touch targets preserved.
4. Hash navigation (`#strategic-research`, etc.) and the detail carousel below remain functional.
5. Light and dark themes both show aligned equal-size boxes.

## 4. Assumptions vs facts

| Claim                                                                           | Source                                                         |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Section heading is “Four Things We Do” in `InteractiveServiceShowcase`          | Observed in `app/services/page.tsx` L322–326                   |
| Four items are `<button>` tab selectors, not four simultaneous content cards    | Observed L334–365                                              |
| Selector row uses `flex … flex-wrap` with content-sized padding                 | Observed L334, L342                                            |
| Service titles vary greatly in length (4–6 words)                               | Observed `services` array L39–136                              |
| Responsive label truncation exists (`hidden lg:inline`, 2-word, 1-word)         | Observed L354–360                                              |
| Homepage services use a separate 2×2 **content** card grid with fixed `min-h-*` | Observed `components/homepage/services-section.tsx` L314, L179 |
| User wants equal-size boxes like About “Our Process” fix                        | Inferred from parallel wording + recent similar fix            |
| User wants to replace tab+carousel with four full cards                         | Inferred possible — not confirmed                              |
| Issue affects the detail panel’s left/right columns                             | Inferred false — only one service shown at a time              |

## 5. Reference UI notes

No external reference UI supplied.

Internal authority:

- **About Our Process fix** (`systematic-approach.tsx`) — `grid` + `items-stretch` + `h-full` on children for equal-height cards.
- **Homepage services** — 2×2 grid with explicit `min-h-[360px+]` for uniform **content** cards (different UX pattern).
- **Portfolio tabs** — same anti-pattern: `flex flex-wrap` tab pills (`app/portfolio/page.tsx` L418).

## 6. Surfaces & routes

| Route       | Entry file                              | Key sections                                                                   |
| ----------- | --------------------------------------- | ------------------------------------------------------------------------------ |
| `/services` | `FIELDPORTER.COM/app/services/page.tsx` | ServiceHero → **InteractiveServiceShowcase** → MethodologySection → FAQSection |

**Layout stack (in-scope section):**

```
InteractiveServiceShowcase (app/services/page.tsx)
  → section#services-showcase.section-rhythm-xl
  → heading block (mb-20 md:mb-32 lg:mb-40)
  → tab selector row (flex flex-wrap, mb-16 md:mb-20 lg:mb-32)  ← IN SCOPE
  → AnimatePresence detail panel (2-col grid + prev/next)       ← out of scope unless Option 3
```

## 7. Similar surfaces map

| Surface cluster                    | Route(s)     | File(s)                                     | Same pattern as trigger?                                               | In scope for fix?                     |
| ---------------------------------- | ------------ | ------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------- |
| **Services — Four Things tab row** | `/services`  | `app/services/page.tsx` L334–365            | **Yes** — flex-wrap tab pills, content-sized                           | **Yes**                               |
| Homepage services cards            | `/`          | `components/homepage/services-section.tsx`  | Partial — 2×2 **content** cards with `min-h-*`, not tabs               | No — different component/UX           |
| Portfolio category tabs            | `/portfolio` | `app/portfolio/page.tsx` L418–447           | **Yes** — identical flex-wrap tab pill pattern                         | **Defer** — user scoped Services only |
| About — Our Process                | `/about`     | `components/about/systematic-approach.tsx`  | Partial — grid cards with stretch fix already shipped                  | No                                    |
| About — AI Training cards          | `/about`     | `components/about/technical-capability.tsx` | Partial — 3-col grid, `items-stretch`, no equal-width issue            | No                                    |
| Services results grid              | `/services`  | `components/services/results-section.tsx`   | Partial — 2-col grid with `h-full` cards (not used on live page stack) | No                                    |

## 8. Layout / chrome audit

| Element              | File                | Today (class/prop/token)                                     | Problem                                                    |
| -------------------- | ------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Section wrapper      | `page.tsx` L311     | `section-rhythm-xl`                                          | Large vertical rhythm above tabs — not the alignment issue |
| Heading block        | `page.tsx` L321     | `mb-20 md:mb-32 lg:mb-40`                                    | Generous gap before selectors — intentional hierarchy      |
| **Tab selector row** | `page.tsx` L334     | `flex justify-center gap-2 md:gap-3 lg:gap-6 flex-wrap px-4` | Flex + wrap → ragged rows, unequal widths                  |
| Tab button           | `page.tsx` L342     | `min-h-[44px] px-4 lg:px-8 py-3 lg:py-4` (no width)          | Width = content; longest title dominates visually          |
| Tab label            | `page.tsx` L354–360 | Breakpoint-specific text lengths                             | At `lg`, full titles cause widest variance                 |
| Detail grid below    | `page.tsx` L376     | `grid lg:grid-cols-2 items-start lg:items-center`            | Separate from four boxes — single active service           |
| Proof card           | `page.tsx` L449–474 | Fixed padding `p-8 … xl:p-20`                                | Not one of four equal boxes                                |

### Layout forensics (tab row spacing contributors)

- Header bottom margin: up to `lg:mb-40` (160px) before tab row.
- Tab row bottom margin: up to `lg:mb-32` (128px) before detail panel.
- Tab gaps: `gap-2` → `lg:gap-6` between pills.
- `flex-wrap` at mid widths: likely **2+2 or 3+1** layout with mismatched row widths (measured hypothesis: row width ≈ sum of unequal pill widths + gaps, not full container).
- No `max-w-*` on individual pills — four pills in one row at `xl` may still vary in width even without wrap.

### UX diagnosis

- **Visual hierarchy:** Heading draws eye; uneven tabs undermine the “four equal offerings” message implied by the headline.
- **Proximity:** Tabs should read as one chooser control set; ragged flex-wrap breaks that grouping.
- **Density:** Tabs are internally tight on mobile (single word) but externally uneven on desktop (full titles).

### Accessibility pre-check

- Touch targets: `min-h-[44px]` present — preserve when equalizing.
- Focus: `focus-visible:ring-2` on buttons — preserve.
- Keyboard: buttons are focusable; grid change should not alter tab order (DOM order unchanged).
- Contrast: active blue tint vs inactive gray — unchanged by layout fix.
- Motion: no motion on tab row itself; detail panel uses `AnimatePresence` — out of scope.

## 9. Code map

```
ServicesPage (app/services/page.tsx)
  → PageWrapper
      → ServiceHero
      → InteractiveServiceShowcase
          → section#services-showcase.section-rhythm-xl
          → max-w-7xl container
              → heading (h2 "Four Things We Do" + subtitle)
              → div.flex.flex-wrap  [SELECTOR ROW — in scope]
                  → button × 4 (service tab)
              → AnimatePresence
                  → motion.div (active service detail)
                      → grid lg:grid-cols-2 (copy + proof card)
                      → prev/next controls
      → MethodologySection (section-rhythm-xl wrapper)
      → FAQSection
```

| File                                       | Component                    | Relevant classes                                                                                                               |
| ------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `app/services/page.tsx`                    | `InteractiveServiceShowcase` | Section: `section-rhythm-xl`; tabs: `flex flex-wrap`; buttons: `min-h-[44px]`, responsive `px/py`, `rounded-xl md:rounded-2xl` |
| `app/globals.css`                          | `.section-rhythm-xl`         | `py-24 lg:py-32`                                                                                                               |
| `components/homepage/services-section.tsx` | `ServicesSection`            | Reference: `grid grid-cols-1 lg:grid-cols-2`, cards `min-h-[360px+]`                                                           |

## 10. Authority stack

| Source                    | What it says                                                 | Conflicts with issue?                                     |
| ------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `app/globals.css`         | `section-rhythm-*` utilities for vertical section padding    | No — section rhythm is fine; issue is intra-row alignment |
| About process fix pattern | Grid + `items-stretch` + `h-full` for equal card heights     | Supports grid-based fix                                   |
| Homepage services         | 2×2 equal **content** cards with min-height                  | Different UX — shows all content, not tabs                |
| `SAM's CHANGES.md`        | Services gap above FAQ logged; no entry for Four Things tabs | No conflict                                               |
| User request              | Equal vertical + horizontal alignment, same size             | Conflicts with current flex-wrap content-sizing           |

## 11. Current behaviour

At `/services`, after the hero, “Four Things We Do” renders four glass-style tab buttons. Clicking a tab updates the detail panel below and supports URL hash deep linking. The tab row uses horizontal flex with wrap; each button sizes to its label text. At large breakpoints all four full service titles display, producing visibly different button widths. When the row wraps (tablet / narrow desktop), second-row pills do not align to a uniform grid. Height can differ if any label wraps to two lines. The detail carousel below is unrelated to the four-up selector geometry.

## 12. Root cause

1. **Layout geometry** — Tab row is `flex` + `flex-wrap` instead of a CSS grid with equal track sizing; browsers size each pill to content.
2. **Content-driven dimensions** — Four service titles differ in character count (longest: “Process Efficiency & Workflow Optimization”); no `w-full`, `flex-1`, or grid cell constraint on buttons.
3. **Responsive label strategy** — Breakpoint-specific truncation reduces mobile variance but **increases** desktop variance when `lg:inline` shows full titles side by side.
4. **Historical pattern** — Same tab-pill pattern copied from Portfolio showcase (`flex-wrap` nav); neither was built for equal-cell grids.
5. **Missing stretch chain** — Unlike About `systematic-approach.tsx` (post-fix) or `results-section.tsx`, no `grid` + `items-stretch` + `h-full` on tab children.

## 13. Flow-on effects matrix

| Area                                 | Risk if changed                                          | Mitigation                                                                |
| ------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Sibling detail panel                 | Low — selector layout isolated above carousel            | Do not change `AnimatePresence` block in v1                               |
| Portfolio tab row (defer)            | Users may expect parity later                            | Note in change plan; separate ticket if desired                           |
| Mobile 2×2 grid                      | Longest single-word labels still short; equal cells easy | Use `grid-cols-2` + `h-full w-full` on buttons                            |
| Desktop 1×4 vs 2×2                   | Four equal columns may feel narrow for long titles       | Consider `lg:grid-cols-4` with `text-sm` / `line-clamp-2` / centered text |
| Light + dark                         | Low — only layout classes change                         | Visual QA both themes                                                     |
| Hash deep links                      | Low — button `onClick` unchanged                         | Smoke-test `#rapid-development` etc.                                      |
| a11y touch targets                   | Shrinking height to fit grid                             | Keep `min-h-[44px]`; let grid row height grow to tallest cell             |
| Animation / CLS                      | Low — no LCP images in tab row                           | Avoid animating grid dimensions on load                                   |
| Content / chatbot                    | None — layout only                                       | N/A                                                                       |
| Strategic Research removal (SAM log) | Future 3-up grid if service count drops                  | Out of scope; revisit if offerings fold to three                          |

**Paired updates:** None required below the tab row for Options 1–2. Option 3 (full cards) would require detail-panel IA rethink.

## 14. Options (ranked)

### Option 1 — Grid equal cells on tab buttons (recommended)

| Field                        | Detail                                                                                                                                                                                                                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Summary**                  | Replace `flex flex-wrap` with `grid grid-cols-2 lg:grid-cols-4 gap-* items-stretch max-w-5xl mx-auto`. Each `<button>` gets `w-full h-full min-h-[44px] flex items-center justify-center text-center` (and optional `line-clamp-2`). Row height follows tallest cell in that row |
| **Files touched**            | `FIELDPORTER.COM/app/services/page.tsx`                                                                                                                                                                                                                                          |
| **Change scope**             | Localized                                                                                                                                                                                                                                                                        |
| **Design-system compliance** | Partial — uses existing spacing gaps; no new token required                                                                                                                                                                                                                      |
| **Regression risk**          | Low                                                                                                                                                                                                                                                                              |
| **Visual QA effort**         | Med — test sm/md/lg/xl, long titles, active state                                                                                                                                                                                                                                |
| **Similar surfaces**         | Services tab row only                                                                                                                                                                                                                                                            |
| **Downside**                 | Long titles may need 2 lines + smaller type; still tab UX not full cards                                                                                                                                                                                                         |

### Option 2 — Grid + shared min-height from tallest title

| Field                        | Detail                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Summary**                  | Option 1 plus explicit `min-h-[72px] lg:min-h-[88px]` (tune in QA) so both grid rows match when 2×2 wraps, mirroring homepage `min-h-*` strategy |
| **Files touched**            | `FIELDPORTER.COM/app/services/page.tsx`                                                                                                          |
| **Change scope**             | Localized                                                                                                                                        |
| **Design-system compliance** | Partial — component-level min-height one-off                                                                                                     |
| **Regression risk**          | Low                                                                                                                                              |
| **Visual QA effort**         | Med                                                                                                                                              |
| **Similar surfaces**         | Services tab row                                                                                                                                 |
| **Downside**                 | Fixed min-height may leave empty space if copy shortens later                                                                                    |

### Option 3 — Always-visible 2×2 service summary cards

| Field                        | Detail                                                                                                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Summary**                  | Replace tab row + carousel with four always-visible cards (homepage `ServicesSection` pattern): equal `min-h`, icon, title, short description; click expands detail or scrolls to anchor |
| **Files touched**            | `app/services/page.tsx`, possibly extract shared card from `components/homepage/services-section.tsx`                                                                                    |
| **Change scope**             | Localized (but larger UX change)                                                                                                                                                         |
| **Design-system compliance** | Yes — reuses established homepage card grid                                                                                                                                              |
| **Regression risk**          | High — changes interaction model, content density, scroll length                                                                                                                         |
| **Visual QA effort**         | High                                                                                                                                                                                     |
| **Similar surfaces**         | Homepage services cluster                                                                                                                                                                |
| **Downside**                 | Duplicates homepage; may bloat page; loses compact carousel                                                                                                                              |

### Option 4 — Defer; fix Portfolio tabs in same pass

| Field                        | Detail                                                               |
| ---------------------------- | -------------------------------------------------------------------- |
| **Summary**                  | Apply Option 1 to both Services and Portfolio tab rows in one PR     |
| **Files touched**            | `app/services/page.tsx`, `app/portfolio/page.tsx`                    |
| **Change scope**             | Localized (two routes)                                               |
| **Design-system compliance** | Partial                                                              |
| **Regression risk**          | Med — two interactive showcases                                      |
| **Visual QA effort**         | High                                                                 |
| **Similar surfaces**         | Services + Portfolio                                                 |
| **Downside**                 | Broader than user request; split if review surface area is a concern |

## 15. Recommended direction

**Primary:** Option 1 — convert the Four Things tab row to a CSS grid with `items-stretch` and full-size buttons. Matches user wording with minimal regression risk and parallels the About process grid fix without changing page IA.

**Phasing:**

- **v1:** Option 1 on Services tab row only.
- **Defer:** Portfolio tab parity (Option 4); full 2×2 content cards (Option 3) unless user confirms they want homepage-style cards instead of tabs.

**Copy direction:** None — layout only. Title truncation strategy may shift (prefer 2-line clamp over single-line overflow at `lg`).

**Open questions for `/ux-change-plan`:**

1. Confirm intent: equal-size **tab selectors** (current UX) vs four **full content cards** visible at once?
2. Desktop layout preference: **1×4** row or **2×2** grid at all breakpoints below `xl`?
3. Should longest title use two lines with smaller text, or abbreviate on desktop?
4. Apply same grid fix to Portfolio category tabs in v1 or follow-up?
5. Any objection to capping tab row width (`max-w-5xl`) so four columns do not over-stretch on ultra-wide screens?

## 16. Out of scope

- ServiceHero, MethodologySection, FAQSection spacing (separate SAM item: blank gap above FAQ).
- Detail carousel content, proof card, prev/next controls.
- Homepage services section.
- Strategic Research removal / 3-service IA change.
- Portfolio tabs (unless explicitly phased in).
- Chatbot knowledge, SEO metadata, Firebase, env.
- New global tokens in `globals.css` (not required for v1).

## 17. Open questions

See §15 — max 5 non-blocking for change plan. **No blocking questions** — proceed with tab-grid as default hypothesis; confirm card-vs-tab intent in plan review with Sam.

## 18. Handoff

- **Next command:** `/ux-change-plan`
- **Folder:** `Documentation/reviews/ux/2026-07-01-services-four-things-box-alignment/`
- **Suggested visual regression routes:** `/services` (375, 768, 1024, 1280, 1440px; light + dark); hash links `#strategic-research`, `#ai-strategy`; keyboard tab through four selectors; active state click cycle.
