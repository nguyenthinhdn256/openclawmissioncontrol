import {
  dispatchSchema,
  type Dispatch,
  type DispatchStatus,
} from "@/lib/contracts/dispatch";

const dependencyReadyStatuses: DispatchStatus[] = ["approved"];

export function isDispatchReady(dispatch: Dispatch, dependencyDispatches: Dispatch[]): boolean {
  if (dispatch.status !== "queued" && dispatch.status !== "ready") {
    return false;
  }

  return dispatch.dependencyDispatchIds.every((dependencyId) =>
    dependencyDispatches.some(
      (dependency) =>
        dependency.id === dependencyId && dependencyReadyStatuses.includes(dependency.status),
    ),
  );
}

export function assignDispatch(dispatch: Dispatch, assignee: string, assignedAt: string): Dispatch {
  const nextStatus: DispatchStatus = dispatch.status === "ready" ? "assigned" : "assigned";

  return dispatchSchema.parse({
    ...dispatch,
    status: nextStatus,
    assignedTo: assignee,
    startedAt: dispatch.startedAt ?? assignedAt,
  });
}

export function submitDispatch(dispatch: Dispatch, submittedAt: string, notes: string[] = []): Dispatch {
  return dispatchSchema.parse({
    ...dispatch,
    status: "submitted",
    submittedAt,
    notes: [...dispatch.notes, ...notes],
  });
}

export function approveDispatch(dispatch: Dispatch, approvedAt: string): Dispatch {
  return dispatchSchema.parse({
    ...dispatch,
    status: "approved",
    approvedAt,
  });
}

export function requestDispatchRevision(dispatch: Dispatch, note: string): Dispatch {
  return dispatchSchema.parse({
    ...dispatch,
    status: "needs_revision",
    notes: [...dispatch.notes, note],
  });
}

export function blockDispatch(dispatch: Dispatch, note: string): Dispatch {
  return dispatchSchema.parse({
    ...dispatch,
    status: "blocked",
    notes: [...dispatch.notes, note],
  });
}
