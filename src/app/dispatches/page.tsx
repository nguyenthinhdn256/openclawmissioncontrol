import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

export default function DispatchesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dispatches"
        title="Dispatch Queue"
        description="This route is reserved and ready for the dashboard-pages tab to mount a full dispatch board."
        actions={<StatusBadge tone="active">slot prepared</StatusBadge>}
      />
    </div>
  );
}
