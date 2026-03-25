import type { MissionItem, MissionStatus } from "@/types/mission";

export function updateMissionStatus(mission: MissionItem, status: MissionStatus): MissionItem {
  return {
    ...mission,
    status,
  };
}
