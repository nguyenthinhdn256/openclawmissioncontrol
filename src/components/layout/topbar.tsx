import { Activity, Orbit, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { siteConfig } from "@/lib/config/site";

export function Topbar() {
  return (
    <header className="panel-surface flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-400">
          <Orbit className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em]">{siteConfig.shortName}</span>
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight text-white">Operations Console</p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300">{siteConfig.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            <Activity className="h-4 w-4" />
            System signal
          </div>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge label={siteConfig.systemSignal.label} tone={siteConfig.systemSignal.tone} />
            <span className="text-sm text-slate-300">{siteConfig.commandStatus}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            <Sparkles className="h-4 w-4" />
            Focus
          </div>
          <p className="mt-2 text-sm text-slate-300">{siteConfig.commandFocus}</p>
        </div>
      </div>
    </header>
  );
}
