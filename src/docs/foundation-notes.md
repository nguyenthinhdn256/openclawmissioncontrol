# Foundation Notes

## Purpose
This layer establishes the reusable visual and structural baseline for OpenClaw Mission Control before domain logic arrives.

## Files that form the shared foundation
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/layout/app-shell.tsx`
- `src/components/layout/topbar.tsx`
- `src/components/layout/sidebar.tsx`
- `src/components/shared/page-header.tsx`
- `src/components/shared/status-badge.tsx`
- `src/lib/config/site.ts`
- `src/lib/config/navigation.ts`
- `src/lib/utils/cn.ts`
- `src/types/navigation.ts`

## Reuse points for later tabs
- **App shell**: all future pages can mount inside the same sidebar/topbar chrome.
- **Navigation config**: page modules should read from shared route config instead of redefining labels.
- **Status badge**: mission, dispatch, QA, and artifact UI can all reuse the same tone system.
- **Page header**: board pages can use the same title/eyebrow/action layout.
- **Global theme**: future component tabs should stay within the same dark control-center visual language.
- **Homepage config mock**: later tabs can swap config-driven mock data with selectors or seed data without rewriting the overview layout.

## Intentional boundaries
- No mission state engine logic is implemented here.
- No dispatch logic is implemented here.
- No QA decision logic is implemented here.
- This layer only prepares slots and primitives for the later 7 parts.

## What the next tabs should expect
- Routes already exist conceptually in navigation.
- Layout primitives are stable and ready to consume.
- Overview content is mock-driven from config, not scattered in UI files.
