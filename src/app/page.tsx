import { Activity, FolderKanban, ShieldCheck, Target } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { TimelineFeed } from "@/components/dashboard/timeline-feed";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { activityFeed, overviewMetrics } from "@/lib/seed";

const icons = [Activity, FolderKanban, ShieldCheck, Target];

export default function HomePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Dashboard UI Framework"
        title="Mission Control Overview"
        description="Reusable KPI cards, framed sections, and timeline feed are now ready for page composition. Future tabs can replace mock data with selectors without rewriting dashboard chrome."
        badge={<StatusBadge label="ready" />}
      />

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {overviewMetrics.map((metric, index) => {
          const Icon = icons[index % icons.length];
          return (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
              badge={metric.badge}
              tone={metric.tone}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Framework handoff"
          description="This overview page intentionally demonstrates the reusable primitives that later tabs should compose."
          badge="live"
          footer="Page layer should use SectionCard for consistent spacing, headings, and scan hierarchy."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-lg font-medium text-white">What is ready</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <li>Typed mission, dispatch, QA, and artifact components</li>
                <li>Shared status badge for lifecycle visibility</li>
                <li>Overview metrics and timeline primitives</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-lg font-medium text-white">What pages should do next</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <li>Bind selector data to these presentation components</li>
                <li>Keep business logic in lib/state, lib/dispatch, and lib/qa</li>
                <li>Avoid rebuilding layout blocks inside route files</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent signals" description="Timeline feed supports event lists for audits, handoffs, and execution history.">
          <TimelineFeed events={activityFeed} />
        </SectionCard>
      </div>
    </div>
  );
}
