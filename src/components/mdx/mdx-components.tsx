import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { Clip } from "@/components/mdx/clip";
import { CodeBlock } from "@/components/mdx/code-block";
import { Diagram } from "@/components/mdx/diagram";
import { DiagramPanel, DiagramRow } from "@/components/mdx/diagram-row";
import { Figure } from "@/components/mdx/figure";
import { Highlight } from "@/components/mdx/highlight";
import { SideBySide } from "@/components/mdx/side-by-side";

export const mdxComponents: MDXComponents = {
  Figure,
  Clip,
  Diagram,
  DiagramRow,
  DiagramPanel,
  Callout,
  Highlight,
  SideBySide,
  pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
  table: ({ children, ...props }) => (
    <div className="my-[var(--spacing-xl)] overflow-x-auto">
      <table className="mx-auto max-w-fit border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
};
