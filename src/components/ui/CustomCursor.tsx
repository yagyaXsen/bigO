"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor — reference `#mxd-cursor` (z-9999).
 *
 * A fixed follower that lerps to the pointer (gsap.quickTo, ~0.4s power1.out).
 * States, driven by what's under the pointer:
 *  - default → tiny inverting dot (mix-blend difference)
 *  - link    → 2rem inverting circle over links / buttons / `.btn-link`
 *  - text    → 10rem accent bubble with a mono label, for elements carrying
 *              `data-cursor-text` (or `.active-cursor-permanent`, reference name)
 *
 * Disabled on touch / coarse pointers and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const root = rootRef.current;
    const label = textRef.current;
    if (!root || !label) return;

    // Base 160px (10rem) element; scale maps it down for the dot / link states.
    const DOT = 0.05; // 8px
    const LINK = 0.2; // 32px (2rem)
    const TEXT = 1; // 160px (10rem)

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set(root, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    const xTo = gsap.quickTo(root, "x", { duration: 0.4, ease: "power1.out" });
    const yTo = gsap.quickTo(root, "y", { duration: 0.4, ease: "power1.out" });

    type Mode = "default" | "link" | "text";
    let mode: Mode = "default";
    let revealed = false;

    const apply = (next: Mode, text = "") => {
      if (next === mode && next !== "text") return;
      mode = next;
      if (next === "text") {
        label.textContent = text;
        gsap.set(root, { backgroundColor: "var(--accent-blue)", mixBlendMode: "normal" });
        gsap.to(root, { scale: TEXT, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(label, { opacity: 1, duration: 0.25, ease: "power1.out" });
      } else {
        gsap.set(root, { backgroundColor: "#ffffff", mixBlendMode: "difference" });
        gsap.to(root, {
          scale: next === "link" ? LINK : DOT,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(label, { opacity: 0, duration: 0.2, ease: "power1.in" });
      }
    };

    const resolve = (target: EventTarget | null): { m: Mode; t?: string } => {
      const el = target instanceof Element ? target : null;
      if (!el) return { m: "default" };
      const textEl = el.closest<HTMLElement>("[data-cursor-text], .active-cursor-permanent");
      if (textEl) return { m: "text", t: textEl.dataset.cursorText || "View" };
      if (el.closest("a, button, [role='button'], .btn-link, input, textarea, select, label")) {
        return { m: "link" };
      }
      return { m: "default" };
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!revealed) {
        revealed = true;
        gsap.to(root, { opacity: 1, scale: DOT, duration: 0.3, ease: "power1.out" });
      }
    };

    // pointerover fires when entering any new element (bubbles) — recompute state.
    const onOver = (e: PointerEvent) => {
      const { m, t } = resolve(e.target);
      apply(m, t);
    };

    const onLeave = () => {
      gsap.to(root, { opacity: 0, scale: 0, duration: 0.3, ease: "power1.in" });
      revealed = false;
    };
    const onEnter = () => {
      revealed = true;
      gsap.to(root, { opacity: 1, scale: mode === "text" ? TEXT : mode === "link" ? LINK : DOT, duration: 0.3, ease: "power1.out" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      gsap.killTweensOf(root);
      gsap.killTweensOf(label);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-40 w-40 items-center justify-center rounded-full will-change-transform min-[1025px]:flex"
      style={{ backgroundColor: "#ffffff", mixBlendMode: "difference" }}
    >
      <span
        ref={textRef}
        className="select-none px-2 text-center font-mono text-[14px] font-semibold uppercase leading-tight tracking-[0.02em] text-white opacity-0"
      />
    </div>
  );
}
