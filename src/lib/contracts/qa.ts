import { z } from "zod";
import { qaGateDecisions } from "@/types/qa";

export const qaGateDecisionSchema = z.enum(qaGateDecisions);

export const qaCheckItemSchema = z.object({
  label: z.string().min(1),
  done: z.boolean(),
});

export const qaReviewSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  dispatchId: z.string().min(1).optional(),
  title: z.string().min(1),
  reviewer: z.string().min(1),
  submittedAt: z.string().min(1),
  updatedAt: z.string().min(1),
  decision: qaGateDecisionSchema,
  checklist: z.array(qaCheckItemSchema),
  evidence: z.array(z.string()),
  notes: z.array(z.string()),
  blocker: z.string().optional(),
});

export const qaSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byDecision: z.record(qaGateDecisionSchema, z.number().int().nonnegative()),
  pendingCount: z.number().int().nonnegative(),
  revisionCount: z.number().int().nonnegative(),
  blockedCount: z.number().int().nonnegative(),
  approvedCount: z.number().int().nonnegative(),
});

export type QACheckItem = z.infer<typeof qaCheckItemSchema>;
export type QAReview = z.infer<typeof qaReviewSchema>;
export type QASummary = z.infer<typeof qaSummarySchema>;
