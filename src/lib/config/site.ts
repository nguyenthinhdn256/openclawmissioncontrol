export const siteConfig = {
  name: "OpenClaw Mission Control",
  shortName: "Mission Control",
  description:
    "Operator-facing dashboard for orchestrating missions, dispatches, QA gates, and artifacts on top of OpenClaw.",
  version: "0.1.0",
  versionLabel: "Foundation v0.1.0",
  releaseChannel: "Dark control-center shell",
  commandStatus: "Gateway posture visible",
  commandFocus: "Ready for contracts, engines, and boards",
  sidebarSummary:
    "A modular shell for routing future Mission, Dispatch, QA, Artifact, and Settings surfaces without layout drift.",
  systemSignal: {
    label: "Gateway healthy",
    tone: "success" as const,
  },
} as const;

export const dashboardOverviewMock = {
  eyebrow: "Foundation & Config",
  title: "Mission Control Overview",
  description:
    "A clean app shell, shared navigation, reusable status badges, and config-driven dashboard scaffolding are now prepared for the remaining implementation tabs.",
  metrics: [
    {
      label: "Active missions",
      value: "12",
      helper: "Mission cards and boards can later swap this mock with selectors.",
      tone: "active" as const,
      badge: "live",
    },
    {
      label: "Ready dispatches",
      value: "28",
      helper: "Dispatch engine routes are already represented in navigation.",
      tone: "neutral" as const,
      badge: "queued",
    },
    {
      label: "QA pending",
      value: "4",
      helper: "QA Gate surface has a reserved route and shell slot.",
      tone: "warning" as const,
      badge: "watch",
    },
    {
      label: "Critical blockers",
      value: "1",
      helper: "Status badges are compatible with warning and danger tones.",
      tone: "danger" as const,
      badge: "risk",
    },
  ],
  focusCards: [
    {
      icon: "posture" as const,
      title: "Operator posture",
      description: "Shell-level UX choices made in Part 1",
      items: [
        "Dark theme with bright hierarchy for fast scanning",
        "Reusable app shell for all future pages",
        "Topbar and sidebar separated into stable layout primitives",
      ],
    },
    {
      icon: "modularity" as const,
      title: "Modular structure",
      description: "Clear slots for future implementation",
      items: [
        "Config lives under src/lib/config",
        "Shared helpers stay in src/lib/utils",
        "UI atoms are isolated from business logic",
      ],
    },
    {
      icon: "readiness" as const,
      title: "Next-tab readiness",
      description: "What later tabs can plug into immediately",
      items: [
        "Navigation already contains all required routes",
        "Homepage mock data is config-driven, not scattered",
        "Foundation notes document reuse points for the next tabs",
      ],
    },
  ],
  activityFeed: [
    {
      title: "Navigation contract prepared",
      status: "6 primary routes",
      tone: "success" as const,
      detail:
        "Overview, Missions, Dispatches, QA Gate, Artifacts, and Settings are wired into shared config so later page modules can mount into a stable shell.",
    },
    {
      title: "Status system normalized",
      status: "6 tones",
      tone: "active" as const,
      detail:
        "Idle, active, warning, success, danger, and neutral badges are all supported from one reusable component for future engine- and selector-driven UI.",
    },
    {
      title: "Homepage mock centralized",
      status: "config-driven",
      tone: "neutral" as const,
      detail:
        "Overview metrics, readiness cards, and route-state copy come from config constants, making future seed-data integration simpler and less error-prone.",
    },
  ],
} as const;

export const routeReadinessMap = {
  "/": {
    label: "ready",
    tone: "success" as const,
    helper: "Overview is live with config-driven mock metrics and layout scaffolding.",
  },
  "/missions": {
    label: "slot prepared",
    tone: "active" as const,
    helper: "Mission boards can reuse the shared shell, page header, and badge system.",
  },
  "/dispatches": {
    label: "slot prepared",
    tone: "active" as const,
    helper: "Dispatch queue pages can plug into the existing navigation and topbar shell.",
  },
  "/qa": {
    label: "awaiting engine",
    tone: "warning" as const,
    helper: "QA review pages already have a route, naming, and visual language reserved.",
  },
  "/artifacts": {
    label: "slot prepared",
    tone: "neutral" as const,
    helper: "Artifact cards and evidence lists can land without touching core layout.",
  },
  "/settings": {
    label: "slot prepared",
    tone: "neutral" as const,
    helper: "Settings and policy views can mount into the same shell with no new chrome needed.",
  },
} as const;
