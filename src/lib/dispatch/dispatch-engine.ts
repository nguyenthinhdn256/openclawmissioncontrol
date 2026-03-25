import type { DispatchItem, DispatchStatus } from "@/types/dispatch";

export function updateDispatchStatus(dispatch: DispatchItem, status: DispatchStatus): DispatchItem {
  return {
    ...dispatch,
    status,
  };
}
