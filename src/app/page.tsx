import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

const metrics = [
  { label: "Active missions", value: "12", tone: "active" as const },
  { label: "Ready dispatches", value: "28", tone: "neutral" as const },
  { label: "QA pending", value: "4", tone: "warning" as const },
  { label: "Critical blockers", value: "1", tone: "danger" as const }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="OpenClaw Mission Control"
        description="A modular command surface for coordinating work, dispatching execution, tracking QA, and reviewing artifacts."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <StatusBadge tone={metric.tone}>{metric.value}</StatusBadge>
            </div>
            <p className="mt-6 text-3xl font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Mission Control baseline</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            This starter kit gives you a runnable Next.js skeleton, a formal specification, and parallel prompts
            so you can split implementation across multiple tabs without schema drift.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• Modular folders aligned with Mission, Dispatch, QA, Artifact, and Settings domains.</li>
            <li>• Dashboard-first UX with a reusable shell, badges, headers, and navigation.</li>
            <li>• Formal contracts and engine prompts prepared for parallel execution.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Recommended next step</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Open the prompt files in the <code className="rounded bg-slate-800 px-1 py-0.5">prompts/</code> folder,
            run each one in a separate tab, then merge the returned files into the matching paths.
          </p>
        </div>
      </section>
    </div>
  );
}
