import type { DispatchItem } from "@/types/dispatch";

export function getDispatchesForMission(dispatches: DispatchItem[], missionId: string) {
  return dispatches.filter((dispatch) => dispatch.missionId === missionId);
}

export function getBlockedDispatches(dispatches: DispatchItem[]) {
  return dispatches.filter((dispatch) => dispatch.status === "blocked");
}
