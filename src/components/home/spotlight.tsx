import Link from "next/link";
import {
  type SpotlightSlide,
  SpotlightStage,
} from "@/components/home/spotlight-stage";
import { EastIcon } from "@/components/icons/material/east";
import { Cover } from "@/components/project/cover";
import { Tag } from "@/components/ui/display/tag";
import type { Project } from "@/lib/content/projects";

interface SpotlightProps {
  // Featured projects, already in their `order`.
  projects: Project[];
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// The featured projects one at a time — a cover beside frameless text — under "Selected work", with the link to the
// rest below (DESIGN.md → Home Page → Spotlight).
export function Spotlight({ projects }: SpotlightProps) {
  const slides: SpotlightSlide[] = projects.map((project, i) => {
    const { slug, frontmatter: fm } = project;
    return {
      slug,
      colour: fm.colour,
      tab: fm.shortTitle ?? fm.title,
      node: (
        <Link href={`/work/${slug}`} className="spot-link">
          <div className="spot-cover">
            <Cover project={project} variant="spotlight" />
          </div>
          <div className="spot-text select-none">
            <p className="insight-label">
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
        </Link>
      ),
    };
  });

  return (
    <section aria-labelledby="selected-work" className="flex flex-col">
      <h2
        id="selected-work"
        className="mono-anchor mb-[var(--spacing-lg)] select-none"
      >
        Selected work
      </h2>
      <SpotlightStage slides={slides} />
      <div className="mt-[var(--spacing-lg)] flex justify-end">
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
