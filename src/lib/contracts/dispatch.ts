import { z } from "zod";
import { dispatchStatuses } from "@/types/dispatch";

export const dispatchStatusSchema = z.enum(dispatchStatuses);

export const dispatchSchema = z.object({
  id: z.string(),
  missionId: z.string(),
  title: z.string(),
  summary: z.string(),
  assignee: z.string(),
  status: dispatchStatusSchema,
  scope: z.array(z.string()),
  dependencies: z.array(z.string()),
  attemptCount: z.number().int().nonnegative(),
  updatedAt: z.string(),
  dueAt: z.string().optional(),
  outputSummary: z.string().optional(),
});
