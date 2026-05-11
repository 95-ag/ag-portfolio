import { z } from "zod";

const SocialSchema = z.record(z.string(), z.string().url());

const ApproachItemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const CapabilitySchema = z.object({
  area: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
});

const ExperienceImageSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
});

const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  timeframe: z.string().min(1),
  achievements: z.array(z.string()).min(1),
  image: ExperienceImageSchema.optional(),
});

const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  specialization: z.string().optional(),
  timeframe: z.string().min(1),
});

export const AboutFrontmatterSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  positioning: z.string().min(1),
  headshot: z.string().startsWith("/"),
  headshotAlt: z.string().min(1),
  socials: SocialSchema.refine((val) => Object.keys(val).length >= 1, {
    message: "At least one social link required",
  }),
  contactEmail: z.string().email(),
  approach: z.array(ApproachItemSchema).min(1),
  capabilities: z.array(CapabilitySchema).min(2),
  experience: z.array(ExperienceSchema).min(1),
  education: z.array(EducationSchema).min(1),
});

export type AboutFrontmatter = z.infer<typeof AboutFrontmatterSchema>;
