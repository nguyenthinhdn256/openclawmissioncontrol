import { z } from "zod";

const NonEmptyStringSchema = z.string().min(1);
const TimestampSchema = z.string().min(1);

export const QA_GATE_DECISIONS = [
  "pending",
  "approved",
  "needs_revision",
  "blocked",
  "failed",
  "force_approved",
] as const;

export const QAGateDecisionSchema = z.enum(QA_GATE_DECISIONS);

export const QAChecklistSchema = z
  .object({
    schemaValid: z.boolean(),
    fileScopeRespected: z.boolean(),
    outputPresent: z.boolean(),
    testsPassed: z.boolean(),
    docsUpdated: z.boolean(),
    noContractBreak: z.boolean(),
  })
  .strict();

export const QAGateRecordSchema = z
  .object({
    id: NonEmptyStringSchema,
    missionId: NonEmptyStringSchema,
    dispatchId: NonEmptyStringSchema.optional(),
    decision: QAGateDecisionSchema,
    checklist: QAChecklistSchema,
    evidence: z.array(NonEmptyStringSchema),
    reviewer: NonEmptyStringSchema,
    note: z.string(),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema.optional(),
  })
  .strict();

export const QADecisionCountSchema = z
  .object({
    decision: QAGateDecisionSchema,
    count: z.number().int().nonnegative(),
  })
  .strict();

export const QASummarySchema = z
  .object({
    total: z.number().int().nonnegative(),
    byDecision: z.array(QADecisionCountSchema),
    pendingDispatchIds: z.array(NonEmptyStringSchema),
    failedDispatchIds: z.array(NonEmptyStringSchema),
  })
  .strict();

export type QAGateDecision = z.infer<typeof QAGateDecisionSchema>;
export type QAChecklist = z.infer<typeof QAChecklistSchema>;
export type QAGateRecord = z.infer<typeof QAGateRecordSchema>;
export type QADecisionCount = z.infer<typeof QADecisionCountSchema>;
export type QASummary = z.infer<typeof QASummarySchema>;
