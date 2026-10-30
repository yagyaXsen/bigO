import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { BUILT_FOR, CONNECTIONS, FAQ, INDUSTRIES, PLANS, ROLLOUT } from "@/lib/agents";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { AgentSelectionProvider } from "@/components/agents/AgentSelection";
import { MobileBookBar, PageBar } from "@/components/agents/PageBar";
import { HeroPreview } from "@/components/agents/HeroPreview";
import { ProblemFinder } from "@/components/agents/ProblemFinder";
import { AgentCatalogue } from "@/components/agents/AgentCatalogue";
import { BookPanel } from "@/components/agents/BookPanel";
import { cn } from "@/lib/utils";

const title = "bigO Agents — AI agents for sales, support and operations teams | bigO";
const description =
  "AI agents for companies: they qualify leads, answer customers and partners, take orders, book appointments, chase payments and answer calls on your website, WhatsApp and phone, connected to your CRM and systems.";

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
const SystemsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M3 4c0-1 2.2-1.5 5-1.5S13 3 13 4v8c0 1-2.2 1.5-5 1.5S3 13 3 12zM3 4c0 1 2.2 1.5 5 1.5S13 5 13 4M3 8c0 1 2.2 1.5 5 1.5S13 9 13 8" />
  </svg>
);

const CALL_STEPS: { at: string; label: string }[] = [
  { at: "0:00", label: "Ringing" },
  { at: "0:02", label: "Answered" },
  { at: "2:48", label: "Booked" },
  { at: "3:12", label: "Summary sent" },
];

const CALL_SUMMARY: [string, string][] = [
  ["Caller", "Rahul M., new enquiry"],
  ["Duration", "3 min 12 s"],
  ["Wanted", "3 BHK in the Sector 62 project, budget agreed"],
  ["Outcome", "Site visit booked, Saturday 11:00"],
  ["Next step", "Lead created in CRM, WhatsApp confirmation sent"],
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
              <h1 className="mt-5 font-display text-[clamp(36px,4.3vw,62px)] leading-[1.02] font-semibold tracking-[-0.04em] text-ink">
                AI agents that take the repetitive work off your sales, support and operations teams.
              </h1>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="#demo">Book a demo</ButtonLink>
                <ArrowLink href="#problems">Find the agent you need</ArrowLink>
              </div>
              <ul aria-label="Where agents work" className="mt-12 grid max-w-[620px] grid-cols-2 border-t border-line sm:grid-cols-4">
                {[
                  { label: "Web", text: "Chat on your site", icon: <WebIcon className="h-4 w-4" /> },
                  { label: "WhatsApp", text: "Your business number", icon: <WhatsAppIcon className="h-4 w-4" /> },
                  { label: "Phone", text: "Inbound and outbound", icon: <PhoneIcon className="h-4 w-4" /> },
                  { label: "Your systems", text: "CRM, helpdesk, ERP", icon: <SystemsIcon className="h-4 w-4" /> },
                ].map((c, i) => (
                  <li key={c.label} className={cn("border-line pt-4 pb-2", i % 2 === 1 && "border-l pl-4", i > 1 && "sm:border-l sm:pl-4")}>
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

          {/* Who it's for, at a glance */}
          <section aria-label="Industries we build for" className="border-t border-line">
            <div className="frame flex flex-col gap-3 py-6 md:flex-row md:items-baseline md:gap-8">
              <p className="shrink-0 text-[13px] font-semibold text-muted">Built for</p>
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[15px] text-ink">
                {INDUSTRIES.map((ind, i) => (
                  <li key={ind.short} className="flex items-baseline gap-2">
                    {ind.short}
                    {i < INDUSTRIES.length - 1 && (
                      <span aria-hidden className="text-line-strong">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 02 Find your agent by problem */}
          <section id="problems" aria-labelledby="problems-title" className={cn("border-t border-line bg-paper-2", ANCHOR)}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="02"
                kicker="Find your agent"
                id="problems-title"
                title="Which of these sounds like your company?"
                lead="Pick the problem your team deals with most. We'll show you the agent for it and the work it takes off your team."
              />
              <div className="mt-12">
                <ProblemFinder />
              </div>
            </div>
          </section>

          {/* 03 All agents, by team */}
          <section id="agents" aria-labelledby="agents-title" className={ANCHOR}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="03"
                kicker="The agents"
                id="agents-title"
                title="One agent for every repetitive job. Start with one."
                lead="Every agent does one job well. See the problem it solves, how that work is done today, and what changes with the agent."
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
                  <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">Inbound</h3>
                      <ul className="mt-3 space-y-2 text-[15px]">
                        <li>Picks up every call, day or night</li>
                        <li>Handles peaks when every line is busy</li>
                        <li>Books while on the call</li>
                        <li>Transfers to your team on request</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">Outbound</h3>
                      <ul className="mt-3 space-y-2 text-[15px]">
                        <li>Calls your leads and qualifies them</li>
                        <li>Works through a whole lead list</li>
                        <li>Follows up on quotes and renewals</li>
                        <li>Confirms and reminds about bookings</li>
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
                        <span
                          aria-hidden
                          className={cn("absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full", i === CALL_STEPS.length - 1 ? "bg-signal" : "bg-blue", i > 0 && "sm:left-4")}
                        />
                        <p className="mono text-[12px] text-muted">{s.at}</p>
                        <p className="mt-2 text-[16px] font-semibold text-ink">{s.label}</p>
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

          {/* 05 Rollout */}
          <section id="how" aria-labelledby="how-title" className={ANCHOR}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="05"
                kicker="How it works"
                id="how-title"
                title="Start with one team. Scale when it works."
                lead="We run the setup with your team. Nobody on your side needs to configure anything."
              />
              <ol className="mt-12 grid gap-10 border-t border-ink pt-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
                {ROLLOUT.map((s, i) => (
                  <Reveal as="li" key={s.title} delay={i * 90}>
                    <p className="flex items-center gap-3">
                      <span className="mono flex h-8 w-8 shrink-0 items-center justify-center border border-line-strong text-[12px] text-blue">
                        {pad(i + 1)}
                      </span>
                      {i < ROLLOUT.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-line lg:block" />}
                    </p>
                    <h3 className="t-3 mt-5">{s.title}</h3>
                    <p className="mt-3 text-[15.5px]">{s.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* 06 Built for larger teams */}
          <section aria-labelledby="built-title" className="border-t border-line bg-paper-2">
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="06"
                kicker="Built for larger teams"
                id="built-title"
                title="Fits into how your company already works."
              />
              <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {BUILT_FOR.map(([name, text], i) => (
                  <Reveal key={name} delay={(i % 3) * 80} className="bg-paper-2 p-6 md:p-8">
                    <dt className="t-3">{name}</dt>
                    <dd className="mt-3 text-[16px]">{text}</dd>
                  </Reveal>
                ))}
              </dl>
              <div className="mt-14 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <h3 className="text-[15px] font-semibold text-ink">We connect to</h3>
                  <p className="mt-2 text-[14px] text-muted">
                    And most systems with an API. Names are for reference, not partnerships.
                  </p>
                </div>
                <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
                  {CONNECTIONS.map(([group, tools]) => (
                    <div key={group}>
                      <dt className="text-[13px] text-muted">{group}</dt>
                      <dd>
                        <ul className="mt-2 space-y-1.5 text-[15px] text-ink">
                          {tools.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* 07 Pricing */}
          <section id="pricing" aria-labelledby="pricing-title" className={ANCHOR}>
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="07"
                kicker="Pricing"
                id="pricing-title"
                title="Start with a pilot. Grow from there."
                lead="Every plan is a one-time setup and a monthly fee covering hosting, AI usage and improvements. We quote after a short call, based on your teams, channels and volume."
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
                      <ArrowLink href="#demo" className="mt-5">
                        Talk about {p.name}
                      </ArrowLink>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-px grid gap-4 border border-line bg-paper px-7 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8">
                <p className="text-[15px]">
                  <span className="font-semibold text-ink">Agency partners. </span>
                  Offer bigO Agents to your clients under your own brand and pricing, with us running the technology.
                </p>
                <ArrowLink href="#prebook" className="w-fit">
                  Apply as a partner
                </ArrowLink>
              </div>
              <div className="mt-8 grid gap-6 border-l-2 border-signal bg-raised p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                <div>
                  <p className="t-3">Founding-client offer</p>
                  <p className="mt-2 max-w-[62ch] text-[16px]">
                    The first companies to join get a reduced setup fee in return for honest feedback and a short case
                    study. Pre-booking holds your slot, with nothing to pay now.
                  </p>
                </div>
                <ButtonLink href="#prebook" className="w-fit">
                  Pre-book a slot
                </ButtonLink>
              </div>
            </div>
          </section>

          {/* 08 Book */}
          <section id="book" aria-labelledby="book-title" className={cn("bg-paper-2", ANCHOR)}>
            {/* Link targets for each tab; the tab opens from the hash */}
            <span id="demo" className={cn("block", ANCHOR)} aria-hidden />
            <span id="prebook" className={cn("block", ANCHOR)} aria-hidden />
            <div className="frame py-20 md:py-28">
              <SectionHead
                num="08"
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

          {/* 09 FAQ */}
          <section aria-labelledby="faq-title" className="border-t border-line">
            <div className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="kicker">
                  <span className="mono mr-2 text-muted">09</span>
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
