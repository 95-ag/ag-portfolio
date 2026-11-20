import { z } from "zod";
import { IsoDate } from "@/lib/schemas/date";
import { CoverSchema } from "@/lib/schemas/project";

export const POST_MOTION = ["parallax", "reveal", "body-motion"] as const;

export const POST_TYPES = [
  "note",
  "guide",
  "explainer",
  "teardown",
  "field-report",
  "analysis-report",
  "deep-dive",
  "tips",
  "resource",
  "essay",
  "review",
  "roundup",
] as const;
export type PostType = (typeof POST_TYPES)[number];

export type PostGroup = "short" | "howto" | "long" | "critique";

// Membership: DESIGN.md → Foundations → Colors → Post Hues.
export const POST_TYPE_GROUP: Record<PostType, PostGroup> = {
  note: "short",
  tips: "short",
  guide: "howto",
  resource: "howto",
  roundup: "howto",
  explainer: "long",
  "deep-dive": "long",
  "analysis-report": "long",
  essay: "long",
  teardown: "critique",
  "field-report": "critique",
  review: "critique",
};

const AddonSchema = z.strictObject({
  kind: z.enum(["resource", "template", "guide"]),
  price: z.enum(["free", "paid"]),
});

export const PostFrontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    summary: z.string().min(1).max(200),
    publishedAt: IsoDate,
    type: z.enum(POST_TYPES),
    updatedAt: IsoDate.optional(),
    tags: z.array(z.string()).min(1).max(8),
    relatedProject: z.string().optional(),
    // The post's own cover, which makes its Writing-index tile an art tile — the same schema as a project's, never a copy.
    cover: CoverSchema.optional(),
    related: z.array(z.string()).optional(),
    ogImage: z.string().startsWith("/").optional(),
    metaDescription: z.string().max(160).optional(),
    // Labels only. A post with none omits the field, so an empty list is rejected.
    addons: z.array(AddonSchema).min(1).optional(),
    // An ordinary post omits the field, so an empty list is rejected rather than read as
    // "no escalation"; an unknown value fails so a typo cannot silently disable an effect.
    motion: z.array(z.enum(POST_MOTION)).min(1).optional(),
  })
  .refine((data) => !data.updatedAt || data.updatedAt >= data.publishedAt, {
    message: "updatedAt cannot be earlier than publishedAt",
    path: ["updatedAt"],
  });

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
