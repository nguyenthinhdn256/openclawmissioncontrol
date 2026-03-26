import { AlertTriangle, ArrowRight, CheckCircle2, FolderKanban, TimerReset } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { summarizeMissionBoard, type Mission } from "@/lib/state";

export const mockMissions: Mission[] = [
  {
    id: "mission-001",
    code: "MC-FOUND-01",
    title: "Stabilize dashboard shell and navigation",
    summary: "Lock App Router shell, route hierarchy, and sidebar readiness for all modules.",
    objective: "Provide a stable operator shell that all downstream modules can consume without layout drift.",
    scope: ["src/app/layout.tsx", "src/components/layout/*", "src/lib/config/navigation.ts"],
    status: "done",
    priority: "high",
    createdAt: "2026-03-20T08:10:00.000Z",
    updatedAt: "2026-03-23T11:05:00.000Z",
    completedAt: "2026-03-23T11:05:00.000Z",
    createdBy: "Mission Control",
    ownerRole: "commander",
    tags: ["shell", "navigation"],
    dependencyIds: [],
    dispatchIds: ["dispatch-001", "dispatch-002"],
    artifactIds: ["artifact-001"],
    qaGateDecision: "approved",
    progress: {
      totalDispatches: 2,
      completedDispatches: 2,
      approvedDispatches: 2,
      failedDispatches: 0,
    },
  },
  {
    id: "mission-002",
    code: "MC-DASH-07",
    title: "Deliver dashboard pages and flows",
    summary: "Create overview and board pages that surface metrics, recency, readiness, and review state.",
    objective: "Ship Part 7 surfaces using typed mocks and selectors so the dashboard already feels operational.",
    scope: ["src/app/*/page.tsx", "src/components/dashboard/*", "src/components/*-board.tsx"],
    status: "in_progress",
    priority: "critical",
    createdAt: "2026-03-24T07:00:00.000Z",
    updatedAt: "2026-03-26T02:10:00.000Z",
    startedAt: "2026-03-25T04:00:00.000Z",
    createdBy: "Mission Control",
    ownerRole: "dispatcher",
    tags: ["dashboard_pages", "flows"],
    dependencyIds: ["mission-001"],
    dispatchIds: ["dispatch-003", "dispatch-004", "dispatch-005"],
    artifactIds: ["artifact-002", "artifact-003"],
    qaGateDecision: "pending",
    progress: {
      totalDispatches: 3,
      completedDispatches: 2,
      approvedDispatches: 1,
      failedDispatches: 0,
    },
  },
  {
    id: "mission-003",
    code: "MC-QA-05",
    title: "Harden QA gate evidence capture",
    summary: "Expose checklist coverage, reviewer notes, and decision rationale in a single board.",
    objective: "Make QA outcomes scannable enough that blocked and revision states are actionable in one glance.",
    scope: ["src/components/qa/*", "src/lib/qa/*"],
    status: "qa_review",
    priority: "high",
    createdAt: "2026-03-22T10:12:00.000Z",
    updatedAt: "2026-03-26T01:32:00.000Z",
    startedAt: "2026-03-24T03:00:00.000Z",
    createdBy: "Mission Control",
    ownerRole: "dispatcher",
    tags: ["qa", "evidence"],
    dependencyIds: ["mission-001"],
    dispatchIds: ["dispatch-006"],
    artifactIds: ["artifact-004"],
    qaGateDecision: "needs_revision",
    progress: {
      totalDispatches: 1,
      completedDispatches: 1,
      approvedDispatches: 0,
      failedDispatches: 0,
    },
  },
  {
    id: "mission-004",
    code: "MC-INTEG-08",
    title: "Centralize seed data and documentation sync",
    summary: "Prepare migration from board-local mocks to shared seed modules and docs sync artifacts.",
    objective: "Keep Part 8 integration work straightforward by documenting current data consumers and migration targets.",
    scope: ["src/lib/seed/*", "src/docs/*", "docs/*"],
    status: "blocked",
    priority: "normal",
    createdAt: "2026-03-24T09:00:00.000Z",
    updatedAt: "2026-03-26T00:20:00.000Z",
    blockedReason: "Waiting for dashboard pages to finalize their selector contracts.",
    createdBy: "Mission Control",
    ownerRole: "commander",
    tags: ["integration", "docs"],
    dependencyIds: ["mission-002"],
    dispatchIds: ["dispatch-007"],
    artifactIds: [],
    qaGateDecision: "blocked",
    progress: {
      totalDispatches: 1,
      completedDispatches: 0,
      approvedDispatches: 0,
      failedDispatches: 0,
    },
  },
];

export const missionBoardSummary = summarizeMissionBoard(mockMissions);

function getMissionTone(status: Mission["status"]): "success" | "info" | "warning" | "danger" | "muted" {
  switch (status) {
    case "done":
      return "success";
    case "in_progress":
    case "qa_review":
      return "info";
    case "blocked":
      return "warning";
    case "failed":
    case "cancelled":
      return "danger";
    default:
      return "muted";
  }
}

function getProgressValue(mission: Mission) {
  const total = Math.max(mission.progress.totalDispatches, 1);
  return Math.round((mission.progress.completedDispatches / total) * 100);
}

export function MissionsBoard() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Mission board"
        title="Mission lifecycle and delivery readiness"
        description="Track priority, status, dependency load, and progress across the mission portfolio. The board stays typed and mock-driven so it can be replaced by shared selectors later without UI rewrites."
        badge={{ label: `${missionBoardSummary.total} missions`, tone: "info" }}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Ready now",
            value: missionBoardSummary.readyCount,
            icon: ArrowRight,
            tone: "info" as const,
          },
          {
            label: "Blocked",
            value: missionBoardSummary.blockedCount,
            icon: AlertTriangle,
            tone: "warning" as const,
          },
          {
            label: "Completed",
            value: missionBoardSummary.doneCount,
            icon: CheckCircle2,
            tone: "success" as const,
          },
          {
            label: "Portfolio total",
            value: missionBoardSummary.total,
            icon: FolderKanban,
            tone: "muted" as const,
          },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-300">
                <item.icon className="size-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {mockMissions.map((mission) => {
          const progressValue = getProgressValue(mission);

          return (
            <article key={mission.id} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{mission.code}</p>
                    <StatusBadge label={mission.status} tone={getMissionTone(mission.status)} />
                    <StatusBadge label={mission.priority} tone={mission.priority === "critical" ? "danger" : "muted"} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{mission.summary}</p>
                  </div>
                </div>

                <div className="min-w-40 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Owner</p>
                  <p className="mt-2 text-sm font-medium text-slate-200">{mission.ownerRole}</p>
                  <p className="mt-1 text-xs text-slate-400">QA: {mission.qaGateDecision.replaceAll("_", " ")}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Objective</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{mission.objective}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Scope</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {mission.scope.slice(0, 3).map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Dependencies</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {mission.dependencyIds.length > 0
                      ? `${mission.dependencyIds.length} upstream mission${mission.dependencyIds.length > 1 ? "s" : ""}`
                      : "No upstream dependencies."}
                  </p>
                  {mission.blockedReason ? (
                    <p className="mt-2 rounded-2xl border border-amber-800/70 bg-amber-950/40 px-3 py-2 text-sm text-amber-200">
                      {mission.blockedReason}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Dispatch completion</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {mission.progress.completedDispatches}/{mission.progress.totalDispatches} dispatches completed
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <TimerReset className="size-4" />
                    Updated {new Date(mission.updatedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${progressValue}%` }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
