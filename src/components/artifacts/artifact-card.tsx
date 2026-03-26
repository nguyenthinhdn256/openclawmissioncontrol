import { FileCode2 } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import type { ArtifactItem } from "@/types/artifact";

export function ArtifactCard({ artifact }: { artifact: ArtifactItem }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-300">
            <FileCode2 className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.14em]">{artifact.kind}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{artifact.title}</h3>
          <p className="text-sm leading-6 text-slate-300">{artifact.description}</p>
        </div>
        <StatusBadge status={artifact.status} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Owner</p>
          <p className="mt-2 text-sm font-medium text-white">{artifact.owner}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Updated</p>
          <p className="mt-2 text-sm text-white">{artifact.updatedAt}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Size</p>
          <p className="mt-2 text-sm text-white">{artifact.sizeLabel ?? "n/a"}</p>
        </div>
      </div>

      {artifact.path ? <p className="mt-4 text-sm text-slate-400">{artifact.path}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {artifact.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
