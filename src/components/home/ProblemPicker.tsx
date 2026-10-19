"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PROBLEMS, type Problem } from "@/lib/content";
import { ArrowLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Before → after for one problem, and what we'd build */
function Detail({ p }: { p: Problem }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5 md:p-7">
      <div className="flex items-center gap-3">
        <ServiceIcon id={p.service} className="h-10 w-10" />
        <div>
          <p className="label">What we build</p>
          <p className="text-[16px] font-medium text-accent">{p.build}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-bg-alt p-4">
          <p className="label">Today</p>
          <ol className="mt-3 space-y-2.5">
            {p.before.map((step) => (
              <li key={step} className="flex gap-2.5 text-[14.5px] leading-snug text-muted">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" />
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-md border border-accent/30 bg-accent-soft p-4">
          <p className="label text-accent">With bigO</p>
          <ol className="mt-3 space-y-2.5">
            {p.after.map((step) => (
              <li key={step} className="flex gap-2.5 text-[14.5px] leading-snug text-ink">
                <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="mt-6 font-serif text-[20px] leading-snug text-ink">{p.change}</p>
      <ArrowLink href={`/services#${p.service}`} className="mt-5">
        How we build this
      </ArrowLink>
    </div>
  );
}

/** "Which one is you?" — pick a problem to see what changes. The detail
 *  sits beside the list on large screens and under the chosen item below. */
export function ProblemPicker() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <p className="label mb-4">Which one is you?</p>
        <ul className="space-y-2">
          {PROBLEMS.map((p, i) => {
            const on = i === active;
            return (
              <li key={p.short}>
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-4 rounded-lg border p-4 text-left transition-colors",
                    on ? "border-accent bg-surface shadow-[0_8px_24px_-16px_rgba(17,17,17,0.3)]" : "border-line bg-transparent hover:border-line-strong hover:bg-surface",
                  )}
                >
                  <span className={cn("label pt-1", on && "text-accent")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className={cn("block font-serif text-[19px] leading-snug md:text-[20px]", on ? "text-ink" : "text-text")}>
                      {p.problem}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-2 h-2.5 w-2.5 shrink-0 rounded-full border transition-colors",
                      on ? "border-accent bg-accent" : "border-line-strong",
                    )}
                  />
                </button>
                {on && (
                  <div className="mt-3 lg:hidden">
                    <Detail p={p} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-24" aria-live="polite">
          <Detail p={PROBLEMS[active]} />
        </div>
      </div>
    </div>
  );
}
