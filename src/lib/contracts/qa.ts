import { z } from "zod";

export const qaGateDecisionValues = [
  "pending",
  "approved",
  "needs_revision",
  "blocked",
  "failed",
  "force_approved",
] as const;

export type QAGateDecision = (typeof qaGateDecisionValues)[number];

export interface QAChecklist {
  schemaValid: boolean;
  fileScopeRespected: boolean;
  outputPresent: boolean;
  testsPassed: boolean;
  docsUpdated: boolean;
  noContractBreak: boolean;
}

export interface QAGateRecord {
  id: string;
  missionId: string;
  dispatchId?: string;
  decision: QAGateDecision;
  checklist: QAChecklist;
  evidence: string[];
  reviewer: string;
  note: string;
  createdAt: string;
}

export type QADecisionCount = Record<QAGateDecision, number>;

export interface QASummary {
  total: number;
  pending: number;
  approved: number;
  needsRevision: number;
  blocked: number;
  failed: number;
  forceApproved: number;
}

export const qaGateDecisionSchema = z.enum(qaGateDecisionValues);

export const qaChecklistSchema = z.object({
  schemaValid: z.boolean(),
  fileScopeRespected: z.boolean(),
  outputPresent: z.boolean(),
  testsPassed: z.boolean(),
  docsUpdated: z.boolean(),
  noContractBreak: z.boolean(),
});

export const qaGateRecordSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  dispatchId: z.string().min(1).optional(),
  decision: qaGateDecisionSchema,
  checklist: qaChecklistSchema,
  evidence: z.array(z.string()),
  reviewer: z.string().min(1),
  note: z.string(),
  createdAt: z.string().datetime(),
});

export const qaSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  approved: z.number().int().nonnegative(),
  needsRevision: z.number().int().nonnegative(),
  blocked: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  forceApproved: z.number().int().nonnegative(),
});

export function createEmptyQADecisionCount(): QADecisionCount {
  return {
    pending: 0,
    approved: 0,
    needs_revision: 0,
    blocked: 0,
    failed: 0,
    force_approved: 0,
  };
}
