import type { QAReviewItem } from "@/types/qa";

export function getPendingQAReviews(reviews: QAReviewItem[]) {
  return reviews.filter((review) => review.decision === "pending" || review.decision === "needs_revision");
}
