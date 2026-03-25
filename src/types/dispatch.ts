export const dispatchStatuses = [
  "queued",
  "ready",
  "assigned",
  "working",
  "submitted",
  "qa_review",
  "needs_revision",
  "approved",
  "blocked",
  "failed",
  "cancelled",
] as const;

export type DispatchStatus = (typeof dispatchStatuses)[number];

export interface DispatchItem {
  id: string;
  missionId: string;
  title: string;
  summary: string;
  assignee: string;
  status: DispatchStatus;
  scope: string[];
  dependencies: string[];
  attemptCount: number;
  updatedAt: string;
  dueAt?: string;
  outputSummary?: string;
}
