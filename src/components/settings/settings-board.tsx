import { SettingsPanel } from "@/components/settings/settings-panel";
import type { SettingsPanelData } from "@/lib/seed";

export function SettingsBoard({ panels }: { panels: SettingsPanelData[] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {panels.map((panel) => (
        <SettingsPanel key={panel.title} panel={panel} />
      ))}
    </div>
  );
}
