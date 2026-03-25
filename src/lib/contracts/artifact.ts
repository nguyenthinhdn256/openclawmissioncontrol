import { z } from "zod";

export const artifactStatusValues = [
  "pending",
  "generated",
  "verified",
  "archived",
  "failed",
] as const;

export const artifactKindValues = [
  "code_patch",
  "document",
  "test_report",
  "qa_evidence",
  "log_bundle",
  "archive",
  "other",
] as const;

export type ArtifactStatus = (typeof artifactStatusValues)[number];
export type ArtifactKind = (typeof artifactKindValues)[number];

export interface ArtifactRecord {
  id: string;
  missionId?: string;
  dispatchId?: string;
  name: string;
  path: string;
  kind: ArtifactKind;
  status: ArtifactStatus;
  createdAt: string;
  updatedAt: string;
  note?: string;
}

export type ArtifactKindCount = Record<ArtifactKind, number>;

export interface ArtifactLibrarySummary {
  total: number;
  generated: number;
  verified: number;
  failed: number;
  byKind: ArtifactKindCount;
}

export const artifactStatusSchema = z.enum(artifactStatusValues);
export const artifactKindSchema = z.enum(artifactKindValues);

export const artifactRecordSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1).optional(),
  dispatchId: z.string().min(1).optional(),
  name: z.string().min(1),
  path: z.string().min(1),
  kind: artifactKindSchema,
  status: artifactStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  note: z.string().optional(),
});

export function createEmptyArtifactKindCount(): ArtifactKindCount {
  return {
    code_patch: 0,
    document: 0,
    test_report: 0,
    qa_evidence: 0,
    log_bundle: 0,
    archive: 0,
    other: 0,
  };
}
