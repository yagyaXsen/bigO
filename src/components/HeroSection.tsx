"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, Flip } from "@/lib/gsap";
import { ArrowDownIcon } from "@/components/icons";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "WhatsApp", href: "https://wa.me/918875326549" },
  { label: "GitHub", href: "#" },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  // Reference splitLinesLoad: masked lines from yPercent 100 on page load
  const h1Ref = useSplitLines<HTMLHeadingElement>({ onLoad: true });

  const mediaRef = useRef<HTMLDivElement>(null);
  const smallWrapRef = useRef<HTMLDivElement>(null);
  const largeWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Reference hero Flip: ONE video (.mxd-hero-media__scaling-media) starts in
     the small centered wrapper and Flip.fit()s into the large full-width
     wrapper, scrubbed between "small bottom center-=100" → "large top center".
     Scrub smoothing slightly above the decoded .55 for a softer feel.
     Rebuilt on resize/fonts-ready. */
  useEffect(() => {
    const media = mediaRef.current;
    const small = smallWrapRef.current;
    const large = largeWrapRef.current;
    if (!media || !small || !large) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tl: gsap.core.Timeline | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const build = () => {
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(media, { clearProps: "all" });
      }
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: small,
          start: "bottom center-=100",
          endTrigger: large,
          end: "top center",
          scrub: 0.9,
        },
      });
      tl.add(Flip.fit(media, large, { duration: 1, ease: "none" }) as gsap.core.Tween);
      ScrollTrigger.refresh();
    };

    const rebuild = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 100);
    };

    build();
    if ("fonts" in document) {
      document.fonts.ready.then(build);
    }
    window.addEventListener("resize", rebuild);

    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
      gsap.set(media, { clearProps: "all" });
      window.removeEventListener("resize", rebuild);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className="mxd-hero relative w-full">
      {/* Headline stage */}
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        {/* Headline block — reference .mxd-hero-03__headline (max-w 1300px);
            the small media is sized against THIS block, not the viewport */}
        <div className="relative flex w-full flex-col items-center justify-center px-[30px] text-center xl:max-w-[1300px] xl:px-0">
          {/* H1 — white text with difference blend over the video + page bg */}
          <div className="relative z-[2] mix-blend-difference">
            <h1
              ref={h1Ref}
              className="text-center font-sans font-semibold leading-[1.1] tracking-[-0.032em] text-white text-[50px] md:text-[75px] xl:text-[95px] min-[1600px]:text-[120px]"
            >
              Innovative software development company
            </h1>
          </div>

          {/* Small hero media wrapper — the scaling video starts here.
              Reference: 60% / aspect 3:4 → md 50% / 16:9 of the headline block */}
          <div
            ref={smallWrapRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] aspect-[3/4] w-[60%] -translate-x-1/2 -translate-y-1/2 md:aspect-video md:w-1/2"
          >
            <div
              ref={mediaRef}
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden will-change-transform [isolation:isolate]"
            >
              <video
                className="absolute h-full w-full object-cover scale-[1.05]"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                src="/videos/hero-section.mp4"
              />
            </div>
          </div>
        </div>

        {/* Side labels — btn-line-small, left/right 60px → 100px at 1600 */}
        <a
          href="#"
          className="absolute left-[60px] top-1/2 hidden -translate-y-1/2 font-mono text-[14px] font-medium uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-muted-foreground xl:block min-[1600px]:left-[100px]"
        >
          [ <ScrambleText text="STUDIO" /> ]
        </a>
        <a
          href="#"
          className="absolute right-[60px] top-1/2 hidden -translate-y-1/2 font-mono text-[14px] font-medium uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-muted-foreground xl:block min-[1600px]:right-[100px]"
        >
          [ <ScrambleText text="WORKS" /> ]
        </a>

        {/* Bottom dataline — pb 51px → 35px at xl; px 30px → 70px at 1600 */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-[2] flex flex-col items-center gap-[22px] px-[30px] pb-[51px] text-center transition-all duration-[900ms] ease-out xl:flex-row xl:items-center xl:justify-between xl:pb-[35px] xl:text-left min-[1600px]:px-[70px]",
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <ul className="flex min-w-0 flex-wrap items-center justify-center gap-x-6 gap-y-1 xl:justify-start xl:gap-x-[34px]">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label} className="shrink-0">
                <a
                  href={link.href}
                  className="block overflow-hidden font-mono text-[14px] font-semibold uppercase leading-[1.6] text-[color:var(--body-text)] transition-colors hover:text-[color:var(--ink)]"
                >
                  <ScrambleText text={link.label} triggerOn="hover" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#about"
            className="flex shrink-0 items-center gap-[12px] text-[color:var(--ink)] transition-opacity hover:opacity-70"
          >
            <span className="hidden whitespace-nowrap font-mono text-[18px] font-bold uppercase tracking-[-0.5px] md:inline">
              <ScrambleText text="Scroll to explore" />
            </span>
            <ArrowDownIcon className="h-[18px] w-[18px]" aria-hidden />
          </a>
        </div>
      </div>

      {/* Large media wrapper — Flip target; placeholder keeps the space */}
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div ref={largeWrapRef} className="relative aspect-[3/4] w-full md:aspect-video">
          <div className="h-full w-full bg-[#afafaf] opacity-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
