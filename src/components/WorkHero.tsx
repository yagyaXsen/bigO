"use client";

import Link from "next/link";
import { useSplitLines } from "@/hooks/useSplitLines";
import { useInUp } from "@/hooks/useScrollAnimations";
import { ArrowDownIcon } from "@/components/icons";
import { PROJECTS } from "@/lib/projects";

const MARQUEE = ["Nexora", "Hirearn", "Catering, Thailand", "Automation", "Marketplaces", "Digital growth"];

/** Work hero — follows ContactHero: breadcrumb → split-line H1 + intro (xl 8) / index (xl 4). */
export function WorkHero() {
  const headingRef = useSplitLines<HTMLHeadingElement>({ onLoad: true });
  const introRef = useInUp<HTMLDivElement>();

  return (
    <>
      <section className="mxd-container pt-[150px] pb-[90px] md:pt-[200px] md:pb-[120px] xl:pt-[230px] xl:pb-[140px]">
        <div className="mb-[48px] flex items-center gap-2 md:mb-[64px]">
          <Link href="/" className="mxd-mono text-muted-foreground transition-colors hover:text-[color:var(--ink)]">
            Home
          </Link>
          <span className="mxd-mono text-muted-foreground">/</span>
          <span className="mxd-mono text-[color:var(--ink)]">Work</span>
        </div>

        <div className="grid grid-cols-1 gap-x-[60px] gap-y-[60px] xl:grid-cols-12">
          <div className="xl:col-span-8">
            <h1
              ref={headingRef}
              className="mxd-display mt-[26px] font-semibold text-[color:var(--ink)] text-[clamp(44px,6vw,120px)] leading-[1.1] tracking-[-3px]"
            >
              Selected work,
              <br />
              <span className="text-muted-foreground">shipped &amp; live</span>
            </h1>
            <div ref={introRef} className="mt-[38px] max-w-[50ch]">
              <p className="font-sans font-bold text-[clamp(17px,2vw,20px)] leading-[1.4] text-[color:var(--body-text)]">
                A few projects that represent the kind of work we do — automation-heavy products, marketplace
                platforms and ongoing digital growth for international clients.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end xl:col-span-4 xl:pt-[6px]">
            <p className="mxd-eyebrow mb-8">/ INDEX</p>
            <ul className="flex flex-col">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="group flex items-center justify-between gap-4 border-t border-border py-[18px] transition-colors duration-200 hover:border-[color:var(--accent-blue)]/50"
                  >
                    <span className="flex items-center gap-6">
                      <span className="mxd-mono text-muted-foreground">[{p.num}]</span>
                      <span className="text-[color:var(--ink)] text-[clamp(18px,1.4vw,22px)] transition-all duration-300 group-hover:translate-x-[6px] group-hover:text-[color:var(--accent-blue)]">
                        {p.title}
                      </span>
                    </span>
                    <ArrowDownIcon className="h-[18px] w-[18px] text-[color:var(--ink)] transition-all duration-200 group-hover:translate-y-1 group-hover:text-[color:var(--accent-blue)]" />
                  </a>
                </li>
              ))}
              <li className="border-t border-border" aria-hidden />
            </ul>
          </div>
        </div>
      </section>

      {/* Name marquee — globals.css animate-marquee (3 copies, 48px gap → -100%/3 - 16px) */}
      <section
        aria-hidden="true"
        className="mb-[110px] overflow-hidden border-y border-border py-[28px] md:mb-[140px] md:py-[40px] xl:mb-[165px]"
      >
        <div className="flex w-max animate-marquee items-center gap-[48px] hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-[48px] whitespace-nowrap">
              <span
                className={`font-semibold text-[clamp(44px,6vw,95px)] leading-[1.1] tracking-[-3px] ${
                  i % 2 ? "text-muted-foreground" : "text-[color:var(--ink)]"
                }`}
              >
                {t}
              </span>
              <span className="font-mono font-medium text-[clamp(28px,3vw,48px)] text-muted-foreground">/</span>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
