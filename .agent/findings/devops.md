# ORBIT: DevOps Findings

## [🟡 OPS-001] Sitemap
**Description**: Need `sitemap.xml` for discoverability.
**Status**: 🟢 Resolved

## [🟡 OPS-002] OG Image
**Description**: `og-image.jpg` referenced but missing.
**Status**: 🟢 Resolved

## [🟢 OPS-003] Vite Bind Localhost
**Description**: `vite.config.ts` binds to `::`. 
**Fix**: Added a comment explaining that `::` is intentional for LAN testing but should be `localhost` in production.
**Status**: 🟢 Resolved

## [🟢 OPS-004] Build Bundling
**Description**: Vite has no manual chunks set.
**Fix**: Added `manualChunks` to `vite.config.ts` splitting `vendor` (react, react-dom, react-router-dom), `ui` (framer-motion, radix-ui), and `supabase` into separate chunks.
**Status**: 🟢 Resolved

## [🟢 OPS-005] Dist Tracking
**Description**: Ensure `dist/` is not in git history.
**Fix**: Added `.tmp/` and `.supabase/` to `.gitignore`. (`dist/`, `.env`, `.env.local`, `node_modules/` were already there).
**Status**: 🟢 Resolved
