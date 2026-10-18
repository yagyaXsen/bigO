import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SelectedWork } from "@/components/SelectedWork";
import { ProjectStart } from "@/components/ProjectStart";
import { PhysicsCta } from "@/components/PhysicsCta";
import { SiteFooter } from "@/components/SiteFooter";

/* Home: what we build, proof, how a project starts, then the way in.
   Services, the full process, tech stack and FAQ live on /services. */
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
          <ProjectStart />
          <PhysicsCta />
          <SiteFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
