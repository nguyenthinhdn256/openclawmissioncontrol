import { DispatchRow } from "@/components/dispatches/dispatch-row";
import { SectionCard } from "@/components/dashboard/section-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { dispatchesMock } from "@/lib/seed";

export default function DispatchesPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Dispatches"
        title="Dispatch queue"
        description="DispatchRow is built for dense queue views and accepts typed dispatch props with no embedded engine logic."
        badge={<StatusBadge label="ready" />}
      />

      <SectionCard title="Queue" description="Rows can be reused in simple lists or grouped board columns.">
        <div className="space-y-3">
          {dispatchesMock.map((dispatch) => (
            <DispatchRow key={dispatch.id} dispatch={dispatch} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
