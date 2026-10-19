"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WORKFLOWS } from "@/lib/content";

const STEP_MS = 1400;

/** Hero panel: an example automation running step by step. Tabs switch
 *  between workflows; it pauses on hover/focus and stays still (all steps
 *  done) for people who prefer reduced motion. */
export function HeroWorkflow() {
  const [tab, setTab] = useState(0);
  // Steps completed so far; steps.length + 1 holds the "complete" state briefly
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const flow = WORKFLOWS[tab];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => {
      if (step < flow.steps.length + 1) setStep(step + 1);
      else {
        // Finished: move on to the next workflow
        setTab((tab + 1) % WORKFLOWS.length);
        setStep(0);
      }
    }, step === flow.steps.length ? STEP_MS * 2 : STEP_MS);
    return () => clearTimeout(t);
  }, [step, tab, paused, reduced, flow.steps.length]);

  const shown = reduced ? flow.steps.length : step;
  const done = shown >= flow.steps.length;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="border border-line bg-surface"
    >
      {/* Workflow tabs */}
      <div role="tablist" aria-label="Example workflows" className="flex border-b border-line">
        {WORKFLOWS.map((w, i) => (
          <button
            key={w.name}
            type="button"
            role="tab"
            aria-selected={i === tab}
            onClick={() => {
              setTab(i);
              setStep(0);
            }}
            className={cn(
              "flex-1 cursor-pointer border-r border-line px-3 py-3 text-left font-mono text-[11px] uppercase tracking-[0.06em] transition-colors last:border-r-0",
              i === tab ? "bg-bg-alt text-ink" : "text-muted hover:text-ink",
            )}
          >
            {w.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 pt-5 font-mono text-[12px] text-muted">
        <span>example workflow · {flow.trigger}</span>
        <span className={cn("inline-flex items-center gap-2", done ? "text-accent" : "")}>
          <span
            aria-hidden
            className={cn("h-1.5 w-1.5 rounded-full", done ? "bg-accent" : "animate-pulse bg-muted motion-reduce:animate-none")}
          />
          {done ? "complete" : "running"}
        </span>
      </div>

      <ol className="px-5 pt-3 pb-2" aria-live="polite">
        {flow.steps.map((text, i) => {
          const state = i < shown ? "done" : i === shown ? "active" : "pending";
          return (
            <li key={text} className="flex items-center gap-4 border-b border-line py-3.5 last:border-b-0">
              <span className={cn("w-5 font-mono text-[12px]", state === "pending" ? "text-muted/60" : "text-accent")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 text-[15px] transition-colors duration-300",
                  state === "pending" ? "text-muted/70" : "text-ink",
                  state === "active" && "font-medium",
                )}
              >
                {text}
              </span>
              <span aria-hidden className="flex h-4 w-4 items-center justify-center">
                {state === "done" ? (
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : state === "active" ? (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full border border-line-strong" />
                )}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="border-t border-line px-5 py-3.5 text-[13px] text-muted">{flow.note}</p>
    </div>
  );
}
