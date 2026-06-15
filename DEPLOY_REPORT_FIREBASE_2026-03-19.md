# Firebase deploy report – 19 Mar 2026

## GitHub
- Pushed from `FIELDPORTER.COM` to `main`. Commit: "Deploy artifacts and deploy report" (bcc4b05). No pull; local was source of truth.

## Firebase deploy (`npx firebase deploy`, project: fieldporter-website)
- **Hosting**: Deployed. 118 files, upload complete.
- **Firestore**: Deployed. Rules and indexes from `firestore.indexes.json` applied.
- **Functions**: **Failed.** `firebase-frameworks-fieldporter-website:ssrfieldporterwebsite(us-central1)` – Cloud Build failed with:
  - `npm error ECONNRESET` (network read) during remote `npm install` on Google’s build servers.
  - Transient network/connectivity issue on Google side, not a code error.
  - Build log: https://console.cloud.google.com/cloud-build/builds;region=us-central1/632793d7-c5f8-448d-ad15-465c205554f5?project=412133715476

## Live site
- https://fieldporter-website.web.app/ returns **200**. Hosting is serving; SSR function was not updated due to the functions deploy failure.

## Next steps
- Re-run **only functions** when convenient: `npx firebase deploy --only functions` (no timeout issue; retry often fixes ECONNRESET).
- Optional: upgrade Node 20 → 22 (deprecation 2026-04-30) and `firebase-functions@latest` in the functions codebase when ready.
