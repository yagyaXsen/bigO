import type { Metadata } from "next";
import Image from "next/image";
import { SITE_NAME } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { Ph, ScreenshotPlaceholder } from "@/components/ui/Placeholder";

const title = "Work — bigO";
const description =
  "Case studies from bigO: Nexora, an AI data pipeline; Hirearn, a local jobs marketplace; Lumora Dental, a clinic website with booking; and an ongoing engagement with a catering business in Thailand.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/work" },
  twitter: { title, description },
};

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
      <dt className="label sm:pt-1">{term}</dt>
      <dd className="text-[16px] md:text-[17px]">{children}</dd>
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader
          label="Work"
          title="Systems we've designed, built and shipped."
          lead="Each project starts with a business problem. Here is what we built for it, and what it does today."
        >
          <nav aria-label="Projects" className="mt-12 border-t border-line">
            {PROJECTS.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <span className="flex items-baseline gap-5">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[17px] font-medium text-ink transition-colors group-hover:text-accent">{p.name}</span>
                </span>
                <span className="label hidden sm:inline">{p.kind}</span>
              </a>
            ))}
          </nav>
        </PageHeader>

        {PROJECTS.map((p, i) => (
          <article key={p.id} id={p.id} className={i % 2 ? "border-t border-line" : "tone-muted border-t border-line"}>
            <div className="container-page grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-28">
              <header className="md:col-span-4">
                <p className="label">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2">—</span>
                  {p.kind}
                </p>
                <h2 className="mt-5 font-serif text-[36px] font-normal leading-[1.08] tracking-[-0.015em] md:text-[44px]">
                  {p.name}
                </h2>
                <p className="mt-4 inline-flex items-center gap-2 text-[14px] text-muted">
                  <span aria-hidden className={p.status === "Live" ? "h-1.5 w-1.5 rounded-full bg-accent" : "h-1.5 w-1.5 rounded-full border border-muted"} />
                  {p.url ? `${p.status} · ${p.url}` : p.status}
                </p>
                {p.links.length > 0 && (
                  <div className="mt-6 flex flex-col gap-2">
                    {p.links.map((l) => (
                      <ArrowLink key={l.href} href={l.href} external>
                        {l.label}
                      </ArrowLink>
                    ))}
                  </div>
                )}
              </header>

              <div className="md:col-span-8">
                {p.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover object-top" />
                  </div>
                ) : p.status === "Live" ? (
                  <ScreenshotPlaceholder caption={`${p.name}: main screen`} />
                ) : null}

                <dl className={p.status === "Live" ? "mt-10 border-t border-line" : "border-t border-line"}>
                  <Row term="The problem">{p.problem}</Row>
                  <Row term="What we built">{p.built}</Row>
                  <Row term="Key features">
                    <ul className="space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Row>
                  <Row term="Result">
                    <Ph text={p.result} />
                  </Row>
                  {p.stack.length > 0 && <Row term="Stack">{p.stack.join(", ")}</Row>}
                </dl>
              </div>
            </div>
          </article>
        ))}

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
