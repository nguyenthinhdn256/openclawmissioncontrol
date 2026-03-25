import type { Mission, MissionBoardSummary, MissionStatusCount } from "@/lib/contracts";
import { createEmptyMissionStatusCount } from "@/lib/contracts";

const terminalMissionStatuses = new Set(["done", "cancelled"]);
const activeMissionStatuses = new Set(["in_progress", "qa_review"]);
const priorityRank = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
} as const;

export function countMissionsByStatus(missions: Mission[]): MissionStatusCount {
  return missions.reduce<MissionStatusCount>((accumulator, mission) => {
    accumulator[mission.status] += 1;
    return accumulator;
  }, createEmptyMissionStatusCount());
}

export function selectMissionById(missions: Mission[], missionId: string): Mission | undefined {
  return missions.find((mission) => mission.id === missionId);
}

export function selectBlockedMissions(missions: Mission[]): Mission[] {
  return missions.filter((mission) => mission.status === "blocked");
}

export function selectReadyMissions(missions: Mission[]): Mission[] {
  return missions
    .filter((mission) => mission.status === "ready")
    .sort((left, right) => {
      const priorityDelta = priorityRank[left.priority] - priorityRank[right.priority];
      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      return left.updatedAt.localeCompare(right.updatedAt);
    });
}

export function selectOverdueMissions(missions: Mission[], now = new Date().toISOString()): Mission[] {
  return missions
    .filter((mission) => Boolean(mission.dueAt))
    .filter((mission) => !terminalMissionStatuses.has(mission.status))
    .filter((mission) => (mission.dueAt as string) < now)
    .sort((left, right) => (left.dueAt as string).localeCompare(right.dueAt as string));
}

export function summarizeMissionBoard(missions: Mission[], now = new Date().toISOString()): MissionBoardSummary {
  const counts = countMissionsByStatus(missions);

  return {
    total: missions.length,
    counts,
    overdue: selectOverdueMissions(missions, now).length,
    blocked: counts.blocked,
    ready: counts.ready,
    active: missions.filter((mission) => activeMissionStatuses.has(mission.status)).length,
  };
}
