import { GitBranch, RotateCcw, Timer } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import type { DispatchItem } from "@/types/dispatch";

export function DispatchRow({ dispatch }: { dispatch: DispatchItem }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
              {dispatch.domain.replaceAll("_", " ")}
            </span>
            <StatusBadge status={dispatch.status} />
          </div>
          <h3 className="text-lg font-semibold text-white">{dispatch.title}</h3>
          <p className="text-sm leading-6 text-slate-300">{dispatch.summary}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Assignee</p>
          <p className="mt-2 font-medium text-white">{dispatch.assignee}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <GitBranch className="h-4 w-4" />
            Dependencies
          </div>
          <p className="mt-2 text-sm text-white">{dispatch.dependencies.length ? dispatch.dependencies.join(", ") : "None"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <RotateCcw className="h-4 w-4" />
            Attempts
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">{dispatch.attemptCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Timer className="h-4 w-4" />
            Updated
          </div>
          <p className="mt-2 text-sm text-white">{dispatch.updatedAt}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {dispatch.scope.map((entry) => (
          <span key={entry} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {entry}
          </span>
        ))}
      </div>

      {dispatch.outputSummary ? <p className="mt-4 text-sm leading-6 text-slate-300">{dispatch.outputSummary}</p> : null}
    </article>
  );
}
