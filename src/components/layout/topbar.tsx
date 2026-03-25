import { StatusBadge } from "@/components/shared/status-badge";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div>
          <p className="text-sm font-medium text-white">Operations Console</p>
          <p className="text-xs text-slate-400">Orchestrate missions, dispatches, QA, and artifacts</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge tone="active">Gateway healthy</StatusBadge>
          <StatusBadge tone="neutral">6 routes</StatusBadge>
        </div>
      </div>
    </header>
  );
}
