"use client";

import { useInUp } from "@/hooks/useScrollAnimations";

interface Office {
  num: string;
  city: string;
  lines: string[];
  phone: string;
  phoneHref: string;
  email: string;
}

const OFFICES: Office[] = [
  {
    num: "01",
    city: "Delhi NCR",
    lines: ["Cyber City, DLF Phase 2", "Gurugram, Haryana 122002"],
    phone: "+91 8875326549",
    phoneHref: "tel:+918875326549",
    email: "bigo.company2026@gmail.com",
  },
];

/**
 * Office / location section — reference "Welcome to our office".
 * Heading + intro on the left; two location blocks side by side on the right,
 * stacking on mobile. Each block: index, city, address, phone, email.
 */
export function OfficeSection() {
  const headRef = useInUp<HTMLDivElement>();
  const blocksRef = useInUp<HTMLDivElement>(".office-block");

  return (
    <section className="mxd-container pt-[120px] pb-[130px] md:pt-[150px] md:pb-[160px]">
      <div className="grid grid-cols-1 gap-x-[60px] gap-y-[56px] xl:grid-cols-12">
        {/* Left — eyebrow + heading + intro */}
        <div ref={headRef} className="xl:col-span-4">
          <h2 className="mxd-display text-[color:var(--ink)] text-[clamp(44px,5vw,75px)] font-semibold leading-[1.1] tracking-[-3px]">
            Welcome to our
            <br />
            office
          </h2>
          <p className="mt-[30px] max-w-[38ch] font-sans text-[16px] leading-[1.6] text-[color:var(--body-text)] md:text-[17px]">
            Inspiring ideas, creative insights, and the latest in design and tech. Fueling innovation for your digital journey.
          </p>
        </div>

        {/* Right — two office blocks */}
        <div
          ref={blocksRef}
          className="grid grid-cols-1 gap-x-[60px] gap-y-[48px] md:grid-cols-2 xl:col-span-8 xl:pt-[6px]"
        >
          {OFFICES.map((o) => (
            <div key={o.num} className="office-block border-t border-[color:var(--border)] pt-[28px]">
              <span className="mxd-mono text-muted-foreground">/ {o.num}</span>
              <h3 className="mxd-display mt-[18px] text-[color:var(--ink)] text-[28px] leading-[1.15] tracking-[-0.6px] md:text-[32px]">
                {o.city}
              </h3>
              <address className="mt-[18px] not-italic font-sans text-[16px] leading-[1.7] text-[color:var(--body-text)]">
                {o.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <div className="mt-[20px] flex flex-col gap-1.5">
                <a
                  href={o.phoneHref}
                  className="w-fit font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--ink)] underline-offset-4 transition-colors hover:text-[color:var(--accent-blue)] hover:underline"
                >
                  {o.phone}
                </a>
                <a
                  href={`mailto:${o.email}`}
                  className="w-fit font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--ink)] underline-offset-4 transition-colors hover:text-[color:var(--accent-blue)] hover:underline"
                >
                  {o.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
