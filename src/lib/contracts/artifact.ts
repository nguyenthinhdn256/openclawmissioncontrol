import { z } from "zod";

export const artifactStatusValues = ["draft", "generated", "verified", "archived"] as const;
export const artifactKindValues = ["code", "doc", "report", "evidence", "asset"] as const;

export const artifactStatusSchema = z.enum(artifactStatusValues);
export const artifactKindSchema = z.enum(artifactKindValues);

export const artifactRecordSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  dispatchId: z.string().min(1).optional(),
  kind: artifactKindSchema,
  status: artifactStatusSchema,
  title: z.string().min(1),
  path: z.string().min(1),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
  notes: z.array(z.string()).default([]),
});

export const artifactKindCountSchema = z.record(artifactKindSchema, z.number().int().nonnegative());

export const artifactLibrarySummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byKind: artifactKindCountSchema,
  verifiedCount: z.number().int().nonnegative(),
});

export type ArtifactStatus = z.infer<typeof artifactStatusSchema>;
export type ArtifactKind = z.infer<typeof artifactKindSchema>;
export type ArtifactRecord = z.infer<typeof artifactRecordSchema>;
export type ArtifactKindCount = z.infer<typeof artifactKindCountSchema>;
export type ArtifactLibrarySummary = z.infer<typeof artifactLibrarySummarySchema>;
