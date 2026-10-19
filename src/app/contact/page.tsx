import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { CONTACT_EMAIL, PHONE_DISPLAY, SOCIAL } from "@/lib/contact";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";

const title = "Contact — bigO";
const description =
  "Tell bigO what you'd like to build or fix. We reply within a day, and the first call is free.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/contact" },
  twitter: { title, description },
};

const NEXT_STEPS = [
  "We reply within a day.",
  "A free call to understand what you need. There's no set length.",
  "A written proposal with the scope, timeline and technical approach.",
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHeader
          label="Contact"
          title="Tell us about your project."
          lead="Share a few details and we'll reply within a day with next steps. The first call is free."
        />

        <section className="border-t border-line">
          <div className="container-page grid gap-16 py-16 md:grid-cols-12 md:gap-8 md:py-24">
            <div className="md:col-span-7">
              <p className="label mb-8">Project details</p>
              <ContactForm />
            </div>

            <aside className="space-y-12 md:col-span-4 md:col-start-9">
              <div>
                <p className="label">Talk to us directly</p>
                <ul className="mt-4 space-y-2 text-[16px]">
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

              <div>
                <p className="label">What happens next</p>
                <ol className="mt-4 border-t border-line">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className="flex gap-4 border-b border-line py-4 text-[16px]">
                      <span className="label pt-0.5 text-ink">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="label">Where we are</p>
                <p className="mt-4 text-[16px]">Delhi NCR, India. Working with clients in India and abroad.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
