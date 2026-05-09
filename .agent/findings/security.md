# VAULT: Security Findings

## [🔴 SEC-001] `.env` File Tracking
**Description**: `.env` patterns need to be ignored.
**Fix**: Added to `.gitignore`. Since it wasn't a git repo yet, no history removal needed.
**Status**: 🟢 Resolved

## [🔴 SEC-002] Edge Function Unauthenticated
**Description**: `create-admin` endpoint was open.
**Fix**: Added `ADMIN_SETUP_SECRET` bearer token validation. Needs to be set with `supabase secrets set`.
**Status**: 🟢 Resolved

## [🟢 SEC-003] Contact Form Spam
**Description**: Contact form inserts directly into db, allowing spam.
**Fix**: Implemented honeypot mechanism.
**Status**: 🟢 Resolved

## [🟢 SEC-004] Input Sanitization
**Description**: Form data lacks sanitization before DB persist.
**Fix**: Added strict input validation and length limits for name, email, project type, and message fields.
**Status**: 🟢 Resolved

## [🟢 SEC-005] Image Validation
**Description**: Server-side file validation is missing.
**Fix**: Added client-side MIME type and size limit validation in `useImageUpload.ts`. Commented that Supabase policy should enforce this server-side.
**Status**: 🟢 Resolved
