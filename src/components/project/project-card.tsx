import { Briefcase, Code2, FlaskConical } from "lucide-react";
import Link from "next/link";
import { HeroMedia } from "@/components/project/hero-media";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: Project;
  variant?: "compact" | "featured" | "text";
}

const categoryIcon = {
  academic: FlaskConical,
  freelance: Briefcase,
  personal: Code2,
} as const;

export function ProjectCard({
  project,
  variant = "compact",
}: ProjectCardProps) {
  const { slug, frontmatter: fm } = project;
  const CategoryIcon = categoryIcon[fm.projectType];

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group flex flex-col rounded-[var(--radius-sm)] border border-[var(--outline-variant)] bg-[var(--surface-raised)]",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:border-[var(--outline)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
      )}
    >
      {variant === "text" ? (
        /* Text-only variant — intentional, no media area */
        <div className="flex flex-1 flex-col gap-[var(--spacing-md)] p-[var(--spacing-lg)]">
          <div className="text-[var(--on-surface-muted)] opacity-60">
            <CategoryIcon size={18} aria-hidden="true" />
          </div>
          <div className="flex flex-1 flex-col gap-[var(--spacing-xs)]">
            <p className="type-headline-sm font-semibold text-[var(--on-surface)] group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2">
              {fm.title}
            </p>
            <p className="type-body-sm text-[var(--on-surface-muted)] line-clamp-2">
              {fm.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-[var(--spacing-xs)]">
            {fm.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} variant="filled">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Hero — inset with increased padding for breathing room */}
          <div className="p-[var(--spacing-md)]">
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface-sunken)]",
                variant === "featured" ? "aspect-[4/3]" : "aspect-square",
              )}
            >
              <HeroMedia
                src={fm.heroImage}
                alt={fm.heroAlt}
                poster={fm.heroPoster}
                loop={fm.heroVideoLoop}
              />
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-[var(--spacing-sm)] px-[var(--spacing-lg)] pb-[var(--spacing-lg)]">
            <p
              className={cn(
                "font-semibold text-[var(--on-surface)]",
                "group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2",
                variant === "featured" ? "type-headline-sm" : "type-body-lg",
              )}
            >
              {fm.title}
            </p>
            <p className="type-body-sm flex-1 text-[var(--on-surface-muted)] line-clamp-2">
              {fm.summary}
            </p>
            <div className="flex flex-wrap gap-[var(--spacing-xs)]">
              {fm.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} variant="filled">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </>
      )}
    </Link>
  );
}
