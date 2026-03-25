import { z } from "zod";

const NonEmptyStringSchema = z.string().min(1);
const TimestampSchema = z.string().min(1);

export const DISPATCH_STATUSES = [
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

export const DISPATCH_DOMAINS = [
  "foundation",
  "contracts",
  "mission_state",
  "dispatch",
  "qa",
  "dashboard_framework",
  "dashboard_pages",
  "integration_docs",
] as const;

export const DispatchStatusSchema = z.enum(DISPATCH_STATUSES);
export const DispatchDomainSchema = z.enum(DISPATCH_DOMAINS);

export const DispatchSchema = z
  .object({
    id: NonEmptyStringSchema,
    missionId: NonEmptyStringSchema,
    sequence: z.number().int().nonnegative(),
    title: NonEmptyStringSchema,
    objective: z.string(),
    domain: DispatchDomainSchema,
    status: DispatchStatusSchema,
    assignedTo: z.string().min(1).nullable(),
    inputRefs: z.array(NonEmptyStringSchema),
    outputRefs: z.array(NonEmptyStringSchema),
    fileScope: z.array(NonEmptyStringSchema),
    dependencyDispatchIds: z.array(NonEmptyStringSchema),
    acceptanceCriteria: z.array(NonEmptyStringSchema),
    validationCommands: z.array(NonEmptyStringSchema),
    notes: z.array(z.string()),
    attemptCount: z.number().int().nonnegative(),
    startedAt: TimestampSchema.optional(),
    submittedAt: TimestampSchema.optional(),
    approvedAt: TimestampSchema.optional(),
    blockedReason: z.string().optional(),
  })
  .strict();

export const DispatchHandoffContractSchema = z
  .object({
    produces: z.array(NonEmptyStringSchema),
    consumedBy: z.array(NonEmptyStringSchema),
  })
  .strict();

export const DispatchEnvelopeSchema = z
  .object({
    dispatch_id: NonEmptyStringSchema,
    mission_id: NonEmptyStringSchema,
    title: NonEmptyStringSchema,
    objective: z.string(),
    domain: DispatchDomainSchema,
    input_refs: z.array(NonEmptyStringSchema),
    output_refs: z.array(NonEmptyStringSchema),
    file_scope: z.array(NonEmptyStringSchema),
    dependency_dispatch_ids: z.array(NonEmptyStringSchema),
    acceptance_criteria: z.array(NonEmptyStringSchema),
    validation_commands: z.array(NonEmptyStringSchema),
    handoff_contract: DispatchHandoffContractSchema,
  })
  .strict();

export const DispatchStatusCountSchema = z
  .object({
    status: DispatchStatusSchema,
    count: z.number().int().nonnegative(),
  })
  .strict();

export const DispatchDomainCountSchema = z
  .object({
    domain: DispatchDomainSchema,
    count: z.number().int().nonnegative(),
  })
  .strict();

export const DispatchQueueSummarySchema = z
  .object({
    total: z.number().int().nonnegative(),
    byStatus: z.array(DispatchStatusCountSchema),
    byDomain: z.array(DispatchDomainCountSchema),
    unassignedDispatchIds: z.array(NonEmptyStringSchema),
    blockedDispatchIds: z.array(NonEmptyStringSchema),
  })
  .strict();

export type DispatchStatus = z.infer<typeof DispatchStatusSchema>;
export type DispatchDomain = z.infer<typeof DispatchDomainSchema>;
export type Dispatch = z.infer<typeof DispatchSchema>;
export type DispatchHandoffContract = z.infer<typeof DispatchHandoffContractSchema>;
export type DispatchEnvelope = z.infer<typeof DispatchEnvelopeSchema>;
export type DispatchStatusCount = z.infer<typeof DispatchStatusCountSchema>;
export type DispatchDomainCount = z.infer<typeof DispatchDomainCountSchema>;
export type DispatchQueueSummary = z.infer<typeof DispatchQueueSummarySchema>;
