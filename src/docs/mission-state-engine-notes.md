# Mission State Engine Notes

## Purpose
The mission state engine provides deterministic lifecycle control for Mission entities. It is designed to keep mission status changes explicit, testable, and safe for dashboard consumption.

## What this module exposes
- `missionTransitionMap`: canonical allowed status transitions
- `canTransitionMission`: guard function for validating mission lifecycle moves
- `transitionMission`: immutable mission transition helper with structured error output and a timeline event payload
- `computeMissionProgress`: derives mission progress from dispatch statuses
- `countMissionsByStatus`, `selectBlockedMissions`, `selectReadyMissions`, `selectOverdueMissions`, `summarizeMissionBoard`: read-model selectors for UI
- object-based mission action creators for future reducers, stores, or event logs

## How dashboard pages should use it
Dashboard surfaces should use selectors instead of re-implementing filtering logic in components.

Recommended usage:
1. Load a mission list from seed data or server data.
2. Use `countMissionsByStatus` for metric cards.
3. Use `selectReadyMissions`, `selectBlockedMissions`, and `selectOverdueMissions` for queue panels.
4. Use `summarizeMissionBoard` to power board-level overview widgets.
5. Use `computeMissionProgress` when rendering mission cards or detail pages that aggregate dispatch completion.

This keeps UI components thin and ensures all status math is centralized.

## How QA should use it
QA flows should not directly mutate mission status strings.

Recommended usage:
1. When execution completes, transition mission from `in_progress` to `qa_review` with `transitionMission`.
2. If QA approves the mission, transition from `qa_review` to `done`.
3. If QA finds issues, transition from `qa_review` back to `in_progress`.
4. If QA discovers a hard blocker, transition to `blocked` with a reason.
5. If output is invalid or unrecoverable, transition to `failed`.

This preserves a deterministic lifecycle and gives QA a structured way to move work forward or backward.

## Structured error behavior
Invalid transitions do not throw by default. Instead, `canTransitionMission` and `transitionMission` return structured error metadata containing:
- current status
- requested status
- error code
- allowed target statuses
- readable message

That makes the engine safe for both UI actions and automated pipelines.

## Handoff expectation for later tabs
Later tabs can assume these imports are stable:
- `@/lib/contracts`
- `@/lib/state`
- `@/types/mission`
- `@/types/dispatch`
- `@/types/qa`

Dashboard pages can now read deterministic mission summaries, while QA logic can rely on guarded status transitions instead of ad-hoc string updates.
