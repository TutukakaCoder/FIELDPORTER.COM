# Task 09: Entrance Animation Update

## Goal

Replace or update the site entrance animation (intro video on first visit per session).

---

## Current state (code)

| Area | File |
|------|------|
| Provider | `components/layout/entrance-provider.tsx` — sessionStorage gate |
| Video | `components/layout/video-entrance.tsx` |
| Asset | `/public/videos/new-intro-video-v2.mp4` |
| Preloader | `hooks/use-simple-preloader.ts` — preloads routes during video |
| Skip | Click/tap/key skips video |
| Session key | `fieldporter-video-seen-session` in sessionStorage |
| Excluded | `/think-global-voluntas` — no entrance |

Wrapped in `app/layout.tsx` via `EntranceProvider`.

---

## Requested changes

- New entrance animation — user will define creative direction
- May be new video, shorter clip, or different motion treatment
- Should align with software-first / premium brand after content + design tasks

---

## Files likely to change

```
components/layout/video-entrance.tsx
components/layout/entrance-provider.tsx
public/videos/  (new asset)
hooks/use-simple-preloader.ts  (if duration changes)
lib/animations.ts  (if switching from video to motion)
```

Reference: `docs/PREMIUM_VIDEO_ENTRANCE_IMPLEMENTATION_REPORT.md`

---

## Open questions

1. New video asset or coded animation (Framer Motion / R3F)?
2. Target duration (current unknown — check video length)
3. Keep skip-on-first-interaction behaviour?
4. Show on every session or first visit ever (localStorage vs sessionStorage)?

---

## Research prompt (paste into new chat)

```
FieldPorter entrance animation replacement. Current: full-screen video new-intro-video-v2.mp4, once per session, skippable.

Research task:
1. Premium site entrance patterns 2025 — short video vs logo reveal vs subtle fade (pros/cons for B2B dev studio).
2. Optimal duration before skip rate spikes.
3. Implementation options in Next.js: video preload, poster frame, reduced motion preference (prefers-reduced-motion).

Files: components/layout/video-entrance.tsx, entrance-provider.tsx

User may supply new video file.

Return: recommendation + implementation plan. Wait for asset before coding if video-based.
```

---

## Acceptance criteria

- [ ] New entrance experience live
- [ ] Skip and accessibility respected
- [ ] No layout shift or blocking render regressions
- [ ] Partner page still excluded
- [ ] `npm run build` passes
