import React from "react";
import { Link } from "react-router";
import { CONTACT, SOCIALS, SITE, waLink } from "../site";

const ACCENT = "#2e6fb7";

function LogoMark({ color = "#ffffff", size = 18 }) {
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

const colTitle = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#9ca3af",
  marginBottom: "16px",
};

const linkStyle = {
  fontSize: "14px",
  color: "#cbd5e1",
  textDecoration: "none",
  display: "block",
  marginBottom: "11px",
};

export default function SiteFooter() {
  const chat = waLink("Hi bigO I'd like to discuss a project.");
  const socials = [
    SOCIALS.instagram && { label: "Instagram", href: SOCIALS.instagram },
    SOCIALS.linkedin && { label: "LinkedIn", href: SOCIALS.linkedin },
  ].filter(Boolean);

  return (
    <footer style={{ backgroundColor: "#0f1720", color: "#cbd5e1" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "72px 40px 40px",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                fontSize: "20px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.5px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              bigO
            </Link>
            <p
              style={{
                fontSize: "14px",
                color: "#94a3b8",
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              {SITE.tagline} A small, focused digital studio - websites, care
              plans, and web apps done properly.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={colTitle}>Explore</p>
            <a href="/#capabilities-section" style={linkStyle}>Services</a>
            <a href="/#works-section" style={linkStyle}>Work</a>
            <a href="/#cta-section" style={linkStyle}>Contact</a>
          </div>

          {/* Services */}
          <div>
            <p style={colTitle}>Services</p>
            <a href="/#capabilities-section" style={linkStyle}>Website Design</a>
            <a href="/#capabilities-section" style={linkStyle}>Care & Maintenance</a>
            <a href="/#capabilities-section" style={linkStyle}>Digital Marketing</a>
            <a href="/#capabilities-section" style={linkStyle}>Web Apps & PWA</a>
          </div>

          {/* Contact */}
          <div>
            <p style={colTitle}>Get in touch</p>
            <a href={chat} target="_blank" rel="noreferrer" style={linkStyle}>
              WhatsApp us
            </a>
            <a href={`mailto:${CONTACT.email}`} style={linkStyle}>
              {CONTACT.email}
            </a>
            <p style={{ ...linkStyle, color: "#94a3b8" }}>{CONTACT.city}</p>
            {socials.length > 0 && (
              <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...linkStyle, marginBottom: 0 }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "56px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link to="/privacy" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>
              Privacy
            </Link>
            <Link to="/terms" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>
              Terms
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 460px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
