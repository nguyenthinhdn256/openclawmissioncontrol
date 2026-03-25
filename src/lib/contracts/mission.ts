import { z } from "zod";
import { missionStatuses } from "@/types/mission";

export const missionStatusSchema = z.enum(missionStatuses);
export const missionPrioritySchema = z.enum(["low", "medium", "high", "critical"]);

export const missionSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  objective: z.string(),
  status: missionStatusSchema,
  priority: missionPrioritySchema,
  owner: z.string(),
  lane: z.string(),
  progress: z.number().min(0).max(100),
  tags: z.array(z.string()),
  blockers: z.array(z.string()),
  dispatchCount: z.number().int().nonnegative(),
  completedDispatchCount: z.number().int().nonnegative(),
  artifactCount: z.number().int().nonnegative(),
  updatedAt: z.string(),
  dueAt: z.string().optional(),
});
