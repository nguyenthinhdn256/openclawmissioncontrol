# Contracts Notes

## Purpose
These contracts are the shared source of truth for Mission Control state, queue, artifact, and QA data.

## Shared dependency surface
- `src/lib/contracts/mission.ts`
- `src/lib/contracts/dispatch.ts`
- `src/lib/contracts/qa.ts`
- `src/lib/contracts/artifact.ts`
- `src/lib/contracts/index.ts`

## Compatibility rules
- Keep status enums aligned with the project specification.
- New fields should be additive and typed through Zod first.
- UI layers should import these types instead of redefining shapes locally.
