import { artefactComponents } from "../index";
import "../cover.css";

interface ArtefactProps {
  slug: string;
  // Overrides the nearest ancestor's palette slot — an art tile wears its post's colour, not its project's.
  colour?: number;
  caption: boolean;
}

// The project's real output on the cover ground, sized to its container. The enclosing frame carries the
// cover mode (`data-cover-*`); this paints in whatever the mode remapped.
export function Artefact({ slug, colour, caption }: ArtefactProps) {
  const Composition = artefactComponents[slug];
  if (!Composition) return null;
  return (
    <div
      className="art"
      {...(colour === undefined ? {} : { "data-colour": colour })}
    >
      <Composition caption={caption} />
    </div>
  );
}
