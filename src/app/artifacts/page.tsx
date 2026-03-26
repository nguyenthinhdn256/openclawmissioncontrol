import { ArtifactsBoard } from "@/components/artifacts/artifacts-board";
import { PageHeader } from "@/components/shared/page-header";
import { artifactsMock } from "@/lib/seed";

export default function ArtifactsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Outputs"
        title="Artifact library"
        description="Review the latest generated outputs and their readiness for handoff or reuse."
      />
      <ArtifactsBoard artifacts={artifactsMock} />
    </div>
  );
}
