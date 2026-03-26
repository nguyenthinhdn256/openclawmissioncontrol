import type { MissionTimelineEvent } from "@/types/mission";
import { activityFeed, missionsMock } from "@/lib/seed/mock-missions";
import { dispatchesMock } from "@/lib/seed/mock-dispatches";
import { qaReviewsMock } from "@/lib/seed/mock-qa";
import { artifactsMock } from "@/lib/seed/mock-artifacts";
import { createDashboardSummary, createOverviewMetrics } from "@/lib/utils/dashboard-summary";

export { missionsMock, activityFeed } from "@/lib/seed/mock-missions";
export { dispatchesMock } from "@/lib/seed/mock-dispatches";
export { qaReviewsMock } from "@/lib/seed/mock-qa";
export { artifactsMock } from "@/lib/seed/mock-artifacts";

export interface SettingsPanelData {
  title: string;
  description: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

export const settingsPanelsMock: SettingsPanelData[] = [
  {
    title: "Environment posture",
    description: "Static system posture summary for the current dashboard shell.",
    items: [
      { label: "Gateway route", value: "Prepared" },
      { label: "Mission state source", value: "Centralized seed + typed contracts" },
      { label: "UI framework status", value: "Ready for page composition" },
    ],
  },
  {
    title: "Policy controls",
    description: "Human-readable notes for future controls and rules.",
    items: [
      { label: "Manual override traceability", value: "Required" },
      { label: "QA evidence before approval", value: "Required unless force-approved" },
      { label: "Cross-module contracts", value: "Must use src/lib/contracts or src/types" },
    ],
  },
];

export const dashboardSummary = createDashboardSummary({
  missions: missionsMock,
  dispatches: dispatchesMock,
  qaReviews: qaReviewsMock,
  artifacts: artifactsMock,
  activity: activityFeed as MissionTimelineEvent[],
});

export const overviewMetrics = createOverviewMetrics(dashboardSummary);
