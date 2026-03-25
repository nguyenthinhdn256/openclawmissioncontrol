import type { QACheckItem } from "@/types/qa";

export function getChecklistCompletion(checklist: QACheckItem[]) {
  if (checklist.length === 0) return 0;
  const done = checklist.filter((item) => item.done).length;
  return Math.round((done / checklist.length) * 100);
}
