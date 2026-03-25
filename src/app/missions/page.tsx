import { MissionCard } from "@/components/missions/mission-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { missionsMock } from "@/lib/seed";

export default function MissionsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Missions"
        title="Mission board"
        description="MissionCard is ready for board, list, or spotlight layouts. It accepts typed mission props and stays presentation-only."
        badge={<StatusBadge label="slot prepared" tone="active" />}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {missionsMock.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
}
