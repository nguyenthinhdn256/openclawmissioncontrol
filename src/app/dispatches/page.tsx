import { DispatchesBoard } from "@/components/dispatches/dispatches-board";
import { PageHeader } from "@/components/shared/page-header";
import { dispatchesMock } from "@/lib/seed";

export default function DispatchesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Execution"
        title="Dispatch queue"
        description="Track handoffs, assignees, attempts, and readiness across the delivery pipeline."
      />
      <DispatchesBoard dispatches={dispatchesMock} />
    </div>
  );
}
