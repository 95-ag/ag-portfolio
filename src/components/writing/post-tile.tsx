import Link from "next/link";
import { NorthEastIcon } from "@/components/icons/material/north-east";
import { Cover } from "@/components/project/cover";
import { CoverLoop } from "@/components/project/cover-loop";
import { TypeLabel } from "@/components/writing/type-label";
import { type Post, postColour } from "@/lib/content/posts";
import type { CoverSubject } from "@/lib/content/projects";
import { POST_TYPE_GROUP } from "@/lib/schemas/post";
import "@/components/writing/writing.css";

type TileSize = "sm" | "art";

interface PostTileProps {
  post: Post;
  // `sm` is Home's small quote tile; `art` is the index's tile, which carries art when the post has a cover of its own.
  size: TileSize;
  // The project colours slot an art tile wears; by default the post's own place in publish order.
  colour?: number;
  // Draws this cover in place of the post's own — the design-system gallery borrows a project's.
  coverStandIn?: CoverSubject;
  // Forces the touch layout (no slide-down, only the title over the cover) — for the design-system gallery.
  touch?: boolean;
}

function TileTitle({ post, size }: Pick<PostTileProps, "post" | "size">) {
  return (
    <span
      className={`ptile-title ${size === "sm" ? "heading-narrative" : "heading-component"}`}
    >
      {post.frontmatter.title}{" "}
      <span className="ptile-arrow" aria-hidden="true">
        <NorthEastIcon size={size === "sm" ? 16 : 20} />
      </span>
    </span>
  );
}

// One post as a tile: a quote tile on Home and wherever the post has no cover of its own, an art tile on the index when it
// has one (DESIGN.md → Writing Index → Post Tile). The whole tile is one link and its text is chrome.
export function PostTile({
  post,
  size,
  colour,
  coverStandIn,
  touch = false,
}: PostTileProps) {
  const { frontmatter: fm, slug } = post;
  // Only the index's tile draws a cover, so only it looks up the post's colour slot.
  const subject: CoverSubject | undefined =
    size !== "art"
      ? undefined
      : (coverStandIn ??
        (fm.cover
          ? { slug, colour: colour ?? postColour(slug), cover: fm.cover }
          : undefined));
  const hasArt = subject !== undefined;
  const ear = !fm.cover || fm.type === "note";
  const year = fm.publishedAt.slice(0, 4);

  return (
    <Link
      href={`/writing/${slug}`}
      className="ptile select-none"
      data-size={size}
      data-art={hasArt}
      data-ear={ear}
      data-touch={touch}
      data-post-group={POST_TYPE_GROUP[fm.type]}
    >
      {hasArt && subject ? (
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
              subject={subject}
              colour={colour ?? subject.colour}
              variant="tile"
            />
          </CoverLoop>
          {/* On a touch screen only the title shows, over the cover; it carries the cover's own mode, so its ink is the
              cover's. The head above stays in the page for assistive technology and is visually hidden there. */}
          <span
            aria-hidden="true"
            className="ptile-art-over"
            data-colour={colour ?? subject.colour}
            data-cover-light={subject.cover?.light ?? "marker"}
            data-cover-dark={subject.cover?.dark ?? "marker"}
          >
            <TileTitle post={post} size={size} />
          </span>
        </>
      ) : (
        <>
          <TileTitle post={post} size={size} />
          <span
            className={`ptile-quote ${size === "sm" ? "body-caption italic" : "body-secondary italic"}`}
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

// The tile grid: Home's small tiles (five, four, three, two or one across; two rows at most) or the index's (four, three or
// one across).
export function PostTiles({ posts, size }: PostTilesProps) {
  return (
    <div className="ptiles" data-size={size}>
      {posts.map((post) => (
        <PostTile key={post.slug} post={post} size={size} />
      ))}
    </div>
  );
}
