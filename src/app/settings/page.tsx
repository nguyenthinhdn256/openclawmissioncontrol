import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Configuration & Policy"
        description="This route is reserved and ready for the dashboard-pages tab to mount environment, policy, and health settings."
        actions={<StatusBadge tone="neutral">slot prepared</StatusBadge>}
      />
    </div>
  );
}
