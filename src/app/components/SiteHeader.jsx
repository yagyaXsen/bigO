import React from "react";
import { Link } from "react-router";
import { waLink } from "../site";

const ACCENT = "#2e6fb7";

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

const navLink = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#6b7280",
  textDecoration: "none",
};

export default function SiteHeader() {
  const chat = waLink("Hi bigO I'd like to discuss a project.");
  return (
    <header
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(14px) saturate(180%)",
        WebkitBackdropFilter: "blur(14px) saturate(180%)",
        borderBottom: "1px solid rgba(228,231,236,0.7)",
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
          bigO
        </Link>
        <div className="hdr-nav" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <a href="/#capabilities-section" style={navLink}>Services</a>
          <a href="/#works-section" style={navLink}>Work</a>
          <a href="/#cta-section" style={navLink}>Contact</a>
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
      <style>{`
        @media (max-width: 640px) {
          .hdr-nav a:not(:last-child) { display: none; }
        }
      `}</style>
    </header>
  );
}
