import {
  createEmptyDispatchDomainCount,
  createEmptyDispatchStatusCount,
  type Dispatch,
  type DispatchQueueSummary,
  type DispatchStatus,
} from "@/lib/contracts";

export function getDispatchQueueSummary(dispatches: Dispatch[]): DispatchQueueSummary {
  const byStatus = createEmptyDispatchStatusCount();
  const byDomain = createEmptyDispatchDomainCount();

  for (const dispatch of dispatches) {
    byStatus[dispatch.status] += 1;
    byDomain[dispatch.domain] += 1;
  }

  return {
    total: dispatches.length,
    byStatus,
    byDomain,
    unassignedCount: dispatches.filter((dispatch) => !dispatch.assignedTo).length,
    readyCount: byStatus.ready,
    blockedCount: byStatus.blocked,
  };
}

export function selectRecentDispatches(dispatches: Dispatch[], limit = 5): Dispatch[] {
  return [...dispatches]
    .sort((left, right) => {
      const leftValue = left.submittedAt ?? left.startedAt ?? "";
      const rightValue = right.submittedAt ?? right.startedAt ?? "";
      return rightValue.localeCompare(leftValue);
    })
    .slice(0, limit);
}

export function buildDispatchStatusMap(dispatches: Dispatch[]): Record<string, DispatchStatus> {
  return Object.fromEntries(dispatches.map((dispatch) => [dispatch.id, dispatch.status]));
}
