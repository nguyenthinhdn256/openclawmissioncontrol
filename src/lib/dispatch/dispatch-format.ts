import {
  dispatchEnvelopeSchema,
  type Dispatch,
  type DispatchEnvelope,
  type DispatchHandoffContract,
} from "@/lib/contracts/dispatch";

export function serializeDispatchEnvelope(
  dispatch: Dispatch,
  handoffContract: DispatchHandoffContract,
): DispatchEnvelope {
  return dispatchEnvelopeSchema.parse({
    dispatchId: dispatch.id,
    missionId: dispatch.missionId,
    title: dispatch.title,
    objective: dispatch.objective,
    domain: dispatch.domain,
    inputRefs: dispatch.inputRefs,
    outputRefs: dispatch.outputRefs,
    fileScope: dispatch.fileScope,
    dependencyDispatchIds: dispatch.dependencyDispatchIds,
    acceptanceCriteria: dispatch.acceptanceCriteria,
    validationCommands: dispatch.validationCommands,
    handoffContract,
  });
}
