import { CheckCircle2, CircleDashed, FileText, ShieldAlert } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { QAReviewItem } from "@/types/qa";

export interface QAReviewCardProps {
  review: QAReviewItem;
  className?: string;
}

export function QAReviewCard({ review, className }: QAReviewCardProps) {
  return (
    <article className={cn("panel-surface p-5", className)}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge label={review.decision} />
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Reviewer {review.reviewer}
              </span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">{review.title}</h3>
            <p className="text-sm text-slate-400">Dispatch {review.dispatchId}</p>
          </div>
          <div className="text-right text-sm text-slate-400">
            <p>Submitted {review.submittedAt}</p>
            <p className="mt-1">Updated {review.updatedAt}</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Checklist</h4>
            <div className="space-y-2">
              {review.checklist.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                  {item.done ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <CircleDashed className="h-4 w-4 text-amber-300" />}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <FileText className="h-4 w-4 text-slate-400" />
                Evidence
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {review.evidence.map((entry) => (
                  <li key={entry} className="list-disc pl-1 ml-4">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm font-medium text-slate-200">Notes</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {review.notes.map((note) => (
                  <li key={note} className="list-disc pl-1 ml-4">
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            {review.blocker ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldAlert className="h-4 w-4" />
                  Blocker
                </div>
                <p className="mt-2 leading-6">{review.blocker}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
