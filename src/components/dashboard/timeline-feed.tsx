import { StatusBadge } from "@/components/shared/status-badge";
import type { MissionTimelineEvent } from "@/types/mission";

export function TimelineFeed({ events }: { events: MissionTimelineEvent[] }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <article key={event.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-white">{event.title}</h3>
              <p className="text-sm leading-6 text-slate-300">{event.detail}</p>
            </div>
            <StatusBadge status={event.status} />
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-slate-400">
            <span>{event.actor}</span>
            <span>•</span>
            <span>{event.at}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
