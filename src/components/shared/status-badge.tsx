import { cn } from "@/lib/utils/cn";

type StatusTone = "neutral" | "active" | "success" | "warning" | "danger";

const toneMap: Record<StatusTone, string> = {
  neutral: "border-white/10 bg-white/5 text-slate-200",
  active: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  danger: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

const inferredToneMap: Record<string, StatusTone> = {
  draft: "neutral",
  planned: "neutral",
  ready: "success",
  in_progress: "active",
  working: "active",
  assigned: "active",
  queued: "warning",
  submitted: "active",
  qa_review: "warning",
  needs_revision: "danger",
  approved: "success",
  done: "success",
  force_approved: "warning",
  blocked: "danger",
  failed: "danger",
  cancelled: "neutral",
  review: "warning",
  archived: "neutral",
  live: "success",
};

export interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

function normalizeLabel(label: string) {
  return label.replace(/_/g, " ");
}

export function StatusBadge({ label, tone, className }: StatusBadgeProps) {
  const resolvedTone = tone ?? inferredToneMap[label] ?? "neutral";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        toneMap[resolvedTone],
        className,
      )}
    >
      {normalizeLabel(label)}
    </span>
  );
}
