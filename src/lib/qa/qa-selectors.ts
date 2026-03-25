import { qaGateDecisionValues, type QAGateRecord, type QASummary } from "@/lib/contracts/qa";

export function getPendingQARecords(records: QAGateRecord[]): QAGateRecord[] {
  return records.filter((record) => record.decision === "pending");
}

export function getFailedQARecords(records: QAGateRecord[]): QAGateRecord[] {
  return records.filter((record) => record.decision === "failed");
}

export function getApprovedQARecords(records: QAGateRecord[]): QAGateRecord[] {
  return records.filter(
    (record) => record.decision === "approved" || record.decision === "force_approved",
  );
}

export function getQASummary(records: QAGateRecord[]): QASummary {
  const byDecision = Object.fromEntries(qaGateDecisionValues.map((value) => [value, 0])) as QASummary["byDecision"];

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
