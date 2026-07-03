import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { getCaseStudy } from "../../caseStudies";
import { CONTACT, waLink, SITE } from "../../site";
import SiteFooter from "../../components/SiteFooter";

export function meta({ params }) {
  const study = getCaseStudy(params?.slug);
  const title = study ? `${study.title} - bigO` : "Case study - bigO";
  const description = study ? study.tagline : "A bigO project case study.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: study?.img || SITE.ogImage },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const FALLBACK_BG = "linear-gradient(135deg, #eff6ff 0%, #f3f4f6 100%)";
const ACCENT = "#2e6fb7";
const DARK = "#1c2430";

function onImgError(e) {
  e.currentTarget.style.display = "none";
}

// Browser window frame around screenshot
function BrowserFrame({ src, alt }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e4e7ec",
        boxShadow: "0 20px 50px rgba(20,30,50,0.12)",
        background: "#fff",
      }}
    >
      <div
        style={{
          height: "38px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 16px",
          background: "#f3f4f6",
          borderBottom: "1px solid #e4e7ec",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          background: FALLBACK_BG,
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
    </div>
  );
}

// Phone frame around screenshot
function PhoneFrame({ src, alt }) {
  return (
    <div
      style={{
        width: "240px",
        maxWidth: "100%",
        margin: "0 auto",
        borderRadius: "34px",
        border: "10px solid #1c2430",
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(20,30,50,0.18)",
        background: "#1c2430",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "9 / 19",
          background: FALLBACK_BG,
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
    </div>
  );
}

// Eyebrow label
const eyebrow = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: "16px",
};

// Feature list with blue bullets
function FeatureList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            fontSize: "16px",
            color: "#374151",
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              marginTop: "8px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: ACCENT,
              flexShrink: 0,
            }}
          />
          {item}
        </div>
      ))}
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const [openPhase, setOpenPhase] = useState(0);

  if (!study) {
    return (
      <div style={{ fontFamily: FONT, backgroundColor: "#fafafa", color: DARK }}>
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
                fontSize: "20px",
                fontWeight: 800,
                color: DARK,
                letterSpacing: "-0.5px",
                textDecoration: "none",
              }}
            >
              bigO
            </Link>
          </div>
        </header>
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "160px 40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: "16px",
            }}
          >
            Project not found
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>
            That case study doesn't exist.
          </p>
          <Link
            to="/#work"
            style={{
              backgroundColor: ACCENT,
              color: "#fff",
              fontWeight: 600,
              padding: "13px 26px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            ← Back to work
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: FONT,
        backgroundColor: "#fafafa",
        color: DARK,
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
              fontSize: "20px",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.5px",
              textDecoration: "none",
            }}
          >
            bigO
          </Link>
          <a
            href={waLink("Hi bigO I'd like to discuss a project.")}
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
      </header>

      {/* ── 1. Hero ── */}
      <section style={{ padding: "72px 40px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link
            to="/#work"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#6b7280",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: "36px",
            }}
          >
            ← All work
          </Link>
          <p style={eyebrow}>{study.tag}</p>
          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.08,
              marginBottom: "18px",
              maxWidth: "760px",
            }}
          >
            {study.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 2vw, 20px)",
              color: "#6b7280",
              lineHeight: 1.6,
              maxWidth: "680px",
              marginBottom: study.liveUrl ? "28px" : "0",
            }}
          >
            {study.tagline}
          </p>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: DARK,
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Visit live site ↗
            </a>
          )}
        </div>
      </section>

      {/* ── Main hero image ── */}
      <section style={{ padding: "12px 40px 40px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <BrowserFrame src={study.img} alt={`${study.title} website`} />
        </div>
      </section>

      {/* ── 2. Quick Overview Metrics ── */}
      {study.metrics && (
        <section
          style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e4e7ec",
            borderBottom: "1px solid #e4e7ec",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: `repeat(${study.metrics.length}, 1fr)`,
            }}
            className="cs-metrics"
          >
            {study.metrics.map((m, i) => (
              <div
                key={m.label}
                style={{
                  padding: "44px 0",
                  textAlign: "center",
                  borderRight:
                    i < study.metrics.length - 1 ? "1px solid #e4e7ec" : "none",
                }}
              >
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: 800,
                    color: DARK,
                    letterSpacing: "-1px",
                    marginBottom: "6px",
                  }}
                >
                  {m.value}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. The Challenge ── */}
      <section style={{ padding: "100px 40px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "72px",
            alignItems: "center",
          }}
          className="cs-grid"
        >
          <div>
            <p style={eyebrow}>The challenge</p>
            <p
              style={{
                fontSize: "18px",
                color: "#4b5563",
                lineHeight: 1.75,
              }}
            >
              {study.problem}
            </p>
          </div>
          {study.shots && study.shots[0] && (
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                borderRadius: "12px",
                overflow: "hidden",
                background: FALLBACK_BG,
              }}
            >
              <img
                src={study.shots[0]}
                alt="Restaurant"
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
          )}
        </div>
      </section>

      {/* ── 4. What We Built - 6 Sections ── */}
      {study.whatWeBuilt && (
        <>
          <section
            style={{
              backgroundColor: "#ffffff",
              padding: "80px 40px 40px",
            }}
          >
            <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
              <p style={{ ...eyebrow, marginBottom: "20px" }}>What we built</p>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "-1.2px",
                  color: DARK,
                  marginBottom: "16px",
                }}
              >
                A complete digital solution
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "#6b7280",
                  lineHeight: 1.7,
                  maxWidth: "680px",
                  margin: "0 auto",
                }}
              >
                Six integrated systems working together - website, web app, AI automation, branding, marketing, and ongoing care. Everything the business needs to thrive online.
              </p>
            </div>
          </section>

          {/* 4a. Website */}
          {study.whatWeBuilt.website && (
            <section style={{ backgroundColor: "#ffffff", padding: "60px 40px" }}>
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "72px",
                  alignItems: "center",
                }}
                className="cs-grid"
              >
                <div>
                  <p style={{ ...eyebrow, color: "#9ca3af" }}>The Website</p>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      color: DARK,
                      marginBottom: "12px",
                    }}
                  >
                    {study.whatWeBuilt.website.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {study.whatWeBuilt.website.description}
                  </p>
                  <FeatureList items={study.whatWeBuilt.website.features} />
                </div>
                {study.shots && study.shots[1] && (
                  <BrowserFrame src={study.shots[1]} alt="Website homepage" />
                )}
              </div>
            </section>
          )}

          {/* 4b. Web App */}
          {study.whatWeBuilt.webApp && (
            <section style={{ backgroundColor: "#fafafa", padding: "60px 40px" }}>
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "72px",
                  alignItems: "center",
                }}
                className="cs-grid"
              >
                {study.shots && study.shots[2] && (
                  <PhoneFrame src={study.shots[2]} alt="Web app dashboard" />
                )}
                <div>
                  <p style={{ ...eyebrow, color: "#9ca3af" }}>The Management System</p>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      color: DARK,
                      marginBottom: "12px",
                    }}
                  >
                    {study.whatWeBuilt.webApp.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {study.whatWeBuilt.webApp.description}
                  </p>
                  <FeatureList items={study.whatWeBuilt.webApp.features} />
                </div>
              </div>
            </section>
          )}

          {/* 4c. Automation */}
          {study.whatWeBuilt.automation && (
            <section style={{ backgroundColor: "#ffffff", padding: "60px 40px" }}>
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "72px",
                  alignItems: "center",
                }}
                className="cs-grid"
              >
                <div>
                  <p style={{ ...eyebrow, color: "#9ca3af" }}>Smart Automation</p>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      color: DARK,
                      marginBottom: "12px",
                    }}
                  >
                    {study.whatWeBuilt.automation.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {study.whatWeBuilt.automation.description}
                  </p>
                  <FeatureList items={study.whatWeBuilt.automation.features} />
                </div>
                {study.shots && study.shots[3] && (
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: FALLBACK_BG,
                    }}
                  >
                    <img
                      src={study.shots[3]}
                      alt="Automation"
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
                )}
              </div>
            </section>
          )}

          {/* 4d. Branding */}
          {study.whatWeBuilt.branding && (
            <section style={{ backgroundColor: "#fafafa", padding: "60px 40px" }}>
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "72px",
                  alignItems: "center",
                }}
                className="cs-grid"
              >
                {study.shots && study.shots[4] && (
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: FALLBACK_BG,
                    }}
                  >
                    <img
                      src={study.shots[4]}
                      alt="Branding"
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
                )}
                <div>
                  <p style={{ ...eyebrow, color: "#9ca3af" }}>The Brand Identity</p>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      color: DARK,
                      marginBottom: "12px",
                    }}
                  >
                    {study.whatWeBuilt.branding.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {study.whatWeBuilt.branding.description}
                  </p>
                  <FeatureList items={study.whatWeBuilt.branding.features} />
                </div>
              </div>
            </section>
          )}

          {/* 4e. Marketing */}
          {study.whatWeBuilt.marketing && (
            <section style={{ backgroundColor: "#ffffff", padding: "60px 40px" }}>
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "72px",
                  alignItems: "center",
                }}
                className="cs-grid"
              >
                <div>
                  <p style={{ ...eyebrow, color: "#9ca3af" }}>Growing the Audience</p>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      color: DARK,
                      marginBottom: "12px",
                    }}
                  >
                    {study.whatWeBuilt.marketing.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {study.whatWeBuilt.marketing.description}
                  </p>
                  <FeatureList items={study.whatWeBuilt.marketing.features} />
                </div>
                {study.shots && study.shots[3] && (
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 3",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: FALLBACK_BG,
                    }}
                  >
                    <img
                      src={study.shots[3]}
                      alt="Marketing"
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
                )}
              </div>
            </section>
          )}

          {/* 4f. Care */}
          {study.whatWeBuilt.care && (
            <section style={{ backgroundColor: "#fafafa", padding: "60px 40px 100px" }}>
              <div
                style={{
                  maxWidth: "1100px",
                  margin: "0 auto",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "72px",
                  alignItems: "center",
                }}
                className="cs-grid"
              >
                <div
                  style={{
                    padding: "40px",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e4e7ec",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: DARK,
                      marginBottom: "16px",
                    }}
                  >
                    Uptime & Security
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                      <p style={{ fontSize: "28px", fontWeight: 800, color: ACCENT }}>
                        99.9%
                      </p>
                      <p style={{ fontSize: "14px", color: "#6b7280" }}>
                        Uptime guarantee
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "28px", fontWeight: 800, color: ACCENT }}>
                        24/7
                      </p>
                      <p style={{ fontSize: "14px", color: "#6b7280" }}>
                        Security monitoring
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p style={{ ...eyebrow, color: "#9ca3af" }}>Keeping It Running</p>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      color: DARK,
                      marginBottom: "12px",
                    }}
                  >
                    {study.whatWeBuilt.care.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#6b7280",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {study.whatWeBuilt.care.description}
                  </p>
                  <FeatureList items={study.whatWeBuilt.care.features} />
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── 5. Technical Stack ── */}
      {study.technicalDetails && (
        <section
          style={{
            backgroundColor: DARK,
            padding: "100px 40px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ ...eyebrow, color: "#7cb2ec" }}>Technical details</p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#ffffff",
                marginBottom: "48px",
              }}
            >
              How we built it
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "32px",
              }}
              className="tech-grid"
            >
              {Object.entries(study.technicalDetails).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    padding: "28px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "#7cb2ec",
                      marginBottom: "12px",
                    }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.7,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ── 7. Testimonial ── */}
      {study.results?.testimonial && (
        <section style={{ backgroundColor: "#fafafa", padding: "100px 40px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div
              style={{
                padding: "56px 48px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e4e7ec",
                boxShadow: "0 4px 20px rgba(20,30,50,0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: DARK,
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  fontStyle: "italic",
                }}
              >
                "{study.results.testimonial.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: FALLBACK_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: ACCENT,
                    }}
                  >
                    {study.results.testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: DARK,
                    }}
                  >
                    {study.results.testimonial.name}
                  </p>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    {study.results.testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Project Timeline ── */}
      {study.timeline && (
        <section style={{ backgroundColor: "#ffffff", padding: "100px 40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={eyebrow}>How we did it</p>
            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-1.2px",
                color: DARK,
                marginBottom: "56px",
              }}
            >
              {study.timeline.title}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {study.timeline.phases.map((p, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #e4e7ec",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <button
                    onClick={() => setOpenPhase(openPhase === i ? -1 : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "24px 28px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: FONT,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "#9ca3af",
                          marginBottom: "6px",
                        }}
                      >
                        Phase {i + 1}
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: DARK,
                        }}
                      >
                        {p.phase}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: 400,
                        color: ACCENT,
                        transform: openPhase === i ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openPhase === i && (
                    <div
                      style={{
                        padding: "0 28px 28px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <FeatureList items={p.tasks} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. CTA ── */}
      <section style={{ padding: "72px 40px 100px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            backgroundColor: DARK,
            borderRadius: "16px",
            padding: "72px 56px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              ...eyebrow,
              color: "#7cb2ec",
              marginBottom: "16px",
            }}
          >
            Ready to transform your business?
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Let's build something amazing for you
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "600px",
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Whether you need a complete solution like this or just one service, we're here to help. Tell us what you need and we'll make it happen.
          </p>
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={waLink(
                `Hi bigO I saw the ${study.title} case study - I'd like something similar.`
              )}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#ffffff",
                color: DARK,
                fontWeight: 600,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Start a chat
            </a>
            <Link
              to="/#work"
              style={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "15px",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              See all services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />

      <style>{`
        @media (max-width: 768px) {
          .cs-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .cs-metrics {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .tech-grid {
            grid-template-columns: 1fr !important;
          }
          .results-grid-4 {
            grid-template-columns: 1fr !important;
          }
          .results-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }

        a:hover { opacity: 0.85; }
        button:hover { opacity: 0.95; }
      `}</style>
    </div>
  );
}
