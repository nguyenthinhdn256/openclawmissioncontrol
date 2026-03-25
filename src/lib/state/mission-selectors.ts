import type { MissionItem } from "@/types/mission";

export function countMissionsByStatus(missions: MissionItem[], status: MissionItem["status"]) {
  return missions.filter((mission) => mission.status === status).length;
}
