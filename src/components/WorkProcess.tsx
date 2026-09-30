"use client";

import { useSplitLines } from "@/hooks/useSplitLines";
import { useInUp, useSlideDownLine } from "@/hooks/useScrollAnimations";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { PROCESS } from "@/lib/projects";

/** Process list — CaseStudies section-title grid + TechStack-style slide-down rows. */
export function WorkProcess() {
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const counterRef = useInUp<HTMLDivElement>();
  const introRef = useInUp<HTMLParagraphElement>();
  const listRef = useSlideDownLine<HTMLOListElement>(".process-item", ".process-inner");

  return (
    <section id="process" className="mxd-container pb-[140px] md:pb-[170px] xl:pb-[180px] min-[1600px]:pb-[200px]">
      <div className="mb-[73px] grid grid-cols-1 md:mb-[90px] xl:mb-[86px] xl:grid-cols-12">
        <div ref={counterRef} className="mb-[21px] xl:col-span-4 xl:mb-0">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
            <ScrambleText text="H/07" triggerOn="hover" />
          </span>
        </div>
        <div className="xl:col-span-8">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:text-[95px]"
          >
            How every project
            <br />
            gets built
          </h2>
          <p ref={introRef} className="mt-8 max-w-[50ch] font-sans font-bold text-[clamp(17px,2vw,20px)] leading-[1.4] text-[color:var(--body-text)]">
            The same seven steps sit behind Nexora, Hirearn and our client work — no unnecessary layers, and you
            always know what&apos;s next.
          </p>
        </div>
      </div>

      <ol ref={listRef} className="flex flex-col">
        {PROCESS.map(([t, d], k) => (
          <li key={t} className="process-item group overflow-hidden border-t border-border">
            <div className="process-inner grid grid-cols-1 items-baseline gap-x-[60px] gap-y-[10px] py-[22px] md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] md:py-[30px]">
              <span className="mxd-mono text-muted-foreground transition-colors group-hover:text-[color:var(--accent-blue)]">
                [{String(k + 1).padStart(2, "0")}]
              </span>
              <span className="text-[26px] font-semibold leading-[1.15] tracking-[-1px] text-[color:var(--ink)] transition-all duration-[400ms] ease-[cubic-bezier(.23,.65,.74,1.09)] group-hover:translate-x-3 group-hover:text-[color:var(--accent-blue)] md:text-[30px] xl:text-[36px]">
                {t}
              </span>
              <span className="max-w-[46ch] text-[16px] leading-[1.5] text-[color:var(--body-text)]">{d}</span>
            </div>
          </li>
        ))}
        <li className="border-t border-border" aria-hidden />
      </ol>
    </section>
  );
}
