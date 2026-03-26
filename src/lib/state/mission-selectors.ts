import {
  createEmptyMissionStatusCount,
  type Mission,
  type MissionBoardSummary,
} from "@/lib/contracts";

export function summarizeMissionBoard(missions: Mission[]): MissionBoardSummary {
  const byStatus = createEmptyMissionStatusCount();

  for (const mission of missions) {
    byStatus[mission.status] += 1;
  }

  return {
    total: missions.length,
    byStatus,
    blockedCount: byStatus.blocked,
    readyCount: byStatus.ready,
    doneCount: byStatus.done,
  };
}

export function selectRecentMissions(missions: Mission[], limit = 4): Mission[] {
  return [...missions]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, limit);
}

export function selectBlockedMissions(missions: Mission[]): Mission[] {
  return missions.filter((mission) => mission.status === "blocked");
}

export function countActiveMissions(missions: Mission[]): number {
  return missions.filter((mission) => ["ready", "in_progress", "qa_review"].includes(mission.status)).length;
}
