# ABA Brand Portal — standalone Vercel export

This folder is a complete source project. Shared ABA packages, official logos,
fonts, component previews and downloadable brand packs are included in vendor/.
No API server, Replit account settings, secrets or environment variables are required.

## GitHub → Vercel
1. Extract this ZIP.
2. Upload the CONTENTS of aba-brand-portal-vercel to the root of a GitHub repository.
   package.json, package-lock.json and vercel.json must be visible at the repository root.
   Include src/, public/ and vendor/. Do not upload the ZIP itself.
3. Import that repository into Vercel.
4. Root Directory: leave at the repository root (.). Framework: Vite.
5. Use Node.js 22 or later. The included configuration sets install to npm ci,
   build to npm run build, and output to dist.
6. Deploy. No PORT or BASE_PATH variables are needed.

If replacing the earlier failed upload, remove its old files first so that old
pnpm lockfiles or Vite configuration do not conflict with this export.
If you upload the outer folder instead, select aba-brand-portal-vercel as Vercel's Root Directory.

## Local development
Run npm ci, then npm run dev. To check production: npm run build && npm run preview.
Documentation pages and iframe previews support direct links and refreshes.
External links to ABA still require internet access.

## Scope
This exports the Brand Portal, not The Advisory website or its AI backend.
Brand download packs are included as generated snapshots. If editing source
tokens/assets, regenerate the packs in the original workspace and export again.
To make a fresh export from the original workspace: python3 scripts/export-brand-portal.py
Then generate the npm lockfile in the export directory before packaging.
