import { z } from "zod";
import { qaGateDecisionSchema } from "@/lib/contracts/qa";

export const missionStatusValues = [
  "draft",
  "planned",
  "ready",
  "in_progress",
  "qa_review",
  "blocked",
  "failed",
  "done",
  "cancelled",
] as const;

export const missionPriorityValues = ["low", "normal", "high", "critical"] as const;
export const missionOwnerRoleValues = ["commander", "dispatcher"] as const;
export const timelineEntityTypeValues = ["mission", "dispatch", "qa", "artifact", "system"] as const;
export const timelineEventTypeValues = [
  "created",
  "updated",
  "assigned",
  "started",
  "submitted",
  "approved",
  "rejected",
  "blocked",
  "failed",
  "retried",
  "cancelled",
  "note_added",
] as const;

export const missionStatusSchema = z.enum(missionStatusValues);
export const missionPrioritySchema = z.enum(missionPriorityValues);
export const missionOwnerRoleSchema = z.enum(missionOwnerRoleValues);
export const timelineEntityTypeSchema = z.enum(timelineEntityTypeValues);
export const timelineEventTypeSchema = z.enum(timelineEventTypeValues);

export const missionProgressSchema = z.object({
  totalDispatches: z.number().int().nonnegative(),
  completedDispatches: z.number().int().nonnegative(),
  approvedDispatches: z.number().int().nonnegative(),
  failedDispatches: z.number().int().nonnegative(),
});

export const missionSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  objective: z.string().min(1),
  scope: z.array(z.string()).default([]),
  status: missionStatusSchema,
  priority: missionPrioritySchema,
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
  dueAt: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  blockedReason: z.string().nullable().optional(),
  createdBy: z.string().min(1),
  ownerRole: missionOwnerRoleSchema,
  tags: z.array(z.string()).default([]),
  dependencyIds: z.array(z.string()).default([]),
  dispatchIds: z.array(z.string()).default([]),
  artifactIds: z.array(z.string()).default([]),
  qaGateDecision: qaGateDecisionSchema,
  progress: missionProgressSchema,
});

export const timelineEventSchema = z.object({
  id: z.string().min(1),
  entityType: timelineEntityTypeSchema,
  entityId: z.string().min(1),
  type: timelineEventTypeSchema,
  actor: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.string().min(1),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export const missionStatusCountSchema = z.object(
  Object.fromEntries(missionStatusValues.map((value) => [value, z.number().int().nonnegative()])) as Record<
    (typeof missionStatusValues)[number],
    z.ZodNumber
  >,
);

export const missionBoardSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byStatus: missionStatusCountSchema,
  blockedCount: z.number().int().nonnegative(),
  readyCount: z.number().int().nonnegative(),
  doneCount: z.number().int().nonnegative(),
});

export type MissionStatus = z.infer<typeof missionStatusSchema>;
export type MissionPriority = z.infer<typeof missionPrioritySchema>;
export type MissionOwnerRole = z.infer<typeof missionOwnerRoleSchema>;
export type TimelineEntityType = z.infer<typeof timelineEntityTypeSchema>;
export type TimelineEventType = z.infer<typeof timelineEventTypeSchema>;
export type MissionProgress = z.infer<typeof missionProgressSchema>;
export type Mission = z.infer<typeof missionSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type MissionStatusCount = z.infer<typeof missionStatusCountSchema>;
export type MissionBoardSummary = z.infer<typeof missionBoardSummarySchema>;

export function createEmptyMissionStatusCount(): MissionStatusCount {
  return {
    draft: 0,
    planned: 0,
    ready: 0,
    in_progress: 0,
    qa_review: 0,
    blocked: 0,
    failed: 0,
    done: 0,
    cancelled: 0,
  };
}
