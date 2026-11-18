import { TypeLabelFit } from "@/components/writing/type-label-fit";
import type { PostFrontmatter, PostType } from "@/lib/schemas/post";
import "@/components/writing/writing.css";

const TYPE_NAME: Record<PostType, string> = {
  note: "Note",
  guide: "Guide",
  explainer: "Explainer",
  teardown: "Teardown",
  "field-report": "Field Report",
  "analysis-report": "Analysis Report",
  "deep-dive": "Deep Dive",
  tips: "Tips & Tricks",
  resource: "Resource",
  essay: "Essay",
  review: "Review",
  roundup: "Roundup",
};

interface TypeLabelProps {
  type: PostType;
  addons: PostFrontmatter["addons"];
  // The publication year, shown with the type as "Essay · 2026". A post page leaves it out: its rail carries the date.
  year?: string;
  // The Writing Index sets the line larger than the other surfaces.
  large?: boolean;
}

const title = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

// The post's type, its add-ons as "+ Free Template" markers, then its year, in Title Case (DESIGN.md → Post Tile →
// Type label). Colours come from the context: the group's ink on a tile (`data-post-group`), the page colour on a post
// page.
export function TypeLabel({ type, addons, year, large }: TypeLabelProps) {
  const size = large ? "body-secondary" : "body-caption";
  if (!addons?.length) {
    return (
      <span className={`type-label ${size}`}>
        <span className="type-label-name">
          {TYPE_NAME[type]}
          {year && ` · ${year}`}
        </span>
      </span>
    );
  }
  return (
    <TypeLabelFit
      name={TYPE_NAME[type]}
      addons={addons.map(
        (addon) => `+ ${title(addon.price)} ${title(addon.kind)}`,
      )}
      year={year}
      className={size}
    />
  );
}
