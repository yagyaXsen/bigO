"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCardBatch } from "@/hooks/useScrollAnimations";

interface CardTitleProps {
  title: string;
  tags: string[];
  dark?: boolean;
}

/* Reference: .mxd-niche-cards__title{padding:2.8rem 3rem 0} → md 3.6rem 4rem 0
   __name p{font:700 3rem/1.2 Manrope;ls:-.1rem} → md 3.6rem → xl 4rem
   __tags: column, .tag-m = JetBrains Mono 600 14px/1.6 uppercase ls .05rem #575960 */
function CardTitle({ title, tags, dark }: CardTitleProps) {
  return (
    <div className="relative z-[2] w-full px-[30px] pt-[28px] md:px-[40px] md:pt-[36px]">
      <h3
        className={cn(
          "font-sans text-[30px] font-bold leading-[1.2] tracking-[-1px] md:text-[36px] xl:text-[40px]",
          dark ? "text-white" : "text-[color:var(--ink)]"
        )}
      >
        {title}
      </h3>
      <ul
        className={cn(
          "mxd-mono mt-[19px] flex flex-col pt-[4px] text-[14px] uppercase leading-[1.6] tracking-[0.5px]",
          dark
            ? "font-normal text-white"
            : "font-semibold text-[color:var(--body-text)]"
        )}
      >
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

interface CardDescrProps {
  text: string;
  highlight: string;
  dark?: boolean;
  short?: boolean;
  className?: string;
}

/* Reference: .mxd-niche-cards__descr{padding:0 3rem 3rem} → md 0 4rem 4rem
   .t-bold = 700 #121212, span #575960; p.t-medium 16px → md 18px, lh 1.4
   .wide max-width 360px, .short max-width 300px; permanent = #fff / #fff9 */
function CardDescr({ text, highlight, dark, short, className }: CardDescrProps) {
  return (
    <div
      className={cn(
        "relative z-[2] w-full px-[30px] pb-[30px] md:px-[40px] md:pb-[40px]",
        className
      )}
    >
      <p
        className={cn(
          "text-[16px] font-bold leading-[1.4] md:text-[18px]",
          short ? "max-w-[300px]" : "max-w-[360px]",
          dark ? "text-white" : "text-[color:var(--ink)]"
        )}
      >
        {text}{" "}
        <span className={dark ? "text-[#fff9]" : "text-[color:var(--body-text)]"}>
          {highlight}
        </span>
      </p>
    </div>
  );
}

export function NicheCards() {
  // Reference: niche cards use animate-card-2 batch reveal
  const ref = useCardBatch<HTMLDivElement>(".niche-card", 2);

  return (
    /* .mxd-section.padding-bottom-grid-l-to-title:
       pb 107 → 105(md/xl) → 120(1600); no top padding (About provides it) */
    <section className="mxd-container pb-[107px] md:pb-[105px] min-[1600px]:pb-[120px]">
      {/* Reference grid: col-xl-4 (Fintech, full height) + col-xl-8 (AI full-width,
          then Cybersecurity + Game Industry 50/50). Gutter 30px → 60px. */}
      <div
        ref={ref}
        className="grid grid-cols-1 gap-[30px] md:gap-[60px] xl:grid-cols-12"
      >
        {/* Fintech — tall card, image pinned to bottom on desktop */}
        <article className="niche-card relative flex flex-col overflow-hidden bg-[#F9F7F7] xl:col-span-4 xl:h-full">
          <CardTitle
            title="Websites & Web Apps"
            tags={["Design", "Build", "SEO"]}
          />
          <CardDescr
            text="Custom, fast, mobile-first sites and web apps, from"
            highlight="business sites to e-commerce and SaaS dashboards."
            className="mt-[8px]"
          />
          <div className="relative z-[1] mt-auto w-full xl:absolute xl:bottom-0 xl:left-0">
            <Image
              src="/images/illustrations/niche01.webp"
              alt="Websites & Web Apps"
              width={1200}
              height={1611}
              sizes="(max-width: 1200px) 100vw, 33vw"
              className="block h-auto w-full"
            />
          </div>
        </article>

        {/* Right column: AI on top, Cybersecurity + Game Industry below */}
        <div className="grid grid-cols-1 gap-[30px] md:gap-[60px] xl:col-span-8">
          {/* AI-powered solutions — full-bleed image + linear gradient */}
          <article className="niche-card relative flex min-h-[420px] flex-col overflow-hidden bg-[#F9F7F7] xl:h-[420px] xl:justify-between min-[1600px]:h-[500px]">
            <CardTitle
              title="AI & Automation"
              tags={["Chatbots", "Workflows", "Content", "Integrations"]}
            />
            <CardDescr
              text="Smart chatbots, workflow automation, and AI tools"
              highlight="that save time and cut out the busywork."
              className="mt-auto"
            />
            <div className="absolute inset-0 z-[1]">
              <Image
                src="/images/illustrations/niche02.webp"
                alt="AI & Automation"
                fill
                sizes="(max-width: 1200px) 100vw, 66vw"
                className="object-cover"
              />
              {/* mobile: 180deg tint fade from top; xl: 90deg fade left→right */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,247,247,1)_10%,rgba(249,247,247,0.6)_50%,rgba(249,247,247,0)_100%)] xl:bg-[linear-gradient(90deg,rgba(249,247,247,1)_0%,rgba(249,247,247,0.2)_80%,rgba(249,247,247,0)_100%)]" />
            </div>
          </article>

          <div className="grid grid-cols-1 gap-[30px] md:gap-[60px] xl:grid-cols-2">
            {/* Cybersecurity — black card, full image + radial dark gradient */}
            <article className="niche-card relative flex min-h-[420px] flex-col overflow-hidden bg-black xl:h-[420px] xl:justify-between min-[1600px]:h-[500px]">
              <CardTitle
                dark
                title="Care & Maintenance"
                tags={["Security", "Backups", "Monitoring"]}
              />
              <CardDescr
                dark
                text="Security, backups, updates, and 24/7 monitoring"
                highlight="so your site stays online and safe."
                className="mt-auto"
              />
              <div className="absolute inset-0 z-[1]">
                <Image
                  src="/images/illustrations/niche03.webp"
                  alt="Care & Maintenance"
                  fill
                  sizes="(max-width: 1200px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_closest-side,rgba(0,0,0,0.2),rgba(0,0,0,0.9))]" />
              </div>
            </article>

            {/* Game Industry — aside image cropped at bottom-right */}
            <article className="niche-card relative flex min-h-[420px] flex-col overflow-hidden bg-[#F9F7F7] xl:h-[420px] xl:justify-between min-[1600px]:h-[500px]">
              <CardTitle
                title="Branding & Design"
                tags={["Logo", "Identity", "UI/UX"]}
              />
              <CardDescr
                short
                text="Logos, brand identity, and conversion-focused"
                highlight="design that makes you look professional."
                className="mt-auto"
              />
              <div className="relative z-[1] w-full px-[30px] pt-[5px] xl:absolute xl:bottom-[-30px] xl:right-[-80px] xl:w-[200px] xl:p-0 min-[1400px]:bottom-[-20px] min-[1400px]:w-[240px] min-[1600px]:bottom-[-30px] min-[1600px]:w-[320px]">
                <Image
                  src="/images/illustrations/niche04.webp"
                  alt="Branding & Design"
                  width={800}
                  height={1040}
                  sizes="(max-width: 1200px) 100vw, 320px"
                  className="block h-auto w-full"
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
