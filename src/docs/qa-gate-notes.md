# QA Gate Notes

## Purpose
The QA Gate Engine reviews dispatch outputs and converts checklist results into a deterministic decision.

## Files
- `src/lib/qa/qa-checklists.ts`
- `src/lib/qa/qa-gate.ts`
- `src/lib/qa/qa-selectors.ts`
- `src/lib/qa/index.ts`

## Public contract for page and integration layers
### `createInitialQAGateRecord(input)`
Creates a pending QA record with a default checklist.

### `evaluateDispatchForQA(input)`
Consumes a `Dispatch` and `DispatchEnvelope`, resolves the effective checklist, and produces a deterministic QA record.

### `finalizeQADecision(input)`
Finalizes a QA record. Normal path recomputes the decision from the checklist. Force approve is a separate explicit path.

### `canMissionClose(mission, gateRecords)`
Returns `true` only when all dispatches belonging to the mission have either `approved` or `force_approved` QA outcomes.

### Selectors
- `getPendingQARecords`
- `getFailedQARecords`
- `getApprovedQARecords`
- `getQASummary`

## Decision mapping
- `failed`: missing output, invalid schema, or contract break
- `blocked`: file scope mismatch
- `needs_revision`: tests/docs gaps
- `approved`: all required checks passed
- `force_approved`: explicit override path only
