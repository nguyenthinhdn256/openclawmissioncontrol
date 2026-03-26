# Dashboard Pages & Flows Notes

## Overview of data ownership

Part 7 keeps typed mock data colocated with the board components so each route can render immediately without waiting for Part 8 seed integration.

### Current page consumers

- `/` -> `src/components/dashboard/overview-panel.tsx`
  - consumes `mockMissions` from `src/components/missions/missions-board.tsx`
  - consumes `mockDispatches` from `src/components/dispatches/dispatches-board.tsx`
  - consumes `mockQaRecords` from `src/components/qa/qa-board.tsx`
  - consumes `mockArtifacts` + `getArtifactMetrics()` from `src/components/artifacts/artifacts-board.tsx`
  - consumes selectors/helpers:
    - `summarizeMissionBoard()`
    - `selectRecentMissions()`
    - `selectBlockedMissions()`
    - `countActiveMissions()`
    - `getDispatchQueueSummary()`
    - `selectRecentDispatches()`
    - `getQASummary()`

- `/missions` -> `src/components/missions/missions-board.tsx`
  - consumes local `mockMissions`
  - consumes `summarizeMissionBoard()`

- `/dispatches` -> `src/components/dispatches/dispatches-board.tsx`
  - consumes local `mockDispatches`
  - consumes `getDispatchQueueSummary()`
  - consumes `buildDispatchStatusMap()`
  - consumes `areDispatchDependenciesReady()`

- `/qa` -> `src/components/qa/qa-board.tsx`
  - consumes local `mockQaRecords`
  - consumes `getQASummary()`
  - consumes `selectLatestQARecords()`

- `/artifacts` -> `src/components/artifacts/artifacts-board.tsx`
  - consumes local `mockArtifacts`
  - consumes local helper `getArtifactMetrics()`

- `/settings` -> `src/components/settings/settings-board.tsx`
  - consumes `siteConfig`
  - consumes local static configuration groups

## Why mocks are colocated for Part 7

This keeps the board modules self-contained and easy to validate while the integration layer is still moving. The pages already rely on typed contracts, so the future migration path is shallow.

## What Part 8 should do next

1. Create shared seed sources under `src/lib/seed`.
2. Move `mockMissions`, `mockDispatches`, `mockQaRecords`, and `mockArtifacts` into seed modules.
3. Keep selector function signatures unchanged.
4. Update board imports to read from `src/lib/seed` instead of local module constants.
5. Preserve page-level consumption exactly as-is to avoid breaking App Router surfaces.
