import type React from "react";
import { DqnLaneLocalizationCover } from "./dqn-lane-localization";
import { MaskedAutoencodersCover } from "./masked-autoencoders";
import { ModelExtractionAttacksCover } from "./model-extraction-attacks";
import { SelfBuildingPortfolioCover } from "./self-building-portfolio";

export const coverComponents: Record<string, React.ComponentType> = {
  "model-extraction-attacks": ModelExtractionAttacksCover,
  "dqn-lane-localization": DqnLaneLocalizationCover,
  "masked-autoencoders": MaskedAutoencodersCover,
  "self-building-portfolio": SelfBuildingPortfolioCover,
};
