import Link from "next/link";
import { artefactComponents } from "@/components/project/covers";
import { Artefact } from "@/components/project/covers/artefacts/artefact";
import { Tag } from "@/components/ui/display/tag";
import type { Post } from "@/lib/content/posts";
import { getProjectBySlug } from "@/lib/content/projects";
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
  const showArtefact = project && artefactComponents[project.slug];

  return (
    <aside className="post-rail" aria-label="About this post">
      {fm.updatedAt && (
        <div>
          <p className="meta-label">Updated</p>
          <p className="body-caption">{formatDate(fm.updatedAt)}</p>
        </div>
      )}
      <div>
        <p className="meta-label">Published</p>
        <p className="body-caption">{formatDate(fm.publishedAt)}</p>
      </div>
      <div>
        <p className="meta-label">Read</p>
        <p className="body-caption">{readingMinutes(post.body)} min</p>
      </div>
      <div>
        <p className="meta-label">Tags</p>
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
          <p className="meta-label">From the project</p>
          {showArtefact && (
            <span
              className="cover"
              aria-hidden="true"
              data-variant="rail"
              data-cover-light={project.frontmatter.cover?.light ?? "marker"}
              data-cover-dark={project.frontmatter.cover?.dark ?? "marker"}
            >
              <span className="cover-media">
                <Artefact slug={project.slug} caption={false} />
              </span>
            </span>
          )}
          <span className="heading-component">{project.frontmatter.title}</span>
        </Link>
      )}
    </aside>
  );
}
