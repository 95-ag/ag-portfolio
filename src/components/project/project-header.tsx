import { GitHubIcon } from "@/components/icons/brands/github";
import { DeployedCodeIcon } from "@/components/icons/material/deployed-code";
import { DescriptionIcon } from "@/components/icons/material/description";
import { OpenInNewIcon } from "@/components/icons/material/open-in-new";
import { Tag } from "@/components/ui/tag";
import type { ProjectFrontmatter } from "@/lib/schemas/project";

interface ProjectHeaderProps {
  frontmatter: ProjectFrontmatter;
}

const LINK_META: Record<
  string,
  { label: string; Icon: () => React.ReactElement }
> = {
  github: {
    label: "GitHub",
    Icon: () => <GitHubIcon size={16} />,
  },
  demo: {
    label: "Demo",
    Icon: () => <DeployedCodeIcon size={16} />,
  },
  paper: {
    label: "Paper",
    Icon: () => <DescriptionIcon size={16} />,
  },
};

export function ProjectHeader({ frontmatter: fm }: ProjectHeaderProps) {
  const links = fm.links ? Object.entries(fm.links).filter(([, v]) => !!v) : [];

  return (
    <header className="flex flex-col gap-[var(--spacing-lg)]">
      {fm.tags.length > 0 && (
        <div className="flex flex-wrap gap-[var(--spacing-xs)]">
          {fm.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <h1 className="display-primary text-[var(--on-surface)]">{fm.title}</h1>

      {fm.subtitle && <p className="body-secondary">{fm.subtitle}</p>}

      {links.length > 0 && (
        <nav aria-label="Project links">
          <ul className="flex flex-wrap gap-[var(--spacing-lg)]">
            {links.map(([key, url]) => {
              const meta = LINK_META[key];
              const label = meta?.label ?? key;
              const Icon = meta?.Icon;
              return (
                <li key={key}>
                  <a
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group interactive-label font-semibold inline-flex items-center gap-[var(--spacing-md)] rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--on-surface)] transition-all duration-[var(--duration-fast)] hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] active:opacity-70"
                  >
                    {Icon && <Icon />}
                    {label}
                    <span className="text-[var(--on-surface-muted)] transition-all duration-[var(--duration-fast)] group-hover:translate-x-[2px] group-hover:text-[var(--accent)]">
                      <OpenInNewIcon size={12} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
