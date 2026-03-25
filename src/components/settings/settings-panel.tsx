import { Cog, Shield, Workflow } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SettingsPanelSection {
  title: string;
  description?: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

export interface SettingsPanelProps {
  title: string;
  description?: string;
  sections: SettingsPanelSection[];
  className?: string;
}

const sectionIcons = [Cog, Shield, Workflow];

export function SettingsPanel({ title, description, sections, className }: SettingsPanelProps) {
  return (
    <section className={cn("panel-surface p-6", className)}>
      <div className="space-y-2 border-b border-white/10 pb-5">
        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        {description ? <p className="max-w-3xl text-sm leading-6 text-slate-300">{description}</p> : null}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {sections.map((section, index) => {
          const Icon = sectionIcons[index % sectionIcons.length];
          return (
            <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{section.title}</h3>
                  {section.description ? <p className="mt-1 text-sm leading-6 text-slate-300">{section.description}</p> : null}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-right text-sm font-medium text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
