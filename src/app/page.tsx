import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CtaBand } from "@/components/CtaBand";
import {
  FounderNote,
  Hero,
  HomeFaq,
  Pricing,
  Problems,
  Process,
  SelectedWork,
  Stack,
  WhatWeBuild,
} from "@/components/home/HomeSections";

/* Home: what we do and for whom, then the problems we solve, services,
   proof, process, stack, prices, the founder and common questions */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problems />
        <WhatWeBuild />
        <SelectedWork />
        <Process />
        <Stack />
        <Pricing />
        <FounderNote />
        <HomeFaq />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
