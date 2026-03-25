import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type StatusBadgeTone =
  | "idle"
  | "active"
  | "warning"
  | "success"
  | "danger"
  | "neutral";

const tones: Record<StatusBadgeTone, string> = {
  idle: "border-slate-700/70 bg-slate-800/80 text-slate-300",
  active: "border-sky-400/30 bg-sky-400/12 text-sky-200",
  warning: "border-amber-400/30 bg-amber-400/12 text-amber-200",
  success: "border-emerald-400/30 bg-emerald-400/12 text-emerald-200",
  danger: "border-rose-400/30 bg-rose-400/12 text-rose-200",
  neutral: "border-violet-400/30 bg-violet-400/12 text-violet-200",
};

type StatusBadgeProps = {
  tone: StatusBadgeTone;
  children: ReactNode;
  className?: string;
};

export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
