import { GitHubIcon } from "@/components/icons/brands/github";
import { ArticleIcon } from "@/components/icons/material/article";
import { DeployedCodeIcon } from "@/components/icons/material/deployed-code";
import { DescriptionIcon } from "@/components/icons/material/description";
import { SlideshowIcon } from "@/components/icons/material/slideshow";
import { LinkPill } from "@/components/ui/link-pill";
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
    label: "Code",
    Icon: () => <GitHubIcon size={16} />,
  },
  demo: {
    label: "Demo",
    Icon: () => <DeployedCodeIcon size={16} />,
  },
  paper: {
    label: "Paper",
    Icon: () => <ArticleIcon size={16} />,
  },
  report: {
    label: "Report",
    Icon: () => <DescriptionIcon size={16} />,
  },
  presentation: {
    label: "Slides",
    Icon: () => <SlideshowIcon size={16} />,
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

      <h1 className="display-primary">{fm.title}</h1>

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
                  <LinkPill
                    href={url as string}
                    icon={Icon ? <Icon /> : null}
                    external
                  >
                    {label}
                  </LinkPill>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
