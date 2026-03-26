import { StatusBadge } from "@/components/shared/status-badge";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ eyebrow, title, description, badge }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{eyebrow}</span>
        {badge ? <StatusBadge status={badge} /> : null}
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-300">{description}</p>
      </div>
    </div>
  );
}
