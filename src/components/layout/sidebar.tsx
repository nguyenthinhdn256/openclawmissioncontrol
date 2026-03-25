"use client";

import {
  Flag,
  FolderKanban,
  LayoutDashboard,
  PackageSearch,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="panel-surface sticky top-4 hidden h-[calc(100vh-2rem)] flex-col overflow-hidden lg:flex">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="inline-flex rounded-2xl border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
          OpenClaw
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">{siteConfig.shortName}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{siteConfig.sidebarSummary}</p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
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
                  ? "border-sky-400/30 bg-sky-400/12 shadow-[0_0_0_1px_rgba(56,189,248,0.08)]"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 rounded-xl border p-2",
                    isActive
                      ? "border-sky-300/20 bg-sky-400/12 text-sky-200"
                      : "border-white/10 bg-slate-900/70 text-slate-300",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                    {item.badge ? (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
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

      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-sm font-semibold text-white">{siteConfig.versionLabel}</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Foundation shell and navigation are in place so the next tabs can focus on contracts,
          engines, boards, and seed integration.
        </p>
      </div>
    </aside>
  );
}
