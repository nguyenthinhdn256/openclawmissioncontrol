import { cn } from "@/lib/utils/cn";

const toneMap: Record<string, string> = {
  draft: "bg-slate-500/15 text-slate-200 ring-slate-400/30",
  planned: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/30",
  ready: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  in_progress: "bg-blue-500/15 text-blue-200 ring-blue-400/30",
  qa_review: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  blocked: "bg-red-500/15 text-red-200 ring-red-400/30",
  failed: "bg-rose-500/15 text-rose-200 ring-rose-400/30",
  done: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  cancelled: "bg-slate-500/15 text-slate-200 ring-slate-400/30",
  approved: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  needs_revision: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  pending: "bg-violet-500/15 text-violet-200 ring-violet-400/30",
  review: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  generated: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
  verified: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] ring-1 ring-inset",
        toneMap[status] ?? "bg-slate-500/15 text-slate-200 ring-slate-400/30",
        className,
      )}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
