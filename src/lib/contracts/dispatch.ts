import { z } from "zod";

export const dispatchStatusValues = [
  "queued",
  "ready",
  "assigned",
  "working",
  "submitted",
  "qa_review",
  "needs_revision",
  "approved",
  "blocked",
  "failed",
  "cancelled",
] as const;

export const dispatchDomainValues = [
  "foundation",
  "contracts",
  "mission_state",
  "dispatch",
  "qa",
  "dashboard_framework",
  "dashboard_pages",
  "integration_docs",
] as const;

export const dispatchStatusSchema = z.enum(dispatchStatusValues);
export const dispatchDomainSchema = z.enum(dispatchDomainValues);

export const dispatchHandoffContractSchema = z.object({
  produces: z.array(z.string()).default([]),
  consumedBy: z.array(z.string()).default([]),
});

export const dispatchSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  sequence: z.number().int().nonnegative(),
  title: z.string().min(1),
  objective: z.string().min(1),
  domain: dispatchDomainSchema,
  status: dispatchStatusSchema,
  assignedTo: z.string().nullable(),
  inputRefs: z.array(z.string()).default([]),
  outputRefs: z.array(z.string()).default([]),
  fileScope: z.array(z.string()).default([]),
  dependencyDispatchIds: z.array(z.string()).default([]),
  acceptanceCriteria: z.array(z.string()).default([]),
  validationCommands: z.array(z.string()).default([]),
  notes: z.array(z.string()).default([]),
  attemptCount: z.number().int().nonnegative(),
  startedAt: z.string().optional(),
  submittedAt: z.string().optional(),
  approvedAt: z.string().optional(),
});

export const dispatchEnvelopeSchema = z.object({
  dispatchId: z.string().min(1),
  missionId: z.string().min(1),
  title: z.string().min(1),
  objective: z.string().min(1),
  domain: dispatchDomainSchema,
  inputRefs: z.array(z.string()).default([]),
  outputRefs: z.array(z.string()).default([]),
  fileScope: z.array(z.string()).default([]),
  dependencyDispatchIds: z.array(z.string()).default([]),
  acceptanceCriteria: z.array(z.string()).default([]),
  validationCommands: z.array(z.string()).default([]),
  handoffContract: dispatchHandoffContractSchema,
});

export const dispatchStatusCountSchema = z.object(
  Object.fromEntries(dispatchStatusValues.map((value) => [value, z.number().int().nonnegative()])) as Record<
    (typeof dispatchStatusValues)[number],
    z.ZodNumber
  >,
);

export const dispatchDomainCountSchema = z.object(
  Object.fromEntries(dispatchDomainValues.map((value) => [value, z.number().int().nonnegative()])) as Record<
    (typeof dispatchDomainValues)[number],
    z.ZodNumber
  >,
);

export const dispatchQueueSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byStatus: dispatchStatusCountSchema,
  byDomain: dispatchDomainCountSchema,
  unassignedCount: z.number().int().nonnegative(),
  readyCount: z.number().int().nonnegative(),
  blockedCount: z.number().int().nonnegative(),
});

export type DispatchStatus = z.infer<typeof dispatchStatusSchema>;
export type DispatchDomain = z.infer<typeof dispatchDomainSchema>;
export type DispatchHandoffContract = z.infer<typeof dispatchHandoffContractSchema>;
export type Dispatch = z.infer<typeof dispatchSchema>;
export type DispatchEnvelope = z.infer<typeof dispatchEnvelopeSchema>;
export type DispatchStatusCount = z.infer<typeof dispatchStatusCountSchema>;
export type DispatchDomainCount = z.infer<typeof dispatchDomainCountSchema>;
export type DispatchQueueSummary = z.infer<typeof dispatchQueueSummarySchema>;

export function createEmptyDispatchStatusCount(): DispatchStatusCount {
  return {
    queued: 0,
    ready: 0,
    assigned: 0,
    working: 0,
    submitted: 0,
    qa_review: 0,
    needs_revision: 0,
    approved: 0,
    blocked: 0,
    failed: 0,
    cancelled: 0,
  };
}

export function createEmptyDispatchDomainCount(): DispatchDomainCount {
  return {
    foundation: 0,
    contracts: 0,
    mission_state: 0,
    dispatch: 0,
    qa: 0,
    dashboard_framework: 0,
    dashboard_pages: 0,
    integration_docs: 0,
  };
}
