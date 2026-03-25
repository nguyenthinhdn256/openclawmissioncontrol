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

export type DispatchStatus = (typeof dispatchStatusValues)[number];
export type DispatchDomain = (typeof dispatchDomainValues)[number];

export interface DispatchHandoffContract {
  produces: string[];
  consumedBy: string[];
}

export interface DispatchEnvelope {
  dispatch_id: string;
  mission_id: string;
  title: string;
  objective: string;
  domain: DispatchDomain;
  input_refs: string[];
  output_refs: string[];
  file_scope: string[];
  dependency_dispatch_ids: string[];
  acceptance_criteria: string[];
  validation_commands: string[];
  handoff_contract: {
    produces: string[];
    consumed_by: string[];
  };
}

export interface Dispatch {
  id: string;
  missionId: string;
  sequence: number;
  title: string;
  objective: string;
  domain: DispatchDomain;
  status: DispatchStatus;
  assignedTo: string | null;
  inputRefs: string[];
  outputRefs: string[];
  fileScope: string[];
  dependencyDispatchIds: string[];
  acceptanceCriteria: string[];
  validationCommands: string[];
  notes: string[];
  attemptCount: number;
  startedAt?: string;
  submittedAt?: string;
  approvedAt?: string;
}

export type DispatchStatusCount = Record<DispatchStatus, number>;
export type DispatchDomainCount = Record<DispatchDomain, number>;

export interface DispatchQueueSummary {
  total: number;
  queued: number;
  ready: number;
  active: number;
  qaReview: number;
  approved: number;
  blocked: number;
  failed: number;
}

export const dispatchStatusSchema = z.enum(dispatchStatusValues);
export const dispatchDomainSchema = z.enum(dispatchDomainValues);

export const dispatchHandoffContractSchema = z.object({
  produces: z.array(z.string()),
  consumedBy: z.array(z.string()),
});

export const dispatchEnvelopeSchema = z.object({
  dispatch_id: z.string().min(1),
  mission_id: z.string().min(1),
  title: z.string().min(1),
  objective: z.string().min(1),
  domain: dispatchDomainSchema,
  input_refs: z.array(z.string()),
  output_refs: z.array(z.string()),
  file_scope: z.array(z.string()),
  dependency_dispatch_ids: z.array(z.string()),
  acceptance_criteria: z.array(z.string()),
  validation_commands: z.array(z.string()),
  handoff_contract: z.object({
    produces: z.array(z.string()),
    consumed_by: z.array(z.string()),
  }),
});

export const dispatchSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  sequence: z.number().int().nonnegative(),
  title: z.string().min(1),
  objective: z.string().min(1),
  domain: dispatchDomainSchema,
  status: dispatchStatusSchema,
  assignedTo: z.string().min(1).nullable(),
  inputRefs: z.array(z.string()),
  outputRefs: z.array(z.string()),
  fileScope: z.array(z.string()),
  dependencyDispatchIds: z.array(z.string()),
  acceptanceCriteria: z.array(z.string()),
  validationCommands: z.array(z.string()),
  notes: z.array(z.string()),
  attemptCount: z.number().int().nonnegative(),
  startedAt: z.string().datetime().optional(),
  submittedAt: z.string().datetime().optional(),
  approvedAt: z.string().datetime().optional(),
});

export const dispatchQueueSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  queued: z.number().int().nonnegative(),
  ready: z.number().int().nonnegative(),
  active: z.number().int().nonnegative(),
  qaReview: z.number().int().nonnegative(),
  approved: z.number().int().nonnegative(),
  blocked: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
});

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
