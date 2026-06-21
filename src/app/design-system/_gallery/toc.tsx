// Dev-only sticky table of contents for the gallery page. Horizontal, scrollable,
// pinned below the floating pill nav. No backdrop-blur (reserved for nav/menu) — a
// solid surface fill instead.

export function GalleryToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Sections"
      className="sticky top-[var(--spacing-4xl)] z-[var(--z-sticky-content)] -mx-[var(--spacing-md)] overflow-x-auto border-y border-[var(--outline-variant)] bg-[var(--surface)] px-[var(--spacing-md)] py-[var(--spacing-sm)]"
    >
      <ul className="flex w-max gap-[var(--spacing-lg)]">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="font-mono text-[13px] text-[var(--on-surface-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
