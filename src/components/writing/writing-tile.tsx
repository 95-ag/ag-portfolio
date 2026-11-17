import Link from "next/link";
import { Cover } from "@/components/project/cover";
import { TypeLabel } from "@/components/writing/type-label";
import { type Post, postColour } from "@/lib/content/posts";
import { getProjectBySlug } from "@/lib/content/projects";
import { POST_TYPE_GROUP } from "@/lib/schemas/post";
import "@/components/writing/writing.css";

type TileSize = "sm" | "art";

interface WritingTileProps {
  post: Post;
  // `sm` is Home's small quote tile; `art` is the index's tile, which carries art when its project has a cover.
  size: TileSize;
}

function TileHead({ post, size }: WritingTileProps) {
  const { title, type, addons } = post.frontmatter;
  return (
    <span className="wtile-head">
      <span
        className={`wtile-title ${size === "sm" ? "tile-title-sm" : "heading-component"}`}
      >
        {title}{" "}
        <span className="wtile-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
      <TypeLabel type={type} addons={addons} />
    </span>
  );
}

// One post as a tile: a quote tile on Home and wherever the post has no art, an art tile on the index when its related
// project has a cover (DESIGN.md → Writing Index → Writing Tile). The whole tile is one link and its text is chrome.
export function WritingTile({ post, size }: WritingTileProps) {
  const { frontmatter: fm, slug } = post;
  const project = fm.relatedProject
    ? getProjectBySlug(fm.relatedProject)
    : undefined;
  const hasArt = size === "art" && project?.frontmatter.cover !== undefined;
  const ear = !project || fm.type === "note";
  const year = fm.publishedAt.slice(0, 4);

  return (
    <Link
      href={`/writing/${slug}`}
      className="wtile select-none"
      data-size={size}
      data-art={hasArt}
      data-cover-host={hasArt ? "" : undefined}
      data-ear={ear}
      data-post-group={POST_TYPE_GROUP[fm.type]}
    >
      {hasArt && project ? (
        <>
          <span className="wtile-art-head">
            <TileHead post={post} size={size} />
            <span className="wtile-year body-caption">{year}</span>
          </span>
          <span className="wtile-art-media">
            <Cover project={project} colour={postColour(slug)} variant="tile" />
          </span>
        </>
      ) : (
        <>
          <TileHead post={post} size={size} />
          <span
            className={`wtile-quote ${size === "sm" ? "quote-text-sm" : "quote-text"}`}
          >
            “{fm.summary}”
          </span>
          <span className="wtile-year body-caption">{year}</span>
        </>
      )}
    </Link>
  );
}

interface WritingTilesProps {
  posts: Post[];
  size: TileSize;
}

// The tile grid: Home's small tiles (four, three, one across; two rows at most) or the index's (three, one across).
export function WritingTiles({ posts, size }: WritingTilesProps) {
  return (
    <div className="wtiles" data-size={size}>
      {posts.map((post) => (
        <WritingTile key={post.slug} post={post} size={size} />
      ))}
    </div>
  );
}
