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
  // The publication year, shown with the type as "Essay · 2026". A post page leaves it out: its rail carries the date.
  year?: string;
}

// The post's type and year as one sentence-case line, then its add-ons as "+ Free template" markers (DESIGN.md →
// Writing Tile → Type label). Colours come from the context: the group's ink on a tile (`data-post-group`), the page
// colour on a post page.
export function TypeLabel({ type, addons, year }: TypeLabelProps) {
  return (
    <span className="type-label body-caption">
      <span className="type-label-name">
        {TYPE_NAME[type]}
        {year && ` · ${year}`}
      </span>
      {addons?.map((addon) => (
        <span key={`${addon.price}-${addon.kind}`} className="type-label-addon">
          + {addon.price === "free" ? "Free" : "Paid"} {addon.kind}
        </span>
      ))}
    </span>
  );
}
