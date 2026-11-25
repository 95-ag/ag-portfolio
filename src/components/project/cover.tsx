import {
  artefactComponents,
  coverComponents,
  postCoverComponents,
} from "@/components/project/covers";
import { Artefact } from "@/components/project/covers/artefacts/artefact";
import { HeroMedia } from "@/components/project/hero-media";
import type { CoverSubject } from "@/lib/content/projects";
import "@/components/project/covers/cover.css";

type CoverVariant = "card" | "spotlight" | "hero" | "tile" | "rail";

interface CoverProps {
  subject: CoverSubject;
  // Overrides the subject's colour slot.
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

// A cover in the frame its surface asks for. The frame carries the slot and the filled / marker mode per
// theme; theme.css remaps the roles from those attributes (Foundations → Colors → Covers).
export function Cover({
  subject,
  colour,
  variant,
  caption = true,
  playing = false,
}: CoverProps) {
  const { slug, heroImage } = subject;
  const declared = subject.cover;
  const LiveCover = coverComponents[slug] ?? postCoverComponents[slug];
  // A project still in its content stage may declare no cover; what it has stands in, as before.
  const kind =
    declared?.kind ??
    (LiveCover
      ? "live"
      : heroImage
        ? isVideo(heroImage)
          ? "video"
          : "image"
        : null);
  if (!kind) return null;

  return (
    <div
      className="cover select-none"
      aria-hidden="true"
      data-variant={variant}
      data-playing={playing}
      data-colour={colour ?? subject.colour}
      data-cover-light={declared?.light ?? "marker"}
      data-cover-dark={declared?.dark ?? "marker"}
    >
      <div className="cover-media">
        {kind === "live" && LiveCover && <LiveCover />}
        {kind === "artefact" && artefactComponents[slug] && (
          <Artefact slug={slug} caption={caption} />
        )}
        {(kind === "image" || kind === "video") && heroImage && (
          <HeroMedia
            src={heroImage}
            alt={subject.heroAlt}
            poster={subject.heroPoster}
            loop={subject.heroVideoLoop}
          />
        )}
      </div>
    </div>
  );
}
