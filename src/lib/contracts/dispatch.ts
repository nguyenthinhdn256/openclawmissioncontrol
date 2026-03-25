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

export const dispatchStatusCountSchema = z.record(dispatchStatusSchema, z.number().int().nonnegative());
export const dispatchDomainCountSchema = z.record(dispatchDomainSchema, z.number().int().nonnegative());

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
