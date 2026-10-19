import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Photo } from "@/components/ui/Photo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { TechLogo } from "@/components/ui/TechLogo";
import { HeroWorkflow } from "@/components/home/HeroWorkflow";
import { ProblemPicker } from "@/components/home/ProblemPicker";
import {
  COMMITMENTS,
  FOUNDER,
  HERO,
  HOME_FAQ,
  SERVICES,
  STACK,
  STANDARDS,
} from "@/lib/content";
import { PROJECTS } from "@/lib/projects";

/* Hero — what we do and who it's for, in one screen */
export function Hero() {
  const recent = PROJECTS.filter((p) => p.status === "Live");
  return (
    <>
      <div className="relative isolate">
        <div aria-hidden className="pattern-grid absolute inset-x-0 -top-px bottom-0 -z-10" />
        {/* Text left, a live example workflow right (stacked below lg) */}
        <section className="container-page grid gap-14 pt-14 pb-14 md:pt-24 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-28">
          <div className="min-w-0 lg:col-span-7">
            <p className="label">{HERO.label}</p>
            <h1 className="mt-6 max-w-[19ch] font-serif text-[42px] font-normal leading-[1.04] tracking-[-0.02em] md:text-[64px] lg:text-[60px] xl:text-[68px]">
              {HERO.title}
            </h1>
            <p className="mt-7 max-w-[58ch] text-[18px] leading-[1.55] md:text-[20px]">{HERO.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Book a free call</ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                See our work
              </ButtonLink>
            </div>
            <p className="mt-8 text-[14px] text-muted">
              Recent work:{" "}
              {recent.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && ", "}
                  <Link href={`/work#${p.id}`} className="link">
                    {p.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          {/* min-w-0: lets the panel shrink so its truncated text never widens the page */}
          <div className="min-w-0 lg:col-span-5">
            <HeroWorkflow />
          </div>
        </section>
      </div>

      <div className="container-page pb-20 md:pb-28">
        <Photo
          src="/images/site/workspace.jpg"
          alt="A laptop showing code on a quiet desk in morning light"
          priority
          className="mb-12 aspect-[16/10] md:mb-16 md:aspect-[21/9]"
        />
        {/* What every client gets — thin lines between cells */}
        <dl className="grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4">
          {/* Padding by position: 2 columns on phones, 4 from lg */}
          {COMMITMENTS.map(([term, detail], i) => (
            <div
              key={term}
              className={cn("bg-bg py-6 lg:pr-6", i % 2 ? "pl-5" : "pl-0 pr-4", i === 0 ? "lg:pl-0" : "lg:pl-6")}
            >
              <dt className="label">{term}</dt>
              <dd className="mt-2 text-[15px] leading-[1.45] text-ink">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

/* 01 — the problems we solve, and what changes */
export function Problems() {
  return (
    <Section
      id="problems"
      tone="muted"
      num="01"
      label="Problems we solve"
      title="If this sounds familiar, we can help."
      intro="Most of our projects start with a process that eats hours every week. Pick the one that sounds like you to see what changes."
    >
      <Photo
        src="/images/site/planning.jpg"
        alt="Mapping a workflow on a wall with notes and diagrams"
        className="mb-14 aspect-[16/10] md:mb-16 md:aspect-[21/8]"
      />
      <ProblemPicker />
    </Section>
  );
}

/* 02 — the four core services; websites, design and marketing are one line */
export function WhatWeBuild() {
  return (
    <Section
      id="services"
      num="02"
      label="What we build"
      title="Software that fits how your business works."
      intro="We focus on four kinds of work and do them properly. Everything else we offer supports these."
    >
      <Photo
        src="/images/site/dashboard.jpg"
        alt="A business dashboard with charts open on a laptop"
        className="mb-14 aspect-[16/10] md:mb-16 md:aspect-[21/8]"
      />
      <div className="grid gap-px border-y border-line bg-line md:grid-cols-2">
        {SERVICES.map((s) => (
          <article key={s.id} className="flex flex-col bg-bg py-8 md:p-10 md:odd:pl-0">
            <div className="flex items-center justify-between">
              <ServiceIcon id={s.id} />
              <p className="label">{s.num}</p>
            </div>
            <h3 className="mt-5 font-serif text-[26px] font-normal leading-[1.2] md:text-[30px]">{s.title}</h3>
            <p className="mt-3 max-w-[48ch] text-[16px]">{s.short}</p>
            <ArrowLink href={`/services#${s.id}`} className="mt-6">
              How we do it
            </ArrowLink>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[60ch] text-[15px] text-muted">
          We also design and build the website, brand and hosting around the software we deliver.
        </p>
        <ArrowLink href="/services">All services</ArrowLink>
      </div>
    </Section>
  );
}

/* 03 — selected work, text first */
export function SelectedWork() {
  const featured = ["nexora", "hirearn", "lumora"].map((id) => PROJECTS.find((p) => p.id === id)!);
  return (
    <Section
      id="work"
      tone="muted"
      num="03"
      label="Selected work"
      title="Recent projects."
      intro="A few of the systems we've designed, built and shipped."
      aside={<ArrowLink href="/work">All work</ArrowLink>}
    >
      {/* Screenshot cards; the screenshot opens the case study */}
      <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
        {featured.map((p) => (
          <li key={p.id} className="flex flex-col">
            {p.image && (
              <Link
                href={`/work#${p.id}`}
                aria-label={`${p.name} case study`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface"
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 768px) 400px, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>
            )}
            <h3 className="mt-6 font-serif text-[26px] font-normal leading-tight">{p.name}</h3>
            <p className="label mt-2">
              {p.kind} · {p.status}
            </p>
            <p className="mt-4 text-[16px]">{p.summary}</p>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5">
              <ArrowLink href={`/work#${p.id}`}>Case study</ArrowLink>
              {p.live && (
                <ArrowLink href={p.live} external>
                  Live site
                </ArrowLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* 04 — how we build: engineering standards, two columns of thin-ruled items */
export function Standards() {
  return (
    <Section
      id="standards"
      num="04"
      label="How we build"
      title="Engineering standards on every project."
      intro="The same technical basics go into everything we ship, whether it's a small automation or a full platform."
    >
      <ol className="grid gap-x-8 border-t border-line md:grid-cols-2">
        {STANDARDS.map(([title, text], i) => (
          <li key={title} className="flex gap-5 border-b border-line py-7">
            <span className="label pt-1.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-serif text-[22px] font-normal leading-tight md:text-[24px]">{title}</h3>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.6] md:text-[16px]">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* 05 — tech stack, grouped, no logos */
export function Stack() {
  return (
    <Section
      id="stack"
      tone="muted"
      num="05"
      label="Tech stack"
      title="Mainstream tools, no lock-in."
      intro="We build with widely used, well-supported technology, so your system is easy to maintain, by us or anyone else."
    >
      <dl className="border-t border-line">
        {STACK.map(([group, tools]) => (
          <div key={group} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-8">
            <dt className="label md:col-span-4 md:pt-3">{group}</dt>
            <dd className="mt-2 flex flex-wrap gap-2 md:col-span-8 md:mt-0">
              {tools.map((t) => (
                <TechLogo key={t} name={t} />
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* 06 — a short note from the founder: label and photo left, the note right */
export function FounderNote() {
  return (
    <Section id="founder">
      <figure className="grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="label md:pt-3">
            <span className="text-ink">06</span>
            <span className="mx-2">—</span>
            From the founder
          </p>
          <Image
            src={FOUNDER.photo}
            alt={`${FOUNDER.name}, ${FOUNDER.role}`}
            width={480}
            height={480}
            className="mt-6 h-auto w-32 border border-line md:mt-8 md:w-48"
          />
        </div>
        <div className="md:col-span-8">
          <blockquote className="space-y-5 font-serif text-[24px] leading-[1.4] text-ink md:text-[30px]">
            {FOUNDER.note.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-line-strong" />
            <span className="text-[15px]">
              <span className="font-medium text-ink">{FOUNDER.name}</span>
              <span className="text-muted">, {FOUNDER.role}</span>
            </span>
          </figcaption>
        </div>
      </figure>
    </Section>
  );
}

/* 07 — the questions business owners ask first */
export function HomeFaq() {
  return (
    <Section
      id="faq"
      tone="muted"
      num="07"
      label="Questions"
      title="Common questions."
      aside={<ArrowLink href="/services#faq">All questions</ArrowLink>}
    >
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8 md:col-start-5">
          <FaqList items={HOME_FAQ} />
        </div>
      </div>
    </Section>
  );
}
