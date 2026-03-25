import type { MissionStatus } from "@/types/mission";

const allowedTransitions: Record<MissionStatus, MissionStatus[]> = {
  draft: ["planned", "cancelled"],
  planned: ["ready", "blocked", "cancelled"],
  ready: ["in_progress", "blocked", "cancelled"],
  in_progress: ["qa_review", "blocked", "failed", "cancelled"],
  qa_review: ["done", "blocked", "failed"],
  blocked: ["ready", "in_progress", "cancelled"],
  failed: ["planned", "cancelled"],
  done: [],
  cancelled: [],
};

export function canTransitionMission(from: MissionStatus, to: MissionStatus) {
  return allowedTransitions[from].includes(to);
}
