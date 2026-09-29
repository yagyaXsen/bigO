"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Matter from "matter-js";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";

interface TagConfig {
  text: string;
  initialX: number; // percentage 0 - 100
  initialAngle?: number;
}

const TAGS_CONFIG: TagConfig[] = [
  { text: "WEBSITES", initialX: 6 },
  { text: "WEB APPS", initialX: 18 },
  { text: "E-COMMERCE", initialX: 28 },
  { text: "AI & AUTOMATION", initialX: 36, initialAngle: Math.PI / 2 },
  { text: "UI/UX DESIGN", initialX: 44 },
  { text: "BRANDING", initialX: 43 },
  { text: "LOGO DESIGN", initialX: 54 },
  { text: "SEO", initialX: 43 },
  { text: "SOCIAL MEDIA", initialX: 53, initialAngle: Math.PI },
  { text: "META ADS", initialX: 64 },
  { text: "GOOGLE ADS", initialX: 77 },
  { text: "MAINTENANCE", initialX: 75 },
  { text: "HOSTING", initialX: 86, initialAngle: Math.PI / 2 },
  { text: "INTEGRATIONS", initialX: 94 },
];

const GROUND_THICKNESS = 100;
const GROUND_WIDTH = 10000; // wide enough that a resize never exposes an edge
const STEP_MS = 1000 / 60;

/* Matter.Mouse's DOM handlers aren't in its type definitions */
type MouseHandlers = {
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
  mousewheel: EventListener;
};

export function PhysicsCta() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  const subtitleRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const { Engine, World, Bodies, Mouse, MouseConstraint, Body, Composite } = Matter;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canDrag = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animId = 0;
    let running = false;
    let cancelled = false;
    let teardownWorld: (() => void) | null = null;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.15, scale: 0.001 },
      enableSleeping: true,
    });
    const world = engine.world;

    const wallOptions = { isStatic: true, friction: 0.6, restitution: 0.2 };
    const ground = Bodies.rectangle(width / 2, height + GROUND_THICKNESS / 2, GROUND_WIDTH, GROUND_THICKNESS, wallOptions);
    const leftWall = Bodies.rectangle(-GROUND_THICKNESS / 2, height / 2, GROUND_THICKNESS, height * 4, wallOptions);
    const rightWall = Bodies.rectangle(width + GROUND_THICKNESS / 2, height / 2, GROUND_THICKNESS, height * 4, wallOptions);
    World.add(world, [ground, leftWall, rightWall]);

    const build = () => {
      if (cancelled) return;

      // Tag sizes come from the rendered DOM so text length and breakpoints match
      const tags = TAGS_CONFIG.map((cfg, index) => {
        const el = tagRefs.current[index]!;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const body = Bodies.rectangle(
          (cfg.initialX / 100) * (width - 60) + 30,
          -50 - index * 35,
          w,
          h,
          {
            chamfer: { radius: 4 },
            restitution: 0.25,
            friction: 0.4,
            density: 0.0025,
            angle: cfg.initialAngle ?? Math.random() * 0.2 - 0.1,
          },
        );
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.5, y: Math.random() * 2 + 1 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
        return { el, body, w, h };
      });
      World.add(world, tags.map((t) => t.body));

      const render = (all = false) => {
        for (const { el, body, w, h } of tags) {
          if (!all && body.isSleeping) continue;
          el.style.transform = `translate3d(${body.position.x - w / 2}px, ${body.position.y - h / 2}px, 0) rotate(${body.angle}rad)`;
        }
      };

      const reveal = () => {
        for (const { el } of tags) el.style.visibility = "visible";
      };

      if (reduceMotion) {
        // Settle instantly and draw the resting pile once
        for (let i = 0; i < 900; i++) Engine.update(engine, STEP_MS);
        render(true);
        reveal();
      }

      // Drag & fling on mouse devices only; touch keeps normal page scrolling
      let mouseCleanup: (() => void) | null = null;
      if (canDrag) {
        const mouse = Mouse.create(container);
        const handlers = mouse as unknown as MouseHandlers;
        container.removeEventListener("wheel", handlers.mousewheel);
        container.removeEventListener("touchmove", handlers.mousemove);
        container.removeEventListener("touchstart", handlers.mousedown);
        container.removeEventListener("touchend", handlers.mouseup);
        // Release a dragged tag even when the button comes up outside the area
        window.addEventListener("mouseup", handlers.mouseup);

        World.add(
          world,
          MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
          }),
        );

        mouseCleanup = () => {
          container.removeEventListener("mousemove", handlers.mousemove);
          container.removeEventListener("mousedown", handlers.mousedown);
          container.removeEventListener("mouseup", handlers.mouseup);
          window.removeEventListener("mouseup", handlers.mouseup);
        };
      }

      // Fixed 60 Hz steps so the fall looks the same on any refresh rate
      let last = 0;
      let pending = 0;
      const frame = (now: number) => {
        if (last) pending += Math.min(now - last, 100);
        last = now;
        while (pending >= STEP_MS) {
          Engine.update(engine, STEP_MS);
          pending -= STEP_MS;
        }
        render();
        animId = requestAnimationFrame(frame);
      };

      const start = () => {
        if (running || (reduceMotion && !canDrag)) return;
        running = true;
        reveal();
        animId = requestAnimationFrame(frame);
      };

      const stop = () => {
        running = false;
        last = 0;
        cancelAnimationFrame(animId);
      };

      // Only simulate while the section is on screen
      const observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { rootMargin: "100px 0px" },
      );
      observer.observe(container);

      const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth === width && newHeight === height) return;
        width = newWidth;
        height = newHeight;

        Body.setPosition(ground, { x: width / 2, y: height + GROUND_THICKNESS / 2 });
        Body.setPosition(rightWall, { x: width + GROUND_THICKNESS / 2, y: height / 2 });
        // Pull back any tag the narrower container left outside
        for (const { body, w } of tags) {
          if (body.position.x > width - w / 2) {
            Body.setPosition(body, { x: Math.max(w / 2, width - w / 2), y: body.position.y });
          }
          Matter.Sleeping.set(body, false);
        }
        render(true);
      };
      window.addEventListener("resize", handleResize);

      teardownWorld = () => {
        stop();
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
        mouseCleanup?.();
      };
    };

    // Wait for web fonts so measured tag widths match the final text
    if ("fonts" in document) {
      document.fonts.ready.then(build);
    } else {
      build();
    }

    return () => {
      cancelled = true;
      teardownWorld?.();
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section className="relative flex min-h-[780px] flex-col justify-between overflow-hidden bg-[color:var(--accent-blue)] pt-[140px] md:min-h-[880px] md:pt-[170px] xl:min-h-[960px] xl:pt-[200px]">
      {/* Top CTA content */}
      <div className="mxd-container relative z-20 flex flex-col items-center text-center">
        {/* [ WRITE A LINE ] */}
        <div ref={subtitleRef} className="mb-6 overflow-hidden">
          <Link
            href="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="mxd-mono group inline-flex items-center gap-[10px] text-[15px] font-semibold uppercase leading-[1.6] tracking-[0.08em] text-white transition-opacity hover:opacity-90 md:text-[17px]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">[</span>
            <ScrambleText text="WRITE A LINE" triggerOn="hover" />
            <span className="transition-transform duration-300 group-hover:translate-x-1">]</span>
          </Link>
        </div>

        {/* Heading */}
        <Link
          href="/contact"
          onClick={() => window.scrollTo(0, 0)}
          className="group max-w-[900px] cursor-pointer"
        >
          <h2
            ref={titleRef}
            className="mxd-display text-white text-[clamp(44px,6.8vw,110px)] font-semibold leading-[1.05] tracking-[-3px] transition-transform duration-300 group-hover:scale-[1.01]"
          >
            Let&apos;s talk about your project
          </h2>
        </Link>
      </div>

      {/* Physics tag area — decorative; hidden from assistive tech */}
      <div
        ref={canvasContainerRef}
        aria-hidden="true"
        className="relative h-[380px] w-full overflow-hidden md:h-[440px] xl:h-[480px]"
      >
        {TAGS_CONFIG.map((tag, i) => (
          <div
            key={tag.text}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 flex h-[40px] select-none items-center justify-center whitespace-nowrap rounded-[4px] border border-black/10 bg-white px-4 shadow-sm transition-colors hover:bg-neutral-50 pointer-fine:cursor-grab pointer-fine:active:cursor-grabbing md:h-[46px] md:px-5"
            style={{ visibility: "hidden", willChange: "transform" }}
          >
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-[#121212] md:text-[13.5px]">
              {tag.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
