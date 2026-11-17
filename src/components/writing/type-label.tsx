import type { PostFrontmatter, PostType } from "@/lib/schemas/post";
import "@/components/writing/writing.css";

const TYPE_NAME: Record<PostType, string> = {
  note: "Note",
  guide: "Guide",
  explainer: "Explainer",
  teardown: "Teardown",
  "field-report": "Field report",
  "analysis-report": "Analysis report",
  "deep-dive": "Deep dive",
  tips: "Tips & tricks",
  resource: "Resource",
  essay: "Essay",
  review: "Review",
  roundup: "Roundup",
};

interface TypeLabelProps {
  type: PostType;
  addons: PostFrontmatter["addons"];
}

// The post's type, then its add-ons as "+ Free template" markers (DESIGN.md → Writing Tile → Type label). Colours come
// from the context: the group's ink on a tile (`data-post-group`), the page colour on a post page.
export function TypeLabel({ type, addons }: TypeLabelProps) {
  return (
    <span className="type-label tag-label">
      <span className="type-label-name">{TYPE_NAME[type]}</span>
      {addons?.map((addon) => (
        <span key={`${addon.price}-${addon.kind}`} className="type-label-addon">
          + {addon.price === "free" ? "Free" : "Paid"} {addon.kind}
        </span>
      ))}
    </span>
  );
}
