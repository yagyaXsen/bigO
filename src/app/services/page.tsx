import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { FAQ } from "@/lib/services";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { ServicesHero } from "@/components/ServicesHero";
import { CoreServices, MoreServices } from "@/components/ServiceDetails";
import { WorkProcess } from "@/components/WorkProcess";
import { TechStack } from "@/components/TechStack";
import { Faq, WorkingTogether } from "@/components/WorkingTogether";
import { PhysicsCta } from "@/components/PhysicsCta";
import { SiteFooter } from "@/components/SiteFooter";

const title = "Services — bigO Digital Studio";
const description =
  "Custom software, web apps and AI automation built end to end by bigO, plus websites, UI/UX and brand design, digital marketing, maintenance and technical consulting.";

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

/* Services: the development work in detail, the design & growth work around
   it, how a project runs and what we build with, then terms and questions */
export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <GrainOverlay />
      <SmoothScroll>
        <SiteHeader />
        <main id="top" className="overflow-x-clip">
          <ServicesHero />
          <CoreServices />
          <MoreServices />
          <WorkProcess counter="P/03" />
          <TechStack />
          <WorkingTogether />
          <Faq />
          <PhysicsCta />
          <SiteFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
