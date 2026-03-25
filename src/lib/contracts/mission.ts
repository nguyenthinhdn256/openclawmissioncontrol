import { z } from "zod";
import type { QAGateDecision } from "./qa";
import { qaGateDecisionSchema } from "./qa";

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

export type MissionStatus = (typeof missionStatusValues)[number];
export type MissionPriority = (typeof missionPriorityValues)[number];
export type MissionOwnerRole = (typeof missionOwnerRoleValues)[number];
export type TimelineEntityType = (typeof timelineEntityTypeValues)[number];
export type TimelineEventType = (typeof timelineEventTypeValues)[number];

export interface MissionProgress {
  totalDispatches: number;
  completedDispatches: number;
  approvedDispatches: number;
  failedDispatches: number;
}

export interface Mission {
  id: string;
  code: string;
  title: string;
  summary: string;
  objective: string;
  scope: string[];
  status: MissionStatus;
  priority: MissionPriority;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  ownerRole: MissionOwnerRole;
  tags: string[];
  dependencyIds: string[];
  dispatchIds: string[];
  artifactIds: string[];
  qaGate: QAGateDecision;
  progress: MissionProgress;
  dueAt?: string;
  startedAt?: string;
  completedAt?: string;
  blockedReason?: string | null;
}

export type MissionStatusCount = Record<MissionStatus, number>;

export interface MissionBoardSummary {
  total: number;
  counts: MissionStatusCount;
  overdue: number;
  blocked: number;
  ready: number;
  active: number;
}

export interface TimelineEvent {
  id: string;
  entityType: TimelineEntityType;
  entityId: string;
  type: TimelineEventType;
  actor: string;
  message: string;
  createdAt: string;
  meta?: Record<string, string | number | boolean | null>;
}

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
  scope: z.array(z.string()),
  status: missionStatusSchema,
  priority: missionPrioritySchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string().min(1),
  ownerRole: missionOwnerRoleSchema,
  tags: z.array(z.string()),
  dependencyIds: z.array(z.string()),
  dispatchIds: z.array(z.string()),
  artifactIds: z.array(z.string()),
  qaGate: qaGateDecisionSchema,
  progress: missionProgressSchema,
  dueAt: z.string().datetime().optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  blockedReason: z.string().nullable().optional(),
});

export const missionBoardSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  counts: z.record(missionStatusSchema, z.number().int().nonnegative()),
  overdue: z.number().int().nonnegative(),
  blocked: z.number().int().nonnegative(),
  ready: z.number().int().nonnegative(),
  active: z.number().int().nonnegative(),
});

export const timelineEventSchema = z.object({
  id: z.string().min(1),
  entityType: timelineEntityTypeSchema,
  entityId: z.string().min(1),
  type: timelineEventTypeSchema,
  actor: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.string().datetime(),
  meta: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

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
