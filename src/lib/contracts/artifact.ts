import { z } from "zod";
import { artifactKinds, artifactStatuses } from "@/types/artifact";

export const artifactKindSchema = z.enum(artifactKinds);
export const artifactStatusSchema = z.enum(artifactStatuses);

export const artifactSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  dispatchId: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  kind: artifactKindSchema,
  status: artifactStatusSchema,
  owner: z.string().min(1),
  updatedAt: z.string().min(1),
  path: z.string().optional(),
  sizeLabel: z.string().optional(),
  tags: z.array(z.string()),
});

export const artifactSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byKind: z.record(artifactKindSchema, z.number().int().nonnegative()),
  approvedCount: z.number().int().nonnegative(),
  reviewCount: z.number().int().nonnegative(),
});

export type Artifact = z.infer<typeof artifactSchema>;
export type ArtifactSummary = z.infer<typeof artifactSummarySchema>;
