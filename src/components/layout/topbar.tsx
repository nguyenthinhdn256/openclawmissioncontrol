import { siteConfig } from "@/lib/config/site";
import { StatusBadge } from "@/components/shared/status-badge";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            {siteConfig.releaseChannel}
          </p>
          <div>
            <h2 className="text-sm font-semibold text-white sm:text-base">{siteConfig.name}</h2>
            <p className="text-xs text-slate-400 sm:text-sm">{siteConfig.commandFocus}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge label={siteConfig.systemSignal.label} tone={siteConfig.systemSignal.tone} />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Version</p>
            <p className="text-sm font-medium text-slate-200">{siteConfig.versionLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
