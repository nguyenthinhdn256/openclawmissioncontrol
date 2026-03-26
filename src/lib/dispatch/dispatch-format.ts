import type { Dispatch, DispatchEnvelope } from "@/lib/contracts";

export function createDispatchEnvelope(dispatch: Dispatch): DispatchEnvelope {
  return {
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
    handoffContract: {
      produces: dispatch.outputRefs,
      consumedBy: [],
    },
  };
}
