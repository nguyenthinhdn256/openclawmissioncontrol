import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Missions"
        title="Mission Board"
        description="This route is reserved and ready for the dashboard-pages tab to mount a full missions board."
        actions={<StatusBadge tone="active">slot prepared</StatusBadge>}
      />
    </div>
  );
}
