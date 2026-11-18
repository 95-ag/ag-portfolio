import Link from "next/link";
import { ArrowOutwardIcon } from "@/components/icons/material/arrow-outward";
import { Cover } from "@/components/project/cover";
import { CoverLoop } from "@/components/project/cover-loop";
import { TypeLabel } from "@/components/writing/type-label";
import { type Post, postColour } from "@/lib/content/posts";
import { getProjectBySlug } from "@/lib/content/projects";
import { POST_TYPE_GROUP } from "@/lib/schemas/post";
import "@/components/writing/writing.css";

type TileSize = "sm" | "art";

interface PostTileProps {
  post: Post;
  // `sm` is Home's small quote tile; `art` is the index's tile, which carries art when its project has a cover.
  size: TileSize;
  // The project colours slot an art tile wears; by default the post's own place in publish order.
  colour?: number;
}

function TileTitle({ post, size }: PostTileProps) {
  return (
    <span
      className={`ptile-title ${size === "sm" ? "tile-title-sm" : "heading-component"}`}
    >
      {post.frontmatter.title}{" "}
      <span className="ptile-arrow" aria-hidden="true">
        <ArrowOutwardIcon size={size === "sm" ? 16 : 20} />
      </span>
    </span>
  );
}

// One post as a tile: a quote tile on Home and wherever the post has no art, an art tile on the index when its related
// project has a cover (DESIGN.md → Writing Index → Post Tile). The whole tile is one link and its text is chrome.
export function PostTile({ post, size, colour }: PostTileProps) {
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
      className="ptile select-none"
      data-size={size}
      data-art={hasArt}
      data-ear={ear}
      data-post-group={POST_TYPE_GROUP[fm.type]}
    >
      {hasArt && project ? (
        <>
          <span className="ptile-art-head">
            <TileTitle post={post} size={size} />
            <TypeLabel
              type={fm.type}
              addons={fm.addons}
              year={year}
              large={size === "art"}
            />
          </span>
          <CoverLoop className="ptile-art-media">
            <Cover
              project={project}
              colour={colour ?? postColour(slug)}
              variant="tile"
            />
          </CoverLoop>
        </>
      ) : (
        <>
          <TileTitle post={post} size={size} />
          <span
            className={`ptile-quote ${size === "sm" ? "quote-text-sm" : "quote-text"}`}
          >
            “{fm.summary}”
          </span>
          <TypeLabel
            type={fm.type}
            addons={fm.addons}
            year={year}
            large={size === "art"}
          />
        </>
      )}
    </Link>
  );
}

interface PostTilesProps {
  posts: Post[];
  size: TileSize;
}

// The tile grid: Home's small tiles (four, three, one across; two rows at most) or the index's (three, one across).
export function PostTiles({ posts, size }: PostTilesProps) {
  return (
    <div className="ptiles" data-size={size}>
      {posts.map((post) => (
        <PostTile key={post.slug} post={post} size={size} />
      ))}
    </div>
  );
}
