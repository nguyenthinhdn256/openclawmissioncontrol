import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

export default function QAPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="QA Gate"
        title="QA Review"
        description="This route is reserved and ready for the dashboard-pages tab to mount QA records, checklists, and evidence review."
        actions={<StatusBadge tone="warning">awaiting board</StatusBadge>}
      />
    </div>
  );
}
