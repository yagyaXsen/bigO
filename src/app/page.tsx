import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SelectedWork } from "@/components/SelectedWork";
import { PhysicsCta } from "@/components/PhysicsCta";
import { SiteFooter } from "@/components/SiteFooter";

/* Home: what we build, proof, then the way to start. Services, the process
   and the tech stack are covered in detail on /services. */
export default function Home() {
  return (
    <>
      <GrainOverlay />
      <SmoothScroll>
        <SiteHeader />
        <main className="overflow-x-clip">
          <HeroSection />
          <ServicesSection />
          <SelectedWork />
          <PhysicsCta />
          <SiteFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
