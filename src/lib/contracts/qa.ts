import { z } from "zod";
import { qaGateDecisions } from "@/types/qa";

export const qaGateDecisionSchema = z.enum(qaGateDecisions);

export const qaChecklistItemSchema = z.object({
  label: z.string(),
  done: z.boolean(),
});

export const qaReviewSchema = z.object({
  id: z.string(),
  missionId: z.string(),
  dispatchId: z.string(),
  title: z.string(),
  reviewer: z.string(),
  submittedAt: z.string(),
  updatedAt: z.string(),
  decision: qaGateDecisionSchema,
  checklist: z.array(qaChecklistItemSchema),
  evidence: z.array(z.string()),
  notes: z.array(z.string()),
  blocker: z.string().optional(),
});
