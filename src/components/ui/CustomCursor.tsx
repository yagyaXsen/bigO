"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor — reference `#mxd-cursor` (z-9999).
 *
 * A fixed follower eased toward the pointer on the GSAP ticker (tight for the
 * dot, looser for the label bubble); it snaps in place when it first appears.
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

    type Mode = "default" | "link" | "text";
    let mode: Mode = "default";
    let revealed = false;

    /* Follow the pointer with frame-rate independent exponential smoothing:
       each second the gap shrinks by e^-FOLLOW. The dot and link ring stay
       tight on the real (hidden) pointer; the big label bubble trails a bit. */
    const FOLLOW: Record<Mode, number> = { default: 26, link: 22, text: 12 };
    const setX = gsap.quickSetter(root, "x", "px");
    const setY = gsap.quickSetter(root, "y", "px");
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const follow = (_time: number, deltaMs: number) => {
      const dx = targetX - x;
      const dy = targetY - y;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return; // settled — no work
      const k = 1 - Math.exp((-FOLLOW[mode] * deltaMs) / 1000);
      x += dx * k;
      y += dy * k;
      setX(x);
      setY(y);
    };
    gsap.ticker.add(follow);

    const scaleFor = (m: Mode) => (m === "text" ? TEXT : m === "link" ? LINK : DOT);

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
      targetX = e.clientX;
      targetY = e.clientY;
      if (!revealed) {
        // Appear right under the pointer instead of gliding in from the old spot
        revealed = true;
        x = targetX;
        y = targetY;
        setX(x);
        setY(y);
        gsap.to(root, { opacity: 1, scale: scaleFor(mode), duration: 0.3, ease: "power1.out", overwrite: "auto" });
      }
    };

    // pointerover fires when entering any new element (bubbles) — recompute state.
    const onOver = (e: PointerEvent) => {
      const { m, t } = resolve(e.target);
      apply(m, t);
    };

    // Hide when the pointer leaves the window; the next move snaps it back in place
    const onLeave = () => {
      gsap.to(root, { opacity: 0, scale: 0, duration: 0.3, ease: "power1.in", overwrite: "auto" });
      revealed = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.ticker.remove(follow);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
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
