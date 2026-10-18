"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRightIcon } from "@/components/icons";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { PROJECTS } from "@/lib/projects";

/* Real, live projects — each links to its case study on /work */
const RECENT_BUILDS = [
  { label: "Nexora", href: "/work#nexora" },
  { label: "Hirearn", href: "/work#hirearn" },
  { label: "Lumora Dental", href: "/work#lumora" },
];

/* hero-reel.mp4 is Nexora's loop crossfading into Lumora Dental's and back
   (20s). Segment times pick the project shown in the browser bar. */
const REEL = [
  { id: "nexora", from: 0, to: 11.1 },
  { id: "lumora", from: 11.1, to: 19.7 },
].map((s) => ({ ...s, project: PROJECTS.find((p) => p.id === s.id)! }));

const segmentAt = (t: number) => REEL.find((s) => t >= s.from && t < s.to) ?? REEL[0];

/* Browser bar height — the stage reserves it under the 16:10 video */
const BAR = 44;

export function HeroSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [segment, setSegment] = useState(REEL[0]);

  /* The reel starts as a centred frame under the text and widens to the full
     page width while the page scrolls from the top until the stage reaches
     the top of the screen — the theme's hero media growth, without moving
     anything else on the page (the frame is absolute inside its stage). */
  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!stage || !frame || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const small = () => Math.min(1120, stage.clientWidth - (window.innerWidth >= 768 ? 120 : 60));
    // Page offset from layout (offsetTop), not getBoundingClientRect: the
    // stage's load-in transform would skew a measurement taken mid-animation
    const stageTop = () => {
      let y = 0;
      for (let el: HTMLElement | null = stage; el; el = el.offsetParent as HTMLElement | null) y += el.offsetTop;
      return y;
    };
    const tween = gsap.fromTo(
      frame,
      { width: small },
      {
        width: () => stage.clientWidth,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: stageTop,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      },
    );
    const fontsReady = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(fontsReady);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(frame, { clearProps: "width" });
    };
  }, []);

  const onTime = () => {
    const next = segmentAt(videoRef.current?.currentTime ?? 0);
    if (next.id !== segment.id) setSegment(next);
  };

  return (
    <section className="mxd-hero relative w-full">
      {/* Text — eyebrow, headline, subline, the two ways to start, proof */}
      <div className="relative px-[30px] pt-[130px] text-center md:pt-[170px] xl:pt-[min(170px,17vh)]">
        <p className="anim-load-rise mxd-eyebrow">Software · AI · Web</p>

        <div className="relative">
          <h1 className="anim-load-rise mx-auto mt-[22px] max-w-[1300px] text-balance font-sans text-[44px] font-semibold leading-[1.05] tracking-[-0.035em] text-[color:var(--ink)] [--rise-delay:.05s] md:text-[72px] xl:text-[min(95px,10.5vh)]">
            We build software &amp; AI that runs your business
          </h1>

          {/* Side labels — btn-line-small at the headline's height, only from
              1536px: on narrower laptops the headline reaches into them */}
          <Link
            href="/services"
            onClick={() => window.scrollTo(0, 0)}
            className="absolute left-[30px] top-1/2 hidden -translate-y-1/2 font-mono text-[14px] font-medium uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-muted-foreground min-[1536px]:block min-[1600px]:left-[70px]"
          >
            [ <ScrambleText text="SERVICES" /> ]
          </Link>
          <Link
            href="/work"
            onClick={() => window.scrollTo(0, 0)}
            className="absolute right-[30px] top-1/2 hidden -translate-y-1/2 font-mono text-[14px] font-medium uppercase tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-muted-foreground min-[1536px]:block min-[1600px]:right-[70px]"
          >
            [ <ScrambleText text="WORKS" /> ]
          </Link>
        </div>

        <p className="anim-load-rise mx-auto mt-[28px] max-w-[56ch] font-sans text-[17px] font-medium leading-[1.5] text-[color:var(--body-text)] [--rise-delay:.15s] [--rise-y:24px] md:text-[19px]">
          A small, focused studio designing and building custom software, web apps and AI automation. You work
          directly with the people writing the code.
        </p>

        <div className="anim-load-rise mt-[36px] flex flex-wrap items-center justify-center gap-x-[28px] gap-y-[16px] [--rise-delay:.25s] [--rise-y:24px]">
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

        {/* From md the list sits in the reel's browser bar instead */}
        <p className="anim-load-rise mt-[32px] font-mono text-[13px] md:hidden font-semibold uppercase leading-[1.6] tracking-[0.5px] text-muted-foreground [--rise-delay:.3s] [--rise-y:16px]">
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
      </div>

      {/* Product reel stage — reserves the full-width size (16:10 video + bar)
          so the frame can widen into it without shifting the page */}
      <div
        ref={stageRef}
        className="anim-load-rise relative mx-auto mt-[56px] w-full max-w-[1920px] [--rise-delay:.35s] md:mt-[72px]"
        style={{ height: `calc(min(100vw, 1920px) * 0.625 + ${BAR}px)` }}
      >
        <div
          ref={frameRef}
          className="absolute left-1/2 top-0 w-[calc(100%-60px)] -translate-x-1/2 md:w-[min(1120px,calc(100%-120px))]"
        >
          <div className="overflow-hidden border border-border bg-[color:var(--card)]">
            <div
              className="flex items-center justify-between gap-4 border-b border-border px-4 mxd-mono text-[12px] text-muted-foreground"
              style={{ height: BAR }}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span aria-hidden className="flex shrink-0 gap-[6px]">
                  <span className="h-[8px] w-[8px] rounded-full border border-current" />
                  <span className="h-[8px] w-[8px] rounded-full border border-current" />
                  <span className="h-[8px] w-[8px] rounded-full border border-current" />
                </span>
                <span className="truncate">{segment.project.url}</span>
              </span>
              {/* Recent builds — the one playing in the reel is highlighted */}
              <span className="hidden whitespace-nowrap md:inline">
                Recent builds —{" "}
                {RECENT_BUILDS.map((b, i) => (
                  <span key={b.href}>
                    {i > 0 && " · "}
                    <Link
                      href={b.href}
                      className={
                        b.href === `/work#${segment.id}`
                          ? "text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)]"
                          : "transition-colors hover:text-[color:var(--ink)]"
                      }
                    >
                      {b.label}
                    </Link>
                  </span>
                ))}
              </span>
            </div>
            <Link
              href={`/work#${segment.id}`}
              aria-label={`${segment.project.title} case study`}
              data-cursor-text="View project"
              className="relative block aspect-[16/10] overflow-hidden bg-muted"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover object-top"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/hero-reel-poster.jpg"
                onTimeUpdate={onTime}
              >
                <source src="/videos/hero-reel.mp4" type='video/mp4; codecs="avc1.640028"' />
                <source src="/videos/hero-reel.webm" type="video/webm" />
              </video>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
