"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WORKFLOWS, type WorkflowIcon } from "@/lib/content";

const STEP_MS = 1500;

/* Small 16px line icons for the pipeline nodes */
const ICONS: Record<WorkflowIcon, ReactNode> = {
  mail: <path d="M2.5 4.5h11v7h-11zM2.5 4.5 8 9l5.5-4.5" />,
  ai: <path d="M8 2v2.5M8 11.5V14M2 8h2.5M11.5 8H14M8 5.5 9 7l1.5 1L9 9l-1 1.5L7 9 5.5 8 7 7z" />,
  database: <path d="M3 4c0-1 2.2-1.5 5-1.5S13 3 13 4v8c0 1-2.2 1.5-5 1.5S3 13 3 12zM3 4c0 1 2.2 1.5 5 1.5S13 5 13 4M3 8c0 1 2.2 1.5 5 1.5S13 9 13 8" />,
  pen: <path d="M10.5 3 13 5.5 6 12.5H3.5V10zM9 4.5 11.5 7" />,
  bell: <path d="M4 11V7.5a4 4 0 0 1 8 0V11l1 1.5H3zM6.5 13.5a1.5 1.5 0 0 0 3 0" />,
  lock: <path d="M4 7.5h8v6H4zM5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" />,
  chart: <path d="M3 13V3M3 13h10M5.5 10.5V8M8 10.5V6M10.5 10.5V4.5" />,
  file: <path d="M4 2.5h5L12 5.5v8H4zM9 2.5v3h3M6 8.5h4M6 10.5h4" />,
  card: <path d="M2.5 4.5h11v7h-11zM2.5 7h11M4.5 9.5h2" />,
  scan: <path d="M2.5 5V2.5H5M11 2.5h2.5V5M13.5 11v2.5H11M5 13.5H2.5V11M5 8h6" />,
  shield: <path d="M8 2.5 13 4.5v3.5c0 3-2.2 5-5 5.5-2.8-.5-5-2.5-5-5.5V4.5zM5.8 8l1.5 1.5 3-3" />,
  flag: <path d="M4 14V2.5M4 3h7.5L10 5.5 11.5 8H4" />,
};

function Icon({ name, className }: { name: WorkflowIcon; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      {ICONS[name]}
    </svg>
  );
}

/* Each workflow sets --wf to its own colour. The panel is an ink block, so
   it uses the light variant on the light page and the deep one in dark mode
   (where ink sections flip to paper). */
const colorVars = (c: [string, string]) => ({ "--wf-l": c[0], "--wf-d": c[1] }) as CSSProperties;
const WF = "[--wf:var(--wf-d)] dark:[--wf:var(--wf-l)]";

/* Illustrative elapsed time per step, to read like a run log */
const elapsed = (i: number) => `+${(0.4 + i * 0.8).toFixed(1)}s`;

/** Hero panel: an example automation running step by step, with the
 *  result building up in a "live output" card. Tabs switch workflows; it
 *  pauses on hover/focus and stays still (all done) with reduced motion. */
export function HeroWorkflow() {
  const [tab, setTab] = useState(0);
  // Steps completed so far; steps.length + 1 holds the "complete" state
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const flow = WORKFLOWS[tab];
  const n = flow.steps.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(
      () => {
        if (step < n + 1) setStep(step + 1);
        else {
          setTab((tab + 1) % WORKFLOWS.length);
          setStep(0);
        }
      },
      step === n ? STEP_MS * 2.5 : STEP_MS,
    );
    return () => clearTimeout(t);
  }, [step, tab, paused, reduced, n]);

  const shown = reduced ? n : Math.min(step, n);
  const done = shown >= n;

  return (
    <div
      style={colorVars(flow.color)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(WF, "tone-ink relative w-full min-w-0")}
    >
      {/* Workflow switcher */}
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
            style={colorVars(w.color)}
            className={cn(
              WF,
              "relative flex flex-1 cursor-pointer items-center gap-2 px-4 py-3.5 text-left text-[13px] font-semibold transition-colors",
              i === tab ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            <span aria-hidden className="h-2 w-2 shrink-0" style={{ background: "var(--wf)" }} />
            <span className="truncate">{w.name}</span>
            {i === tab && <span aria-hidden className="absolute inset-x-0 -bottom-px h-[2px]" style={{ background: "var(--wf)" }} />}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 pt-4 mono text-[12px] text-muted">
        <span className="truncate">example · on {flow.trigger}</span>
        <span className="inline-flex shrink-0 items-center gap-2" style={{ color: done ? "var(--wf)" : undefined }}>
          <span
            aria-hidden
            className={cn("h-1.5 w-1.5 rounded-full", !done && "animate-pulse motion-reduce:animate-none")}
            style={{ background: done ? "var(--wf)" : "var(--signal)" }}
          />
          {done ? "done" : "running"}
        </span>
      </div>

      {/* Run log: each step completes in turn */}
      <ol className="px-5 pt-3 pb-1" aria-live="polite">
        {flow.steps.map((s, i) => {
          const state = i < shown ? "done" : i === shown ? "active" : "pending";
          return (
            <li key={s.text} className="flex items-center gap-3 border-b border-line py-2.5 last:border-b-0">
              <span className="mono w-11 shrink-0 text-[12px] text-muted">{state === "pending" ? "" : elapsed(i)}</span>
              <span
                className={cn("flex h-6 w-6 shrink-0 items-center justify-center transition-colors duration-300", state === "pending" && "text-muted/50")}
                style={state === "done" ? { background: "var(--wf)", color: "var(--paper)" } : state === "active" ? { color: "var(--wf)", boxShadow: "inset 0 0 0 1px var(--wf)" } : undefined}
              >
                <Icon name={s.icon} className="h-[14px] w-[14px]" />
              </span>
              <span className={cn("flex-1 text-[14.5px] leading-snug transition-colors duration-300", state === "pending" ? "text-muted/60" : "text-ink")}>
                {s.text}
                {state === "active" && (
                  <span aria-hidden className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse motion-reduce:animate-none" style={{ background: "var(--wf)" }} />
                )}
              </span>
            </li>
          );
        })}
      </ol>

      {/* The record the run produces, filling in as steps finish */}
      <div className="m-5 mt-3 border-t-2 pt-4" style={{ borderColor: "var(--wf)" }}>
        <p className="truncate text-[13px] font-semibold text-ink">
          {flow.output.title} <span className="font-normal text-muted">· {flow.output.preview}</span>
        </p>
        <dl className="mono mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[12.5px]">
          {flow.steps.map((s, i) => (
            <div key={s.text} className="contents">
              <dt className="text-muted">{s.out[0].toLowerCase()}</dt>
              <dd className="min-w-0 truncate text-ink">
                {i < shown ? s.out[1] : <span aria-hidden className="inline-block h-2 w-20 bg-line align-middle" />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
