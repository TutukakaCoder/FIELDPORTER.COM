# Footer Legal Identity Update Report

Date: April 11, 2026

## Changes Made

- Added `LEGAL_ENTITY` object to `config/constants.ts` with registered details (FIELDPORTER LIMITED, Company No. 1301915, NZBN 9429035991564, GST 085-395-475).
- Updated `components/layout/footer.tsx` to include a clean, muted, single-line legal identity block.
- Updated `app/privacy-policy/page.tsx` and `app/terms-of-service/page.tsx` introduction text to reference the formal registered entity.
- Fixed footer layout overlap: Centered the copyright text and Privacy/Terms links to prevent overlap with fixed UI buttons (chat and scroll-to-top).
- Reduced the overall footer height by adjusting padding from `py-8 lg:py-10` to `py-6 lg:py-8` and removing excess margins.
- Verified all changes via local production build.

## Result

The site displays FIELDPORTER's corporate legal identity complying with minimal aesthetic requirements, with a properly centered layout that avoids UI overlap and a reduced overall footer footprint.
