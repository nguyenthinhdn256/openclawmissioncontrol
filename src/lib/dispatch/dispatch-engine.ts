import type { Dispatch, DispatchStatus } from "@/lib/contracts";

export function transitionDispatchStatus(dispatch: Dispatch, nextStatus: DispatchStatus): Dispatch {
  const now = new Date().toISOString();

  return {
    ...dispatch,
    status: nextStatus,
    attemptCount:
      nextStatus === "working" && dispatch.status !== "working"
        ? dispatch.attemptCount + 1
        : dispatch.attemptCount,
    startedAt: nextStatus === "working" && !dispatch.startedAt ? now : dispatch.startedAt,
    submittedAt: nextStatus === "submitted" ? now : dispatch.submittedAt,
    approvedAt: nextStatus === "approved" ? now : dispatch.approvedAt,
  };
}

export function areDispatchDependenciesReady(dispatch: Dispatch, statusesById: Record<string, DispatchStatus>): boolean {
  return dispatch.dependencyDispatchIds.every((dependencyId: string) => {
    const dependencyStatus = statusesById[dependencyId];
    return dependencyStatus === "approved" || dependencyStatus === "submitted";
  });
}
