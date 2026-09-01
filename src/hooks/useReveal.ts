"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  /** CSS selector for children to stagger; if omitted the element itself animates */
  childSelector?: string;
}

/**
 * Fade-up reveal on scroll into view. Attach the returned ref to a container.
 * Respects prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    duration = 0.9,
    stagger = 0.08,
    start = "top 85%",
    childSelector,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = childSelector
      ? Array.from(el.querySelectorAll(childSelector))
      : [el];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [y, duration, stagger, start, childSelector]);

  return ref;
}
