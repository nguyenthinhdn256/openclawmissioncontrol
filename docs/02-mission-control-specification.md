# Mission Control Specification

Core status enums:
- MissionStatus: draft | planned | ready | in_progress | qa_review | blocked | failed | done | cancelled
- DispatchStatus: queued | ready | assigned | working | submitted | qa_review | needs_revision | approved | blocked | failed | cancelled
- QAGateDecision: pending | approved | needs_revision | blocked | failed | force_approved

This repo keeps those enums aligned across:
- `src/types`
- `src/lib/contracts`
- `src/lib/seed`
- dashboard UI components
