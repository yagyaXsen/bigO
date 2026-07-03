import React from "react";
import { Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { CASE_STUDIES } from "../caseStudies";
import { waLink, SITE } from "../site";

export function meta() {
  const title = "Work - bigO";
  const description =
    "Selected work from bigO - websites, web apps, and B2B projects we've designed and built.";
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
const ACCENT = "#2e6fb7";

export default function WorkPage() {
  return (
    <div style={{ fontFamily: FONT, backgroundColor: "#fafafa", color: "#1c2430" }}>
      <SiteHeader />

      {/* Hero */}
      <section style={{ padding: "88px 40px 56px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "16px",
            }}
          >
            Selected work
          </p>
          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 60px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.08,
              maxWidth: "760px",
              marginBottom: "22px",
            }}
          >
            Work we're proud to put our name on.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            A look at the kind of websites and web apps we design and build. Click
            any project to see the full story.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "0 40px 40px" }}>
        <div
          className="work-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
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
                textDecoration: "none",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "190px",
                  background: "linear-gradient(135deg, #eff6ff 0%, #f3f4f6 100%)",
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
                    fontWeight: 800,
                    color: ACCENT,
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
                    fontWeight: 600,
                    color: ACCENT,
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
                    fontWeight: 700,
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
                    lineHeight: 1.7,
                    marginBottom: "18px",
                  }}
                >
                  {p.tagline}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: ACCENT,
                    letterSpacing: "-0.1px",
                  }}
                >
                  View case study →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 40px 110px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            backgroundColor: "#0f1720",
            borderRadius: "16px",
            padding: "72px 48px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              color: "#ffffff",
              marginBottom: "18px",
            }}
          >
            Your project could be next.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 32px",
            }}
          >
            Tell us what you're building and we'll show you how we'd approach it.
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

      <SiteFooter />

      <style>{`
        .work-card:hover {
          box-shadow: 0 12px 32px rgba(20, 30, 50, 0.10);
          transform: translateY(-3px);
        }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
