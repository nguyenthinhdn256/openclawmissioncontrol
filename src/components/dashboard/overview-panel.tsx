import { ArrowRight, Boxes, CheckCheck, FolderKanban, Send } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { mockArtifacts, getArtifactMetrics } from "@/components/artifacts/artifacts-board";
import { mockDispatches } from "@/components/dispatches/dispatches-board";
import { mockMissions } from "@/components/missions/missions-board";
import { mockQaRecords } from "@/components/qa/qa-board";
import { getDispatchQueueSummary, selectRecentDispatches } from "@/lib/dispatch";
import { getQASummary } from "@/lib/qa";
import { countActiveMissions, selectBlockedMissions, selectRecentMissions, summarizeMissionBoard } from "@/lib/state";

const missionSummary = summarizeMissionBoard(mockMissions);
const dispatchSummary = getDispatchQueueSummary(mockDispatches);
const qaSummary = getQASummary(mockQaRecords);
const artifactSummary = getArtifactMetrics(mockArtifacts);
const recentMissions = selectRecentMissions(mockMissions, 3);
const recentDispatches = selectRecentDispatches(mockDispatches, 4);
const blockedMissions = selectBlockedMissions(mockMissions);
const activeMissionCount = countActiveMissions(mockMissions);

export function OverviewPanel() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Mission Control snapshot across missions, dispatches, QA, and artifacts"
        description="The home route gives operators a fast briefing: current mission load, dispatch queue posture, QA signal, recent delivery movement, and which artifacts already exist."
        badge={{ label: "selector-ready", tone: "success" }}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Active missions", value: activeMissionCount, icon: FolderKanban },
          { label: "Dispatches ready", value: dispatchSummary.readyCount, icon: Send },
          { label: "QA approved", value: qaSummary.approvedCount, icon: CheckCheck },
          { label: "Verified artifacts", value: artifactSummary.verifiedCount, icon: Boxes },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-300">
                <item.icon className="size-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Recent missions</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Latest portfolio movement</h2>
            </div>
            <StatusBadge label={`${missionSummary.total} total`} tone="muted" />
          </div>

          <div className="space-y-3">
            {recentMissions.map((mission) => (
              <article key={mission.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{mission.code}</p>
                      <StatusBadge label={mission.status} tone={mission.status === "blocked" ? "warning" : mission.status === "done" ? "success" : "info"} />
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-white">{mission.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{mission.summary}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                    {mission.progress.completedDispatches}/{mission.progress.totalDispatches}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">QA snapshot</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Current gate posture</h2>
            </div>
            <StatusBadge label={`${qaSummary.total} reviews`} tone="muted" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Approved</p>
              <p className="mt-2 text-3xl font-semibold text-white">{qaSummary.approvedCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Needs revision</p>
              <p className="mt-2 text-3xl font-semibold text-white">{qaSummary.needsRevisionCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Blocked</p>
              <p className="mt-2 text-3xl font-semibold text-white">{qaSummary.blockedCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Pending</p>
              <p className="mt-2 text-3xl font-semibold text-white">{qaSummary.pendingCount}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Blocked missions</p>
            <div className="mt-3 space-y-2">
              {blockedMissions.length > 0 ? (
                blockedMissions.map((mission) => (
                  <div key={mission.id} className="rounded-2xl border border-amber-800/50 bg-amber-950/30 px-3 py-2 text-sm text-amber-100">
                    <p className="font-medium">{mission.title}</p>
                    <p className="mt-1 text-xs text-amber-200/80">{mission.blockedReason ?? "Blocked by unresolved dependency."}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">No blocked missions right now.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Recent dispatches</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Work packets moving through delivery</h2>
            </div>
            <StatusBadge label={`${dispatchSummary.total} total`} tone="muted" />
          </div>

          <div className="mt-4 space-y-3">
            {recentDispatches.map((dispatch) => (
              <article key={dispatch.id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{dispatch.id}</p>
                    <StatusBadge
                      label={dispatch.status}
                      tone={dispatch.status === "approved" ? "success" : dispatch.status === "blocked" || dispatch.status === "needs_revision" ? "warning" : "info"}
                    />
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-white">{dispatch.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{dispatch.objective}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                  {dispatch.domain.replaceAll("_", " ")}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Artifact readiness</p>
              <h2 className="mt-2 text-xl font-semibold text-white">What the dashboard has already produced</h2>
            </div>
            <ArrowRight className="size-5 text-slate-500" />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(artifactSummary.byKind).map(([kind, count]) => (
              <div key={kind} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{kind}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
