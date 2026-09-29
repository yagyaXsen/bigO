"use client";

import { useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function AboutSection() {
  const counterRef = useInUp<HTMLDivElement>();
  const manifestRef = useSplitLines<HTMLParagraphElement>();

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

          {/* Right block: manifest */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
