import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { SOCIAL } from "@/lib/contact";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { PrebookForm } from "@/components/agents/PrebookForm";

const title = "bigO Agents — AI agents that answer, qualify and book, around the clock | bigO";
const description =
  "bigO Agents answers your customers on your website and WhatsApp, qualifies every lead, books appointments and hands over to your team when a person is needed. Early access: pre-book a founding-client slot.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agents" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/agents" },
  twitter: { title, description },
};

/* Demo-call calendar. Set NEXT_PUBLIC_CAL_LINK to a Cal.com path such as
   "bigo/agents-demo" (for cal.com/bigo/agents-demo). Without it the section
   offers WhatsApp and the contact page instead. */
const CAL_LINK = (process.env.NEXT_PUBLIC_CAL_LINK || "").replace(/^\/+|\/+$/g, "");

const CAPABILITIES: [string, string][] = [
  [
    "Answers from your own knowledge",
    "Give it your FAQs, price lists, menus and policy PDFs. It answers from them and keeps a note of the source, so replies stay grounded in what you actually offer.",
  ],
  [
    "Qualifies every lead",
    "It asks the questions your team would ask: what they need, budget, timing, contact details. Every lead is saved and sent to you.",
  ],
  [
    "Books appointments",
    "Connected to your calendar, so customers book a call, a visit or a tasting inside the chat, without back-and-forth.",
  ],
  [
    "Hands over to a person",
    "When a question is sensitive or the agent isn't sure, the chat moves to your team with the full conversation. Nobody repeats themselves.",
  ],
  [
    "Works where your customers are",
    "Website chat and WhatsApp to start. Instagram and Messenger are next. One agent behind all of them.",
  ],
  [
    "Shows you what's working",
    "A simple dashboard: conversations, leads, bookings, and how often the agent needed a person.",
  ],
];

const STEPS = [
  {
    num: "01",
    title: "A call about your enquiries",
    text: "We look at the questions you get most, what a good lead looks like for you, and where your customers message you from.",
  },
  {
    num: "02",
    title: "We build and test your agent",
    text: "We load your knowledge, design the conversation, connect your calendar and channels, and test it against real questions before anyone sees it.",
  },
  {
    num: "03",
    title: "Live, then better every month",
    text: "It goes live on your site and WhatsApp. We review conversations with you and keep improving the answers and the flow.",
  },
];

const INDUSTRIES: [string, string][] = [
  ["Clinics and healthcare", "Treatment and pricing questions, consultation bookings, reminders."],
  ["Real estate", "Qualifies buyers by budget and location, books site visits."],
  ["Restaurants and catering", "Menus, event enquiries, guest counts and dates, tasting bookings."],
  ["Education and coaching", "Course questions, fees, counselling calls."],
  ["E-commerce", "Product questions, recommendations, shipping and returns."],
  ["Professional services", "Screens enquiries and books discovery calls for your team."],
];

const FAQ: [string, string][] = [
  [
    "Will it give my customers wrong answers?",
    "It answers from the knowledge you give it, and the steps that matter, like qualification and booking, follow a fixed flow rather than free generation. When it isn't confident, it hands the chat to your team instead of guessing.",
  ],
  [
    "Do I need any technical knowledge?",
    "No. We do the setup, the integrations and the updates. You get a dashboard to see conversations and leads, and you can change answers with us at any time.",
  ],
  [
    "What happens to my customers' data?",
    "Each business's data is kept separate from every other client's. Before you go live we walk you through exactly what is stored, where, and for how long, and we set retention to suit you.",
  ],
  [
    "What does pre-booking mean?",
    "bigO Agents is in early access. Pre-booking reserves one of a small number of founding-client slots, with a reduced setup fee in return for feedback. There's nothing to pay now; we'll contact you to plan your setup.",
  ],
  [
    "How is it priced?",
    "A one-time setup fee and a monthly plan. The monthly plan covers hosting, AI usage, your dashboard and ongoing improvements. We quote after the first call, because it depends on your channels and volume.",
  ],
  [
    "I run an agency. Can I offer this to my clients?",
    "Yes. Choose ‘Agency partner’ in the form. We're opening a white-label partner programme: your brand and your pricing, with us running the technology.",
  ],
];

const CHAT: { from: "user" | "agent"; text: string; note?: string }[] = [
  { from: "user", text: "Hi, do you do teeth whitening? How much is it?" },
  {
    from: "agent",
    text: "Yes, we offer in-clinic whitening, with pricing on our standard package. Would you like a free consultation first?",
    note: "From: Price list 2026",
  },
  { from: "user", text: "Yes, sometime next week" },
  { from: "agent", text: "I have Tuesday 11:00 or Thursday 16:30. Which suits you? And your name and phone number, please." },
  { from: "user", text: "Thursday. Priya, 98xxx xxx21" },
  { from: "agent", text: "Done, Priya. You're booked for Thursday at 16:30. A confirmation is on its way on WhatsApp." },
];

/* FAQ as structured data, so search engines can show the answers */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

function ChatDemo() {
  return (
    <figure className="browser">
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span className="mono ml-3 flex items-center gap-2 text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          Example: dental clinic agent
        </span>
      </div>
      <div className="space-y-3 p-5 md:p-6" aria-label="Example conversation">
        {CHAT.map((m, i) => (
          <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.from === "user"
                  ? "max-w-[82%] bg-ink px-4 py-2.5 text-[15px] leading-snug text-paper"
                  : "max-w-[82%] border border-line bg-paper px-4 py-2.5 text-[15px] leading-snug text-ink"
              }
            >
              {m.text}
              {m.note && <span className="mono mt-1.5 block text-[12px] text-blue">{m.note}</span>}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mono flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-5 py-3 text-muted md:px-6">
        <span>✓ Lead saved</span>
        <span>✓ Appointment booked</span>
        <span>✓ Team notified</span>
      </figcaption>
    </figure>
  );
}

export default function AgentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main id="main">
        {/* Opening */}
        <section className="frame grid gap-10 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              bigO Agents · Early access
            </p>
            <h1 className="t-hero mt-5">Every enquiry answered. Every lead captured.</h1>
          </div>
          <div className="flex flex-col justify-end gap-8 lg:col-span-4">
            <p className="t-lead">
              An AI agent for your website and WhatsApp. It answers customers in seconds, qualifies them, books
              appointments, and hands over to your team when a person is needed.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="#prebook">Pre-book your agent</ButtonLink>
              <ArrowLink href="#demo">Book a demo call</ArrowLink>
            </div>
          </div>
        </section>

        {/* Problem + example */}
        <section aria-labelledby="problem-title" className="border-t border-line">
          <div className="frame grid gap-12 py-20 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 id="problem-title" className="t-2 max-w-[18ch]">
                Customers message at 11 pm. Your team replies at 10 am.
              </h2>
              <div className="mt-6 space-y-4 text-[17px]">
                <p>
                  Most enquiries are the same few questions: prices, availability, timings, how to book. Answering
                  them takes hours every week, and every slow reply is a lead that may go elsewhere.
                </p>
                <p>
                  bigO Agents takes the repetitive conversations, so your team spends its time on customers who are
                  ready to buy.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <ChatDemo />
            </Reveal>
          </div>
        </section>

        {/* Capabilities */}
        <section aria-labelledby="does-title" className="bg-paper-2">
          <div className="frame py-20 md:py-24">
            <h2 id="does-title" className="t-1 max-w-[16ch]">
              More than a chatbot.
            </h2>
            <dl className="mt-12 grid border-t border-ink md:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map(([name, text], i) => (
                <Reveal key={name} delay={(i % 3) * 80} className="border-b border-line py-8 md:pr-10">
                  <dt className="flex items-baseline gap-4">
                    <span className="mono text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-3">{name}</span>
                  </dt>
                  <dd className="mt-3 pl-9 text-[16px]">{text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-title">
          <div className="frame py-20 md:py-24">
            <div className="grid gap-6 lg:grid-cols-12">
              <h2 id="how-title" className="t-1 lg:col-span-7">
                Live in days, not months.
              </h2>
              <p className="t-lead self-end lg:col-span-5">
                We set it up with you. You don&apos;t configure anything yourself unless you want to.
              </p>
            </div>
            <ol className="mt-12 grid gap-10 border-t border-ink pt-10 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.num} delay={i * 100}>
                  <p className="mono text-blue">{s.num}</p>
                  <h3 className="t-3 mt-3">{s.title}</h3>
                  <p className="mt-3 text-[16px]">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Industries */}
        <section aria-labelledby="who-title" className="border-t border-line">
          <div className="frame grid gap-10 py-20 md:py-24 lg:grid-cols-12">
            <h2 id="who-title" className="t-2 max-w-[16ch] lg:col-span-4">
              For businesses that get a lot of enquiries.
            </h2>
            <dl className="border-t border-ink lg:col-span-8">
              {INDUSTRIES.map(([name, text]) => (
                <div key={name} className="grid gap-1 border-b border-line py-5 md:grid-cols-[240px_1fr] md:gap-8">
                  <dt className="text-[16px] font-semibold text-ink">{name}</dt>
                  <dd className="text-[16px]">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Agencies */}
        <section aria-labelledby="agency-title" className="tone-ink">
          <div className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="kicker">For agencies</p>
              <h2 id="agency-title" className="t-1 mt-4 max-w-[14ch]">
                Offer AI agents under your own brand.
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-8 lg:col-span-5 lg:col-start-8">
              <ul className="border-t border-line">
                {[
                  "Run every client's agent from one place",
                  "White-label: your brand and your pricing",
                  "We run the technology, you keep the client relationship",
                  "Recurring monthly revenue for your agency",
                ].map((item) => (
                  <li key={item} className="border-b border-line py-3.5 text-[16px] text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#prebook" tone="blue" className="w-fit">
                Apply as an agency partner
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section aria-labelledby="pricing-title">
          <div className="frame py-20 md:py-24">
            <h2 id="pricing-title" className="t-1 max-w-[18ch]">
              One setup. One monthly plan.
            </h2>
            <div className="mt-12 grid border-t border-ink md:grid-cols-2">
              <div className="border-b border-line py-8 md:border-r md:pr-10">
                <p className="mono text-blue">Once</p>
                <h3 className="t-3 mt-3">Setup</h3>
                <p className="mt-3 text-[16px]">
                  Your knowledge loaded, the conversation designed, calendar and channels connected, and the agent
                  tested before launch.
                </p>
              </div>
              <div className="border-b border-line py-8 md:pl-10">
                <p className="mono text-blue">Monthly</p>
                <h3 className="t-3 mt-3">Run and improve</h3>
                <p className="mt-3 text-[16px]">
                  Hosting, AI usage, your dashboard, and monthly improvements based on real conversations.
                </p>
              </div>
            </div>
            <div className="mt-10 border-l-2 border-signal bg-raised p-6 md:p-8">
              <p className="t-3">Founding clients</p>
              <p className="mt-2 max-w-[62ch] text-[16px]">
                The first businesses to join get a reduced setup fee in return for honest feedback and a short case
                study. Pre-booking holds your slot; pricing is shared on the first call, based on your channels and
                volume.
              </p>
            </div>
          </div>
        </section>

        {/* Demo call */}
        <section id="demo" aria-labelledby="demo-title" className="bg-paper-2">
          <div className="frame py-20 md:py-24">
            <div className="grid gap-6 lg:grid-cols-12">
              <h2 id="demo-title" className="t-1 lg:col-span-7">
                See it on a 20-minute call.
              </h2>
              <p className="t-lead self-end lg:col-span-5">
                We&apos;ll show a working agent and talk through how it would handle your enquiries.
              </p>
            </div>
            {CAL_LINK ? (
              <div className="browser mt-12">
                <iframe
                  src={`https://cal.com/${CAL_LINK}?embed=true`}
                  title="Book a bigO Agents demo call"
                  loading="lazy"
                  className="block h-[720px] w-full border-0 bg-raised"
                />
              </div>
            ) : (
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink pt-8">
                <ButtonLink href={`${SOCIAL.whatsapp}?text=${encodeURIComponent("Hi bigO, I'd like a demo of bigO Agents.")}`} external>
                  Book on WhatsApp
                </ButtonLink>
                <ArrowLink href="/contact?type=ai-assistants">Or send us a message</ArrowLink>
              </div>
            )}
          </div>
        </section>

        {/* Pre-book */}
        <section id="prebook" aria-labelledby="prebook-title">
          <div className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="kicker flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                Limited slots
              </p>
              <h2 id="prebook-title" className="t-1 mt-4">
                Reserve a founding-client slot.
              </h2>
              <p className="mt-6 text-[17px]">
                Tell us a little about your business. There&apos;s nothing to pay now; we&apos;ll get back to you
                within one working day.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <PrebookForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="border-t border-line">
          <div className="frame py-20 md:py-24">
            <h2 id="faq-title" className="t-2 mb-10">
              Questions
            </h2>
            <FaqList items={FAQ} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
