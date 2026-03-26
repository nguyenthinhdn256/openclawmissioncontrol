import { CheckCircle2, FileCheck2, ShieldAlert } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { getChecklistCompletion } from "@/lib/qa";
import type { QAReviewItem } from "@/types/qa";

export function QAReviewCard({ review }: { review: QAReviewItem }) {
  const checklistCompletion = getChecklistCompletion(review.checklist);

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{review.title}</h3>
          <p className="text-sm text-slate-300">Reviewer: {review.reviewer}</p>
          <p className="text-sm text-slate-400">Submitted {review.submittedAt} • Updated {review.updatedAt}</p>
        </div>
        <StatusBadge status={review.decision} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-4 w-4" />
            Checklist completion
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{checklistCompletion}%</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {review.checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span className={item.done ? "text-emerald-300" : "text-amber-300"}>{item.done ? "●" : "○"}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <FileCheck2 className="h-4 w-4" />
              Evidence
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {review.evidence.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldAlert className="h-4 w-4" />
              Notes
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {review.notes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            {review.blocker ? <p className="mt-3 text-sm text-rose-200">Blocker: {review.blocker}</p> : null}
          </div>
        </div>
      </div>
    </article>
  );
}
