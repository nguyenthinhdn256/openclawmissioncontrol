import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { TimelineFeed } from "@/components/dashboard/timeline-feed";
import { PageHeader } from "@/components/shared/page-header";
import { dashboardSummary, overviewMetrics } from "@/lib/seed";

export function OverviewPanel() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mission control"
        title="Overview"
        description="High-signal summary of current missions, dispatch queue posture, QA attention, and recent operator activity."
        badge="ready"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <SectionCard
          title="Recent activity"
          description="The most recent handoffs, approvals, and integration events flowing through the dashboard."
        >
          <TimelineFeed events={dashboardSummary.activity} />
        </SectionCard>

        <SectionCard
          title="Summary rollup"
          description="Fast audit of how the centralized seed layer currently aggregates status across modules."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Mission blocked</p>
              <p className="mt-2 text-2xl font-semibold text-white">{dashboardSummary.missions.blockedCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Dispatch revisions</p>
              <p className="mt-2 text-2xl font-semibold text-white">{dashboardSummary.dispatches.revisionCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">QA approved</p>
              <p className="mt-2 text-2xl font-semibold text-white">{dashboardSummary.qa.approvedCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Artifacts approved</p>
              <p className="mt-2 text-2xl font-semibold text-white">{dashboardSummary.artifacts.approvedCount}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
