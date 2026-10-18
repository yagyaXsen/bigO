"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

/**
 * Reference `splitLines` (.mxd-split-lines): split into masked lines, then
 *   from { yPercent: 100, rotation: 1, duration: .5, stagger: { amount: .2 } }
 * with ScrollTrigger "top bottom" → "top 90%", toggleActions
 * "none play none reset" (replays when scrolled back above).
 * Above-the-fold headings use the CSS `.anim-load-rise` entrance instead.
 */
export function useSplitLines<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // SplitText is created OUTSIDE gsap.context so it isn't auto-reverted by
    // ctx.revert() — otherwise the explicit split.revert() below double-reverts
    // and throws "removeChild ... not a child" during React unmount/StrictMode.
    const split = new SplitText(el, {
      type: "lines",
      linesClass: "split-line",
      mask: "lines",
    });

    const ctx = gsap.context(() => {
      gsap.from(split!.lines, {
        yPercent: 100,
        rotation: 1,
        duration: 0.5,
        stagger: { amount: 0.2 },
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 90%",
          toggleActions: "none play none reset",
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return ref;
}
