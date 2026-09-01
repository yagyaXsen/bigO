"use client";

import Image from "next/image";
import { useInUp, usePerspectiveList } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import type { CapabilityItem } from "@/types";

// Descriptions use "||" to split the ink (leading) clause from the muted tail.
const CAPABILITIES: CapabilityItem[] = [
  {
    index: "[01]",
    title: "Website design & build",
    description:
      "Custom, fast, mobile-first websites that ||turn visitors into customers.",
    image: "/images/services/1200x980_cpb01.webp",
    tags: ["DESIGN", "RESPONSIVE", "SEO", "PERFORMANCE"],
  },
  {
    index: "[02]",
    title: "AI & automation",
    description:
      "Chatbots and workflows that ||save you time and run around the clock.",
    image: "/images/services/1200x980_cpb02.webp",
    tags: ["CHATBOTS", "WORKFLOWS", "INTEGRATIONS", "CONTENT", "EMAIL"],
  },
  {
    index: "[03]",
    title: "Digital marketing & growth",
    description:
      "SEO, social, and paid ads that ||get you found and get results.",
    image: "/images/services/1200x980_cpb03.webp",
    tags: ["SEO", "SOCIAL", "PAID ADS", "EMAIL"],
  },
  {
    index: "[04]",
    title: "Website care & maintenance",
    description:
      "Security, backups, and monitoring that ||keep you online and worry-free.",
    image: "/images/services/1200x980_cpb04.webp",
    tags: ["SECURITY", "BACKUPS", "MONITORING", "UPDATES", "SUPPORT"],
  },
  {
    index: "[05]",
    title: "Web apps & PWA",
    description:
      "Dashboards, portals, and tools ||built as real, installable software.",
    image: "/images/services/1200x980_cpb05.webp",
    tags: ["FULL-STACK", "DASHBOARDS", "DATABASES", "AUTH"],
  },
  {
    index: "[06]",
    title: "Branding & design",
    description:
      "Logos and brand systems that ||make you look professional everywhere.",
    image: "/images/services/1200x980_cpb06.webp",
    tags: [
      "LOGO DESIGN",
      "IDENTITY",
      "GUIDELINES",
      "UI/UX",
      "SOCIAL",
    ],
  },
  {
    index: "[07]",
    title: "Consulting & strategy",
    description:
      "Audits and roadmaps that ||turn your data into smart decisions.",
    image: "/images/services/1200x980_cpb07.webp",
    tags: ["AUDITS", "STRATEGY", "ANALYTICS", "TRAINING", "ROADMAP"],
  },
];

function CapabilityRow({ item }: { item: CapabilityItem }) {
  const [ink, muted] = item.description.split("||");
  const mid = Math.ceil(item.tags.length / 2);
  const tagCols = [item.tags.slice(0, mid), item.tags.slice(mid)];

  return (
    /* .mxd-cpb-list__item.mxd-perspective-list__item:
       py 55px → md 54/60 → xl 60px; perspective 1000px for the 3D tilt-away */
    <div className="cpb-item relative pt-[55px] pb-[55px] [perspective:1000px] [transform-style:preserve-3d] will-change-transform md:pt-[54px] md:pb-[60px] xl:py-[60px]">
      {/* top divider — sits outside the tilting inner so it stays put */}
      <div className="absolute left-0 top-0 h-px w-full bg-border" />

      {/* .mxd-cpb-list__inner.mxd-perspective-list__inner — tilts back,
          fades and blurs as the row scrolls past the top (scrub .6) */}
      <div className="cpb-inner origin-bottom [backface-visibility:hidden] will-change-[transform,opacity,filter]">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[60px] xl:grid-cols-3">
          {/* Col A — [NN] number (top) + name (bottom, justify-between at xl) */}
          <div className="flex flex-col md:col-span-2 xl:col-span-1 xl:justify-between">
            <div className="mb-[17px] md:mb-[22px] xl:mb-0">
              <span className="flex font-mono text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]">
                {item.index}
              </span>
            </div>
            <p className="mb-[28px] font-sans text-[30px] font-bold leading-[1.2] tracking-[-1px] text-[color:var(--ink)] md:mb-[36px] md:text-[40px] xl:mb-0 xl:max-w-[300px] min-[1600px]:max-w-[370px] min-[1600px]:text-[50px]">
              {item.title}
            </p>
          </div>

          {/* Col B — image (no radius in reference) */}
          <div className="mb-[25px] flex md:mb-0">
            <Image
              src={item.image}
              alt="bigO service"
              width={1200}
              height={980}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="inline-flex h-full w-full object-cover"
            />
          </div>

          {/* Col C — description (top) + tag columns (bottom) */}
          <div className="flex flex-col md:justify-between">
            <p className="mb-[22px] font-sans text-[20px] font-bold leading-[1.4] text-[color:var(--ink)] md:mb-0 md:max-w-[460px] md:text-[24px]">
              {ink}
              {muted ? (
                <span className="text-[color:var(--body-text)]">{muted}</span>
              ) : null}
            </p>
            <div className="grid grid-cols-2">
              {tagCols.map((col, i) => (
                <div key={i} className="flex flex-col">
                  {col.map((tag) => (
                    <span
                      key={tag}
                      className="flex font-mono text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]"
                    >
                      <ScrambleText text={tag} triggerOn="hover" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom divider */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-border" />
    </div>
  );
}

export function CapabilitiesSection() {
  // Reference mxd-perspective-list: rows tilt back / fade / blur on scroll-out
  const listRef = usePerspectiveList<HTMLDivElement>(".cpb-item", ".cpb-inner");
  const counterRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();

  return (
    /* .mxd-section.padding-bottom-default: pb 140→170(md)→180(xl)→200(1600) */
    <section className="mxd-container pb-[140px] md:pb-[170px] xl:pb-[180px] min-[1600px]:pb-[200px]">
      {/* Section title — C/02 col-xl-4 + h2 col-xl-8 (left-aligned) */}
      <div className="mb-[48px] grid grid-cols-1 xl:mb-[64px] xl:grid-cols-12">
        <div ref={counterRef} className="mb-[21px] xl:col-span-4 xl:mb-0">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
            <ScrambleText text="C/02" triggerOn="hover" />
          </span>
        </div>
        <div className="xl:col-span-8">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:text-[95px]"
          >
            Our
            <br />
            capabilities
          </h2>
        </div>
      </div>

      {/* Rows — [transform-style:preserve-3d] list */}
      <div ref={listRef} className="[transform-style:preserve-3d]">
        {CAPABILITIES.map((item) => (
          <CapabilityRow key={item.index} item={item} />
        ))}
      </div>
    </section>
  );
}
