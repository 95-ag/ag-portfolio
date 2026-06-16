import { z } from "zod";

const SocialSchema = z.record(z.string(), z.string().url());

const ApproachItemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const CapabilitySchema = z.object({
  area: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()),
});

export const AboutFrontmatterSchema = z.object({
  name: z.string().min(1),
  positioning: z.string().min(1),
  detailedPositioning: z.string().min(1),
  headshot: z.string().startsWith("/"),
  headshotAlt: z.string().min(1),
  socials: SocialSchema.refine((val) => Object.keys(val).length >= 1, {
    message: "At least one social link required",
  }),
  contactEmail: z.string().email(),
  capabilities: z.array(CapabilitySchema).min(2),
  approach: z.array(ApproachItemSchema).min(1),
});

export type AboutFrontmatter = z.infer<typeof AboutFrontmatterSchema>;
