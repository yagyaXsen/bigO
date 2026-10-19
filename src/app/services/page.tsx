import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { ALSO, FAQ, SERVICES } from "@/lib/content";
import { projectById } from "@/lib/projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Shot } from "@/components/ui/Shot";
import { ServiceHelper } from "@/components/ServiceHelper";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";

const title = "Services — web apps, client portals, AI assistants and automation | bigO";
const description =
  "What bigO builds and how: custom web apps and internal tools, client portals, AI assistants and chatbots, and workflow automation and integrations. Free first call, scope agreed in writing, you own the code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/services" },
  twitter: { title, description },
};

/* FAQ as structured data, so search engines can show the answers */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const INDEX = [
  ...SERVICES.map((s) => ({ id: s.id, label: s.title, num: s.num })),
  { id: "also", label: "Also available" },
  { id: "faq", label: "Questions" },
];

function Rows({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold text-ink">{title}</h3>
      <ul className="mt-3 border-t border-line">
        {items.map((item) => (
          <li key={item} className="border-b border-line py-3 text-[16px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main id="main">
        {/* Opening: what's on offer, and a way in for the unsure */}
        <section className="frame grid gap-10 pt-12 pb-16 md:pt-20 lg:grid-cols-12">
          <h1 className="t-hero lg:col-span-7">Four things we build.</h1>
          <div className="self-end lg:col-span-5">
            <p className="t-lead">
              Each one starts with a free call and ends with software you own. If you already know what you need, jump
              straight to it. If not, the two questions below will point you the right way.
            </p>
          </div>
        </section>

        <section aria-labelledby="helper-title" className="bg-paper-2">
          <div className="frame py-16 md:py-20">
            <h2 id="helper-title" className="t-2 mb-10 max-w-[22ch]">
              Not sure which? Answer two questions.
            </h2>
            <ServiceHelper />
          </div>
        </section>

        {/* Body: sticky index left, one spec sheet per service right */}
        <div className="frame grid gap-10 lg:grid-cols-12">
          <aside className="hidden pt-20 lg:col-span-3 lg:block">
            <ScrollSpyNav items={INDEX} label="Services on this page" />
          </aside>

          <div className="lg:col-span-9">
            {SERVICES.map((s) => {
              const example = s.example ? projectById(s.example) : undefined;
              return (
                <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="border-b border-line py-20 md:py-24">
                  <p className="mono text-blue">{s.num}</p>
                  <h2 id={`${s.id}-title`} className="t-1 mt-3 max-w-[16ch]">
                    {s.title}
                  </h2>
                  <p className="t-lead mt-6 max-w-[52ch]">{s.short}</p>

                  <div className="mt-12 border-l-2 border-blue pl-6">
                    <h3 className="text-[14px] font-semibold text-ink">A good fit if</h3>
                    <ul className="mt-3 space-y-2">
                      {s.fit.map((f) => (
                        <li key={f} className="font-display text-[20px] leading-snug tracking-[-0.01em] text-ink md:text-[22px]">
                          {f}.
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 grid gap-10 md:grid-cols-2">
                    <Rows title="What we build" items={s.builds} />
                    <Rows title="What's included" items={s.included} />
                  </div>

                  <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    {example?.image ? (
                      <Link href={`/work#${example.id}`} className="group flex items-center gap-5">
                        <Shot project={example} sizes="200px" className="w-[180px] shrink-0" />
                        <span>
                          <span className="block text-[13px] text-muted">In practice</span>
                          <span className="t-3 block transition-colors group-hover:text-blue">{example.name} →</span>
                        </span>
                      </Link>
                    ) : (
                      <span />
                    )}
                    <ArrowLink href={`/contact?type=${s.id}`}>Discuss a project like this</ArrowLink>
                  </div>
                </article>
              );
            })}

            <section id="also" aria-labelledby="also-title" className="border-b border-line py-20 md:py-24">
              <h2 id="also-title" className="t-2 max-w-[22ch]">
                Around the software, when you need it.
              </h2>
              <dl className="mt-10 border-t border-ink">
                {ALSO.map(([name, text]) => (
                  <div key={name} className="grid gap-1 border-b border-line py-5 md:grid-cols-[260px_1fr] md:gap-8">
                    <dt className="text-[16px] font-semibold text-ink">{name}</dt>
                    <dd className="text-[16px]">{text}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-24">
              <h2 id="faq-title" className="t-2 mb-10">
                Questions
              </h2>
              <FaqList items={FAQ} />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
