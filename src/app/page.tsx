import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SelectedWork } from "@/components/SelectedWork";
import { WorkProcess } from "@/components/WorkProcess";
import { TechStack } from "@/components/TechStack";
import { PhysicsCta } from "@/components/PhysicsCta";
import { SiteFooter } from "@/components/SiteFooter";
import { PROCESS_SHORT } from "@/lib/projects";

/* Home: what we build, proof, how we work, stack, then the way to start */
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
          <WorkProcess
            counter="P/03"
            title="How we work"
            intro="From first call to launch in four clear steps — with the same small team from start to finish, so you always know what's next."
            steps={PROCESS_SHORT}
          />
          <TechStack />
          <PhysicsCta />
          <SiteFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
