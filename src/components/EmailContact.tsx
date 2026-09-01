"use client";

import { useInUp } from "@/hooks/useScrollAnimations";

export function EmailContact() {
  const ref = useInUp<HTMLDivElement>();

  return (
    <section className="mxd-container pb-[120px] md:pb-[150px] xl:pb-[180px]">
      <div ref={ref} className="relative group w-fit mx-auto md:mx-0">
        <a
          href="mailto:bigo.company2026@gmail.com"
          className="relative inline-block max-w-full break-all font-sans font-normal text-[clamp(28px,6vw,96px)] leading-[0.8] text-[color:var(--ink)] tracking-[-0.04em] pb-4 md:pb-6 transition-colors duration-300"
        >
          bigo.company2026@gmail.com
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-full h-[2px] md:h-[4px] bg-[color:var(--ink)] scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(.23,.65,.74,1.09)] group-hover:scale-x-0" />
          <span className="absolute bottom-0 right-0 w-full h-[2px] md:h-[4px] bg-[color:var(--accent-blue)] scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(.23,.65,.74,1.09)] group-hover:scale-x-100" />
        </a>
      </div>
    </section>
  );
}
