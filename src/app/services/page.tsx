import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { ALSO, FAQ, SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { FaqList } from "@/components/ui/FaqList";

const title = "Services — bigO";
const description =
  "Web apps and internal tools, client portals, AI chatbots and assistants, and workflow automation and integrations, built at a fixed price by a small engineering studio.";

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

function List({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="label">{label}</p>
      <ul className="mt-4 border-t border-line">
        {items.map((item) => (
          <li key={item} className="border-b border-line py-3 text-[16px] text-ink">
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
        <PageHeader
          label="Services"
          title="Software and automation, built around your business."
          lead="We do four kinds of work and keep our focus there. Each one starts with a free call and ends with software you own."
        >
          <nav aria-label="Services" className="mt-12 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn("group bg-bg py-5 sm:pr-6", i % 2 ? "sm:pl-6" : "sm:pl-0", i === 0 ? "lg:pl-0" : "lg:pl-6")}
              >
                <span className="label">{s.num}</span>
                <span className="mt-2 block text-[16px] font-medium text-ink transition-colors group-hover:text-accent">
                  {s.title}
                </span>
              </a>
            ))}
          </nav>
        </PageHeader>

        {SERVICES.map((s) => {
          const example = s.example ? PROJECTS.find((p) => p.id === s.example) : undefined;
          return (
            <Section key={s.id} id={s.id} num={s.num} label="Service" title={s.title} intro={s.short}>
              <div className="md:grid md:grid-cols-12 md:gap-8">
                <div className="space-y-12 md:col-span-8 md:col-start-5">
                  <List label="A good fit if" items={s.fit} />
                  <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
                    <List label="What we build" items={s.builds} />
                    <List label="What's included" items={s.included} />
                  </div>
                  <dl className="border-y border-line py-5">
                    <dt className="label">Typical timeline</dt>
                    <dd className="mt-2 font-serif text-[24px] text-ink">
                      <Ph text={s.timeline} />
                    </dd>
                  </dl>
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <ArrowLink href="/contact">Discuss your project</ArrowLink>
                    {example && <ArrowLink href={`/work#${example.id}`}>See it in practice: {example.name}</ArrowLink>}
                  </div>
                </div>
              </div>
            </Section>
          );
        })}

        <Section
          id="also"
          num="05"
          label="Also available"
          title="The pieces around your software."
          intro="Websites, design, maintenance and marketing are available too, usually alongside the software we build, so the whole project sits with one team."
        >
          <dl className="border-t border-line">
            {ALSO.map(([name, text]) => (
              <div key={name} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-8">
                <dt className="text-[17px] font-medium text-ink md:col-span-4">{name}</dt>
                <dd className="text-[16px] md:col-span-8">{text}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="faq" num="06" label="Questions" title="Common questions.">
          <div className="md:grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8 md:col-start-5">
              <FaqList items={FAQ} />
            </div>
          </div>
        </Section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
