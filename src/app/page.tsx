import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Founder, Hero, HomeFaq, HowWeBuild, Problems, ServicesIndex, WorkProof } from "@/components/home/HomeSections";

/* Home: opening and a live example → real work as evidence → the visitor's
   problem → what we build → how we build it → the person → questions →
   the next step (footer) */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WorkProof />
        <Problems />
        <ServicesIndex />
        <HowWeBuild />
        <Founder />
        <HomeFaq />
      </main>
      <SiteFooter />
    </>
  );
}
