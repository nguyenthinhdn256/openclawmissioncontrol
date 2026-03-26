import type { QAGateDecision, QAGateRecord } from "@/lib/contracts";

export function evaluateChecklist(record: QAGateRecord): QAGateDecision {
  const checklist = record.checklist;

  if (!checklist.schemaValid || !checklist.noContractBreak) {
    return "failed";
  }

  if (!checklist.fileScopeRespected || !checklist.outputPresent) {
    return "blocked";
  }

  if (!checklist.testsPassed || !checklist.docsUpdated) {
    return "needs_revision";
  }

  return "approved";
}
