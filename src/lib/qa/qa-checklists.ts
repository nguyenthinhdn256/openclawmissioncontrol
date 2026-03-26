import type { QAChecklistTemplate } from "@/lib/contracts";

export const defaultQAChecklistTemplate: QAChecklistTemplate = {
  defaults: {
    schemaValid: true,
    fileScopeRespected: true,
    outputPresent: true,
    testsPassed: true,
    docsUpdated: false,
    noContractBreak: true,
  },
  requiredWhen: {
    testsPassed: true,
    docsUpdated: false,
  },
};
