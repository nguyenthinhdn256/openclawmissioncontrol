# OpenClaw Mission Control

Mission Control dashboard for OpenClaw built with Next.js, TypeScript, Tailwind CSS, and Zod.

## Goal

This repo provides a modular Mission Control shell that models:
- missions
- dispatches
- QA gates
- artifacts
- operator-facing dashboard flows

Part 8 centralizes mock data into `src/lib/seed`, adds dashboard summary helpers, and syncs documentation so the project can be assembled consistently after parallel tab execution.

## Stack

- Next.js 14+
- TypeScript
- App Router
- Tailwind CSS
- Zod

## Folder structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    artifacts/page.tsx
    dispatches/page.tsx
    missions/page.tsx
    qa/page.tsx
    settings/page.tsx
  components/
    layout/
    dashboard/
    missions/
    dispatches/
    qa/
    artifacts/
    settings/
    shared/
  lib/
    config/
    contracts/
    state/
    dispatch/
    qa/
    seed/
    utils/
  types/
  docs/
```

## Included

- app shell with sidebar + topbar
- reusable dashboard cards and boards
- shared types + Zod contracts
- mission/dispatch/QA/artifact helpers
- centralized seed data
- dashboard summary aggregation helper
- integration notes for the 8-part workflow

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verify

```bash
npm run typecheck
npm run lint
npm run build
```

Or run:

```bash
npm run verify
```

## Seed data

Centralized mock records live in:
- `src/lib/seed/mock-missions.ts`
- `src/lib/seed/mock-dispatches.ts`
- `src/lib/seed/mock-qa.ts`
- `src/lib/seed/mock-artifacts.ts`

Those files are validated against Zod schemas from `src/lib/contracts` before export.

## Notes for multi-tab assembly

- Shared types live in `src/types`
- Runtime-safe schemas live in `src/lib/contracts`
- Board pages consume centralized seeds from `src/lib/seed`
- Dashboard rollups come from `src/lib/utils/dashboard-summary`
- `src/docs/integration-notes.md` explains the final glue layer
