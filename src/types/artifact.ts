export interface ArtifactRecord {
  id: string;
  missionId: string;
  dispatchId?: string;
  name: string;
  kind: "doc" | "code" | "test" | "build" | "log" | "evidence";
  status: "draft" | "ready" | "approved";
  path: string;
  updatedAt: string;
}
