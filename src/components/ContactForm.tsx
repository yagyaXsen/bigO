"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email looks off.";
    if (!message.trim()) next.message = "Tell us a little about the project.";
    return next;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setIsPending(true);
    setStatus("idle");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name,
          email,
          phone,
          company,
          message,
        }),
      });
      
      const res = await response.json();
      
      if (res.success) {
        setStatus("success");
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(res.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to send message. Please check your connection.");
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
          className="mb-8 flex items-start gap-3 border border-[color:var(--accent-blue)]/25 bg-[color:var(--accent-blue)]/5 p-4"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-blue)] text-white">
            <CheckGlyph className="h-3 w-3" />
          </span>
          <p className="font-sans text-[14px] leading-relaxed text-[color:var(--ink)]">
            Thanks! Your message has been sent successfully. We&apos;ll be in touch soon.
          </p>
        </div>
      )}
      
      {status === "error" && (
        <div
          role="alert"
          className="mb-8 flex items-start gap-3 border border-red-500/25 bg-red-500/5 p-4"
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
        </div>

        {/* company */}
        <div className="col-span-1">
          <input
            id="cf-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
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
            placeholder="Email*"
            aria-invalid={!!errors.email}
            className={cn(inputCls, errors.email && "border-[#c0392b]")}
          />
        </div>

        {/* phone */}
        <div className="col-span-1">
          <input
            id="cf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className={cn(inputCls)}
          />
        </div>

        {/* message — full width */}
        <div className="sm:col-span-2 mt-4">
          <textarea
            id="cf-message"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A few words about your project*"
            aria-invalid={!!errors.message}
            className={cn(
              inputCls,
              "resize-none leading-relaxed",
              errors.message && "border-[#c0392b]",
            )}
          />
        </div>
      </div>

      {/* actions */}
      <div className="mt-[44px] flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--accent-blue)] px-9 py-4 font-sans text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isPending ? "Sending..." : "Submit"}
          {!isPending && <ArrowUpRight className="h-[15px] w-[15px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>

      </div>
    </form>
  );
}
