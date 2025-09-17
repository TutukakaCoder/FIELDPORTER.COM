## FIELDPORTER SEO Metadata & Social Preview Update

Date: 2025-08-09

### Summary

- Implemented global and per-page metadata to ensure correct titles, descriptions, and social preview images across the site.
- Added dynamic Open Graph/Twitter image endpoints for consistent, branded previews.
- Added favicon.svg and ensured complete icon coverage for browsers and devices.
- Adjusted robots image preview policy to encourage smaller thumbnails in Google results.

### Changes

- Updated `app/layout.tsx` global `metadata`:
  - Title default set to "FIELDPORTER - Build Your Own AI Advantage".
  - Description tightened to brand value proposition.
  - Robots: set `max-image-preview` to `standard` (smaller Google image), with GoogleBot override.
  - Icons: added `favicon.svg`; retained dark/light PNG variants and Apple Touch icons.
  - Open Graph/Twitter: added default image pointing to `/opengraph-image` (absolute via `metadataBase`).
- Homepage `app/page.tsx` metadata aligned to "Build Your Own AI Advantage" and switched OG/Twitter images to `/opengraph-image`.
- Contact and Insights pages updated to use `/opengraph-image` to avoid missing assets:
  - `app/contact/page.tsx`
  - `app/insights/page.tsx`
  - `app/insights/why-ai-consulting-fails/page.tsx`
  - `app/insights/real-cost-not-automating/page.tsx`
  - `app/insights/vc-portfolio-optimization/page.tsx`
- Added dynamic image routes:
  - `app/opengraph-image.tsx` (1200x630 PNG)
  - `app/twitter-image.tsx` (re-exports OG generator)
- Added `public/favicon.svg` and linked in global icons.

### Testing Instructions

- Local build: `npm run build` then `npm start`.
- Validate HTML head output on homepage and key pages.
- Social preview refresh:
  - LinkedIn: LinkedIn Post Inspector → Inspect `https://fieldporter.com/`
  - Facebook: Sharing Debugger → Scrape Again for `https://fieldporter.com/`
- Google result preview:
  - Use Google Rich Results Test and confirm `max-image-preview: standard` present and OG/Twitter tags resolved to absolute URLs.

### Notes

- `metadataBase` ensures relative image URLs are emitted as absolute (required by LinkedIn/Twitter).
- If a unique per-page image is desired later, place under `public/` and set `openGraph.images` on that page; otherwise the dynamic generator provides a consistent brand fallback.
