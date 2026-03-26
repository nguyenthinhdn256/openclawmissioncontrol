import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { OverviewMetric } from "@/lib/utils/dashboard-summary";

const toneMap = {
  active: "border-sky-400/20 bg-sky-400/10",
  success: "border-emerald-400/20 bg-emerald-400/10",
  warning: "border-amber-400/20 bg-amber-400/10",
  danger: "border-rose-400/20 bg-rose-400/10",
  neutral: "border-white/10 bg-white/5",
} as const;

export function MetricCard({ label, value, helper, badge, tone }: OverviewMetric) {
  return (
    <div className={cn("rounded-3xl border p-5 shadow-soft", toneMap[tone])}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <StatusBadge status={badge} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{helper}</p>
    </div>
  );
}
