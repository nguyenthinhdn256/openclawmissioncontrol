# Dashboard UI Framework Notes

## Purpose
This layer provides reusable dashboard presentation components for OpenClaw Mission Control.
The page layer should compose these components with selector or seed data instead of placing dense layout code directly in route files.

## Components delivered
- `MetricCard`: compact KPI block for overview metrics
- `SectionCard`: reusable framed section wrapper with title, subtitle, badge, and actions slot
- `TimelineFeed`: event feed for activity streams, audits, and handoff notes
- `MissionCard`: mission summary card with priority, progress, tags, blockers, and owner
- `DispatchRow`: dense row for queue and board-style dispatch lists
- `QAReviewCard`: review summary surface with decision, checklist, evidence, and notes
- `ArtifactCard`: output/evidence card with kind, owner, path, and status
- `SettingsPanel`: grouped controls/info panel for settings and policy pages

## Intended page usage
- `/` overview page should use `MetricCard`, `SectionCard`, `TimelineFeed`
- `/missions` should use `MissionCard`
- `/dispatches` should use `DispatchRow`
- `/qa` should use `QAReviewCard`
- `/artifacts` should use `ArtifactCard`
- `/settings` should use `SettingsPanel`

## Design rules
- Components are typed and data-light
- No complex state machine logic inside UI components
- Status rendering should go through the shared `StatusBadge`
- Shared contracts should come from `src/types` and `src/lib/contracts`
- Page layer may swap mock data for selectors later without changing these components
