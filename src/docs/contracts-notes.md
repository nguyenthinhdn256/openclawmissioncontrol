# Contracts Notes

This folder now defines the shared schema authority for Mission Control.

## Source of truth

All machine-checkable contracts live in `src/lib/contracts`.
Each contract file exports:

- status/domain constant unions
- Zod schemas
- inferred TypeScript types
- small read-model schemas for dashboard and engine layers

## Shared dependencies for other tabs

### Part 3 — Mission State Engine
Uses:

- `MissionSchema`
- `MissionStatusSchema`
- `MissionProgressSchema`
- `MissionBoardSummarySchema`
- `TimelineEventSchema`

### Part 4 — Dispatch Engine
Uses:

- `DispatchSchema`
- `DispatchStatusSchema`
- `DispatchEnvelopeSchema`
- `DispatchQueueSummarySchema`
- `DispatchHandoffContractSchema`

### Part 5 — QA Gate Engine
Uses:

- `QAGateRecordSchema`
- `QAChecklistSchema`
- `QAGateDecisionSchema`
- `QASummarySchema`
- mission + dispatch contracts from the shared index

### Part 6 / 7 — Dashboard UI + Pages
Uses:

- dashboard-facing read models such as `MissionBoardSummarySchema`, `DispatchQueueSummarySchema`, `QASummarySchema`, and `ArtifactLibrarySummarySchema`
- all status enums for badges, filters, counters, and detail pages

### Part 8 — Integration / Seed / Testing / Docs
Uses:

- every schema in `src/lib/contracts/index.ts` as validation entrypoints for seed data and fixtures

## Compatibility notes

- Mission-level `qaGate` is normalized to `QAGateDecision`
- Dispatch envelope follows the canonical snake_case handoff format from the core spec
- `src/types/*` now re-export inferred types from the contracts layer so UI and engine code can import from either path without schema drift
