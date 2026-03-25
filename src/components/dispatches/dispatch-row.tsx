import { GitBranch, RefreshCcw, User2 } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { DispatchItem } from "@/types/dispatch";

export interface DispatchRowProps {
  dispatch: DispatchItem;
  className?: string;
}

export function DispatchRow({ dispatch, className }: DispatchRowProps) {
  return (
    <div className={cn("grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]", className)}>
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium text-white">{dispatch.title}</h3>
          <StatusBadge label={dispatch.status} />
        </div>
        <p className="text-sm leading-6 text-slate-300">{dispatch.summary}</p>
        <div className="flex flex-wrap gap-2">
          {dispatch.scope.map((entry) => (
            <span key={entry} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
              {entry}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <User2 className="h-4 w-4 text-slate-400" />
          <span>{dispatch.assignee}</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4 text-slate-400" />
          <span>{dispatch.attemptCount} attempt(s)</span>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Updated {dispatch.updatedAt}</p>
      </div>

      <div className="space-y-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-slate-400" />
          <span>{dispatch.dependencies.length} dependency</span>
        </div>
        {dispatch.dependencies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {dispatch.dependencies.map((dependency) => (
              <span key={dependency} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                {dependency}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">No blockers from dependencies</p>
        )}
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Output</p>
        <p className="leading-6">{dispatch.outputSummary ?? "Awaiting execution output."}</p>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          {dispatch.dueAt ? `Due ${dispatch.dueAt}` : "No due date"}
        </p>
      </div>
    </div>
  );
}
