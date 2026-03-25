import type { QAGateDecision } from "@/types/qa";

export function isQAFinal(decision: QAGateDecision) {
  return ["approved", "failed", "force_approved"].includes(decision);
}
