import Link from "next/link";

export type Crumb = { name: string; href?: string };

interface BreadcrumbsProps {
  trail: Crumb[];
}

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="select-none">
      <ol className="support-meta flex flex-wrap items-baseline">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li
              key={crumb.name}
              aria-current={isLast ? "page" : undefined}
              className="flex min-w-0 items-baseline"
            >
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="break-words motion-safe:transition-[color] motion-safe:duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "break-words text-[var(--ink)]" : undefined
                  }
                >
                  {crumb.name}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="mx-[var(--spacing-xs)]">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
