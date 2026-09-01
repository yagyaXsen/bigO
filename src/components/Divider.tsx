"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRevealType } from "@/hooks/useScrollAnimations";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { cn } from "@/lib/utils";

interface ImageDividerProps {
  src: string;
  alt: string;
  /** Optional centered overlay: [ cta ] button + big permanent heading */
  cta?: string;
  title?: string;
  className?: string;
}

/**
 * Full-bleed divider band (reference .mxd-divider):
 * height 600px → 760px (md) → 930px (1600px+), parallax background image.
 * With `title`, renders the reference's content overlay — cover-04 scrim
 * (black 40%), [ CTA ] line button and centered white h2.
 */
export function ImageDivider({ src, alt, cta, title, className }: ImageDividerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRevealType<HTMLHeadingElement>();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden",
        "h-[600px] md:h-[760px] min-[1600px]:h-[930px]",
        className
      )}
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[20%] h-[140%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {title && (
        <>
          {/* cover-04: rgba(0,0,0,.4) scrim */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          {/* __content: centered column, absolute top 50% */}
          <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-col items-center gap-[21px] overflow-hidden px-[30px] text-center md:gap-[22px] md:px-[60px] xl:gap-[23px] min-[1600px]:gap-[25px] min-[1600px]:px-[100px]">
            {cta && (
              <div className="overflow-hidden">
                <Link
                  href="/contact"
                  className={cn(
                    "mxd-mono inline-flex gap-[10px] text-[16px] font-medium uppercase leading-[1.6] tracking-[0.5px] text-white md:text-[18px]",
                    "before:content-['['] after:content-[']']",
                    "before:transition-transform before:duration-300 after:transition-transform after:duration-300",
                    "hover:before:-translate-x-[2px] hover:after:translate-x-[2px]"
                  )}
                >
                  <ScrambleText
                    text={cta.toUpperCase()}
                    className="whitespace-nowrap"
                    triggerOn="hover"
                  />
                </Link>
              </div>
            )}
            {/* __caption h2.permanent: Manrope 600, 44 → 75 → 95px, white;
                reveal-type scrubbed blur-in per reference */}
            <h2
              ref={titleRef}
              className="font-sans text-[44px] font-semibold leading-[1.1] tracking-[-1.8px] text-white md:max-w-[560px] md:text-[54px] xl:max-w-[640px] xl:text-[75px] xl:tracking-[-3px] min-[1600px]:max-w-[800px] min-[1600px]:text-[95px]"
            >
              {title}
            </h2>
          </div>
        </>
      )}
    </section>
  );
}
