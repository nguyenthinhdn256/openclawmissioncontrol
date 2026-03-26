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
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 border-r border-white/10 bg-slate-950/80 px-5 py-6 backdrop-blur lg:flex lg:flex-col">
      <div className="mb-8 space-y-3 rounded-3xl border border-sky-400/20 bg-sky-400/10 p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-200">
          OpenClaw
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Operator console</p>
          <h2 className="text-xl font-semibold text-white">{siteConfig.shortName}</h2>
        </div>
        <p className="text-sm leading-6 text-slate-300">{siteConfig.sidebarSummary}</p>
      </div>

      <nav className="space-y-2">
        {primaryNavigation.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-2xl border px-4 py-3 transition",
                isActive
                  ? "border-sky-400/30 bg-sky-400/10 text-white"
                  : "border-white/5 bg-white/0 text-slate-300 hover:border-white/15 hover:bg-white/5",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                    isActive ? "bg-sky-400/20 text-sky-200" : "bg-white/5 text-slate-300",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    {item.badge ? <span className="text-xs text-slate-400">{item.badge}</span> : null}
                  </div>
                  <p className="text-xs leading-5 text-slate-400">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        <p className="font-medium text-white">{siteConfig.versionLabel}</p>
        <p className="mt-2 leading-6">
          Foundation shell and dashboard UI components are in place so the next tabs can focus on contracts,
          engines, boards, and seed integration.
        </p>
      </div>
    </aside>
  );
}
