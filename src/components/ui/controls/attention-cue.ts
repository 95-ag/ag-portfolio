import { type RefObject, useEffect } from "react";

// The attention cue plays once per page view, when its element is 60% in view (DESIGN.md → Interaction Rules →
// Attention Cue). The element gets `data-cue-played`; the animation itself lives in button.css and is absent under
// reduced motion, so nothing is observed there.
export function useAttentionCue(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const element = ref.current;
    if (
      !enabled ||
      !element ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.setAttribute("data-cue-played", "");
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled]);
}
