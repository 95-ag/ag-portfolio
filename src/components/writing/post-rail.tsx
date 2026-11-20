import Link from "next/link";
import { Cover } from "@/components/project/cover";
import { CoverLoop } from "@/components/project/cover-loop";
import { Tag } from "@/components/ui/display/tag";
import type { Post } from "@/lib/content/posts";
import { coverSubject, getProjectBySlug } from "@/lib/content/projects";
import { formatDate } from "@/lib/utils/format-date";
import { readingMinutes } from "@/lib/utils/reading-time";
import "@/components/writing/writing.css";

interface PostRailProps {
  post: Post;
}

// A post's facts beside its column (DESIGN.md → Post Layout): dates, reading time, tags and the project it came from.
// Placement — beside the column from 1200px, above it below — belongs to the page; this is the rail's own content.
export function PostRail({ post }: PostRailProps) {
  const fm = post.frontmatter;
  const project = fm.relatedProject
    ? getProjectBySlug(fm.relatedProject)
    : undefined;

  return (
    <aside className="post-rail" aria-label="About this post">
      {fm.updatedAt && (
        <div>
          <p className="insight-label">Updated</p>
          <p className="body-caption">{formatDate(fm.updatedAt)}</p>
        </div>
      )}
      <div>
        <p className="insight-label">Published</p>
        <p className="body-caption">{formatDate(fm.publishedAt)}</p>
      </div>
      <div>
        <p className="insight-label">Read</p>
        <p className="body-caption">{readingMinutes(post.body)} min</p>
      </div>
      <div>
        <p className="insight-label">Tags</p>
        <ul className="flex flex-col text-[var(--accent)]">
          {fm.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
      {project && (
        <Link
          href={`/work/${project.slug}`}
          className="post-rail-project"
          data-colour={project.frontmatter.colour}
        >
          <p className="insight-label">From the project</p>
          <CoverLoop className="post-rail-cover">
            <Cover
              subject={coverSubject(project)}
              variant="rail"
              caption={false}
            />
          </CoverLoop>
          <span className="heading-component">{project.frontmatter.title}</span>
        </Link>
      )}
    </aside>
  );
}
