import { z } from "zod";
import { QAGateDecisionSchema } from "@/lib/contracts/qa";

const NonEmptyStringSchema = z.string().min(1);
const TimestampSchema = z.string().min(1);

export const MISSION_STATUSES = [
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

export const MISSION_PRIORITIES = ["low", "normal", "high", "critical"] as const;
export const MISSION_OWNER_ROLES = ["commander", "dispatcher"] as const;
export const TIMELINE_ENTITY_TYPES = ["mission", "dispatch", "qa", "artifact", "system"] as const;
export const TIMELINE_EVENT_TYPES = [
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

export const MissionStatusSchema = z.enum(MISSION_STATUSES);
export const MissionPrioritySchema = z.enum(MISSION_PRIORITIES);
export const MissionOwnerRoleSchema = z.enum(MISSION_OWNER_ROLES);
export const TimelineEntityTypeSchema = z.enum(TIMELINE_ENTITY_TYPES);
export const TimelineEventTypeSchema = z.enum(TIMELINE_EVENT_TYPES);

export const MissionProgressSchema = z
  .object({
    totalDispatches: z.number().int().nonnegative(),
    completedDispatches: z.number().int().nonnegative(),
    approvedDispatches: z.number().int().nonnegative(),
    failedDispatches: z.number().int().nonnegative(),
  })
  .strict();

export const TimelineEventSchema = z
  .object({
    id: NonEmptyStringSchema,
    entityType: TimelineEntityTypeSchema,
    entityId: NonEmptyStringSchema,
    type: TimelineEventTypeSchema,
    actor: NonEmptyStringSchema,
    message: NonEmptyStringSchema,
    createdAt: TimestampSchema,
    meta: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const MissionSchema = z
  .object({
    id: NonEmptyStringSchema,
    code: NonEmptyStringSchema,
    title: NonEmptyStringSchema,
    summary: z.string(),
    objective: z.string(),
    scope: z.array(NonEmptyStringSchema),
    status: MissionStatusSchema,
    priority: MissionPrioritySchema,
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
    createdBy: NonEmptyStringSchema,
    ownerRole: MissionOwnerRoleSchema,
    tags: z.array(NonEmptyStringSchema),
    dependencyIds: z.array(NonEmptyStringSchema),
    dispatchIds: z.array(NonEmptyStringSchema),
    artifactIds: z.array(NonEmptyStringSchema),
    qaGate: QAGateDecisionSchema,
    progress: MissionProgressSchema,
    dueAt: TimestampSchema.optional(),
    startedAt: TimestampSchema.optional(),
    completedAt: TimestampSchema.optional(),
  })
  .strict();

export const MissionStatusCountSchema = z
  .object({
    status: MissionStatusSchema,
    count: z.number().int().nonnegative(),
  })
  .strict();

export const MissionBoardSummarySchema = z
  .object({
    total: z.number().int().nonnegative(),
    byStatus: z.array(MissionStatusCountSchema),
    blockedMissionIds: z.array(NonEmptyStringSchema),
    readyMissionIds: z.array(NonEmptyStringSchema),
    inProgressMissionIds: z.array(NonEmptyStringSchema),
    completionRate: z.number().min(0).max(1),
  })
  .strict();

export type MissionStatus = z.infer<typeof MissionStatusSchema>;
export type MissionPriority = z.infer<typeof MissionPrioritySchema>;
export type MissionOwnerRole = z.infer<typeof MissionOwnerRoleSchema>;
export type MissionProgress = z.infer<typeof MissionProgressSchema>;
export type TimelineEntityType = z.infer<typeof TimelineEntityTypeSchema>;
export type TimelineEventType = z.infer<typeof TimelineEventTypeSchema>;
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type Mission = z.infer<typeof MissionSchema>;
export type MissionStatusCount = z.infer<typeof MissionStatusCountSchema>;
export type MissionBoardSummary = z.infer<typeof MissionBoardSummarySchema>;
