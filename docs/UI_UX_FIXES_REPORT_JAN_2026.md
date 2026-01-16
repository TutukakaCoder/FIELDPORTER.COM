# UI/UX Fixes Report - Jan 2026

## Summary

Addressed reported UI/UX issues on mobile, specifically focusing on missing images, text overflow in industry cards, and button layout in the CTA section.

## Changes

### 1. Image Fixes

**Issue:** Images (Jason Holdsworth, etc.) were not showing.
**Root Cause:** Filenames contained spaces ("Jason H Profile image.jpg"), which can cause loading issues on some deployments/browsers.
**Fix:**

- Renamed all profile images to standard kebab-case format:
  - `jason-h-profile.jpg`
  - `seb-lindner-profile.jpg`
  - `steve-p-profile.jpg`
  - `paul-r-profile.jpg`
- Updated `components/homepage/portfolio-section.tsx` to reference the new filenames.

### 2. Industry Cards (Text Overflow)

**Issue:** Titles and descriptions on "Smart Manufacturing", "Venture Capital", etc., were overrunning or overlapping on mobile.
**Root Cause:** The description and tech stack text were absolutely positioned (`absolute inset-0`) inside a container with a fixed minimum height (`min-h-[60px]`). When text exceeded this height (common on mobile), it overflowed or was cut off, and didn't push surrounding elements down.
**Fix:**

- Refactored `IndustryCard` in `portfolio-section.tsx`.
- Removed absolute positioning.
- Implemented a CSS Grid stack approach (`grid place-items-center` with children at `col-start-1 row-start-1`).
- This allows the container to automatically grow to fit the tallest content, ensuring text is never cut off and properly pushes down the stats section below it.

### 3. CTA Buttons (Layout)

**Issue:** "Let's Explore Your Options" buttons were not formatting properly on mobile.
**Fix:**

- Updated `components/homepage/cta-section.tsx`.
- Added `w-full sm:w-auto` to both buttons.
- This ensures buttons take full width on mobile (stacking vertically with good hit targets) while maintaining their natural size on larger screens.

## Verification

- Ran `npm run build`: **Success**.
- Verified code changes against reported screenshots (by proxy of description).

## Next Steps

- Deploy to staging/production to verify fixes on actual mobile devices.
- Clear browser cache if images still don't appear immediately.
