type Tone = "idle" | "active" | "warning" | "success" | "danger" | "neutral";

const tones: Record<Tone, string> = {
  idle: "bg-slate-800 text-slate-300 ring-slate-700",
  active: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  warning: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  success: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  danger: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  neutral: "bg-violet-500/15 text-violet-300 ring-violet-500/30"
};

export function StatusBadge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
}
