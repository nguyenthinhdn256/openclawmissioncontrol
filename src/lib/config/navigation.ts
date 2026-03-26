import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation: NavigationItem[] = [
  {
    title: "Overview",
    href: "/",
    description: "Mission Control summary and activity feed.",
    icon: "overview",
  },
  {
    title: "Missions",
    href: "/missions",
    description: "Mission cards, blockers, and progress.",
    icon: "missions",
  },
  {
    title: "Dispatches",
    href: "/dispatches",
    description: "Queue, assignees, attempts, and dependencies.",
    icon: "dispatches",
  },
  {
    title: "QA",
    href: "/qa",
    description: "QA review queue and evidence.",
    icon: "qa",
  },
  {
    title: "Artifacts",
    href: "/artifacts",
    description: "Generated deliverables and evidence.",
    icon: "artifacts",
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Environment posture and operator rules.",
    icon: "settings",
  },
];
