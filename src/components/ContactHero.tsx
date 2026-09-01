"use client";

import Link from "next/link";
import { useSplitLines } from "@/hooks/useSplitLines";
import { useInUp } from "@/hooks/useScrollAnimations";
import { ContactForm } from "@/components/ContactForm";


/**
 * Contact hero — reference `/contact` top block.
 * Breadcrumb → eyebrow → large split-line heading → intro + direct links (left),
 * minimal contact form (right). Stacks to a single column below xl.
 */
export function ContactHero() {
  const headingRef = useSplitLines<HTMLHeadingElement>({ onLoad: true });
  const introRef = useInUp<HTMLDivElement>();

  return (
    <section className="mxd-container pt-[150px] pb-[110px] md:pt-[200px] md:pb-[140px] xl:pt-[230px] xl:pb-[160px]">
      {/* Breadcrumb */}
      <div className="mb-[48px] flex items-center gap-2 md:mb-[64px]">
        <Link
          href="/"
          className="mxd-mono text-muted-foreground transition-colors hover:text-[color:var(--ink)]"
        >
          Home
        </Link>
        <span className="mxd-mono text-muted-foreground">/</span>
        <span className="mxd-mono text-[color:var(--ink)]">Contact</span>
      </div>

      <div className="grid grid-cols-1 gap-x-[60px] gap-y-[60px] xl:grid-cols-12">
        {/* Left — eyebrow + heading + intro */}
        <div className="xl:col-span-8">
          <h1
            ref={headingRef}
            className="mxd-display mt-[26px] font-semibold text-[color:var(--ink)] text-[clamp(44px,6vw,120px)] leading-[1.1] tracking-[-3px]"
          >
            Let&apos;s make it happen
          </h1>

          <div ref={introRef} className="mt-[38px] max-w-[50ch]">
            <p className="font-sans font-bold text-[clamp(17px,2vw,20px)] leading-[1.4] text-[color:var(--body-text)]">
              Have questions? We&apos;ve got the answers! Here, you&apos;ll find clear and concise information about our services, process, and what to expect when working with us. If you need more details, feel free to reach out!
            </p>
          </div>
        </div>

        {/* Right — contact form */}
        <div className="xl:col-span-4 xl:pt-[6px]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
