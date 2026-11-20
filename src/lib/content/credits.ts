// The credits page's content (SCHEMA.md → Credits data): typed text, not MDX. A row without a `role` shows its name alone,
// centred. Rows are authored, never derived.
export interface CreditRow {
  role?: string;
  name: string;
  href?: string;
}

export interface CreditSection {
  heading: string;
  rows: CreditRow[];
}

export interface Credits {
  opening: string;
  sections: CreditSection[];
  dedication: string;
}

export const CREDITS: Credits = {
  opening: "Made by watching how others make things.",
  sections: [
    {
      heading: "Cast",
      rows: [
        { role: "Design & content", name: "Aishwarya Ganesan" },
        { role: "Lead development", name: "Claude" },
        { role: "Development assistance", name: "ChatGPT" },
        { role: "Application framework", name: "Next.js 16" },
        { role: "Interface library", name: "React / React DOM" },
        {
          role: "Content",
          name: "MDX, next-mdx-remote, remark-gfm, yaml",
        },
        { role: "Styling", name: "Tailwind CSS v4" },
        { role: "Language & runtime", name: "TypeScript / Node.js" },
      ],
    },
    {
      heading: "Infrastructure",
      rows: [
        { role: "Hosting & deployment", name: "Vercel" },
        {
          role: "Analytics",
          name: "Vercel Web Analytics & Speed Insights",
        },
      ],
    },
    {
      heading: "Typography",
      rows: [
        { role: "Headings", name: "Manrope" },
        { role: "Body copy", name: "Inter" },
        { role: "Utility text", name: "JetBrains Mono" },
        { role: "Annotations", name: "Caveat" },
      ],
    },
    {
      heading: "Interface & motion",
      rows: [
        { role: "Icons", name: "Material Symbols Outlined" },
        { role: "Brand marks", name: "GitHub, LinkedIn" },
        { role: "Motion", name: "Framer Motion" },
        { role: "Theme switching", name: "next-themes" },
        { role: "Components", name: "Custom built" },
      ],
    },
    {
      heading: "Content & media",
      rows: [
        { role: "Code highlighting", name: "Shiki" },
        { role: "Validation", name: "Zod" },
        {
          role: "Charts & asset generation",
          name: "Python, matplotlib, Pillow, PyMuPDF, pypdf",
        },
        { role: "Notes feed format", name: "RSS 2.0" },
      ],
    },
    {
      heading: "Production crew",
      rows: [
        { role: "CSS processing", name: "PostCSS & @tailwindcss/postcss" },
        { role: "Lint & format", name: "Biome" },
        { role: "Browser testing", name: "Playwright" },
        { role: "Version control", name: "Git" },
        { role: "Source hosting", name: "GitHub" },
        { role: "Package management", name: "npm" },
        { role: "Type definitions", name: "DefinitelyTyped" },
      ],
    },
    {
      // Names only, plain text: never what was taken from each, never a link.
      heading: "Inspired by their websites",
      rows: [
        { name: "Gabriel Valdivia" },
        { name: "Isabelle Louie" },
        { name: "Daniela Muntyan" },
        { name: "Spencer Gabor" },
        { name: "Mike Smith" },
        { name: "Gabe Amaya" },
        { name: "Odding Wang" },
      ],
    },
  ],
  dedication:
    "For Vicky, who made Claude possible, and Kichu, who stayed for every 'how's this?'",
};
