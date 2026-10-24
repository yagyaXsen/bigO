import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { PROJECTS, projectById, type Project } from "@/lib/projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { cn } from "@/lib/utils";

const title = "Work — Nexora, Hirearn, OyeExpress, Lumora Dental and more | bigO";
const description =
  "Projects bigO has designed, built and shipped: Nexora, an AI data pipeline; Hirearn, a local jobs marketplace; Lumora Dental, a clinic website with booking; OyeExpress, a furniture sourcing website; two open-source email automations; and an ongoing engagement for a catering business in Thailand.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/work" },
  twitter: { title, description },
};

/** Heading, problem, what we built, features, stack and links */
function Story({ p, num, className }: { p: Project; num: number; className?: string }) {
  return (
    <div className={className}>
      <p className="mono text-muted">
        {String(num).padStart(2, "0")} · {p.kind}
      </p>
      <h2 id={`${p.id}-title`} className="t-1 mt-4">
        {p.name}
      </h2>
      <p className="mt-3 inline-flex items-center gap-2 text-[14px] text-muted">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
        {p.status}
        {p.url && <span>· {p.url}</span>}
      </p>
      <p className="mt-8 font-display text-[21px] leading-snug tracking-[-0.01em] text-ink">{p.problem}</p>
      <p className="mt-5 text-[16px]">{p.built}</p>
      <ul className="mt-8 border-t border-line">
        {p.features.map((f) => (
          <li key={f} className="border-b border-line py-2.5 text-[15px]">
            {f}
          </li>
        ))}
      </ul>
      {p.result && <p className="mt-6 text-[16px] font-semibold text-ink">{p.result}</p>}
      {p.stack.length > 0 && <p className="mono mt-6 text-[12px] text-muted">{p.stack.join("  /  ")}</p>}
      {p.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
          {p.links.map((l) => (
            <ArrowLink key={l.href} href={l.href} external>
              {l.label}
            </ArrowLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkPage() {
  const nexora = projectById("nexora")!;
  const hirearn = projectById("hirearn")!;
  const lumora = projectById("lumora")!;
  const oye = projectById("oyeexpress")!;
  const tools = [projectById("outreach")!, projectById("job-outreach")!];
  const catering = projectById("catering")!;
  const n = (p: Project) => PROJECTS.indexOf(p) + 1;

  return (
    <>
      <SiteHeader />
      <main id="main" className="tone-ink">
        {/* Opening + index */}
        <section className="frame grid gap-12 pt-16 pb-20 md:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="t-hero">Work we&apos;ve shipped.</h1>
            <p className="t-lead mt-8 max-w-[44ch]">
              Every project here started with a business problem. Below is the problem, what we built for it, and the
              live product.
            </p>
          </div>
          <nav aria-label="Projects" className="self-end lg:col-span-5">
            <ol className="border-t border-ink">
              {PROJECTS.map((p, i) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="group grid grid-cols-[32px_1fr_auto] items-baseline gap-3 border-b border-line py-3.5">
                    <span className="mono text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[17px] font-semibold text-ink transition-colors group-hover:text-blue">{p.name}</span>
                    <span className="text-[13px] text-muted">{p.status}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* Nexora: the screen leads, full width; the story runs in three columns under it */}
        <article id={nexora.id} aria-labelledby={`${nexora.id}-title`} className="border-t border-line">
          <div className="frame py-20 md:py-28">
            <Reveal>
              <Shot project={nexora} sizes="(min-width: 1320px) 1210px, 100vw" priority />
            </Reveal>
            <Story p={nexora} num={n(nexora)} className="mt-14 lg:max-w-[760px]" />
          </div>
        </article>

        {/* Hirearn: story left, screen right */}
        <article id={hirearn.id} aria-labelledby={`${hirearn.id}-title`} className="border-t border-line">
          <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
            <Story p={hirearn} num={n(hirearn)} className="lg:col-span-4" />
            <Reveal className="lg:col-span-8 lg:pt-14">
              <Shot project={hirearn} sizes="(min-width: 1024px) 800px, 100vw" />
            </Reveal>
          </div>
        </article>

        {/* Lumora: a real scroll-through recording, then the story */}
        <article id={lumora.id} aria-labelledby={`${lumora.id}-title`} className="border-t border-line">
          <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <Shot project={lumora} sizes="(min-width: 1024px) 700px, 100vw" />
              <p className="mt-3 text-[13px] text-muted">Screen recording of the live site.</p>
            </Reveal>
            <Story p={lumora} num={n(lumora)} className="lg:col-span-5" />
          </div>
        </article>

        {/* OyeExpress: story left, screen right */}
        <article id={oye.id} aria-labelledby={`${oye.id}-title`} className="border-t border-line">
          <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
            <Story p={oye} num={n(oye)} className="lg:col-span-4" />
            <Reveal className="lg:col-span-8 lg:pt-14">
              <Shot project={oye} sizes="(min-width: 1024px) 800px, 100vw" />
            </Reveal>
          </div>
        </article>

        {/* Open-source automations: no screens, so two stories side by side */}
        <section aria-label="Open-source automations" className="border-t border-line">
          <div className="frame grid gap-16 py-20 md:py-28 lg:grid-cols-2 lg:gap-10">
            {tools.map((p) => (
              <article key={p.id} id={p.id} aria-labelledby={`${p.id}-title`}>
                <Story p={p} num={n(p)} />
              </article>
            ))}
          </div>
        </section>

        {/* Thailand: no public screens yet, so it's told as a short note */}
        <article id={catering.id} aria-labelledby={`${catering.id}-title`} className="border-t border-line">
          <div className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mono text-muted">
                {String(n(catering)).padStart(2, "0")} · {catering.kind}
              </p>
              <h2 id={`${catering.id}-title`} className="t-2 mt-4">
                {catering.name}
              </h2>
              <p className="mt-3 inline-flex items-center gap-2 text-[14px] text-muted">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none" />
                In progress
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="t-2 font-medium">{catering.problem}</p>
              <p className="mt-6 text-[17px]">{catering.built}</p>
              <ul className={cn("mt-8 grid gap-x-8 border-t border-line sm:grid-cols-2")}>
                {catering.features.map((f) => (
                  <li key={f} className="border-b border-line py-3 text-[15px]">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
