# Integration Notes

## What Part 8 changed

Part 8 acts as the glue layer for the Mission Control skeleton:
- centralizes all mock records in `src/lib/seed`
- validates those records with Zod schemas in `src/lib/contracts`
- adds `src/lib/utils/dashboard-summary.ts` for shared rollups
- updates page composition so boards consume one consistent seed source
- syncs README and docs so parallel-tab assembly stays aligned

## Seed files

- `mock-missions.ts`
- `mock-dispatches.ts`
- `mock-qa.ts`
- `mock-artifacts.ts`
- `index.ts`

## Verification after all 8 parts are merged

Run from repo root:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Then open the dev server:

```bash
npm run dev
```

## Expected behavior

- `/` shows overview metrics and activity feed
- `/missions` shows mission cards
- `/dispatches` shows dispatch queue rows
- `/qa` shows QA review cards
- `/artifacts` shows artifact cards
- `/settings` shows policy and environment panels

## Compatibility rule

Future live data integration should replace only `src/lib/seed` exports or the selectors feeding them.
UI components should not need schema changes for that swap.
