"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { FlowSteps, ProjectMedia } from "@/components/WorkProjects";
import { PROJECTS, type WorkProject } from "@/lib/projects";

const byId = (id: string) => PROJECTS.find((p) => p.id === id) as WorkProject;
const FEATURED = byId("nexora");
const MORE = [byId("hirearn"), byId("lumora")];

const BRACKET_LINK =
  "mxd-mono inline-flex gap-[10px] text-[16px] font-medium uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] md:text-[18px] before:content-['['] after:content-[']'] before:transition-transform after:transition-transform hover:before:-translate-x-[2px] hover:after:translate-x-[2px]";

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-[16px] gap-y-[6px]", className)}>
      {tags.map((t) => (
        <li key={t} className="mxd-mono text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]">
          <ScrambleText text={t.toUpperCase()} triggerOn="hover" />
        </li>
      ))}
    </ul>
  );
}

/** Home page Selected work — real projects only, each opening its /work case study. */
export function SelectedWork() {
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const featuredRef = useInUp<HTMLDivElement>();
  const gridRef = useCardBatch<HTMLDivElement>(".work-card", 2);
  const p = FEATURED;

  return (
    <section
      id="works"
      className="mxd-container pb-[140px] md:pb-[170px] xl:pb-[180px] min-[1600px]:pb-[200px]"
    >
      {/* Section title — W/02 + h2, View all work on the right */}
      <div className="mb-[56px] grid grid-cols-1 items-end gap-y-[24px] md:mb-[73px] xl:grid-cols-12">
        <div ref={counterRef} className="xl:col-span-4">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
            <ScrambleText text="W/02" triggerOn="hover" />
          </span>
        </div>
        <div className="flex flex-col gap-y-[24px] xl:col-span-8 xl:flex-row xl:items-end xl:justify-between">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:text-[95px]"
          >
            Selected work
          </h2>
          <Link href="/work" onClick={() => window.scrollTo(0, 0)} className={cn(BRACKET_LINK, "xl:mb-[14px]")}>
            <ScrambleText text="VIEW ALL WORK" triggerOn="hover" />
          </Link>
        </div>
      </div>

      {/* Featured — Nexora: the AI pipeline is the proof */}
      <div ref={featuredRef} className="group grid grid-cols-1 gap-x-[60px] gap-y-[32px] xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ProjectMedia project={p} href={`/work#${p.id}`} />
        </div>
        <div className="flex flex-col gap-[28px] xl:col-span-4">
          <div className="flex flex-col gap-[10px]">
            <p className="mxd-eyebrow">{p.subtitle}</p>
            <h3 className="font-sans text-[34px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[44px] xl:text-[54px]">
              <Link href={`/work#${p.id}`} className="transition-colors hover:text-[color:var(--accent-blue)]">
                {p.title}
              </Link>
            </h3>
            <p className="font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[18px]">{p.summary}</p>
          </div>
          {p.flow && <FlowSteps label="/ AI PIPELINE" steps={p.flow} />}
          <Tags tags={p.stack?.slice(0, 5) ?? p.tags} />
        </div>
      </div>

      {/* Two more live projects */}
      <div ref={gridRef} className="mt-[80px] grid grid-cols-1 gap-x-[60px] gap-y-[64px] md:grid-cols-2 xl:mt-[110px]">
        {MORE.map((w) => (
          <article key={w.id} className="work-card group flex flex-col gap-[22px]">
            <ProjectMedia project={w} href={`/work#${w.id}`} />
            <div className="flex items-start justify-between gap-[40px]">
              <div className="flex flex-col gap-[8px]">
                <h3 className="font-sans text-[26px] font-bold leading-[1.2] tracking-[-0.4px] text-[color:var(--ink)] md:text-[30px]">
                  <Link href={`/work#${w.id}`} className="transition-colors hover:text-[color:var(--accent-blue)]">
                    {w.title}
                  </Link>
                </h3>
                <p className="max-w-[46ch] font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)]">{w.summary}</p>
              </div>
              <Tags tags={w.tags} className="hidden max-w-[160px] flex-col items-end gap-y-0 sm:flex" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
