import Link from "next/link";
import { ArrowForwardIcon } from "@/components/icons/material/arrow-forward";
import { HeroMedia } from "@/components/project/hero-media";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, frontmatter: fm } = project;
  const displayText = fm.summary;

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group flex flex-col border border-[var(--hairline)] bg-[var(--surface-elevated)]",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:border-[var(--hairline-strong)] hover:bg-[var(--surface)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
      )}
    >
      {/* Hero — every card renders a hero (live cover or heroImage) */}
      <div className="p-[var(--spacing-md)]">
        <div className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-deep)] aspect-video">
          <div className="absolute inset-0 transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
            <HeroMedia
              src={fm.heroImage}
              alt={fm.heroAlt}
              poster={fm.heroPoster}
              loop={fm.heroVideoLoop}
              slug={slug}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-[var(--spacing-md)] px-[var(--spacing-lg)] pb-[var(--spacing-xl)] pt-[var(--spacing-xs)]">
        {/* Title row with trailing chevron */}
        <div className="flex items-start justify-between gap-[var(--spacing-sm)]">
          <p
            className={cn(
              "heading-component font-semibold",
              "group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2",
            )}
          >
            {fm.title}
          </p>
          <ArrowForwardIcon
            size={16}
            className="mt-[3px] shrink-0 text-[var(--ink-muted)] opacity-0 transition-all duration-[var(--duration-fast)] group-hover:translate-x-[3px] group-hover:text-[var(--accent)] group-hover:opacity-100 motion-reduce:group-hover:translate-x-0"
          />
        </div>

        <p className="body-caption line-clamp-3">{displayText}</p>
        <div className="flex flex-wrap gap-[var(--spacing-xs)]">
          {fm.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
