import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   Menu — Awwwards-quality fullscreen navigation.
   Editorial · luxury · minimal · cinematic.

   Architecture:
     <Menu />            orchestrator (portal, scroll-lock, ESC, focus-trap)
       <MenuOverlay />   matte-black stage: noise, dividers, reveal
         <HeroVisual />  abstract chrome object (left 40%)
         <NavigationList />
           <MenuItem />  number · divider · title · plus
         <ContactSection />

   Self-contained: renders through a portal to <body>, so it carries
   its own tokens + type and never depends on page-scoped CSS vars.
   ============================================================ */

const ACCENT = "#2563EB"; // electric blue — current page + hover
const EASE = [0.22, 1, 0.36, 1];

/* ---------- data ---------- */
const NAV_ITEMS = [
  { n: "01", label: "Home", href: "#hero" },
  { n: "02", label: "Services", href: "#capabilities-section" },
  { n: "03", label: "Work", href: "#works-section" },
  { n: "04", label: "Insights", href: "#insights-section" },
  { n: "05", label: "Contact", href: "#cta-section" },
];

/* ============================================================
   Motion variants
   ============================================================ */
const overlayVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 100%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.85, ease: EASE, when: "beforeChildren", staggerChildren: 0.04 },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 100%)",
    transition: { duration: 0.7, ease: EASE, when: "afterChildren" },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: EASE, delay: 0.15 } },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE, delay: 0.15 } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.4, ease: EASE } },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: 0.3 + i * 0.08 },
  }),
  exit: { y: 24, opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

const dividerVariants = {
  hidden: { scaleX: 0 },
  show: (i) => ({
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.32 + i * 0.08 },
  }),
  exit: { scaleX: 0, transition: { duration: 0.3, ease: EASE } },
};

const plusVariants = {
  hidden: { scale: 0.8, rotate: -45, opacity: 0 },
  show: (i) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.42 + i * 0.08 },
  }),
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.25 } },
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: (d = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: d } }),
  exit: { y: 16, opacity: 0, transition: { duration: 0.3 } },
};

/* ============================================================
   HeroVisual — abstract chrome / metallic 3D object.
   Layered radial + conic metal, specular highlight, drifting
   sheen band, subtle idle float. Pure CSS/SVG (no asset to fail).
   ============================================================ */
function HeroVisual() {
  return (
    <motion.div className="mn-hero" variants={heroVariants}>
      <div className="mn-hero-stage">
        <div className="mn-chrome">
          <span className="mn-chrome-sheen" />
          <span className="mn-chrome-spec" />
          <span className="mn-chrome-ring" />
        </div>
        <span className="mn-chrome-shadow" />
      </div>
      <span className="mn-hero-caption">FIG — 001 / CHROME STUDY</span>
    </motion.div>
  );
}

/* ============================================================
   MenuItem — number · divider · title · right arrow.
   ============================================================ */
function MenuItem({ item, index, active, onNavigate, itemRef }) {
  return (
    <li className="mn-item-wrap">
      <motion.div className="mn-divider-track" variants={dividerVariants} custom={index}>
        <span className="mn-divider" />
      </motion.div>

      <motion.a
        ref={itemRef}
        href={item.href}
        onClick={(e) => onNavigate(e, item.href)}
        className={`mn-item${active ? " is-active" : ""}`}
        variants={itemVariants}
        custom={index}
      >
        <span className="mn-item-num">
          <span className="mn-item-num-slash">/ </span>
          <span className="mn-item-num-val">{item.n}</span>
        </span>

        <span className="mn-item-label">{item.label}</span>

        <motion.span className="mn-item-arrow-wrap" variants={plusVariants} custom={index} aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.a>
    </li>
  );
}

/* ============================================================
   NavigationList
   ============================================================ */
function NavigationList({ activeHref, onNavigate, firstRef, lastRef }) {
  return (
    <nav className="mn-nav" aria-label="Primary">
      <ul>
        {NAV_ITEMS.map((item, i) => (
          <MenuItem
            key={item.n}
            item={item}
            index={i}
            active={activeHref === item.href}
            onNavigate={onNavigate}
            itemRef={i === 0 ? firstRef : i === NAV_ITEMS.length - 1 ? lastRef : undefined}
          />
        ))}
        {/* Bottom border for the final menu item */}
        <li className="mn-item-wrap">
          <motion.div className="mn-divider-track" variants={dividerVariants} custom={NAV_ITEMS.length}>
            <span className="mn-divider" />
          </motion.div>
        </li>
      </ul>
    </nav>
  );
}

/* ============================================================
   ContactSection — stacked editorial info blocks.
   ============================================================ */
function ContactSection({ contact }) {
  return (
    <motion.div className="mn-contact" variants={fadeUp} custom={0.7}>
      {/* Block 1: Email and Phone */}
      <div className="mn-contact-block">
        <a href={`mailto:${contact.email}`} className="mn-contact-val uppercase">
          {contact.email}
        </a>
        <a href={`tel:${contact.phoneRaw}`} className="mn-contact-val">
          {contact.phone}
        </a>
      </div>

      {/* Block 2: Location Address */}
      <div className="mn-contact-block mn-address">
        <span>{contact.location.toUpperCase()}</span>
      </div>

      {/* Block 3: Social Stack */}
      <div className="mn-socials">
        {["DRIBBBLE", "BEHANCE", "GITHUB", "FIGMA COMMUNITY", "CODEPEN"].map((label) => (
          <a key={label} href="#" className="mn-social">
            {label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================================
   MenuOverlay — the matte-black stage.
   ============================================================ */
function MenuOverlay({ open, onClose, activeHref, contact, tagline }) {
  const panelRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const closeRef = useRef(null);

  // Focus the close button on open (a11y entry point).
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => closeRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Focus trap within the panel.
  const onKeyDown = useCallback((e) => {
    if (e.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables || focusables.length === 0) return;
    const list = Array.from(focusables);
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const handleNavigate = useCallback(
    (e, href) => {
      // Smooth-scroll to same-page anchors, then close.
      if (href.startsWith("#")) {
        e.preventDefault();
        onClose();
        if (window.lenis) {
          setTimeout(() => window.lenis.scrollTo(href), 500);
        } else {
          const target = document.querySelector(href);
          if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
          }
        }
      } else {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <motion.div
      className="mn-root"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      variants={overlayVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onKeyDown={onKeyDown}
    >
      {/* Click-outside catcher (behind the panel). */}
      <motion.div className="mn-backdrop" variants={backdropVariants} onClick={onClose} />

      <div className="mn-panel" ref={panelRef}>
        {/* subtle film noise */}
        <div className="mn-noise" aria-hidden />

        {/* Top bar (transparent and borderless) */}
        <div className="mn-topbar">
          <div /> {/* spacing */}
          <button ref={closeRef} className="mn-close" onClick={onClose} aria-label="Close menu">
            <span className="mn-close-x" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        {/* Split body */}
        <div className="mn-body">
          {/* Left Panel: branding + visual */}
          <div className="mn-left">
            <div className="mn-brand-logo">
              <span className="mn-brand-big">bigO</span>
              <span className="mn-brand-sub">STUDIO</span>
            </div>
            <HeroVisual />
          </div>

          {/* Right Panel: two-column layout */}
          <div className="mn-right">
            {/* Main column: Tagline & Nav */}
            <div className="mn-right-main">
              <motion.div className="mn-tagline" variants={fadeUp} custom={0.25}>
                <span className="mn-tagline-emoji">🦄</span>
                <div className="mn-tagline-text">
                  <span>INNOVATIVE DESIGN</span>
                  <span>AND CUTTING-EDGE DEVELOPMENT</span>
                </div>
              </motion.div>

              <NavigationList
                activeHref={activeHref}
                onNavigate={handleNavigate}
                firstRef={firstRef}
                lastRef={lastRef}
              />
            </div>

            {/* Sidebar column: vertical stacked contacts/socials */}
            <ContactSection contact={contact} />
          </div>
        </div>
      </div>

      <StyleTag />
    </motion.div>
  );
}

/* ============================================================
   Menu — public orchestrator.
   Props: open, onClose, contact, tagline, activeHref
   ============================================================ */
export default function Menu({ open, onClose, contact, tagline, activeHref = "#hero" }) {
  // Body scroll lock + ESC close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <MenuOverlay
          key="mn"
          open={open}
          onClose={onClose}
          activeHref={activeHref}
          contact={contact}
          tagline={tagline}
        />
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ============================================================
   Scoped styles — injected once with the overlay. Self-contained
   so it works from a body-level portal (no page vars needed).
   ============================================================ */
function StyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

const CSS = `
.mn-root{
  position:fixed; inset:0; z-index:2000;
  font-family:'Inter','Inter Variable',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  color:#f4f4f5;
  will-change:clip-path;
}
.mn-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,0.5); }
.mn-panel{
  position:absolute; inset:0;
  background:#000000;
  display:flex; flex-direction:column;
  overflow:hidden;
}
/* film noise */
.mn-noise{
  position:absolute; inset:0; pointer-events:none; z-index:0;
  opacity:0.04; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;
}

/* top bar */
.mn-topbar{
  position:absolute; top:0; left:0; right:0; z-index:10;
  display:flex; align-items:center; justify-content:space-between;
  padding:clamp(20px,3.5vw,48px) clamp(24px,4.5vw,72px);
  border:none;
}
.mn-close{
  background:none; border:none; cursor:pointer; padding:0;
  color:rgba(255,255,255,0.5); transition:color .3s ${cubic()};
}
.mn-close:hover{ color:#fff; }
.mn-close-x{
  display:grid; place-items:center; width:44px; height:44px; color:inherit;
  transition:transform .5s ${cubic()}, opacity .3s;
}
.mn-close:hover .mn-close-x{ transform:rotate(90deg); opacity:0.8; }
.mn-close:focus-visible{ outline:none; }
.mn-close:focus-visible .mn-close-x{ color:${ACCENT}; }

/* body split */
.mn-body{
  position:relative; z-index:1;
  flex:1; display:grid; grid-template-columns:40% 60%; min-height:0;
}
.mn-left{
  position:relative;
  background:#000000;
  border-right:1px solid rgba(255,255,255,0.06);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:clamp(24px,4vw,72px);
}
.mn-brand-logo{
  position:absolute; top:clamp(20px,3.5vw,48px); left:clamp(24px,4.5vw,72px);
  display:flex; flex-direction:column; line-height:1.1;
  font-family:'Inter','Inter Variable',sans-serif; color:#fff;
}
.mn-brand-big{
  font-size:clamp(20px,1.8vw,24px); font-weight:850; tracking:-0.03em;
}
.mn-brand-sub{
  font-size:9px; font-weight:600; color:rgba(255,255,255,0.4); letter-spacing:0.35em; margin-top:2px;
}
.mn-right{
  background:#080808;
  display:grid; grid-template-columns:63% 37%; gap:clamp(20px,3.2vw,56px);
  padding:clamp(80px,7vw,120px) clamp(24px,5vw,72px) clamp(40px,4vw,72px);
  align-items:center; min-width:0;
}
.mn-right-main{
  display:flex; flex-direction:column; justify-content:center; min-width:0;
}

/* ---------- HERO / chrome ---------- */
.mn-hero{ position:relative; display:flex; flex-direction:column; align-items:center; gap:26px; }
.mn-hero-stage{ position:relative; display:grid; place-items:center; }
.mn-chrome{
  position:relative;
  width:clamp(160px,16vw,260px); aspect-ratio:1; border-radius:50%;
  background:
    radial-gradient(circle at 34% 24%, #ffffff 0%, rgba(255,255,255,0) 34%),
    conic-gradient(from 205deg,
      #f2f4f8, #8a93a8, #33384a, #b9c0d2, #1b1f29,
      #dfe4ee, #545c70, #eef1f7);
  box-shadow:
    inset 0 -34px 70px rgba(0,0,0,0.72),
    inset 0 24px 60px rgba(255,255,255,0.30),
    inset -22px 0 60px rgba(37,99,235,0.16),
    0 60px 130px rgba(0,0,0,0.6);
  filter:saturate(1.05) contrast(1.08);
  overflow:hidden;
  animation:mnFloat 9s ease-in-out infinite;
}
.mn-chrome-sheen{
  position:absolute; inset:0; border-radius:50%; mix-blend-mode:screen;
  background:conic-gradient(from 0deg,
    transparent, rgba(37,99,235,0.35), transparent 34%,
    rgba(255,255,255,0.5), transparent 66%, rgba(37,99,235,0.28), transparent);
  animation:mnSpin 15s linear infinite;
}
.mn-chrome-spec{
  position:absolute; top:14%; left:20%; width:34%; height:26%; border-radius:50%;
  background:radial-gradient(circle at 40% 40%, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%);
  filter:blur(2px);
}
.mn-chrome-ring{
  position:absolute; inset:-8%; border-radius:50%;
  border:1px solid rgba(255,255,255,0.06);
}
.mn-chrome-shadow{
  position:absolute; left:50%; bottom:-11%; transform:translateX(-50%);
  width:56%; height:24px; border-radius:50%;
  background:radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%);
  filter:blur(9px); animation:mnShadow 9s ease-in-out infinite;
}
.mn-hero-caption{
  font-size:10px; letter-spacing:0.34em; text-transform:uppercase; color:rgba(255,255,255,0.34);
}
@keyframes mnFloat{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-18px) } }
@keyframes mnShadow{ 0%,100%{ opacity:.55; transform:translateX(-50%) scale(1) } 50%{ opacity:.32; transform:translateX(-50%) scale(.86) } }
@keyframes mnSpin{ to{ transform:rotate(360deg) } }

/* ---------- tagline ---------- */
.mn-tagline{
  display:flex; align-items:flex-start; gap:12px;
  font-family:'JetBrains Mono','Courier New',monospace;
  font-size:11px; line-height:1.55; letter-spacing:0.16em;
  text-transform:uppercase; color:rgba(255,255,255,0.4);
  margin-bottom:clamp(28px,3vw,48px);
}
.mn-tagline-emoji{ font-size:15px; line-height:1; }
.mn-tagline-text{ display:flex; flex-direction:column; }

/* ---------- nav list ---------- */
.mn-nav ul{ list-style:none; margin:0; padding:0; }
.mn-item-wrap{ position:relative; }
.mn-divider-track{
  height:1px; transform-origin:left center; transform:scaleX(0);
}
.mn-divider{
  display:block; height:1px; width:100%;
  background:rgba(255,255,255,0.06); transition:background .3s ${cubic()};
}
.mn-item{
  position:relative; display:flex; align-items:center; gap:clamp(16px,2vw,30px);
  padding:clamp(10px,1.1vw,16px) 0;
  text-decoration:none; color:#f4f4f5;
  transition:transform .3s ${cubic()};
}
.mn-item-num{
  font-family:'JetBrains Mono','Courier New',monospace;
  font-size:clamp(11px,0.85vw,13px); letter-spacing:0.16em;
  color:rgba(255,255,255,0.22); width:4.5ch; flex:0 0 auto;
}
.mn-item-num-val{
  color:rgba(255,255,255,0.36); transition:color .3s ${cubic()};
}
.mn-item-num-slash{
  color:rgba(255,255,255,0.18);
}
.mn-item-label{
  font-size:clamp(24px,2.6vw,42px); line-height:1.0; font-weight:700; letter-spacing:-0.02em;
  color:inherit; transition:color .3s ${cubic()};
}
.mn-item-arrow-wrap{
  margin-left:auto; display:grid; place-items:center;
  color:rgba(255,255,255,0.22);
  transition:transform .3s ${cubic()}, color .3s ${cubic()};
}
/* hover */
.mn-item:hover .mn-item-label{ color:${ACCENT}; }
.mn-item:hover .mn-item-num-val{ color:${ACCENT}; }
.mn-item:hover .mn-item-arrow-wrap{ color:${ACCENT}; transform:translateX(4px); }
.mn-item:hover ~ .mn-item-wrap .mn-divider,
.mn-item-wrap:hover .mn-divider{ background:rgba(255,255,255,0.24); }
.mn-item:focus-visible{ outline:none; }
.mn-item:focus-visible .mn-item-label{ color:${ACCENT}; }
.mn-item:focus-visible .mn-item-arrow-wrap{ color:${ACCENT}; transform:translateX(4px); }
/* current page */
.mn-item.is-active .mn-item-num-val{ color:${ACCENT}; }
.mn-item.is-active .mn-item-label{ color:${ACCENT}; }
.mn-item.is-active .mn-item-arrow-wrap{ color:${ACCENT}; }

/* ---------- contact ---------- */
.mn-contact{
  display:flex; flex-direction:column; gap:clamp(32px,3.8vw,64px);
  padding-left:clamp(20px,2.5vw,48px);
  border-left:1px solid rgba(255,255,255,0.06);
  height:100%; justify-content:center;
}
.mn-contact-block{
  display:flex; flex-direction:column; gap:8px;
  font-family:'JetBrains Mono','Courier New',monospace;
  font-size:clamp(12px,0.95vw,14px); line-height:1.6;
  color:rgba(255,255,255,0.7);
}
.mn-contact-val{
  color:rgba(255,255,255,0.76); text-decoration:none;
  transition:color .3s ${cubic()}; word-break:break-word;
}
a.mn-contact-val:hover{ color:${ACCENT}; }
.mn-address{
  color:rgba(255,255,255,0.4);
}
.mn-socials{
  display:flex; flex-direction:column; gap:14px;
}
.mn-social{
  position:relative; font-family:'JetBrains Mono','Courier New',monospace;
  font-size:clamp(11px,0.85vw,13px); letter-spacing:0.16em; text-transform:uppercase;
  color:rgba(255,255,255,0.4); text-decoration:none; transition:color .3s ${cubic()}, transform .3s ${cubic()};
  display:inline-flex; align-items:center;
}
.mn-social:hover{ color:#fff; transform:translateX(4px); }

/* ---------- responsive ---------- */
@media (max-width:1024px){
  .mn-body{ grid-template-columns:1fr; }
  .mn-left{ display:none; }
  .mn-right{ grid-template-columns:1fr; justify-content:flex-start; padding-top:clamp(80px,10vw,120px); gap:40px; overflow-y:auto; }
  .mn-contact{ border-left:none; padding-left:0; border-top:1px solid rgba(255,255,255,0.06); padding-top:32px; height:auto; }
}
@media (max-width:640px){
  .mn-item-label{ font-size:clamp(24px,8vw,34px); }
  .mn-item-arrow-wrap svg{ width:18px; height:18px; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce){
  .mn-chrome, .mn-chrome-sheen, .mn-chrome-shadow{ animation:none; }
}
`;

function cubic() {
  return "cubic-bezier(0.22,1,0.36,1)";
}
