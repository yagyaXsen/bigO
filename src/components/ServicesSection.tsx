"use client";

import Link from "next/link";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";

interface Service {
  index: string;
  title: string;
  description: string;
  tags: string[];
  proof: { label: string; href: string };
}

/* Three development services, each backed by a real project on /work */
const SERVICES: Service[] = [
  {
    index: "[01]",
    title: "Custom software & web apps",
    description:
      "SaaS products, dashboards, internal tools, marketplaces and installable web apps — designed, built and deployed by the same team.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    proof: { label: "See Hirearn", href: "/work#hirearn" },
  },
  {
    index: "[02]",
    title: "AI & automation",
    description:
      "AI inside your product: data extraction, search and matching, assistants, and automated workflows that connect the tools you already use.",
    tags: ["Python", "FastAPI", "AI models", "Automation"],
    proof: { label: "See Nexora", href: "/work#nexora" },
  },
  {
    index: "[03]",
    title: "Websites that convert",
    description:
      "Fast, search-friendly business websites and online stores with booking, payments and WhatsApp built in.",
    tags: ["Next.js", "SEO", "Payments", "WhatsApp"],
    proof: { label: "See Lumora Dental", href: "/work#lumora" },
  },
];

const BRACKET_LINK =
  "mxd-mono inline-flex gap-[8px] text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] before:content-['['] after:content-[']'] before:transition-transform after:transition-transform hover:before:-translate-x-[2px] hover:after:translate-x-[2px]";

export function ServicesSection() {
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const gridRef = useCardBatch<HTMLDivElement>(".service-card", 3);
  const extraRef = useInUp<HTMLParagraphElement>();

  return (
    <section
      id="services"
      className="mxd-container pt-[135px] pb-[140px] md:pt-[164px] md:pb-[170px] xl:pt-[165px] xl:pb-[180px] min-[1600px]:pt-[181px] min-[1600px]:pb-[200px]"
    >
      {/* Section title — S/01 col-xl-4 + h2 col-xl-8 */}
      <div className="mb-[48px] grid grid-cols-1 xl:mb-[64px] xl:grid-cols-12">
        <div ref={counterRef} className="mb-[21px] xl:col-span-4 xl:mb-0">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
            <ScrambleText text="S/01" triggerOn="hover" />
          </span>
        </div>
        <div className="xl:col-span-8">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:text-[95px]"
          >
            What we build
          </h2>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 gap-[30px] md:gap-[40px] xl:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.index}
            className="service-card flex min-h-[420px] flex-col justify-between gap-[40px] border border-border bg-[color:var(--card)] p-[30px] transition-colors duration-300 hover:border-[color:var(--accent-blue)]/40 md:p-[40px]"
          >
            <div>
              <span className="mxd-mono text-[14px] text-[color:var(--body-text)]">{s.index}</span>
              <h3 className="mt-[22px] font-sans text-[30px] font-bold leading-[1.15] tracking-[-1px] text-[color:var(--ink)] md:text-[34px] min-[1600px]:text-[40px]">
                {s.title}
              </h3>
              <p className="mt-[18px] font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[18px]">
                {s.description}
              </p>
            </div>

            <div className="flex flex-col gap-[24px]">
              <ul className="flex flex-wrap gap-x-[16px] gap-y-[6px]">
                {s.tags.map((t) => (
                  <li key={t} className="mxd-mono text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]">
                    {t}
                  </li>
                ))}
              </ul>
              <Link href={s.proof.href} className={BRACKET_LINK}>
                <ScrambleText text={s.proof.label.toUpperCase()} triggerOn="hover" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p
        ref={extraRef}
        className="mt-[40px] max-w-[80ch] font-sans text-[16px] leading-[1.5] text-[color:var(--body-text)] md:text-[17px]"
      >
        <span className="font-semibold text-[color:var(--ink)]">Also:</span>{" "}
        care &amp; maintenance, branding and digital marketing for what we build.{" "}
        <Link href="/contact" className="whitespace-nowrap font-semibold text-[color:var(--ink)] underline-offset-4 transition-colors hover:text-[color:var(--accent-blue)] hover:underline">
          Ask us →
        </Link>
      </p>
    </section>
  );
}
