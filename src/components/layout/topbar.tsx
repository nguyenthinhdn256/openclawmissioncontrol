import { Activity, Orbit, Sparkles } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { siteConfig } from "@/lib/config/site";

export function Topbar() {
  return (
    <header className="panel-surface px-6 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">
            {siteConfig.shortName}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Operations Console</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{siteConfig.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="panel-subtle flex items-center gap-2 px-3 py-2 text-sm text-slate-200">
            <Activity className="h-4 w-4 text-sky-300" />
            <span>{siteConfig.commandStatus}</span>
          </div>
          <div className="panel-subtle flex items-center gap-2 px-3 py-2 text-sm text-slate-200">
            <Orbit className="h-4 w-4 text-violet-300" />
            <span>{siteConfig.commandFocus}</span>
          </div>
          <StatusBadge tone={siteConfig.systemSignal.tone} className="px-3 py-2 text-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            {siteConfig.systemSignal.label}
          </StatusBadge>
        </div>
      </div>
    </header>
  );
}
