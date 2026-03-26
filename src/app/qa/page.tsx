import { QABoard } from "@/components/qa/qa-board";
import { PageHeader } from "@/components/shared/page-header";
import { qaReviewsMock } from "@/lib/seed";

export default function QAPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quality gate"
        title="QA reviews"
        description="Review evidence, checklist completion, and decision state before final approval."
      />
      <QABoard reviews={qaReviewsMock} />
    </div>
  );
}
