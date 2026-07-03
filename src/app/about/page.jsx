import React from "react";
import { Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { TEAM } from "../team";
import { waLink, SITE } from "../site";

export function meta() {
  const title = "About - bigO";
  const description =
    "bigO is a small, focused digital studio run by three co-founders. Learn who we are, why we exist, and how we work.";
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
const FALLBACK_BG = "linear-gradient(135deg, #eef2f9 0%, #e6eaf1 100%)";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=74";

const VALUES = [
  {
    title: "Do it properly",
    body: "No templates, no shortcuts. If our name is on it, it's built to a standard we're proud of.",
  },
  {
    title: "Talk straight",
    body: "Plain language, honest timelines, no jargon and no over-promising. You always know where things stand.",
  },
  {
    title: "You own everything",
    body: "Your site, your code, your accounts. When we're done, it's all yours - no lock-in, ever.",
  },
  {
    title: "Built to last",
    body: "We design and maintain for the long run, so your site keeps working as your business grows.",
  },
];

const STEPS = [
  { n: "01", t: "Discovery", d: "We learn your business and goals." },
  { n: "02", t: "Design", d: "We shape the look and structure together." },
  { n: "03", t: "Build", d: "We build it clean, fast, and secure." },
  { n: "04", t: "Care", d: "We keep it healthy long after launch." },
];

const TRUST = [
  {
    title: "A small, focused team",
    body: "You work directly with the people building your project - no intermediaries, no handoffs.",
  },
  {
    title: "Direct access",
    body: "Message us and reach a founder. No ticket queues, no account-manager telephone game.",
  },
  {
    title: "A clear process",
    body: "You always know what's happening, what's next, and what it costs. No surprises.",
  },
];

const eyebrow = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: "16px",
};

export default function AboutPage() {
  return (
    <div style={{ fontFamily: FONT, backgroundColor: "#fafafa", color: "#1c2430" }}>
      <SiteHeader />

      {/* Hero */}
      <section style={{ padding: "88px 40px 56px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={eyebrow}>About</p>
          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 62px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.08,
              maxWidth: "820px",
              marginBottom: "22px",
            }}
          >
            A studio built to do it properly.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "620px",
            }}
          >
            bigO is a small, focused digital studio. We build, run, and grow
            businesses online - and we treat every project like our reputation
            depends on it. Because it does.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section
        style={{
          padding: "80px 40px",
          borderTop: "1px solid #e4e7ec",
        }}
      >
        <div
          className="about-story"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div>
            <p style={eyebrow}>Our story</p>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              Why we started bigO.
            </h2>
            <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.8, marginBottom: "18px" }}>
              We kept seeing the same thing: great local businesses stuck with no
              website, a broken one, or an overpriced agency that treated them like
              a number. On the other side were cheap template shops that vanished
              the moment something broke.
            </p>
            <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.8, marginBottom: "18px" }}>
              We started bigO to sit in the gap - the quality and care of a proper
              studio, with the speed, honesty, and direct access of a small team.
              No bloat, no jargon, no disappearing after launch.
            </p>
            <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.8 }}>
              Today we design, build, and maintain websites and web apps for
              businesses that want it done right - and want a partner who sticks
              around.
            </p>
          </div>
          <div
            className="about-img"
            style={{
              position: "relative",
              height: "440px",
              borderRadius: 16,
              overflow: "hidden",
              background: FALLBACK_BG,
              boxShadow: "0 20px 50px rgba(20,30,50,0.10)",
            }}
          >
            <img
              src={ABOUT_IMG}
              alt="The bigO studio"
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
        </div>
      </section>

      {/* Values */}
      <section
        style={{
          padding: "100px 40px",
          borderTop: "1px solid #e4e7ec",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={eyebrow}>What we believe</p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              marginBottom: "56px",
            }}
          >
            The way we work.
          </h2>
          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {VALUES.map((v, i) => (
              <div key={v.title}>
                <p
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#e4e7ec",
                    letterSpacing: "-1px",
                    marginBottom: "16px",
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1c2430",
                    marginBottom: "10px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section style={{ padding: "100px 40px", borderTop: "1px solid #e4e7ec" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={eyebrow}>The founders</p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              marginBottom: "20px",
            }}
          >
            Meet the team.
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginBottom: "72px",
            }}
          >
            A small team that works directly with you. No account managers, no
            ticket systems - just the people building your project.
          </p>

          {/* Founders - Vertical Layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {TEAM.map((m, idx) => {
              const initials = m.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: "48px",
                    alignItems: "start",
                  }}
                >
                  {/* Photo */}
                  <div>
                    <div
                      style={{
                        position: "relative",
                        width: "180px",
                        height: "180px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: FALLBACK_BG,
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid #e4e7ec",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "42px",
                          fontWeight: 800,
                          color: ACCENT,
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
                  </div>

                  {/* Info */}
                  <div>
                    <h3
                      style={{
                        fontSize: "28px",
                        fontWeight: 800,
                        marginBottom: "6px",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {m.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: ACCENT,
                        marginBottom: "20px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {m.role}
                    </p>

                    {/* Full Bio */}
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#4b5563",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      {m.fullBio}
                    </p>

                    {/* Skills - Bullet Points */}
                    {m.skills && (
                      <div style={{ marginBottom: "20px" }}>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.8px",
                            color: "#6b7280",
                            marginBottom: "12px",
                          }}
                        >
                          Expertise
                        </p>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {m.skills.map((skill, i) => (
                            <li
                              key={i}
                              style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: ACCENT,
                                  fontWeight: "bold",
                                }}
                              >
                                •
                              </span>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Approach */}
                    {m.approach && (
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#1c2430",
                          fontStyle: "italic",
                          padding: "16px 20px",
                          backgroundColor: "#f9fafb",
                          borderLeft: `3px solid ${ACCENT}`,
                          borderRadius: "4px",
                        }}
                      >
                        "{m.approach}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section
        style={{
          padding: "100px 40px",
          borderTop: "1px solid #e4e7ec",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={eyebrow}>How we work</p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              marginBottom: "56px",
            }}
          >
            From first chat to long-term care.
          </h2>
          <div
            className="steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {STEPS.map((s) => (
              <div key={s.n}>
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: 800,
                    color: "#e4e7ec",
                    letterSpacing: "-1.5px",
                    marginBottom: "14px",
                  }}
                >
                  {s.n}
                </p>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                  {s.t}
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section style={{ padding: "100px 40px", borderTop: "1px solid #e4e7ec" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={eyebrow}>Why clients trust us</p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              marginBottom: "56px",
            }}
          >
            What working with bigO feels like.
          </h2>
          <div
            className="trust-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {TRUST.map((t) => (
              <div
                key={t.title}
                style={{
                  border: "1px solid #e4e7ec",
                  borderRadius: 14,
                  padding: "30px 28px",
                  backgroundColor: "#ffffff",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7 }}>
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            Tell us about your business - we'll show you exactly how we'd help.
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
        a:hover { opacity: 0.9; }
        @media (max-width: 900px) {
          .values-grid, .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
          .founders-grid, .trust-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .about-story { grid-template-columns: 1fr !important; gap: 36px !important; }
          .about-img { height: 300px !important; }
        }
        @media (max-width: 560px) {
          .values-grid, .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
