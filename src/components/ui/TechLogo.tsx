import type { CSSProperties } from "react";
import { TECH_LOGOS } from "@/lib/tech-logos";

/* Very dark brand colours (Next.js, Vercel, GitHub) would vanish in dark
   mode, so those use the text colour on hover instead. */
const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 60;
};

/** A tool as a chip: grey logo + name, the logo turns its brand colour on hover */
export function TechLogo({ name }: { name: string }) {
  const logo = TECH_LOGOS[name];
  const brand = logo && !isDark(logo.hex) ? logo.hex : "var(--ink)";
  return (
    <span
      style={{ "--brand": brand } as CSSProperties}
      className="group inline-flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2 text-[15px] text-ink transition-colors hover:border-line-strong"
    >
      {logo ? (
        <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] shrink-0 fill-muted transition-colors duration-200 group-hover:fill-[var(--brand)]">
          <path d={logo.path} />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden className="h-[16px] w-[16px] shrink-0 text-muted transition-colors group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="8" cy="8" r="2" />
          <path d="M8 2v2.5M8 11.5V14M2 8h2.5M11.5 8H14M3.8 3.8l1.8 1.8M10.4 10.4l1.8 1.8M3.8 12.2l1.8-1.8M10.4 5.6l1.8-1.8" />
        </svg>
      )}
      {name}
    </span>
  );
}
