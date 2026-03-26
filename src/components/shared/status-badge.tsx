import { cn } from "@/lib/utils/cn";

type StatusTone = "neutral" | "info" | "success" | "warning" | "danger" | "muted";

const toneClasses: Record<StatusTone, string> = {
  neutral: "border-slate-700 bg-slate-900 text-slate-200",
  info: "border-cyan-800 bg-cyan-950/70 text-cyan-200",
  success: "border-emerald-800 bg-emerald-950/70 text-emerald-200",
  warning: "border-amber-700 bg-amber-950/70 text-amber-200",
  danger: "border-rose-800 bg-rose-950/70 text-rose-200",
  muted: "border-slate-800 bg-slate-950 text-slate-400",
};

export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: {
  label: string;
  tone?: StatusTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        toneClasses[tone],
        className,
      )}
    >
      {label.replaceAll("_", " ")}
    </span>
  );
}
