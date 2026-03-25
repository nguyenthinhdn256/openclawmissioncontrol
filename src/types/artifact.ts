export type ArtifactKind = "prompt" | "schema" | "ui" | "log" | "report" | "bundle";
export type ArtifactStatus = "draft" | "review" | "approved" | "archived";

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
