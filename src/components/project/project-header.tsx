import { Tag } from "@/components/ui/tag";
import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface ProjectHeaderProps {
  frontmatter: ProjectFrontmatter;
}

export function ProjectHeader({ frontmatter: fm }: ProjectHeaderProps) {
  const links = fm.links ? Object.entries(fm.links).filter(([, v]) => !!v) : [];

  const linkLabels: Record<string, string> = {
    github: "GitHub",
    demo: "Demo",
    paper: "Paper",
  };

  return (
    <header className="flex flex-col gap-[var(--spacing-lg)]">
      {/* Tags */}
      {fm.tags.length > 0 && (
        <div className="flex flex-wrap gap-[var(--spacing-xs)]">
          {fm.tags.map((tag) => (
            <Tag key={tag} variant="filled">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="type-display-lg text-[var(--on-surface)]">{fm.title}</h1>

      {/* Subtitle */}
      {fm.subtitle && (
        <p className="type-body-lg text-[var(--on-surface-muted)]">
          {fm.subtitle}
        </p>
      )}

      {/* Links row */}
      {links.length > 0 && (
        <nav aria-label="Project links">
          <ul className="flex flex-wrap gap-[var(--spacing-lg)]">
            {links.map(([key, url]) => (
              <li key={key}>
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-md font-medium text-[var(--on-surface)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                >
                  ↗ {linkLabels[key] ?? key}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
