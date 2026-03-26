import { artifactKinds } from "@/types/artifact";
import { dispatchDomains, dispatchStatuses } from "@/types/dispatch";
import { missionStatuses, type MissionTimelineEvent } from "@/types/mission";
import { qaGateDecisions } from "@/types/qa";
import type { ArtifactItem } from "@/types/artifact";
import type { DispatchItem } from "@/types/dispatch";
import type { MissionItem } from "@/types/mission";
import type { QAReviewItem } from "@/types/qa";
import type { ArtifactSummary } from "@/lib/contracts/artifact";
import type { DispatchSummary } from "@/lib/contracts/dispatch";
import type { MissionSummary } from "@/lib/contracts/mission";
import type { QASummary } from "@/lib/contracts/qa";

export interface DashboardSummary {
  missions: MissionSummary;
  dispatches: DispatchSummary;
  qa: QASummary;
  artifacts: ArtifactSummary;
  activity: MissionTimelineEvent[];
}

export interface OverviewMetric {
  label: string;
  value: string;
  helper: string;
  badge: string;
  tone: "active" | "success" | "warning" | "danger" | "neutral";
}

export function createDashboardSummary(input: {
  missions: MissionItem[];
  dispatches: DispatchItem[];
  qaReviews: QAReviewItem[];
  artifacts: ArtifactItem[];
  activity: MissionTimelineEvent[];
}): DashboardSummary {
  const missionByStatus = Object.fromEntries(missionStatuses.map((status) => [status, 0])) as Record<
    (typeof missionStatuses)[number],
    number
  >;
  input.missions.forEach((mission) => {
    missionByStatus[mission.status] += 1;
  });

  const dispatchByStatus = Object.fromEntries(dispatchStatuses.map((status) => [status, 0])) as Record<
    (typeof dispatchStatuses)[number],
    number
  >;
  const dispatchByDomain = Object.fromEntries(dispatchDomains.map((domain) => [domain, 0])) as Record<
    (typeof dispatchDomains)[number],
    number
  >;
  input.dispatches.forEach((dispatch) => {
    dispatchByStatus[dispatch.status] += 1;
    dispatchByDomain[dispatch.domain] += 1;
  });

  const qaByDecision = Object.fromEntries(qaGateDecisions.map((decision) => [decision, 0])) as Record<
    (typeof qaGateDecisions)[number],
    number
  >;
  input.qaReviews.forEach((review) => {
    qaByDecision[review.decision] += 1;
  });

  const artifactByKind = Object.fromEntries(artifactKinds.map((kind) => [kind, 0])) as Record<
    (typeof artifactKinds)[number],
    number
  >;
  input.artifacts.forEach((artifact) => {
    artifactByKind[artifact.kind] += 1;
  });

  return {
    missions: {
      total: input.missions.length,
      byStatus: missionByStatus,
      blockedCount: input.missions.filter((mission) => mission.status === "blocked" || mission.blockers.length > 0).length,
      activeCount: input.missions.filter((mission) => ["ready", "in_progress", "qa_review"].includes(mission.status)).length,
      doneCount: input.missions.filter((mission) => mission.status === "done").length,
    },
    dispatches: {
      total: input.dispatches.length,
      byStatus: dispatchByStatus,
      byDomain: dispatchByDomain,
      readyCount: input.dispatches.filter((dispatch) => dispatch.status === "ready").length,
      blockedCount: input.dispatches.filter((dispatch) => dispatch.status === "blocked").length,
      revisionCount: input.dispatches.filter((dispatch) => dispatch.status === "needs_revision").length,
    },
    qa: {
      total: input.qaReviews.length,
      byDecision: qaByDecision,
      pendingCount: input.qaReviews.filter((review) => review.decision === "pending").length,
      revisionCount: input.qaReviews.filter((review) => review.decision === "needs_revision").length,
      blockedCount: input.qaReviews.filter((review) => review.decision === "blocked").length,
      approvedCount: input.qaReviews.filter((review) => review.decision === "approved" || review.decision === "force_approved").length,
    },
    artifacts: {
      total: input.artifacts.length,
      byKind: artifactByKind,
      approvedCount: input.artifacts.filter((artifact) => artifact.status === "approved" || artifact.status === "verified").length,
      reviewCount: input.artifacts.filter((artifact) => artifact.status === "review").length,
    },
    activity: [...input.activity].sort((left, right) => right.at.localeCompare(left.at)),
  };
}

export function createOverviewMetrics(summary: DashboardSummary): OverviewMetric[] {
  return [
    {
      label: "Active missions",
      value: String(summary.missions.activeCount),
      helper: `${summary.missions.total} total missions currently tracked in Mission Control.`,
      badge: "live",
      tone: "active",
    },
    {
      label: "Ready dispatches",
      value: String(summary.dispatches.readyCount),
      helper: `${summary.dispatches.total} dispatches across all domains.`,
      badge: "queue",
      tone: "success",
    },
    {
      label: "QA pending",
      value: String(summary.qa.pendingCount + summary.qa.revisionCount),
      helper: "Pending plus revision-required reviews that still need attention.",
      badge: "qa",
      tone: "warning",
    },
    {
      label: "Critical blockers",
      value: String(summary.missions.blockedCount + summary.dispatches.blockedCount + summary.qa.blockedCount),
      helper: "Combined mission, dispatch, and QA blockers visible from a single summary layer.",
      badge: "risk",
      tone: "danger",
    },
  ];
}
