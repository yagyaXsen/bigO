import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { ServicesHero } from "@/components/ServicesHero";
import { CoreServices, MoreServices } from "@/components/ServiceDetails";
import { WorkProcess } from "@/components/WorkProcess";
import { TechStack } from "@/components/TechStack";
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

/* Services: the development work in detail, the design & growth work around
   it, then how a project runs and what we build with */
export default function ServicesPage() {
  return (
    <>
      <GrainOverlay />
      <SmoothScroll>
        <SiteHeader />
        <main id="top" className="overflow-x-clip">
          <ServicesHero />
          <CoreServices />
          <MoreServices />
          <WorkProcess counter="P/03" />
          <TechStack />
          <PhysicsCta />
          <SiteFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
