import {
  artefactComponents,
  coverComponents,
} from "@/components/project/covers";
import { Artefact } from "@/components/project/covers/artefacts/artefact";
import { HeroMedia } from "@/components/project/hero-media";
import type { Project } from "@/lib/content/projects";
import "@/components/project/covers/cover.css";

type CoverVariant = "card" | "spotlight" | "hero" | "tile" | "rail";

interface CoverProps {
  project: Project;
  // Overrides the project's palette slot — an art tile wears its post's colour in the project's modes.
  colour?: number;
  variant: CoverVariant;
  // An artefact cover's caption chip; the post rail leaves it out.
  caption?: boolean;
  // Plays the cover. An ancestor marked `data-cover-host` plays it while hovered or focused.
  playing?: boolean;
}

function isVideo(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

// A project's cover in the frame its surface asks for. The frame carries the slot and the filled / marker mode per
// theme; theme.css remaps the roles from those attributes (Foundations → Colors → Covers).
export function Cover({
  project,
  colour,
  variant,
  caption = true,
  playing = false,
}: CoverProps) {
  const { slug, frontmatter: fm } = project;
  const declared = fm.cover;
  // A project still in its content stage may declare no cover; what it has stands in, as before.
  const kind =
    declared?.kind ??
    (coverComponents[slug]
      ? "live"
      : fm.heroImage
        ? isVideo(fm.heroImage)
          ? "video"
          : "image"
        : null);
  if (!kind) return null;

  const LiveCover = coverComponents[slug];

  return (
    <div
      className="cover select-none"
      aria-hidden="true"
      data-variant={variant}
      data-playing={playing}
      data-colour={colour ?? fm.colour}
      data-cover-light={declared?.light ?? "marker"}
      data-cover-dark={declared?.dark ?? "marker"}
    >
      <div className="cover-media">
        {kind === "live" && LiveCover && <LiveCover />}
        {kind === "artefact" && artefactComponents[slug] && (
          <Artefact slug={slug} caption={caption} />
        )}
        {(kind === "image" || kind === "video") && fm.heroImage && (
          <HeroMedia
            src={fm.heroImage}
            alt={fm.heroAlt}
            poster={fm.heroPoster}
            loop={fm.heroVideoLoop}
          />
        )}
      </div>
    </div>
  );
}
