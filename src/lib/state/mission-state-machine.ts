import type { MissionStatus } from "@/lib/contracts";

const allowedTransitions: Record<MissionStatus, MissionStatus[]> = {
  draft: ["planned", "cancelled"],
  planned: ["ready", "blocked", "cancelled"],
  ready: ["in_progress", "blocked", "cancelled"],
  in_progress: ["qa_review", "blocked", "failed", "cancelled"],
  qa_review: ["done", "in_progress", "failed", "blocked"],
  blocked: ["ready", "in_progress", "cancelled"],
  failed: ["planned", "in_progress", "cancelled"],
  done: [],
  cancelled: [],
};

export function canTransitionMissionStatus(current: MissionStatus, next: MissionStatus): boolean {
  return allowedTransitions[current].includes(next);
}

export function getMissionTransitions(status: MissionStatus): MissionStatus[] {
  return allowedTransitions[status];
}
