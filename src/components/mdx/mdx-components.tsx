import type { MDXComponents } from "mdx/types";
import { Stack } from "@/components/layout/stack";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { Diagram } from "@/components/mdx/diagram";
import { Figure } from "@/components/mdx/figure";
import { Highlight } from "@/components/mdx/highlight";

export const mdxComponents: MDXComponents = {
  Figure,
  Diagram,
  Callout,
  Highlight,
  Stack,
  pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
};
