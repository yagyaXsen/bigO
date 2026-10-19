import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import {
  FounderNote,
  Hero,
  HomeFaq,
  Problems,
  SelectedWork,
  Stack,
  Standards,
  WhatWeBuild,
} from "@/components/home/HomeSections";

/* Home: what we do and for whom, then the problems we solve, services,
   proof, engineering standards, tech stack, the founder and common questions */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problems />
        <WhatWeBuild />
        <SelectedWork />
        <Standards />
        <Stack />
        <FounderNote />
        <HomeFaq />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
