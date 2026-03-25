import { Clock3 } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { MissionTimelineEvent } from "@/types/mission";

export interface TimelineFeedProps {
  events: MissionTimelineEvent[];
  className?: string;
}

export function TimelineFeed({ events, className }: TimelineFeedProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col items-center">
            <div className="mt-1 h-3 w-3 rounded-full bg-sky-300" />
            {index !== events.length - 1 ? <div className="mt-2 h-full w-px bg-white/10" /> : null}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-white">{event.title}</h3>
              {event.status ? <StatusBadge label={event.status} /> : null}
            </div>
            <p className="text-sm leading-6 text-slate-300">{event.detail}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5" />
                {event.at}
              </span>
              {event.actor ? <span>{event.actor}</span> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
