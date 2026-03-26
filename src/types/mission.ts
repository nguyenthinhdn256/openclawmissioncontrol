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

export const missionPriorities = ["low", "medium", "high", "critical"] as const;

export type MissionStatus = (typeof missionStatuses)[number];
export type MissionPriority = (typeof missionPriorities)[number];

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

export interface MissionTimelineEvent {
  id: string;
  title: string;
  detail: string;
  actor: string;
  at: string;
  status: string;
}
