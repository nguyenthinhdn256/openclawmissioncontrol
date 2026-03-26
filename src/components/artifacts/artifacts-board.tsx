import { Boxes, Braces, FileCode2, Files, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { createEmptyArtifactKindCount, type ArtifactLibrarySummary, type ArtifactRecord } from "@/lib/contracts";

export const mockArtifacts: ArtifactRecord[] = [
  {
    id: "artifact-001",
    missionId: "mission-001",
    dispatchId: "dispatch-001",
    kind: "code",
    status: "verified",
    title: "Application shell module",
    path: "src/components/layout/app-shell.tsx",
    createdAt: "2026-03-22T11:30:00.000Z",
    updatedAt: "2026-03-22T12:00:00.000Z",
    notes: ["Baseline shell for dashboard routes."],
  },
  {
    id: "artifact-002",
    missionId: "mission-002",
    dispatchId: "dispatch-003",
    kind: "doc",
    status: "generated",
    title: "Dashboard page data notes",
    path: "src/docs/dashboard-pages-notes.md",
    createdAt: "2026-03-26T01:00:00.000Z",
    updatedAt: "2026-03-26T01:40:00.000Z",
    notes: ["Maps pages to selectors and local typed mocks."],
  },
  {
    id: "artifact-003",
    missionId: "mission-002",
    dispatchId: "dispatch-004",
    kind: "code",
    status: "generated",
    title: "Board route pages",
    path: "src/app/missions/page.tsx",
    createdAt: "2026-03-26T00:40:00.000Z",
    updatedAt: "2026-03-26T02:00:00.000Z",
    notes: ["App Router surfaces for each board."],
  },
  {
    id: "artifact-004",
    missionId: "mission-003",
    dispatchId: "dispatch-006",
    kind: "evidence",
    status: "draft",
    title: "QA evidence matrix",
    path: "src/components/qa/qa-board.tsx",
    createdAt: "2026-03-25T10:10:00.000Z",
    updatedAt: "2026-03-26T01:32:00.000Z",
    notes: ["Pending docs synchronization before verification."],
  },
  {
    id: "artifact-005",
    missionId: "mission-004",
    kind: "report",
    status: "draft",
    title: "Part 8 migration report",
    path: "docs/02-mission-control-specification.md",
    createdAt: "2026-03-25T02:00:00.000Z",
    updatedAt: "2026-03-26T00:10:00.000Z",
    notes: ["Waiting for final selector ownership list."],
  },
];

export function getArtifactMetrics(records: ArtifactRecord[]): ArtifactLibrarySummary {
  const byKind = createEmptyArtifactKindCount();

  for (const record of records) {
    byKind[record.kind] += 1;
  }

  return {
    total: records.length,
    byKind,
    verifiedCount: records.filter((record) => record.status === "verified").length,
  };
}

export const artifactMetrics = getArtifactMetrics(mockArtifacts);

function getArtifactTone(status: ArtifactRecord["status"]): "success" | "info" | "warning" | "muted" {
  switch (status) {
    case "verified":
      return "success";
    case "generated":
      return "info";
    case "archived":
      return "muted";
    default:
      return "warning";
  }
}

export function ArtifactsBoard() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Artifacts"
        title="Generated outputs, evidence, and documentation inventory"
        description="Artifacts give operators a quick answer to what has been produced, verified, and still needs follow-up. The structure is intentionally ready for a future shared artifact library."
        badge={{ label: `${artifactMetrics.verifiedCount} verified`, tone: "success" }}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Total", value: artifactMetrics.total, icon: Boxes },
          { label: "Code", value: artifactMetrics.byKind.code, icon: FileCode2 },
          { label: "Docs", value: artifactMetrics.byKind.doc, icon: Files },
          { label: "Evidence", value: artifactMetrics.byKind.evidence, icon: ShieldCheck },
          { label: "Reports", value: artifactMetrics.byKind.report, icon: Braces },
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

      <div className="grid gap-4 xl:grid-cols-2">
        {mockArtifacts.map((artifact) => (
          <article key={artifact.id} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{artifact.id}</p>
                  <StatusBadge label={artifact.status} tone={getArtifactTone(artifact.status)} />
                  <StatusBadge label={artifact.kind} tone="muted" />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">{artifact.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{artifact.path}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                Mission {artifact.missionId}
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
              {artifact.notes.map((note: string) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
