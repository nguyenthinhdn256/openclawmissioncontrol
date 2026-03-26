export const siteConfig = {
  name: "OpenClaw Mission Control",
  shortName: "Mission Control",
  description:
    "Operator-facing dashboard for orchestrating missions, dispatches, QA gates, and artifacts on top of OpenClaw.",
  version: "0.1.0",
  versionLabel: "Mission Control v0.1.0",
  releaseChannel: "Dashboard Pages & Flows",
  commandStatus: "Mock-driven, selector-ready",
  commandFocus: "Part 7 boards wired to typed contracts",
  sidebarSummary:
    "A modular shell for routing Mission, Dispatch, QA, Artifact, and Settings surfaces without layout drift.",
  systemSignal: {
    label: "Gateway healthy",
    tone: "success" as const,
  },
} as const;
