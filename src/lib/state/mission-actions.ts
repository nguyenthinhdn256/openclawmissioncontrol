import type { Mission, MissionStatus } from "@/lib/contracts";

export type MissionPatch = Partial<Omit<Mission, "id" | "code" | "createdAt" | "createdBy">>;

export function updateMission(mission: Mission, patch: MissionPatch): Mission {
  return {
    ...mission,
    ...patch,
    updatedAt: patch.updatedAt ?? new Date().toISOString(),
    progress: patch.progress ? { ...mission.progress, ...patch.progress } : mission.progress,
  };
}

export function transitionMissionStatus(mission: Mission, nextStatus: MissionStatus): Mission {
  const now = new Date().toISOString();

  return {
    ...mission,
    status: nextStatus,
    updatedAt: now,
    startedAt: nextStatus === "in_progress" && !mission.startedAt ? now : mission.startedAt,
    completedAt: nextStatus === "done" ? now : mission.completedAt,
    blockedReason: nextStatus === "blocked" ? mission.blockedReason ?? "Awaiting downstream dependency." : null,
  };
}

export function attachDispatchToMission(mission: Mission, dispatchId: string): Mission {
  if (mission.dispatchIds.includes(dispatchId)) {
    return mission;
  }

  return {
    ...mission,
    dispatchIds: [...mission.dispatchIds, dispatchId],
    updatedAt: new Date().toISOString(),
    progress: {
      ...mission.progress,
      totalDispatches: mission.progress.totalDispatches + 1,
    },
  };
}
