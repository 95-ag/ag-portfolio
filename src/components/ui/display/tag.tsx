interface TagProps {
  children: React.ReactNode;
}

// A plain label: no fill, no padding. Its colour is the context's — the parent sets `color` (the project's ink, the
// accent), and the label takes it.
export function Tag({ children }: TagProps) {
  return <span className="tag-label inline-block">{children}</span>;
}
