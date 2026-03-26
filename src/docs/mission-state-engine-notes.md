# Mission State Engine Notes

Mission transitions are centralized in `src/lib/state/mission-state-machine.ts`.
Selectors and status update helpers stay separate so future live state can swap in without rewriting UI.
