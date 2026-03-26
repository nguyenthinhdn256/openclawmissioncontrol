import type { SettingsPanelData } from "@/lib/seed";

export function SettingsPanel({ panel }: { panel: SettingsPanelData }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{panel.title}</h3>
        <p className="text-sm leading-6 text-slate-300">{panel.description}</p>
      </div>
      <dl className="mt-5 space-y-3">
        {panel.items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</dt>
            <dd className="mt-2 text-sm font-medium text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
