import Link from "next/link";
import { primaryNavigation } from "@/lib/config/navigation";

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/80 xl:block">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">OpenClaw</p>
          <p className="text-lg font-semibold text-white">Mission Control</p>
        </div>
      </div>
      <nav className="space-y-1 px-3 py-4">
        {primaryNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-3 py-3 transition hover:bg-slate-900"
          >
            <div className="text-sm font-medium text-slate-100">{item.title}</div>
            <div className="mt-1 text-xs text-slate-400">{item.description}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
