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
    Icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  demo: {
    label: "Demo",
    Icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    ),
  },
  paper: {
    label: "Paper",
    Icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
};

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function ProjectHeader({ frontmatter: fm }: ProjectHeaderProps) {
  const links = fm.links ? Object.entries(fm.links).filter(([, v]) => !!v) : [];

  return (
    <header className="flex flex-col gap-[var(--spacing-lg)]">
      {fm.tags.length > 0 && (
        <div className="flex flex-wrap gap-[var(--spacing-xs)]">
          {fm.tags.map((tag) => (
            <Tag key={tag} variant="filled">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <h1 className="type-display-lg text-[var(--on-surface)]">{fm.title}</h1>

      {fm.subtitle && (
        <p className="type-body-lg text-[var(--on-surface-muted)]">
          {fm.subtitle}
        </p>
      )}

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
                    className="type-body-md font-medium flex items-center gap-[var(--spacing-xs)] text-[var(--on-surface)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                  >
                    {Icon && <Icon />}
                    {label}
                    <span className="text-[var(--on-surface-muted)]">
                      <ExternalLinkIcon />
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
