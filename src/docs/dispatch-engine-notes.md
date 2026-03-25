# Dispatch Engine Notes

## Core outputs
- `isDispatchReady`
- `assignDispatch`
- `submitDispatch`
- `approveDispatch`
- `requestDispatchRevision`
- `blockDispatch`
- `serializeDispatchEnvelope`
- `getDispatchQueueSummary`

## Handoff contract for QA
QA consumes `DispatchEnvelope` produced by `serializeDispatchEnvelope`. This keeps review deterministic around:
- file scope
- expected outputs
- validation commands
- dependency references
