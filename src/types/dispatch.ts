export type DispatchStatus =
  | "queued"
  | "ready"
  | "assigned"
  | "working"
  | "submitted"
  | "qa_review"
  | "needs_revision"
  | "approved"
  | "blocked"
  | "failed"
  | "cancelled";

export interface Dispatch {
  id: string;
  missionId: string;
  sequence: number;
  title: string;
  objective: string;
  domain: string;
  status: DispatchStatus;
  assignedTo: string | null;
  fileScope: string[];
  dependencyDispatchIds: string[];
  acceptanceCriteria: string[];
  validationCommands: string[];
  attemptCount: number;
}
