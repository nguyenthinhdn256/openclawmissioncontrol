import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation: NavigationItem[] = [
  {
    title: "Overview",
    href: "/",
    description: "System summary, baseline metrics, and route readiness.",
    icon: "overview",
    badge: "live",
  },
  {
    title: "Missions",
    href: "/missions",
    description: "Mission board, lifecycle visibility, and progress tracking.",
    icon: "missions",
  },
  {
    title: "Dispatches",
    href: "/dispatches",
    description: "Dispatch queue, assignees, dependencies, and handoffs.",
    icon: "dispatches",
  },
  {
    title: "QA Gate",
    href: "/qa",
    description: "Review decisions, evidence, blockers, and approvals.",
    icon: "qa",
  },
  {
    title: "Artifacts",
    href: "/artifacts",
    description: "Generated outputs, documents, evidence, and logs.",
    icon: "artifacts",
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Configuration, policy controls, health, and environment notes.",
    icon: "settings",
  },
];
