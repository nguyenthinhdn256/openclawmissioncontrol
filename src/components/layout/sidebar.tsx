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
    <aside className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl md:sticky md:top-0 md:h-screen md:w-80 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col px-4 py-5 sm:px-6">
        <div className="panel-surface px-5 py-5">
          <p className="text-xs uppercase tracking-[0.32em] text-sky-300/80">
            OpenClaw
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            {siteConfig.shortName}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {siteConfig.sidebarSummary}
          </p>
        </div>

        <nav className="mt-5 flex-1 space-y-2">
          {primaryNavigation.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-start gap-3 rounded-2xl border px-4 py-3 transition-all duration-150",
                  isActive
                    ? "border-sky-400/30 bg-sky-400/10 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.08)]"
                    : "border-transparent bg-white/[0.02] text-slate-300 hover:border-white/10 hover:bg-white/[0.04]",
                )}
              >
                <div
                  className={cn(
                    "rounded-xl border p-2 transition-colors",
                    isActive
                      ? "border-sky-300/30 bg-sky-300/10 text-sky-100"
                      : "border-white/10 bg-white/[0.03] text-slate-300 group-hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.title}</span>
                    {item.badge ? (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-slate-400">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-sm leading-5 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="panel-subtle mt-5 px-4 py-4 text-sm text-slate-400">
          <p className="font-medium text-slate-200">{siteConfig.versionLabel}</p>
          <p className="mt-1 leading-6">
            Foundation shell and navigation are in place so the next tabs can
            focus on contracts, engines, boards, and seed integration.
          </p>
        </div>
      </div>
    </aside>
  );
}
