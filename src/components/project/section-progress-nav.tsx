"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Section {
  id: string;
  label: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function SectionProgressNav({
  demoSections,
}: {
  /** Gallery demo: render these sections instead of scraping the page's article, and show the rail
   *  ungated (at all widths) so it can be previewed live in a bounded frame like the other chrome. */
  demoSections?: Section[];
} = {}) {
  const isDemo = demoSections != null;
  const [sections, setSections] = useState<Section[]>(demoSections ?? []);
  const [activeId, setActiveId] = useState<string>(demoSections?.[0]?.id ?? "");
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });
  const prefersReduced = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDemo) return;
    const article = document.querySelector("article");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h2"));
    const parsed: Section[] = headings.map((h) => {
      const label = h.textContent ?? "";
      const id = slugify(label);
      if (!h.id) h.id = id;
      return { id, label };
    });

    setSections(parsed);
    if (parsed.length > 0) setActiveId(parsed[0].id);

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of parsed) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [isDemo]);

  // Custom scroll thumb, proportional like a native scrollbar (size = visible/total, so motion stays
  // restrained). Native scrollbar hidden; show=false when the list fits, so short TOCs show no indicator.
  const updateThumb = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight + 1) {
      setThumb({ top: 0, height: 0, show: false });
      return;
    }
    setThumb({
      height: (clientHeight / scrollHeight) * clientHeight,
      top: (scrollTop / scrollHeight) * clientHeight,
      show: true,
    });
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, [sections, updateThumb]);

  // Centre the active item in the rail whenever the selection moves.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const active = list.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;
    const lr = list.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    const target =
      list.scrollTop +
      (ar.top - lr.top) -
      list.clientHeight / 2 +
      ar.height / 2;
    list.scrollTo({
      top: target,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, [activeId, prefersReduced]);

  if (sections.length === 0) return null;

  // Shown at 2xl only: below that the left gutter is too narrow to clear the content column. The label
  // max-width is a 140px floor that grows with the gutter, so wide/ultrawide viewports show full labels
  // without truncation while the rail still clears the content column.
  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "group fixed left-6 top-1/2 -translate-y-1/2",
        // Demo: ungated + a fixed 200px cap (vs production 60vh) so the cap and hover indicator show in a frame.
        isDemo ? "block max-h-[200px]" : "hidden max-h-[60vh] 2xl:block",
      )}
      style={{ zIndex: "var(--z-sticky-content)" }}
    >
      {thumb.show && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 w-[2px] rounded-full bg-[var(--hairline-strong)] opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100"
          style={{ top: thumb.top, height: thumb.height }}
        />
      )}
      <div
        ref={listRef}
        onScroll={updateThumb}
        className={cn(
          "flex flex-col gap-[var(--spacing-md)] overflow-y-auto pl-[var(--spacing-md)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDemo ? "max-h-[200px]" : "max-h-[60vh]",
        )}
      >
        {sections.map(({ id, label }) => {
          const isActive = id === activeId;
          return (
            <a
              key={id}
              href={`#${id}`}
              data-active={isActive}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: prefersReduced ? "auto" : "smooth",
                  block: "start",
                });
              }}
              className="support-meta max-w-[max(140px,calc((100vw_-_1200px)/2_-_56px))] shrink-0 truncate transition-colors duration-[var(--duration-fast)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              style={{
                color: isActive ? "var(--ink)" : "var(--ink-muted)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
