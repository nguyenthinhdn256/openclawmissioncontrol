import { AlertCircle, ArrowUpRight, Link2, UserRound } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  areDispatchDependenciesReady,
  buildDispatchStatusMap,
  getDispatchQueueSummary,
  type Dispatch,
} from "@/lib/dispatch";

export const mockDispatches: Dispatch[] = [
  {
    id: "dispatch-001",
    missionId: "mission-001",
    sequence: 1,
    title: "Create app shell layout",
    objective: "Ship shell layout, topbar, and sidebar primitives.",
    domain: "dashboard_framework",
    status: "approved",
    assignedTo: "devfrontendoperatorinterface",
    inputRefs: ["prompts/06-dashboard-ui-framework.txt"],
    outputRefs: ["src/components/layout/app-shell.tsx", "src/components/layout/sidebar.tsx"],
    fileScope: ["src/components/layout/*", "src/app/layout.tsx"],
    dependencyDispatchIds: [],
    acceptanceCriteria: ["Sidebar renders all routes", "Topbar exposes system summary"],
    validationCommands: ["npm run build"],
    notes: ["Completed in framework pass."],
    attemptCount: 1,
    startedAt: "2026-03-21T08:00:00.000Z",
    submittedAt: "2026-03-22T09:00:00.000Z",
    approvedAt: "2026-03-22T12:00:00.000Z",
  },
  {
    id: "dispatch-003",
    missionId: "mission-002",
    sequence: 1,
    title: "Build overview panel",
    objective: "Expose cross-board metrics and recent activity on the home route.",
    domain: "dashboard_pages",
    status: "working",
    assignedTo: "olautonomousexecutionagent",
    inputRefs: ["prompts/07-dashboard-pages-flows.txt"],
    outputRefs: ["src/components/dashboard/overview-panel.tsx"],
    fileScope: ["src/components/dashboard/*", "src/app/page.tsx"],
    dependencyDispatchIds: ["dispatch-001"],
    acceptanceCriteria: ["Shows metrics", "Shows recent missions", "Shows recent dispatches", "Shows QA snapshot"],
    validationCommands: ["npm run build", "npm run typecheck"],
    notes: ["Consumes typed mock data from board modules."],
    attemptCount: 1,
    startedAt: "2026-03-26T01:10:00.000Z",
  },
  {
    id: "dispatch-004",
    missionId: "mission-002",
    sequence: 2,
    title: "Build board route pages",
    objective: "Replace placeholders on missions, dispatches, QA, artifacts, and settings routes.",
    domain: "dashboard_pages",
    status: "submitted",
    assignedTo: "olautonomousexecutionagent",
    inputRefs: ["src/components/shared/page-header.tsx"],
    outputRefs: ["src/app/missions/page.tsx", "src/app/dispatches/page.tsx", "src/app/qa/page.tsx"],
    fileScope: ["src/app/*/page.tsx", "src/components/**/*-board.tsx"],
    dependencyDispatchIds: ["dispatch-001"],
    acceptanceCriteria: ["Each route renders a concrete board", "App Router only"],
    validationCommands: ["npm run build"],
    notes: ["Awaiting QA review once overview is complete."],
    attemptCount: 1,
    startedAt: "2026-03-26T00:40:00.000Z",
    submittedAt: "2026-03-26T02:00:00.000Z",
  },
  {
    id: "dispatch-005",
    missionId: "mission-002",
    sequence: 3,
    title: "Document page-data ownership",
    objective: "Describe which selectors and mock records each page consumes.",
    domain: "integration_docs",
    status: "ready",
    assignedTo: null,
    inputRefs: ["src/docs/dashboard-pages-notes.md"],
    outputRefs: ["docs/02-mission-control-specification.md"],
    fileScope: ["src/docs/*", "docs/*"],
    dependencyDispatchIds: ["dispatch-003", "dispatch-004"],
    acceptanceCriteria: ["Docs show page-to-selector mapping"],
    validationCommands: ["npm run typecheck"],
    notes: [],
    attemptCount: 0,
  },
  {
    id: "dispatch-006",
    missionId: "mission-003",
    sequence: 1,
    title: "QA board evidence matrix",
    objective: "Surface reviewer, decision, evidence, and checklist coverage in one page.",
    domain: "qa",
    status: "qa_review",
    assignedTo: "devbendcoreautomationengine",
    inputRefs: ["src/lib/qa/qa-selectors.ts"],
    outputRefs: ["src/components/qa/qa-board.tsx"],
    fileScope: ["src/components/qa/*", "src/lib/qa/*"],
    dependencyDispatchIds: [],
    acceptanceCriteria: ["Checklist visible", "Evidence visible"],
    validationCommands: ["npm run build"],
    notes: ["Reviewer requested docsUpdated state to be explicit."],
    attemptCount: 2,
    startedAt: "2026-03-25T06:00:00.000Z",
    submittedAt: "2026-03-25T10:15:00.000Z",
  },
  {
    id: "dispatch-007",
    missionId: "mission-004",
    sequence: 1,
    title: "Centralize shared seeds",
    objective: "Move board-local mock records into lib/seed and document migration.",
    domain: "integration_docs",
    status: "blocked",
    assignedTo: "devdatadatabaseworkflow",
    inputRefs: ["src/lib/seed/index.ts"],
    outputRefs: ["src/lib/seed/dashboard.ts"],
    fileScope: ["src/lib/seed/*"],
    dependencyDispatchIds: ["dispatch-003", "dispatch-004", "dispatch-006"],
    acceptanceCriteria: ["All boards consume shared seeds"],
    validationCommands: ["npm run build"],
    notes: ["Blocked until page contracts stop moving."],
    attemptCount: 1,
    startedAt: "2026-03-25T01:00:00.000Z",
  },
];

export const dispatchQueueSummary = getDispatchQueueSummary(mockDispatches);

function getDispatchTone(status: Dispatch["status"]): "success" | "info" | "warning" | "danger" | "muted" {
  switch (status) {
    case "approved":
      return "success";
    case "working":
    case "submitted":
    case "qa_review":
      return "info";
    case "ready":
      return "muted";
    case "blocked":
    case "needs_revision":
      return "warning";
    case "failed":
    case "cancelled":
      return "danger";
    default:
      return "muted";
  }
}

export function DispatchesBoard() {
  const statusMap = buildDispatchStatusMap(mockDispatches);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Dispatch queue"
        title="Assignees, dependencies, and readiness in one pass"
        description="Use this queue to confirm who owns each work packet, whether dependencies are satisfied, and what still needs review before the mission can advance."
        badge={{ label: `${dispatchQueueSummary.readyCount} ready`, tone: "info" }}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total dispatches", value: dispatchQueueSummary.total },
          { label: "Unassigned", value: dispatchQueueSummary.unassignedCount },
          { label: "Ready", value: dispatchQueueSummary.readyCount },
          { label: "Blocked", value: dispatchQueueSummary.blockedCount },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70">
        <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr_1fr] gap-4 border-b border-slate-800 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span>Dispatch</span>
          <span>Assignee</span>
          <span>Status</span>
          <span>Domain</span>
          <span>Dependency readiness</span>
        </div>

        <div className="divide-y divide-slate-800">
          {mockDispatches.map((dispatch) => {
            const dependenciesReady = areDispatchDependenciesReady(dispatch, statusMap);

            return (
              <article key={dispatch.id} className="grid grid-cols-1 gap-4 px-5 py-5 xl:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr_1fr] xl:items-start">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{dispatch.id}</p>
                    <StatusBadge label={dispatch.status} tone={getDispatchTone(dispatch.status)} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{dispatch.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{dispatch.objective}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    {dispatch.fileScope.slice(0, 3).map((file: string) => (
                      <span key={file} className="rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1">
                        {file}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <UserRound className="size-4 text-slate-500" />
                    <span>{dispatch.assignedTo ?? "Unassigned"}</span>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">Attempts: {dispatch.attemptCount}</p>
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  <p>{dispatch.status.replaceAll("_", " ")}</p>
                  <p className="text-xs leading-5 text-slate-500">
                    {dispatch.submittedAt
                      ? `Submitted ${new Date(dispatch.submittedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`
                      : dispatch.startedAt
                        ? `Started ${new Date(dispatch.startedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`
                        : "Not started yet"}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  <p className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-center capitalize">
                    {dispatch.domain.replaceAll("_", " ")}
                  </p>
                  <p className="text-xs leading-5 text-slate-500">Validation: {dispatch.validationCommands.join(" · ")}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {dependenciesReady ? (
                      <ArrowUpRight className="size-4 text-emerald-300" />
                    ) : (
                      <AlertCircle className="size-4 text-amber-300" />
                    )}
                    <p className="text-sm text-slate-300">
                      {dependenciesReady ? "Dependencies satisfied" : "Waiting on upstream dispatches"}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500">
                    <p className="uppercase tracking-[0.16em]">Inputs</p>
                    {dispatch.inputRefs.length > 0 ? (
                      dispatch.inputRefs.slice(0, 2).map((ref: string) => (
                        <p key={ref} className="flex items-center gap-2">
                          <Link2 className="size-3.5" />
                          <span>{ref}</span>
                        </p>
                      ))
                    ) : (
                      <p>No explicit inputs.</p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
