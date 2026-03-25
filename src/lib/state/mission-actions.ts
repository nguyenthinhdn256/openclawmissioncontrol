import type { Mission, MissionStatus } from "@/lib/contracts";
import type { MissionProgressSnapshot } from "./mission-state-machine";

export type MissionAction =
  | {
      type: "mission/create";
      payload: Mission;
    }
  | {
      type: "mission/transition";
      payload: {
        missionId: string;
        fromStatus: MissionStatus;
        toStatus: MissionStatus;
        actor?: string;
        at: string;
        note?: string;
      };
    }
  | {
      type: "mission/progress/recompute";
      payload: {
        missionId: string;
        progress: MissionProgressSnapshot;
        at: string;
      };
    }
  | {
      type: "mission/dispatch/attach";
      payload: {
        missionId: string;
        dispatchId: string;
        at: string;
      };
    }
  | {
      type: "mission/artifact/attach";
      payload: {
        missionId: string;
        artifactId: string;
        at: string;
      };
    }
  | {
      type: "mission/block";
      payload: {
        missionId: string;
        actor?: string;
        reason: string;
        at: string;
      };
    };

export function createMissionAction(mission: Mission): MissionAction {
  return {
    type: "mission/create",
    payload: mission,
  };
}

export function createMissionTransitionAction(params: {
  missionId: string;
  fromStatus: MissionStatus;
  toStatus: MissionStatus;
  actor?: string;
  at?: string;
  note?: string;
}): MissionAction {
  return {
    type: "mission/transition",
    payload: {
      ...params,
      at: params.at ?? new Date().toISOString(),
    },
  };
}

export function createMissionProgressRecomputedAction(params: {
  missionId: string;
  progress: MissionProgressSnapshot;
  at?: string;
}): MissionAction {
  return {
    type: "mission/progress/recompute",
    payload: {
      ...params,
      at: params.at ?? new Date().toISOString(),
    },
  };
}

export function createMissionDispatchAttachedAction(params: {
  missionId: string;
  dispatchId: string;
  at?: string;
}): MissionAction {
  return {
    type: "mission/dispatch/attach",
    payload: {
      ...params,
      at: params.at ?? new Date().toISOString(),
    },
  };
}

export function createMissionArtifactAttachedAction(params: {
  missionId: string;
  artifactId: string;
  at?: string;
}): MissionAction {
  return {
    type: "mission/artifact/attach",
    payload: {
      ...params,
      at: params.at ?? new Date().toISOString(),
    },
  };
}

export function createMissionBlockedAction(params: {
  missionId: string;
  reason: string;
  actor?: string;
  at?: string;
}): MissionAction {
  return {
    type: "mission/block",
    payload: {
      ...params,
      at: params.at ?? new Date().toISOString(),
    },
  };
}
