import type { DispatchEnvelope } from "@/lib/contracts/dispatch";
import {
  qaChecklistTemplateSchema,
  type QAChecklist,
  type QAChecklistTemplate,
} from "@/lib/contracts/qa";

export const defaultQAChecklist: QAChecklist = {
  schemaValid: false,
  fileScopeRespected: false,
  outputPresent: false,
  testsPassed: false,
  docsUpdated: false,
  noContractBreak: false,
};

export const defaultQAChecklistTemplate: QAChecklistTemplate = qaChecklistTemplateSchema.parse({
  defaults: defaultQAChecklist,
  requiredWhen: {
    testsPassed: true,
    docsUpdated: false,
  },
});

export function createChecklistFromEnvelope(
  envelope: DispatchEnvelope,
  overrides: Partial<QAChecklist> = {},
): QAChecklist {
  const docsRequired = envelope.outputRefs.some((value) =>
    /(^|\/)(docs|README)|\.md$/i.test(value),
  );
  const testsRequired = envelope.validationCommands.length > 0;

  return {
    ...defaultQAChecklist,
    docsUpdated: !docsRequired,
    testsPassed: !testsRequired,
    ...overrides,
  };
}
