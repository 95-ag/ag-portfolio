import Link from "next/link";
import { Tag } from "@/components/ui/display/tag";
import type { Post } from "@/lib/content/posts";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format-date";

interface PostRowProps {
  post: Post;
  prefetch?: boolean;
}

export function PostRow({ post, prefetch }: PostRowProps) {
  const { slug, frontmatter: fm } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={prefetch}
      className={cn(
        "group flex select-none flex-col gap-[var(--spacing-xs)] py-[var(--spacing-lg)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
      )}
    >
      <time dateTime={fm.publishedAt} className="support-meta">
        {formatDate(fm.publishedAt)}
      </time>
      <p className="heading-component group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-2">
        {fm.title}
      </p>
      <p className="body-secondary">{fm.summary}</p>
      <div className="mt-[var(--spacing-xs)] flex flex-wrap gap-[var(--spacing-xs)]">
        {fm.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
