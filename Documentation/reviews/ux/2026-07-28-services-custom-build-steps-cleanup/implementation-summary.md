# Implementation summary — Services “How a custom build works” cleanup

## Goal

Replace the five-card desktop carousel with a clean vertical numbered list so the custom-build process is easier to scan, and remove double vertical padding under the page shell.

## Change scope

**Localized** — `MethodologySection` only (page shell left as rhythm owner; `methodologyData` untouched).

## Status

**Partial — pending Sam visual QA**

## What changed (user-visible)

- Desktop carousel, snap scroll, and prev/next arrows removed
- Mobile bordered cards removed
- One vertical numbered timeline (`01`–`05`) for all breakpoints, with a subtle connector line between steps
- Section feels lighter; page `section-rhythm-xl` is the only vertical padding on this block

## Token / spacing changes

| Item      | Change                                                                  |
| --------- | ----------------------------------------------------------------------- |
| Root      | `<section py-16 md:py-24>` → `<div className="relative">` (no `py-*`)   |
| Container | Inner `max-w-7xl … px-*` removed (page supplies `max-w-6xl`)            |
| Subtitle  | `text-gray-700 dark:text-white/70` → `text-gray-600 dark:text-gray-300` |
| Numbers   | `text-blue-600 dark:text-blue-400 tabular-nums` (no “Step ” prefix)     |
| List      | `max-w-2xl mx-auto`; rows `flex gap-4 md:gap-6` + `pb-8` / `last:pb-0`  |
| Connector | `w-px flex-1 bg-gray-900/10 dark:bg-white/10` (hidden on last)          |

## Files changed

| File                                          | Change                                                  |
| --------------------------------------------- | ------------------------------------------------------- |
| `components/services/methodology-section.tsx` | Vertical `<ol>` timeline; carousel/cards/arrows removed |
| `app/services/page.tsx`                       | No code change — shell already correct                  |

## Visual acceptance criteria

| #   | Criterion                                            | Code matches brief? | Sam visual QA |
| --- | ---------------------------------------------------- | ------------------- | ------------- |
| 1   | 1280 light: all 5 steps, no horizontal scroll/arrows | Yes                 | Not run       |
| 2   | 1280 dark: readable number/title/body                | Yes                 | Not run       |
| 3   | 768: single list, no carousel                        | Yes                 | Not run       |
| 4   | 375: compact list, no card chrome                    | Yes                 | Not run       |
| 5   | Lighter than What We Build                           | Yes (structure)     | Not run       |
| 6   | Tighter gap before FAQ (no nested `py-*`)            | Yes                 | Not run       |
| 7   | Soft stagger; no snap/arrows                         | Yes                 | Not run       |
| 8   | Copy unchanged                                       | Yes                 | Not run       |

## Manual check list for Sam

1. `/services` @ 1280 light → **How a custom build works** → vertical list, all 5 steps, no arrows
2. Toggle dark @ 1280 → contrast OK
3. 768 → still one list
4. 375 light (+ dark spot) → clean stack, no card borders
5. Scroll into **Common Questions** → gap feels tighter
6. Spot-check **What We Build** tabs still work

## Deferred / follow-ups

- Consolidate 5 → 3–4 steps (Option C) — needs Sam copy lock
- About / Contact / AIOS process UIs
- FAQ wrapper still uses its own `section-rhythm-xl`; if gap still feels large after visual QA, tighten that next

## Known-bug-patterns

Updated pattern **#7** (double section rhythm): nested Methodology `py-*` fixed; adjacent Methodology+FAQ dual rhythm still partial.
