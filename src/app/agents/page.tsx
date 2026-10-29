import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { CONNECTIONS, FAQ, PLANS, PROBLEMS, STEPS, TRUST } from "@/lib/agents";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { AgentSelectionProvider } from "@/components/agents/AgentSelection";
import { MobileBookBar, PageBar } from "@/components/agents/PageBar";
import { HeroPreview } from "@/components/agents/HeroPreview";
import { AgentCatalogue } from "@/components/agents/AgentCatalogue";
import { BookPanel } from "@/components/agents/BookPanel";
import { cn } from "@/lib/utils";

const title = "bigO Agents — AI agents that answer, qualify and book, around the clock | bigO";
const description =
  "AI agents for your website, WhatsApp and phone: support, lead qualification, booking, sales, follow-ups and AI calling agents that answer and make calls. Early access: pre-book a founding-client slot.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agents" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/agents" },
  twitter: { title, description },
};

/* Demo-call calendar. Set NEXT_PUBLIC_CAL_LINK to a Cal.com path such as
   "bigo/agents-demo" (for cal.com/bigo/agents-demo). Without it the demo tab
   offers WhatsApp and the contact page instead. */
const CAL_LINK = (process.env.NEXT_PUBLIC_CAL_LINK || "").replace(/^\/+|\/+$/g, "");

/* FAQ as structured data, so search engines can show the answers */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

/* The global scroll-padding clears the site header; on desktop the page bar
   needs a little more */
const ANCHOR = "md:scroll-mt-12";

const pad = (n: number) => String(n).padStart(2, "0");

function SectionHead({ num, kicker, title, lead, id }: { num: string; kicker: string; title: string; lead?: string; id: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="kicker">
          <span className="mono mr-2 text-muted">{num}</span>
          {kicker}
        </p>
        <h2 id={id} className="t-1 mt-4">
          {title}
        </h2>
      </div>
      {lead && <p className="t-lead self-end lg:col-span-5">{lead}</p>}
    </div>
  );
}

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M5.5 2.5H3.5a1 1 0 0 0-1 1.1C3 9 7 13 12.4 13.5a1 1 0 0 0 1.1-1v-2l-2.5-1-1.2 1.3a7.5 7.5 0 0 1-3.6-3.6L7.5 6 6.5 3.5z" />
  </svg>
);
const WebIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="3" width="12" height="10" />
    <path d="M2 6h12" />
  </svg>
);

const CALL_STEPS: { at: string; label: string; text: string }[] = [
  { at: "0:00", label: "Ringing", text: "A new caller rings your business line after hours." },
  { at: "0:02", label: "Answered", text: "The agent picks up, greets them and asks how it can help." },
  { at: "2:48", label: "Booked", text: "It checks your calendar and books a site visit on the call." },
  { at: "3:12", label: "Summary sent", text: "You get the transcript, a summary and the lead details." },
];

const CALL_SUMMARY: [string, string][] = [
  ["Caller", "Rahul M., new enquiry"],
  ["Duration", "3 min 12 s"],
  ["Wanted", "2 BHK to rent near Sector 15, budget agreed"],
  ["Outcome", "Site visit booked, Saturday 11:00"],
  ["Next step", "WhatsApp confirmation sent"],
];

export default function AgentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <AgentSelectionProvider>
        <PageBar />
        <main id="main">
          {/* 01 Opening */}
          <section className="frame grid gap-14 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-7 lg:pt-4">
              <p className="kicker flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                bigO Agents · Early access
              </p>
              <h1 className="mt-5 font-display text-[clamp(40px,5.4vw,76px)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink">
                Every enquiry answered. Every lead captured.
              </h1>
              <p className="t-lead mt-7 max-w-[48ch]">
                AI agents for your website, WhatsApp and phone. They answer customers in seconds, qualify them, book
                appointments, make calls, and hand over to your team when a person is needed.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="#demo">Book a demo</ButtonLink>
                <ArrowLink href="#prebook">Pre-book your agent</ArrowLink>
              </div>
              <ul aria-label="Channels" className="mt-12 grid max-w-[520px] grid-cols-3 border-t border-line">
                {[
                  { label: "Web", text: "Chat on your site", icon: <WebIcon className="h-4 w-4" /> },
                  { label: "WhatsApp", text: "Your business number", icon: <WhatsAppIcon className="h-4 w-4" /> },
                  { label: "Phone", text: "Inbound and outbound", icon: <PhoneIcon className="h-4 w-4" /> },
                ].map((c, i) => (
                  <li key={c.label} className={cn("pt-4", i > 0 && "border-l border-line pl-4")}>
                    <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      {c.icon}
                      {c.label}
                    </p>
                    <p className="mt-1 text-[13px] text-muted">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <HeroPreview />
              <p className="mt-3 text-[13px] text-muted">Example conversations. Switch between chat and a phone call.</p>
            </div>
          </section>

          {/* 02 Problem */}
          <section aria-labelledby="problem-title" className="border-t border-line bg-paper-2">
            <div className="frame py-20 md:py-24">
              <SectionHead
                num="02"
                kicker="The problem"
                id="problem-title"
                title="Customers message at 11 pm. Your team replies at 10 am."
              />
              <ol className="mt-12 grid border-t border-ink md:grid-cols-3">
                {PROBLEMS.map(([name, text], i) => (
                  <Reveal
                    as="li"
                    key={name}
                    delay={i * 90}
                    className="border-b border-line py-8 md:border-b-0 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10"
                  >
                    <p className="mono text-blue">{pad(i + 1)}</p>
                    <h3 className="t-3 mt-3">{name}</h3>
                    <p className="mt-3 text-[16px]">{text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* 03 Catalogue */}
          <section id="agents" aria-labelledby="agents-title" className={ANCHOR}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="03"
                kicker="The agents"
                id="agents-title"
                title="Ten agents. Start with one."
                lead="Pick the job your business needs done most, then add others as you grow. Choose an agent to see what it does."
              />
              <div className="mt-12">
                <AgentCatalogue />
              </div>
            </div>
          </section>

          {/* 04 AI calling agent */}
          <section id="calling" aria-labelledby="calling-title" className={cn("tone-ink", ANCHOR)}>
            <div className="frame py-20 md:py-28">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <p className="kicker flex items-center gap-2">
                    <span className="mono mr-1 text-muted">04</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                    AI calling agent
                  </p>
                  <h2 id="calling-title" className="t-1 mt-4 max-w-[13ch]">
                    Never miss a phone call again.
                  </h2>
                  <p className="t-lead mt-6">
                    A voice agent that answers your business line, calls new leads back, books appointments on the call
                    and sends you a summary of every conversation. English and Hindi to start.
                  </p>
                  <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">Inbound</h3>
                      <ul className="mt-3 space-y-2 text-[15px]">
                        <li>Picks up every call, day or night</li>
                        <li>Answers from your own knowledge</li>
                        <li>Books while on the call</li>
                        <li>Transfers to your team on request</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">Outbound</h3>
                      <ul className="mt-3 space-y-2 text-[15px]">
                        <li>Calls new leads back quickly</li>
                        <li>Follows up on open quotes</li>
                        <li>Confirms and reminds about bookings</li>
                        <li>Only to people who agreed to a call</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 lg:col-span-6 lg:col-start-7">
                  <p className="mono text-[12px] text-muted">Example · one inbound call</p>
                  <ol className="mt-4 grid border-t border-line sm:grid-cols-4">
                    {CALL_STEPS.map((s, i) => (
                      <Reveal
                        as="li"
                        key={s.label}
                        delay={i * 110}
                        className="relative border-b border-line py-5 sm:border-b-0 sm:pr-4 sm:[&:not(:first-child)]:pl-4"
                      >
                        {/* The step marker sits on the top rule, like a point on a timeline */}
                        <span aria-hidden className={cn("absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full", i === CALL_STEPS.length - 1 ? "bg-signal" : "bg-blue", i > 0 && "sm:left-4")} />
                        <p className="mono text-[12px] text-muted">{s.at}</p>
                        <p className="mt-2 text-[16px] font-semibold text-ink">{s.label}</p>
                        <p className="mt-1.5 text-[14px] leading-snug">{s.text}</p>
                      </Reveal>
                    ))}
                  </ol>

                  <figure className="browser mt-10">
                    <div className="browser-bar">
                      <i />
                      <i />
                      <i />
                      <span className="mono ml-3 flex items-center gap-2 text-[12px] text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                        Call summary · example
                      </span>
                    </div>
                    <dl className="divide-y divide-line px-5 md:px-6">
                      {CALL_SUMMARY.map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[96px_1fr] gap-3 py-3 text-[15px]">
                          <dt className="mono pt-0.5 text-[12px] text-muted">{k}</dt>
                          <dd className="text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* 05 How it works */}
          <section id="how" aria-labelledby="how-title" className={ANCHOR}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="05"
                kicker="How it works"
                id="how-title"
                title="Live in days, not months."
                lead="We set it up with you. You don't configure anything yourself unless you want to."
              />
              <ol className="mt-12 grid gap-10 border-t border-ink pt-10 md:grid-cols-3">
                {STEPS.map((s, i) => (
                  <Reveal as="li" key={s.title} delay={i * 100}>
                    <p className="flex items-center gap-3">
                      <span className="mono flex h-8 w-8 items-center justify-center border border-line-strong text-[12px] text-blue">
                        {pad(i + 1)}
                      </span>
                      {i < STEPS.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />}
                    </p>
                    <h3 className="t-3 mt-5">{s.title}</h3>
                    <p className="mt-3 text-[16px]">{s.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* 06 Connections */}
          <section aria-labelledby="connect-title" className="border-t border-line bg-paper-2">
            <div className="frame py-20 md:py-24">
              <SectionHead
                num="06"
                kicker="Connects to your tools"
                id="connect-title"
                title="Works with what you already use."
                lead="We connect your agent to your calendar, CRM, messaging and phone, so leads and bookings land where your team already works."
              />
              <dl className="mt-12 grid gap-x-10 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
                {CONNECTIONS.map(([group, tools]) => (
                  <div key={group} className="border-b border-line py-7">
                    <dt className="text-[13px] font-semibold text-muted">We connect to</dt>
                    <dd>
                      <p className="t-3 mt-1">{group}</p>
                      <ul className="mt-4 space-y-2 text-[15px] text-ink">
                        {tools.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-[70ch] text-[14px] text-muted">
                Using something else? If it has an API, we can usually connect it. Product names belong to their owners;
                listing them doesn&apos;t mean a partnership.
              </p>
            </div>
          </section>

          {/* 07 Trust and data */}
          <section aria-labelledby="trust-title">
            <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="kicker">
                  <span className="mono mr-2 text-muted">07</span>
                  Trust and data
                </p>
                <h2 id="trust-title" className="t-1 mt-4">
                  Safe to put in front of your customers.
                </h2>
              </div>
              <dl className="grid border-t border-ink sm:grid-cols-2 lg:col-span-8">
                {TRUST.map(([name, text], i) => (
                  <Reveal key={name} delay={(i % 2) * 90} className="border-b border-line py-7 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                    <dt className="t-3">{name}</dt>
                    <dd className="mt-3 text-[16px]">{text}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </section>

          {/* 08 Pricing */}
          <section id="pricing" aria-labelledby="pricing-title" className={cn("border-t border-line", ANCHOR)}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="08"
                kicker="Pricing"
                id="pricing-title"
                title="One setup. One monthly plan."
                lead="Every plan is a one-time setup and a monthly fee covering hosting, AI usage and improvements. We quote after a short call, based on your channels and volume."
              />
              <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
                {PLANS.map((p) => (
                  <div key={p.name} className={cn("flex flex-col bg-paper p-7 md:p-8", p.featured && "bg-raised")}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="t-2">{p.name}</h3>
                      {p.featured && <span className="mono text-[12px] text-blue">Chat + phone</span>}
                    </div>
                    <p className="mt-3 min-h-[3em] text-[16px]">{p.for}</p>
                    <ul className="mt-6 flex-1 border-t border-line">
                      {p.includes.map((item) => (
                        <li key={item} className="flex gap-3 border-b border-line py-2.5 text-[15px] text-ink">
                          <span aria-hidden className="text-blue">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <p className="mono text-[12px] text-muted">Setup + monthly</p>
                      <p className="mt-1 text-[17px] font-semibold text-ink">Price on a call</p>
                      {p.name === "Agency" ? (
                        <ArrowLink href="#prebook" className="mt-5">
                          Apply as a partner
                        </ArrowLink>
                      ) : (
                        <ArrowLink href="#demo" className="mt-5">
                          Talk about {p.name}
                        </ArrowLink>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-6 border-l-2 border-signal bg-raised p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                <div>
                  <p className="t-3">Founding-client offer</p>
                  <p className="mt-2 max-w-[62ch] text-[16px]">
                    The first businesses to join get a reduced setup fee in return for honest feedback and a short case
                    study. Pre-booking holds your slot, with nothing to pay now.
                  </p>
                </div>
                <ButtonLink href="#prebook" className="w-fit">
                  Pre-book a slot
                </ButtonLink>
              </div>
            </div>
          </section>

          {/* 09 Book */}
          <section id="book" aria-labelledby="book-title" className={cn("bg-paper-2", ANCHOR)}>
            {/* Link targets for each tab; the tab opens from the hash */}
            <span id="demo" className={cn("block", ANCHOR)} aria-hidden />
            <span id="prebook" className={cn("block", ANCHOR)} aria-hidden />
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="09"
                kicker="Get started"
                id="book-title"
                title="See it on a call, or reserve your slot."
                lead="A 20-minute demo shows a working agent on enquiries like yours. Ready already? Pre-book a founding-client slot."
              />
              <div className="mt-12">
                <BookPanel calLink={CAL_LINK} />
              </div>
            </div>
          </section>

          {/* 10 FAQ */}
          <section aria-labelledby="faq-title" className="border-t border-line">
            <div className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="kicker">
                  <span className="mono mr-2 text-muted">10</span>
                  FAQ
                </p>
                <h2 id="faq-title" className="t-1 mt-4">
                  Questions
                </h2>
              </div>
              <div className="lg:col-span-8">
                <FaqList items={FAQ} />
              </div>
            </div>
          </section>
        </main>
        <MobileBookBar />
      </AgentSelectionProvider>
      <SiteFooter />
    </>
  );
}
