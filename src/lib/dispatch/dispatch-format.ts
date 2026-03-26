import type { DispatchItem } from "@/types/dispatch";

export function formatDispatchScope(dispatch: DispatchItem) {
  return dispatch.scope.join(" • ");
}
