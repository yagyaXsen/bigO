import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BlurScrollRoot, BlurSection } from "@/components/providers/BlurScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkHero } from "@/components/WorkHero";
import { WorkProjects } from "@/components/WorkProjects";
import { MarqueeCta } from "@/components/MarqueeCta";
import { SiteFooter } from "@/components/SiteFooter";

const title = "Work — bigO Digital Studio";
const description =
  "Selected bigO projects: Nexora, an automated opportunity-intelligence platform; Hirearn, a local jobs and services marketplace; an ongoing international catering engagement; and Lumora Dental, a modern dental clinic website.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/work" },
  twitter: { title, description },
};

export default function WorkPage() {
  return (
    <>
      <GrainOverlay />
      <SmoothScroll>
        <BlurScrollRoot>
          <SiteHeader />
          <main id="top" className="overflow-x-clip">
            <WorkHero />
            <WorkProjects />
            <BlurSection>
              <MarqueeCta />
            </BlurSection>
            <BlurSection>
              <SiteFooter />
            </BlurSection>
          </main>
        </BlurScrollRoot>
      </SmoothScroll>
    </>
  );
}
