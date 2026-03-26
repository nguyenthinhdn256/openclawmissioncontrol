"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, CheckCheck, FolderKanban, LayoutDashboard, Send, Settings2 } from "lucide-react";
import { primaryNavigation } from "@/lib/config/navigation";
import type { NavigationIconKey } from "@/types/navigation";
import { cn } from "@/lib/utils/cn";

const icons: Record<NavigationIconKey, typeof LayoutDashboard> = {
  overview: LayoutDashboard,
  missions: FolderKanban,
  dispatches: Send,
  qa: CheckCheck,
  artifacts: Boxes,
  settings: Settings2,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-80 shrink-0 border-r border-slate-800 bg-slate-950 lg:block">
      <div className="flex h-full flex-col px-4 py-6">
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Operator shell</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Command surfaces</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Route operators across missions, dispatches, QA gates, artifacts, and configuration without leaving the control plane.
          </p>
        </div>

        <nav className="space-y-2">
          {primaryNavigation.map((item) => {
            const Icon = icons[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-start gap-3 rounded-2xl border px-4 py-3 transition",
                  isActive
                    ? "border-cyan-800 bg-cyan-950/50 text-white"
                    : "border-transparent bg-slate-950 text-slate-300 hover:border-slate-800 hover:bg-slate-900",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 rounded-xl border p-2",
                    isActive
                      ? "border-cyan-700 bg-cyan-900/60 text-cyan-200"
                      : "border-slate-800 bg-slate-900 text-slate-400 group-hover:text-slate-200",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.title}</span>
                    {item.badge ? (
                      <span className="rounded-full border border-cyan-800 bg-cyan-950/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-400">{item.description}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
