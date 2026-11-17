"use client";

import { useEffect, useRef, useState } from "react";
import "@/components/writing/writing.css";

interface TypeLabelFitProps {
  name: string;
  addons: string[];
  year?: string;
  className: string;
}

// "Essay + Free Template · 2026" on one line; when that would wrap, the add-ons take a line above "Essay · 2026".
// A hidden copy of the one-line form is measured, so the visible one never flickers between the two.
export function TypeLabelFit({
  name,
  addons,
  year,
  className,
}: TypeLabelFitProps) {
  const probe = useRef<HTMLSpanElement>(null);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const el = probe.current;
    if (!el) return;
    const measure = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight);
      setStacked(el.getBoundingClientRect().height > lineHeight * 1.5);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const addonMarkers = addons.map((addon) => (
    <span key={addon} className="type-label-addon">
      {addon}
    </span>
  ));
  const yearMarker = year && <span className="type-label-name">· {year}</span>;

  return (
    <span className={`type-label type-label-fit ${className}`}>
      <span
        ref={probe}
        className="type-label-line type-label-probe"
        aria-hidden="true"
      >
        <span className="type-label-name">{name}</span>
        {addonMarkers}
        {yearMarker}
      </span>
      {stacked ? (
        <>
          <span className="type-label-line">{addonMarkers}</span>
          <span className="type-label-name">
            {name}
            {year && ` · ${year}`}
          </span>
        </>
      ) : (
        <span className="type-label-line">
          <span className="type-label-name">{name}</span>
          {addonMarkers}
          {yearMarker}
        </span>
      )}
    </span>
  );
}
