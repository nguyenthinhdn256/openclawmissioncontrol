import { ArtifactCard } from "@/components/artifacts/artifact-card";
import type { ArtifactItem } from "@/types/artifact";

export function ArtifactsBoard({ artifacts }: { artifacts: ArtifactItem[] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {artifacts.map((artifact) => (
        <ArtifactCard key={artifact.id} artifact={artifact} />
      ))}
    </div>
  );
}
