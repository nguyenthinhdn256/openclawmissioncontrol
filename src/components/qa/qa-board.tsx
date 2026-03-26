import { CheckCircle2, CircleOff, FileCheck2, FlaskConical, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { getQASummary, selectLatestQARecords, type QAGateRecord } from "@/lib/qa";

export const mockQaRecords: QAGateRecord[] = [
  {
    id: "qa-001",
    missionId: "mission-001",
    dispatchId: "dispatch-001",
    decision: "approved",
    checklist: {
      schemaValid: true,
      fileScopeRespected: true,
      outputPresent: true,
      testsPassed: true,
      docsUpdated: true,
      noContractBreak: true,
    },
    evidence: ["npm run build", "npm run typecheck", "Layout renders with sidebar and topbar"],
    reviewer: "QA Commander",
    note: "Framework layer is stable and ready for downstream consumption.",
    createdAt: "2026-03-22T12:00:00.000Z",
    updatedAt: "2026-03-22T12:00:00.000Z",
  },
  {
    id: "qa-002",
    missionId: "mission-003",
    dispatchId: "dispatch-006",
    decision: "needs_revision",
    checklist: {
      schemaValid: true,
      fileScopeRespected: true,
      outputPresent: true,
      testsPassed: true,
      docsUpdated: false,
      noContractBreak: true,
    },
    evidence: ["Checklist matrix visible", "Evidence items visible", "Docs mapping still pending"],
    reviewer: "QA Commander",
    note: "Board is visually correct, but docsUpdated must become explicit before final approval.",
    createdAt: "2026-03-25T10:20:00.000Z",
    updatedAt: "2026-03-26T01:32:00.000Z",
  },
  {
    id: "qa-003",
    missionId: "mission-004",
    dispatchId: "dispatch-007",
    decision: "blocked",
    checklist: {
      schemaValid: true,
      fileScopeRespected: false,
      outputPresent: false,
      testsPassed: false,
      docsUpdated: false,
      noContractBreak: true,
    },
    evidence: ["Shared seed module not created yet", "Board contracts still moving"],
    reviewer: "QA Commander",
    note: "Integration pass must wait until Part 7 selectors and boards settle.",
    createdAt: "2026-03-25T04:00:00.000Z",
    updatedAt: "2026-03-26T00:18:00.000Z",
  },
];

export const qaSummary = getQASummary(mockQaRecords);

function getDecisionTone(decision: QAGateRecord["decision"]): "success" | "info" | "warning" | "danger" | "muted" {
  switch (decision) {
    case "approved":
    case "force_approved":
      return "success";
    case "pending":
      return "muted";
    case "needs_revision":
    case "blocked":
      return "warning";
    case "failed":
      return "danger";
    default:
      return "info";
  }
}

export function QABoard() {
  const latestRecords = selectLatestQARecords(mockQaRecords);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="QA gate"
        title="Decision clarity, checklist coverage, and evidence trace"
        description="Use the QA board to verify whether each dispatch is approved, blocked, or needs revision, and inspect exactly which checklist signals or evidence items drove that outcome."
        badge={{ label: `${qaSummary.approvedCount} approved`, tone: "success" }}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Total reviews", value: qaSummary.total, icon: FileCheck2 },
          { label: "Approved", value: qaSummary.approvedCount, icon: CheckCircle2 },
          { label: "Needs revision", value: qaSummary.needsRevisionCount, icon: FlaskConical },
          { label: "Blocked", value: qaSummary.blockedCount, icon: ShieldAlert },
          { label: "Pending", value: qaSummary.pendingCount, icon: CircleOff },
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

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        {latestRecords.map((record) => (
          <article key={record.id} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{record.id}</p>
                  <StatusBadge label={record.decision} tone={getDecisionTone(record.decision)} />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">Mission {record.missionId}</h3>
                <p className="mt-1 text-sm text-slate-400">Reviewer: {record.reviewer}</p>
              </div>
              <p className="text-xs text-slate-500">
                Updated {new Date(record.updatedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>

            <p className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm leading-6 text-slate-300">
              {record.note}
            </p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Checklist</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {Object.entries(record.checklist).map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 px-3 py-2">
                      <span>{key}</span>
                      <StatusBadge label={value ? "pass" : "fail"} tone={value ? "success" : "warning"} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Evidence</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                  {record.evidence.map((item: string) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
