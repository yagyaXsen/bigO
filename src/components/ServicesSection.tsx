"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { CORE_SERVICES, MORE_SERVICES } from "@/lib/services";

const BRACKET_LINK =
  "mxd-mono inline-flex gap-[8px] text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] before:content-['['] after:content-[']'] before:transition-transform after:transition-transform hover:before:-translate-x-[2px] hover:after:translate-x-[2px]";

/** Home page overview — the three development services, the rest in one line.
 *  Every service is explained in detail on /services. */
export function ServicesSection() {
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const gridRef = useCardBatch<HTMLDivElement>(".service-card", 3);
  const extraRef = useInUp<HTMLParagraphElement>();

  return (
    <section
      id="services"
      className="mxd-container pt-[135px] pb-[140px] md:pt-[164px] md:pb-[170px] xl:pt-[165px] xl:pb-[180px]"
    >
      {/* Section title — S/01 + h2, All services on the right */}
      <div className="mb-[48px] grid grid-cols-1 items-end gap-y-[24px] xl:mb-[64px] xl:grid-cols-12">
        <div ref={counterRef} className="xl:col-span-4">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px]">
            <ScrambleText text="S/01" triggerOn="hover" />
          </span>
        </div>
        <div className="flex flex-col gap-y-[24px] xl:col-span-8 xl:flex-row xl:items-end xl:justify-between">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px]"
          >
            What we build
          </h2>
          <Link
            href="/services"
            onClick={() => window.scrollTo(0, 0)}
            className={cn(BRACKET_LINK, "text-[16px] font-medium md:text-[18px] xl:mb-[14px]")}
          >
            <ScrambleText text="ALL SERVICES" triggerOn="hover" />
          </Link>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 gap-[30px] md:gap-[40px] xl:grid-cols-3">
        {CORE_SERVICES.map((s) => (
          <article
            key={s.id}
            className="service-card flex min-h-[340px] flex-col justify-between gap-[40px] border border-border bg-[color:var(--card)] p-[30px] transition-colors duration-300 hover:border-[color:var(--accent-blue)]/40 md:p-[40px]"
          >
            <div>
              <span className="mxd-mono text-[14px] text-[color:var(--body-text)]">[{s.num}]</span>
              <h3 className="mt-[22px] font-sans text-[30px] font-bold leading-[1.15] tracking-[-1px] text-[color:var(--ink)] md:text-[34px]">
                {s.title}
              </h3>
              <p className="mt-[18px] font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[18px]">
                {s.short}
              </p>
            </div>

            <Link href={`/services#${s.id}`} className={BRACKET_LINK}>
              <ScrambleText text="HOW WE DO IT" triggerOn="hover" />
            </Link>
          </article>
        ))}
      </div>

      <p
        ref={extraRef}
        className="mt-[40px] font-sans text-[16px] leading-[1.7] text-[color:var(--body-text)] md:text-[17px]"
      >
        <span className="font-semibold text-[color:var(--ink)]">Also:</span>{" "}
        {MORE_SERVICES.map((s, i) => (
          <span key={s.id}>
            {i > 0 && " · "}
            <Link
              href={`/services#${s.id}`}
              className="underline-offset-4 transition-colors hover:text-[color:var(--accent-blue)] hover:underline"
            >
              {s.title}
            </Link>
          </span>
        ))}
      </p>
    </section>
  );
}
