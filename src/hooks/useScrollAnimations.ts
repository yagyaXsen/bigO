"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * Reference `animate-card-N` batch reveal:
 *   gsap.set(cards, { y: 50, opacity: 0 })
 *   ScrollTrigger.batch(cards, { interval: .1, batchMax: N,
 *     onEnter: sine, stagger .15, onLeaveBack: reset })
 * N = grid column count (3 for project/blog cards, 2 for niche cards).
 */
export function useCardBatch<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  columns = 3
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(el.querySelectorAll(childSelector));
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { y: 50, opacity: 0 });
      ScrollTrigger.batch(cards, {
        interval: 0.1,
        batchMax: columns,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            ease: "sine",
            stagger: { each: 0.15, grid: [1, columns] },
            overwrite: true,
          }),
        onLeaveBack: (batch) => gsap.set(batch, { y: 50, opacity: 0 }),
      });
    }, el);

    return () => ctx.revert();
  }, [childSelector, columns]);

  return ref;
}

/**
 * Reference `anim-uni-in-up`: from { opacity: 0, y: 50, ease: "sine" }
 * on scroll into view. Used for section numbers, buttons, small blocks.
 */
export function useInUp<T extends HTMLElement = HTMLDivElement>(
  childSelector?: string
) {
  const ref = useRef<T>(null);

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
        y: 50,
        ease: "sine",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    }, el);

    return () => ctx.revert();
  }, [childSelector]);

  return ref;
}

/**
 * Reference `anim-uni-slide-down` (tech-stack names): the inner
 * content slides down from behind its top divider —
 *   fromTo { yPercent: -100 } → { yPercent: 0 } with ScrollTrigger
 *   "top 90%" → "bottom 70%", toggleActions play/reverse (no scrub).
 * Attach to the container; each `itemSelector` needs an overflow-hidden
 * wrapper around `innerSelector`.
 */
export function useSlideDownLine<T extends HTMLElement = HTMLDivElement>(
  itemSelector: string,
  innerSelector: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.querySelectorAll(itemSelector));
    if (!items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const inner = item.querySelector(innerSelector);
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: -100 },
          {
            yPercent: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [itemSelector, innerSelector]);

  return ref;
}

/**
 * Reference `anim-uni-clip-in` (tech-stack divider lines): each divider
 * wipes in from the left —
 *   fromTo { clipPath: inset(0% 100% 0% 0%) } → { inset(0% 0% 0% 0%) }
 *   with ScrollTrigger "top 90%" → "bottom 70%", toggleActions play/reverse.
 */
export function useClipIn<T extends HTMLElement = HTMLDivElement>(
  targetSelector: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(el.querySelectorAll(targetSelector));
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      targets.forEach((target) => {
        gsap.fromTo(
          target,
          { clipPath: "inset(0% 100% 0% 0%)", ease: "custom" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scrollTrigger: {
              trigger: target,
              start: "top 90%",
              end: "bottom 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [targetSelector]);

  return ref;
}

/**
 * Reference stats-lines reveal: each stat's inner content slides down from
 * behind its top divider line, scrubbed —
 *   fromTo(inner, { yPercent: -100 }, { yPercent: 0,
 *     scrollTrigger: { start: "top bottom", end: "bottom 60%", scrub: true } })
 * Wrap each stat: outer `statSelector` (has the border, overflow hidden via
 * the tween container), inner `innerSelector` is what slides.
 */
export function useStatsLines<T extends HTMLElement = HTMLDivElement>(
  statSelector: string,
  innerSelector: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stats = Array.from(el.querySelectorAll(statSelector));
    if (!stats.length) return;

    const ctx = gsap.context(() => {
      stats.forEach((stat) => {
        const inner = stat.querySelector(innerSelector);
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: -100 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: stat,
              start: "top bottom",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [statSelector, innerSelector]);

  return ref;
}

/**
 * Reference `mxd-perspective-list` (capabilities rows): as each item scrolls
 * past the viewport top its inner tilts back in 3D and fades out —
 *   set(inner, { rotateX: 0, opacity: 1, blur 0 })
 *   to(inner, { rotateX: 30, opacity: .3, blur 4px, ease "none",
 *     scrollTrigger: { trigger: item, start "5% top", end "bottom 40%", scrub .6 } })
 * Item needs perspective:1000px; inner needs transform-origin:bottom.
 */
export function usePerspectiveList<T extends HTMLElement = HTMLDivElement>(
  itemSelector: string,
  innerSelector: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.querySelectorAll(itemSelector));
    if (!items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const inner = item.querySelector(innerSelector);
        if (!inner) return;
        gsap.set(inner, { rotateX: 0, opacity: 1, filter: "blur(0px)" });
        gsap.to(inner, {
          rotateX: 30,
          opacity: 0.3,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "5% top",
            end: "bottom 40%",
            scrub: 0.6,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [itemSelector, innerSelector]);

  return ref;
}

/**
 * Reference `revealType` (.reveal-type — divider H2s): SplitText chars with
 * a scrubbed blur-in —
 *   fromTo(chars, { opacity: 0, filter: blur(10px), xPercent: 12 },
 *     { opacity: 1, blur 0, xPercent: 0, stagger .03, ease "none",
 *       scrollTrigger: "top bottom" → "top 60%", scrub 1.4 })
 */
export function useRevealType<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Created OUTSIDE gsap.context so ctx.revert() doesn't also revert it (the
    // explicit split.revert() below would then double-revert and throw
    // "removeChild ... not a child" on React unmount / StrictMode remount).
    const split = new SplitText(el, { type: "chars,words" });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        split!.chars,
        { opacity: 0, filter: "blur(10px)", xPercent: 12 },
        {
          opacity: 1,
          filter: "blur(0px)",
          xPercent: 0,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 60%",
            scrub: 1.4,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return ref;
}
