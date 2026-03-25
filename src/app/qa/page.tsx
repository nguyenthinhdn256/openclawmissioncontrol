import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { QAReviewCard } from "@/components/qa/qa-review-card";
import { qaReviewsMock } from "@/lib/seed";

export default function QAPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="QA Gate"
        title="Review decisions"
        description="QAReviewCard is ready for audits, handoffs, and approval surfaces with typed checklist and evidence props."
        badge={<StatusBadge label="qa_review" />}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {qaReviewsMock.map((review) => (
          <QAReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
