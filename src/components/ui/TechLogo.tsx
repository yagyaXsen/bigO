import type { CSSProperties } from "react";
import { TECH_LOGOS } from "@/lib/tech-logos";

/* Very dark brand colours (Next.js, Vercel, GitHub) would vanish on dark
   backgrounds, so those use the text colour on hover instead. */
const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 60;
};

/** A tool as logo + name, no box. The mark takes its brand colour on hover. */
export function TechLogo({ name }: { name: string }) {
  const logo = TECH_LOGOS[name];
  const brand = logo && !isDark(logo.hex) ? logo.hex : "var(--ink)";
  return (
    <span style={{ "--brand": brand } as CSSProperties} className="group inline-flex items-center gap-2 text-[15px] text-ink">
      {logo ? (
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0 fill-muted transition-colors duration-200 group-hover:fill-[var(--brand)]">
          <path d={logo.path} />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="5.5" />
        </svg>
      )}
      {name}
    </span>
  );
}
