interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  external?: boolean;
}

export function SocialLink({
  href,
  icon,
  children,
  external = false,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex h-9 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-sm)] border border-[var(--outline-variant)] px-[var(--spacing-md)] interactive-label text-[var(--on-surface)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--outline)] hover:bg-[var(--surface-raised)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
    >
      {icon}
      {children}
    </a>
  );
}
