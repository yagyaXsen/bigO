"use client";

import { ArrowUpRightIcon, PlusIcon } from "@/components/icons";
import Link from "next/link";

const DISCOVER_LINKS = [
  { label: "Home", href: "/", isAvailable: true },
  { label: "About us", href: "#", isAvailable: false },
  { label: "Case studies", href: "#", isAvailable: false },
  { label: "Services", href: "#", isAvailable: false },
  { label: "Our team", href: "#", isAvailable: false },
  { label: "Insights", href: "#", isAvailable: false },
  { label: "Contact", href: "/contact", isAvailable: true },
];

const INFO_LINKS = [
  { label: "Pricing", href: "#", isAvailable: false },
  { label: "FAQ", href: "#", isAvailable: false },
];

const ECOSYSTEM_LINKS = [
  { num: "01", label: "Community", href: "#", isAvailable: false },
  { num: "02", label: "Instagram", href: "https://www.instagram.com/thebigoteam/", isAvailable: true },
  { num: "03", label: "WhatsApp", href: "https://wa.me/918875326549", isAvailable: true },
  { num: "04", label: "LinkedIn", href: "https://www.linkedin.com/in/alok-kumar-40681b323/", isAvailable: true },
];

const BOTTOM_ROW = [
  "Copyright bigO. All rights reserved",
  "Design & Engineering by bigO Digital Studio",
  "©2026",
];

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground select-none">
      <span className="h-1 w-1 rounded-full bg-[color:var(--accent-blue)] opacity-80 animate-pulse" />
      Coming soon
    </span>
  );
}

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background overflow-hidden border-t border-border/40">
      <div className="mxd-container pt-[180px] pb-[100px]">
        {/* Top: 3-column link grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Col 1: DISCOVER */}
          <div className="col-span-12 md:col-span-4">
            <p className="mxd-eyebrow mb-8">/ DISCOVER</p>
            <ul className="flex flex-col gap-1.5">
              {DISCOVER_LINKS.map((item) => (
                <li key={item.label}>
                  {item.isAvailable ? (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-3 text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-[color:var(--accent-blue)] cursor-pointer"
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div className="group inline-flex items-center gap-3 text-muted-foreground/70 text-[clamp(20px,1.7vw,26px)] leading-[1.5]">
                      <span className="transition-colors duration-200 group-hover:text-[color:var(--ink)]">
                        {item.label}
                      </span>
                      <ComingSoonBadge />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: CONTACT & INFO */}
          <div className="col-span-12 md:col-span-4">
            <p className="mxd-eyebrow mb-8">/ CONTACT</p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:bigo.company2026@gmail.com"
                className="text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-[color:var(--accent-blue)]"
              >
                bigo.company2026@gmail.com
              </a>
              <a
                href="https://wa.me/918875326549"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-[color:var(--accent-blue)]"
              >
                +91 8875326549
              </a>
            </div>

            <p className="mxd-eyebrow mb-8 mt-16">/ INFO</p>
            <ul className="flex flex-col gap-1.5">
              {INFO_LINKS.map((item) => (
                <li key={item.label}>
                  {item.isAvailable ? (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-3 text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-[color:var(--accent-blue)]"
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div className="group inline-flex items-center gap-3 text-muted-foreground/70 text-[clamp(20px,1.7vw,26px)] leading-[1.5]">
                      <span className="transition-colors duration-200 group-hover:text-[color:var(--ink)]">
                        {item.label}
                      </span>
                      <ComingSoonBadge />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: ECOSYSTEM */}
          <div className="col-span-12 md:col-span-4">
            <p className="mxd-eyebrow mb-8">/ ECOSYSTEM</p>
            <ul className="flex flex-col">
              {ECOSYSTEM_LINKS.map(({ num, label, href, isAvailable }) => (
                <li key={num}>
                  {isAvailable ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between gap-4 border-t border-border py-[18px] transition-colors duration-200 hover:border-[color:var(--accent-blue)]/50"
                    >
                      <span className="flex items-center gap-6">
                        <span className="mxd-mono text-muted-foreground">
                          [{num}]
                        </span>
                        <span className="text-[color:var(--ink)] text-[clamp(18px,1.4vw,22px)] transition-colors duration-200 group-hover:text-[color:var(--accent-blue)]">
                          {label}
                        </span>
                      </span>
                      <ArrowUpRightIcon
                        className="h-[18px] w-[18px] text-[color:var(--ink)] transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--accent-blue)]"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <div className="group flex items-center justify-between gap-4 border-t border-border py-[18px]">
                      <span className="flex items-center gap-6">
                        <span className="mxd-mono text-muted-foreground">
                          [{num}]
                        </span>
                        <span className="text-muted-foreground/80 text-[clamp(18px,1.4vw,22px)] transition-colors duration-200 group-hover:text-[color:var(--ink)]">
                          {label}
                        </span>
                      </span>
                      <ComingSoonBadge />
                    </div>
                  )}
                </li>
              ))}
              <li className="border-t border-border" aria-hidden />
            </ul>
          </div>
        </div>

        {/* Middle: BACK TO TOP */}
        <div className="mt-[clamp(60px,8vw,120px)] flex justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[color:var(--ink)] cursor-pointer"
          >
            <span className="mxd-mono text-[color:var(--ink)] group-hover:text-[color:var(--accent-blue)] transition-colors">
              BACK TO TOP
            </span>
            <PlusIcon
              className="h-[14px] w-[14px] transition-transform duration-300 group-hover:rotate-90 group-hover:text-[color:var(--accent-blue)]"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Bottom: giant wordmark */}
        <div className="mt-[clamp(40px,5vw,80px)]">
          <p className="text-[clamp(90px,22vw,360px)] font-bold leading-[0.8] tracking-[-0.02em] text-[color:var(--ink)] text-center whitespace-nowrap select-none">
            bigO
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            {BOTTOM_ROW.map((text) => (
              <span
                key={text}
                className="mxd-mono text-[11px] text-muted-foreground"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
