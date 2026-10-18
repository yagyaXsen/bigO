"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ArrowUpRightIcon } from "@/components/icons";
import { START_STEPS } from "@/lib/services";

const BRACKET_LINK =
  "mxd-mono inline-flex gap-[10px] text-[16px] font-medium uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] md:text-[18px] before:content-['['] after:content-[']'] before:transition-transform after:transition-transform hover:before:-translate-x-[2px] hover:after:translate-x-[2px]";

/** Home page — what working with us looks like, from first message to launch */
export function ProjectStart() {
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const stepsRef = useCardBatch<HTMLOListElement>(".start-step", 3);
  const ctaRef = useInUp<HTMLDivElement>();

  return (
    <section id="start" className="mxd-container pb-[140px] md:pb-[170px] xl:pb-[180px]">
      {/* Section title — P/03 + h2, FAQ on the right */}
      <div className="mb-[56px] grid grid-cols-1 items-end gap-y-[24px] md:mb-[73px] xl:grid-cols-12">
        <div ref={counterRef} className="xl:col-span-4">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px]">
            <ScrambleText text="P/03" triggerOn="hover" />
          </span>
        </div>
        <div className="flex flex-col gap-y-[24px] xl:col-span-8 xl:flex-row xl:items-end xl:justify-between">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px]"
          >
            How a project starts
          </h2>
          <Link href="/services#faq" className={cn(BRACKET_LINK, "xl:mb-[14px]")}>
            <ScrambleText text="READ THE FAQ" triggerOn="hover" />
          </Link>
        </div>
      </div>

      <ol ref={stepsRef} className="grid grid-cols-1 gap-[48px] md:grid-cols-3 md:gap-[40px]">
        {START_STEPS.map(([title, text], i) => (
          <li key={title} className="start-step border-t border-[color:var(--ink)] pt-[26px]">
            <span className="mxd-mono text-[14px] text-muted-foreground">[{String(i + 1).padStart(2, "0")}]</span>
            <h3 className="mt-[18px] font-sans text-[28px] font-semibold leading-[1.15] tracking-[-1px] text-[color:var(--ink)] md:text-[30px] xl:text-[34px]">
              {title}
            </h3>
            <p className="mt-[14px] max-w-[38ch] font-sans text-[16px] leading-[1.55] text-[color:var(--body-text)] md:text-[17px]">
              {text}
            </p>
          </li>
        ))}
      </ol>

      <div ref={ctaRef} className="mt-[56px] flex flex-wrap items-center gap-x-[28px] gap-y-[16px] md:mt-[72px]">
        <Link
          href="/contact"
          onClick={() => window.scrollTo(0, 0)}
          className="group inline-flex items-center gap-2.5 rounded-full bg-[color:var(--ink)] px-7 py-3.5 font-sans text-[15px] font-semibold text-[color:var(--background)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--accent-blue)] hover:text-white"
        >
          Book a free call
          <ArrowUpRightIcon className="h-[13px] w-[13px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <Link href="/services#process" className={BRACKET_LINK}>
          <ScrambleText text="SEE THE FULL PROCESS" triggerOn="hover" />
        </Link>
      </div>
    </section>
  );
}
