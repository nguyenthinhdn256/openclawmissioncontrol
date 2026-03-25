import { AlertTriangle, ArrowRight, FolderKanban, Package, Target } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { MissionItem } from "@/types/mission";

export interface MissionCardProps {
  mission: MissionItem;
  className?: string;
}

const priorityTone = {
  low: "neutral",
  medium: "active",
  high: "warning",
  critical: "danger",
} as const;

export function MissionCard({ mission, className }: MissionCardProps) {
  return (
    <article className={cn("panel-surface p-5", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label={mission.status} />
              <StatusBadge label={mission.priority} tone={priorityTone[mission.priority]} />
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {mission.lane}
              </span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">{mission.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{mission.summary}</p>
          </div>
          <div className="text-right text-sm text-slate-400">
            <p>Owner</p>
            <p className="mt-1 font-medium text-slate-200">{mission.owner}</p>
            <p className="mt-3">Updated</p>
            <p className="mt-1 font-medium text-slate-200">{mission.updatedAt}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
            <span>Progress</span>
            <span className="font-semibold text-white">{mission.progress}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-sky-400" style={{ width: `${mission.progress}%` }} />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="panel-subtle p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <FolderKanban className="h-4 w-4" />
              <span className="text-sm">Dispatches</span>
            </div>
            <p className="mt-3 text-lg font-semibold text-white">
              {mission.completedDispatchCount}/{mission.dispatchCount}
            </p>
          </div>
          <div className="panel-subtle p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Package className="h-4 w-4" />
              <span className="text-sm">Artifacts</span>
            </div>
            <p className="mt-3 text-lg font-semibold text-white">{mission.artifactCount}</p>
          </div>
          <div className="panel-subtle p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Target className="h-4 w-4" />
              <span className="text-sm">Objective</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-200">{mission.objective}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {mission.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>

        {mission.blockers.length > 0 ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">
            <div className="flex items-center gap-2 font-medium">
              <AlertTriangle className="h-4 w-4" />
              Blockers
            </div>
            <ul className="mt-3 space-y-2 pl-5 text-rose-50/90">
              {mission.blockers.map((blocker) => (
                <li key={blocker} className="list-disc">
                  {blocker}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
          <span>{mission.dueAt ? `Due ${mission.dueAt}` : "No due date set"}</span>
          <span className="inline-flex items-center gap-2 text-slate-300">
            Mission details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
