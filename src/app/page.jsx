import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { CONTACT, waLink, SITE } from "./site";
import { CASE_STUDIES } from "./caseStudies";
import { TEAM } from "./team";
import { TESTIMONIALS } from "./testimonials";
import SiteFooter from "./components/SiteFooter";

export function meta() {
  const title = "bigO - Websites, AI automation, marketing & web apps for growing businesses";
  const description =
    "bigO is a small digital studio that handles everything online for your business. Websites, AI automation, digital marketing, branding, care plans, and custom software. One team, complete solution.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: SITE.ogImage },
    { property: "og:url", content: SITE.url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SITE.ogImage },
  ];
}

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

// Swap these for your own (AI-generated) images anytime - one place to edit.
const IMAGES = {
  showcase:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=75",
  about:
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=75",
};

// Fades children in after `delay` ms.
function FadeIn({ children, delay = 0, duration = 1000, style }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className="transition-opacity"
      style={{
        opacity: shown ? 1 : 0,
        transitionProperty: "opacity",
        transitionDuration: `${duration}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Animates a heading character-by-character (split on \n into lines).
function AnimatedHeading({ text, charDelay = 30, startDelay = 200, style }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);
  const lines = text.split("\n");
  return (
    <h1 style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "block" }}>
          {line.split("").map((char, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                style={{
                  display: "inline-block",
                  opacity: go ? 1 : 0,
                  transform: go ? "translateX(0)" : "translateX(-18px)",
                  transition: "opacity 500ms, transform 500ms",
                  transitionDelay: `${delay}ms`,
                  whiteSpace: "pre",
                }}
              >
                {char === " " ? " " : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

// Premium photo with a gradient fallback if the link ever fails.
function SmartImg({ src, alt, style, className, radius = 14 }) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        background: "linear-gradient(135deg, #eef2f9 0%, #e6eaf1 100%)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

// The bigO "O" mark - a clean ring.
function LogoMark({ color = "#2e6fb7", size = 20 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2.5px solid ${color}`,
        boxSizing: "border-box",
        transition: "border-color 0.3s ease",
      }}
    />
  );
}

const SERVICES = [
  {
    num: "01",
    title: "Website Design & Build",
    tag: "Most popular",
    desc: "We build your website from scratch - clean, fast, mobile-friendly, and made to get you customers. No confusing tech talk. No templates. Just a professional website that represents your business properly.",
    items: [
      "Custom design that matches your brand",
      "Works perfectly on phones and all devices",
      "Contact forms, WhatsApp, click-to-call",
      "Google can find you (SEO built in)",
      "Fast, secure, and easy to update",
    ],
    who: "Any business that needs a professional online presence",
    footer: "Business sites · Online stores · Portfolios · Landing pages",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=70",
  },
  {
    num: "02",
    title: "AI & Smart Automation",
    tag: "Save time",
    desc: "Let technology do the boring work. AI chatbots that answer customers 24/7, workflows that run automatically, tools that connect everything together. Save hours every week.",
    items: [
      "AI chatbots for your website and WhatsApp",
      "Automatic lead follow-up and nurturing",
      "Connect all your tools automatically",
      "Email and SMS on autopilot",
      "Custom automation for your business",
    ],
    who: "Businesses tired of doing the same tasks over and over",
    footer: null,
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=70",
  },
  {
    num: "03",
    title: "Digital Marketing",
    tag: "Get customers",
    desc: "We get people to find you, remember you, and buy from you. SEO, social media, paid ads, email marketing, content creation - all working together to bring you customers.",
    items: [
      "Get found on Google (SEO)",
      "Social media that doesn't suck",
      "Paid ads that make money (Meta, Google)",
      "Email marketing that people open",
      "Strategy, not just random posting",
    ],
    who: "Businesses that need customers and visibility",
    footer: null,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=700&q=70",
  },
  {
    num: "04",
    title: "Website Care",
    tag: "Monthly",
    desc: "Your site stays online, secure, fast, and updated - forever. We handle security, backups, updates, and small changes on a simple monthly plan. You never think about it.",
    items: [
      "Security monitoring (don't get hacked)",
      "Daily backups (just in case)",
      "24/7 uptime monitoring",
      "Small changes and edits",
      "Keep it fast",
    ],
    who: "Anyone who owns a website",
    footer: null,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=70",
  },
  {
    num: "05",
    title: "Branding & Design",
    tag: "Look professional",
    desc: "Logo, colors, marketing materials, social media templates - everything visual your business needs to look professional everywhere and build trust faster.",
    items: [
      "Logo and complete brand identity",
      "All your marketing materials",
      "Packaging and print design",
      "Website and app design (UI/UX)",
      "Social media branding",
    ],
    who: "Businesses that want to look like real businesses",
    footer: null,
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=700&q=70",
  },
  {
    num: "06",
    title: "Consulting & Strategy",
    tag: "Expert guidance",
    desc: "Get smart advice to avoid expensive mistakes. Should you use Shopify or custom? Which marketing channels? What tech? We audit, answer questions, and give you a clear plan.",
    items: [
      "Digital strategy and roadmap",
      "Technology advice (no sales pressure)",
      "Marketing strategy and planning",
      "SEO audits with action steps",
      "Training for your team",
    ],
    who: "Businesses planning big investments",
    footer: null,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=70",
  },
  {
    num: "07",
    title: "Web Apps & Custom Software",
    tag: "Advanced",
    desc: "When a website isn't enough. Booking systems, internal CRMs, customer portals, SaaS products - real software with logins, databases, and dashboards. You own everything at the end.",
    items: [
      "We build the whole thing (front and back)",
      "User accounts and permissions",
      "Database and integrations",
      "Works like a real app (PWA)",
      "You own everything - complete handover",
    ],
    who: "Businesses needing custom software",
    footer: null,
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=700&q=70",
  },
];

const TRUST = [
  { value: "100%", label: "Mobile-first builds" },
  { value: "<1s", label: "Target load time" },
  { value: "Yours", label: "Source-code ownership" },
  { value: "24/7", label: "Uptime monitoring" },
];

const PROCESS = [
  {
    n: "01",
    title: "Discovery",
    body: "We start with a quick chat to understand your business, your goals, and what you actually need - no jargon, no pressure.",
  },
  {
    n: "02",
    title: "Design",
    body: "We map out the pages and design a clean, on-brand look. You review and approve before a single line of code is written.",
  },
  {
    n: "03",
    title: "Build",
    body: "We build it fast and properly - mobile-first, secure, SEO-ready - and walk you through it before it goes live.",
  },
  {
    n: "04",
    title: "Care",
    body: "After launch we keep it healthy: security, backups, updates, and improvements on a simple monthly plan.",
  },
];

const GUARANTEES = [
  {
    title: "A clear process",
    body: "You always know what's happening and what's next. No black boxes, no vanishing acts.",
  },
  {
    title: "Direct access",
    body: "You talk to the people actually building your site - not an account manager reading a script.",
  },
  {
    title: "You own everything",
    body: "Your site, your domain, your source code, your data. It's all yours to keep, always.",
  },
];

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "It depends on scope, but we'll always give you a clear, tailored quote up front - no surprises. Most projects start with a short chat so we can price it properly for what you actually need.",
  },
  {
    q: "How long does it take?",
    a: "A focused website is usually a couple of weeks from approval; larger web apps take longer. We'll give you a realistic timeline before we start, and we stick to it.",
  },
  {
    q: "Do I own the website and everything in it?",
    a: "Yes - 100%. Your domain, hosting, source code, and data all belong to you. We hand everything over cleanly. Nothing is held hostage.",
  },
  {
    q: "You're a small team - is that a risk?",
    a: "It's the opposite. You get the actual people building your site, faster replies, and a clear process - no telephone game through layers of staff.",
  },
  {
    q: "What happens after the site is live?",
    a: "That's where our care plans come in: security, backups, uptime monitoring, edits, and improvements - so your site stays healthy without you thinking about it.",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle scroll-reveal for every section below the hero. Fail-safe: if JS
  // never runs, CSS leaves sections fully visible (see html.js-reveal rule).
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll("section:not(#top)");
    if (!els.length) return;
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const biz = (fd.get("business") || "").toString().trim();
    const project = (fd.get("project") || "").toString().trim();
    const msg =
      `Hi bigO` +
      (name ? `\nI'm ${name}.` : "") +
      (biz ? `\nBusiness: ${biz}` : "") +
      (email ? `\nEmail: ${email}` : "") +
      (project ? `\n\n${project}` : "\n\nI'd like to discuss a project.");
    window.open(waLink(msg), "_blank");
  };

  return (
    <div
      style={{
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: "#fafafa",
        color: "#1c2430",
        lineHeight: "1.6",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(255,255,255,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(228,231,236,0.7)"
            : "1px solid transparent",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "20px",
              fontWeight: "800",
              color: scrolled ? "#1c2430" : "#ffffff",
              letterSpacing: "-0.5px",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            <LogoMark color={scrolled ? "#2e6fb7" : "#ffffff"} />
            bigO
          </a>

          {/* Desktop links */}
          <div
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: "36px" }}
          >
            {[
              { to: "/services", label: "Services" },
              { to: "/work", label: "Work" },
              { to: "/about", label: "About" },
              { href: "#how-it-works", label: "How it works" },
            ].map((l) => {
              const st = {
                fontSize: "14px",
                fontWeight: "500",
                color: scrolled ? "#6b7280" : "rgba(255,255,255,0.85)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              };
              return l.to ? (
                <Link key={l.to} to={l.to} style={st}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} style={st}>
                  {l.label}
                </a>
              );
            })}
            <a
              href="#contact"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: scrolled ? "#ffffff" : "#1c2430",
                backgroundColor: scrolled ? "#2e6fb7" : "#ffffff",
                padding: "9px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "-0.1px",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              Start a chat
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor:
                    scrolled || menuOpen ? "#1c2430" : "#ffffff",
                  borderRadius: "2px",
                  transition:
                    "transform 0.2s, background-color 0.3s, opacity 0.2s",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : menuOpen && i === 2
                        ? "rotate(-45deg) translate(5px, -5px)"
                        : "none",
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid #e4e7ec",
              padding: "24px 40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {[
              { to: "/services", label: "Services" },
              { to: "/work", label: "Work" },
              { to: "/about", label: "About" },
              { href: "#how-it-works", label: "How it works" },
            ].map((l) => {
              const st = {
                fontSize: "16px",
                fontWeight: "600",
                color: "#1c2430",
                textDecoration: "none",
              };
              return l.to ? (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  style={st}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={st}
                >
                  {l.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#ffffff",
                backgroundColor: "#2e6fb7",
                padding: "13px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Start a chat
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero (full-screen video) ── */}
      <section
        id="top"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Content pinned to bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px 64px",
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "flex-end",
              gap: "24px",
            }}
          >
            {/* Left */}
            <div>
              <AnimatedHeading
                text={"Your business,\nbuilt for the internet."}
                style={{
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: "600",
                  lineHeight: "1.05",
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  margin: "0 0 20px",
                  textShadow: "0 2px 30px rgba(0,0,0,0.35)",
                }}
              />
              <FadeIn delay={800} duration={1000}>
                <p
                  style={{
                    fontSize: "clamp(16px, 2vw, 20px)",
                    color: "rgba(255,255,255,0.88)",
                    maxWidth: "520px",
                    lineHeight: "1.6",
                    margin: "0 0 26px",
                    textShadow: "0 1px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  Websites, AI automation, marketing, branding, and custom software. Everything your business needs online - handled by one small, focused team.
                </p>
              </FadeIn>
              <FadeIn delay={1200} duration={1000}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                  <a
                    href="#contact"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      fontSize: "15px",
                      fontWeight: "600",
                      padding: "13px 28px",
                      borderRadius: "10px",
                      textDecoration: "none",
                    }}
                  >
                    Start a chat
                  </a>
                  <Link
                    to="/work"
                    className="liquid-glass"
                    style={{
                      color: "#ffffff",
                      fontSize: "15px",
                      fontWeight: "600",
                      padding: "13px 28px",
                      borderRadius: "10px",
                      textDecoration: "none",
                    }}
                  >
                    Explore our work
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right tag */}
            <FadeIn
              delay={1400}
              duration={1000}
              style={{ alignSelf: "flex-end" }}
            >
              <div
                className="liquid-glass hero-tag"
                style={{
                  padding: "14px 24px",
                  borderRadius: "14px",
                  color: "#ffffff",
                  fontSize: "clamp(15px, 1.6vw, 22px)",
                  fontWeight: "300",
                  whiteSpace: "nowrap",
                }}
              >
                We handle everything digital.
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section
        style={{
          backgroundColor: "#fafafa",
          borderBottom: "1px solid #e4e7ec",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
          className="trust-grid"
        >
          {TRUST.map((t, i) => (
            <div
              key={t.label}
              style={{
                padding: "36px 0",
                borderRight:
                  i < TRUST.length - 1 ? "1px solid #e4e7ec" : "none",
                paddingRight: i < TRUST.length - 1 ? "40px" : "0",
                paddingLeft: i > 0 ? "40px" : "0",
              }}
              className="trust-col"
            >
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#1c2430",
                  letterSpacing: "-1px",
                  lineHeight: "1",
                  marginBottom: "6px",
                }}
              >
                {t.value}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  fontWeight: "500",
                }}
              >
                {t.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ padding: "112px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            What we do
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              color: "#1c2430",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}
          >
            Everything your business needs online.
            <br />
            One team handles it all.
          </h2>

          <Link
            to="/services"
            style={{
              display: "inline-block",
              fontSize: "15px",
              fontWeight: 600,
              color: "#2e6fb7",
              textDecoration: "none",
              marginBottom: "64px",
            }}
          >
            View all services in detail →
          </Link>

          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              style={{
                borderTop: "1px solid #e4e7ec",
                padding: "60px 0",
                display: "grid",
                gridTemplateColumns: "180px 1fr 300px",
                gap: "56px",
                alignItems: "start",
                ...(i === SERVICES.length - 1
                  ? { borderBottom: "1px solid #e4e7ec" }
                  : {}),
              }}
              className="service-row"
            >
              {/* Left col */}
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginBottom: "10px",
                  }}
                >
                  {s.num}
                </p>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1c2430",
                    letterSpacing: "-0.3px",
                    lineHeight: "1.35",
                    marginBottom: s.tag ? "12px" : "0",
                  }}
                >
                  {s.title}
                </h3>
                {s.tag && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#2e6fb7",
                      backgroundColor: "#eff6ff",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {s.tag}
                  </span>
                )}
              </div>

              {/* Right col */}
              <div>
                <p
                  style={{
                    fontSize: "17px",
                    color: "#4b5563",
                    lineHeight: "1.75",
                    marginBottom: "32px",
                    maxWidth: "600px",
                  }}
                >
                  {s.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "11px",
                    marginBottom: "28px",
                  }}
                >
                  {s.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "15px",
                        color: "#6b7280",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: "#2e6fb7",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    paddingTop: "24px",
                    borderTop: "1px solid #f3f4f6",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                    }}
                  >
                    Who it's for
                  </p>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>-</p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4b5563",
                      fontWeight: "500",
                    }}
                  >
                    {s.who}
                  </p>
                </div>

                {s.footer && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                      fontWeight: "500",
                      marginTop: "12px",
                    }}
                  >
                    {s.footer}
                  </p>
                )}
              </div>

              {/* Image col */}
              {s.img && (
                <SmartImg
                  src={s.img}
                  alt={s.title}
                  className="service-img"
                  style={{ height: "240px" }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected work ── */}
      <section
        id="work"
        style={{
          backgroundColor: "#fafafa",
          borderTop: "1px solid #e4e7ec",
          padding: "112px 40px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            Selected work
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              color: "#1c2430",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}
          >
            A few things we've built.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              lineHeight: "1.7",
              maxWidth: "520px",
              marginBottom: "64px",
            }}
          >
            A snapshot of the kind of work we do. Full walkthroughs available on
            request.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="work-grid"
          >
            {CASE_STUDIES.map((p) => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="work-card"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4e7ec",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  textDecoration: "none",
                }}
              >
                {/* Thumbnail - photo over gradient (gradient shows if img fails) */}
                <div
                  style={{
                    position: "relative",
                    height: "180px",
                    background:
                      "linear-gradient(135deg, #eff6ff 0%, #f3f4f6 100%)",
                    borderBottom: "1px solid #e4e7ec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      fontSize: "64px",
                      fontWeight: "800",
                      color: "#2e6fb7",
                      opacity: 0.18,
                      letterSpacing: "-2px",
                    }}
                  >
                    {p.title.charAt(0)}
                  </span>
                  {p.img && (
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <div style={{ padding: "26px 24px 28px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#2e6fb7",
                      backgroundColor: "#eff6ff",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      letterSpacing: "0.3px",
                      marginBottom: "16px",
                    }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1c2430",
                      letterSpacing: "-0.3px",
                      marginBottom: "10px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: "1.7",
                      marginBottom: "18px",
                    }}
                  >
                    {p.tagline}
                  </p>
                  <p
                    className="work-cta"
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#2e6fb7",
                      letterSpacing: "-0.1px",
                    }}
                  >
                    View case study →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "44px" }}>
            <Link
              to="/work"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#2e6fb7",
                textDecoration: "none",
              }}
            >
              View all work →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Showcase band (full-bleed) ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "150px 40px",
          backgroundColor: "#0f1720",
        }}
      >
        <SmartImg
          src={IMAGES.showcase}
          alt=""
          radius={0}
          style={{ position: "absolute", inset: 0 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,32,0.74) 0%, rgba(15,23,32,0.86) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "860px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#7cb2ec",
              marginBottom: "24px",
            }}
          >
            The bigO difference
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              lineHeight: "1.12",
              color: "#ffffff",
              marginBottom: "28px",
            }}
          >
            We sweat the details so your
            <br />
            business doesn't have to.
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: "1.7",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Fast, secure, beautifully built, and looked after long-term. Every
            pixel and every line of code is there for a reason - to make your
            business look world-class online.
          </p>
          <a
            href={waLink("Hi bigO I'd like to discuss a project.")}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#0f1720",
              fontSize: "15px",
              fontWeight: "600",
              padding: "14px 30px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Start a chat
          </a>
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        id="how-it-works"
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e4e7ec",
          borderBottom: "1px solid #e4e7ec",
          padding: "112px 40px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            How we work
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              color: "#1c2430",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}
          >
            From first chat to launch - and beyond.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              lineHeight: "1.7",
              maxWidth: "520px",
              marginBottom: "80px",
            }}
          >
            A simple, clear process so you always know what's happening - and
            never wonder what you're paying for.
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
            className="flow-grid"
          >
            {PROCESS.map((step, i) => (
              <div
                key={step.n}
                style={{
                  padding: "0 40px 0 0",
                  borderRight: i < 3 ? "1px solid #e4e7ec" : "none",
                  marginRight: i < 3 ? "40px" : "0",
                }}
                className="flow-col"
              >
                <p
                  style={{
                    fontSize: "40px",
                    fontWeight: "800",
                    color: "#2e6fb7",
                    lineHeight: "1",
                    marginBottom: "20px",
                    letterSpacing: "-2px",
                    opacity: 0.35,
                  }}
                >
                  {step.n}
                </p>
                <h4
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "#1c2430",
                    marginBottom: "12px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#6b7280",
                    lineHeight: "1.7",
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "112px 40px" }}>
        <div
          className="about-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "72px",
            alignItems: "center",
          }}
        >
          <SmartImg
            src={IMAGES.about}
            alt="The bigO studio"
            className="about-img"
            style={{ height: "460px" }}
          />
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#2e6fb7",
                marginBottom: "16px",
              }}
            >
              Who we are
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: "800",
                letterSpacing: "-1.2px",
                color: "#1c2430",
                marginBottom: "24px",
                lineHeight: "1.15",
              }}
            >
              A small team that
              <br />
              actually cares.
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              bigO is a small, focused digital studio. We design, build, and
              look after websites and web apps for businesses that want it done
              properly - no bloated teams, no account-manager telephone game.
              Just the people building your project, talking to you directly.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                borderTop: "1px solid #e4e7ec",
                paddingTop: "32px",
              }}
            >
              {[
                { v: "Founders", l: "hands-on with every build" },
                { v: "Direct", l: "access, no middlemen" },
                { v: "Yours", l: "you own everything" },
              ].map((item) => (
                <div key={item.v}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                      color: "#1c2430",
                      letterSpacing: "-0.5px",
                      marginBottom: "4px",
                    }}
                  >
                    {item.v}
                  </p>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        id="team"
        style={{
          padding: "112px 40px",
          borderTop: "1px solid #e4e7ec",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            The people
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              color: "#1c2430",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}
          >
            The people behind bigO.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              lineHeight: "1.7",
              maxWidth: "520px",
              marginBottom: "64px",
            }}
          >
            Small team, founders hands-on with every project - so you always know exactly
            who you're talking to.
          </p>

          <div
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {TEAM.map((m, idx) => {
              const initials = m.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "104px",
                      height: "104px",
                      borderRadius: "50%",
                      margin: "0 auto 20px",
                      overflow: "hidden",
                      background:
                        "linear-gradient(135deg, #eff6ff 0%, #e6eaf1 100%)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: "800",
                        color: "#2e6fb7",
                        letterSpacing: "-1px",
                      }}
                    >
                      {initials}
                    </span>
                    {m.img && (
                      <img
                        src={m.img}
                        alt={m.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#1c2430",
                      marginBottom: "3px",
                    }}
                  >
                    {m.name}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#2e6fb7",
                      marginBottom: "10px",
                    }}
                  >
                    {m.role}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: "1.6",
                      maxWidth: "260px",
                      margin: "0 auto",
                    }}
                  >
                    {m.bio}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e4e7ec",
          borderBottom: "1px solid #e4e7ec",
          padding: "112px 40px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            What you're guaranteed
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              color: "#1c2430",
              marginBottom: "64px",
              lineHeight: "1.1",
            }}
          >
            Every project, every time.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="guarantee-grid"
          >
            {GUARANTEES.map((g) => (
              <div
                key={g.title}
                style={{
                  padding: "32px 28px",
                  border: "1px solid #e4e7ec",
                  borderRadius: "12px",
                  backgroundColor: "#fafafa",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#eff6ff",
                    color: "#2e6fb7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "20px",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1c2430",
                    letterSpacing: "-0.3px",
                    marginBottom: "10px",
                  }}
                >
                  {g.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#6b7280",
                    lineHeight: "1.7",
                  }}
                >
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "112px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            What clients say
          </p>

          {TESTIMONIALS.length > 0 ? (
            <>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 44px)",
                  fontWeight: "800",
                  letterSpacing: "-1.2px",
                  color: "#1c2430",
                  marginBottom: "56px",
                  lineHeight: "1.1",
                }}
              >
                Kind words.
              </h2>
              <div
                className="testimonial-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(
                    TESTIMONIALS.length,
                    3,
                  )}, 1fr)`,
                  gap: "24px",
                }}
              >
                {TESTIMONIALS.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e4e7ec",
                      borderRadius: "14px",
                      padding: "32px 30px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "17px",
                        color: "#1c2430",
                        lineHeight: "1.7",
                        marginBottom: "22px",
                      }}
                    >
                      “{t.quote}”
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#1c2430",
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontSize: "13px", color: "#6b7280" }}>
                      {t.business}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ maxWidth: "700px" }}>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: "800",
                  letterSpacing: "-1.2px",
                  color: "#1c2430",
                  marginBottom: "22px",
                  lineHeight: "1.15",
                }}
              >
                Be one of our first success stories.
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "#6b7280",
                  lineHeight: "1.75",
                  marginBottom: "36px",
                }}
              >
                We're a new studio taking on our first clients - which means you
                get direct attention from founders, fair pricing, and a team that treats your
                project like our reputation depends on it. Because it does.
              </p>
              <a
                href={waLink("Hi bigO I'd like to discuss a project.")}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#2e6fb7",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "600",
                  padding: "14px 30px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                Start a chat
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "112px 40px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "16px",
            }}
          >
            FAQ
          </p>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-1.2px",
              color: "#1c2430",
              marginBottom: "48px",
              lineHeight: "1.1",
            }}
          >
            Questions, answered.
          </h2>

          <div>
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  style={{ borderTop: "1px solid #e4e7ec" }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "20px",
                      padding: "24px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "600",
                        color: "#1c2430",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "400",
                        color: "#2e6fb7",
                        lineHeight: "1",
                        flexShrink: 0,
                        transform: open ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {open && (
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#6b7280",
                        lineHeight: "1.75",
                        padding: "0 0 26px",
                        maxWidth: "620px",
                      }}
                    >
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ padding: "112px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e4e7ec",
              borderRadius: "12px",
              padding: "80px 72px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Left */}
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#2e6fb7",
                  marginBottom: "16px",
                }}
              >
                Get started
              </p>
              <h2
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: "800",
                  letterSpacing: "-1px",
                  color: "#1c2430",
                  lineHeight: "1.15",
                  marginBottom: "20px",
                }}
              >
                Ready to build something?
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  lineHeight: "1.75",
                  marginBottom: "40px",
                }}
              >
                Tell us about your business. We will figure out exactly what you
                need and the best way to get it done.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "No jargon, no pressure",
                  "Response within one business day",
                  "Free initial consultation",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "15px",
                      color: "#4b5563",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#2e6fb7",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              {/* Direct contact details */}
              <div
                style={{
                  marginTop: "40px",
                  paddingTop: "32px",
                  borderTop: "1px solid #e4e7ec",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <a
                  href={waLink("Hi bigO I'd like to discuss a project.")}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#1c2430",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: "#25D366", fontSize: "17px" }}>✆</span>
                  WhatsApp us
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{
                    fontSize: "15px",
                    color: "#4b5563",
                    textDecoration: "none",
                  }}
                >
                  {CONTACT.email}
                </a>
                <p style={{ fontSize: "15px", color: "#9ca3af" }}>
                  {CONTACT.city}
                </p>
              </div>
            </div>

            {/* Right - form */}
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {[
                { type: "text", name: "name", placeholder: "Your name" },
                { type: "email", name: "email", placeholder: "Email address" },
                { type: "text", name: "business", placeholder: "Business or website (optional)" },
              ].map((f) => (
                <input
                  key={f.placeholder}
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    fontSize: "15px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    backgroundColor: "#fafafa",
                    color: "#1c2430",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    lineHeight: "1.5",
                  }}
                />
              ))}
              <textarea
                name="project"
                placeholder="Tell us about your project"
                rows={4}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  fontSize: "15px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  outline: "none",
                  backgroundColor: "#fafafa",
                  color: "#1c2430",
                  boxSizing: "border-box",
                  resize: "vertical",
                  fontFamily: "inherit",
                  lineHeight: "1.6",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#2e6fb7",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "600",
                  padding: "14px 24px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: "-0.1px",
                  marginTop: "4px",
                }}
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />

      {/* ── Floating WhatsApp ── */}
      <a
        href={waLink("Hi bigO I'd like to discuss a project.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with bigO on WhatsApp"
        className="wa-float"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 60,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
          textDecoration: "none",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.28-.1-.48-.15-.68.15s-.78 1-.96 1.2c-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.25-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z m0 18.2c-1.6 0-3.09-.44-4.37-1.2l-.31-.18-3.12.82.83-3.04-.2-.32A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
        </svg>
      </a>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        a:hover { opacity: 0.85; }

        section[id] { scroll-margin-top: 80px; }

        html.js-reveal section:not(#top) {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        html.js-reveal section:not(#top).is-visible {
          opacity: 1;
          transform: none;
        }

        .work-card:hover {
          box-shadow: 0 12px 32px rgba(20, 30, 50, 0.10);
          transform: translateY(-3px);
        }
        .wa-float:hover {
          transform: scale(1.06);
          opacity: 1 !important;
        }

        input::placeholder,
        textarea::placeholder { color: #9ca3af; }

        input:focus,
        textarea:focus { border-color: #2e6fb7 !important; outline: none; }

        button[type="submit"]:hover { opacity: 0.9; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }

          .trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .trust-col {
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-bottom: 1px solid #e4e7ec;
          }
          .trust-col:nth-child(odd) { border-right: 1px solid #e4e7ec !important; padding-right: 24px !important; }
          .trust-col:nth-child(even) { padding-left: 24px !important; }
          .trust-col:nth-last-child(-n+2) { border-bottom: none; }

          .service-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .flow-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .flow-col {
            border-right: none !important;
            margin-right: 0 !important;
            padding-right: 0 !important;
            border-bottom: 1px solid #e4e7ec;
            padding-bottom: 40px !important;
            margin-bottom: 40px;
          }
          .flow-col:last-child {
            border-bottom: none;
            padding-bottom: 0 !important;
            margin-bottom: 0;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 28px !important;
            gap: 40px !important;
          }
          .work-grid {
            grid-template-columns: 1fr !important;
          }
          .guarantee-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            align-items: flex-start !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .about-img {
            height: 300px !important;
          }
          .service-img {
            height: 200px !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
