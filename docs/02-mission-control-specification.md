# Mission Control Specification for OpenClaw

## 1. Mission Control Purpose
Mission Control is the operator-facing orchestration layer for OpenClaw. It provides a structured way to:
- define work as missions
- split work into dispatches
- assign execution lanes
- validate results through QA gates
- maintain auditable state
- surface status through a friendly dashboard

## 2. Roles
### 2.1 Commander
Owns overall mission outcome.

### 2.2 Dispatcher
Owns task decomposition and routing.

### 2.3 Executor
Completes assigned dispatches.

### 2.4 QA Operator
Reviews and validates outputs.

### 2.5 Observer
Read-only visibility for operators and stakeholders.

## 3. Global Rules
1. Every mission must have exactly one lifecycle state.
2. Every dispatch must belong to one mission.
3. No dispatch may move to `approved` without QA evidence unless explicitly force-approved by Commander.
4. Every blocking dependency must be resolved before the dependent dispatch can start.
5. Every state transition must append an event log entry.
6. All status badges shown in UI must come from persisted state, not computed only from chat text.
7. Cross-module outputs must reference contracts and schemas in `src/lib/contracts`.
8. If a dispatch touches multiple domains, it must declare the exact file scope and dependency set.
9. Retries must increment `attemptCount` and record failure reason.
10. Manual override must be traceable with actor, timestamp, and note.
