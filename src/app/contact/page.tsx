import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import {
  BlurScrollRoot,
  BlurSection,
} from "@/components/providers/BlurScroll";
import { Preloader } from "@/components/ui/Preloader";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactHero } from "@/components/ContactHero";
import { EmailContact } from "@/components/EmailContact";
import { ConnectSection } from "@/components/ConnectSection";
import { OfficeSection } from "@/components/OfficeSection";
import { ImageDivider } from "@/components/Divider";
import { MarqueeCta } from "@/components/MarqueeCta";
import { SiteFooter } from "@/components/SiteFooter";

const title = "Contact — bigO Digital Studio";
const description =
  "Tell us what you're building. bigO replies within a day with clear next steps — websites, web apps, AI automation, and full digital presence.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/contact" },
  twitter: { title, description },
};

export default function ContactPage() {
  return (
    <>
      <Preloader />
      <GrainOverlay />
      <SmoothScroll>
        <BlurScrollRoot>
          <SiteHeader />
          <main id="top" className="overflow-x-clip">
            <ContactHero />
            <EmailContact />
            <BlurSection>
              <ConnectSection />
            </BlurSection>
            <ImageDivider
              src="/images/dividers/1920x1200_dv04.webp"
              alt="bigO studio"
            />
            <BlurSection>
              <OfficeSection />
            </BlurSection>
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
