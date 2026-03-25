import type { ReactNode } from "react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";

export interface SectionCardProps {
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function SectionCard({ title, description, badge, action, children, footer, className }: SectionCardProps) {
  return (
    <section className={cn("panel-surface p-6", className)}>
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
            {badge ? <StatusBadge label={badge} /> : null}
          </div>
          {description ? <p className="max-w-3xl text-sm leading-6 text-slate-300">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <div className="pt-5">{children}</div>

      {footer ? <div className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-400">{footer}</div> : null}
    </section>
  );
}
