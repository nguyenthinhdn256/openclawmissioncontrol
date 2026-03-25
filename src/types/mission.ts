export type MissionStatus =
  | "draft"
  | "planned"
  | "ready"
  | "in_progress"
  | "qa_review"
  | "blocked"
  | "failed"
  | "done"
  | "cancelled";

export interface Mission {
  id: string;
  code: string;
  title: string;
  summary: string;
  objective: string;
  scope: string[];
  status: MissionStatus;
  priority: "low" | "normal" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  ownerRole: "commander" | "dispatcher";
  tags: string[];
  dependencyIds: string[];
  dispatchIds: string[];
  artifactIds: string[];
}
