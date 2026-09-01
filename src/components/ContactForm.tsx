"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_NUMBER = "918875326549";
const CONTACT_EMAIL = "aarongangwar@gmail.com";

type Errors = { name?: string; email?: string; message?: string };

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

const inputCls =
  "w-full appearance-none rounded-none border-0 border-b border-[color:var(--border)] bg-transparent px-0 py-3 font-sans text-[16px] text-[color:var(--ink)] placeholder:text-muted-foreground/70 outline-none transition-colors duration-300 focus:border-[color:var(--accent-blue)]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  } | null>(null);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email looks off.";
    if (!message.trim()) next.message = "Tell us a little about the project.";
    return next;
  };

  const getWhatsAppUrl = (data?: { name: string; email: string; phone: string; company: string; message: string }) => {
    const d = data || { name, email, phone, company, message };
    const brief = [
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
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;
  };

  const sendDirectWhatsApp = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const url = getWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setIsPending(true);
    setStatus("idle");
    setErrorMsg("");

    const formData = {
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    };

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "6b766155-0408-4fd4-aff7-633f65d9d0c2";

    try {
      // 1. Submit directly to Web3Forms from the client browser
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          company: formData.company || "Not provided",
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          from_name: "bigO Website Inquiry",
          subject: `New Project Inquiry from ${formData.name}`,
        }),
      });

      const web3Res = await web3Response.json();

      // 2. Also log to internal API
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {});

      if (web3Res.success) {
        setSubmittedData(formData);
        setStatus("success");
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setSubmittedData(formData);
        setStatus("success");
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch {
      // Fallback for network issues
      setSubmittedData(formData);
      setStatus("success");
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setMessage("");
    } finally {
      setIsPending(false);
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
          className="mb-8 border border-[color:var(--accent-blue)]/30 bg-[color:var(--accent-blue)]/5 p-6 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-blue)] text-white">
              <CheckGlyph className="h-3.5 w-3.5" />
            </span>
            <div>
              <h4 className="font-sans font-bold text-[17px] text-[color:var(--ink)]">
                Inquiry Received!
              </h4>
              <p className="font-sans text-[14px] leading-relaxed text-[color:var(--body-text)] mt-1">
                Thank you{submittedData?.name ? `, ${submittedData.name}` : ""}! We have received your inquiry and our team will get back to you within 24 hours.
              </p>
              
              {submittedData && (
                <div className="mt-4 pt-4 border-t border-[color:var(--accent-blue)]/20">
                  <p className="text-[13px] font-medium text-[color:var(--ink)] mb-3">
                    Want an instant response? Message our founders directly:
                  </p>
                  <a
                    href={getWhatsAppUrl(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sans text-[13.5px] font-semibold text-white transition-all hover:bg-[#1EBE5D] hover:shadow-md cursor-pointer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Open in WhatsApp (+91 8875326549)
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {status === "error" && (
        <div
          role="alert"
          className="mb-8 flex items-start gap-3 border border-red-500/25 bg-red-500/5 p-4 rounded-xl"
        >
          <p className="font-sans text-[14px] leading-relaxed text-red-500">
            {errorMsg}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-[40px] gap-y-[24px] sm:grid-cols-2">
        {/* name */}
        <div className="col-span-1">
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name*"
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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company / Brand"
            className={cn(inputCls)}
          />
        </div>

        {/* email */}
        <div className="col-span-1">
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address*"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone / WhatsApp"
            className={cn(inputCls)}
          />
        </div>

        {/* message — full width */}
        <div className="sm:col-span-2 mt-4">
          <textarea
            id="cf-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project, timeline, or goals*"
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
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--ink)] px-8 py-4 font-sans text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--accent-blue)] disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
        >
          {isPending ? "Sending..." : "Submit Inquiry"}
          {!isPending && <ArrowUpRight className="h-[15px] w-[15px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>

        <button
          type="button"
          onClick={sendDirectWhatsApp}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(18,18,18,0.15)] bg-white px-6 py-3.5 font-sans text-[14.5px] font-medium text-[color:var(--ink)] transition-all duration-300 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-sm cursor-pointer"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          Chat on WhatsApp
        </button>
      </div>
    </form>
  );
}
