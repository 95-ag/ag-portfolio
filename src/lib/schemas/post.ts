import { z } from "zod";
import { IsoDate } from "@/lib/schemas/date";

export const POST_MOTION = ["parallax", "reveal", "body-motion"] as const;

export const PostFrontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    summary: z.string().min(1).max(200),
    publishedAt: IsoDate,
    updatedAt: IsoDate.optional(),
    tags: z.array(z.string()).min(1).max(8),
    relatedProject: z.string().optional(),
    related: z.array(z.string()).optional(),
    ogImage: z.string().startsWith("/").optional(),
    metaDescription: z.string().max(160).optional(),
    // An ordinary post omits the field, so an empty list is rejected rather than read as
    // "no escalation"; an unknown value fails so a typo cannot silently disable an effect.
    motion: z.array(z.enum(POST_MOTION)).min(1).optional(),
  })
  .refine((data) => !data.updatedAt || data.updatedAt >= data.publishedAt, {
    message: "updatedAt cannot be earlier than publishedAt",
    path: ["updatedAt"],
  });

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
