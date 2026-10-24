import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { PROJECTS, type Project } from "@/lib/projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { TechLogo } from "@/components/ui/TechLogo";
import { cn } from "@/lib/utils";

const title = "Work — Nexora, OyeExpress, Lumora Dental, Mahanakorn and more | bigO";
const description =
  "Projects bigO has designed, built and shipped: Nexora, an AI data pipeline; Lumora Dental, a clinic website with booking; OyeExpress, a furniture sourcing website; two open-source email automations; and Mahanakorn, an ongoing engagement for a Thai caterer from Bangkok.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/work" },
  twitter: { title, description },
};

const pad = (n: number) => String(n).padStart(2, "0");

/** For projects with no public screens: how it works, drawn as numbered
 *  steps on a dark panel the same shape as a screenshot */
function Cover({ p }: { p: Project }) {
  const steps = p.flow ?? [];
  // Up to four steps a row, so short and long flows both fill the panel
  const cols = steps.length <= 3 ? "sm:grid-cols-3" : steps.length === 5 ? "sm:grid-cols-5" : "sm:grid-cols-4";
  return (
    <div className="tone-ink flex min-h-full flex-col justify-between gap-10 border border-line bg-paper p-6 sm:aspect-[16/9] sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="mono text-[12px] text-muted">
          {p.status === "Ongoing" ? "Scope of the engagement" : "How it works"}
        </p>
        <p className="mono text-[12px] text-muted">{steps.length} steps</p>
      </div>
      <ol className={cn("grid grid-cols-2 border-t border-l border-line", cols)}>
        {steps.map((s, i) => (
          <li key={s} className="flex min-h-[112px] flex-col justify-between gap-6 border-r border-b border-line p-4">
            <span className="flex items-center justify-between">
              <span className="mono text-[12px] text-blue">{pad(i + 1)}</span>
              {i < steps.length - 1 && (
                <span aria-hidden className="text-muted">
                  →
                </span>
              )}
            </span>
            <span className="text-[15px] font-medium leading-snug text-ink">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Media({ p, priority }: { p: Project; priority?: boolean }) {
  return p.image ? (
    <Shot project={p} sizes="(min-width: 1024px) 800px, 100vw" priority={priority} aspect="aspect-[16/9]" />
  ) : (
    <Cover p={p} />
  );
}

/** One case study: the same structure for every project, so they can be
 *  compared at a glance. Header, then screen beside the key facts, then
 *  challenge, solution and highlights in three short columns. */
function CaseStudy({ p, num, priority }: { p: Project; num: number; priority?: boolean }) {
  const live = p.links.find((l) => l.label === "Live site");
  const others = p.links.filter((l) => l !== live);
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="scroll-mt-20 border-t border-line">
      <div className="frame py-16 md:py-24">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mono text-muted">
              {pad(num)} <span className="mx-1.5 text-line-strong">/</span> {p.kind}
            </p>
            <h2 id={`${p.id}-title`} className="t-2 mt-3">
              {p.name}
            </h2>
            <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed">{p.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-4 lg:justify-end">
            {live && (
              <ButtonLink href={live.href} external>
                Visit live site
              </ButtonLink>
            )}
            {others.map((l) => (
              <ArrowLink key={l.href} href={l.href} external>
                {l.label}
              </ArrowLink>
            ))}
          </div>
        </div>

        {/* Screen + facts */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <Media p={p} priority={priority} />
            {p.video && <p className="mt-3 text-[13px] text-muted">Screen recording of the live site.</p>}
          </Reveal>
          <dl className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <Fact label="Status">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    p.status === "Ongoing" ? "animate-pulse bg-signal motion-reduce:animate-none" : p.status === "Live" ? "bg-[#1f9d55]" : "bg-blue",
                  )}
                />
                {p.status}
                {p.url && <span className="truncate text-muted">· {p.url}</span>}
              </span>
            </Fact>
            <Fact label="What we did">{p.services.join(", ")}</Fact>
            {p.stack.length > 0 && (
              <Fact label="Built with" className="sm:col-span-2 lg:col-span-1">
                <span className="flex flex-wrap gap-x-4 gap-y-2">
                  {p.stack.map((t) => (
                    <TechLogo key={t} name={t} />
                  ))}
                </span>
              </Fact>
            )}
          </dl>
        </div>

        {/* Story */}
        <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-10">
          <div>
            <h3 className="text-[13px] font-semibold text-muted">The challenge</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink">{p.problem}</p>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-muted">What we built</h3>
            <p className="mt-3 text-[16px] leading-relaxed">{p.built}</p>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-muted">Highlights</h3>
            <ol className="mt-3">
              {p.features.map((f, i) => (
                <li key={f} className="flex gap-3 border-b border-line py-2.5 text-[15px] first:pt-0 last:border-b-0">
                  <span className="mono pt-0.5 text-[12px] text-blue">{pad(i + 1)}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ol>
            {p.result && <p className="mt-5 text-[16px] font-semibold text-ink">{p.result}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}

function Fact({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("border-t border-line py-4", className)}>
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className="mt-1.5 text-[15px] text-ink">{children}</dd>
    </div>
  );
}

export default function WorkPage() {
  const live = PROJECTS.filter((p) => p.status === "Live").length;
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Opening + index */}
        <section className="frame grid gap-12 pt-14 pb-16 md:pt-20 md:pb-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kicker">Work</p>
            <h1 className="t-1 mt-4">Software we&apos;ve shipped.</h1>
            <p className="t-lead mt-6 max-w-[44ch]">
              Every project started with a business problem. For each one: the challenge, what we built, and the product
              itself.
            </p>
            <p className="mono mt-8 text-muted">
              {PROJECTS.length} projects · {live} live
            </p>
          </div>
          <nav aria-label="Projects" className="self-end lg:col-span-6">
            <ol className="border-t border-ink">
              {PROJECTS.map((p, i) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="group grid grid-cols-[32px_1fr_auto] items-baseline gap-3 border-b border-line py-3 sm:grid-cols-[32px_1fr_1fr_auto]"
                  >
                    <span className="mono text-muted">{pad(i + 1)}</span>
                    <span className="text-[16px] font-semibold text-ink transition-colors group-hover:text-blue">{p.name}</span>
                    <span className="hidden text-[14px] text-muted sm:block">{p.kind}</span>
                    <span aria-hidden className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-blue">
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {PROJECTS.map((p, i) => (
          <CaseStudy key={p.id} p={p} num={i + 1} priority={i === 0} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
