"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flag,
  FolderKanban,
  LayoutDashboard,
  PackageSearch,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { primaryNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import type { NavigationIconKey } from "@/types/navigation";

const iconMap: Record<NavigationIconKey, typeof LayoutDashboard> = {
  overview: LayoutDashboard,
  missions: Flag,
  dispatches: FolderKanban,
  qa: ShieldCheck,
  artifacts: PackageSearch,
  settings: Settings2,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="panel-surface flex h-full w-full flex-col gap-6 p-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">OpenClaw</p>
        <h2 className="text-2xl font-semibold text-white">{siteConfig.shortName}</h2>
        <p className="text-sm leading-6 text-slate-300">{siteConfig.sidebarSummary}</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {primaryNavigation.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group rounded-2xl border px-4 py-3 transition",
                isActive
                  ? "border-sky-400/30 bg-sky-400/10"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05]",
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("rounded-xl p-2", isActive ? "bg-sky-400/15 text-sky-200" : "bg-white/5 text-slate-300") }>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{item.title}</span>
                    {item.badge ? (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{siteConfig.versionLabel}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Foundation shell and dashboard UI components are in place so the next tabs can focus on contracts,
          engines, boards, and seed integration.
        </p>
      </div>
    </aside>
  );
}
