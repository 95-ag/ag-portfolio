"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const prefersReduced = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-6 top-1/2 hidden -translate-y-1/2 xl:flex xl:flex-col xl:gap-[var(--spacing-md)]"
      style={{ zIndex: "var(--z-sticky-content)" }}
    >
      {sections.map(({ id, label }) => {
        const isActive = id === activeId;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({
                behavior: prefersReduced ? "auto" : "smooth",
                block: "start",
              });
            }}
            className="support-meta max-w-[140px] truncate transition-colors duration-[var(--duration-fast)]"
            style={{
              color: isActive ? "var(--on-surface)" : "var(--on-surface-muted)",
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
