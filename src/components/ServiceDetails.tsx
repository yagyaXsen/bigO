"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ArrowUpRightIcon } from "@/components/icons";
import { CORE_SERVICES, MORE_SERVICES, type CoreService } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";

const BRACKET_LINK =
  "mxd-mono inline-flex gap-[8px] text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] before:content-['['] after:content-[']'] before:transition-transform after:transition-transform hover:before:-translate-x-[2px] hover:after:translate-x-[2px]";

/** Counter + h2 grid shared by every section title on the site */
export function SectionTitle({ counter, title, intro }: { counter: string; title: string; intro?: string }) {
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();
  return (
    <div className="mb-[48px] grid grid-cols-1 xl:mb-[64px] xl:grid-cols-12">
      <div ref={counterRef} className="mb-[21px] xl:col-span-4 xl:mb-0">
        <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px]">
          <ScrambleText text={counter} triggerOn="hover" />
        </span>
      </div>
      <div className="xl:col-span-8">
        <h2
          ref={titleRef}
          className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px]"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-8 max-w-[52ch] font-sans font-bold text-[clamp(17px,2vw,20px)] leading-[1.4] text-[color:var(--body-text)]">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

function NumberedList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mxd-eyebrow mb-[18px]">{label}</p>
      <ul className="flex flex-col">
        {items.map((item, i) => (
          <li
            key={item}
            className="flex items-baseline gap-[16px] border-t border-border py-[14px] font-sans text-[16px] leading-[1.45] text-[color:var(--ink)] md:text-[17px]"
          >
            <span className="mxd-mono shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
        <li className="border-t border-border" aria-hidden />
      </ul>
    </div>
  );
}

/** One core service: title on the left (sticky on desktop), the detail on the right */
function CoreServiceBlock({ service: s }: { service: CoreService }) {
  const bodyRef = useInUp<HTMLDivElement>();
  const project = PROJECTS.find((p) => p.id === s.proof);

  return (
    <article id={s.id} className="scroll-mt-[90px] border-t border-border pt-[40px] pb-[90px] md:pt-[56px] md:pb-[110px]">
      {/* No column gap: the detail column lines up with the section h2 above */}
      <div className="grid grid-cols-1 gap-y-[32px] xl:grid-cols-12">
        <div className="xl:col-span-4 xl:pr-[40px]">
          <div className="xl:sticky xl:top-[120px]">
            <span className="mxd-mono text-[14px] text-muted-foreground">[{s.num}]</span>
            <h3 className="mt-[18px] max-w-[14ch] font-sans text-[34px] font-semibold leading-[1.1] tracking-[-1.5px] text-[color:var(--ink)] md:text-[44px] xl:text-[48px]">
              {s.title}
            </h3>
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)} className={cn(BRACKET_LINK, "mt-[28px] hidden xl:inline-flex")}>
              <ScrambleText text="DISCUSS A PROJECT" triggerOn="hover" />
            </Link>
          </div>
        </div>

        <div ref={bodyRef} className="xl:col-span-8">
          <p className="max-w-[40ch] font-sans text-[24px] font-medium leading-[1.3] tracking-[-0.6px] md:text-[30px]">
            <span className="text-[color:var(--ink)]">{s.lead[0]}</span>
            <span className="text-muted-foreground">{s.lead[1]}</span>
          </p>

          <div className="mt-[48px] grid grid-cols-1 gap-x-[48px] gap-y-[40px] md:grid-cols-2">
            <NumberedList label="/ WHAT WE BUILD" items={s.builds} />
            <NumberedList label="/ WHAT'S INCLUDED" items={s.included} />
          </div>

          <div className="mt-[40px]">
            <p className="mxd-eyebrow mb-[14px]">/ TOOLS</p>
            <ul className="flex flex-wrap gap-x-[16px] gap-y-[6px]">
              {s.tools.map((t) => (
                <li key={t} className="mxd-mono text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]">
                  {t.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          {project && (
            <Link
              href={`/work#${project.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group mt-[40px] flex items-center justify-between gap-[24px] border border-border bg-[color:var(--card)] p-[22px] transition-colors duration-300 hover:border-[color:var(--accent-blue)]/40 md:p-[28px]"
            >
              <span className="flex flex-col gap-[8px]">
                <span className="mxd-eyebrow">/ In practice: {project.title}</span>
                <span className="font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[17px]">
                  {project.summary}
                </span>
              </span>
              <ArrowUpRightIcon
                className="h-[18px] w-[18px] shrink-0 text-[color:var(--ink)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--accent-blue)]"
                aria-hidden="true"
              />
            </Link>
          )}

          <Link href="/contact" onClick={() => window.scrollTo(0, 0)} className={cn(BRACKET_LINK, "mt-[32px] xl:hidden")}>
            <ScrambleText text="DISCUSS A PROJECT" triggerOn="hover" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** S/01 — the development services, in detail */
export function CoreServices() {
  return (
    <section id="development" className="mxd-container pb-[50px] md:pb-[60px]">
      <SectionTitle
        counter="S/01"
        title="Software, AI & web"
        intro="What we spend most of our time on: products and systems built from scratch, with the same small team from first call to launch."
      />
      {CORE_SERVICES.map((s) => (
        <CoreServiceBlock key={s.id} service={s} />
      ))}
    </section>
  );
}

/** S/02 — design, marketing, care and consulting around what we build */
export function MoreServices() {
  const gridRef = useCardBatch<HTMLDivElement>(".more-card", 2);

  return (
    <section id="design-growth" className="mxd-container pb-[140px] md:pb-[170px] xl:pb-[180px]">
      <SectionTitle
        counter="S/02"
        title="Design & growth"
        intro="The work around the product: how it looks, how people find it, and keeping it running well once it's live."
      />
      <div ref={gridRef} className="grid grid-cols-1 gap-[30px] md:grid-cols-2 md:gap-[40px]">
        {MORE_SERVICES.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="more-card scroll-mt-[90px] flex flex-col gap-[28px] border border-border bg-[color:var(--card)] p-[30px] md:p-[40px]"
          >
            <div>
              <span className="mxd-mono text-[14px] text-muted-foreground">[{s.num}]</span>
              <h3 className="mt-[18px] font-sans text-[28px] font-bold leading-[1.15] tracking-[-1px] text-[color:var(--ink)] md:text-[32px]">
                {s.title}
              </h3>
              <p className="mt-[14px] font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[17px]">
                {s.short}
              </p>
            </div>
            <ul className="flex flex-col">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="border-t border-border py-[12px] font-sans text-[15px] leading-[1.45] text-[color:var(--ink)] md:text-[16px]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
