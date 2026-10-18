"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, Flip } from "@/lib/gsap";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";

/* Real, live projects — each links to its case study on /work */
const RECENT_BUILDS = [
  { label: "Nexora", href: "/work#nexora" },
  { label: "Hirearn", href: "/work#hirearn" },
  { label: "Lumora Dental", href: "/work#lumora" },
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
              We build software &amp; AI that runs your business
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
                poster="/images/hero-poster.jpg"
                src="/videos/hero-section.mp4"
              />
            </div>
          </div>
        </div>

        {/* Side labels — btn-line-small, left/right 60px → 100px at 1600 */}
        <a
          href="#services"
          className="absolute left-[60px] top-1/2 hidden -translate-y-1/2 font-mono text-[14px] font-medium uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-muted-foreground xl:block min-[1600px]:left-[100px]"
        >
          [ <ScrambleText text="SERVICES" /> ]
        </a>
        <Link
          href="/work"
          onClick={() => window.scrollTo(0, 0)}
          className="absolute right-[60px] top-1/2 hidden -translate-y-1/2 font-mono text-[14px] font-medium uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-muted-foreground xl:block min-[1600px]:right-[100px]"
        >
          [ <ScrambleText text="WORKS" /> ]
        </Link>

        {/* Bottom dataline — what we do + recent builds (left), the two ways to
            start (right). Under the headline on small screens, pinned to the
            bottom of the stage from xl. */}
        <div
          className={cn(
            "relative z-[2] mt-[56px] flex w-full flex-col items-center gap-[28px] px-[30px] pb-[51px] text-center transition-all duration-[900ms] ease-out",
            "xl:absolute xl:inset-x-0 xl:bottom-0 xl:mt-0 xl:flex-row xl:items-end xl:justify-between xl:gap-[60px] xl:px-[60px] xl:pb-[35px] xl:text-left min-[1600px]:px-[100px]",
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <div className="flex max-w-[520px] flex-col gap-[14px]">
            <p className="font-mono text-[13px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-muted-foreground">
              Recent builds —{" "}
              {RECENT_BUILDS.map((b, i) => (
                <span key={b.href}>
                  {i > 0 && " · "}
                  <Link href={b.href} className="text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)]">
                    <ScrambleText text={b.label} triggerOn="hover" />
                  </Link>
                </span>
              ))}
            </p>
            <p className="font-sans text-[16px] font-medium leading-[1.5] text-[color:var(--body-text)] md:text-[17px]">
              A small, focused studio designing and building custom software, web apps and AI automation —
              you work directly with the people writing the code.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-[28px] gap-y-[16px]">
            <Link
              href="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[color:var(--ink)] px-7 py-3.5 font-sans text-[15px] font-semibold text-[color:var(--background)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--accent-blue)] hover:text-white"
            >
              Start a project
              <ArrowUpRightIcon className="h-[13px] w-[13px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[15px] font-semibold uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)]"
            >
              [ <ScrambleText text="WhatsApp us" triggerOn="hover" /> ]
            </a>
          </div>
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
