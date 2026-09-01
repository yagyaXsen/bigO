"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";

/**
 * Central GSAP setup — registers plugins once and creates the two named
 * eases decoded from the reference site (docs/research/MOTION_SYSTEM.md).
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip);
  if (!CustomEase.get("hop")) {
    CustomEase.create("hop", ".87, 0, .13, 1"); // menu / page transition
  }
  if (!CustomEase.get("custom")) {
    CustomEase.create("custom", ".23, .65, .74, 1.09"); // == --_animbezier
  }
}

export { gsap, ScrollTrigger, SplitText, CustomEase, Flip };
