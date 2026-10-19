import type { Metadata } from "next";
import Image from "next/image";
import { SITE_NAME } from "@/lib/site";
import { CONTACT_EMAIL, PHONE_DISPLAY, SOCIAL } from "@/lib/contact";
import { FOUNDER } from "@/lib/content";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

const title = "Start a project — bigO";
const description = "Tell bigO what you'd like to build or fix. We reply within a day, and the first call is free.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/contact" },
  twitter: { title, description },
};

const NEXT_STEPS = [
  ["Within a day", "We reply with a few questions or a time to talk."],
  ["A free call", "As long as it needs to be. We work out what's worth building."],
  ["A written proposal", "Scope, timeline and approach, agreed before any work starts."],
];

/* Contact: the people and what happens next on the left (ink), the form on
   the right. This page is the next step, so the footer drops its CTA. */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="lg:grid lg:min-h-[calc(100vh-72px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <section aria-labelledby="contact-title" className="tone-ink">
          <div className="flex h-full flex-col px-5 pt-14 pb-14 md:px-8 lg:pl-[max(56px,calc((100vw-1320px)/2+56px))] lg:pr-14 lg:pt-20">
            <h1 id="contact-title" className="t-1 max-w-[12ch]">
              Tell us what&apos;s slowing you down.
            </h1>
            <p className="mt-6 max-w-[38ch] text-[17px]">
              A few lines is enough. You&apos;ll hear back from the people who would build it, not a sales team.
            </p>

            <ol className="mt-12 border-t border-line">
              {NEXT_STEPS.map(([step, text], i) => (
                <li key={step} className="grid grid-cols-[28px_1fr] gap-3 border-b border-line py-4">
                  <span className="mono pt-0.5 text-blue">{i + 1}</span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{step}</span>
                    <span className="block text-[15px] text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-auto pt-12">
              <div className="flex items-center gap-4">
                <Image src={FOUNDER.photo} alt="" width={96} height={96} className="h-14 w-14 object-cover object-top" />
                <div className="text-[14px]">
                  <p className="font-semibold text-ink">{FOUNDER.name}</p>
                  <p className="text-muted">Founder · Delhi NCR</p>
                </div>
              </div>
              <ul className="mt-6 space-y-1.5 text-[16px]">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link break-all">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="link">
                    WhatsApp {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-label="Project details" className="px-5 pt-14 pb-20 md:px-8 lg:pl-14 lg:pr-[max(56px,calc((100vw-1320px)/2+56px))] lg:pt-20">
          <div className="max-w-[640px]">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter cta={false} />
    </>
  );
}
