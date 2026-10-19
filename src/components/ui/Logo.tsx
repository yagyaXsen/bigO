import { cn } from "@/lib/utils";

/** Wordmark: "big" set in the display face, the O drawn as a ring — the
 *  one graphic motif of the brand (Big O: work that stays small as you grow). */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline font-display font-bold tracking-[-0.04em] text-ink", className)}>
      big
      {/* Cap-height ring sitting on the baseline, so it reads as a capital O */}
      <svg viewBox="0 0 20 20" aria-hidden className="ml-[0.05em] h-[0.72em] w-[0.72em] self-baseline">
        <circle cx="10" cy="10" r="8.4" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span className="sr-only">O</span>
    </span>
  );
}
