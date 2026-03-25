import { CircleDot, Layers3, Radar, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { primaryNavigation } from "@/lib/config/navigation";
import {
  dashboardOverviewMock,
  routeReadinessMap,
  siteConfig,
} from "@/lib/config/site";

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
          <StatusBadge tone={siteConfig.systemSignal.tone}>
            {siteConfig.systemSignal.label} · {siteConfig.releaseChannel}
          </StatusBadge>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardOverviewMock.metrics.map((metric) => (
          <article key={metric.label} className="panel-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
              </div>
              <StatusBadge tone={metric.tone}>{metric.badge}</StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{metric.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel-surface p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/80">
                Foundation baseline
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Control-center shell is ready for the remaining 7 tabs
              </h2>
            </div>
            <StatusBadge tone="success">Foundation live</StatusBadge>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {dashboardOverviewMock.focusCards.map((card) => {
              const Icon = focusIcons[card.icon];

              return (
                <article key={card.title} className="panel-subtle p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-2 text-sky-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{card.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
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
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">
                Route readiness
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Navigation slots prepared for future modules
              </h2>
            </div>
            <StatusBadge tone="active">{primaryNavigation.length} routes wired</StatusBadge>
          </div>

          <div className="space-y-3">
            {primaryNavigation.map((item) => {
              const status = routeReadinessMap[item.href];

              return (
                <article key={item.href} className="panel-subtle p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>
                    </div>
                    <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{status.helper}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel-surface p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
                Recent signals
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Foundation handoff notes for other tabs
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {dashboardOverviewMock.activityFeed.map((signal) => (
              <article key={signal.title} className="panel-subtle p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{signal.title}</h3>
                  <StatusBadge tone={signal.tone}>{signal.status}</StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{signal.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Why this matters
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            A clean shell reduces merge conflicts later
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            This page is intentionally mock-driven. The upcoming contracts, engines, and page tabs can
            plug into the existing shell, status badges, and navigation without rewriting layout
            primitives.
          </p>
        </div>
      </section>
    </div>
  );
}
