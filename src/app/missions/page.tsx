import { PageHeader } from "@/components/shared/page-header";
import { MissionsBoard } from "@/components/missions/missions-board";
import { missionsMock } from "@/lib/seed";

export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mission state"
        title="Mission board"
        description="Scan mission progress, blockers, and delivery posture from one place."
      />
      <MissionsBoard missions={missionsMock} />
    </div>
  );
}
