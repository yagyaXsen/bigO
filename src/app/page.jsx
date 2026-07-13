import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { CONTACT, waLink, SITE, SOCIALS } from "./site";

/* ============================================================
   PREMIUM PRIMITIVES — small, self-contained, guarded.
   Mounted once by BigOHomepage; each no-ops on touch /
   reduced-motion where appropriate.
   ============================================================ */

/* Reusable text scramble effect hook. Scrambles text on trigger, then resolves. */
function useTextScramble(originalText) {
  const [text, setText] = useState(originalText);
  const intervalRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "·" || char === "[" || char === "]") return char;
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 25);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return [text, scramble];
}

/* React anchor wrapped with text scramble on hover. */
function ScrambleLink({ href, children, className = "", ...rest }) {
  const originalText = String(children);
  const [text, scramble] = useTextScramble(originalText);
  return (
    <a
      href={href}
      className={className}
      onMouseEnter={scramble}
      {...rest}
    >
      {text}
    </a>
  );
}

/* React inline span text scramble wrapper. */
function ScrambleText({ text, className = "", triggerOnHover = true, ...rest }) {
  const [displayText, scramble] = useTextScramble(text);
  return (
    <span
      className={className}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      {...rest}
    >
      {displayText}
    </span>
  );
}

/* Detect a fine-pointer, hover-capable device with motion allowed. */
function usePremiumEnv() {
  const [env, setEnv] = useState({ fine: false, reduced: true });
  useEffect(() => {
    const fineMQ = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnv({ fine: fineMQ.matches, reduced: reduceMQ.matches });
    update();
    fineMQ.addEventListener("change", update);
    reduceMQ.addEventListener("change", update);
    return () => {
      fineMQ.removeEventListener("change", update);
      reduceMQ.removeEventListener("change", update);
    };
  }, []);
  return env;
}

/* Dot + trailing ring cursor. Ring grows + shows a label over
   [data-cursor] targets. rAF-driven, transform-only. */
function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-on");
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target.closest("[data-cursor]");
      if (t) {
        ring.classList.add("is-hovering");
        label.textContent = t.getAttribute("data-cursor") || "";
      } else {
        ring.classList.remove("is-hovering");
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="bigo-cursor-dot" />
      <div ref={ringRef} className="bigo-cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}

/* Wrap any element; on pointer-move within range it drifts toward
   the cursor via a Framer spring, snapping back on leave. */
function MagneticButton({ children, className = "", strength = 0.35, as = "div", enabled = true, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });
  const MC = motion[as] || motion.div;

  const onMove = (e) => {
    if (!enabled) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <MC
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: enabled ? sx : 0, y: enabled ? sy : 0 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </MC>
  );
}

/* Split a string into word masks that rise on whileInView. */
function SplitText({
  text,
  className = "",
  as = "div",
  stagger = 0.06,
  delay = 0,
  duration = 0.9,
  once = false,
}) {
  const MC = motion[as] || motion.div;
  const words = String(text).split(" ");
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <MC
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="split-word">
          <motion.span variants={child}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MC>
  );
}

/* Fixed film-grain layer. Static under reduced motion. */
function GrainOverlay({ animated = true }) {
  const grainUrl =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";
  return (
    <div
      className={`bigo-grain ${animated ? "is-animated" : ""}`}
      style={{ "--grain-url": grainUrl }}
      aria-hidden="true"
    />
  );
}

/* Soft blurred radial glow blob. Position via style prop. */
function AmbientGlow({ variant = "accent", animated = true, className = "", style }) {
  return (
    <div
      className={`ambient-glow glow-${variant} ${animated ? "is-animated" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

/* Thin accent bar tracking page scroll. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="bigo-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* First-load overlay: wordmark + 000→100 counter, wipes up.
   Session-gated by the caller. */
function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setLeaving(true),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          className="bigo-preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="pre-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            bigO
          </motion.div>
          <div className="pre-bar">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "left center" }}
            />
          </div>
          <div className="pre-count">
            {String(count).padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function meta() {
  return [
    { title: "bigO — Digital Studio" },
    {
      name: "description",
      content: "bigO is a small, focused digital studio that builds, runs, and grows businesses online with custom websites, AI automation, and web apps.",
    },
  ];
}

/* ============================================================
   AZURIO — Full-site High-Fidelity Clone (exact design + motion)
   Matches the target screenshots in design-bigO 1:1:
   Hero → Stats A/01 → Niches → Capabilities C/02 (7) →
   Cinematic → Works W/03 → Small-but-powerful → Tech T/04 →
   Cinematic → Insights I/05 → CTA → Footer.

   Motion split (Framer-first, matches the real site):
   • GSAP  → hero pin-scroll (video expand + line split), cinematic
             parallax, stat counters, CTA page-bg → blue.
   • Framer → every section reveal / stagger, word color-reveals,
             card + button hover springs, CTA tag scatter, footer
             wordmark reveal.
   • Lenis  → smooth scroll (drives both).

   Type + spacing use fluid clamp() tokens keyed to a 1920px design
   so the page never looks zoomed.
   ============================================================ */

const A = "https://azuris-nextjs.vercel.app";
const img = (path, w = 3840) =>
  path.startsWith("http") ? path : `${A}/_next/image?url=${encodeURIComponent(path)}&w=${w}&q=75`;

const formatTitle = (title) => {
  const words = title.split(" ");
  if (words.length <= 1) return title;
  const last = words.pop();
  return (
    <>
      {words.join(" ")}
      <br />
      {last}
    </>
  );
};

/* ---- Shared Framer variants ---- */
const EASE = [0.23, 0.65, 0.74, 1.09]; // matches --animbezier

const riseUp = {
  hidden: { y: 90, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const wordReveal = {
  hidden: { color: "#7d7f89" },
  show: { color: "#121212", transition: { duration: 0.35, ease: "linear" } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const tagScatter = {
  hidden: { y: 180, opacity: 0 },
  show: (rot) => ({
    y: 0,
    opacity: 1,
    rotate: rot,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  }),
};

const VIEWPORT = { once: false, margin: "0px 0px -12% 0px" };

/* Reveal-on-scroll wrapper reused across sections. */
function Reveal({ children, className = "", as = "div", ...rest }) {
  const MC = motion[as] || motion.div;
  return (
    <MC
      className={className}
      variants={riseUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </MC>
  );
}

/* ============================================================
   Reveal library (matches the real site's heading/image reveals):
   • MaskReveal      — clip-path inset opens the element into view.
   • OverflowReveal  — line(s) slide up from behind a clipped mask.
   • WipeReveal      — a solid panel wipes across, then off, exposing
                       the child (used on case-study / insight images).
   ============================================================ */

/* Clip-path inset reveal — element unmasks top→bottom. */
function MaskReveal({ children, className = "", as = "div", delay = 0, ...rest }) {
  const MC = motion[as] || motion.div;
  return (
    <MC
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MC>
  );
}

/* Overflow-hidden line reveal — each line slides up from behind a mask.
   Pass `lines` as an array of strings (or a single string). */
function OverflowReveal({ lines, className = "", lineClassName = "" }) {
  const arr = Array.isArray(lines) ? lines : [lines];
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {arr.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            className={`reveal-inner ${lineClassName}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

/* Image wipe reveal — an accent panel sweeps across then off, exposing
   the image (which also scales down from a slight zoom). */
function WipeReveal({ src, alt, className = "", imgClassName = "", panel = "var(--accent)" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 z-10 origin-left"
        style={{ background: panel }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </div>
  );
}

/* Two-tone one-liner: bold head + muted tail, with per-word color reveal. */
function TwoToneLine({ head, tail, className = "" }) {
  return (
    <motion.p
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <span className="text-[var(--tBright)] font-semibold">{head} </span>
      {tail.split(" ").map((w, i) => (
        <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.22em]">
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* Capabilities signature row — scroll-scrubbed. As the row travels
   through the viewport the big italic title sharpens (blur→0), the
   product image scales + brightens, and the mono tag grid inks in.
   Uses the row's own scroll progress so the reveal feels deliberate
   and scrubbed rather than one-shot. Falls back to a static reveal
   under reduced motion. */
function CapabilityRow({ c, reduced }) {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.9", "center 0.5"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const blur = useTransform(p, [0, 1], [10, 0]);
  const titleFilter = useTransform(blur, (b) => `blur(${b}px)`);
  const titleOpacity = useTransform(p, [0, 1], [0.28, 1]);
  const imgScale = useTransform(p, [0, 1], [1.12, 1]);
  const imgOpacity = useTransform(p, [0, 0.6], [0.5, 1]);
  const tagsOpacity = useTransform(p, [0.35, 1], [0, 1]);
  const tagsY = useTransform(p, [0.35, 1], [18, 0]);

  const on = !reduced;

  return (
    <div
      ref={rowRef}
      className="cap-row relative grid grid-cols-12 gap-[2vw] items-center py-[4vw] border-b border-black/10 group"
    >
      {/* Left — index + big blurred title bottom-left */}
      <div className="col-span-12 lg:col-span-4 relative min-h-[16vw] flex flex-col">
        <span className="font-accent fs-micro font-bold opacity-40 block">{c.n}</span>
        <motion.h3
          className="cap-title mt-auto fs-cap-title font-extrabold italic text-[var(--tBright)] tracking-tight leading-[0.95] whitespace-pre-line"
          style={on ? { filter: titleFilter, opacity: titleOpacity } : undefined}
        >
          {formatTitle(c.title)}
        </motion.h3>
      </div>

      {/* Center — product image */}
      <div className="col-span-12 lg:col-span-4 flex justify-center">
        <div className="w-full max-w-[26vw] aspect-[4/3] overflow-hidden rounded-[0.6vw] bg-[#eeeae8]">
          <motion.img
            src={img(c.img)}
            alt={c.title}
            className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            style={on ? { scale: imgScale, opacity: imgOpacity } : undefined}
          />
        </div>
      </div>

      {/* Right — two-tone one-liner + 2-col mono tag grid inking in */}
      <div className="col-span-12 lg:col-span-4 flex flex-col justify-between min-h-[14vw] py-1">
        <TwoToneLine head={c.head} tail={c.tail} className="fs-desc leading-[1.4] max-w-[360px]" />
        <motion.div
          className="flex gap-[3vw] mt-[2vw]"
          style={on ? { opacity: tagsOpacity, y: tagsY } : undefined}
        >
          {c.cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-1.5">
              {col.map((t) => (
                <span
                  key={t}
                  className="font-accent fs-micro font-bold uppercase tracking-[0.2em] text-[var(--t-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function BigOHomepage() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll + ESC-to-close while the fullscreen menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    whatsapp: "",
    services: [],
    budget: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  // Premium environment (fine pointer + reduced-motion) and preloader gate.
  const { fine, reduced } = usePremiumEnv();
  const [preloading, setPreloading] = useState(false);
  const [preDone, setPreDone] = useState(false);
  const [btnText, scrambleBtn] = useTextScramble("Start a project");
  const [leftLabel, scrambleLeft] = useTextScramble("[ STUDIO ]");
  const [rightLabel, scrambleRight] = useTextScramble("[ WORKS ]");
  const [scrollText, scrambleScroll] = useTextScramble("SCROLL TO EXPLORE");

  useEffect(() => {
    // Show the preloader once per browser session, and never under
    // reduced-motion (respect the OS preference).
    const seen = typeof window !== "undefined" && sessionStorage.getItem("bigo-preloaded");
    if (!seen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPreloading(true);
    } else {
      setPreDone(true);
    }
  }, []);

  const finishPreloader = () => {
    sessionStorage.setItem("bigo-preloaded", "1");
    setPreloading(false);
    setPreDone(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load external stylesheets (Lenis + Phosphor icons) once, client-side.
  useEffect(() => {
    const links = [
      "https://unpkg.com/lenis@1/dist/lenis.css",
      "https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.css",
    ];
    const els = links.map((href) => {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      l.setAttribute("data-bigo", "1");
      document.head.appendChild(l);
      return l;
    });
    return () => els.forEach((l) => l.remove());
  }, []);

  // GSAP (hero pin, parallax, counters, CTA bg) + Lenis smooth scroll.
  useEffect(() => {
    let lenis;
    let rafId;
    let ctx;
    let cancelled = false;

    (async () => {
      const [{ gsap }, stMod, lenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;

      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      const Lenis = lenisMod.default || lenisMod;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);

      ctx = gsap.context(() => {
        // Video is centred by flexbox on #hero-video-anchor — GSAP only
        // touches scale/opacity so it grows symmetrically from the middle.

        // 1. Hero intro — text lines rise in, video settles in from a slight
        //    scale. Kept fully OPAQUE the whole time so the headline never
        //    bleeds through the video (the video is a solid block on top).
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroTl
          .from(
            "#hero-video-wrapper",
            { scale: 0.9, duration: 1.4, ease: "expo.out" },
            0
          )
          .to("#hero-l1, #hero-l2", { y: 0, duration: 1.8, stagger: 0.18 }, 0.2);

        // Scale needed for the base video box to fully COVER the viewport.
        // Snapshot the UN-scaled box size on every refresh (before scrub runs)
        // so the factor stays correct across resizes.
        let heroBaseW = 0;
        let heroBaseH = 0;
        const snapshotHeroBox = () => {
          const el = document.querySelector("#hero-video-wrapper");
          if (!el) return;
          const prev = gsap.getProperty(el, "scale");
          gsap.set(el, { scale: 1 });
          const r = el.getBoundingClientRect();
          heroBaseW = r.width;
          heroBaseH = r.height;
          gsap.set(el, { scale: prev });
        };
        const coverScale = () => {
          if (!heroBaseW || !heroBaseH) snapshotHeroBox();
          if (!heroBaseW || !heroBaseH) return 3;
          return Math.max(window.innerWidth / heroBaseW, window.innerHeight / heroBaseH) * 1.02;
        };

        // 1b. Hero pinned scroll — TEXT scrolls away in normal flow while the
        //     VIDEO independently scales + moves up to fill the next section.
        const heroScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=140%",
            scrub: 1,
            pin: "#hero",
            pinSpacing: true,
            invalidateOnRefresh: true,
            onRefreshInit: snapshotHeroBox,
          },
        });

        // Headline stays in place then RISES away (full duration) — it keeps
        // its ink until the very end, so it reads over the growing video like
        // the reference, then fades out only in the last stretch.
        heroScrollTl.to("#hero-headline", { yPercent: -85, ease: "none" }, 0);
        heroScrollTl.to("#hero-headline", { opacity: 0, ease: "none" }, 0.75);
        heroScrollTl.to("#hero-bottom-bar", { yPercent: 140, opacity: 0, ease: "none" }, 0);
        heroScrollTl.to("#hero-left-label", { xPercent: -140, opacity: 0, ease: "none" }, 0);
        heroScrollTl.to("#hero-right-label", { xPercent: 140, opacity: 0, ease: "none" }, 0);

        // Video grows from centre to full-bleed cover: scale up + drop the
        // radius. Because the anchor is flex-centred, growth stays centred and
        // the expanding box travels into the next section as it fills.
        heroScrollTl.to(
          "#hero-video-wrapper",
          {
            scale: () => coverScale(),
            ease: "none",
          },
          0
        );

        // 2. Stat counters count-up
        document.querySelectorAll(".counter").forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          ScrollTrigger.create({
            trigger: counter,
            start: "top 95%",
            onEnter: () =>
              gsap.to(counter, {
                innerText: target,
                duration: 3,
                snap: { innerText: 1 },
                ease: "power2.out",
              }),
            onLeaveBack: () => {
              counter.innerText = "0";
            },
          });
        });

        // 3. Page background shift to blue at CTA
        ScrollTrigger.create({
          trigger: "#cta-section",
          start: "top 65%",
          end: "bottom top",
          onEnter: () => gsap.to(".page-wrapper", { backgroundColor: "#0b2f8f", duration: 1 }),
          onLeaveBack: () => gsap.to(".page-wrapper", { backgroundColor: "#eeeae8", duration: 1 }),
        });

        // 4. Cinematic parallax
        gsap.utils.toArray(".parallax-bg").forEach((el) => {
          gsap.to(el, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        // 5. Section stack — each [data-stack-over] slides over the pinned [data-stack-pin] section
        const pinSections = gsap.utils.toArray("[data-stack-pin]");
        const overSections = gsap.utils.toArray("[data-stack-over]");

        pinSections.forEach((pinEl) => {
          // Give the sections that slide over a lifted card look
          overSections.forEach((overEl) => {
            gsap.set(overEl, { borderRadius: "24px 24px 0 0", boxShadow: "0 -12px 60px rgba(0,0,0,0.12)" });
          });

          // Pin the section underneath while the next one scrolls over it
          ScrollTrigger.create({
            trigger: pinEl,
            start: "top top",
            endTrigger: overSections[overSections.length - 1] || pinEl,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        });

        ScrollTrigger.refresh();

      }, rootRef);
    })();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <style>{CSS}</style>

      {/* ---- Premium global layer ---- */}
      {preloading && <Preloader onDone={finishPreloader} />}
      <GrainOverlay animated={!reduced} />
      <ScrollProgress />
      <CustomCursor enabled={fine && !reduced} />

      <div className="page-wrapper" id="content-main">
        {/* ===================== HEADER ===================== */}
        <header
          id="main-header"
          className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex items-center`}
          style={
            scrolled
              ? {
                backgroundColor: "rgba(238, 234, 232, 0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                padding: "16px 0",
              }
              : {
                backgroundColor: "transparent",
                padding: "32px 0",
              }
          }
        >
          <div className="container-custom flex justify-between items-center w-full">
            {/* Logo */}
            <Link
              to="/"
              className="font-bold tracking-tight text-[var(--tBright)] flex items-center gap-2 hover:opacity-80 transition-all no-underline"
              style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}
            >
              <span>bigO</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-[2.5vw] font-accent text-[14px] leading-[22px] font-semibold uppercase tracking-[0.15em]">
              <ScrambleLink href="#stats-section" className="link-underline text-[var(--t-medium)] hover:text-[var(--accent)] transition-all no-underline">
                About
              </ScrambleLink>
              <ScrambleLink href="#capabilities-section" className="link-underline text-[var(--t-medium)] hover:text-[var(--accent)] transition-all no-underline">
                Services
              </ScrambleLink>
              <ScrambleLink href="#works-section" className="link-underline text-[var(--t-medium)] hover:text-[var(--accent)] transition-all no-underline">
                Work
              </ScrambleLink>
              <ScrambleLink href="#tech-section" className="link-underline text-[var(--t-medium)] hover:text-[var(--accent)] transition-all no-underline">
                Tech
              </ScrambleLink>
              <ScrambleLink href="#insights-section" className="link-underline text-[var(--t-medium)] hover:text-[var(--accent)] transition-all no-underline">
                Insights
              </ScrambleLink>
              <ScrambleLink href="#cta-section" className="link-underline text-[var(--t-medium)] hover:text-[var(--accent)] transition-all no-underline">
                Contact
              </ScrambleLink>
            </nav>

            {/* Right side CTA & Hamburger */}
            <div className="flex items-center gap-6">
              <MagneticButton
                as="a"
                href="#cta-section"
                enabled={fine && !reduced}
                data-cursor="LET'S GO"
                onMouseEnter={scrambleBtn}
                className="hidden md:inline-block font-accent text-[14px] leading-[22px] font-semibold uppercase tracking-[0.2em] bg-[var(--base-opp)] text-white px-[1.8vw] py-[0.7vw] rounded-full transition-all no-underline premium-btn"
              >
                {btnText}
              </MagneticButton>

              {/* Hamburger Button (2-line animated X) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer focus:outline-none bg-transparent border-none p-0 z-[110]"
                aria-label="Toggle Menu"
              >
                <motion.div
                  animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute h-[2px] bg-black w-6"
                />
                <motion.div
                  animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute h-[2px] bg-black w-6"
                />
              </button>
            </div>
          </div>
        </header>

        {/* ===================== FULLSCREEN MENU OVERLAY ===================== */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="fs-menu"
              className="menu-overlay fixed inset-0 z-[104] overflow-hidden"
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Backdrop panels — two-tone reveal that clips down from the top. */}
              <motion.div
                className="absolute inset-0 bg-[#0a0b0e]"
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0)" },
                  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
                  exit: { clipPath: "inset(100% 0 0 0)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
                }}
              />

              {/* Ambient depth inside the menu. */}
              <div className="menu-glow menu-glow-a" />
              <div className="menu-glow menu-glow-b" />
              <div className="menu-grid pointer-events-none absolute inset-0" />

              {/* Content — sits above backdrop; fades slightly after panel opens. */}
              <motion.div
                className="relative z-10 h-full w-full flex flex-col"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { delay: 0.25, duration: 0.4 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
              >
                {/* Top bar */}
                <div className="container-custom flex items-center justify-between pt-[clamp(20px,2.4vw,34px)]">
                  <span className="font-accent text-[clamp(11px,0.9vw,13px)] tracking-[0.28em] uppercase text-white/50">
                    {SITE.name} — Menu
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    data-cursor="CLOSE"
                    className="menu-close group flex items-center gap-3 font-accent text-[clamp(10px,0.8vw,12px)] tracking-[0.28em] uppercase text-white/60 hover:text-white transition-colors"
                  >
                    <span>Close</span>
                    <span className="relative block w-8 h-8 rounded-full border border-white/20 group-hover:border-white/60 transition-colors">
                      <span className="absolute left-1/2 top-1/2 w-[14px] h-px bg-current -translate-x-1/2 -translate-y-1/2 rotate-45" />
                      <span className="absolute left-1/2 top-1/2 w-[14px] h-px bg-current -translate-x-1/2 -translate-y-1/2 -rotate-45" />
                    </span>
                  </button>
                </div>

                {/* Body */}
                <div className="container-custom flex-1 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] items-center gap-[clamp(32px,5vw,80px)] py-[clamp(24px,4vw,48px)]">
                  {/* Left — brand statement + chrome orb */}
                  <div className="hidden lg:flex flex-col justify-center h-full gap-10">
                    <div className="menu-orb">
                      <span className="menu-orb-core" />
                    </div>
                    <div className="flex flex-col gap-4 max-w-[34ch]">
                      <span className="font-accent text-[11px] tracking-[0.28em] uppercase text-[var(--highlight)]/80">
                        {"( Studio )"}
                      </span>
                      <p className="text-white/70 text-[clamp(15px,1.15vw,19px)] leading-[1.5] font-light">
                        We build, run, and grow digital products that move at the speed of ambition.
                      </p>
                    </div>
                  </div>

                  {/* Right — numbered nav */}
                  <nav className="flex flex-col">
                    {MENU_LINKS.map((item, i) => (
                      <div key={item.href} className="menu-item-mask">
                        <motion.a
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          data-cursor="GO"
                          className="menu-item group"
                          variants={{
                            hidden: { y: "110%" },
                            show: {
                              y: "0%",
                              transition: { delay: 0.35 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                            },
                            exit: { y: "110%", transition: { duration: 0.25 } },
                          }}
                        >
                          <span className="menu-item-num">{item.n}</span>
                          <span className="menu-item-label" data-text={item.label}>
                            {item.label}
                          </span>
                          <span className="menu-item-arrow" aria-hidden>
                            ↗
                          </span>
                        </motion.a>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <motion.div
                  className="container-custom flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-[clamp(24px,3vw,44px)] pt-[clamp(20px,2.4vw,32px)] border-t border-white/10"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } },
                    exit: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="font-accent text-[10px] tracking-[0.28em] uppercase text-white/40">Get in touch</span>
                    <a href={`mailto:${CONTACT.email}`} className="text-white/85 hover:text-white text-[clamp(15px,1.2vw,20px)] no-underline transition-colors">
                      {CONTACT.email}
                    </a>
                  </div>

                  <div className="flex flex-col gap-1.5 md:items-end">
                    <span className="font-accent text-[10px] tracking-[0.28em] uppercase text-white/40">Based in</span>
                    <span className="text-white/85 text-[clamp(15px,1.2vw,20px)]">{CONTACT.city}</span>
                  </div>

                  <div className="flex gap-6 font-accent text-[11px] tracking-[0.2em] uppercase md:items-end">
                    {SOCIALS.instagram && (
                      <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="menu-social text-white/60 hover:text-white no-underline">Instagram</a>
                    )}
                    {SOCIALS.linkedin && (
                      <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="menu-social text-white/60 hover:text-white no-underline">LinkedIn</a>
                    )}
                    <a href={waLink("Hi bigO, I'd like to chat.")} target="_blank" rel="noreferrer" className="menu-social text-white/60 hover:text-white no-underline">WhatsApp</a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================== HERO ===================== */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          id="hero"
        >
          {/* Ambient depth — soft glows drifting behind everything. */}
          <AmbientGlow
            variant="accent"
            animated={!reduced}
            style={{ width: "48vw", height: "48vw", top: "-14vw", left: "-8vw", opacity: 0.4 }}
          />
          <AmbientGlow
            variant="warm"
            animated={!reduced}
            style={{ width: "40vw", height: "40vw", bottom: "-12vw", right: "-6vw", opacity: 0.35 }}
          />

          {/* Video layer — independent of text flow, sits ON TOP of the
              headline (covers the middle words at rest, exactly like the
              reference). Flexbox keeps it dead-centre with zero JS; GSAP
              animates scale + a downward drift so it grows and travels into
              the next section on scroll (see heroScrollTl). */}
          <div
            id="hero-video-anchor"
            className="absolute inset-0 w-full h-full z-20 flex items-center justify-center pointer-events-none"
          >
            <div
              id="hero-video-wrapper"
              className="hero-video-wrapper relative w-[34vw] aspect-[16/8.8] overflow-hidden shadow-[0_60px_140px_rgba(0,0,0,0.25)]"
            >
              <video
                src="/hero-section.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Framed look — thin inner ring + soft vignette. */}
              <span className="hero-frame-ring" />
            </div>
          </div>

          {/* Headline — normal-flow layer ON TOP of the video (z-30). Stays in
              place then rises + fades as you scroll; the video (z-20) scales
              up behind it. */}
          <div
            id="hero-headline"
            className="container-custom relative z-30 text-center pointer-events-none"
          >
            <h1 className="fs-hero font-bold text-[var(--tBright)] tracking-[-0.02em]">
              <div className="reveal-line">
                <span className="reveal-inner block font-bold" id="hero-l1">
                  Innovative software
                </span>
              </div>
              <div className="reveal-line">
                <span className="reveal-inner block font-bold" id="hero-l2">
                  development company
                </span>
              </div>
            </h1>


          </div>

          {/* Side labels positioned at left and right center edges of the viewport */}
          <div
            id="hero-left-label"
            className="font-accent absolute left-[4.2vw] top-1/2 -translate-y-1/2 z-30 text-[14px] leading-[22px] font-semibold uppercase tracking-[0.2em] text-[var(--t-bright)] opacity-50 hover:opacity-100 transition-all cursor-pointer"
            onMouseEnter={scrambleLeft}
          >
            {leftLabel}
          </div>
          <div
            id="hero-right-label"
            className="font-accent absolute right-[4.2vw] top-1/2 -translate-y-1/2 z-30 text-[14px] leading-[22px] font-semibold uppercase tracking-[0.2em] text-[var(--t-bright)] opacity-50 hover:opacity-100 transition-all cursor-pointer"
            onMouseEnter={scrambleRight}
          >
            {rightLabel}
          </div>

          <div
            id="hero-bottom-bar"
            className="absolute bottom-[3.4vw] w-full px-[4.2vw] flex justify-between items-center z-30"
          >
            <div className="font-accent flex gap-[2vw] text-[14px] leading-[22px] font-semibold uppercase tracking-[0.15em] text-[var(--t-bright)] transition-all">
              {["DRIBBBLE", "BEHANCE", "GITHUB", "CODEPEN", "FIGMA COMMUNITY"].map((s) => (
                <ScrambleLink key={s} href="#" className="hover:text-[var(--accent)] opacity-60 hover:opacity-100 transition-all">
                  {s}
                </ScrambleLink>
              ))}
            </div>
            <MagneticButton
              as="button"
              enabled={fine && !reduced}
              data-cursor="SCROLL"
              className="flex items-center gap-2 group cursor-pointer bg-transparent border-0"
              onMouseEnter={scrambleScroll}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              <span className="font-accent text-[14px] leading-[22px] font-semibold uppercase tracking-[0.15em] text-[var(--t-bright)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                {scrollText}
              </span>
              <span className="font-accent text-[14px] leading-[22px] font-semibold text-[var(--t-bright)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                ↓
              </span>
            </MagneticButton>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-[var(--base)] overflow-hidden">
          {/* Eyebrow */}
          <div
            className="container-custom flex items-center justify-center gap-4"
            style={{ marginBottom: "clamp(64px, 8vw, 110px)" }}
          >
            <span className="h-px w-8 md:w-16 bg-black/15" />
            <OverflowReveal
              lines="Trusted by teams building what's next"
              lineClassName="font-accent text-[11px] md:text-xs tracking-[0.32em] uppercase text-[var(--t-muted)] leading-[1.6] py-[2px]"
            />
            <span className="h-px w-8 md:w-16 bg-black/15" />
          </div>

          {/* Marquee with edge-fade mask */}
          <div className="marquee-mask">
            <div className="marquee-container flex items-center">
              <div className="marquee-content flex items-center">
                {[...PARTNERS, ...PARTNERS].map((name, i) => (
                  <div key={i} className="marquee-logo" aria-label={`Partner ${name}`}>
                    <span className="marquee-dot" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== STATS A/01 ===================== */}
        <section className="section-pad" id="stats-section" data-stack-pin>
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-[4vw]">
              <div className="lg:w-[26%]">
                <OverflowReveal
                  lines="A/01"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                  lineClassName="block"
                />
              </div>
              <div className="lg:w-[74%] flex flex-col gap-[4.5vw]">
                <motion.h2
                  className="fs-lead font-medium leading-[1.2] tracking-tight max-w-[95%]"
                  variants={staggerParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                >
                  {"From pixel-perfect designs to flawless code, every aspect of our projects is crafted with care to ensure the highest standards."
                    .split(" ")
                    .map((word, idx) => (
                      <motion.span key={idx} variants={wordReveal} className="inline-block mr-[0.25em]">
                        {word}
                      </motion.span>
                    ))}
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-y-[5vw] gap-x-[4vw]"
                  variants={staggerParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                >
                  {[
                    { n: 50, suffix: "+", sub: "Happy clients who trust our work" },
                    { n: 86, suffix: "%", sub: "Clients come back for a new projects" },
                    { n: 5, suffix: "+", sub: "Years of professional experience" },
                    { n: 70, suffix: "+", sub: "Successfully completed projects" },
                  ].map((s, idx) => (
                    <motion.div
                      key={idx}
                      variants={cardReveal}
                      className="border-t border-black/10 pt-[1.6vw] flex flex-col gap-3"
                    >
                      <div className="overflow-hidden">
                        <motion.div
                          variants={{
                            hidden: { y: "115%" },
                            show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                          }}
                          className="flex items-baseline font-accent fs-counter font-bold text-[var(--tBright)] leading-[1.05] tracking-tight"
                        >
                          <span className="counter" data-target={s.n}>
                            0
                          </span>
                          <span>{s.suffix}</span>
                        </motion.div>
                      </div>
                      <SplitText
                        text={s.sub}
                        className="font-accent fs-micro font-bold tracking-[0.12em] uppercase text-[var(--t-muted)] leading-relaxed max-w-[280px]"
                        stagger={0.03}
                        delay={0.08}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== NICHES ===================== */}
        <section className="section-pad" id="niches-section" data-stack-over>
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.2vw]">

              {/* Row 1 — Card 1 (col-span-1): dark full-bleed image + text overlay */}
              <Reveal className="group relative overflow-hidden rounded-xl min-h-[480px]">
                <img src={NICHES[0].img} alt={NICHES[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 flex flex-col p-[clamp(20px,2.5vw,36px)] h-full gap-3">
                  <h3 className="text-[clamp(24px,2.4vw,36px)] font-bold text-white tracking-tight leading-[1.0]">
                    {NICHES[0].title}
                  </h3>
                  <div className="flex flex-col gap-[2px] font-accent text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {NICHES[0].tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <p className="text-[13px] leading-[1.55] text-white/75 mt-auto">
                    <strong className="text-white font-semibold">{NICHES[0].head}</strong>{" "}{NICHES[0].tail}
                  </p>
                </div>
              </Reveal>

              {/* Row 1 — Card 2 (col-span-2): dark full-bleed image + text overlay */}
              <Reveal className="group relative overflow-hidden rounded-xl md:col-span-2 min-h-[480px]">
                <img src={NICHES[3].img} alt={NICHES[3].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 flex flex-col p-[clamp(20px,2.5vw,36px)] h-full gap-3">
                  <h3 className="text-[clamp(24px,2.4vw,36px)] font-bold text-white tracking-tight leading-[1.0]">
                    {NICHES[3].title}
                  </h3>
                  <div className="flex flex-col gap-[2px] font-accent text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {NICHES[3].tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <p className="text-[13px] leading-[1.55] text-white/75 mt-auto max-w-[480px]">
                    <strong className="text-white font-semibold">{NICHES[3].head}</strong>{" "}{NICHES[3].tail}
                  </p>
                </div>
              </Reveal>

              {/* Row 2 — Card 3 (col-span-1): dark, full-bleed image with text overlay */}
              <Reveal className="group relative overflow-hidden rounded-xl min-h-[360px]">
                <img src={NICHES[2].img} alt={NICHES[2].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 flex flex-col p-[clamp(20px,2.5vw,36px)] h-full gap-3">
                  <h3 className="text-[clamp(24px,2.4vw,36px)] font-bold text-white tracking-tight leading-[1.0]">
                    {NICHES[2].title}
                  </h3>
                  <div className="flex flex-col gap-[2px] font-accent text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {NICHES[2].tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <p className="text-[13px] leading-[1.55] text-white/75 mt-auto">
                    <strong className="text-white font-semibold">{NICHES[2].head}</strong>{" "}{NICHES[2].tail}
                  </p>
                </div>
              </Reveal>

              {/* Row 2 — Card 4 (col-span-2): dark full-bleed image + text overlay */}
              <Reveal className="group relative overflow-hidden rounded-xl md:col-span-2 min-h-[360px]">
                <img src={NICHES[1].img} alt={NICHES[1].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/65" />
                <div className="relative z-10 flex flex-col p-[clamp(20px,2.5vw,36px)] h-full gap-3">
                  <h3 className="text-[clamp(24px,2.4vw,36px)] font-bold text-white tracking-tight leading-[1.0]">
                    {NICHES[1].title}
                  </h3>
                  <div className="flex flex-col gap-[2px] font-accent text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {NICHES[1].tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <p className="text-[13px] leading-[1.55] text-white/75 mt-auto max-w-[480px]">
                    <strong className="text-white font-semibold">{NICHES[1].head}</strong>{" "}{NICHES[1].tail}
                  </p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>




        {/* ===================== CAPABILITIES C/02 ===================== */}
        <section id="capabilities-section" className="section-pad bg-[var(--base)] overflow-hidden" data-stack-over>
          <div className="container-custom">

            {/* Header: C/02 left · title center */}
            <div className="grid grid-cols-12 items-end mb-[5vw]">
              <div className="col-span-3">
                <OverflowReveal
                  lines="C/02"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                  lineClassName="block"
                />
              </div>
              <div className="col-span-6 flex justify-center">
                <OverflowReveal
                  lines="Our capabilities"
                  className="fs-h3 font-bold text-[var(--tBright)] leading-[1.1] text-center tracking-tight whitespace-nowrap"
                  lineClassName="block"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-black/10 mb-0" />

            {/* Capability rows */}
            <div className="flex flex-col">
              {CAPABILITIES.map((c) => (
                <CapabilityRow key={c.n} c={c} reduced={reduced} />
              ))}
            </div>

          </div>
        </section>



        {/* ===================== CINEMATIC 1 ===================== */}
        <section className="relative w-full h-[32vw] max-h-[480px] overflow-hidden bg-[#08090c]">
          <img
            src="/cinematic-tunnel.png"
            alt="Cinematic"
            className="absolute -bottom-[12%] left-0 w-full h-[124%] object-cover object-bottom parallax-bg brightness-[0.72] contrast-[1.08] saturate-[0.85]"
          />
          {/* Cohesive dark grade — vignette + subtle accent wash. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/60 via-transparent to-[#050608]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,43,186,0.14),transparent_60%)] pointer-events-none" />

          {/* Minimal premium caption. */}
          <div className="absolute inset-y-0 right-0 z-10 flex flex-col justify-center items-end text-right pr-[clamp(48px,11vw,200px)] pl-6 max-w-[90%] pointer-events-none">
            <OverflowReveal
              lines="The Path Forward"
              lineClassName="font-mono text-[clamp(9px,0.8vw,11px)] tracking-[0.4em] uppercase text-white/45"
            />
            <OverflowReveal
              lines="Clarity at the end of every build."
              className="mt-4 max-w-[16ch]"
              lineClassName="font-light text-white text-[clamp(20px,3.4vw,44px)] leading-[1.15] tracking-[-0.01em]"
            />
          </div>
        </section>

        {/* ===================== WORKS W/03 ===================== */}
        <section className="section-pad bg-[var(--base)]" id="works-section">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-[4vw]">
              <div>
                <OverflowReveal
                  lines="W/03"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] mb-[0.4vw] leading-none"
                  lineClassName="block"
                />
                <OverflowReveal
                  lines="Featured case studies"
                  className="fs-h3 font-sans font-bold text-[var(--tBright)] leading-[1.1] tracking-tight whitespace-nowrap"
                  lineClassName="block"
                />
              </div>
              <Link
                to="/work"
                data-cursor="VIEW ALL"
                className="font-accent flex items-center gap-4 px-[2vw] py-[1vw] border border-black/10 rounded-full fs-label font-bold uppercase tracking-[0.3em] hover:bg-[var(--tBright)] hover:text-white transition-all group cursor-pointer no-underline text-[var(--tBright)]"
              >
                [ ALL WORKS ]
                <span className="pixel-arrow" aria-hidden />
              </Link>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[3vw] gap-y-[6vw]"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {WORKS.map((w) => (
                <Link
                  key={w.title}
                  to={`/work/${w.slug}`}
                  data-cursor="VIEW"
                  className={`flex flex-col gap-[1vw] group cursor-pointer no-underline text-[var(--tBright)] ${w.offset ? " lg:mt-[4vw]" : ""}`}
                >
                  <motion.div variants={riseUp} className="flex flex-col gap-[1vw] w-full">
                    <WipeReveal
                      src={w.img}
                      alt={w.title}
                      className="aspect-[4/5] bg-[#eeeae8]"
                      imgClassName="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]"
                    />
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-sans font-light text-[18px] md:text-[20px] lg:text-[22px] text-[var(--tBright)] hover:text-[var(--accent)] transition-all leading-tight">
                        {w.title}
                      </h3>
                      <div className="flex flex-col text-right gap-1 flex-shrink-0 font-accent">
                        {w.tags.map((t) => (
                          <span
                            key={t}
                            className="fs-micro font-bold uppercase tracking-[0.25em] text-[var(--t-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===================== PROCESS SECTION (How We Work) ===================== */}
        <section className="section-pad bg-[var(--base)]" id="process-section">
          <div className="container-custom">

            {/* Header: P/01 left · title centered */}
            <div className="grid grid-cols-12 items-end mb-[5vw]">
              <div className="col-span-3">
                <OverflowReveal
                  lines="P/01"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                  lineClassName="block"
                />
              </div>
              <div className="col-span-6 flex justify-center">
                <OverflowReveal
                  lines="How we work"
                  className="fs-h3 font-bold text-[var(--tBright)] leading-[1.1] text-center tracking-tight"
                  lineClassName="block"
                />
              </div>
            </div>

            {/* 4 equal process cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5vw]">
              {[
                {
                  n: "01",
                  title: "Discovery",
                  desc: "We dive deep into your business requirements, define exact project scopes, and map user flow strategies.",
                },
                {
                  n: "02",
                  title: "Design",
                  desc: "We draft conversion-focused UI/UX layouts in Figma, iterating based on your direct feedback.",
                },
                {
                  n: "03",
                  title: "Build",
                  desc: "We code using state-of-the-art frameworks like React Router 7, Node.js/Hono, and Tailwind CSS.",
                },
                {
                  n: "04",
                  title: "Website Care",
                  desc: "We configure secure hosting, track analytics, run backups, and provide long-term care plans.",
                },
              ].map((step, i) => (
                <Reveal
                  key={step.n}
                  delay={i * 0.12}
                  className="bg-[var(--base-bright)] rounded-2xl border border-black/5 p-[clamp(16px,2vw,32px)] flex flex-col min-h-[200px] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Large faded step number */}
                  <span className="font-accent text-[clamp(24px,2.5vw,40px)] font-bold text-[var(--tBright)] opacity-[0.08] leading-none select-none">
                    {step.n}
                  </span>

                  {/* Title + description pushed to bottom */}
                  <div className="mt-auto pt-5">
                    <h3 className="text-[15px] font-semibold text-[var(--tBright)] mb-2 tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-[var(--t-medium)] leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>


        {/* ===================== SMALL BUT POWERFUL ===================== */}
        <section className="relative w-full h-[47vw] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&w=1600&q=80&fit=crop"
            alt="Team"
            className="absolute inset-0 w-full h-[130%] object-cover brightness-[0.45] parallax-bg"
          />
          <div className="relative z-10 text-center px-10 flex flex-col items-center">
            <div className="font-accent inline-block px-6 py-2.5 border border-white/20 bg-white/5 backdrop-blur-md rounded-full fs-label font-bold tracking-[0.3em] mb-[2.5vw] uppercase text-white">
              [ LET'S MEET ]
            </div>
            <MaskReveal
              as="h2"
              className="fs-h2 font-bold leading-[0.85] tracking-tight text-white mb-[3vw] drop-shadow-2xl"
            >
              Small but
              <br />
              powerful team
            </MaskReveal>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-[9vw] h-[9vw] min-w-[110px] min-h-[110px] bg-white text-black font-accent font-bold fs-label uppercase tracking-widest rounded-full hover:bg-[var(--accent)] hover:text-white cursor-pointer shadow-2xl flex items-center justify-center text-center"
            >
              <span>
                ALL
                <br />
                WORKS
              </span>
            </motion.button>
          </div>
        </section>

        {/* ===================== TECH STACK T/04 ===================== */}
        <section className="section-pad" id="tech-section">
          <div className="container-custom">
            <div className="grid grid-cols-12 items-start mb-[5vw]">
              <OverflowReveal
                lines="T/04"
                className="col-span-2 font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                lineClassName="block"
              />
              <OverflowReveal
                lines={["Our tech", "stack"]}
                className="col-span-10 lg:col-span-8 lg:col-start-4 fs-h2 font-extrabold text-[var(--tBright)] leading-[0.85] tracking-tight text-center"
                lineClassName="block"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3vw] items-start">
              {/* Left two-tone sub-label */}
              <div className="lg:col-span-4 pr-[2vw]">
                <p className="fs-desc leading-[1.4]">
                  <span className="text-[var(--tBright)] font-semibold">A powerhouse in </span>
                  <span className="text-[var(--t-muted)]">full-stack development solutions</span>
                </p>
              </div>

              {/* 3-col × 4-row grid with per-row rules */}
              <motion.div
                className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-x-[3vw]"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                {TECH.map((t) => (
                  <motion.div
                    variants={riseUp}
                    key={t.name}
                    className="flex items-center gap-4 py-[1.4vw] border-t border-black/10 group"
                  >
                    <div className="w-[3.4vw] h-[3.4vw] min-w-[52px] min-h-[52px] flex items-center justify-center rounded-xl bg-[var(--base-tint)] group-hover:bg-[var(--tBright)] transition-all duration-500">
                      <img
                        src={t.icon}
                        alt={t.name}
                        className={`w-[45%] h-[45%] object-contain transition-transform duration-500 group-hover:scale-110${t.invertOnHover ? " group-hover:invert" : ""
                          }`}
                      />
                    </div>
                    <span className="fs-tech font-extrabold text-[var(--tBright)]">{t.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================== WHY CHOOSE US ===================== */}
        <section className="section-pad bg-[var(--base)]" id="why-choose-us">
          <div className="container-custom">
            <div className="grid grid-cols-12 items-end mb-[4vw]">
              <div className="col-span-3">
                <OverflowReveal
                  lines="W/04"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                  lineClassName="block"
                />
              </div>
              <div className="col-span-6 flex justify-center">
                <OverflowReveal
                  lines="Why choose bigO"
                  className="fs-h3 font-bold text-[var(--tBright)] leading-[1.1] text-center tracking-tight"
                  lineClassName="block"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5vw] mt-8 items-stretch">
              {/* Freelancers */}
              <Reveal
                delay={0}
                className="p-[clamp(16px,2vw,32px)] rounded-2xl border border-black/5 bg-[var(--base-tint)] flex flex-col justify-between"
              >
                <div>
                  <span className="font-accent fs-micro font-bold uppercase tracking-[0.15em] text-[var(--t-muted)] block mb-4">
                    Freelance Marketplaces
                  </span>
                  <h3 className="text-[15px] font-semibold text-[var(--tBright)] mb-4 tracking-tight">
                    Low cost, high risk
                  </h3>
                  <ul className="flex flex-col gap-3 pl-0 list-none text-left text-[13px] text-[var(--t-medium)]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Inconsistent quality & template copycats</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Communication gap & slow support</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>High risk of project abandonment</span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              {/* bigO */}
              <Reveal
                delay={0.15}
                className="p-[clamp(16px,2vw,32px)] rounded-2xl border-2 border-[var(--accent)] bg-[var(--base-bright)] flex flex-col justify-between relative shadow-lg"
              >
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[var(--accent)] text-white font-accent fs-micro font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                  Recommended
                </div>
                <div>
                  <span className="font-accent fs-micro font-bold uppercase tracking-[0.15em] text-[var(--accent)] block mb-4">
                    bigO Studio
                  </span>
                  <h3 className="text-[15px] font-semibold text-[var(--tBright)] mb-4 tracking-tight">
                    Professional, direct access
                  </h3>
                  <ul className="flex flex-col gap-3 pl-0 list-none text-left text-[13px] text-[var(--t-medium)]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-[var(--tBright)] font-medium">Direct WhatsApp access to co-founders</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-[var(--tBright)] font-medium">Bespoke code & full ownership</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-[var(--tBright)] font-medium">Clear milestones & fixed pricing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-[var(--tBright)] font-medium">Continuous maintenance & support</span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              {/* Agencies */}
              <Reveal
                delay={0.3}
                className="p-[clamp(16px,2vw,32px)] rounded-2xl border border-black/5 bg-[var(--base-tint)] flex flex-col justify-between"
              >
                <div>
                  <span className="font-accent fs-micro font-bold uppercase tracking-[0.15em] text-[var(--t-muted)] block mb-4">
                    Traditional Agencies
                  </span>
                  <h3 className="text-[15px] font-semibold text-[var(--tBright)] mb-4 tracking-tight">
                    High cost, slow speed
                  </h3>
                  <ul className="flex flex-col gap-3 pl-0 list-none text-left text-[13px] text-[var(--t-medium)]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Heavy overhead & bloated agency pricing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Account managers & "telephone games"</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Rigid processes and slow turnaround</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===================== CINEMATIC 2 ===================== */}
        <section className="relative w-full h-[56vw] max-h-[780px] overflow-hidden bg-[#08090c]">
          <img
            src="/cinematic-robot.png"
            alt="Cinematic product macro"
            className="absolute -top-[12%] left-0 w-full h-[124%] object-cover object-center parallax-bg brightness-[0.72] contrast-[1.08] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/60 via-transparent to-[#050608]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,43,186,0.14),transparent_60%)] pointer-events-none" />

          {/* Premium text overlay */}
          {/* Top-left eyebrow */}
          <motion.div
            className="absolute top-[8%] left-[4%] flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="w-8 h-px bg-white/40 block" />
            <span className="font-accent text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Intelligence by design
            </span>
          </motion.div>

          {/* Centre quote — left aligned with requested text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-start justify-center pl-[10%] pr-[4%] pointer-events-none"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-white/85 text-[clamp(16px,2.2vw,30px)] leading-[1.3] max-w-[550px] tracking-tight text-left">
              <span className="font-playfair-display font-medium italic text-white text-[clamp(22px,3vw,44px)] block mb-3">
                Keep your site healthy
              </span>
              <span className="font-sans font-light opacity-90">
                with constant monitoring, daily backups, updates, and direct support.
              </span>
            </p>
          </motion.div>

          {/* Bottom-right label */}
          <motion.div
            className="absolute bottom-[8%] right-[4%] flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="font-accent text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
              bigO Studio — 2025
            </span>
            <span className="w-8 h-px bg-white/30 block" />
          </motion.div>
        </section>


        {/* ===================== TESTIMONIALS SECTION ===================== */}
        <section className="section-pad bg-[var(--base)]" id="testimonials-section">
          <div className="container-custom">
            <div className="grid grid-cols-12 items-end mb-[4vw]">
              <div className="col-span-3">
                <OverflowReveal
                  lines="R/01"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                  lineClassName="block"
                />
              </div>
              <div className="col-span-6 flex justify-center">
                <OverflowReveal
                  lines="Client reviews"
                  className="fs-h3 font-bold text-[var(--tBright)] leading-[1.1] text-center tracking-tight"
                  lineClassName="block"
                />
              </div>
            </div>

            <div className="relative mt-8 max-w-[780px] mx-auto bg-[var(--base-bright)] border border-black/5 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between min-h-[280px]">
              {/* Testimonial Content */}
              <div className="flex flex-col gap-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                    <span key={i} className="text-amber-500 text-lg">★</span>
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="text-[15px] text-[var(--tBright)] font-medium italic leading-relaxed"
                >
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </motion.p>
              </div>

              {/* Client Profile and Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-12 pt-8 border-t border-black/5">
                {/* Client Profile */}
                <div className="flex items-center gap-4">
                  <img
                    src={TESTIMONIALS[activeTestimonial].avatar}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border border-black/5"
                  />
                  <div>
                    <h4 className="font-semibold text-[var(--tBright)] text-[14px]">
                      {TESTIMONIALS[activeTestimonial].name}
                    </h4>
                    <p className="font-accent fs-micro font-bold uppercase tracking-wider text-[var(--t-muted)]">
                      {TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].business}
                    </p>
                  </div>
                </div>

                {/* Manual Navigation Controls */}
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
                    }
                    className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-[var(--base-bright)] hover:bg-[var(--tBright)] hover:text-white transition-all focus:outline-none cursor-pointer"
                    aria-label="Previous review"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
                    }
                    className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-[var(--base-bright)] hover:bg-[var(--tBright)] hover:text-white transition-all focus:outline-none cursor-pointer"
                    aria-label="Next review"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== RECENT INSIGHTS I/05 ===================== */}
        <section className="section-pad bg-[var(--base)]" id="insights-section">
          <div className="container-custom">
            <div className="grid grid-cols-12 items-end mb-[4vw]">
              <div className="col-span-3">
                <OverflowReveal
                  lines="I/05"
                  className="font-accent fs-index font-bold text-[var(--tBright)] opacity-[0.12] leading-none"
                  lineClassName="block"
                />
              </div>
              <div className="col-span-6 flex justify-center">
                <OverflowReveal
                  lines="Recent insights"
                  className="fs-h3 font-sans font-bold text-[var(--tBright)] leading-[1.1] text-center tracking-tight whitespace-nowrap"
                  lineClassName="block"
                />
              </div>
              <div className="col-span-3 flex justify-end">
                <span className="font-accent px-[1.8vw] py-[0.8vw] border border-black/10 rounded-full fs-label font-bold uppercase tracking-[0.3em] cursor-pointer">
                  [ NEWS OVERVIEW ]
                </span>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-x-[3vw] gap-y-[5vw] mb-[4vw]"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {INSIGHTS.map((p) => (
                <motion.div
                  variants={riseUp}
                  key={p.title}
                  className={`flex flex-col gap-[1.4vw] group cursor-pointer${p.offset ? " md:mt-[6vw]" : ""}`}
                >
                  <p className="font-accent fs-micro font-bold uppercase tracking-[0.25em] text-[var(--t-muted)]">
                    {p.date}
                  </p>
                  <WipeReveal
                    src={p.img}
                    alt={p.title}
                    className="aspect-[4/3] bg-[#eeeae8]"
                    imgClassName="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]"
                  />
                  <div className="flex justify-between items-start">
                    <h3 className="fs-card-title font-extrabold text-[var(--tBright)] leading-tight max-w-[80%]">
                      {p.title}
                    </h3>
                    <div className="flex flex-col text-right gap-1 flex-shrink-0 font-accent">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="fs-micro font-bold uppercase tracking-[0.25em] text-[var(--t-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="w-[10vw] h-[10vw] min-w-[130px] min-h-[130px] bg-[var(--accent)] text-white font-accent font-bold fs-label uppercase tracking-widest rounded-full cursor-pointer shadow-2xl flex items-center justify-center text-center"
              >
                <span>
                  MORE
                  <br />
                  POSTS
                </span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* ===================== CTA (blue) ===================== */}
        {/* ===================== CTA / CONTACT FORM ===================== */}
        <section className="section-pad bg-[var(--accent)] text-white relative overflow-hidden" id="cta-section">
          {/* Decorative background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />


          <div className="container-custom relative z-10 max-w-[800px]" id="cta-form">
            <div className="text-center mb-12">
              <span className="font-accent px-[2vw] py-[0.9vw] border border-white/20 rounded-full fs-label font-bold uppercase tracking-[0.4em]">
                [ START A PROJECT ]
              </span>
              <h2 className="fs-h2 font-extrabold leading-[0.85] tracking-tight mt-8 mb-4">
                Let's build together
              </h2>
              <p className="fs-desc text-white/70 max-w-[500px] mx-auto leading-relaxed">
                Tell us about your business goals. We will design a custom roadmap and estimate in 24 hours.
              </p>
            </div>

            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white text-black p-8 sm:p-12 rounded-3xl text-center shadow-2xl flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl">
                  ✓
                </div>
                <div>
                  <h3 className="fs-h3 font-extrabold tracking-tight mb-2">Thank you!</h3>
                  <p className="fs-desc text-gray-600 leading-relaxed">
                    Your inquiry has been structured. We have also opened your email client to send details directly to <span className="font-semibold">{CONTACT.email}</span>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormState({
                      name: "",
                      email: "",
                      whatsapp: "",
                      services: [],
                      budget: "",
                      message: "",
                    });
                    setFormStatus("");
                  }}
                  className="font-accent fs-label font-bold uppercase tracking-wider bg-[var(--accent)] text-white px-8 py-3 rounded-full transition-all border-none cursor-pointer premium-btn"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!formState.name || !formState.email) {
                    setFormStatus("error");
                    return;
                  }

                  // Structure the email message
                  const subject = `New bigO Project Inquiry — ${formState.name}`;
                  const body = `Hi bigO Studio,\n\nI'd like to discuss a project.\n\n` +
                    `Client Name: ${formState.name}\n` +
                    `Email: ${formState.email}\n` +
                    `WhatsApp: ${formState.whatsapp || 'Not provided'}\n` +
                    `Services Interested: ${formState.services.length > 0 ? formState.services.join(', ') : 'Not specified'}\n` +
                    `Budget Range: ${formState.budget || 'Not specified'}\n\n` +
                    `Project Details:\n${formState.message || 'No additional details provided.'}\n\n` +
                    `Best regards,\n${formState.name}`;

                  const mailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                  // Open mail client
                  window.location.href = mailtoUrl;
                  setFormStatus("success");
                }}
                className="bg-white text-black p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col gap-8 text-left"
              >
                {/* Services Checkboxes */}
                <div>
                  <label className="font-accent fs-micro font-bold uppercase tracking-wider text-gray-400 block mb-4">
                    What services are you interested in?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Website Design & Build",
                      "AI & Smart Automation",
                      "Digital Marketing",
                      "Care & Maintenance",
                      "Custom Web Apps",
                    ].map((service) => {
                      const isChecked = formState.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => {
                            setFormState((prev) => ({
                              ...prev,
                              services: isChecked
                                ? prev.services.filter((s) => s !== service)
                                : [...prev.services, service],
                            }));
                          }}
                          className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all cursor-pointer ${isChecked
                              ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Buttons */}
                <div>
                  <label className="font-accent fs-micro font-bold uppercase tracking-wider text-gray-400 block mb-4">
                    Project Budget Range (USD)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Under $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000+"].map((budget) => {
                      const isSelected = formState.budget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => {
                            setFormState((prev) => ({ ...prev, budget }));
                          }}
                          className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all cursor-pointer ${isSelected
                              ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-accent fs-micro font-bold uppercase tracking-wider text-gray-400 block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--accent)] transition-all font-sans text-base animate-none"
                    />
                  </div>
                  <div>
                    <label className="font-accent fs-micro font-bold uppercase tracking-wider text-gray-400 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--accent)] transition-all font-sans text-base animate-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-accent fs-micro font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formState.whatsapp}
                    onChange={(e) => setFormState((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="e.g. +91 99999 99999"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--accent)] transition-all font-sans text-base animate-none"
                  />
                </div>

                {/* Message TextArea */}
                <div>
                  <label className="font-accent fs-micro font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your brand, what pages you need, or any specific AI features you want to build."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--accent)] transition-all font-sans text-base resize-none animate-none"
                  />
                </div>

                {/* Validation/Error details */}
                {formStatus === "error" && (
                  <p className="text-red-500 text-sm font-semibold">
                    Please fill out both your Name and Email address so we can contact you.
                  </p>
                )}

                {/* Submit Button */}
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="font-accent fs-label font-bold uppercase tracking-[0.2em] bg-[var(--accent)] text-white px-8 py-4 rounded-full transition-all border-none cursor-pointer shadow-md premium-btn"
                  >
                    Submit Project Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        {/* ===================== FOOTER ===================== */}
        <footer className="section-pad bg-[var(--bodyBg)] relative overflow-hidden" id="main-footer">
          <div className="container-custom relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[3vw] mb-[8vw]">
              <div>
                <h4 className="font-accent fs-micro font-bold uppercase tracking-[0.3em] text-[var(--t-muted)] mb-[2.5vw]">
                  / Discover
                </h4>
                <ul className="flex flex-col gap-4 fs-foot font-extrabold text-[var(--tBright)] list-none pl-0">
                  {["Home", "About us", "Case studies", "Services", "Our team"].map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-[var(--accent)] transition-all no-underline">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-accent fs-micro font-bold uppercase tracking-[0.3em] text-[var(--t-muted)] mb-[2.5vw]">
                  / Contact
                </h4>
                <ul className="flex flex-col gap-4 fs-foot font-extrabold text-[var(--tBright)] list-none pl-0">
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--accent)] transition-all no-underline">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a href={waLink("Hi bigO, I'd like to chat.")} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-all no-underline">
                      WhatsApp Chat
                    </a>
                  </li>
                </ul>
                <h4 className="font-accent fs-micro font-bold uppercase tracking-[0.3em] text-[var(--t-muted)] mt-[3vw] mb-[2.5vw]">
                  / Info
                </h4>
                <ul className="flex flex-col gap-4 fs-foot font-extrabold text-[var(--tBright)] list-none pl-0">
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-all no-underline">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h4 className="font-accent fs-micro font-bold uppercase tracking-[0.3em] text-[var(--t-muted)] mb-[2.5vw]">
                  / Ecosystem
                </h4>
                <ul className="flex flex-col list-none pl-0">
                  {[
                    { n: "[01]", l: "Dribbble" },
                    { n: "[02]", l: "Behance" },
                    { n: "[04]", l: "Codepen" },
                    { n: "[05]", l: "Figma Community" },
                  ].map((s) => (
                    <li key={s.l} className="border-b border-black/10 last:border-b-0">
                      <a
                        href="#"
                        className="flex items-center gap-5 py-[1vw] group hover:text-[var(--accent)] transition-all no-underline"
                      >
                        <span className="font-accent fs-micro opacity-40 font-bold">{s.n}</span>
                        <span className="fs-foot font-extrabold text-[var(--tBright)] group-hover:text-[var(--accent)]">
                          {s.l}
                        </span>
                        <span className="ml-auto text-[1.2vw] opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end mb-[2vw]">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-accent flex items-center gap-3 font-bold fs-label uppercase tracking-[0.3em] group cursor-pointer no-underline text-[var(--tBright)]"
              >
                BACK TO TOP
                <i className="ph ph-arrow-up text-[1.2vw] group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Giant wordmark */}
          <motion.div
            className="w-full text-center pointer-events-none footer-big-text leading-none px-[2vw]"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            <div className="text-[19vw] font-extrabold text-[var(--tBright)] leading-[0.8] tracking-tight select-none flex justify-between">
              {["b", "i", "g", "O", "."].map((ch, i) => (
                <motion.span key={i} variants={riseUp} className="inline-block">
                  {ch}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="container-custom mt-[3vw] flex flex-col sm:flex-row justify-between items-center gap-6 relative z-20">
            <p className="font-accent fs-micro font-bold uppercase tracking-[0.15em] opacity-30">
              COPYRIGHT BIGO - ALL RIGHTS RESERVED
            </p>
            <p className="font-accent fs-micro font-bold uppercase tracking-[0.15em] opacity-20">
              WEBSITES & WEB APPS DONE PROPERLY
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ---------------------- Data ---------------------- */

const PARTNERS = [
  "NEXORA",
  "DATAPILOT",
  "SPICE FUSION",
  "AZURIO",
  "APEX",
  "ACME CORP",
  "VERTIGO",
];

const MENU_LINKS = [
  { n: "01", label: "About", href: "#stats-section" },
  { n: "02", label: "Services", href: "#capabilities-section" },
  { n: "03", label: "Work", href: "#works-section" },
  { n: "04", label: "Tech", href: "#tech-section" },
  { n: "05", label: "Insights", href: "#insights-section" },
  { n: "06", label: "Contact", href: "#cta-section" },
];

const NICHES = [
  {
    title: "E-commerce",
    tags: ["ONLINE STORES", "PAYMENTS", "CATALOGS", "STRIPE"],
    head: "Selling products online,",
    tail: "custom shops with inventory management, payment gateways, and checkout flows.",
    // Premium retail / shopping — unambiguous e-commerce
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Services",
    tags: ["LOCAL BUSINESS", "LEADS", "BOOKINGS", "SEO"],
    head: "Lead capture & bookings,",
    tail: "optimized sites for local services, clinics, gyms, restaurants, and consultancies.",
    // Warm editorial local-business interior
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Startups & B2B",
    tags: ["SAAS", "STARTUPS", "B2B", "LANDING PAGES"],
    head: "Scale and establish trust,",
    tail: "modern conversion-focused pages, systems, and dashboards to convert visitors.",
    // Modern startup office / team glow
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AI & Automation",
    tags: ["AI CHATBOTS", "AUTOMATION", "WORKFLOWS", "APIS"],
    head: "Automate repetitive tasks,",
    tail: "smart background integrations and custom AI chatbots that save hours every single week.",
    // Abstract neural / AI light structure
    img: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=900&q=80",
  },
];

const CAPABILITIES = [
  {
    n: "[01]",
    title: "Website design\n& build",
    head: "Custom, mobile-first websites",
    tail: "engineered for speed, lead capture, and Google ranking.",
    // Code / responsive build on screen
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
    cols: [
      ["RESPONSIVE", "SEO", "WHATSAPP"],
      ["VITE", "REACT", "SPEED"],
    ],
  },
  {
    n: "[02]",
    title: "AI & Smart\nautomation",
    head: "Intelligent AI chatbots",
    tail: "and automated workflows that save you hours every week.",
    // Glowing AI circuit / neural macro
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    cols: [
      ["CHATBOTS", "ZAPIER", "APIS"],
      ["WORKFLOWS", "AI AGENTS"],
    ],
  },
  {
    n: "[03]",
    title: "Digital\nmarketing",
    head: "Get found and trusted",
    tail: "through focused SEO, social media management, and paid ads.",
    // Analytics / growth charts
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
    cols: [
      ["SEO AUDITS", "SOCIALS", "ADS"],
      ["CAMPAIGNS", "ROI"],
    ],
  },
  {
    n: "[04]",
    title: "Care & website\nmaintenance",
    head: "Keep your site healthy",
    tail: "with constant monitoring, daily backups, updates, and direct support.",
    // Server / monitoring infrastructure
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    cols: [
      ["BACKUPS", "SECURITY", "UPTIME"],
      ["SUPPORT", "UPDATES"],
    ],
  },
  {
    n: "[05]",
    title: "Branding\n& Design",
    head: "Establish an identity",
    tail: "with custom logos, guidelines, and visual assets built to convert.",
    // Brand / design studio flatlay
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
    cols: [
      ["LOGO DESIGN", "TYPOGRAPHY"],
      ["GUIDELINES", "ASSETS"],
    ],
  },
  {
    n: "[06]",
    title: "Consulting\n& Strategy",
    head: "Expert advisory services",
    tail: "to guide your technology choices and digital growth maps.",
    // Strategy session / advisory meeting
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    cols: [
      ["ROADMAPS", "TECH CONSULTING"],
      ["AUDITS", "KPI PLANNING"],
    ],
  },
  {
    n: "[07]",
    title: "Web apps &\ncustom software",
    head: "Real software solutions",
    tail: "built with secure user logins, admin dashboards, and custom databases.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=70",
    cols: [
      ["DASHBOARDS", "DATABASES", "AUTH"],
      ["SAAS", "API WORK"],
    ],
  },
];

const WORKS = [
  {
    slug: "nexora-opportunity-platform",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=75",
    title: "Nexora Opportunity Platform",
    tags: ["AI SAAS", "DEVELOPMENT", "INTEGRATION"],
    offset: false,
  },
  {
    slug: "datapilot-ai-analytics",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75",
    title: "DataPilot AI Analytics",
    tags: ["AI WORKFLOW", "DASHBOARD", "DATABASE"],
    offset: true,
  },
  {
    slug: "spice-fusion-restaurant",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=75",
    title: "Spice Fusion Restaurant",
    tags: ["WEBSITE BUILD", "AUTOMATION", "BRANDING"],
    offset: false,
  },
];

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const TECH = [
  { name: "Angular", icon: `${DEV}/angular/angular-original.svg` },
  { name: "React", icon: `${DEV}/react/react-original.svg` },
  { name: "Vue.js", icon: `${DEV}/vuejs/vuejs-original.svg` },
  { name: "PHP", icon: `${DEV}/php/php-original.svg` },
  { name: "C#", icon: `${DEV}/csharp/csharp-original.svg` },
  { name: "JavaScript", icon: `${DEV}/javascript/javascript-original.svg` },
  { name: "Python", icon: `${DEV}/python/python-original.svg` },
  { name: "C++", icon: `${DEV}/cplusplus/cplusplus-original.svg` },
  { name: "Flutter", icon: `${DEV}/flutter/flutter-original.svg` },
  { name: "Android", icon: `${DEV}/android/android-original.svg` },
  { name: "iOS", icon: `${DEV}/apple/apple-original.svg`, invertOnHover: true },
  { name: ".NET", icon: `${DEV}/dotnetcore/dotnetcore-original.svg` },
];

const TESTIMONIALS = [
  {
    quote: "The AI-driven opportunity scraping and application tracker bigO built for Nexora completely transformed our operations. They delivered a complex full-stack SaaS project in record time.",
    name: "Dr. Amit Patel",
    role: "Founder",
    business: "Nexora Opportunity Platform",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    quote: "Working with the bigO team was a game-changer. They built our website, integrated our WhatsApp reservation chatbot, and gave us a custom dashboard to manage bookings. Our booking volume increased by 40%.",
    name: "Sanjay Roy",
    role: "Owner",
    business: "Spice Fusion Restaurant",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
  {
    quote: "Our data dashboards were messy and slow until bigO rebuilt DataPilot. Now we have clean, real-time analytics that show exactly where our growth is. Highly responsive and direct founder access.",
    name: "Karen Chen",
    role: "Director of Operations",
    business: "DataPilot AI Analytics",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
  },
];

const INSIGHTS = [
  {
    date: "02 FEBRUARY, 2026",
    title: "Frontend innovations and user journeys",
    tags: ["UI/UX", "DEVELOPMENT", "INSIGHTS"],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&w=800&q=80&fit=crop",
    offset: false,
  },
  {
    date: "28 JANUARY, 2026",
    title: "Branding in creating digital experiences",
    tags: ["CONCEPT", "EDITORIAL", "EVENT"],
    // Editorial branding / color study
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&w=900&q=80&fit=crop",
    offset: true,
  },
  {
    date: "15 JANUARY, 2026",
    title: "Designing for the future of interactive digital spaces",
    tags: ["MIDJOURNEY", "NEWS", "EDITORIAL"],
    // Futuristic 3D abstract render
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&w=900&q=80&fit=crop",
    offset: false,
  },
];

const CTA_TAGS = [
  { t: "APPLICATIONS", r: "-2deg" },
  { t: "LOGO DESIGN", r: "3deg" },
  { t: "VISUAL IDENTITY", r: "-1deg" },
  { t: "DEVELOPMENT", r: "4deg" },
  { t: "APP DESIGN", r: "-3deg" },
  { t: "UI/UX", r: "2deg" },
  { t: "PRINT DESIGN", r: "-2deg" },
  { t: "3D MODELS", r: "5deg" },
  { t: "GUIDELINES", r: "-4deg" },
  { t: "BRANDING", r: "1deg" },
  { t: "PACKAGING", r: "3deg" },
  { t: "WEB DESIGN", r: "-2deg" },
  { t: "INTERACTIONS", r: "4deg" },
  { t: "BRAND STRATEGY", r: "-1deg" },
];

/* Exact CSS: fonts, tokens, fluid clamp() scale, capabilities blur,
   reveal helpers, pixel-arrow, tag pills, Lenis. */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

.page-wrapper {
  /* Exact Azurio light-theme tokens */
  --base: #eeeae8;
  --base-rgb: 238, 234, 232;
  --base-tint: #f9f7f7;
  --base-bright: #ffffff;
  --accent: #002bba;
  --highlight: #819ffe;
  --base-opp: #0f0f0f;
  --t-bright: #121212;
  --t-medium: #575960;
  --t-muted: #7d7f89;
  --t-muted-extra: #dbd8d8;
  --t-opp-bright: #ffffff;
  --t-opp-medium: #8e93a1;
  --st-muted: #b7b2b1;
  --st-medium: #949291;
  --st-bright: #0f0f0f;

  --font-default: 'Manrope', sans-serif;
  --font-accent: 'JetBrains Mono', monospace;

  --animspeed-fast: 0.1s;
  --animspeed-medium: 0.3s;
  --animspeed-slow: 0.6s;
  --animbezier: cubic-bezier(0.23, 0.65, 0.74, 1.09);

  /* Aliases kept so var(--tBright) etc. still resolve */
  --bodyBg: var(--base);
  --tBright: var(--t-bright);
  --tMedium: var(--t-medium);
  --tMuted: var(--t-muted);

  /* ---- Fluid type scale keyed to 1920px design ---- */
  --fs-hero: clamp(45px, 5.5vw, 110px);
  --fs-h2: clamp(56px, 7.3vw, 140px);
  --fs-cta: clamp(64px, 9.4vw, 180px);
  --fs-h3: clamp(34px, 3.75vw, 72px);
  --fs-cap-title: clamp(30px, 3.1vw, 60px);
  --fs-counter: clamp(56px, 6.25vw, 120px);
  --fs-lead: clamp(24px, 2.9vw, 56px);
  --fs-card-title: clamp(24px, 2.3vw, 44px);
  --fs-desc: clamp(16px, 1.15vw, 22px);
  --fs-tech: clamp(16px, 1.05vw, 20px);
  --fs-foot: clamp(18px, 1.25vw, 24px);
  --fs-index: clamp(48px, 5.2vw, 100px);
  --fs-label: clamp(11px, 0.7vw, 14px);
  --fs-micro: clamp(10px, 0.62vw, 12px);

  background-color: var(--base);
  color: var(--t-medium);
  font-family: var(--font-default);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: clip;
  position: relative;
  width: 100%;
  transition: background-color 0.8s ease;
}

/* Fluid type utility classes */
.page-wrapper .fs-hero { font-size: var(--fs-hero); line-height: 1.02; }
.page-wrapper .fs-h2 { font-size: var(--fs-h2); }
.page-wrapper .fs-cta { font-size: var(--fs-cta); }
.page-wrapper .fs-h3 { font-size: var(--fs-h3); }
.page-wrapper .fs-cap-title { font-size: var(--fs-cap-title); }
.page-wrapper .fs-counter { font-size: var(--fs-counter); }
.page-wrapper .fs-lead { font-size: var(--fs-lead); }
.page-wrapper .fs-card-title { font-size: var(--fs-card-title); }
.page-wrapper .fs-desc { font-size: var(--fs-desc); }
.page-wrapper .fs-tech { font-size: var(--fs-tech); }
.page-wrapper .fs-foot { font-size: var(--fs-foot); }
.page-wrapper .fs-index { font-size: var(--fs-index); }
.page-wrapper .fs-label { font-size: var(--fs-label); }
.page-wrapper .fs-micro { font-size: var(--fs-micro); }

/* Fluid section padding */
.page-wrapper .section-pad { padding-top: clamp(80px, 9vw, 180px); padding-bottom: clamp(80px, 9vw, 180px); }
.page-wrapper .cta-pad { padding-top: clamp(110px, 12vw, 240px); padding-bottom: clamp(110px, 12vw, 240px); }

/* Section stack slide-over effect */
[data-stack-pin] { position: relative; z-index: 1; will-change: transform; }
[data-stack-over] { position: relative; z-index: 10; will-change: transform; background: var(--base-bg, #eeeae8); }

.page-wrapper .container-custom {
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4.2vw, 80px);
}

.page-wrapper .font-accent { font-family: var(--font-accent); }

.page-wrapper::-webkit-scrollbar { width: 0; height: 0; display: none; }

.page-wrapper ::selection {
  background-color: var(--base-opp);
  color: var(--t-opp-bright);
  text-shadow: none;
}

/* Hero line reveal */
.page-wrapper .reveal-line { overflow: hidden; display: block; }
.page-wrapper .reveal-inner { display: inline-block; transform: translateY(110%); }

/* Hero video — grows symmetrically from centre on scroll (scale transform).
   Base xPercent/yPercent are set by GSAP; scale animates on top. */
.page-wrapper .hero-video-wrapper {
  transform-origin: center center;
  will-change: transform, border-radius;
  backface-visibility: hidden;
}
.page-wrapper .hero-video-wrapper video {
  transform: scale(1.08); /* hide sub-pixel edge seams and crop out thin black lines */
}

/* Capabilities blurred title — blur→sharpen driven by Framer whileInView */
.page-wrapper .cap-title { will-change: filter; }

/* CTA scattered pill tags */
.page-wrapper .tag-pill {
  background: #fff;
  color: #000;
  padding: clamp(8px, 0.7vw, 14px) clamp(14px, 1.2vw, 24px);
  border-radius: 4px;
  font-family: var(--font-accent);
  font-weight: 700;
  font-size: var(--fs-label);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: inline-block;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  white-space: nowrap;
}

/* Pixel arrow (Works "ALL WORKS") */
.page-wrapper .pixel-arrow {
  width: 1.4em;
  height: 0.9em;
  display: inline-block;
  background:
    linear-gradient(currentColor 0 0) 0 50% / 70% 22% no-repeat,
    linear-gradient(currentColor 0 0) 100% 0 / 22% 50% no-repeat,
    linear-gradient(currentColor 0 0) 100% 100% / 22% 50% no-repeat;
  transition: transform var(--animspeed-medium) var(--animbezier);
}
.page-wrapper .group:hover .pixel-arrow { transform: translateX(4px); }

/* Lenis */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

/* Infinite logo marquee */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
/* Edge-fade mask — logos dissolve into the background at both sides. */
.page-wrapper .marquee-mask {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 14%,
    #000 86%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 14%,
    #000 86%,
    transparent 100%
  );
}
.page-wrapper .marquee-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.page-wrapper .marquee-content {
  display: inline-flex;
  gap: clamp(72px, 9vw, 140px);
  animation: marquee 42s linear infinite;
}
.page-wrapper .marquee-container:hover .marquee-content {
  animation-play-state: paused;
}
.page-wrapper .marquee-logo {
  font-family: var(--font-accent);
  font-weight: 500;
  font-size: clamp(16px, 1.5vw, 22px);
  color: var(--t-medium);
  opacity: 0.45;
  transition: opacity 0.45s var(--animbezier), color 0.45s var(--animbezier);
  letter-spacing: 0.22em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: clamp(14px, 1.8vw, 24px);
}
.page-wrapper .marquee-dot {
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
  background: var(--accent);
  opacity: 0.55;
  flex: 0 0 auto;
  transition: opacity 0.45s var(--animbezier), transform 0.45s var(--animbezier);
}
.page-wrapper .marquee-logo:hover {
  opacity: 1;
  color: var(--t-bright);
}
.page-wrapper .marquee-logo:hover .marquee-dot {
  opacity: 1;
  transform: rotate(45deg) scale(1.35);
}

/* ============================================================
   FULLSCREEN MENU — premium two-panel overlay with a liquid
   chrome orb, numbered nav, ambient glows and a grid wash.
   ============================================================ */
.menu-overlay {
  color: #fff;
  background: transparent;
}
.menu-overlay .menu-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 1;
}
.menu-overlay .menu-glow-a {
  width: 46vw;
  height: 46vw;
  top: -14vw;
  left: -10vw;
  background: radial-gradient(circle, rgba(0, 43, 186, 0.32), transparent 68%);
  animation: menuGlowDrift 16s ease-in-out infinite;
}
.menu-overlay .menu-glow-b {
  width: 40vw;
  height: 40vw;
  bottom: -16vw;
  right: -8vw;
  background: radial-gradient(circle, rgba(129, 159, 254, 0.18), transparent 68%);
  animation: menuGlowDrift 20s ease-in-out infinite reverse;
}
@keyframes menuGlowDrift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(3vw, -2vw) scale(1.08); }
}
.menu-overlay .menu-grid {
  z-index: 1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 68px 68px;
  -webkit-mask-image: radial-gradient(circle at 46% 42%, #000, transparent 72%);
  mask-image: radial-gradient(circle at 46% 42%, #000, transparent 72%);
  opacity: 0.55;
}

/* Liquid chrome orb */
.menu-overlay .menu-orb {
  position: relative;
  width: clamp(190px, 17vw, 280px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 34% 26%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 40%),
    conic-gradient(
      from 210deg,
      #e9edf6, #9aa6c0, #464e63, #aab4cc, #222734,
      #cfd6e6, #5b647a, #e9edf6
    );
  box-shadow:
    inset 0 -28px 60px rgba(0, 0, 0, 0.68),
    inset 0 22px 52px rgba(255, 255, 255, 0.3),
    inset -20px 0 52px rgba(129, 159, 254, 0.2),
    0 50px 120px rgba(0, 0, 0, 0.6);
  filter: saturate(1.06) contrast(1.08);
  overflow: hidden;
  animation: menuOrbFloat 9s ease-in-out infinite;
}
.menu-overlay .menu-orb-core {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(129, 159, 254, 0.4),
    transparent 38%,
    rgba(255, 255, 255, 0.45),
    transparent 70%,
    rgba(0, 43, 186, 0.3),
    transparent
  );
  mix-blend-mode: screen;
  animation: menuOrbSpin 14s linear infinite;
}
@keyframes menuOrbSpin { to { transform: rotate(360deg); } }
@keyframes menuOrbFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}

/* Numbered nav */
.menu-overlay .menu-item-mask {
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.menu-overlay nav .menu-item-mask:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.menu-overlay .menu-item {
  display: flex;
  align-items: baseline;
  gap: clamp(16px, 1.8vw, 30px);
  padding: clamp(12px, 1.5vw, 24px) clamp(4px, 0.6vw, 12px);
  text-decoration: none;
  position: relative;
}
.menu-overlay .menu-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(129, 159, 254, 0.1), transparent 60%);
  opacity: 0;
  transition: opacity 0.5s var(--animbezier);
}
.menu-overlay .menu-item:hover::before { opacity: 1; }
.menu-overlay .menu-item-num {
  font-family: var(--font-accent);
  font-size: clamp(11px, 0.85vw, 13px);
  color: rgba(255, 255, 255, 0.34);
  letter-spacing: 0.14em;
  width: 2.6ch;
  flex: 0 0 auto;
  transition: color 0.4s var(--animbezier);
  position: relative;
  z-index: 1;
}
.menu-overlay .menu-item-num::before { content: "/ "; }
.menu-overlay .menu-item-label {
  font-family: var(--font-default);
  font-size: clamp(36px, 5.2vw, 82px);
  line-height: 0.98;
  font-weight: 300;
  letter-spacing: -0.025em;
  color: rgba(255, 255, 255, 0.9);
  transition: transform 0.55s var(--animbezier), color 0.4s var(--animbezier);
  position: relative;
  z-index: 1;
}
.menu-overlay .menu-item-arrow {
  margin-left: auto;
  font-size: clamp(20px, 2vw, 34px);
  color: rgba(255, 255, 255, 0.4);
  opacity: 0;
  transform: translate(-16px, 8px);
  transition: opacity 0.45s var(--animbezier), transform 0.45s var(--animbezier), color 0.4s;
  position: relative;
  z-index: 1;
}
.menu-overlay .menu-item:hover .menu-item-label {
  transform: translateX(clamp(10px, 1.4vw, 28px));
  color: #fff;
}
.menu-overlay .menu-item:hover .menu-item-num { color: var(--highlight); }
.menu-overlay .menu-item:hover .menu-item-arrow {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--highlight);
}

/* Footer socials underline */
.menu-overlay .menu-social { position: relative; }
.menu-overlay .menu-social::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--animbezier);
}
.menu-overlay .menu-social:hover::after { transform: scaleX(1); }

@media (prefers-reduced-motion: reduce) {
  .menu-overlay .menu-orb,
  .menu-overlay .menu-orb-core,
  .menu-overlay .menu-glow-a,
  .menu-overlay .menu-glow-b { animation: none; }
}

/* Premium Glint & Scale Hover Effect */
.page-wrapper .premium-btn {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
}
.page-wrapper .premium-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  transition: none;
  pointer-events: none;
}
.page-wrapper .premium-btn:hover {
  transform: scale(1.04) translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.page-wrapper .premium-btn:hover::before {
  left: 150%;
  transition: left 0.85s cubic-bezier(0.25, 1, 0.5, 1);
}

/* ============================================================
   PREMIUM LAYER — cursor, grain, glows, progress, split-text,
   preloader, magnetic, underline-draw. All GPU-cheap; guarded
   by prefers-reduced-motion and (hover:hover) where relevant.
   ============================================================ */

/* ---- Custom cursor (desktop only) ---- */
@media (hover: hover) and (pointer: fine) {
  .cursor-on, .cursor-on * { cursor: none !important; }
}
.bigo-cursor-dot,
.bigo-cursor-ring {
  position: fixed;
  top: 0; left: 0;
  border-radius: 999px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
}
.bigo-cursor-dot {
  width: 7px; height: 7px;
  background: #fff;
  margin: -3.5px 0 0 -3.5px;
}
.bigo-cursor-ring {
  width: 42px; height: 42px;
  margin: -21px 0 0 -21px;
  border: 1px solid rgba(255,255,255,0.7);
  display: flex; align-items: center; justify-content: center;
  transition: width 0.32s var(--animbezier), height 0.32s var(--animbezier),
              border-color 0.32s var(--animbezier), background-color 0.32s var(--animbezier);
}
.bigo-cursor-ring .cursor-label {
  font-family: var(--font-accent);
  font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #fff;
  opacity: 0; transform: scale(0.6);
  transition: opacity 0.25s ease, transform 0.25s var(--animbezier);
  white-space: nowrap;
}
.bigo-cursor-ring.is-hovering {
  width: 78px; height: 78px;
  margin: -39px 0 0 -39px;
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.25);
}
.bigo-cursor-ring.is-hovering .cursor-label { opacity: 1; transform: scale(1); }

/* ---- Film grain overlay ---- */
.bigo-grain {
  position: fixed;
  inset: -120% -120% -120% -120%;
  width: auto; height: auto;
  pointer-events: none;
  z-index: 9000;
  opacity: 0.045;
  mix-blend-mode: overlay;
  background-image: var(--grain-url);
  background-size: 220px 220px;
  will-change: transform;
}
@keyframes grainShift {
  0%   { transform: translate(0, 0); }
  10%  { transform: translate(-4%, -3%); }
  20%  { transform: translate(-8%, 2%); }
  30%  { transform: translate(3%, -6%); }
  40%  { transform: translate(-2%, 8%); }
  50%  { transform: translate(-8%, 4%); }
  60%  { transform: translate(6%, 1%); }
  70%  { transform: translate(-3%, 6%); }
  80%  { transform: translate(4%, -8%); }
  90%  { transform: translate(-6%, 3%); }
  100% { transform: translate(0, 0); }
}
.bigo-grain.is-animated { animation: grainShift 8s steps(10) infinite; }

/* ---- Ambient gradient glows ---- */
.ambient-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(90px);
  pointer-events: none;
  opacity: 0.5;
  z-index: 0;
  will-change: transform;
}
.ambient-glow.glow-accent {
  background: radial-gradient(circle, rgba(0,43,186,0.32) 0%, rgba(0,43,186,0) 70%);
}
.ambient-glow.glow-warm {
  background: radial-gradient(circle, rgba(255,196,150,0.28) 0%, rgba(255,196,150,0) 70%);
}
.ambient-glow.glow-white {
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%);
}
@keyframes glowDrift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(4%, -5%) scale(1.08); }
}
.ambient-glow.is-animated { animation: glowDrift 14s ease-in-out infinite; }

/* ---- Scroll progress bar ---- */
.bigo-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px; width: 100%;
  transform-origin: 0 50%;
  background: var(--accent);
  z-index: 9500;
}

/* ---- SplitText masks ---- */
.split-line { display: block; overflow: hidden; }
.split-word { display: inline-block; overflow: hidden; vertical-align: top; }
.split-word > span,
.split-line > span { display: inline-block; will-change: transform; }

/* ---- Magnetic wrapper ---- */
.magnetic { display: inline-flex; will-change: transform; }

/* ---- Underline-draw link ---- */
.link-underline {
  position: relative;
  display: inline-block;
}
.link-underline::after {
  content: '';
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.45s var(--animbezier);
}
.link-underline:hover::after { transform: scaleX(1); }

/* ---- Preloader ---- */
.bigo-preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #0b0b0d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: #fff;
}
.bigo-preloader .pre-word {
  font-family: var(--font-default);
  font-weight: 800;
  font-size: clamp(56px, 10vw, 160px);
  letter-spacing: -0.03em;
  line-height: 1;
  display: flex;
}
.bigo-preloader .pre-count {
  font-family: var(--font-accent);
  font-weight: 700;
  font-size: clamp(14px, 1.2vw, 20px);
  letter-spacing: 0.3em;
  opacity: 0.6;
}
.bigo-preloader .pre-bar {
  width: min(320px, 60vw);
  height: 2px;
  background: rgba(255,255,255,0.15);
  overflow: hidden;
}
.bigo-preloader .pre-bar > span {
  display: block;
  height: 100%;
  background: #fff;
  transform-origin: left center;
}

/* ---- Framed hero video ring ---- */
.page-wrapper .hero-frame-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18),
              inset 0 0 60px rgba(0,0,0,0.35);
  pointer-events: none;
  z-index: 2;
}

/* ---- Reduced motion: kill continuous animations ---- */
@media (prefers-reduced-motion: reduce) {
  .bigo-grain.is-animated,
  .ambient-glow.is-animated { animation: none !important; }
}
`;
