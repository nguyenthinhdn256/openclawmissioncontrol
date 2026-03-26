import { DispatchRow } from "@/components/dispatches/dispatch-row";
import type { DispatchItem } from "@/types/dispatch";

export function DispatchesBoard({ dispatches }: { dispatches: DispatchItem[] }) {
  return (
    <div className="space-y-5">
      {dispatches.map((dispatch) => (
        <DispatchRow key={dispatch.id} dispatch={dispatch} />
      ))}
    </div>
  );
}
