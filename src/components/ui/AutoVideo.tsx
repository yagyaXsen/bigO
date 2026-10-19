"use client";

import { useEffect, useRef } from "react";

/** Muted screen recording that plays only while on screen (saves data and
 *  CPU) and stays on its poster for people who prefer reduced motion. */
export function AutoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover object-top"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
