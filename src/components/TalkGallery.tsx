"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSplitLines } from "@/hooks/useSplitLines";

interface Tile {
  caption: string;
  image: string;
}

const SERVICES = "/images/services";
const WORKS = "/images/works";

/* Original bigO service categories mapped to existing assets */
const TILES: Tile[] = [
  { caption: "Web Design", image: `${SERVICES}/1200x980_cpb01.webp` },
  { caption: "AI Chatbots", image: `${SERVICES}/1200x980_cpb02.webp` },
  { caption: "E-Commerce", image: `${SERVICES}/1200x980_cpb03.webp` },
  { caption: "Branding", image: `${SERVICES}/1200x980_cpb04.webp` },
  { caption: "SEO", image: `${SERVICES}/1200x980_cpb05.webp` },
  { caption: "Web Apps", image: `${SERVICES}/1200x980_cpb06.webp` },
  { caption: "UI/UX", image: `${SERVICES}/1200x980_cpb07.webp` },
  { caption: "Automation", image: `${WORKS}/800x450_all01.webp` },
  { caption: "Maintenance", image: `${WORKS}/800x450_all02.webp` },
  { caption: "Motion", image: `${WORKS}/800x450_all03.webp` },
];

/**
 * "Let's talk" CTA + reference category gallery strip.
 * Big split-line heading (link, custom-cursor "Say hi"), then a seamless
 * horizontal marquee whose speed + direction react to scroll velocity
 * (reference marquee timeScale clamp), settling back to a slow default drift.
 */
export function TalkGallery() {
  const headingRef = useSplitLines<HTMLHeadingElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const baseSpeed = 1;
      // Track holds the tile set twice; shifting by -50% loops seamlessly.
      const tl = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 42,
        repeat: -1,
      });
      tl.timeScale(baseSpeed);

      let targetTS = baseSpeed;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const dir = v < 0 ? -1 : 1; // scroll up briefly reverses the drift
          targetTS =
            dir * gsap.utils.clamp(baseSpeed, 6, baseSpeed + Math.abs(v) / 300);
        },
      });

      // Each frame ease the timeScale back toward the slow default drift.
      const tick = () => {
        targetTS = gsap.utils.interpolate(targetTS, baseSpeed, 0.04);
        tl.timeScale(targetTS);
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        tl.kill();
      };
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pt-[130px] pb-[140px] md:pt-[160px] md:pb-[170px]">
      <div className="mxd-container">
        <span className="mxd-eyebrow">[ SAY HELLO ]</span>
        <a
          href="mailto:bigo.company2026@gmail.com"
          data-cursor-text="Say hi"
          className="group mt-[26px] block w-fit"
        >
          <h2
            ref={headingRef}
            className="mxd-display font-semibold text-[color:var(--ink)] text-[44px] leading-[1.02] tracking-[-1.8px] transition-colors duration-300 group-hover:text-[color:var(--accent-blue)] md:text-[72px] xl:text-[104px] xl:tracking-[-4px] min-[1600px]:text-[128px]"
          >
            Let&apos;s build
            <br />
            yours next
          </h2>
        </a>
      </div>

      {/* Category gallery — seamless velocity-reactive marquee */}
      <div className="mt-[70px] w-full md:mt-[90px]" aria-hidden>
        <div ref={trackRef} className="flex w-max gap-[24px] will-change-transform">
          {[...TILES, ...TILES].map((tile, i) => (
            <figure
              key={`${tile.caption}-${i}`}
              data-cursor-text="View"
              className="group/tile relative w-[280px] shrink-0 md:w-[340px]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.caption}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(.23,.65,.74,1.09)] group-hover/tile:scale-[1.05]"
                />
              </div>
              <figcaption className="mxd-mono mt-[16px] text-[color:var(--ink)]">
                {tile.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
