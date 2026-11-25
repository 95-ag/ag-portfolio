import type React from "react";
import { ComponentsRadarArtefact } from "./artefacts/components-radar";
import { DqnLaneLocalizationArtefact } from "./artefacts/dqn-lane-localization";
import { MaskedAutoencodersArtefact } from "./artefacts/masked-autoencoders";
import { ModelExtractionAttacksArtefact } from "./artefacts/model-extraction-attacks";
import { SelfBuildingPortfolioArtefact } from "./artefacts/self-building-portfolio";
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

// Posts that carry their own cover, registered by post slug. Empty until a post has one; slugs are unique across projects
// and posts, so Cover finds either registry by slug alone.
export const postCoverComponents: Record<string, React.ComponentType> = {};

// A project's real output on the cover ground, registered by slug alongside the live covers.
export const artefactComponents: Record<
  string,
  React.ComponentType<{ caption: boolean }>
> = {
  "components-radar": ComponentsRadarArtefact,
  "self-building-portfolio": SelfBuildingPortfolioArtefact,
  "model-extraction-attacks": ModelExtractionAttacksArtefact,
  "dqn-lane-localization": DqnLaneLocalizationArtefact,
  "masked-autoencoders": MaskedAutoencodersArtefact,
};
