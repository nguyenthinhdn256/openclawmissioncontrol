import type { Dispatch, DispatchEnvelope } from "@/lib/contracts/dispatch";
import type { Mission } from "@/lib/contracts/mission";
import {
  qaGateRecordSchema,
  type QAChecklist,
  type QAGateDecision,
  type QAGateRecord,
} from "@/lib/contracts/qa";
import { createChecklistFromEnvelope } from "@/lib/qa/qa-checklists";

type CreateInitialQAGateRecordInput = {
  id: string;
  missionId: string;
  dispatchId?: string;
  reviewer: string;
  createdAt: string;
  note?: string;
};

type EvaluateDispatchForQAInput = {
  dispatch: Dispatch;
  envelope: DispatchEnvelope;
  reviewer: string;
  createdAt: string;
  checklist?: Partial<QAChecklist>;
  evidence?: string[];
  note?: string;
};

type FinalizeQADecisionInput = {
  record: QAGateRecord;
  reviewer: string;
  decidedAt: string;
  note?: string;
  forceApprove?: {
    actor: string;
    reason: string;
  };
};

function checklistToDecision(checklist: QAChecklist): QAGateDecision {
  if (!checklist.outputPresent) {
    return "failed";
  }

  if (!checklist.schemaValid || !checklist.noContractBreak) {
    return "failed";
  }

  if (!checklist.fileScopeRespected) {
    return "blocked";
  }

  if (!checklist.testsPassed || !checklist.docsUpdated) {
    return "needs_revision";
  }

  return "approved";
}

export function createInitialQAGateRecord({
  id,
  missionId,
  dispatchId,
  reviewer,
  createdAt,
  note = "QA record initialized.",
}: CreateInitialQAGateRecordInput): QAGateRecord {
  return qaGateRecordSchema.parse({
    id,
    missionId,
    dispatchId,
    decision: "pending",
    checklist: {
      schemaValid: false,
      fileScopeRespected: false,
      outputPresent: false,
      testsPassed: false,
      docsUpdated: false,
      noContractBreak: false,
    },
    evidence: [],
    reviewer,
    note,
    createdAt,
    updatedAt: createdAt,
  });
}

export function evaluateDispatchForQA({
  dispatch,
  envelope,
  reviewer,
  createdAt,
  checklist,
  evidence = [],
  note = "Dispatch evaluated against QA gate.",
}: EvaluateDispatchForQAInput): QAGateRecord {
  const resolvedChecklist = createChecklistFromEnvelope(envelope, {
    schemaValid: true,
    fileScopeRespected:
      envelope.fileScope.length === 0 || envelope.fileScope.every((path) => dispatch.fileScope.includes(path)),
    outputPresent: envelope.outputRefs.length > 0,
    ...checklist,
  });

  const decision = checklistToDecision(resolvedChecklist);

  return qaGateRecordSchema.parse({
    id: `qa_${dispatch.id}`,
    missionId: dispatch.missionId,
    dispatchId: dispatch.id,
    decision,
    checklist: resolvedChecklist,
    evidence,
    reviewer,
    note,
    createdAt,
    updatedAt: createdAt,
  });
}

export function finalizeQADecision({
  record,
  reviewer,
  decidedAt,
  note,
  forceApprove,
}: FinalizeQADecisionInput): QAGateRecord {
  if (forceApprove) {
    return qaGateRecordSchema.parse({
      ...record,
      reviewer,
      note: note ?? forceApprove.reason,
      decision: "force_approved",
      updatedAt: decidedAt,
      forceApprovedBy: forceApprove.actor,
      forceApprovedReason: forceApprove.reason,
    });
  }

  return qaGateRecordSchema.parse({
    ...record,
    reviewer,
    note: note ?? record.note,
    decision: checklistToDecision(record.checklist),
    updatedAt: decidedAt,
  });
}

export function canMissionClose(mission: Mission, gateRecords: QAGateRecord[]): boolean {
  if (mission.dispatchIds.length === 0) {
    return false;
  }

  const missionRecords = gateRecords.filter((record) => record.missionId === mission.id && record.dispatchId);
  const closingDecisions: QAGateDecision[] = ["approved", "force_approved"];

  return mission.dispatchIds.every((dispatchId) =>
    missionRecords.some(
      (record) => record.dispatchId === dispatchId && closingDecisions.includes(record.decision),
    ),
  );
}

export function mapChecklistToDecision(checklist: QAChecklist): QAGateDecision {
  return checklistToDecision(checklist);
}
