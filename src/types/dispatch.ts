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

export const dispatchDomains = [
  "foundation",
  "contracts",
  "mission_state",
  "dispatch",
  "qa",
  "dashboard_framework",
  "dashboard_pages",
  "integration_docs",
] as const;

export type DispatchStatus = (typeof dispatchStatuses)[number];
export type DispatchDomain = (typeof dispatchDomains)[number];

export interface DispatchItem {
  id: string;
  missionId: string;
  title: string;
  summary: string;
  assignee: string;
  status: DispatchStatus;
  domain: DispatchDomain;
  scope: string[];
  dependencies: string[];
  attemptCount: number;
  updatedAt: string;
  dueAt?: string;
  outputSummary?: string;
}
