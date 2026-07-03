import React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { CONTACT, SITE } from "../site";

export function meta() {
  return [
    { title: "Terms of Service - bigO" },
    { name: "description", content: "The terms for working with bigO." },
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

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ ...p, color: "#9ca3af", marginBottom: "8px" }}>
            This is a plain-language summary. Please review and adapt it for your
            business before relying on it.
          </p>

          <h2 style={h2}>Working together</h2>
          <p style={p}>
            {SITE.name} provides web design, development, maintenance, and related
            digital services. The specific scope, timeline, and price for your
            project are agreed in writing before we begin.
          </p>

          <h2 style={h2}>Payments</h2>
          <p style={p}>
            Projects typically start with a deposit, with the balance due on
            completion. Monthly care plans are billed on a recurring basis and can
            be cancelled with reasonable notice.
          </p>

          <h2 style={h2}>Ownership</h2>
          <p style={p}>
            Once a project is fully paid for, the final work is yours. For custom
            web apps, this includes a full source-code handover as agreed.
          </p>

          <h2 style={h2}>Revisions & scope</h2>
          <p style={p}>
            We include a fair number of revisions in every project. Significant
            new requirements beyond the agreed scope may be quoted separately.
          </p>

          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions about these terms? Email us at{" "}
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
