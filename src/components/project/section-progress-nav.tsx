"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

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

export function SectionProgressNav() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });
  const prefersReduced = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
  }, []);

  // Custom scroll thumb: a short handle (so it reads as a scrollbar, not a near-full bar) that travels the
  // scroll position, proportional like a native scrollbar (thumb size = visible/total, so motion is
  // restrained). The native scrollbar is hidden; show=false when the list fits, so short TOCs (project
  // pages) render no indicator.
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

  // Keep the active item (and its neighbours) in view: centre it in the rail whenever the selection moves.
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

  return (
    <nav
      aria-label="Page sections"
      className="group fixed left-6 top-1/2 hidden max-h-[60vh] -translate-y-1/2 xl:block"
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
        className="flex max-h-[60vh] flex-col gap-[var(--spacing-md)] overflow-y-auto pl-[var(--spacing-md)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              className="support-meta max-w-[140px] shrink-0 truncate transition-colors duration-[var(--duration-fast)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
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
