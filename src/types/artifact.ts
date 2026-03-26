export const artifactKinds = [
  "prompt",
  "schema",
  "ui",
  "log",
  "report",
  "bundle",
  "code",
  "doc",
  "evidence",
  "asset",
] as const;

export const artifactStatuses = [
  "draft",
  "review",
  "approved",
  "archived",
  "generated",
  "verified",
] as const;

export type ArtifactKind = (typeof artifactKinds)[number];
export type ArtifactStatus = (typeof artifactStatuses)[number];

export interface ArtifactItem {
  id: string;
  missionId: string;
  dispatchId?: string;
  title: string;
  description: string;
  kind: ArtifactKind;
  status: ArtifactStatus;
  owner: string;
  updatedAt: string;
  path?: string;
  sizeLabel?: string;
  tags: string[];
}
