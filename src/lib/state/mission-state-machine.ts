import type { Dispatch, DispatchStatus, Mission, MissionProgress, MissionStatus, TimelineEvent, TimelineEventType } from "@/lib/contracts";

export const missionTransitionMap: Record<MissionStatus, readonly MissionStatus[]> = {
  draft: ["planned", "cancelled"],
  planned: ["ready", "blocked", "cancelled"],
  ready: ["in_progress", "blocked", "cancelled"],
  in_progress: ["qa_review", "blocked", "failed", "cancelled"],
  qa_review: ["done", "in_progress", "blocked", "failed", "cancelled"],
  blocked: ["planned", "ready", "in_progress", "failed", "cancelled"],
  failed: ["planned", "ready", "in_progress", "cancelled"],
  done: [],
  cancelled: [],
};

export type MissionTransitionErrorCode = "NO_OP" | "TRANSITION_NOT_ALLOWED";

export interface MissionTransitionError {
  code: MissionTransitionErrorCode;
  from: MissionStatus;
  to: MissionStatus;
  message: string;
  allowedTargets: readonly MissionStatus[];
}

export type MissionTransitionCheck =
  | {
      ok: true;
      from: MissionStatus;
      to: MissionStatus;
      allowedTargets: readonly MissionStatus[];
    }
  | {
      ok: false;
      error: MissionTransitionError;
    };

export interface MissionProgressSnapshot extends MissionProgress {
  completionRate: number;
  approvalRate: number;
  activeDispatches: number;
  blockedDispatches: number;
  qaReviewDispatches: number;
  terminalDispatches: number;
}

export interface TransitionMissionOptions {
  now?: string;
  actor?: string;
  note?: string;
  blockedReason?: string | null;
}

export type TransitionMissionResult =
  | {
      ok: true;
      mission: Mission;
      event: TimelineEvent;
      previousStatus: MissionStatus;
      nextStatus: MissionStatus;
    }
  | {
      ok: false;
      error: MissionTransitionError;
    };

const terminalDispatchStatuses: readonly DispatchStatus[] = ["approved", "failed", "cancelled"];
const activeDispatchStatuses: readonly DispatchStatus[] = ["assigned", "working", "submitted", "qa_review", "needs_revision"];

function resolveMissionStatus(input: MissionStatus | Pick<Mission, "status">): MissionStatus {
  return typeof input === "string" ? input : input.status;
}

export function canTransitionMission(
  current: MissionStatus | Pick<Mission, "status">,
  nextStatus: MissionStatus,
): MissionTransitionCheck {
  const from = resolveMissionStatus(current);
  const allowedTargets = missionTransitionMap[from] ?? [];

  if (from === nextStatus) {
    return {
      ok: false,
      error: {
        code: "NO_OP",
        from,
        to: nextStatus,
        message: `Mission is already in \`${from}\` status.`,
        allowedTargets,
      },
    };
  }

  if (!allowedTargets.includes(nextStatus)) {
    return {
      ok: false,
      error: {
        code: "TRANSITION_NOT_ALLOWED",
        from,
        to: nextStatus,
        message: `Mission transition from \`${from}\` to \`${nextStatus}\` is not allowed.`,
        allowedTargets,
      },
    };
  }

  return {
    ok: true,
    from,
    to: nextStatus,
    allowedTargets,
  };
}

export function computeMissionProgress(dispatches: Array<Pick<Dispatch, "status">>): MissionProgressSnapshot {
  const totalDispatches = dispatches.length;
  const approvedDispatches = dispatches.filter((dispatch) => dispatch.status === "approved").length;
  const failedDispatches = dispatches.filter((dispatch) => dispatch.status === "failed").length;
  const terminalDispatches = dispatches.filter((dispatch) => terminalDispatchStatuses.includes(dispatch.status)).length;
  const activeDispatches = dispatches.filter((dispatch) => activeDispatchStatuses.includes(dispatch.status)).length;
  const blockedDispatches = dispatches.filter((dispatch) => dispatch.status === "blocked").length;
  const qaReviewDispatches = dispatches.filter((dispatch) => dispatch.status === "qa_review").length;

  const completionRate = totalDispatches === 0 ? 0 : Number(((terminalDispatches / totalDispatches) * 100).toFixed(2));
  const approvalRate = totalDispatches === 0 ? 0 : Number(((approvedDispatches / totalDispatches) * 100).toFixed(2));

  return {
    totalDispatches,
    completedDispatches: terminalDispatches,
    approvedDispatches,
    failedDispatches,
    completionRate,
    approvalRate,
    activeDispatches,
    blockedDispatches,
    qaReviewDispatches,
    terminalDispatches,
  };
}

function resolveTimelineEventType(nextStatus: MissionStatus): TimelineEventType {
  switch (nextStatus) {
    case "in_progress":
      return "started";
    case "qa_review":
      return "submitted";
    case "blocked":
      return "blocked";
    case "failed":
      return "failed";
    case "done":
      return "approved";
    case "cancelled":
      return "cancelled";
    default:
      return "updated";
  }
}

function buildTransitionEvent(
  mission: Mission,
  previousStatus: MissionStatus,
  nextStatus: MissionStatus,
  at: string,
  actor: string,
  note?: string,
): TimelineEvent {
  return {
    id: `evt_${mission.id}_${at}`,
    entityType: "mission",
    entityId: mission.id,
    type: resolveTimelineEventType(nextStatus),
    actor,
    message: `Mission moved from ${previousStatus} to ${nextStatus}.`,
    createdAt: at,
    meta: {
      previousStatus,
      nextStatus,
      note: note ?? null,
    },
  };
}

export function transitionMission(
  mission: Mission,
  nextStatus: MissionStatus,
  options: TransitionMissionOptions = {},
): TransitionMissionResult {
  const check = canTransitionMission(mission, nextStatus);

  if (!check.ok) {
    return {
      ok: false,
      error: check.error,
    };
  }

  const at = options.now ?? new Date().toISOString();
  const actor = options.actor ?? "system";
  const previousStatus = mission.status;

  const updatedMission: Mission = {
    ...mission,
    status: nextStatus,
    updatedAt: at,
    startedAt: nextStatus === "in_progress" ? mission.startedAt ?? at : mission.startedAt,
    completedAt: nextStatus === "done" ? at : nextStatus === "cancelled" ? mission.completedAt : mission.completedAt,
    blockedReason: nextStatus === "blocked" ? options.blockedReason ?? mission.blockedReason ?? null : null,
  };

  return {
    ok: true,
    mission: updatedMission,
    event: buildTransitionEvent(updatedMission, previousStatus, nextStatus, at, actor, options.note),
    previousStatus,
    nextStatus,
  };
}
