export type QAGateDecision =
  | "pending"
  | "approved"
  | "needs_revision"
  | "blocked"
  | "failed"
  | "force_approved";

export interface QAGateRecord {
  id: string;
  missionId: string;
  dispatchId?: string;
  decision: QAGateDecision;
  reviewer: string;
  note: string;
  createdAt: string;
}
