import { PageHeader } from "@/components/shared/page-header";
import { SettingsBoard } from "@/components/settings/settings-board";
import { settingsPanelsMock } from "@/lib/seed";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Settings and policies"
        description="Surface environment posture and operator rules without burying them in implementation details."
      />
      <SettingsBoard panels={settingsPanelsMock} />
    </div>
  );
}
