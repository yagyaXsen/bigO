import React from "react";
import { Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { waLink } from "../site";

const FONT =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export default function NotFoundPage() {
  return (
    <div
      style={{
        fontFamily: FONT,
        backgroundColor: "#fafafa",
        color: "#1c2430",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <SiteHeader />
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "520px" }}>
          <p
            style={{
              fontSize: "80px",
              fontWeight: 800,
              letterSpacing: "-3px",
              color: "#2e6fb7",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: "14px",
            }}
          >
            This page doesn't exist.
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "#6b7280",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            The link may be broken or the page may have moved. Let's get you back
            on track.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{
                backgroundColor: "#2e6fb7",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Back home
            </Link>
            <a
              href={waLink("Hi bigO I'd like to discuss a project.")}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "transparent",
                color: "#1c2430",
                border: "1px solid #d1d5db",
                fontSize: "15px",
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Message us
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
