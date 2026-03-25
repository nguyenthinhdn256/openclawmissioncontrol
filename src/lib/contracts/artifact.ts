import { z } from "zod";

export const artifactKindSchema = z.enum(["prompt", "schema", "ui", "log", "report", "bundle"]);
export const artifactStatusSchema = z.enum(["draft", "review", "approved", "archived"]);

export const artifactSchema = z.object({
  id: z.string(),
  missionId: z.string(),
  dispatchId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  kind: artifactKindSchema,
  status: artifactStatusSchema,
  owner: z.string(),
  updatedAt: z.string(),
  path: z.string().optional(),
  sizeLabel: z.string().optional(),
  tags: z.array(z.string()),
});
