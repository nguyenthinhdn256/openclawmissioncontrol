import { PageHeader } from "@/components/shared/page-header";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { StatusBadge } from "@/components/shared/status-badge";
import { settingsPanelsMock } from "@/lib/seed";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Settings"
        title="System posture and policy notes"
        description="SettingsPanel groups environment, policy, and workflow information without binding to complex settings state."
        badge={<StatusBadge label="slot prepared" tone="neutral" />}
      />

      <SettingsPanel
        title="Control surface"
        description="These sections show how the page layer can compose grouped settings information using one reusable component."
        sections={settingsPanelsMock}
      />
    </div>
  );
}
