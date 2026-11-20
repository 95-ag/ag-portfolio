import Link from "next/link";
import { AUTHOR_NAME } from "@/lib/site";

// The site's name in the top-left corner of every page, level with the nav: its line box is centred on the nav's centre
// line — 38px from the top beside the button (860px and below), 46px beside the row. Absolute, so it scrolls away.
export function PageName() {
  return (
    <Link
      href="/"
      className="site-name absolute top-[calc(38px-0.5lh)] left-[var(--corner)] select-none whitespace-nowrap min-[861px]:top-[calc(46px-0.5lh)] motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)] hover:text-[var(--ink)]"
    >
      {AUTHOR_NAME}
    </Link>
  );
}
