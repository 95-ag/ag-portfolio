import Link from "next/link";
import { useId } from "react";

export type RelatedItem = {
  kind: "project" | "post";
  title: string;
  summary: string;
  href: string;
};

interface RelatedProps {
  items: RelatedItem[];
}

const MAX_ITEMS = 3;

const KIND_LABEL: Record<RelatedItem["kind"], string> = {
  project: "Project",
  post: "Post",
};

export function Related({ items }: RelatedProps) {
  const headingId = useId();

  if (items.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className="select-none">
      <h2 id={headingId} className="mono-anchor mb-[var(--spacing-lg)]">
        Related
      </h2>
      <ul className="grid grid-cols-1 divide-y divide-[var(--hairline)] border-t border-[var(--hairline)] lg:grid-cols-3 lg:gap-x-[var(--spacing-gutter)] lg:divide-y-0">
        {items.slice(0, MAX_ITEMS).map((item) => (
          <li key={item.href} className="min-w-0">
            <Link
              href={item.href}
              className="group flex flex-col gap-[var(--spacing-xs)] py-[var(--spacing-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <span className="support-meta">{KIND_LABEL[item.kind]}</span>
              <span className="heading-component break-words group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2">
                {item.title}
              </span>
              <span className="body-secondary truncate">{item.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
