import { StatusBadge } from "@/components/shared/status-badge";

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow: string;
  title: string;
  description: string;
  badge?: { label: string; tone?: "neutral" | "info" | "success" | "warning" | "danger" | "muted" };
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.4)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</span>
        {badge ? <StatusBadge label={badge.label} tone={badge.tone} /> : null}
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
