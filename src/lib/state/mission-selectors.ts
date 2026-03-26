import type { MissionItem, MissionStatus } from "@/types/mission";

export function countMissionsByStatus(missions: MissionItem[], status: MissionStatus) {
  return missions.filter((mission) => mission.status === status).length;
}

export function getBlockedMissions(missions: MissionItem[]) {
  return missions.filter((mission) => mission.status === "blocked" || mission.blockers.length > 0);
}
