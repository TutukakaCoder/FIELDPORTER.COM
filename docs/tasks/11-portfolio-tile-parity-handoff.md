# Portfolio Tile Parity — Implementation Handoff Report

**Status:** Implemented (Jul 2026). Build passed.  
**Plan file:** `.cursor/plans/portfolio_tile_polish_97efe838.plan.md`  
**Site root:** `FIELDPORTER.COM/`  
**Date context:** Jul 2026 chat research (Ask → Plan). Fresh agent should implement from this doc + the plan.

---

## 1. Mission (what the user wants)

Make homepage Live Client Work tiles and `/portfolio` Client Platforms look premium, matched, and media-complete:

1. Match **VOLOCEAN** tile to **GoGoProp** tile (media-first; kill dead space).
2. Save user-supplied **VOLOCEAN light-mode dashboard** image and display it.
3. Remove **green house icon overlay** on GoGoProp (red-circled in annotations).
4. Remove **em dashes (`—`)** from user-facing descriptions.
5. Fix GoGoProp dashboard looking **cut off**.
6. Reorder `/portfolio` Client Platforms: **VOLOCEAN → GoGoProp → Self-Development**.
7. Preload portfolio images (+ carefully warm Voluntas video) for fast premium feel.
8. Subtle premium UI/UX: equal cards, mobile-solid, robust, no clutter.

User annotations / source images were discussed in prior chat (homepage side-by-side tiles, VOLOCEAN dashboard mock, em-dash callouts, GoGoProp overlay circle).

---

## 2. Locked decisions (do not reopen unless blocked)

| ID | Decision |
|----|----------|
| D1 | Homepage VOLOCEAN gets `image` dashboard; match GoGoProp media-first layout. |
| D2 | `/portfolio` VOLOCEAN: **dashboard `heroImage` first**, then **video**, then desktop testimonial. |
| D3 | Remove GoGoProp floating house by dropping `logoSrc`. Do **not** edit PNG for v1. Sidebar mark baked into screenshot may remain. |
| D4 | Hero framing: `object-contain object-top` on dark bg (`bg-black/60–70`). Soften/remove hover `scale-[1.02]`. |
| D5 | VOLOCEAN chrome: category eyebrow (“Client and investment management”); drop Lucide `Building2` once image exists. Do **not** use `partnership-assets/voluntas-logo.*` (placeholder / old VOLUNTAS brand). |
| D6 | Preload on `/portfolio` only: idle-warm PNGs; video `preload="none"` until near viewport → `metadata`. Skip idle warm if `navigator.connection?.saveData`. Never idle-download full ~19MB MP4. |
| D7 | Reorder Client Platforms array: VOLOCEAN, GoGoProp, Self-Development. |
| D8 | `images.unoptimized: true` in next.config — leave alone. Compress/serve originals as-is. |

---

## 3. Architecture truth (read before coding)

### Surfaces

| Surface | File | Role |
|---------|------|------|
| Homepage tiles | `components/homepage/portfolio-section.tsx` | Two-card “Live client work” grid |
| Full portfolio | `app/portfolio/page.tsx` | Client component; sections + `ProjectMedia` + `ProjectCard` |
| Portfolio layout | `app/portfolio/layout.tsx` | Metadata only — usually leave alone |
| Route preloader | `hooks/use-simple-preloader.ts` | **Routes only** — do not stretch for media |
| OptimizedImage | `components/ui/optimized-image.tsx` | IO + skeleton; **unused** by portfolio today (optional later) |
| Next images | `next.config.js` | `images.unoptimized: true` (Firebase cold-start workaround) |

### Homepage card data today

```ts
// VOLOCEAN — NO image → dead space vs GoGoProp
{ id: "voluntas-intelligence", icon: Building2, /* no image */, ... }

// GoGoProp — has media + overlay logo
{
  image: "/portfolio/gogoprop/dashboard-hero.png",
  logoSrc: "/portfolio/gogoprop/mark.svg", // ← floating green house
  tagline: "... — ... — ...", // em dashes
}
```

Media block is gated: `{project.image ? (...) : null}`.  
Without `image`, VOLOCEAN shows Building2 icon block; GoGoProp shows “Property finance” eyebrow.

### Critical bug / conflict — `ProjectMedia` early return

In `app/portfolio/page.tsx` ~L468:

```
if (project.videoUrl) { return video + testimonial; }  // EARLY EXIT
if (project.heroImage) { return logo + hero + gallery; }
```

VOLOCEAN has `videoUrl` only. Adding `heroImage` alone is a **no-op** on `/portfolio` until this is refactored.

**Required render order after fix:** hero (+ gallery if any) → video → desktop testimonial.

### Crop root cause

Both homepage + portfolio hero use:

- Frame: `aspect-[16/10]` (ratio 1.6)
- Image: `object-cover object-top` (+ homepage hover `scale-[1.02]`)

| Asset | Dims | AR | vs 16/10 |
|-------|------|-----|----------|
| `gogoprop/dashboard-hero.png` | 1024×549 | ~1.865 | Wider → **left/right cropped** |
| Gallery PNGs | ~1600×1280 | ~1.25 | Taller → **bottom cropped** |
| New VOLOCEAN hero | 1024×547 | ~1.87 | Same class as GoGoProp hero |

**Plan fix:** `object-contain` on dark letterbox so full dashboard UI is visible. Gallery can keep cover or also contain; prefer consistent contain for product screenshots.

Note: GoGoProp hero PNG itself also truncates bottom UI (Operations radar / Next best actions partial). Contain shows what exists; inventing missing pixels needs a new screenshot (out of scope unless user supplies).

### Green house

1. **React overlay (remove):** `logoSrc` → `mark.svg` (`#36FFD8` house/g) absolute top-left on homepage + `ProjectMedia`.
2. **Possibly baked in PNG sidebar:** some research noted product chrome may include a mark. Removing `logoSrc` clears the circled floating badge. Do not Photoshop PNG in v1.

### Assets

**Exists:** `public/portfolio/gogoprop/`  
- `dashboard-hero.png` (+ identical `.jpg` twin ~72KB)  
- `pipeline-list.png`, `deal-workspace.png`, `borrower-dashboard.png`  
- `mark.svg`, `logo-dark.svg`

**Missing:** `public/portfolio/volocean/` (create)

**Source for VOLOCEAN dashboard (verified on disk):**  
`C:\Users\FreddyHopkins\AppData\Roaming\Cursor\User\workspaceStorage\0f3d87623e20825b537e52a34bfe1ed5\images\Gemini_Generated_Image_fo1cqefo1cqefo1c-70d43425-e174-4d89-9811-ae4195bcfc57.png`  
→ **1024×547, ~53KB**  
→ copy to `public/portfolio/volocean/dashboard-hero.png`

**Video:** `public/videos/Voluntas-application-run-through.mp4` ≈ **19.3 MB**  
Do **not** copy intro-video pattern (`preload="auto"` on ~2.5MB clip).

**Do not use as VOLOCEAN product logo:**  
`public/partnership-assets/voluntas-logo.svg` (placeholder “Voluntas Group” text) / `.png` (old branding).

### Preload reality today

- Route prefetch only (`useSimplePreloader`, `OptimizedLink`).
- Portfolio video: `preload="metadata"`.
- No `<link rel="preload">` for portfolio media.
- `priority={projectIndex === 0}` on portfolio hero path — after reorder, index 0 is VOLOCEAN (video), so priority never hits GoGoProp stills unless adjusted.

---

## 4. Em dashes to scrub (user-facing only)

### `components/homepage/portfolio-section.tsx`
- GoGoProp `tagline` (two `—`)
- `jasonTestimonial.projectResult` (one `—`)

### `app/portfolio/page.tsx`
- VOLOCEAN `outcomeLine`
- VOLOCEAN `description`
- GoGoProp `description`

**Suggested tone (examples):**
- “Specialist lending portal from enquiry through identity checks. Purpose-built pipeline, deal tools, and client portal, currently in active client testing ahead of launch.”
- “Shared client and investor workspace, live about 9 months.”

Skip code comments. Optional later (out of scope): VOYCAP outcomeLine, CTA “projects—no fluff”.

---

## 5. File-by-file implementation map

### NEW — `public/portfolio/volocean/dashboard-hero.png`
Copy Gemini AppData file. Create folder if needed.

### EDIT — `components/homepage/portfolio-section.tsx`
1. VOLOCEAN: add `image: "/portfolio/volocean/dashboard-hero.png"`; remove `icon`.
2. Extend type/UI so category eyebrow works for VOLOCEAN (hardcode “Client and investment management” or add `category?: string`).
3. GoGoProp: remove `logoSrc` (and remove overlay JSX if nothing else uses it — or keep overlay gated on `logoSrc` only).
4. Scrub em dashes.
5. Media CSS: `object-contain object-top`; dark bg; reduce hover scale.
6. Keep structure: media → status → title → tagline → View work; `h-full` equal cards.

### EDIT — `app/portfolio/page.tsx`
1. Reorder `client-platforms.projects` blocks.
2. VOLOCEAN: add `heroImage`; scrub em dashes.
3. GoGoProp: remove `logoSrc`; scrub description.
4. **Refactor `ProjectMedia`:**
   - Remove exclusive `if (videoUrl) return`.
   - Compose: optional hero/gallery → optional video → optional desktop testimonial.
   - Hero frame matches homepage contain treatment.
   - Video: `preload="none"` initially; IntersectionObserver (~200–400px rootMargin) → set `metadata`.
   - `priority`: first project with `heroImage`, or `priority={Boolean(heroImage) && isFirstHero}` — do not blindly use index 0 when index 0 is video-only.
5. Mount media preloader in `PortfolioPage`.

### NEW — `hooks/use-portfolio-media-preloader.ts`
- Idle (`requestIdleCallback` + `setTimeout` fallback).
- Warm:  
  `/portfolio/volocean/dashboard-hero.png`  
  `/portfolio/gogoprop/dashboard-hero.png`  
  `/portfolio/gogoprop/pipeline-list.png`  
  `/portfolio/gogoprop/deal-workspace.png`  
  `/portfolio/gogoprop/borrower-dashboard.png`
- Skip if `navigator.connection?.saveData === true`.
- Cleanup on unmount (cancel idle callback / timeout).
- Do **not** set video `src` + `preload=auto` in this hook.

### EDIT — `hooks/index.ts`
Export the new hook.

### LEAVE ALONE unless forced
- `next.config.js`
- `app/portfolio/layout.tsx`
- Chat knowledge / sitemap
- Global rename Voluntas → VOLOCEAN
- Deleting `mark.svg` (may stay unused)

---

## 6. UI/UX quality bar (while in these files)

FIELDPORTER standards: dark/glass, mobile-first, small bundles, accessible, fast.

**Do:**
- One job per card: product proof + name + status + one sentence + CTA.
- Equal visual weight on md+ 2-up grid (both always have media plane).
- Subtle motion only: fade-up already present; media hover ≤ ~1.01; border hover.
- Soft dark letterbox behind `object-contain` so light VOLOCEAN mock still looks intentional on dark site.
- Mobile: stack; image first; keep `shortTitle` / `line-clamp` patterns; 44px touch targets.
- Keyboard/focus rings already used elsewhere — preserve `focus-visible` on links/buttons.
- Alt text: “VOLOCEAN platform dashboard” / “GoGoProp Portal product interface” (do not claim “live screenshot” if mock).

**Do not:**
- Purple glow / pill spam / nested cards / floating badge clutter.
- Cards-in-cards on hero media.
- `preload="auto"` on 19MB Voluntas video.
- Stretch/distort screenshots.
- Slap partnership voluntas placeholder as “logo”.

**Premium extras OK if cheap:**
- Opacity fade-in on image `onLoad`.
- Shared tiny frame className string between homepage + portfolio to avoid drift.

---

## 7. Phased build order (execute in order)

1. Copy asset → `public/portfolio/volocean/dashboard-hero.png` (verify file exists).
2. Homepage data + CSS parity + em dashes + remove GoGoProp `logoSrc`.
3. Portfolio data reorder + em dashes + remove `logoSrc` + add VOLOCEAN `heroImage`.
4. Refactor `ProjectMedia` (image + video coexistence + contain + video IO preload).
5. Add `use-portfolio-media-preloader` + mount + export.
6. `npm run build` in `FIELDPORTER.COM`.
7. Visual/network acceptance (below).
8. Short change report for user; suggest Claude knowledge updates.

**PowerShell note:** never use `&&` in commands on this machine; run sequential statements.

---

## 8. Acceptance checklist

- [ ] Homepage: VOLOCEAN has dashboard; no dead space; structure matches GoGoProp.
- [ ] Homepage/Portfolio: no floating GoGoProp house overlay.
- [ ] No em dashes in targeted descriptions.
- [ ] GoGoProp hero shows more complete UI (`object-contain`).
- [ ] `/portfolio` order: VOLOCEAN → GoGoProp → Self-Development.
- [ ] VOLOCEAN shows dashboard **and** playable video.
- [ ] Images idle-warm on `/portfolio`; full MP4 not downloaded on open / Save-Data.
- [ ] Mobile stack looks premium; no broken layout.
- [ ] `npm run build` passes.
- [ ] Concise change report written.

---

## 9. Research agent consensus (prior chat)

Four Grok research passes agreed:

1. **Homepage gap** = missing VOLOCEAN `image`.
2. **Overlay** = `logoSrc` / `mark.svg` (primary fix).
3. **Crop** = `aspect-[16/10]` + `object-cover` vs asset ARs.
4. **Video blocks image** in `ProjectMedia` — must refactor for D2.
5. **Preload** = routes only today; add idle image warm; gate video.
6. **No volocean folder** until copy.
7. **Source Gemini PNG** available in AppData (Cursor `assets/` copy may be missing).

Disagreement nuance (resolved by plan): one pass suggested split surfaces (home image / portfolio video only) to avoid `ProjectMedia` work. **Locked plan overrides:** show both on `/portfolio` via stacked media.

---

## 10. Risks

| Risk | Mitigation |
|------|------------|
| Wire image path before file exists | Copy asset first |
| Video early-return | Refactor `ProjectMedia` before claiming done |
| User still sees house in PNG sidebar | Explain overlay removed; new capture needed for baked mark |
| Light mock on dark site | Dark letterbox + contain |
| 19MB video hurts mobile | No idle full fetch; IO metadata only |
| `priority` wrong after reorder | Priority first `heroImage`, not blindly index 0 |
| Homepage/portfolio CSS drift | Shared frame classes or mirrored strings |

---

## 11. Out of scope

- Global brand rename / Think Global partner page
- Re-export GoGoProp PNG without sidebar logo
- New case studies / SOP demo (old task 07)
- Chatbot knowledge mass update (optional one-liner only)
- Git commit/PR unless user asks
- Changing `images.unoptimized`

---

## 12. Paste prompt for implementer agent

```
Implement the approved plan in:
.cursor/plans/portfolio_tile_polish_97efe838.plan.md

Full research handoff:
FIELDPORTER.COM/docs/tasks/11-portfolio-tile-parity-handoff.md

Follow locked decisions D1–D8. Do not reopen options.
Copy Gemini VOLOCEAN PNG from AppData path in the handoff doc into public/portfolio/volocean/dashboard-hero.png first.
Refactor ProjectMedia so videoUrl no longer blocks heroImage.
Quality bar: premium, subtle, mobile-first, no clutter, no 19MB video auto-download.
Run npm run build after changes. End with a short change report.
Never use && in shell commands.
```

---

## 13. Add to Claude project knowledge

- Homepage VOLOCEAN tile lacked `image` (dead space vs GoGoProp).
- GoGoProp floating house = `logoSrc` → `mark.svg` overlay.
- `ProjectMedia` historically returned early on `videoUrl`, blocking `heroImage`.
- Portfolio screenshots: prefer `object-contain` on dark frames when AR mismatches.
- `images.unoptimized: true`; Voluntas demo video ~19MB — gate preload.
- Assets live under `public/portfolio/{client}/` (`gogoprop`, `volocean`).
