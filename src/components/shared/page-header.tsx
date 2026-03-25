export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
