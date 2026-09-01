"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCardBatch } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";
import { ScrambleText } from "@/components/ui/ScrambleText";
import type { InsightPost } from "@/types";

/* Reference I/05: 3 blog cards in a static, top-aligned row with VARIED image
   heights (card 2 tallest) that produce the staggered masonry look. Sharp
   corners, mono date on top, title bottom-left, mono tag column bottom-right.
   The `.pin-spacer` in the reference holds for ≈0px, so it reads as a normal
   vertical section — no horizontal scrub. */
const POSTS: InsightPost[] = [
  {
    date: "02 February, 2026",
    title: "Why a fast website wins more customers",
    tags: ["WEB", "SEO", "GROWTH"],
    image: "/images/blog/preview/grid-x3/pr-01.webp",
    aspect: "aspect-[3/2]",
  },
  {
    date: "28 January, 2026",
    title: "How AI chatbots handle support around the clock",
    tags: ["AI", "AUTOMATION", "SUPPORT"],
    image: "/images/blog/preview/grid-x3/pr-02.webp",
    aspect: "aspect-square",
  },
  {
    date: "15 January, 2026",
    title: "Branding basics for small businesses",
    tags: ["BRAND", "DESIGN", "IDENTITY"],
    image: "/images/blog/preview/grid-x3/pr-03.webp",
    aspect: "aspect-[16/10]",
  },
];

export function InsightsSection() {
  const titleRef = useSplitLines<HTMLHeadingElement>();
  const gridRef = useCardBatch<HTMLDivElement>(".insight-card", 3);

  return (
    /* .pinned-section.mxd-section padding family — same rhythm as W/03 */
    <section
      id="insights"
      className="mxd-container pt-[135px] pb-[140px] md:pt-[164px] md:pb-[170px] xl:pt-[165px] xl:pb-[180px] min-[1600px]:pt-[181px] min-[1600px]:pb-[200px]"
    >
      {/* Header — counter left, title center, overview link right, divider under */}
      <div className="mb-[56px] grid grid-cols-1 items-start gap-6 border-b border-[color:var(--border)] pb-[48px] md:mb-[73px] md:grid-cols-[auto_1fr_auto] md:gap-8 xl:mb-[86px]">
        <div className="xl:pt-[6px]">
          <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
            <ScrambleText text="I/05" triggerOn="hover" />
          </span>
        </div>

        <h2
          ref={titleRef}
          className="font-sans font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] text-[44px] md:justify-self-center md:text-center md:text-[54px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:text-[95px]"
        >
          Recent
          <br />
          insights
        </h2>

        <a
          href="#"
          className="mxd-mono text-[14px] text-muted-foreground transition-colors hover:text-[color:var(--ink)] md:justify-self-end md:pt-[10px]"
        >
          [ <ScrambleText text="NEWS OVERVIEW" triggerOn="hover" /> ]
        </a>
      </div>

      {/* Cards — static top-aligned grid; varied aspects give the stagger */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 items-start gap-x-[40px] gap-y-[56px] md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[46px]"
      >
        {POSTS.map((post) => (
          <InsightCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}

function InsightCard({ post }: { post: InsightPost }) {
  return (
    <a
      href="#"
      data-cursor-text="View"
      className="insight-card group flex flex-col"
    >
      {/* Date — mono, above the media */}
      <span className="mxd-mono mb-[20px] text-[13px] text-muted-foreground">
        {post.date}
      </span>

      {/* Media — sharp corners, subtle zoom on hover */}
      <div className={cn("relative w-full overflow-hidden", post.aspect)}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.23,.65,.74,1.09)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Caption — title bottom-left, mono tag column right */}
      <div className="mt-[26px] flex items-start justify-between gap-[40px]">
        <h3 className="max-w-[16ch] font-sans text-[24px] font-bold leading-[1.2] tracking-[-0.4px] text-[color:var(--ink)] transition-colors duration-300 group-hover:text-[color:var(--accent-blue)] xl:text-[26px]">
          {post.title}
        </h3>
        <ul className="flex shrink-0 flex-col items-end pt-[4px]">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="mxd-mono whitespace-nowrap text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
