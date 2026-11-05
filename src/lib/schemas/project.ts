import { z } from "zod";
import { IsoDate } from "@/lib/schemas/date";

const StackSchema = z.strictObject({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  libraries: z.array(z.string()),
  tools: z.array(z.string()),
});

const OverviewSchema = z.strictObject({
  problem: z.string().min(1),
  built: z.string().min(1),
  results: z.array(z.string()).optional(),
  transferableSkills: z.array(z.string()).min(1).optional(),
  learnings: z.array(z.string()).min(1).optional(),
});

const LinksSchema = z
  .strictObject({
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    paper: z.string().optional(),
    report: z.string().optional(),
    presentation: z.string().optional(),
  })
  .optional();

const LogoSchema = z.strictObject({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1).optional(),
  url: z.string().url().optional(),
});

const ContributorSchema = z.strictObject({
  name: z.string().min(1),
  avatar: z.string().startsWith("/"),
  role: z.string().min(1).optional(),
  url: z.string().url().optional(),
});

const VIDEO_EXTENSIONS = [".mp4", ".webm"];
export const isVideo = (path: string) =>
  VIDEO_EXTENSIONS.some((ext) => path.toLowerCase().endsWith(ext));

export const ProjectFrontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    summary: z.string().min(1).max(200),
    projectType: z.enum(["academic", "freelance", "personal"]),
    publishedAt: IsoDate,
    // When the page last changed, for crawlers only — publishedAt is the project's own date.
    updatedAt: IsoDate.optional(),
    order: z.number(),
    // Hero is satisfied by EITHER a registered live cover component (preferred) OR a
    // static heroImage (image or video). Optional: heroless builds pass in dev/preview
    // (empty hero until the cover stage); the production build (VERCEL_ENV=production)
    // fails if a project has neither a live cover nor a heroImage — see getAllProjects.
    heroImage: z.string().startsWith("/").optional(),
    // Optional for the same reason heroImage is: a project in the content stage has no
    // cover yet, so there is nothing to describe. The production gate in
    // content/projects.ts requires it where a heroImage is set and no live cover is registered.
    heroAlt: z.string().min(1).optional(),
    heroPoster: z.string().startsWith("/").optional(),
    heroVideoLoop: z.boolean().optional().default(true),
    tags: z.array(z.string()).min(1).max(8),
    stack: StackSchema,
    overview: OverviewSchema,
    links: LinksSchema,
    featured: z.boolean().optional().default(false),
    logos: z.array(LogoSchema).optional(),
    contributors: z.array(ContributorSchema).optional(),
    ogImage: z.string().startsWith("/").optional(),
    metaDescription: z.string().max(160).optional(),
    related: z.array(z.string()).optional(),
  })
  .refine(
    (data) => !data.heroImage || !isVideo(data.heroImage) || !!data.heroPoster,
    {
      message: "heroPoster is required when heroImage is a video",
      path: ["heroPoster"],
    },
  )
  .refine((data) => !data.updatedAt || data.updatedAt >= data.publishedAt, {
    message: "updatedAt cannot be earlier than publishedAt",
    path: ["updatedAt"],
  });

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
