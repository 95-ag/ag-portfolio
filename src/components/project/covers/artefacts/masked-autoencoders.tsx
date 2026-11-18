import { crop } from "./crop";

const SRC = "/projects/masked-autoencoders/reconstructions.png";
const SIZE: [number, number] = [1387, 669];

export function MaskedAutoencodersArtefact({ caption }: { caption: boolean }) {
  return (
    <div className="art-mae">
      <div className="art-frame">
        <div className="art-crop" style={crop(SRC, SIZE, [24, 45, 292, 291])} />
        <div
          className="art-crop art-m"
          style={crop(SRC, SIZE, [374, 45, 292, 291])}
        />
        <div
          className="art-crop art-r"
          style={crop(SRC, SIZE, [723, 45, 292, 291])}
        />
      </div>
      <div className="art-steps">
        <span className="art-lbl insight-label art-o">Original</span>
        <span className="art-lbl insight-label art-mk">Masked</span>
        <span className="art-lbl insight-label art-rc">Reconstruction</span>
      </div>
      {caption && (
        <span className="art-cap insight-label">
          66.85% linear probe at 75% masking
        </span>
      )}
    </div>
  );
}
