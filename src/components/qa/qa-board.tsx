import { QAReviewCard } from "@/components/qa/qa-review-card";
import type { QAReviewItem } from "@/types/qa";

export function QABoard({ reviews }: { reviews: QAReviewItem[] }) {
  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <QAReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
