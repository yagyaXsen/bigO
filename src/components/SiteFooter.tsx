"use client";

import { ArrowUpRightIcon, PlusIcon } from "@/components/icons";
import Link from "next/link";

const DISCOVER_LINKS = [
  "Home",
  "About us",
  "Case studies",
  "Services",
  "Our team",
  "Insights",
  "Contact",
];

const INFO_LINKS = ["Pricing", "FAQ"];

const ECOSYSTEM_LINKS = [
  { num: "01", label: "Community" },
  { num: "02", label: "Instagram" },
  { num: "03", label: "WhatsApp" },
  { num: "04", label: "LinkedIn" },
];

const BOTTOM_ROW = [
  "Copyright bigO. All rights reserved",
  "React Nextjs Template by IB Themes",
  "©2026",
];

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background overflow-hidden">
      <div className="mxd-container pt-[180px] pb-[100px]">
        {/* Top: 3-column link grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Col 1: DISCOVER */}
          <div className="col-span-12 md:col-span-4">
            <p className="mxd-eyebrow mb-8">/ DISCOVER</p>
            <ul className="flex flex-col">
              {DISCOVER_LINKS.map((label) => {
                const href = label === "Home" ? "/" : label === "Contact" ? "/start-project" : "#";
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-muted-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 2: CONTACT */}
          <div className="col-span-12 md:col-span-4">
            <p className="mxd-eyebrow mb-8">/ CONTACT</p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:bigo.company2026@gmail.com"
                className="text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-muted-foreground"
              >
                bigo.company2026@gmail.com
              </a>
              <a
                href="tel:+918875326549"
                className="text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-muted-foreground"
              >
                +918875326549
              </a>
            </div>

            <p className="mxd-eyebrow mb-8 mt-16">/ INFO</p>
            <ul className="flex flex-col">
              {INFO_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[color:var(--ink)] text-[clamp(20px,1.7vw,26px)] leading-[1.5] transition-colors duration-200 hover:text-muted-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: ECOSYSTEM */}
          <div className="col-span-12 md:col-span-4">
            <p className="mxd-eyebrow mb-8">/ ECOSYSTEM</p>
            <ul className="flex flex-col">
              {ECOSYSTEM_LINKS.map(({ num, label }) => (
                <li key={num}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 border-t border-border py-[18px]"
                  >
                    <span className="flex items-center gap-6">
                      <span className="mxd-mono text-muted-foreground">
                        [{num}]
                      </span>
                      <span className="text-[color:var(--ink)] text-[clamp(18px,1.4vw,22px)] transition-colors duration-200 group-hover:text-muted-foreground">
                        {label}
                      </span>
                    </span>
                    <ArrowUpRightIcon
                      className="h-[18px] w-[18px] text-[color:var(--ink)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle: BACK TO TOP */}
        <div className="mt-[clamp(60px,8vw,120px)] flex justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[color:var(--ink)]"
          >
            <span className="mxd-mono text-[color:var(--ink)]">BACK TO TOP</span>
            <PlusIcon
              className="h-[14px] w-[14px] transition-transform duration-200 group-hover:rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Bottom: giant wordmark */}
        <div className="mt-[clamp(40px,5vw,80px)]">
          <p className="text-[clamp(90px,22vw,360px)] font-bold leading-[0.8] tracking-[-0.02em] text-[color:var(--ink)] text-center whitespace-nowrap">
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
