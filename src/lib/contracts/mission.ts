import { z } from "zod";
import { missionPriorities, missionStatuses } from "@/types/mission";

export const missionStatusSchema = z.enum(missionStatuses);
export const missionPrioritySchema = z.enum(missionPriorities);

export const missionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  objective: z.string().min(1),
  status: missionStatusSchema,
  priority: missionPrioritySchema,
  owner: z.string().min(1),
  lane: z.string().min(1),
  progress: z.number().min(0).max(100),
  tags: z.array(z.string()),
  blockers: z.array(z.string()),
  dispatchCount: z.number().int().nonnegative(),
  completedDispatchCount: z.number().int().nonnegative(),
  artifactCount: z.number().int().nonnegative(),
  updatedAt: z.string().min(1),
  dueAt: z.string().optional(),
});

export const missionTimelineEventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  detail: z.string().min(1),
  actor: z.string().min(1),
  at: z.string().min(1),
  status: z.string().min(1),
});

export const missionSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byStatus: z.record(missionStatusSchema, z.number().int().nonnegative()),
  blockedCount: z.number().int().nonnegative(),
  activeCount: z.number().int().nonnegative(),
  doneCount: z.number().int().nonnegative(),
});

export type Mission = z.infer<typeof missionSchema>;
export type MissionTimelineEvent = z.infer<typeof missionTimelineEventSchema>;
export type MissionSummary = z.infer<typeof missionSummarySchema>;
