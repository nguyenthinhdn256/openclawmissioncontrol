import { AlertTriangle, ArrowRight, FolderKanban, Package, Target } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { MissionItem } from "@/types/mission";

export interface MissionCardProps {
  mission: MissionItem;
  className?: string;
}

const priorityTone = {
  low: "bg-white/5 text-slate-200",
  medium: "bg-sky-400/15 text-sky-200",
  high: "bg-amber-400/15 text-amber-200",
  critical: "bg-rose-400/15 text-rose-200",
} as const;

export function MissionCard({ mission, className }: MissionCardProps) {
  return (
    <article className={cn("rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
            {mission.lane}
          </span>
          <h3 className="text-xl font-semibold text-white">{mission.title}</h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">{mission.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]", priorityTone[mission.priority])}>
            {mission.priority}
          </span>
          <StatusBadge status={mission.status} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Owner</p>
          <p className="mt-2 font-medium text-white">{mission.owner}</p>
          <p className="mt-2 text-xs text-slate-400">Updated {mission.updatedAt}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <FolderKanban className="h-4 w-4" />
            <span className="text-sm">Dispatches</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">
            {mission.completedDispatchCount}/{mission.dispatchCount}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Package className="h-4 w-4" />
            <span className="text-sm">Artifacts</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">{mission.artifactCount}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Target className="h-4 w-4" />
          <span className="text-sm font-medium">Objective</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">{mission.objective}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {mission.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      {mission.blockers.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">
          <div className="flex items-center gap-2 text-rose-200">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Blockers</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-rose-100">
            {mission.blockers.map((blocker) => (
              <li key={blocker}>• {blocker}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
        <span>{mission.dueAt ? `Due ${mission.dueAt}` : "No due date set"}</span>
        <span className="inline-flex items-center gap-2 text-white">
          Mission details
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
