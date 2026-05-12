import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { Icon } from "@/components/ui/icon";
import { HeroMedia } from "@/components/project/hero-media";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/lib/content/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "compact" | "featured";
}

export function ProjectCard({
  project,
  variant = "compact",
}: ProjectCardProps) {
  const { slug, frontmatter: fm } = project;

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group block rounded-[var(--radius-md)] border border-[var(--outline-variant)] bg-[var(--surface-raised)]",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:border-[var(--outline)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
      )}
    >
      {/* Hero */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-t-[var(--radius-md)] bg-[var(--surface-sunken)]",
          variant === "featured" ? "aspect-[16/9]" : "aspect-video",
        )}
      >
        <HeroMedia
          src={fm.heroImage}
          alt={fm.heroAlt}
          poster={fm.heroPoster}
          loop={fm.heroVideoLoop}
        />
      </div>

      {/* Body */}
      <div
        className={cn(
          "flex flex-col gap-[var(--spacing-sm)]",
          variant === "featured"
            ? "p-[var(--spacing-xl)]"
            : "p-[var(--spacing-lg)]",
        )}
      >
        {/* Title row */}
        <div className="flex items-start justify-between gap-[var(--spacing-sm)]">
          <p
            className={cn(
              "font-semibold text-[var(--on-surface)]",
              "group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2",
              variant === "featured" ? "type-headline-sm" : "type-body-lg",
            )}
          >
            {fm.title}
          </p>
          <Icon
            icon={ChevronRight}
            size={18}
            className={cn(
              "mt-[3px] shrink-0 text-[var(--on-surface-muted)]",
              "transition-[color,transform] duration-[var(--duration-fast)]",
              "group-hover:translate-x-[3px] group-hover:text-[var(--accent)]",
            )}
          />
        </div>

        {/* Summary */}
        <p className="type-body-sm text-[var(--on-surface-muted)] line-clamp-2">
          {fm.summary}
        </p>

        {/* Tags */}
        <div className="mt-[var(--spacing-xs)] flex flex-wrap gap-[var(--spacing-xs)]">
          {fm.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
