"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";
import {
  CONTACT_EMAIL,
  EMAIL_RE,
  ENQUIRY_INBOX,
  FIELD_LIMITS,
  WEB3FORMS_ACCESS_KEY,
  WHATSAPP_NUMBER,
  type Enquiry,
} from "@/lib/contact";

type Errors = { name?: string; email?: string; message?: string };

const REQUEST_TIMEOUT_MS = 12_000;

/* ── delivery channels ─────────────────────────────────────────────
   Tried in order; the first one that confirms delivery wins, so each
   enquiry arrives exactly once. */

async function sendViaWeb3Forms(data: Enquiry): Promise<boolean> {
  const body = new FormData();
  body.append("access_key", WEB3FORMS_ACCESS_KEY);
  body.append("name", data.name);
  body.append("email", data.email);
  body.append("phone", data.phone || "Not provided");
  body.append("company", data.company || "Not provided");
  body.append("message", data.message);
  body.append("from_name", "bigO Studio Website");
  body.append("subject", `New Project Inquiry from ${data.name}`);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const json = await res.json().catch(() => null);
  return res.ok && json?.success === true;
}

/* SMTP via our own route — only delivers when SMTP_* env vars are set */
async function sendViaApi(data: Enquiry): Promise<boolean> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const json = await res.json().catch(() => null);
  return res.ok && json?.delivered === true;
}

async function sendViaFormSubmit(data: Enquiry): Promise<boolean> {
  const res = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_INBOX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `New Project Inquiry from ${data.name}`,
      _template: "table",
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      message: data.message,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const json = await res.json().catch(() => null);
  // FormSubmit returns success as the string "true"
  return res.ok && String(json?.success) === "true";
}

const CHANNELS = [sendViaWeb3Forms, sendViaApi, sendViaFormSubmit];

async function deliver(data: Enquiry): Promise<boolean> {
  for (const send of CHANNELS) {
    try {
      if (await send(data)) return true;
    } catch {
      // network error, timeout or blocked request — try the next channel
    }
  }
  return false;
}

function buildBrief(d: Enquiry) {
  return [
    "*New Project Inquiry — bigO*",
    "",
    `*Name:* ${d.name.trim() || "—"}`,
    `*Email:* ${d.email.trim() || "—"}`,
    `*Company:* ${d.company.trim() || "—"}`,
    `*Phone:* ${d.phone.trim() || "—"}`,
    "",
    "*Project Details:*",
    d.message.trim() || "—",
  ].join("\n");
}

const whatsAppUrl = (d: Enquiry) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBrief(d))}`;

const mailtoUrl = (d: Enquiry) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `New Project Inquiry from ${d.name.trim() || "bigO website"}`,
  )}&body=${encodeURIComponent(buildBrief(d).replace(/\*/g, ""))}`;

/* ── inline glyphs ─────────────────────────────────────────────── */
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

function AlertGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M10 6v5M10 14h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const inputCls =
  "w-full appearance-none rounded-none border-0 border-b border-[color:var(--border)] bg-transparent px-0 py-3 font-sans text-[16px] text-[color:var(--ink)] placeholder:text-muted-foreground/70 outline-none transition-colors duration-300 focus:border-[color:var(--accent-blue)]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: hidden from people, bots fill it in
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<Enquiry | null>(null);

  const current = (): Enquiry => ({ name, company, email, phone, message });

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email looks off.";
    if (!message.trim()) next.message = "Tell us a little about the project.";
    return next;
  };

  const sendDirectWhatsApp = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    window.open(whatsAppUrl(current()), "_blank", "noopener,noreferrer");
  };

  const resetFields = () => {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const formData: Enquiry = {
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    };

    setIsPending(true);
    setStatus("idle");

    // Bots get the success screen without anything being sent
    const delivered = botcheck ? true : await deliver(formData);

    setSubmittedData(formData);
    setIsPending(false);
    if (delivered) {
      setStatus("success");
      resetFields();
    } else {
      // Keep what they typed so nothing is lost
      setStatus("error");
    }
  };

  return (
    <form
      noValidate
      onSubmit={submitForm}
      className="pointer-events-auto w-full"
    >
      {status === "success" && (
        <div
          role="status"
          className="mb-8 border border-[color:var(--accent-blue)]/30 bg-[color:var(--accent-blue)]/5 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-blue)] text-white">
              <CheckGlyph className="h-3.5 w-3.5" />
            </span>
            <div className="w-full">
              <h4 className="font-sans font-bold text-[17px] text-[color:var(--ink)]">
                Inquiry Sent Successfully!
              </h4>
              <p className="font-sans text-[14px] leading-relaxed text-[color:var(--body-text)] mt-1">
                Thank you{submittedData?.name ? `, ${submittedData.name}` : ""}! Your message has been sent to our team. We will review your project and reply to <span className="font-semibold text-[color:var(--ink)]">{submittedData?.email}</span> shortly.
              </p>

              {submittedData && (
                <div className="mt-4 pt-4 border-t border-[color:var(--accent-blue)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-[13px] font-medium text-[color:var(--ink)]">
                    Need an immediate reply?
                  </p>
                  <a
                    href={whatsAppUrl(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sans text-[13.5px] font-semibold text-white transition-all hover:bg-[#1EBE5D] hover:shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Open in WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {status === "error" && submittedData && (
        <div
          role="alert"
          className="mb-8 border border-[#c0392b]/30 bg-[#c0392b]/5 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c0392b] text-white">
              <AlertGlyph className="h-4 w-4" />
            </span>
            <div className="w-full">
              <h4 className="font-sans font-bold text-[17px] text-[color:var(--ink)]">
                We couldn&apos;t send your message
              </h4>
              <p className="font-sans text-[14px] leading-relaxed text-[color:var(--body-text)] mt-1">
                Something went wrong on our side. Your details are still in the form — send them on WhatsApp or by email and we&apos;ll get straight back to you.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsAppUrl(submittedData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sans text-[13.5px] font-semibold text-white transition-all hover:bg-[#1EBE5D] hover:shadow-md cursor-pointer whitespace-nowrap"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Send on WhatsApp
                </a>
                <a
                  href={mailtoUrl(submittedData)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border)] px-5 py-2.5 font-sans text-[13.5px] font-semibold text-[color:var(--ink)] transition-colors hover:border-[color:var(--accent-blue)] hover:text-[color:var(--accent-blue)] whitespace-nowrap"
                >
                  Email us instead
                  <ArrowUpRight className="h-[13px] w-[13px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* honeypot — off-screen and skipped by keyboard / screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-botcheck">Leave this field empty</label>
        <input
          id="cf-botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botcheck}
          onChange={(e) => setBotcheck(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-[40px] gap-y-[24px] sm:grid-cols-2">
        {/* name */}
        <div className="col-span-1">
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name*"
            aria-label="Your name"
            aria-invalid={!!errors.name}
            className={cn(inputCls, errors.name && "border-[#c0392b]")}
          />
          {errors.name && <span className="text-[12px] text-red-500 mt-1 block">{errors.name}</span>}
        </div>

        {/* company */}
        <div className="col-span-1">
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.company}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company / Brand"
            aria-label="Company or brand"
            className={cn(inputCls)}
          />
        </div>

        {/* email */}
        <div className="col-span-1">
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address*"
            aria-label="Email address"
            aria-invalid={!!errors.email}
            className={cn(inputCls, errors.email && "border-[#c0392b]")}
          />
          {errors.email && <span className="text-[12px] text-red-500 mt-1 block">{errors.email}</span>}
        </div>

        {/* phone */}
        <div className="col-span-1">
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone / WhatsApp"
            aria-label="Phone or WhatsApp number"
            className={cn(inputCls)}
          />
        </div>

        {/* message — full width */}
        <div className="sm:col-span-2 mt-4">
          <textarea
            id="cf-message"
            rows={3}
            maxLength={FIELD_LIMITS.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project, timeline, or goals*"
            aria-label="Project details"
            aria-invalid={!!errors.message}
            className={cn(
              inputCls,
              "resize-none leading-relaxed",
              errors.message && "border-[#c0392b]",
            )}
          />
          {errors.message && <span className="text-[12px] text-red-500 mt-1 block">{errors.message}</span>}
        </div>
      </div>

      {/* actions */}
      <div className="mt-[40px] flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--ink)] px-8 py-4 font-sans text-[15px] font-semibold text-[color:var(--background)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--accent-blue)] hover:text-white disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
        >
          {isPending ? "Sending..." : "Submit Inquiry"}
          {!isPending && <ArrowUpRight className="h-[15px] w-[15px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>

        <button
          type="button"
          onClick={sendDirectWhatsApp}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-6 py-3.5 font-sans text-[14.5px] font-medium text-[#121212] transition-all duration-300 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-sm cursor-pointer"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          Chat on WhatsApp
        </button>
      </div>
    </form>
  );
}
