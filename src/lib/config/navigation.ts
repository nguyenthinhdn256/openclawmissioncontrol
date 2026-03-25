import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation: NavigationItem[] = [
  { title: "Overview", href: "/", description: "System summary and key metrics" },
  { title: "Missions", href: "/missions", description: "Mission board and mission status" },
  { title: "Dispatches", href: "/dispatches", description: "Dispatch queue and assignments" },
  { title: "QA Gate", href: "/qa", description: "Review decisions and checklists" },
  { title: "Artifacts", href: "/artifacts", description: "Outputs, docs, and evidence" },
  { title: "Settings", href: "/settings", description: "Policies, health, and configuration" }
];
