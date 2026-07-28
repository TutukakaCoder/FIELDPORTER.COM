# Research — About page equal card heights (Process + AI Training)

## 1. Issue summary

| Field     | Detail                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| User goal | Three cards under Our Process and three under AI Training & Implementation should each share one uniform size |
| Pain      | Shorter cards make each row look ragged / unfinished                                                          |
| Current   | Each card sizes to its own copy length; row looks uneven on desktop                                           |
| Expected  | Within each section, all three cards share the tallest card’s height                                          |
| Surfaces  | `/about` — SystematicApproach + TechnicalCapability                                                           |
| Severity  | polish                                                                                                        |

## 2. Change scope + rationale

**Pattern (2 surfaces)** — Same anti-pattern on two adjacent About sections: 3-col glass card grid without an `h-full` height chain. Not systemic (no new token). User explicitly named both sections.

## 3. Success criteria (draft)

1. At ≥768px, Our Process cards 01–03 share identical outer box height (driven by tallest content).
2. At ≥768px, AI Training & Implementation cards share identical outer box height (driven by tallest content).
3. No fixed `min-h-*` that clips future copy edits.
4. Content stays top-aligned; empty space sits below copy on shorter cards.
5. Hover motion, borders, connectors (Process), icons/outcomes (AI) unchanged.
6. Mobile single-column stack stays content-height (no forced equal height).
7. Light and dark themes both show equal-height rows on desktop.

## 4. Assumptions vs facts

| Claim                                                                                                    | Source                                           |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Sections are SystematicApproach (“Our Process”) and TechnicalCapability (“AI Training & Implementation”) | Observed                                         |
| Live desktop heights Process: 346 / 298 / 378 px                                                         | Observed (Playwright, 1280×900, 2026-07-28)      |
| Live desktop heights AI Training: 422 / 370 / 318 px                                                     | Observed                                         |
| Grid items stretch; inner panels do not (`h-full` missing on wrapper + card)                             | Observed                                         |
| User wants both sections equalized                                                                       | User-reported                                    |
| Prior 2026-07-01 Process-only fix is absent from live git-tracked components                             | Observed (DOM classes; file contents)            |
| Nested untracked `FIELDPORTER.COM/` copy already has stretch classes on both files                       | Observed — not the running app                   |
| TechStack 4-col grid is out of scope                                                                     | Inferred (user named Process + AI Training only) |

## 5. Surfaces & routes

`/about` → `app/about/page.tsx` → AboutHero → CompanyFoundation → **SystematicApproach** → **TechnicalCapability** → TechStack → AboutCTA

```
SystematicApproach (systematic-approach.tsx L52–98)
  grid md:grid-cols-3  → motion.div.relative.group  → card div (no h-full)

TechnicalCapability (technical-capability.tsx L57–98)
  grid md:grid-cols-3  → motion.div.relative.group  → card div (no h-full)
```

## 6. Similar surfaces map

| Cluster               | Route       | File                                        | Same pattern?                    | In scope?      |
| --------------------- | ----------- | ------------------------------------------- | -------------------------------- | -------------- |
| About — Our Process   | `/about`    | `components/about/systematic-approach.tsx`  | Yes                              | **Yes**        |
| About — AI Training   | `/about`    | `components/about/technical-capability.tsx` | Yes                              | **Yes**        |
| About — Tech stack    | `/about`    | `components/about/tech-stack.tsx`           | Partial (multi-col cards)        | No — not named |
| Homepage services     | `/`         | `components/homepage/services-section.tsx`  | Partial — uses `min-h-[320/360]` | No             |
| Services results      | `/services` | `components/services/results-section.tsx`   | Already `h-full`                 | No — reference |
| Insights blog         | `/insights` | `components/insights/blog-grid.tsx`         | Already `h-full`                 | No — reference |
| Contact process steps | `/contact`  | `components/contact/contact-methods.tsx`    | Yes — no `h-full`                | Defer          |
| AIOS steps            | `/aios`     | `app/aios/page.tsx`                         | Yes — no `h-full`                | Defer          |

## 7. Layout / token forensics

| Element                  | Today                           | Problem                           |
| ------------------------ | ------------------------------- | --------------------------------- |
| Process grid L52         | `grid … md:grid-cols-3 gap-6…`  | Stretch applies to grid item only |
| Process `motion.div` L61 | `relative group`                | No `h-full`                       |
| Process card L63–64      | padding/border only             | No `h-full flex flex-col`         |
| AI grid L57              | `grid … md:grid-cols-3 gap-8…`  | Same                              |
| AI `motion.div` L66      | `relative group`                | No `h-full`                       |
| AI card L68–69           | `p-5 md:p-8` panel              | No `h-full flex flex-col`         |
| Copy length              | Step 03 / Training card longest | Sets row max height               |

**Root cause:** Known bug pattern #2 — grid stretch without `h-full` on wrapper + inner panel. Cards collapse to content height.

**App path note:** Live server (`localhost:3000`) serves workspace-root `components/`. A nested untracked `FIELDPORTER.COM/` repo already has the stretch classes; implement against the **git-tracked / live** files.

## 8. Options

### A — Grid stretch + `h-full` flex column (recommended)

Add `items-stretch` (explicit), `h-full` on `motion.div` + card, `flex flex-col flex-1 min-h-0` on inner content — both files. Matches `results-section` / `blog-grid` and component-patterns skill.

| Risk | Effort | Regression                                                  |
| ---- | ------ | ----------------------------------------------------------- |
| Low  | Small  | `/about` desktop + mobile, light + dark; Process connectors |

### B — Fixed `min-h-[…]` per section

Hard-code min heights from tallest card measurements.

| Risk                              | Effort |
| --------------------------------- | ------ |
| Med — breaks on copy/font changes | Small  |

### C — Systemic `.card-grid-equal` utility

New globals.css helper applied site-wide later.

| Risk                   | Effort |
| ---------------------- | ------ |
| Med — overscope for v1 | Med    |

**Recommend A** for `/ux-plan`.

## 9. Open questions for plan

1. Confirm implement target is workspace-root `components/about/*` (live), not nested duplicate.
2. Defer Contact + AIOS same-pattern grids? (Recommend yes for v1.)
3. Sync or ignore nested `FIELDPORTER.COM/` copy after fix? (Sam decision.)

## 10. Handoff

- Folder: `Documentation/reviews/ux/2026-07-28-about-equal-card-heights/`
- Next: `/ux-plan`
- Out of scope (so far): TechStack, Contact/AIOS equal-height, copy rewrites, tokens, `hosting/` stub
