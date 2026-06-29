import { OpenInNewIcon } from "@/components/icons/material/open-in-new";

interface LinkPillProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  external?: boolean;
}

// Soft-filled pill link shared by the About identity row and project-header
// links. `external` drives both the new-tab attributes and the trailing
// open-in-new icon, so mailto links omit both.
export function LinkPill({
  href,
  icon,
  children,
  external = false,
}: LinkPillProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex h-9 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-pill)] bg-[var(--surface-elevated)] px-[var(--spacing-md)] interactive-label text-[var(--ink)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent)] active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
    >
      {icon}
      {children}
      {external && (
        <span className="text-[var(--ink-muted)] transition-all duration-[var(--duration-fast)] group-hover:translate-x-[2px] group-hover:text-[var(--accent)] motion-reduce:group-hover:translate-x-0">
          <OpenInNewIcon size={12} />
        </span>
      )}
    </a>
  );
}
