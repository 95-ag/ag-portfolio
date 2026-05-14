import { ArrowRight, Briefcase, Code2, FlaskConical } from "lucide-react";
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
  const displayText = fm.subtitle ?? fm.summary;

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group flex flex-col rounded-[var(--radius-sm)] border border-[var(--outline-variant)] bg-[var(--surface-raised)]",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:border-[var(--outline)] hover:bg-[var(--surface)]",
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
            <p className="type-body-sm text-[var(--on-surface-muted)]">
              {displayText}
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
          {/* Hero — image scales slightly on hover */}
          <div className="p-[var(--spacing-md)]">
            <div className="relative w-full overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] aspect-video">
              <div className="absolute inset-0 transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]">
                <HeroMedia
                  src={fm.heroImage}
                  alt={fm.heroAlt}
                  poster={fm.heroPoster}
                  loop={fm.heroVideoLoop}
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
                  "font-semibold text-[var(--on-surface)]",
                  "group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2",
                  variant === "featured" ? "type-headline-sm" : "type-body-lg",
                )}
              >
                {fm.title}
              </p>
              <ArrowRight
                size={16}
                aria-hidden
                className="mt-[3px] shrink-0 text-[var(--on-surface-muted)] opacity-0 transition-all duration-[var(--duration-fast)] group-hover:translate-x-[3px] group-hover:text-[var(--accent)] group-hover:opacity-100"
              />
            </div>

            <p className="type-body-sm flex-1 text-[var(--on-surface-muted)]">
              {displayText}
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
