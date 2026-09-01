"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCardBatch, useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";

interface ProjectItem {
  title: string;
  tags: string[];
  /** First entry is the resting image; the rest cycle on hover (reference order) */
  images: string[];
  width: number;
  height: number;
}

const WORKS = "/images/works/showcase-grid-x3";

/* Reference: 6 × .mxd-project-item (col-12 → md-6 → xl-4), images in DOM order */
const PROJECTS: ProjectItem[] = [
  {
    title: "Business website",
    tags: ["Design", "Build", "SEO", "WhatsApp"],
    images: ["pr01-01", "pr01-05", "pr01-04", "pr01-03", "pr01-02"].map(
      (n) => `${WORKS}/${n}.webp`
    ),
    width: 853,
    height: 1280,
  },
  {
    title: "E-commerce store",
    tags: ["UI/UX", "Development", "Payments"],
    images: ["pr02-01", "pr02-04", "pr02-05", "pr02-03", "pr02-02"].map(
      (n) => `${WORKS}/${n}.webp`
    ),
    width: 1280,
    height: 843,
  },
  {
    title: "Brand identity system",
    tags: ["Brand", "Design", "Guidelines"],
    images: ["pr03-01", "pr03-06", "pr03-02", "pr03-05", "pr03-04", "pr03-03"].map(
      (n) => `${WORKS}/${n}.webp`
    ),
    width: 1280,
    height: 1280,
  },
  {
    title: "Booking web app",
    tags: ["Web App", "Dashboard", "Automation"],
    images: [
      "pr04-01",
      "pr04-02",
      "pr04-03",
      "pr04-04",
      "pr04-05",
      "pr04-06",
      "pr04-07",
    ].map((n) => `${WORKS}/${n}.webp`),
    width: 1280,
    height: 853,
  },
  {
    title: "SaaS dashboard",
    tags: ["Web App", "Analytics", "Billing"],
    images: ["pr05-01", "pr05-04", "pr05-05", "pr05-06", "pr05-03", "pr05-02"].map(
      (n) => `${WORKS}/${n}.webp`
    ),
    width: 853,
    height: 1280,
  },
  {
    title: "AI support chatbot",
    tags: ["AI", "Automation", "Support"],
    images: [
      "pr06-01",
      "pr06-07",
      "pr06-06",
      "pr06-05",
      "pr06-04",
      "pr06-03",
      "pr06-02",
    ].map((n) => `${WORKS}/${n}.webp`),
    width: 1280,
    height: 1280,
  },
];

/* All Works media — 800x450_all01–06.webp, reference DOM order, centered-y crop */
const ALL_WORKS_IMAGES = [
  "/images/works/800x450_all03.webp",
  "/images/works/800x450_all02.webp",
  "/images/works/800x450_all01.webp",
  "/images/works/800x450_all04.webp",
  "/images/works/800x450_all05.webp",
  "/images/works/800x450_all06.webp",
];

/* Reference .mxd-project-item:hover tag stagger: .4/.8/1.2/1.6rem */
const TAG_SHIFT = [
  "group-hover:translate-y-[4px]",
  "group-hover:translate-y-[8px]",
  "group-hover:translate-y-[12px]",
  "group-hover:translate-y-[16px]",
];

/* --_animbezier from the reference theme */
const ANIM_BEZIER = "ease-[cubic-bezier(.23,.65,.74,1.09)]";

/**
 * Reference .mxd-img-anim: on pointerenter cycle through the image stack
 * every 350ms; on pointerleave restore the first (main) image.
 */
function useImageCycle(count: number) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (count < 2 || intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 350);
  }, [count]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIndex(0);
  }, []);

  return { index, start, stop };
}

export function CaseStudies() {
  const gridRef = useCardBatch<HTMLDivElement>(".project-item", 3);
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const counterRef = useInUp<HTMLDivElement>();

  return (
    /* .pinned-section.mxd-section.padding-top-number.padding-bottom-default:
       pt 135→164(md)→165(xl)→181(1600); pb 140→170→180→200 */
    <section
      id="works"
      className="mxd-container pt-[135px] pb-[140px] md:pt-[164px] md:pb-[170px] xl:pt-[165px] xl:pb-[180px] min-[1600px]:pt-[181px] min-[1600px]:pb-[200px]"
    >
      {/* Section title — .mxd-section-title.pre-grid: mb 73→90(md)→86(xl)→84(1600) */}
      <div className="mb-[73px] grid grid-cols-1 md:mb-[90px] xl:mb-[86px] xl:grid-cols-12 min-[1600px]:mb-[84px]">
        <div ref={counterRef} className="mb-[21px] xl:col-span-4 xl:mb-0">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
            <ScrambleText text="W/03" triggerOn="hover" />
          </span>
        </div>
        <div className="xl:col-span-8">
          <h2
            ref={titleRef}
            className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[54px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:text-[95px]"
          >
            Featured case
            <br />
            studies
          </h2>
        </div>
      </div>

      {/* Projects grid — col-12 → md-6 → xl-4, gutter 60px, row gap via mb */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 items-start gap-x-[60px] md:grid-cols-2 xl:grid-cols-3"
      >
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={`${project.title}-${idx}`} project={project} />
        ))}
      </div>

      {/* Object link — pixel arrow left, [All Works] + hover media right */}
      <AllWorksLink />
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const { index, start, stop } = useImageCycle(project.images.length);

  return (
    <article className="project-item group mb-[74px] flex flex-col gap-[22px] xl:mb-[94px]">
      {/* __media — mxd-img-anim hover image cycle */}
      <a
        href="#works"
        className="relative block overflow-hidden"
        data-cursor-text="View Work"
        onPointerEnter={start}
        onPointerLeave={stop}
      >
        <Image
          src={project.images[0]}
          alt={project.title}
          width={project.width}
          height={project.height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "block h-auto w-full object-cover",
            index !== 0 && "opacity-0"
          )}
        />
        {project.images.slice(1).map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={project.width}
            height={project.height}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "absolute left-0 top-0 h-full w-full object-cover",
              index === i + 1 ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </a>

      {/* __caption — name left, right-aligned tag column */}
      <div className="flex items-start justify-between gap-[60px]">
        {/* .project-name-s: Manrope 700 24px/1.2, ls -0.4px; hover ↓4px */}
        <h3
          className={cn(
            "font-sans text-[24px] font-bold leading-[1.2] tracking-[-0.4px] text-[color:var(--ink)]",
            "transition-transform duration-300 group-hover:translate-y-[4px]",
            ANIM_BEZIER
          )}
        >
          <a href="#works">{project.title}</a>
        </h3>
        <ul className="flex flex-col items-end pt-[4px]">
          {project.tags.map((tag, i) => (
            <li
              key={tag}
              className={cn(
                "mxd-mono whitespace-nowrap text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]",
                "transition-transform duration-300",
                ANIM_BEZIER,
                TAG_SHIFT[i] ?? TAG_SHIFT[3]
              )}
            >
              <ScrambleText text={tag.toUpperCase()} triggerOn="hover" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function AllWorksLink() {
  const { index, start, stop } = useImageCycle(ALL_WORKS_IMAGES.length);

  return (
    <div className="flex flex-col justify-between gap-[40px] md:flex-row">
      {/* __object — pixel arrow 160px → 260px (md) → 320px (1600px), --t-muted-extra */}
      <div className="flex items-end justify-start md:w-1/2 xl:w-1/3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 259 260"
          aria-hidden="true"
          className="h-[160px] w-[160px] fill-[#dbd8d8] md:h-[260px] md:w-[260px] min-[1600px]:h-[320px] min-[1600px]:w-[320px]"
        >
          <path d="M143.9,0v28.8h-28.8V0h28.8ZM143.9,28.8v28.8h28.8v-28.8h-28.8ZM172.7,57.6v28.8h28.8v-28.8h-28.8ZM230.2,115.2v-28.8h-28.8v28.8H0v28.8h201.4v28.8h28.8v-28.8h28.8v-28.8h-28.8ZM172.7,201.6h28.8v-28.8h-28.8v28.8ZM143.9,230.4h28.8v-28.8h-28.8v28.8ZM114.3,260h28.8v-28.8h-28.8v28.8Z" />
        </svg>
      </div>

      {/* __content — [ All Works ] button + hover-cycling media */}
      <div className="flex w-full flex-col items-start gap-[20px] md:w-1/2 md:gap-[14px] xl:w-1/3">
        <a
          href="#works"
          className={cn(
            "mxd-mono inline-flex gap-[10px] text-[16px] font-medium leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] md:text-[18px]",
            "before:content-['['] after:content-[']']",
            "before:transition-transform before:duration-300 after:transition-transform after:duration-300",
            "hover:before:-translate-x-[2px] hover:after:translate-x-[2px]"
          )}
        >
          <ScrambleText text="ALL WORKS" triggerOn="hover" />
        </a>
        <a
          href="#works"
          className="relative block h-[260px] w-full overflow-hidden min-[1600px]:h-[320px]"
          data-cursor-text="All Works"
          onPointerEnter={start}
          onPointerLeave={stop}
        >
          {ALL_WORKS_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="All works"
              width={800}
              height={450}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                "absolute left-0 top-1/2 min-h-full w-full -translate-y-1/2 object-cover",
                index === i ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </a>
      </div>
    </div>
  );
}
