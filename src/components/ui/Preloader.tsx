"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "@/lib/gsap";
import { PRELOADER_KEY } from "@/lib/site";

export function Preloader() {
  const [isFinished, setIsFinished] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Already shown this session: the `data-preloaded` flag hides it via CSS.
    // The head script sets it on full page loads; this covers client-side
    // navigation after the first run.
    let seen = false;
    try {
      seen = sessionStorage.getItem(PRELOADER_KEY) === "true";
      sessionStorage.setItem(PRELOADER_KEY, "true");
    } catch {
      // Storage blocked — show the preloader every time
    }
    if (seen) {
      document.documentElement.dataset.preloaded = "true";
      return;
    }

    // Lock body scroll while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    type LenisWindow = { __lenis?: { stop: () => void; start: () => void; resize: () => void } };
    const win = typeof window !== "undefined" ? (window as unknown as LenisWindow) : null;
    if (win?.__lenis) {
      win.__lenis.stop();
    }

    const duration = 750; // ms for fast, responsive feel
    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = Math.min(1, 1 - Math.pow(1 - progress, 3)); // cubic ease out
      const currentCount = Math.floor(eased * 100);

      if (barRef.current) {
        barRef.current.style.width = `${currentCount}%`;
      }
      if (textRef.current) {
        textRef.current.textContent = String(currentCount)
          .padStart(3, "0")
          .split("")
          .join(" ");
      }

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setHidden(true);
            document.body.style.overflow = originalOverflow;
            if (win?.__lenis) {
              win.__lenis.start();
              win.__lenis.resize();
            }
            window.dispatchEvent(new Event("resize"));
            ScrollTrigger.refresh();
          }, 500);
        }, 50);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = originalOverflow;
      if (win?.__lenis) {
        win.__lenis.start();
        win.__lenis.resize();
      }
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={cn(
        "preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0d] text-white transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] will-change-transform",
        isFinished ? "-translate-y-full pointer-events-none" : "translate-y-0 pointer-events-auto"
      )}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* Brand Text — not a heading; the page's h1 lives in the hero */}
        <div className="font-sans text-[clamp(64px,10vw,130px)] font-bold text-white tracking-[-0.03em] leading-[1.1] pb-2 md:pb-4 select-none">
          bigO
        </div>

        {/* Thin Underline Progress Bar */}
        <div className="relative mt-4 md:mt-6 h-[2px] w-[260px] sm:w-[320px] md:w-[400px] overflow-hidden bg-white/20">
          <div
            ref={barRef}
            className="h-full bg-white will-change-[width]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Spaced Counter below line */}
        <div
          ref={textRef}
          className="mt-4 font-mono text-[14px] font-medium tracking-[0.4em] text-white/80 select-none"
        >
          0 0 0
        </div>
      </div>
    </div>
  );
}
