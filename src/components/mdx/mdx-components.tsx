import type { MDXComponents } from "mdx/types";
import { Stack } from "@/components/layout/stack";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { Diagram } from "@/components/mdx/diagram";
import { DiagramPanel, DiagramRow } from "@/components/mdx/diagram-row";
import { Figure } from "@/components/mdx/figure";
import { Highlight } from "@/components/mdx/highlight";

export const mdxComponents: MDXComponents = {
  Figure,
  Diagram,
  DiagramRow,
  DiagramPanel,
  Callout,
  Highlight,
  Stack,
  pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
  table: ({ children, ...props }) => (
    <div className="my-[var(--spacing-xl)] overflow-x-auto">
      <table className="mx-auto max-w-fit border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
};
