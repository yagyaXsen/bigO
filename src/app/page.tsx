import { SmoothScroll } from "@/components/providers/SmoothScroll";
import {
  BlurScrollRoot,
  BlurSection,
} from "@/components/providers/BlurScroll";
import { Preloader } from "@/components/ui/Preloader";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { NicheCards } from "@/components/NicheCards";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ImageDivider } from "@/components/Divider";
import { CaseStudies } from "@/components/CaseStudies";
import { TechStack } from "@/components/TechStack";
import { InsightsSection } from "@/components/InsightsSection";
import { MarqueeCta } from "@/components/MarqueeCta";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Preloader />
      <GrainOverlay />
      <SmoothScroll>
        <BlurScrollRoot>
          <SiteHeader />
          <main className="overflow-x-clip">
            <HeroSection />
            <AboutSection />
            <BlurSection>
              <NicheCards />
            </BlurSection>
            <BlurSection>
              <CapabilitiesSection />
            </BlurSection>
            <BlurSection>
              <ImageDivider
                src="/images/dividers/1920x1200_dv04.webp"
                alt="bigO showcase"
              />
            </BlurSection>
            <CaseStudies />
            <BlurSection>
              <ImageDivider
                src="/images/dividers/1920x1080_dv01.webp"
                alt="bigO team"
                cta="Let's meet"
                title="Small but powerful team"
              />
            </BlurSection>
            <BlurSection>
              <TechStack />
            </BlurSection>

            <BlurSection>
              <ImageDivider
                src="/images/dividers/1920x1200_dv07.webp"
                alt="bigO showcase"
              />
            </BlurSection>
            <InsightsSection />
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
