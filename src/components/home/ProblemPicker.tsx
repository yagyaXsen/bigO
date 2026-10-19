"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PROBLEMS } from "@/lib/content";
import { ArrowLink } from "@/components/ui/Button";

/** "Which one is you?" — choose a problem, read what changes.
 *  Desktop: index left, story right. Phones: a swipeable tab row on top. */
export function ProblemPicker() {
  const [active, setActive] = useState(0);
  const p = PROBLEMS[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-label="Common problems" aria-orientation="vertical" className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-ink lg:px-0">
        {PROBLEMS.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.short}
              type="button"
              role="tab"
              id={`problem-tab-${i}`}
              aria-selected={on}
              aria-controls="problem-panel"
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex shrink-0 snap-start cursor-pointer items-baseline gap-4 text-left transition-colors",
                "border px-4 py-3 lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5",
                on ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink" : "border-line text-muted hover:text-ink",
              )}
            >
              <span className={cn("mono hidden lg:inline", on ? "text-blue" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="whitespace-nowrap text-[15px] font-semibold lg:whitespace-normal lg:font-display lg:text-[22px] lg:tracking-[-0.015em]">
                {item.short}
              </span>
              {on && <span aria-hidden className="absolute -left-4 top-1/2 hidden h-6 w-[3px] -translate-y-1/2 bg-blue lg:block xl:-left-6" />}
            </button>
          );
        })}
      </div>

      <div id="problem-panel" role="tabpanel" aria-labelledby={`problem-tab-${active}`} className="lg:col-span-8">
        <p key={p.problem} className="t-2 max-w-[24ch]">
          &ldquo;{p.problem}&rdquo;
        </p>
        <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
          <div className="bg-paper-2 p-5 md:p-6">
            <p className="text-[13px] font-semibold text-muted">Today</p>
            <ol className="mt-4 space-y-3">
              {p.before.map((step, i) => (
                <li key={step} className="flex gap-3 text-[15px] leading-snug text-muted">
                  <span className="mono pt-px text-[12px]">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-raised p-5 md:p-6">
            <p className="text-[13px] font-semibold text-blue">With bigO</p>
            <ol className="mt-4 space-y-3">
              {p.after.map((step) => (
                <li key={step} className="flex gap-3 text-[15px] leading-snug text-ink">
                  <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-blue" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold text-muted">What we build</p>
            <p className="mt-1 max-w-[44ch] text-[17px] text-ink">
              <strong className="font-semibold">{p.build}.</strong> {p.change}
            </p>
          </div>
          <ArrowLink href={`/services#${p.service}`} className="shrink-0">
            How we build this
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
