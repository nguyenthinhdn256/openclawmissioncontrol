export const siteConfig = {
  name: "OpenClaw Mission Control",
  shortName: "Mission Control",
  description:
    "Operator-facing dashboard for orchestrating missions, dispatches, QA gates, and artifacts on top of OpenClaw.",
  version: "0.1.0",
  versionLabel: "Dashboard UI Framework v0.1.0",
  releaseChannel: "Dark control-center shell",
  commandStatus: "UI framework active",
  commandFocus: "Ready for pages and flows",
  sidebarSummary:
    "A modular shell for routing Mission, Dispatch, QA, Artifact, and Settings surfaces without layout drift.",
  systemSignal: {
    label: "Mission Control ready",
    tone: "success" as const,
  },
} as const;
