import React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { CONTACT, SITE } from "../site";

export function meta() {
  return [
    { title: "Privacy Policy - bigO" },
    { name: "description", content: "How bigO handles your information." },
  ];
}

const FONT =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const h2 = {
  fontSize: "20px",
  fontWeight: 700,
  letterSpacing: "-0.3px",
  color: "#1c2430",
  margin: "40px 0 12px",
};
const p = {
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: 1.75,
  marginBottom: "14px",
};

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: FONT, backgroundColor: "#fafafa", color: "#1c2430" }}>
      <SiteHeader />
      <section style={{ padding: "72px 40px 96px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2e6fb7",
              marginBottom: "14px",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              marginBottom: "12px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ ...p, color: "#9ca3af", marginBottom: "8px" }}>
            This is a plain-language summary. Please review and adapt it for your
            business before relying on it.
          </p>

          <h2 style={h2}>What we collect</h2>
          <p style={p}>
            When you contact {SITE.name} - for example through our contact form or
            on WhatsApp - we receive the details you choose to share, such as your
            name, business, email, and message. We only use these to respond to
            you and discuss your project.
          </p>

          <h2 style={h2}>How we use it</h2>
          <p style={p}>
            We use your information to reply to enquiries, provide our services,
            and keep in touch about work we're doing together. We do not sell your
            information to anyone.
          </p>

          <h2 style={h2}>Cookies & analytics</h2>
          <p style={p}>
            Our site may use basic analytics to understand how it's used and to
            improve it. This data is aggregated and not used to identify you
            personally.
          </p>

          <h2 style={h2}>Your choices</h2>
          <p style={p}>
            You can ask us what information we hold about you, or ask us to delete
            it, at any time by emailing{" "}
            <a href={`mailto:${CONTACT.email}`} style={{ color: "#2e6fb7" }}>
              {CONTACT.email}
            </a>
            .
          </p>

          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions about privacy? Email us at{" "}
            <a href={`mailto:${CONTACT.email}`} style={{ color: "#2e6fb7" }}>
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
