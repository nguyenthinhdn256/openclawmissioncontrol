import {
  dispatchDomainValues,
  dispatchStatusValues,
  type Dispatch,
  type DispatchDomainCount,
  type DispatchQueueSummary,
  type DispatchStatusCount,
} from "@/lib/contracts/dispatch";

function createStatusCount(): DispatchStatusCount {
  return Object.fromEntries(dispatchStatusValues.map((value) => [value, 0])) as DispatchStatusCount;
}

function createDomainCount(): DispatchDomainCount {
  return Object.fromEntries(dispatchDomainValues.map((value) => [value, 0])) as DispatchDomainCount;
}

export function getDispatchQueueSummary(dispatches: Dispatch[]): DispatchQueueSummary {
  const byStatus = createStatusCount();
  const byDomain = createDomainCount();

  for (const dispatch of dispatches) {
    byStatus[dispatch.status] += 1;
    byDomain[dispatch.domain] += 1;
  }

  return {
    total: dispatches.length,
    byStatus,
    byDomain,
    unassignedCount: dispatches.filter((dispatch) => !dispatch.assignedTo).length,
    readyCount: dispatches.filter((dispatch) => dispatch.status === "ready").length,
    blockedCount: dispatches.filter((dispatch) => dispatch.status === "blocked").length,
  };
}
