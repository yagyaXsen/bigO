"use client";

import { useInUp, useStatsLines } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import type { StatItem } from "@/types";

const STATS: StatItem[] = [
  { value: "50+", caption: "Happy clients who trust our work" },
  { value: "86%", caption: "Clients come back for a new projects" },
  { value: "5+", caption: "Years of professional experience" },
  { value: "70+", caption: "Successfully completed projects" },
];

export function AboutSection() {
  const counterRef = useInUp<HTMLDivElement>();
  const manifestRef = useSplitLines<HTMLParagraphElement>();
  const statsRef = useStatsLines<HTMLDivElement>(".stats-item", ".stats-inner");

  return (
    /* .mxd-section.padding-top-number.padding-bottom-tag-m:
       pt 135→164(md)→165(xl)→181(1600); pb 132→162(md)→173(xl)→193(1600) */
    <section
      id="about"
      className="pt-[135px] pb-[132px] md:pt-[164px] md:pb-[162px] xl:pt-[165px] xl:pb-[173px] min-[1600px]:pt-[181px] min-[1600px]:pb-[193px]"
    >
      <div className="mxd-container">
        {/* Reference grid: number col-12 col-xl-4, manifest col-12 col-xl-8 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-x-0">
          {/* Section counter A/01 — .title-number: mono 500, muted,
              42→52(md)→60(xl)→74(1600), tight negative tracking */}
          <div ref={counterRef} className="mb-[25px] xl:col-span-4 xl:mb-[30px]">
            <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
              <ScrambleText text="A/01" triggerOn="hover" />
            </span>
          </div>

          {/* Right block: manifest + stats */}
          <div className="xl:col-span-8 xl:pt-[4px] min-[1600px]:pt-[8px]">
            {/* Manifest — Manrope 700, lh 1.2, ls -1px; 28px → 44px at xl */}
            <p
              ref={manifestRef}
              className="font-sans text-[28px] font-bold leading-[1.2] tracking-[-1px] text-[color:var(--ink)] xl:text-[44px]"
            >
              From first pixel to final deploy, we build it properly —{" "}
              <span className="text-[color:var(--body-text)]">
                one small, focused team handling your website, growth, and
                automation, with direct access to the people doing the work.
              </span>
            </p>

            {/* Stats lines — .manifest-title pt 74→93(md)→90(xl);
                1 col mobile → 2 cols (basis 50% - 30px, gap 52x60, row 93 xl) */}
            <div
              ref={statsRef}
              className="flex flex-col gap-[53px] pt-[74px] md:flex-row md:flex-wrap md:gap-x-[60px] md:gap-y-[52px] md:pt-[93px] xl:gap-y-[93px] xl:pt-[90px]"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.caption}
                  className="stats-item relative overflow-hidden md:basis-[calc(50%-30px)]"
                >
                  {/* divider line pinned on top of the sliding inner */}
                  <div className="absolute left-0 top-0 z-[1] h-px w-full bg-[color:var(--body-text)]" />
                  <div className="stats-inner relative z-[2] w-full will-change-transform">
                    {/* Number — JetBrains Mono 600 80px/1, ls .5px */}
                    <p className="inline-block pt-[10px] font-mono text-[80px] font-semibold uppercase leading-none tracking-[0.5px] text-[color:var(--ink)] md:pt-[30px]">
                      {stat.value}
                    </p>
                    {/* Caption — mono 500 14px/1.4, medium grey, max 200px */}
                    <p className="max-w-[200px] pl-[4px] pt-[5px] font-mono text-[14px] font-medium uppercase leading-[1.4] tracking-[0.5px] text-[color:var(--body-text)] md:pt-[25px]">
                      {stat.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
