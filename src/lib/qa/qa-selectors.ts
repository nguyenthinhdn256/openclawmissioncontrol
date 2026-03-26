import {
  createEmptyQADecisionCount,
  type QAGateRecord,
  type QASummary,
} from "@/lib/contracts";

export function getQASummary(records: QAGateRecord[]): QASummary {
  const byDecision = createEmptyQADecisionCount();

  for (const record of records) {
    byDecision[record.decision] += 1;
  }

  return {
    total: records.length,
    pendingCount: byDecision.pending,
    approvedCount: byDecision.approved + byDecision.force_approved,
    failedCount: byDecision.failed,
    blockedCount: byDecision.blocked,
    needsRevisionCount: byDecision.needs_revision,
    byDecision,
  };
}

export function selectLatestQARecords(records: QAGateRecord[], limit = 5): QAGateRecord[] {
  return [...records]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, limit);
}
