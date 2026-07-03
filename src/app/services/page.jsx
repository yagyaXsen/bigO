import React, { useEffect } from "react";
import { Link } from "react-router";
import { SERVICE_DETAILS, ADDONS } from "../servicesData";
import { CONTACT, waLink, SITE } from "../site";
import SiteFooter from "../components/SiteFooter";

export function meta() {
  const title = "Services - bigO";
  const description =
    "Everything bigO does, explained: website design & build, care & maintenance plans, digital marketing, and custom web apps. See what's included, who it's for, and how it works.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: SITE.ogImage },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

const FONT =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const FALLBACK_BG = "linear-gradient(135deg, #eef2f9 0%, #e6eaf1 100%)";
const ACCENT = "#2e6fb7";

function onImgError(e) {
  e.currentTarget.style.display = "none";
}

function SmartImg({ src, alt, style }) {
  return (
    <div
      className="svc-img"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background: FALLBACK_BG,
        boxShadow: "0 20px 50px rgba(20,30,50,0.10)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={onImgError}
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

function LogoMark({ color = ACCENT, size = 20 }) {
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
      }}
    />
  );
}

const eyebrow = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: "16px",
};

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Services - bigO";
  }, []);

  const chat = waLink("Hi bigO I'd like to discuss a project.");

  return (
    <div
      style={{
        fontFamily: FONT,
        backgroundColor: "#fafafa",
        color: "#1c2430",
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Header ── */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e4e7ec",
          position: "sticky",
          top: 0,
          zIndex: 50,
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
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "20px",
              fontWeight: 800,
              color: "#1c2430",
              letterSpacing: "-0.5px",
              textDecoration: "none",
            }}
          >
            <LogoMark />
            bigO
          </Link>
          <div className="svc-nav" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <Link to="/services" style={navLink}>Services</Link>
            <Link to="/#work" style={navLink}>Work</Link>
            <Link to="/#contact" style={navLink}>Contact</Link>
            <a
              href={chat}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: ACCENT,
                padding: "9px 20px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Start a chat
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: "96px 40px 64px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={eyebrow}>Services</p>
          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 62px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.08,
              maxWidth: "760px",
              marginBottom: "24px",
            }}
          >
            Everything we do, explained.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "620px",
              marginBottom: "36px",
            }}
          >
            From a first website to a full web app - and everything that keeps it
            running. Here's exactly what each service includes, who it's for, and
            how it works.
          </p>

          {/* Jump chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {SERVICE_DETAILS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4b5563",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4e7ec",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  textDecoration: "none",
                }}
              >
                {s.num} · {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service blocks ── */}
      {SERVICE_DETAILS.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          style={{
            padding: "80px 40px",
            borderTop: "1px solid #e4e7ec",
            backgroundColor: i % 2 === 1 ? "#ffffff" : "transparent",
            scrollMarginTop: "80px",
          }}
        >
          <div
            className="svc-block"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "start",
              direction: i % 2 === 1 ? "rtl" : "ltr",
            }}
          >
            {/* Text side (reset direction to ltr) */}
            <div style={{ direction: "ltr" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    color: "#9ca3af",
                  }}
                >
                  {s.num}
                </span>
                {s.tag && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: ACCENT,
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

              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 38px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.12,
                  marginBottom: "10px",
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: ACCENT,
                  marginBottom: "20px",
                }}
              >
                {s.lead}
              </p>
              <p
                style={{
                  fontSize: "17px",
                  color: "#4b5563",
                  lineHeight: 1.75,
                  marginBottom: "34px",
                }}
              >
                {s.overview}
              </p>

              {/* What's included */}
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  marginBottom: "18px",
                }}
              >
                What's included
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  marginBottom: "34px",
                }}
              >
                {s.included.map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: "14px" }}>
                    <span
                      style={{
                        marginTop: "7px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: ACCENT,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#1c2430",
                          marginBottom: "3px",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meta row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  padding: "22px 0",
                  borderTop: "1px solid #e4e7ec",
                  borderBottom: "1px solid #e4e7ec",
                  marginBottom: "28px",
                }}
                className="svc-meta"
              >
                {[
                  { l: "Who it's for", v: s.who },
                  { l: "Timeline", v: s.timeline },
                  { l: "Pricing", v: s.pricing },
                ].map((m) => (
                  <div key={m.l}>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#9ca3af",
                        marginBottom: "6px",
                      }}
                    >
                      {m.l}
                    </p>
                    <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.5 }}>
                      {m.v}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={waLink(`Hi bigO I'd like to ask about ${s.title}.`)}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: ACCENT,
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "13px 26px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                Ask about {s.title} →
              </a>
            </div>

            {/* Image + deliverables side */}
            <div style={{ direction: "ltr" }}>
              <SmartImg src={s.img} alt={s.title} style={{ height: "300px" }} />
              <div
                style={{
                  marginTop: "24px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4e7ec",
                  borderRadius: "14px",
                  padding: "26px 26px 28px",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginBottom: "16px",
                  }}
                >
                  What you get
                </p>
                {s.deliverables.map((d) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "15px",
                      color: "#4b5563",
                      padding: "9px 0",
                    }}
                  >
                    <span style={{ color: ACCENT, fontWeight: 700 }}>✓</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Add-ons ── */}
      <section
        style={{
          padding: "100px 40px",
          borderTop: "1px solid #e4e7ec",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={eyebrow}>Also available</p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              marginBottom: "48px",
            }}
          >
            Add-ons & extras.
          </h2>
          <div
            className="addon-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {ADDONS.map((a) => (
              <div
                key={a.title}
                style={{
                  border: "1px solid #e4e7ec",
                  borderRadius: "12px",
                  padding: "24px",
                  backgroundColor: "#fafafa",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1c2430",
                    marginBottom: "6px",
                  }}
                >
                  {a.title}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Helper band ── */}
      <section style={{ padding: "90px 40px", borderTop: "1px solid #e4e7ec" }}>
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ ...eyebrow, textAlign: "center" }}>Not sure what you need?</p>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            Most clients start with a website, then add a care plan.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#6b7280",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Tell us about your business and we'll recommend the right starting
            point - no pressure, no jargon. You can always add more later.
          </p>
          <a
            href={chat}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: ACCENT,
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 30px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Get a recommendation
          </a>
        </div>
      </section>

      {/* ── Final CTA (dark) ── */}
      <section style={{ padding: "110px 40px", backgroundColor: "#0f1720" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(30px, 4.5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.12,
              color: "#ffffff",
              marginBottom: "24px",
            }}
          >
            Let's build something.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            Message us on WhatsApp and tell us what you're thinking. We'll take it
            from there.
          </p>
          <a
            href={chat}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#0f1720",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 30px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Start a chat
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />

      <style>{`
        a:hover { opacity: 0.88; }
        @media (max-width: 768px) {
          .svc-nav a:not(:last-child) { display: none; }
          .svc-block {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            direction: ltr !important;
          }
          .addon-grid { grid-template-columns: 1fr !important; }
          .svc-meta { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}

const navLink = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#6b7280",
  textDecoration: "none",
};
