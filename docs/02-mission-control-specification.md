# Mission Control Specification for OpenClaw

## 1. Purpose

Mission Control is the operator-facing orchestration layer for OpenClaw. It structures work into:

- missions
- dispatches
- QA gates
- artifacts
- auditable state

## 2. Roles

- Commander: owns overall mission outcome
- Dispatcher: decomposes and routes work
- Executor: completes assigned dispatches
- QA Operator: validates outputs
- Observer: read-only visibility

## 3. Global rules

1. Every mission has exactly one lifecycle state.
2. Every dispatch belongs to one mission.
3. No dispatch reaches `approved` without QA evidence unless force-approved.
4. Dependency blockers must clear before dependent work can start.
5. Every state transition should be traceable.
6. UI state should come from typed domain state, not chat text alone.
7. Cross-module outputs should align with `src/lib/contracts`.
8. File scope and dependencies should be explicit.
9. Retries should increment attempt count and keep notes.
10. Manual override should preserve actor, timestamp, and reason.
