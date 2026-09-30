"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInUp } from "@/hooks/useScrollAnimations";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { PROJECTS, shot, type WorkProject } from "@/lib/projects";

/* Same tag stagger + bezier as CaseStudies */
const TAG_SHIFT = [
  "group-hover:translate-y-[4px]",
  "group-hover:translate-y-[8px]",
  "group-hover:translate-y-[12px]",
  "group-hover:translate-y-[16px]",
];
const ANIM_BEZIER = "ease-[cubic-bezier(.23,.65,.74,1.09)]";

export function WorkProjects() {
  return (
    <section
      id="works"
      className="mxd-container flex flex-col gap-[110px] pb-[140px] md:gap-[140px] md:pb-[170px] xl:gap-[180px] xl:pb-[180px] min-[1600px]:pb-[200px]"
    >
      {PROJECTS.map((p) => (
        <ProjectRow key={p.id} project={p} />
      ))}
    </section>
  );
}

function ProjectRow({ project: p }: { project: WorkProject }) {
  const counterRef = useInUp<HTMLDivElement>();
  const bodyRef = useInUp<HTMLDivElement>();

  return (
    <article id={p.id} className="grid scroll-mt-10 grid-cols-1 gap-x-[60px] xl:grid-cols-12">
      <div ref={counterRef} className="mb-[21px] flex flex-col items-start gap-5 self-start xl:sticky xl:top-10 xl:col-span-4">
        <span className="block font-mono text-[42px] font-medium leading-none tracking-[-2.4px] text-muted-foreground md:text-[52px] md:tracking-[-3px] xl:text-[60px] min-[1600px]:text-[74px]">
          <ScrambleText text={`P/${p.num}`} triggerOn="hover" />
        </span>
        <StatusBadge label={p.status} />
      </div>

      <div ref={bodyRef} className="group flex flex-col gap-[22px] xl:col-span-8">
        <ProjectMedia project={p} />

        <div className="flex items-start justify-between gap-6 md:gap-[60px]">
          <div className={cn("flex flex-col gap-[10px] transition-transform duration-300 group-hover:translate-y-[4px]", ANIM_BEZIER)}>
            <h2 className="font-sans text-[34px] font-semibold leading-[1.1] tracking-[-1.8px] text-[color:var(--ink)] md:text-[44px] xl:text-[54px]">
              {p.title}
            </h2>
            <p className="mxd-eyebrow">{p.subtitle}</p>
          </div>
          <ul className="flex flex-col items-end pt-[4px]">
            {p.tags.map((tag, i) => (
              <li
                key={tag}
                className={cn(
                  "mxd-mono whitespace-nowrap text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)] transition-transform duration-300",
                  ANIM_BEZIER,
                  TAG_SHIFT[i] ?? TAG_SHIFT[3]
                )}
              >
                <ScrambleText text={tag.toUpperCase()} triggerOn="hover" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[26px] grid grid-cols-1 gap-x-[60px] gap-y-10 border-t border-border pt-[34px] md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <p className="font-sans font-bold text-[clamp(17px,2vw,20px)] leading-[1.4] text-[color:var(--body-text)]">
              {p.description}
            </p>
            {p.flow && p.flowLabel && <FlowSteps label={p.flowLabel} steps={p.flow} />}
          </div>

          <div className="flex flex-col gap-9">
            <div>
              <p className="mxd-eyebrow mb-4">/ HIGHLIGHTS</p>
              <ul className="flex flex-col gap-[18px]">
                {p.highlights.map((h) => (
                  <li key={h.h} className="flex flex-col gap-1">
                    <span className="text-[18px] font-semibold leading-[1.4] tracking-[-0.2px] text-[color:var(--ink)]">{h.h}</span>
                    <span className="text-[15px] leading-[1.5] text-[color:var(--body-text)]">{h.d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {p.stack && p.stack.length > 0 && (
              <div>
                <p className="mxd-eyebrow mb-4">/ STACK</p>
                <ul className="flex flex-wrap gap-x-[18px] gap-y-[6px]">
                  {p.stack.map((s) => (
                    <li key={s} className="mxd-mono text-[12px] leading-[1.6] tracking-[0.5px] text-[color:var(--body-text)]">
                      <ScrambleText text={s.toUpperCase()} triggerOn="hover" />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.links.length > 0 && (
              <div className="flex flex-wrap gap-x-8 gap-y-[14px]">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mxd-mono inline-flex gap-[10px] text-[16px] font-medium leading-[1.6] tracking-[0.5px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] md:text-[18px]",
                      "before:content-['['] after:content-[']']",
                      "before:transition-transform before:duration-300 after:transition-transform after:duration-300",
                      "hover:before:-translate-x-[2px] hover:after:translate-x-[2px]"
                    )}
                  >
                    <ScrambleText text={l.label.toUpperCase()} triggerOn="hover" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground select-none">
      <span className="h-1 w-1 rounded-full bg-[color:var(--accent-blue)] opacity-80 animate-pulse" />
      {label}
    </span>
  );
}

/** Browser-frame preview. Live sites: tall screenshot that scrolls on hover.
 *  Retries mshots while it returns its 400×300 "generating" placeholder. */
function ProjectMedia({ project: p }: { project: WorkProject }) {
  const [ready, setReady] = useState(false);
  const [retry, setRetry] = useState(0);
  const [videoOk, setVideoOk] = useState(true);
  const checkShot = (img: HTMLImageElement) => {
    if (img.naturalWidth >= 1000) return setReady(true);
    if (retry < 6) setTimeout(() => setRetry((r) => r + 1), 3000);
  };

  // A cached screenshot can finish loading before hydration, so onLoad never fires.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (!img?.complete || !img.naturalWidth) return;
    if (img.naturalWidth >= 1000) setReady(true);
    else setTimeout(() => setRetry((r) => r + 1), 3000);
  }, []);

  const Frame = p.live ? "a" : "div";

  return (
    <Frame
      {...(p.live ? { href: p.live, target: "_blank", rel: "noopener noreferrer", "data-cursor-text": "View live" } : {})}
      className="block overflow-hidden border border-border bg-card"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 mxd-mono text-[12px] text-muted-foreground">
        <span className="truncate">{p.url}</span>
        <span className="whitespace-nowrap transition-colors group-hover:text-[color:var(--accent-blue)]">
          {p.live ? "Hover to scroll" : "In progress · Thailand → Global"}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {p.live && (
          // eslint-disable-next-line @next/next/no-img-element -- remote screenshot service
          <img
            src={shot(p.live) + (retry ? `&_r=${retry}` : "")}
            alt={`${p.title} website`}
            ref={imgRef}
            onLoad={(e) => checkShot(e.currentTarget)}
            className={cn(
              "absolute left-0 top-0 block h-auto w-full transition-[top,transform,opacity] duration-1000",
              "group-hover:top-full group-hover:-translate-y-full group-hover:duration-[7000ms] group-hover:ease-in-out",
              ready ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        {p.video &&
          (videoOk ? (
            <VideoLoop src={p.video.src} poster={p.video.poster} onFail={() => setVideoOk(false)} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- remote poster fallback
            <img
              src={p.video.poster}
              alt={`${p.title} preview`}
              className={cn("absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105", ANIM_BEZIER)}
            />
          ))}
      </div>
    </Frame>
  );
}

function VideoLoop({ src, poster, onFail }: { src: string; poster: string; onFail: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Autoplay can miss on a server-rendered <video>; kick it once data is in
  // (loadeddata may already have fired before hydration).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else v.addEventListener("loadeddata", play, { once: true });
    return () => v.removeEventListener("loadeddata", play);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      onError={onFail}
      className={cn("absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105", ANIM_BEZIER)}
    >
      <source src={src} type="video/mp4" onError={onFail} />
    </video>
  );
}

function FlowSteps({ label, steps }: { label: string; steps: string[] }) {
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 1400);
    return () => clearInterval(t);
  }, [steps.length]);

  const active = pinned ?? step;

  return (
    <div onPointerLeave={() => setPinned(null)}>
      <p className="mxd-eyebrow mb-4">{label}</p>
      <ol className="flex flex-col">
        {steps.map((s, k) => (
          <li
            key={s}
            onPointerEnter={() => setPinned(k)}
            className="flex items-center gap-[18px] border-t border-border py-3"
          >
            <span className="mxd-mono text-[12px] tracking-[0.5px] text-muted-foreground">
              [{String(k + 1).padStart(2, "0")}]
            </span>
            <span
              className={cn(
                "text-[18px] leading-[1.4] transition-all duration-300",
                ANIM_BEZIER,
                k === active ? "translate-x-[6px] text-[color:var(--accent-blue)]" : "text-[color:var(--ink)]"
              )}
            >
              {s}
            </span>
            <span
              className={cn(
                "ml-auto h-[2px] bg-[color:var(--accent-blue)] transition-[width] duration-400",
                ANIM_BEZIER,
                k === active ? "w-12" : "w-0"
              )}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
