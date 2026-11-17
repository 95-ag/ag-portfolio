import Link from "next/link";
import { Cover } from "@/components/project/cover";
import { Tag } from "@/components/ui/display/tag";
import type { Project } from "@/lib/content/projects";

interface ProjectCardProps {
  project: Project;
}

// Frameless: the cover above its text, no border or fill. The link is the cover host (the cover plays while it holds
// hover or focus) and carries the project's slot, so the title and tags can take its ink.
export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, frontmatter: fm } = project;

  return (
    <Link
      href={`/work/${slug}`}
      data-cover-host
      data-cover-zoom
      data-colour={fm.colour}
      className="group flex select-none flex-col gap-[var(--spacing-md)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
    >
      <Cover project={project} variant="card" />
      <div className="flex origin-left flex-col gap-[var(--spacing-md)] motion-safe:transition-transform motion-safe:duration-[var(--duration-slow)] motion-safe:group-hover:scale-[1.03]">
        <p className="heading-component motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)] group-hover:text-[var(--c-ink)]">
          {fm.title}
        </p>
        <p className="body-caption line-clamp-3">{fm.summary}</p>
        <div className="flex flex-wrap gap-x-[var(--spacing-md)] text-[var(--c-ink)]">
          {fm.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
