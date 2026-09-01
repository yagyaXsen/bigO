"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* bigO public contact — used for the WhatsApp + email fallbacks */
const WHATSAPP_NUMBER = "918875326549";
const CONTACT_EMAIL = "bigo.company2026@gmail.com";

/* Service chips reuse the same rounded-pill / mono language as the
   floating word-cloud pills behind the card. */
const NEED_OPTIONS = [
  "Website",
  "Web app",
  "E-commerce",
  "AI & automation",
  "Branding",
  "Maintenance",
] as const;

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000+",
] as const;

type Errors = { name?: string; email?: string; details?: string };
type SentVia = null | "whatsapp" | "email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── inline glyphs ─────────────────────────────────────────────── */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.358.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.893a11.821 11.821 0 00-3.481-8.464" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── styles ────────────────────────────────────────────────────── */
const labelCls =
  "block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8e93a1]";

const inputCls =
  "w-full appearance-none rounded-none border-0 border-b border-[rgba(18,18,18,0.16)] bg-transparent px-0 py-2.5 font-sans text-[15px] text-[color:var(--ink)] placeholder:text-[#b9b5b2] outline-none transition-colors focus:border-[color:var(--accent-blue)]";

export function ProjectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>(BUDGET_OPTIONS[0]);
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentVia, setSentVia] = useState<SentVia>(null);

  const toggleNeed = (value: string) =>
    setNeeds((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email looks off.";
    if (!details.trim()) next.details = "Tell us a little about the project.";
    return next;
  };

  const buildBrief = () =>
    [
      "New project brief — bigO",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Business: ${business.trim() || "—"}`,
      `Needs: ${needs.length ? needs.join(", ") : "—"}`,
      `Budget: ${budget}`,
      "",
      "Details:",
      details.trim(),
    ].join("\n");

  const send = (via: "whatsapp" | "email") => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const brief = buildBrief();
    if (via === "whatsapp") {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const subject = encodeURIComponent(`New project brief — ${name.trim() || "bigO"}`);
      const body = encodeURIComponent(brief);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }
    setSentVia(via);
  };

  return (
    <div className="pointer-events-auto w-full rounded-[24px] border border-[rgba(18,18,18,0.08)] bg-white p-6 text-left shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)] sm:p-8 lg:p-9">
      {/* card header */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)]">
          Project brief
        </span>

      </div>

      {sentVia && (
        <div
          role="status"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-[color:var(--accent-blue)]/20 bg-[color:var(--accent-blue)]/5 p-4"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-blue)] text-white">
            <CheckGlyph className="h-3 w-3" />
          </span>
          <p className="font-sans text-[13.5px] leading-relaxed text-[color:var(--ink)]">
            Brief ready — we&apos;ve opened{" "}
            {sentVia === "whatsapp" ? "WhatsApp" : "your email app"} with it filled
            in. Hit send and we&apos;ll take it from there.
          </p>
        </div>
      )}

      <form noValidate onSubmit={(e) => { e.preventDefault(); send("whatsapp"); }} className="mt-6 space-y-5">
        {/* name + email */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pf-name" className={labelCls}>Name</label>
            <input
              id="pf-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-invalid={!!errors.name}
              className={cn(inputCls, "mt-1.5", errors.name && "border-[#c0392b]")}
            />
            {errors.name && <p className="mt-1.5 font-mono text-[11px] text-[#c0392b]">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="pf-email" className={labelCls}>Email</label>
            <input
              id="pf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              className={cn(inputCls, "mt-1.5", errors.email && "border-[#c0392b]")}
            />
            {errors.email && <p className="mt-1.5 font-mono text-[11px] text-[#c0392b]">{errors.email}</p>}
          </div>
        </div>

        {/* business */}
        <div>
          <label htmlFor="pf-business" className={labelCls}>
            Business <span className="text-[#b9b5b2]">(optional)</span>
          </label>
          <input
            id="pf-business"
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Business or brand name"
            className={cn(inputCls, "mt-1.5")}
          />
        </div>

        {/* needs — chips */}
        <div>
          <span className={labelCls} id="pf-needs-label">What you need</span>
          <div role="group" aria-labelledby="pf-needs-label" className="mt-2.5 flex flex-wrap gap-2">
            {NEED_OPTIONS.map((opt) => {
              const active = needs.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleNeed(opt)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.03em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)]/40",
                    active
                      ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white"
                      : "border-[rgba(18,18,18,0.18)] text-[color:var(--body-text)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)]",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* budget */}
        <div className="relative">
          <label htmlFor="pf-budget" className={labelCls}>Budget</label>
          <select
            id="pf-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={cn(inputCls, "mt-1.5 cursor-pointer pr-6")}
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg
            viewBox="0 0 12 12" aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 right-0 h-3 w-3 text-[color:var(--ink)]"
            fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="m2.5 4.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* details */}
        <div>
          <label htmlFor="pf-details" className={labelCls}>Project details</label>
          <textarea
            id="pf-details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="A few lines about your project, goals, and any deadline…"
            aria-invalid={!!errors.details}
            className={cn(
              "mt-1.5 w-full resize-none rounded-xl border border-[rgba(18,18,18,0.16)] bg-[rgba(18,18,18,0.02)] px-3.5 py-3 font-sans text-[15px] leading-relaxed text-[color:var(--ink)] placeholder:text-[#b9b5b2] outline-none transition-colors focus:border-[color:var(--accent-blue)]",
              errors.details && "border-[#c0392b]",
            )}
          />
          {errors.details && <p className="mt-1.5 font-mono text-[11px] text-[#c0392b]">{errors.details}</p>}
        </div>

        {/* actions */}
        <div className="pt-1">
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[color:var(--ink)] px-6 py-4 font-sans text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <WhatsAppGlyph className="h-[18px] w-[18px]" />
            Send on WhatsApp
          </button>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => send("email")}
              className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.08em] text-[#8e93a1] underline-offset-4 transition-colors hover:text-[color:var(--ink)] hover:underline"
            >
              or email it instead
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
