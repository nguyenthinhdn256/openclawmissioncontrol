import { Activity, Orbit, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { siteConfig } from "@/lib/config/site";

export function Topbar() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{siteConfig.shortName}</p>
        <h1 className="text-xl font-semibold text-white">Operations Console</h1>
        <p className="text-sm text-slate-300">{siteConfig.description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            <Activity className="h-4 w-4" />
            System signal
          </div>
          <div className="mt-2">
            <StatusBadge status="ready" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            <Orbit className="h-4 w-4" />
            Command status
          </div>
          <p className="mt-2 text-sm font-medium text-white">{siteConfig.commandStatus}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            <Sparkles className="h-4 w-4" />
            Focus
          </div>
          <p className="mt-2 text-sm font-medium text-white">{siteConfig.commandFocus}</p>
        </div>
      </div>
    </div>
  );
}
