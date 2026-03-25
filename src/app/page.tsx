import { CircleDot, Layers3, Radar, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { primaryNavigation } from "@/lib/config/navigation";
import { dashboardOverviewMock, routeReadinessMap, siteConfig } from "@/lib/config/site";

const focusIcons = {
  posture: ShieldCheck,
  modularity: Layers3,
  readiness: Radar,
} as const;

export default function HomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={dashboardOverviewMock.eyebrow}
        title={dashboardOverviewMock.title}
        description={dashboardOverviewMock.description}
        actions={
          <>
            <StatusBadge tone={siteConfig.systemSignal.tone}>
              {siteConfig.systemSignal.label}
            </StatusBadge>
            <StatusBadge tone="neutral">{siteConfig.releaseChannel}</StatusBadge>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardOverviewMock.metrics.map((metric) => (
          <article key={metric.label} className="panel-surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {metric.value}
                </p>
              </div>

              <StatusBadge tone={metric.tone}>{metric.badge}</StatusBadge>
            </div>

            <p className="mt-4 text-sm text-slate-300">{metric.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="panel-surface p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-sky-300/80">
                  Foundation baseline
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Control-center shell is ready for the remaining 7 tabs
                </h2>
              </div>

              <StatusBadge tone="success">Foundation live</StatusBadge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {dashboardOverviewMock.focusCards.map((card) => {
                const Icon = focusIcons[card.icon];

                return (
                  <article key={card.title} className="panel-subtle h-full p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{card.title}</h3>
                        <p className="text-sm text-slate-400">{card.description}</p>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-3 text-sm text-slate-200">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CircleDot className="mt-0.5 h-4 w-4 text-sky-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="panel-surface p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Route readiness
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Navigation slots prepared for future modules
                </h2>
              </div>

              <StatusBadge tone="active">
                {primaryNavigation.length} routes wired
              </StatusBadge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {primaryNavigation.map((item) => {
                const status = routeReadinessMap[item.href];

                return (
                  <article key={item.href} className="panel-subtle p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                      </div>

                      <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                    </div>

                    <p className="mt-4 text-sm text-slate-300">{status.helper}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Recent signals
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Foundation handoff notes for other tabs
            </h2>

            <div className="mt-5 space-y-4">
              {dashboardOverviewMock.activityFeed.map((signal) => (
                <article key={signal.title} className="panel-subtle p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-white">{signal.title}</h3>
                    <StatusBadge tone={signal.tone}>{signal.status}</StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{signal.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel-surface p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Why this matters
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              A clean shell reduces merge conflicts later
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              This page is intentionally mock-driven. The upcoming contracts,
              engines, and page tabs can plug into the existing shell, status
              badges, and navigation without rewriting layout primitives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
