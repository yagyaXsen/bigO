"use client";

import Link from "next/link";
import Image from "next/image";
import { useInUp } from "@/hooks/useScrollAnimations";

/* bigO services, illustrated with the site's own artwork */
const MARQUEE_ITEMS = [
  { label: "Websites", img: "/images/services/1200x980_cpb01.webp", cls: "mt-[10vh] h-[250px] w-[200px] md:h-[450px] md:w-[350px]" },
  { label: "AI & Automation", img: "/images/services/1200x980_cpb02.webp", cls: "mt-auto mb-[5vh] h-[200px] w-[250px] md:h-[300px] md:w-[450px]" },
  { label: "Web Apps", img: "/images/services/1200x980_cpb05.webp", cls: "mt-[2vh] h-[300px] w-[250px] md:h-[500px] md:w-[400px]" },
  { label: "Branding", img: "/images/services/1200x980_cpb06.webp", cls: "mt-auto h-[250px] w-[200px] md:h-[400px] md:w-[300px]" },
  { label: "E-commerce", img: "/images/works/showcase-grid-x3/pr02-01.webp", cls: "mt-[15vh] h-[200px] w-[180px] md:h-[350px] md:w-[280px]" },
  { label: "Digital Marketing", img: "/images/services/1200x980_cpb03.webp", cls: "mt-auto mb-[10vh] h-[220px] w-[220px] md:h-[380px] md:w-[380px]" },
  { label: "UI/UX Design", img: "/images/works/800x450_all01.webp", cls: "mt-[5vh] h-[250px] w-[200px] md:h-[420px] md:w-[320px]" },
  { label: "Care & Maintenance", img: "/images/services/1200x980_cpb04.webp", cls: "mt-auto h-[300px] w-[250px] md:h-[550px] md:w-[450px]" },
  { label: "Strategy", img: "/images/services/1200x980_cpb07.webp", cls: "mt-[12vh] h-[180px] w-[250px] md:h-[280px] md:w-[400px]" },
];

export function MarqueeCta() {
  const ctaRef = useInUp<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[color:var(--ink)] pt-[140px] pb-0">
      <div className="mxd-container relative z-20" ref={ctaRef}>
        <div className="flex flex-col items-center text-center">
          <Link
            href="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center justify-center rounded-full border border-background/20 px-8 py-3 font-mono text-[18px] font-medium tracking-[0.5px] text-background transition-colors duration-300 hover:bg-background hover:text-[color:var(--ink)] cursor-pointer"
          >
            Write a line
          </Link>
          
          <Link
            href="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="mt-8 group block cursor-pointer"
          >
            <h2 className="mxd-display text-background text-[clamp(44px,6vw,75px)] font-semibold leading-[1.1] tracking-[-3px] transition-colors duration-300 group-hover:text-[color:var(--accent-blue)]">
              Let&apos;s talk about your project
            </h2>
          </Link>
        </div>
      </div>
      <div aria-hidden="true" className="mt-[150px] mb-[80px] flex h-[500px] overflow-hidden md:h-[650px] xl:mt-[200px]">
        <div className="flex h-full w-max animate-marquee items-start space-x-[40px] px-8 md:space-x-[80px]" style={{ animationDuration: '60s' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div
              key={i}
              className={`relative flex shrink-0 flex-col ${item.cls}`}
            >
              <span className="mxd-mono mb-4 text-[10px] uppercase tracking-[0.08em] text-muted-foreground md:text-[11px]">
                {item.label}
              </span>
              <div className="relative h-full w-full overflow-hidden group">
                <Image
                  src={item.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 250px, 450px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
