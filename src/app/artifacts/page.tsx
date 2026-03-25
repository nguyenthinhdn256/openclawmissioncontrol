import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

export default function ArtifactsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Artifacts"
        title="Artifact Library"
        description="This route is reserved and ready for the dashboard-pages tab to mount generated outputs and evidence views."
        actions={<StatusBadge tone="neutral">slot prepared</StatusBadge>}
      />
    </div>
  );
}
