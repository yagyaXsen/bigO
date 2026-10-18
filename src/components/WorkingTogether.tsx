"use client";

import Link from "next/link";
import { ScrollTrigger } from "@/lib/gsap";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SectionTitle } from "@/components/ServiceDetails";
import { ENGAGEMENTS, FAQ, PROMISES } from "@/lib/services";

const BRACKET_LINK =
  "mxd-mono inline-flex gap-[8px] text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] before:content-['['] after:content-[']'] before:transition-transform after:transition-transform hover:before:-translate-x-[2px] hover:after:translate-x-[2px]";

/** W/05 — how an engagement is set up, and what every client can count on */
export function WorkingTogether() {
  const gridRef = useCardBatch<HTMLDivElement>(".engagement-card", 2);
  const promisesRef = useInUp<HTMLUListElement>();

  return (
    <section id="working-together" className="mxd-container pb-[140px] md:pb-[170px] xl:pb-[180px]">
      <SectionTitle
        counter="W/05"
        title="Working together"
        intro="Clear terms before any work starts, so you know exactly what you're paying for and what you get."
      />

      <div ref={gridRef} className="grid grid-cols-1 gap-[30px] md:grid-cols-2 md:gap-[40px]">
        {ENGAGEMENTS.map((e) => (
          <article
            key={e.title}
            className="engagement-card flex flex-col gap-[28px] border border-border bg-[color:var(--card)] p-[30px] md:p-[40px]"
          >
            <div>
              <h3 className="font-sans text-[28px] font-bold leading-[1.15] tracking-[-1px] text-[color:var(--ink)] md:text-[32px]">
                {e.title}
              </h3>
              <p className="mt-[14px] font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[17px]">
                {e.text}
              </p>
            </div>
            <ul className="flex flex-col">
              {e.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-[12px] border-t border-border py-[12px] font-sans text-[15px] leading-[1.45] text-[color:var(--ink)] md:text-[16px]"
                >
                  <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-[color:var(--accent-blue)]" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ul
        ref={promisesRef}
        aria-label="What every client gets"
        className="mt-[40px] flex flex-wrap gap-x-[36px] gap-y-[14px] border-y border-border py-[24px]"
      >
        {PROMISES.map((p) => (
          <li key={p} className="mxd-mono flex items-center gap-[10px] text-[13px] uppercase tracking-[0.5px] text-[color:var(--ink)]">
            <span aria-hidden className="h-[6px] w-[6px] bg-[color:var(--accent-blue)]" />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Q/06 — common questions. Native <details>, so it works without scripts;
 *  opening one changes the page height, so ScrollTrigger re-measures. */
export function Faq() {
  const listRef = useInUp<HTMLDivElement>();

  return (
    <section id="faq" className="mxd-container scroll-mt-[60px] pb-[140px] md:pb-[170px] xl:pb-[180px]">
      <SectionTitle counter="Q/06" title="Common questions" />

      <div className="grid grid-cols-1 gap-y-[40px] xl:grid-cols-12">
        <div className="xl:col-span-4 xl:pr-[40px]">
          <div className="xl:sticky xl:top-[120px]">
            <p className="max-w-[280px] font-sans text-[clamp(16px,1.2vw,19px)] font-medium leading-[1.4]">
              <span className="text-[color:var(--ink)]">Still have a question? </span>
              <span className="text-muted-foreground">Ask us directly, we reply within a day.</span>
            </p>
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)} className={`${BRACKET_LINK} mt-[20px]`}>
              <ScrambleText text="ASK US" triggerOn="hover" />
            </Link>
          </div>
        </div>

        <div ref={listRef} className="xl:col-span-8">
          {FAQ.map(([q, a], i) => (
            <details
              key={q}
              open={i === 0}
              onToggle={() => ScrollTrigger.refresh()}
              className="group border-t border-border last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-[20px] py-[22px] [&::-webkit-details-marker]:hidden md:py-[26px]">
                <span className="mxd-mono w-[28px] shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-sans text-[20px] font-semibold leading-[1.3] tracking-[-0.5px] text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent-blue)] md:text-[24px]">
                  {q}
                </span>
                {/* Plus that turns into a minus when open */}
                <span aria-hidden className="relative h-[14px] w-[14px] shrink-0 self-center">
                  <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[color:var(--ink)]" />
                  <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[color:var(--ink)] transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-[26px] pl-[48px] font-sans text-[16px] leading-[1.6] text-[color:var(--body-text)] md:text-[17px]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
