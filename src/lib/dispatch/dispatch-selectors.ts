import type { DispatchItem } from "@/types/dispatch";

export function getDispatchesForMission(dispatches: DispatchItem[], missionId: string) {
  return dispatches.filter((dispatch) => dispatch.missionId === missionId);
}
