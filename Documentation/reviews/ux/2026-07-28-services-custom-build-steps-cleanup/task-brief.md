# Task brief — Services “How a custom build works” cleanup

## 1. Goal

On `/services`, make **How a custom build works** easier to scan by replacing the five-card desktop carousel with a single clean vertical numbered list, and remove the double section padding that feeds the FAQ gap.

## 2. Folder

`Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/`

## 3. Change scope

**Localized** — Services methodology UI + the thin page shell that wraps it. No new tokens. No copy/IA consolidation this pass. About / Contact / AIOS process sections deferred.

## 4. Chosen approach

**Option A — Vertical numbered list / timeline** (research recommendation).

One list for all breakpoints: phase number + title + description. No cards, no horizontal scroll, no prev/next. Keep all five phases and existing copy. Fix double vertical rhythm in the same pass.

### Locked decisions

| Question                    | Decision                                                               | Basis                                                           |
| --------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| Layout                      | Option A — vertical numbered list                                      | Research primary recommendation; DECISIONS empty                |
| Step count                  | Keep all **5** phases                                                  | Smallest safe; no consolidate without Sam                       |
| Copy                        | Layout-only — no rewrite of titles/descriptions/section title/subtitle | Research Q4 default                                             |
| About-style card grid (B/C) | Reject for v1                                                          | Carousel was the clutter; list is lighter than another card row |
| Double section padding      | **Fix in this pass**                                                   | Research success criterion 4; helps logged FAQ gap              |
| Connectors                  | Optional thin vertical line between steps — include (subtle)           | Reads as sequence without card chrome                           |
| Semantic list               | Use `<ol>` / `<li>`                                                    | Ordered process; a11y                                           |
| Step label                  | Show `01`…`05` only (drop redundant “Step ” prefix)                    | Research forensics                                              |
| Nested `<section>`          | Methodology root becomes a `<div>` (page owns the outer `<section>`)   | Avoid nested sections + double rhythm                           |

## 5. Rejected options

| Option                                  | Why not                                              |
| --------------------------------------- | ---------------------------------------------------- |
| **B — Static 5-card grid**              | Still heavy card chrome; 5-col / 2+3 wrap stays busy |
| **C — Consolidate to 3–4 + About grid** | Needs copy/IA lock; defer until Sam asks             |
| **D — Polish carousel only**            | Does not meet “easier and cleaner”                   |

## 6. Similar surfaces map

| Cluster                     | Route       | File                                                    | In scope? | Action                                    |
| --------------------------- | ----------- | ------------------------------------------------------- | --------- | ----------------------------------------- |
| Services methodology        | `/services` | `components/services/methodology-section.tsx`           | **Yes**   | Rebuild as vertical list                  |
| Services page shell         | `/services` | `app/services/page.tsx` (methodology wrapper ~L478–483) | **Yes**   | Keep rhythm/bg shell; do not nest padding |
| About process               | `/about`    | `systematic-approach.tsx`                               | Defer     | Reference only                            |
| Contact next steps          | `/contact`  | `contact-methods.tsx`                                   | Defer     | Leave                                     |
| AIOS how it works           | `/aios`     | `app/aios/page.tsx`                                     | Defer     | Leave                                     |
| What We Build / FAQ content | `/services` | showcase + faqData                                      | No        | Leave                                     |

## 7. Files to change

| File                                          | Change                                                                                                                                                                            |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/services/methodology-section.tsx` | Replace dual mobile-cards / desktop-carousel with one vertical `<ol>` timeline; remove scroll helpers + arrow buttons; drop inner `py-*` and nested section/container duplication |
| `app/services/page.tsx`                       | Keep methodology wrapper (`section-rhythm-xl` + gradient + `max-w-6xl`); ensure it remains the only vertical rhythm owner. **Do not** change `methodologyData` copy/phases        |

## 8. Do not touch

- `methodologyData` phase titles, descriptions, count, or section title/subtitle
- `InteractiveServiceShowcase`, FAQ copy, hero
- About / Contact / AIOS process UIs
- `globals.css` / design tokens / new utility classes
- Chatbot / knowledge base / Firebase
- `hosting/` stub; nested duplicate trees if any
- Automated screenshots / browser MCP

## 9. Token / spacing map

Reuse existing theme pairs and 8px scale only. No new hex.

| Location                     | Current                                                             | Planned                                                                                                |
| ---------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Page shell                   | `section-rhythm-xl` + gradient + `max-w-6xl … px-4 sm:px-6 lg:px-8` | Unchanged (owns vertical rhythm)                                                                       |
| Methodology root             | `<section className="py-16 md:py-24 …">`                            | `<div className="relative">` — **no** `py-*`                                                           |
| Inner max-w in Methodology   | `max-w-7xl mx-auto px-4…`                                           | Remove — page already provides container                                                               |
| Header block                 | `mb-12 md:mb-16`, headline `text-gray-900 dark:text-white`          | Keep hierarchy; subtitle → `text-gray-600 dark:text-gray-300` (was `text-gray-700 dark:text-white/70`) |
| List                         | N/A (carousel)                                                      | `max-w-2xl mx-auto` (or `max-w-3xl`) centered list                                                     |
| Step row gap                 | card `p-6` / `gap-6`                                                | `flex gap-4 md:gap-6`; vertical `pb-8` / `last:pb-0` (or `space-y-8` if no connector)                  |
| Phase number                 | `text-sm font-medium text-blue-500` + “Step ”                       | `text-sm font-medium tabular-nums text-blue-600 dark:text-blue-400` — number only                      |
| Title                        | `text-lg/xl font-medium text-gray-900 dark:text-white`              | Keep similar scale (`text-lg md:text-xl`)                                                              |
| Body                         | `text-gray-600 dark:text-gray-300`                                  | Unchanged                                                                                              |
| Connector                    | N/A                                                                 | Optional `w-px flex-1 bg-gray-900/10 dark:bg-white/10` under number (hide on last)                     |
| Cards / arrows / snap scroll | Present                                                             | **Removed**                                                                                            |

## 10. Visual acceptance criteria

1. **Desktop 1280 light:** All five steps visible in one vertical stack without horizontal scroll or arrow controls.
2. **Desktop 1280 dark:** Same layout; number/title/body readable (no white-only text on light leftover).
3. **Tablet 768:** Same single list (no carousel branch); steps fully readable.
4. **Mobile 375:** Compact vertical list; no bordered card chrome; no clipped text.
5. **Density:** Visual weight clearly lighter than “What We Build” above (supporting section).
6. **FAQ gap:** Space between methodology and Common Questions is tighter than before (no double `py-16 md:py-24` under `section-rhythm-xl`).
7. **Motion:** Soft entrance stagger may remain; no scroll-snap / arrow interaction.
8. **Copy:** Titles and descriptions match current `methodologyData` verbatim.

## 11. Implementation steps

1. **`components/services/methodology-section.tsx`**
   - Remove `ArrowLeft` / `ArrowRight`, `scrollContainerRef`, `scrollByCard`, and all carousel / dual-breakpoint card markup.
   - Keep `useInView` + header motion (or equivalent `whileInView`).
   - Root: `<div className="relative">` (no vertical padding).
   - Drop inner `max-w-7xl` container (page supplies width/padding).
   - Render one `<ol>` of phases:
     - Each `<li>`: number column (`phase`) + content column (title `h3`, description `p`).
     - Subtle vertical connector under the number except on the last item.
   - Use theme text pairs from §9; no `rounded-2xl` card shells.
2. **`app/services/page.tsx`**
   - Leave `methodologyData` and the methodology `<section className="relative section-rhythm-xl …">` shell as-is (bg + container).
   - Confirm MethodologySection is not given a second rhythm class.
3. Lint only (`npm run lint`). Do **not** run `npm run build` while Sam’s `next dev` is up.
4. Write `implementation-summary.md`; set README status; update `SAM's CHANGES.md`; append known-bug-patterns note for this surface’s double-rhythm fix if appropriate.

## 12. Behaviour contract

| Before                                                       | After                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| Desktop: horizontal card carousel + arrows                   | Vertical numbered list; full sequence visible         |
| Mobile: five bordered cards stacked                          | Same list pattern, no card chrome                     |
| Nested section + `py-16 md:py-24` inside `section-rhythm-xl` | Page shell owns rhythm; component has no extra `py-*` |
| Five phases / same copy                                      | Unchanged                                             |

**Must NOT change:** phase count/copy, section title/subtitle wording, What We Build, FAQ content, other routes’ process UIs, design tokens.

## 13. Flow-on effects

| Area                          | Mitigation                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| Light/dark text               | Explicit gray pairs on number/title/body (§9)                                                |
| Mobile length                 | List is shorter than five padded cards; still 5 steps — acceptable for v1                    |
| FAQ blank gap (SAM's CHANGES) | Padding fix should reduce it; Sam confirms visually — may still need FAQ wrapper tweak later |
| a11y                          | Ordered list; remove arrow buttons (no orphan controls)                                      |
| Motion                        | Keep light stagger; remove scroll-linked carousel behavior                                   |
| Chatbot / knowledge           | No copy change → no sync                                                                     |
| About process still card-grid | Deferred; intentional                                                                        |

## 14. Manual visual check routes (Sam)

| Route       | Viewport | Theme | Check               |
| ----------- | -------- | ----- | ------------------- |
| `/services` | 1280     | Light | Criteria 1, 5, 6, 8 |
| `/services` | 1280     | Dark  | Criteria 2, 5, 6    |
| `/services` | 768      | Light | Criterion 3         |
| `/services` | 375      | Light | Criterion 4         |
| `/services` | 375      | Dark  | Spot criterion 4    |

No automated capture / browser MCP.

## 15. Manual test plan

1. Open `/services` @ 1280 light → scroll to **How a custom build works** → confirm vertical list, all 5 steps, no arrows/scroll strip.
2. Toggle dark → contrast OK.
3. Resize to 768 → still one list, no carousel.
4. 375 → list stacks cleanly; no card borders.
5. Scroll from methodology into **Common Questions** → gap feels tighter / not a dead band.
6. Spot-check What We Build above still works (tabs unchanged).

## 16. Build & docs on complete

```bash
# From marketing app root — never build while next dev is running
npm run lint
```

Then: `implementation-summary.md`, README status → Partial — pending Sam visual QA, update `SAM's CHANGES.md`, refresh known-bug-patterns if double-rhythm on this surface is now fixed.

## 17. Implement handoff

```
/ux-implement
Folder: Documentation/reviews/ux/2026-07-28-services-custom-build-steps-cleanup/
Out of scope: methodologyData copy/consolidation, What We Build, FAQ content rewrite, About/Contact/AIOS process UIs, globals.css tokens, chatbot/knowledge, browser MCP / ui:capture, npm run build while next dev is up
```
