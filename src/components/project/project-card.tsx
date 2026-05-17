import Link from "next/link";
import type { IconProps } from "@/components/icons/icon-base";
import { ArrowForwardIcon } from "@/components/icons/material/arrow-forward";
import { CodeIcon } from "@/components/icons/material/code";
import { ScienceIcon } from "@/components/icons/material/science";
import { WorkIcon } from "@/components/icons/material/work";
import { HeroMedia } from "@/components/project/hero-media";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: Project;
  variant?: "compact" | "featured" | "text";
}

type IconComponent = (props: IconProps) => React.ReactElement;

const categoryIcon: Record<string, IconComponent> = {
  academic: ScienceIcon,
  freelance: WorkIcon,
  personal: CodeIcon,
};

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
        "group flex flex-col border border-[var(--outline-variant)] bg-[var(--surface-raised)]",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:border-[var(--outline)] hover:bg-[var(--surface)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
      )}
    >
      {variant === "text" ? (
        /* Text-only variant — intentional, no media area */
        <div className="flex flex-1 flex-col gap-[var(--spacing-md)] p-[var(--spacing-lg)]">
          <div className="text-[var(--on-surface-muted)] opacity-60">
            {CategoryIcon && <CategoryIcon size={18} />}
          </div>
          <div className="flex flex-1 flex-col gap-[var(--spacing-xs)]">
            <p className="heading-component font-semibold text-[var(--on-surface)] group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2">
              {fm.title}
            </p>
            <p className="body-caption">{displayText}</p>
          </div>
          <div className="flex flex-wrap gap-[var(--spacing-xs)]">
            {fm.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Hero — image scales slightly on hover */}
          <div className="p-[var(--spacing-md)]">
            <div className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-sunken)] aspect-video">
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
                  "heading-component",
                )}
              >
                {fm.title}
              </p>
              <ArrowForwardIcon
                size={16}
                className="mt-[3px] shrink-0 text-[var(--on-surface-muted)] opacity-0 transition-all duration-[var(--duration-fast)] group-hover:translate-x-[3px] group-hover:text-[var(--accent)] group-hover:opacity-100"
              />
            </div>

            <p className="body-caption flex-1">{displayText}</p>
            <div className="flex flex-wrap gap-[var(--spacing-xs)]">
              {fm.tags.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </>
      )}
    </Link>
  );
}
