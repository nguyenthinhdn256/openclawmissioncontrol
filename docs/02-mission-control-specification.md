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

Permissions:
- create / edit / cancel missions
- approve planning
- open or close dispatches
- override QA decisions
- mark blocked / failed / done

### 2.2 Dispatcher
Owns task decomposition and routing.

Permissions:
- create dispatches
- assign lane / agent
- set dependencies
- requeue / retry / reassign

### 2.3 Executor
Completes assigned dispatches.

Permissions:
- claim execution
- submit artifacts
- attach logs
- request unblock
- report completion

### 2.4 QA Operator
Reviews and validates outputs.

Permissions:
- run QA checks
- approve / reject / request revision
- attach evidence
- escalate issues

### 2.5 Observer
Read-only visibility for operators/stakeholders.

Permissions:
- read missions
- read dispatches
- read QA decisions
- read events and artifacts

## 3. Global Rules
1. Every mission must have exactly one lifecycle state.
2. Every dispatch must belong to one mission.
3. No dispatch may move to `approved` without QA evidence unless explicitly force-approved by Commander.
4. Every blocking dependency must be resolved before the dependent dispatch can start.
5. Every state transition must append an event log entry.
6. All status badges shown in UI must come from persisted state, not computed only from chat text.
7. Cross-module outputs must reference contracts/schemas in `src/lib/contracts`.
8. If a dispatch touches multiple domains, it must declare the exact file scope and dependency set.
9. Retries must increment `attemptCount` and record failure reason.
10. Manual override must be traceable with actor, timestamp, and note.

## 4. Mission State Schema

```ts
export type MissionStatus =
  | "draft"
  | "planned"
  | "ready"
  | "in_progress"
  | "qa_review"
  | "blocked"
  | "failed"
  | "done"
  | "cancelled";
```

### Mission entity

```ts
export interface Mission {
  id: string;
  code: string;
  title: string;
  summary: string;
  objective: string;
  scope: string[];
  status: MissionStatus;
  priority: "low" | "normal" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  ownerRole: "commander" | "dispatcher";
  tags: string[];
  dependencyIds: string[];
  dispatchIds: string[];
  artifactIds: string[];
  qaGate: QAGateStatus;
  progress: {
    totalDispatches: number;
    completedDispatches: number;
    approvedDispatches: number;
    failedDispatches: number;
  };
}
```

## 5. Dispatch State Schema

```ts
export type DispatchStatus =
  | "queued"
  | "ready"
  | "assigned"
  | "working"
  | "submitted"
  | "qa_review"
  | "needs_revision"
  | "approved"
  | "blocked"
  | "failed"
  | "cancelled";
```

### Dispatch entity

```ts
export interface Dispatch {
  id: string;
  missionId: string;
  sequence: number;
  title: string;
  objective: string;
  domain:
    | "foundation"
    | "contracts"
    | "mission_state"
    | "dispatch"
    | "qa"
    | "dashboard_framework"
    | "dashboard_pages"
    | "integration_docs";
  status: DispatchStatus;
  assignedTo: string | null;
  inputRefs: string[];
  outputRefs: string[];
  fileScope: string[];
  dependencyDispatchIds: string[];
  acceptanceCriteria: string[];
  validationCommands: string[];
  notes: string[];
  attemptCount: number;
  startedAt?: string;
  submittedAt?: string;
  approvedAt?: string;
}
```

## 6. QA Gate Schema

```ts
export type QAGateDecision =
  | "pending"
  | "approved"
  | "needs_revision"
  | "blocked"
  | "failed"
  | "force_approved";
```

```ts
export interface QAGateRecord {
  id: string;
  missionId: string;
  dispatchId?: string;
  decision: QAGateDecision;
  checklist: {
    schemaValid: boolean;
    fileScopeRespected: boolean;
    outputPresent: boolean;
    testsPassed: boolean;
    docsUpdated: boolean;
    noContractBreak: boolean;
  };
  evidence: string[];
  reviewer: string;
  note: string;
  createdAt: string;
}
```

## 7. Dispatch Format

Every dispatch must be serializable into one canonical format:

```json
{
  "dispatch_id": "disp_001",
  "mission_id": "mis_001",
  "title": "Implement mission state engine",
  "objective": "Create deterministic mission lifecycle helpers and selectors",
  "domain": "mission_state",
  "input_refs": [
    "docs/specification.md#mission-state-schema",
    "src/lib/contracts/mission.ts"
  ],
  "output_refs": [
    "src/lib/state/mission-state-machine.ts",
    "src/lib/state/mission-selectors.ts"
  ],
  "file_scope": [
    "src/lib/state/mission-state-machine.ts",
    "src/lib/state/mission-selectors.ts",
    "src/types/mission.ts"
  ],
  "dependency_dispatch_ids": ["disp_002"],
  "acceptance_criteria": [
    "all mission transitions are guarded",
    "invalid transitions return structured errors",
    "selectors derive dashboard counts correctly"
  ],
  "validation_commands": ["npm run lint", "npm run typecheck"],
  "handoff_contract": {
    "produces": ["mission lifecycle API", "mission selectors"],
    "consumed_by": ["dashboard_pages", "qa"]
  }
}
```

## 8. QA Gate Rules

### Required checks
1. File existence check
2. Path scope check
3. Type/schema compatibility check
4. Acceptance criteria check
5. Validation command evidence
6. Handoff compatibility check
7. Documentation sync check when public behavior changed

### Gate outcomes
- `approved`: all mandatory checks passed
- `needs_revision`: partial completion, fixable gaps
- `blocked`: dependency or environment blocker
- `failed`: output invalid or unsafe
- `force_approved`: Commander explicitly overrides

## 9. Event Log Schema

```ts
export interface TimelineEvent {
  id: string;
  entityType: "mission" | "dispatch" | "qa" | "artifact" | "system";
  entityId: string;
  type:
    | "created"
    | "updated"
    | "assigned"
    | "started"
    | "submitted"
    | "approved"
    | "rejected"
    | "blocked"
    | "failed"
    | "retried"
    | "cancelled"
    | "note_added";
  actor: string;
  message: string;
  createdAt: string;
  meta?: Record<string, unknown>;
}
```

## 10. Recommended Dashboard Surfaces
- Overview
- Missions board
- Dispatch queue
- QA review
- Agents & lanes
- Artifacts
- Settings & policies
- Activity timeline

## 11. Suggested Code Split

Total implementation areas: **8**
1. Foundation & Config
2. Shared Contracts & Schemas
3. Mission State Engine
4. Dispatch Engine
5. QA Gate Engine
6. Dashboard UI Framework
7. Dashboard Pages & Flows
8. Integration, Seed Data, Testing & Docs Sync
