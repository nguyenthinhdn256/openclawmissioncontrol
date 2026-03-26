import { z } from "zod";
import { dispatchDomains, dispatchStatuses } from "@/types/dispatch";

export const dispatchStatusSchema = z.enum(dispatchStatuses);
export const dispatchDomainSchema = z.enum(dispatchDomains);

export const dispatchSchema = z.object({
  id: z.string().min(1),
  missionId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  assignee: z.string().min(1),
  status: dispatchStatusSchema,
  domain: dispatchDomainSchema,
  scope: z.array(z.string()),
  dependencies: z.array(z.string()),
  attemptCount: z.number().int().nonnegative(),
  updatedAt: z.string().min(1),
  dueAt: z.string().optional(),
  outputSummary: z.string().optional(),
});

export const dispatchSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  byStatus: z.record(dispatchStatusSchema, z.number().int().nonnegative()),
  byDomain: z.record(dispatchDomainSchema, z.number().int().nonnegative()),
  readyCount: z.number().int().nonnegative(),
  blockedCount: z.number().int().nonnegative(),
  revisionCount: z.number().int().nonnegative(),
});

export type Dispatch = z.infer<typeof dispatchSchema>;
export type DispatchSummary = z.infer<typeof dispatchSummarySchema>;
