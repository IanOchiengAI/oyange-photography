# FORGE: Backend Findings

## [🟢 BE-001] Duplicated Hooks
**Description**: CRUD pattern copy-pasted 7 times in `usePortfolio.ts`.
**Status**: 🟢 Resolved

## [🟢 BE-002] AdminMessagesViewer Pattern
**Description**: Raw `supabase` calls instead of React Query.
**Status**: 🟢 Resolved

## [🟢 BE-003] RLS Overlaps
**Description**: Blog posts have overlapping `published` and `admin` policies.
**Fix**: Dropped existing overlapping policies and created two clean policies for public select and admin full access.
**Status**: 🟢 Resolved

## [🟢 BE-004] Database Indexes
**Description**: Missing indices on `sort_order` and `created_at`.
**Status**: 🟢 Resolved
