import type { Metadata } from "next";
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
import { ParallaxDivider } from "@/components/ParallaxDivider";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — bigO Digital Studio",
  description:
    "Tell us what you're building. bigO replies within a day with clear next steps — websites, web apps, AI automation, and full digital presence.",
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
            <ParallaxDivider />
            <BlurSection>
              <OfficeSection />
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
