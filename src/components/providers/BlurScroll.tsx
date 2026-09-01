"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Reference progressive bottom blur (modules 7197 + 24275):
 * - BlurScrollRoot renders a fixed `.blur-container` at the viewport bottom
 *   with 8 masked backdrop-filter layers (blur 0.078px → 10px), hidden by
 *   default, and shares its ref via context.
 * - BlurSection wraps a page section; a ScrollTrigger spanning
 *   "top bottom" → "bottom bottom" toggles the container's display, so the
 *   blur is visible only while a marked section intersects the viewport
 *   bottom (from the niche cards onward through the footer).
 */

const BlurContainerContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

function useBlurContainerRef() {
  const ref = useContext(BlurContainerContext);
  if (!ref) {
    throw new Error("BlurSection must be used within BlurScrollRoot");
  }
  return ref;
}

export function BlurScrollRoot({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <BlurContainerContext.Provider value={containerRef}>
      <div ref={containerRef} className="blur-container" aria-hidden>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`blur-layer blur-${i + 1}`} />
        ))}
      </div>
      {children}
    </BlurContainerContext.Provider>
  );
}

interface BlurSectionProps {
  children: ReactNode;
  className?: string;
}

export function BlurSection({ children, className }: BlurSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useBlurContainerRef();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom bottom",
        onEnter: () => gsap.set(container, { display: "block" }),
        onLeave: () => gsap.set(container, { display: "none" }),
        onEnterBack: () => gsap.set(container, { display: "block" }),
        onLeaveBack: () => gsap.set(container, { display: "none" }),
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [containerRef]);

  return (
    <div ref={sectionRef} className={cn("blur-section", className)}>
      {children}
    </div>
  );
}
