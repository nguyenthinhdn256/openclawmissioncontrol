import { ArtifactCard } from "@/components/artifacts/artifact-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { artifactsMock } from "@/lib/seed";

export default function ArtifactsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Artifacts"
        title="Output inventory"
        description="ArtifactCard presents outputs, evidence, and generated files in a modular format ready for page-layer composition."
        badge={<StatusBadge label="review" tone="warning" />}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {artifactsMock.map((artifact) => (
          <ArtifactCard key={artifact.id} artifact={artifact} />
        ))}
      </div>
    </div>
  );
}
