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

/* Each workflow sets --wf to its own colour (lighter in dark mode) */
const colorVars = (c: [string, string]) => ({ "--wf-l": c[0], "--wf-d": c[1] }) as CSSProperties;
const WF = "[--wf:var(--wf-l)] dark:[--wf:var(--wf-d)]";
const tint = (pct: number) => `color-mix(in srgb, var(--wf) ${pct}%, transparent)`;

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
  const fill = n > 1 ? Math.min(shown, n - 1) / (n - 1) : 1;

  return (
    <div
      style={colorVars(flow.color)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(WF, "w-full min-w-0 overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_48px_-32px_rgba(17,17,17,0.25)]")}
    >
      {/* Tabs — each shows its own colour */}
      <div role="tablist" aria-label="Example workflows" className="flex border-b border-line bg-bg-alt/60">
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
              "relative flex flex-1 cursor-pointer items-center gap-2 px-3 py-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors",
              i === tab ? "bg-surface text-ink" : "text-muted hover:text-ink",
            )}
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--wf)" }} />
            <span className="truncate">{w.name}</span>
            {i === tab && <span aria-hidden className="absolute inset-x-0 bottom-[-1px] h-0.5" style={{ background: "var(--wf)" }} />}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 pt-4 font-mono text-[11px] text-muted">
        <span>example workflow · {flow.trigger}</span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 transition-colors"
          style={{ color: "var(--wf)", background: tint(done ? 16 : 9) }}
        >
          <span
            aria-hidden
            className={cn("h-1.5 w-1.5 rounded-full", !done && "animate-pulse motion-reduce:animate-none")}
            style={{ background: "var(--wf)" }}
          />
          {done ? "complete" : "running"}
        </span>
      </div>

      {/* Pipeline: nodes joined by a line that fills with the workflow colour */}
      <ol className="relative px-5 pt-3" aria-live="polite">
        <span aria-hidden className="absolute top-[30px] bottom-[18px] left-[35px] w-px bg-line" />
        <span
          aria-hidden
          className="absolute top-[30px] left-[35px] w-px transition-[height] duration-700 ease-out"
          style={{ background: "var(--wf)", height: `calc((100% - 48px) * ${fill})` }}
        />
        {flow.steps.map((s, i) => {
          const state = i < shown ? "done" : i === shown ? "active" : "pending";
          return (
            <li key={s.text} className="relative flex items-center gap-4 py-[7px]">
              <span
                className={cn(
                  "relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  state === "pending" && "border-line bg-surface text-muted/60",
                  state === "active" && "scale-110 bg-surface",
                  state === "done" && "border-transparent text-surface",
                )}
                style={
                  state === "done"
                    ? { background: "var(--wf)" }
                    : state === "active"
                      ? { borderColor: "var(--wf)", color: "var(--wf)", boxShadow: `0 0 0 4px ${tint(14)}` }
                      : undefined
                }
              >
                <Icon name={s.icon} className="h-[15px] w-[15px]" />
              </span>
              <span
                className={cn(
                  "text-[14.5px] leading-snug transition-colors duration-300",
                  state === "pending" ? "text-muted/70" : "text-ink",
                  state === "active" && "font-medium",
                )}
              >
                {s.text}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Live output: the result builds up as steps finish */}
      <div className="m-5 mt-4 rounded-md border p-4" style={{ borderColor: tint(28), background: tint(5) }}>
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.06em]" style={{ color: "var(--wf)" }}>
            Live output
          </p>
          <p className="truncate font-mono text-[11px] text-muted">{flow.output.title}</p>
        </div>
        <p className="mt-2 truncate font-serif text-[17px] text-ink">{flow.output.preview}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {flow.steps.map((s, i) => {
            const ready = i < shown;
            return (
              <div key={s.text} className={cn("min-w-0", i === n - 1 && n % 2 === 1 && "col-span-2")}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">{s.out[0]}</dt>
                <dd className="mt-0.5 h-5 text-[13px] text-ink">
                  {ready ? (
                    <span className="block truncate transition-opacity duration-500">{s.out[1]}</span>
                  ) : (
                    <span aria-hidden className="mt-1.5 block h-2 w-3/4 rounded-full bg-line" />
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
