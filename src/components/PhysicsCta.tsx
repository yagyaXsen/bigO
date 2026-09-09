"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Matter from "matter-js";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useInUp } from "@/hooks/useScrollAnimations";
import { useSplitLines } from "@/hooks/useSplitLines";

interface TagConfig {
  id: string;
  text: string;
  width: number;
  height: number;
  initialX: number; // percentage 0 - 100
  initialAngle?: number;
}

const TAGS_CONFIG: TagConfig[] = [
  { id: "guidelines", text: "GUIDELINES", width: 140, height: 46, initialX: 6 },
  { id: "applications", text: "APPLICATIONS", width: 155, height: 46, initialX: 18 },
  { id: "3d-models", text: "3D MODELS", width: 130, height: 46, initialX: 28 },
  { id: "brand-strategy", text: "BRAND STRATEGY", width: 180, height: 46, initialX: 36, initialAngle: Math.PI / 2 },
  { id: "logo-design", text: "LOGO DESIGN", width: 145, height: 46, initialX: 44 },
  { id: "development", text: "DEVELOPMENT", width: 145, height: 46, initialX: 43 },
  { id: "branding", text: "BRANDING", width: 125, height: 46, initialX: 54 },
  { id: "packaging", text: "PACKAGING", width: 130, height: 46, initialX: 43 },
  { id: "web-design", text: "WEB DESIGN", width: 135, height: 46, initialX: 53, initialAngle: Math.PI },
  { id: "app-design", text: "APP DESIGN", width: 135, height: 46, initialX: 64 },
  { id: "visual-identity", text: "VISUAL IDENTITY", width: 180, height: 46, initialX: 77 },
  { id: "print-design", text: "PRINT DESIGN", width: 145, height: 46, initialX: 75 },
  { id: "ui-ux", text: "UI/UX", width: 110, height: 46, initialX: 86, initialAngle: Math.PI / 2 },
  { id: "interactions", text: "INTERACTIONS", width: 150, height: 46, initialX: 94 },
];

export function PhysicsCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [tagPositions, setTagPositions] = useState<
    Array<{ id: string; text: string; x: number; y: number; angle: number; width: number; height: number }>
  >([]);

  const subtitleRef = useInUp<HTMLDivElement>();
  const titleRef = useSplitLines<HTMLHeadingElement>();

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const { Engine, World, Bodies, Mouse, MouseConstraint, Runner, Composite, Body } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.15, scale: 0.001 },
    });
    const world = engine.world;

    // Create walls & ground
    const wallOptions = { isStatic: true, friction: 0.6, restitution: 0.2 };
    const groundThickness = 100;
    
    let ground = Bodies.rectangle(width / 2, height + groundThickness / 2, width * 2, groundThickness, wallOptions);
    let leftWall = Bodies.rectangle(-groundThickness / 2, height / 2, groundThickness, height * 2, wallOptions);
    let rightWall = Bodies.rectangle(width + groundThickness / 2, height / 2, groundThickness, height * 2, wallOptions);

    World.add(world, [ground, leftWall, rightWall]);

    // Scale factor for responsive tags on mobile/tablet
    const isMobile = width < 768;
    const scale = isMobile ? Math.max(0.75, width / 768) : 1;

    // Create tag bodies
    const tagBodies = TAGS_CONFIG.map((cfg, index) => {
      const tagW = cfg.width * scale;
      const tagH = cfg.height * scale;
      // Spawn slightly above with staggered drop
      const spawnX = (cfg.initialX / 100) * (width - 60) + 30;
      const spawnY = -50 - index * 35;

      const body = Bodies.rectangle(spawnX, spawnY, tagW, tagH, {
        chamfer: { radius: 4 },
        restitution: 0.25,
        friction: 0.4,
        density: 0.0025,
        angle: cfg.initialAngle || (Math.random() * 0.2 - 0.1),
      });

      // Give small initial velocity for natural settling
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.5, y: Math.random() * 2 + 1 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

      return { body, cfg, tagW, tagH };
    });

    World.add(world, tagBodies.map((t) => t.body));

    // Mouse constraint for interactive drag & fling
    const mouse = Mouse.create(container);
    // Disable wheel interception by Matter so page scrolling remains intact
    mouse.element.removeEventListener("wheel", (mouse as unknown as { mousewheel: (e: Event) => void }).mousewheel);
    
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let animId: number;

    const updateDOM = () => {
      const positions = tagBodies.map(({ body, cfg, tagW, tagH }) => ({
        id: cfg.id,
        text: cfg.text,
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
        width: tagW,
        height: tagH,
      }));
      setTagPositions(positions);
      animId = requestAnimationFrame(updateDOM);
    };

    animId = requestAnimationFrame(updateDOM);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === width && newHeight === height) return;

      width = newWidth;
      height = newHeight;

      Body.setPosition(ground, { x: width / 2, y: height + groundThickness / 2 });
      Body.setPosition(rightWall, { x: width + groundThickness / 2, y: height / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(world, false);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[780px] flex-col justify-between overflow-hidden bg-[color:var(--accent-blue)] pt-[140px] md:min-h-[880px] md:pt-[170px] xl:min-h-[960px] xl:pt-[200px]"
    >
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

      {/* Physics Tag Container */}
      <div
        ref={canvasContainerRef}
        className="relative h-[380px] w-full overflow-hidden md:h-[440px] xl:h-[480px]"
        style={{ touchAction: "none" }}
      >
        {tagPositions.map((tag) => (
          <div
            key={tag.id}
            className="absolute left-0 top-0 flex select-none items-center justify-center rounded-[4px] border border-black/10 bg-white shadow-sm cursor-grab active:cursor-grabbing hover:bg-neutral-50 transition-colors"
            style={{
              width: `${tag.width}px`,
              height: `${tag.height}px`,
              transform: `translate3d(${tag.x - tag.width / 2}px, ${tag.y - tag.height / 2}px, 0) rotate(${tag.angle}rad)`,
              willChange: "transform",
            }}
          >
            <span className="font-mono text-[12px] md:text-[13.5px] font-bold uppercase tracking-[0.06em] text-[color:var(--ink)] whitespace-nowrap px-3 text-center">
              {tag.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
