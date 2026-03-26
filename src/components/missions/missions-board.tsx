import { MissionCard } from "@/components/missions/mission-card";
import type { MissionItem } from "@/types/mission";

export function MissionsBoard({ missions }: { missions: MissionItem[] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
}
