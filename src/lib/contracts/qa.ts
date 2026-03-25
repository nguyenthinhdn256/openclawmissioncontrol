import { z } from "zod";

export const qaGateDecisionValues = [
  "pending",
  "approved",
  "needs_revision",
  "blocked",
  "failed",
  "force_approved",
] as const;

export const qaGateDecisionSchema = z.enum(qaGateDecisionValues);

export const qaChecklistSchema = z.object({
  schemaValid: z.boolean(),
  fileScopeRespected: z.boolean(),
  outputPresent: z.boolean(),
  testsPassed: z.boolean(),
  docsUpdated: z.boolean(),
  noContractBreak: z.boolean(),
});

export const qaChecklistTemplateSchema = z.object({
  defaults: qaChecklistSchema,
  requiredWhen: z.object({
    testsPassed: z.boolean().default(true),
    docsUpdated: z.boolean().default(false),
  }),
});

export const qaGateRecordSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  dispatchId: z.string().min(1).optional(),
  decision: qaGateDecisionSchema,
  checklist: qaChecklistSchema,
  evidence: z.array(z.string()).default([]),
  reviewer: z.string().min(1),
  note: z.string(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
  forceApprovedBy: z.string().optional(),
  forceApprovedReason: z.string().optional(),
});

export const qaDecisionCountSchema = z.record(qaGateDecisionSchema, z.number().int().nonnegative());

export const qaSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  pendingCount: z.number().int().nonnegative(),
  approvedCount: z.number().int().nonnegative(),
  failedCount: z.number().int().nonnegative(),
  blockedCount: z.number().int().nonnegative(),
  needsRevisionCount: z.number().int().nonnegative(),
  byDecision: qaDecisionCountSchema,
});

export type QAGateDecision = z.infer<typeof qaGateDecisionSchema>;
export type QAChecklist = z.infer<typeof qaChecklistSchema>;
export type QAChecklistTemplate = z.infer<typeof qaChecklistTemplateSchema>;
export type QAGateRecord = z.infer<typeof qaGateRecordSchema>;
export type QADecisionCount = z.infer<typeof qaDecisionCountSchema>;
export type QASummary = z.infer<typeof qaSummarySchema>;
