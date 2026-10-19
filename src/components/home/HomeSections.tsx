import Link from "next/link";
import Image from "next/image";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { TechLogo } from "@/components/ui/TechLogo";
import { HeroWorkflow } from "@/components/home/HeroWorkflow";
import { ProblemPicker } from "@/components/home/ProblemPicker";
import { FOUNDER, HERO, HOME_FAQ, SERVICES, STACK, STANDARDS, TERMS } from "@/lib/content";
import { projectById } from "@/lib/projects";

/* Opening: who it's for, what we do, why it matters, and a working example */
export function Hero() {
  return (
    <section className="frame grid gap-14 pt-10 pb-20 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28">
      <div className="min-w-0 lg:col-span-7 lg:pt-6">
        <p className="text-[14px] font-medium text-muted">{HERO.kicker}</p>
        <h1 className="mt-6 font-display text-[clamp(42px,5.6vw,82px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
          Every business has a{" "}
          <span className="relative inline-block whitespace-nowrap">
            slow part.
            {/* Hand-drawn underline: the pain point the whole site is about */}
            <svg viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden className="draw absolute -bottom-[0.12em] left-0 h-[0.2em] w-[92%] text-signal">
              <path d="M3 12c50-7 120-10 190-6 35 2 70 4 104-1" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>{" "}
          We write the software that fixes it.
        </h1>
        <p className="t-lead mt-8 max-w-[46ch]">{HERO.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <ButtonLink href="/contact">Start a project</ButtonLink>
          <ArrowLink href="/work">See what we&apos;ve built</ArrowLink>
        </div>
        <p className="mt-14 flex max-w-[52ch] gap-4 border-t border-line pt-5 text-[14px] leading-relaxed text-muted">
          <span className="mono shrink-0 text-ink">O(n)&nbsp;→&nbsp;O(1)</span>
          <span>{HERO.name}</span>
        </p>
      </div>
      <div className="min-w-0 lg:col-span-5">
        <HeroWorkflow />
        <p className="mt-3 text-[13px] text-muted">An example of the kind of automation we build. Sample data.</p>
      </div>
    </section>
  );
}

/* Evidence first: real, live products, one large and two supporting */
export function WorkProof() {
  const [lead, ...rest] = ["nexora", "hirearn", "lumora"].map((id) => projectById(id)!);
  return (
    <section aria-labelledby="work-title" className="border-t border-line">
      <div className="frame py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-title" className="t-1 max-w-[16ch]">
            Shipped, live, in use.
          </h2>
          <ArrowLink href="/work">All projects</ArrowLink>
        </div>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Link href={`/work#${lead.id}`} className="group block">
              <Shot project={lead} sizes="(min-width: 1024px) 720px, 100vw" />
              <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
                <h3 className="t-2 transition-colors group-hover:text-blue">{lead.name}</h3>
                <p className="text-[14px] text-muted">{lead.kind}</p>
              </div>
              <p className="mt-3 max-w-[52ch] text-[16px]">{lead.summary}</p>
            </Link>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-10">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <Link href={`/work#${p.id}`} className="group grid gap-5 lg:grid-cols-2">
                  <Shot project={p} sizes="(min-width: 1024px) 300px, 50vw" />
                  <div className="min-w-0">
                    <h3 className="t-3 transition-colors group-hover:text-blue">{p.name}</h3>
                    <p className="mt-1 text-[14px] text-muted">{p.kind}</p>
                    <p className="mt-3 text-[15px]">{p.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Context: the visitor recognises their own problem */
export function Problems() {
  return (
    <section aria-labelledby="problems-title" className="bg-paper-2">
      <div className="frame py-20 md:py-28">
        <div className="mb-12 max-w-[760px] md:mb-16">
          <p className="kicker">Which one is you?</p>
          <h2 id="problems-title" className="t-1 mt-4">
            Most projects start with one sentence.
          </h2>
        </div>
        <ProblemPicker />
      </div>
    </section>
  );
}

/* Exploration: the four services as an index, not a card grid */
export function ServicesIndex() {
  return (
    <section aria-labelledby="services-title">
      <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="services-title" className="t-2 max-w-[12ch]">
              Four things, done properly.
            </h2>
            <p className="mt-5 max-w-[34ch] text-[16px]">
              We keep a narrow focus so every project gets our full attention. Websites, design and care plans come with
              them when you need them.
            </p>
            <ArrowLink href="/services" className="mt-8">
              How each one works
            </ArrowLink>
          </div>
        </div>
        <ol className="border-t border-ink lg:col-span-8">
          {SERVICES.map((s) => (
            <li key={s.id} className="border-b border-line">
              <Link href={`/services#${s.id}`} className="group grid gap-3 py-7 md:grid-cols-[64px_1fr_auto] md:gap-6 md:py-9">
                <span className="mono pt-2 text-muted transition-colors group-hover:text-blue">{s.num}</span>
                <span>
                  <span className="t-2 block transition-colors group-hover:text-blue">{s.title}</span>
                  <span className="mt-3 block max-w-[52ch] text-[16px]">{s.short}</span>
                  <span className="mono mt-4 block text-[12px] text-muted">{s.builds.slice(0, 3).join("  /  ")}</span>
                </span>
                <span
                  aria-hidden
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-paper md:flex"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Trust: how the work is engineered, and with what */
export function HowWeBuild() {
  return (
    <section aria-labelledby="build-title" className="tone-ink">
      <div className="frame py-20 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="build-title" className="t-1 lg:col-span-5">
            Built like it has to last. Because it does.
          </h2>
          <p className="t-lead self-end lg:col-span-6 lg:col-start-7">
            Your business will depend on what we build, so every project gets the same engineering basics, from a small
            automation to a full platform.
          </p>
        </div>
        <ol className="mt-16 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 90} className="border-b border-line py-8">
              <p className="mono text-blue">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-3 mt-4">{title}</h3>
              <p className="mt-3 max-w-[40ch] text-[15px]">{text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <h3 className="text-[15px] font-semibold text-ink lg:col-span-3">The tools we use</h3>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {STACK.map(([group, tools]) => (
              <div key={group}>
                <dt className="text-[13px] text-muted">{group}</dt>
                <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
                  {tools.map((t) => (
                    <TechLogo key={t} name={t} />
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* The person behind it, and the terms they stand behind */
export function Founder() {
  return (
    <section aria-labelledby="founder-title">
      <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-4">
          <Image
            src={FOUNDER.photo}
            alt={`${FOUNDER.name}, ${FOUNDER.role}`}
            width={480}
            height={480}
            className="aspect-[4/5] w-full max-w-[360px] object-cover object-top"
          />
          <figcaption className="mt-4 text-[15px]">
            <span className="font-semibold text-ink">{FOUNDER.name}</span>
            <span className="text-muted"> · {FOUNDER.role}</span>
          </figcaption>
        </figure>
        <div className="lg:col-span-8 lg:pt-4">
          <h2 id="founder-title" className="sr-only">
            A note from the founder
          </h2>
          <blockquote className="space-y-6">
            <p className="t-1 max-w-[18ch]">&ldquo;{FOUNDER.note[0]}&rdquo;</p>
            <p className="max-w-[56ch] text-[18px] leading-relaxed">{FOUNDER.note[1]}</p>
          </blockquote>
          <dl className="mt-14 grid grid-cols-2 border-t border-line md:grid-cols-4">
            {TERMS.map(([term, detail]) => (
              <div key={term} className="border-b border-line py-5 pr-4 md:border-b-0">
                <dt className="text-[15px] font-semibold text-ink">{term}</dt>
                <dd className="mt-1 text-[14px] leading-snug text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* Conversion support: the questions that stop people from writing */
export function HomeFaq() {
  return (
    <section aria-labelledby="faq-title" className="bg-paper-2">
      <div className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="t-1">
            Before you write to us.
          </h2>
          <ArrowLink href="/services#faq" className="mt-8">
            More questions
          </ArrowLink>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={HOME_FAQ} />
        </div>
      </div>
    </section>
  );
}
