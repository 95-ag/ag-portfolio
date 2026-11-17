import { crop } from "./crop";

const SRC = "/projects/model-extraction-attacks/adversarial-example-panel.png";
const SIZE: [number, number] = [637, 225];

export function ModelExtractionAttacksArtefact({
  caption,
}: {
  caption: boolean;
}) {
  return (
    <div className="art-mea">
      <div className="art-pair">
        <div className="art-pix">
          <div
            className="art-crop"
            style={crop(SRC, SIZE, [15, 11, 173, 173])}
          />
          <div
            className="art-crop art-adv"
            style={crop(SRC, SIZE, [449, 11, 173, 173])}
          />
        </div>
        <div className="art-verdict">
          <span className="art-lbl artefact-label">Model says</span>
          <span className="art-v">
            <span className="art-cat">Cat</span>
            <span className="art-dog">Dog</span>
          </span>
        </div>
      </div>
      {caption && (
        <span className="art-cap artefact-label">
          ~80% replica from 25k queries
        </span>
      )}
    </div>
  );
}
