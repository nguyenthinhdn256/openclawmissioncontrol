import { Gauge, Shield, Wrench, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { siteConfig } from "@/lib/config/site";

const settingsGroups = [
  {
    title: "System posture",
    icon: Gauge,
    items: [
      { label: "Version", value: siteConfig.versionLabel },
      { label: "Channel", value: siteConfig.releaseChannel },
      { label: "Command mode", value: siteConfig.commandStatus },
    ],
  },
  {
    title: "Policies",
    icon: Shield,
    items: [
      { label: "Routing", value: "App Router only" },
      { label: "State source", value: "Typed local mocks + selectors" },
      { label: "Extensibility", value: "Shared seed migration ready" },
    ],
  },
  {
    title: "Operational notes",
    icon: Wrench,
    items: [
      { label: "Validation baseline", value: "build + typecheck" },
      { label: "Dependency model", value: "Mission -> Dispatch -> QA -> Artifact" },
      { label: "Layout priority", value: "Readable operator-first hierarchy" },
    ],
  },
  {
    title: "Next upgrades",
    icon: Zap,
    items: [
      { label: "Seed centralization", value: "Move mocks into src/lib/seed" },
      { label: "Live data", value: "Swap selectors to real data source" },
      { label: "QA automation", value: "Attach evidence from CI/test output" },
    ],
  },
];

export function SettingsBoard() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Control-plane configuration, policy, and upgrade readiness"
        description="Settings is structured as an operator reference surface instead of a raw form. It tells future tabs which constraints are fixed now and which upgrades are expected next."
        badge={{ label: "operator reference", tone: "info" }}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {settingsGroups.map((group) => (
          <article key={group.title} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-slate-300">
                <group.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <p className="text-sm text-slate-400">Pinned configuration for current Mission Control delivery.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {group.items.map((item) => (
                <div key={item.label} className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-slate-200">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <StatusBadge label="locked" tone="muted" />
                    <p className="text-sm text-slate-300">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
