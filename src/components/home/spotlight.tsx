import Link from "next/link";
import { SnapProgress } from "@/components/home/snap-progress";
import {
  type SpotlightSlide,
  SpotlightStage,
} from "@/components/home/spotlight-stage";
import { EastIcon } from "@/components/icons/material/east";
import { Cover } from "@/components/project/cover";
import { Button } from "@/components/ui/controls/button";
import { Tag } from "@/components/ui/display/tag";
import { coverSubject, type Project } from "@/lib/content/projects";

interface SpotlightProps {
  // Featured projects, already in their `order`.
  projects: Project[];
  // Home takes the page-level snap at and below 860px; the design-system gallery embeds the spotlight without it.
  snap?: boolean;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// The featured projects one at a time under "Selected work" (DESIGN.md → Home Page → Spotlight): a cover beside frameless
// text with the link to the rest below on wide viewports, one snapped full screen at and below 860px.
export function Spotlight({ projects, snap = true }: SpotlightProps) {
  const slides: SpotlightSlide[] = projects.map((project, i) => {
    const { slug, frontmatter: fm } = project;
    const mode = {
      light: fm.cover?.light ?? "marker",
      dark: fm.cover?.dark ?? "marker",
    };
    return {
      slug,
      colour: fm.colour,
      tab: fm.shortTitle ?? fm.title,
      cover: mode,
      node: (
        <div className="spot-body">
          {/* The cover's own ground, which the stacked screen runs up behind the controls and fades out under the cover. */}
          <span
            aria-hidden="true"
            className="spot-ground"
            data-colour={fm.colour}
            data-cover-light={mode.light}
            data-cover-dark={mode.dark}
          />
          <div className="spot-cover">
            <Cover subject={coverSubject(project)} variant="spotlight" />
          </div>
          <div className="spot-text select-none">
            <p className="insight-label spot-counter">
              {pad(i + 1)} / {pad(projects.length)}
            </p>
            <div className="spot-copy">
              <h3 className="heading-section spot-title">{fm.title}</h3>
              <p className="body-caption">{fm.summary}</p>
            </div>
            <div className="spot-tags">
              {fm.tags.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          {/* Wide: the whole slide is the link, and an ink circle with an arrow shows on hover or focus. */}
          <Link
            href={`/work/${slug}`}
            aria-label={fm.title}
            className="spot-cover-link"
          />
          <span aria-hidden="true" className="spot-open">
            <EastIcon size={24} />
          </span>
          {/* Stacked: the one way into the project; the stretched link above is gone there so nothing is announced twice. */}
          <Button
            variant="filled"
            href={`/work/${slug}`}
            iconPosition="trailing"
            icon={<EastIcon size={18} />}
            aria-label={`View project: ${fm.title}`}
            className="spot-project-button"
          >
            View project
          </Button>
        </div>
      ),
    };
  });

  return (
    <section
      aria-labelledby="selected-work"
      data-spot-snap={snap || undefined}
      className="spot-section flex flex-col"
    >
      {snap && <SnapProgress />}
      <h2
        id="selected-work"
        className="mono-anchor spot-heading mb-[var(--spacing-lg)] select-none"
      >
        Selected work
      </h2>
      <div className="spot-frame">
        <SpotlightStage slides={slides} />
      </div>
      <div className="spot-all mt-[var(--spacing-lg)] flex justify-end">
        <Link
          href="/work"
          className="body-caption flex min-h-[44px] items-center gap-[var(--spacing-xs)] text-[var(--ink)] motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)] hover:text-[var(--accent)]"
        >
          View all projects
          <EastIcon size={16} />
        </Link>
      </div>
    </section>
  );
}
