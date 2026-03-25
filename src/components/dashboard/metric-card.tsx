import type { ReactNode } from "react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";

export interface MetricCardProps {
  label: string;
  value: string;
  helper?: string;
  badge?: string;
  tone?: "neutral" | "active" | "success" | "warning" | "danger";
  icon?: ReactNode;
  className?: string;
}

const toneAccentMap = {
  neutral: "from-white/10 to-transparent",
  active: "from-sky-400/20 to-transparent",
  success: "from-emerald-400/20 to-transparent",
  warning: "from-amber-400/20 to-transparent",
  danger: "from-rose-400/20 to-transparent",
} as const;

export function MetricCard({ label, value, helper, badge, tone = "neutral", icon, className }: MetricCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-5", className)}>
      <div className={cn("absolute inset-x-0 top-0 h-20 bg-gradient-to-b", toneAccentMap[tone])} />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
          </div>
          {icon ? <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-slate-200">{icon}</div> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {badge ? <StatusBadge label={badge} tone={tone} /> : null}
          {helper ? <p className="text-sm leading-6 text-slate-400">{helper}</p> : null}
        </div>
      </div>
    </div>
  );
}
