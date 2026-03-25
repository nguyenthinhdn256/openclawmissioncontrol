import { FileCode2, FolderOpenDot, Tag } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { cn } from "@/lib/utils/cn";
import type { ArtifactItem } from "@/types/artifact";

export interface ArtifactCardProps {
  artifact: ArtifactItem;
  className?: string;
}

export function ArtifactCard({ artifact, className }: ArtifactCardProps) {
  return (
    <article className={cn("panel-surface p-5", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label={artifact.status} />
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {artifact.kind}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white">{artifact.title}</h3>
            <p className="text-sm leading-6 text-slate-300">{artifact.description}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-slate-200">
            <FileCode2 className="h-5 w-5" />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="panel-subtle p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-slate-400">
              <FolderOpenDot className="h-4 w-4" />
              Path
            </div>
            <p className="mt-3 break-all text-slate-200">{artifact.path ?? "Not linked yet"}</p>
          </div>
          <div className="panel-subtle p-4 text-sm text-slate-300">
            <p className="text-slate-400">Owner</p>
            <p className="mt-3 text-slate-200">{artifact.owner}</p>
          </div>
          <div className="panel-subtle p-4 text-sm text-slate-300">
            <p className="text-slate-400">Updated</p>
            <p className="mt-3 text-slate-200">{artifact.updatedAt}</p>
            {artifact.sizeLabel ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{artifact.sizeLabel}</p> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {artifact.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
