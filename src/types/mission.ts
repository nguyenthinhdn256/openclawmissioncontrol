export const missionStatuses = [
  "draft",
  "planned",
  "ready",
  "in_progress",
  "qa_review",
  "blocked",
  "failed",
  "done",
  "cancelled",
] as const;

export type MissionStatus = (typeof missionStatuses)[number];

export type MissionPriority = "low" | "medium" | "high" | "critical";

export interface MissionTimelineEvent {
  id: string;
  title: string;
  detail: string;
  at: string;
  actor?: string;
  status?: string;
}

export interface MissionItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  objective: string;
  status: MissionStatus;
  priority: MissionPriority;
  owner: string;
  lane: string;
  progress: number;
  tags: string[];
  blockers: string[];
  dispatchCount: number;
  completedDispatchCount: number;
  artifactCount: number;
  updatedAt: string;
  dueAt?: string;
}
