import { Activity, Orbit, Sparkles } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { siteConfig } from "@/lib/config/site";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-sky-200">
            <Orbit className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              {siteConfig.shortName}
            </p>
            <h1 className="mt-1 text-base font-semibold text-white">
              Operations Console
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {siteConfig.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="panel-subtle flex items-center gap-2 px-3 py-2 text-sm text-slate-300">
            <Activity className="h-4 w-4 text-emerald-300" />
            <span>{siteConfig.commandStatus}</span>
          </div>

          <div className="panel-subtle flex items-center gap-2 px-3 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-sky-300" />
            <span>{siteConfig.commandFocus}</span>
          </div>

          <StatusBadge tone={siteConfig.systemSignal.tone}>
            {siteConfig.systemSignal.label}
          </StatusBadge>
        </div>
      </div>
    </header>
  );
}
