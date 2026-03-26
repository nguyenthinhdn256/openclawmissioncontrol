export const qaGateDecisions = [
  "pending",
  "approved",
  "needs_revision",
  "blocked",
  "failed",
  "force_approved",
] as const;

export type QAGateDecision = (typeof qaGateDecisions)[number];

export interface QACheckItem {
  label: string;
  done: boolean;
}

export interface QAReviewItem {
  id: string;
  missionId: string;
  dispatchId?: string;
  title: string;
  reviewer: string;
  submittedAt: string;
  updatedAt: string;
  decision: QAGateDecision;
  checklist: QACheckItem[];
  evidence: string[];
  notes: string[];
  blocker?: string;
}
