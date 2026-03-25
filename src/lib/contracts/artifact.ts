import { z } from "zod";

const NonEmptyStringSchema = z.string().min(1);
const TimestampSchema = z.string().min(1);

export const ARTIFACT_KINDS = ["doc", "code", "test", "build", "log", "evidence"] as const;
export const ARTIFACT_STATUSES = ["draft", "ready", "approved"] as const;

export const ArtifactKindSchema = z.enum(ARTIFACT_KINDS);
export const ArtifactStatusSchema = z.enum(ARTIFACT_STATUSES);

export const ArtifactRecordSchema = z
  .object({
    id: NonEmptyStringSchema,
    missionId: NonEmptyStringSchema,
    dispatchId: NonEmptyStringSchema.optional(),
    name: NonEmptyStringSchema,
    kind: ArtifactKindSchema,
    status: ArtifactStatusSchema,
    path: NonEmptyStringSchema,
    summary: z.string().optional(),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
    tags: z.array(NonEmptyStringSchema),
    mimeType: z.string().optional(),
    sizeBytes: z.number().int().nonnegative().optional(),
  })
  .strict();

export const ArtifactKindCountSchema = z
  .object({
    kind: ArtifactKindSchema,
    count: z.number().int().nonnegative(),
  })
  .strict();

export const ArtifactLibrarySummarySchema = z
  .object({
    total: z.number().int().nonnegative(),
    ready: z.number().int().nonnegative(),
    approved: z.number().int().nonnegative(),
    byKind: z.array(ArtifactKindCountSchema),
  })
  .strict();

export type ArtifactKind = z.infer<typeof ArtifactKindSchema>;
export type ArtifactStatus = z.infer<typeof ArtifactStatusSchema>;
export type ArtifactRecord = z.infer<typeof ArtifactRecordSchema>;
export type ArtifactKindCount = z.infer<typeof ArtifactKindCountSchema>;
export type ArtifactLibrarySummary = z.infer<typeof ArtifactLibrarySummarySchema>;
