import type React from "react";
import { DqnLaneLocalizationCover } from "./dqn-lane-localization";
import { ModelExtractionAttacksCover } from "./model-extraction-attacks";

export const coverComponents: Record<string, React.ComponentType> = {
  "model-extraction-attacks": ModelExtractionAttacksCover,
  "dqn-lane-localization": DqnLaneLocalizationCover,
};
