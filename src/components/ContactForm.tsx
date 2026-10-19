"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { PROJECT_TYPES } from "@/lib/content";
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

const inputCls =
  "w-full rounded-[2px] border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[17px] text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-blue";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[14px] font-medium text-ink">
        {label}
        {optional && <span className="text-[13px] font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  // Honeypot: hidden from people, bots fill it in
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<Enquiry | null>(null);

  // Preselect a project type from /contact?type=… (e.g. the Services helper)
  useEffect(() => {
    const preselect = () => {
      const t = new URLSearchParams(window.location.search).get("type");
      if (t && PROJECT_TYPES.some((p) => p.id === t)) setTypes([t]);
    };
    preselect();
  }, []);

  const toggleType = (id: string) =>
    setTypes((cur) => (cur.includes(id) ? cur.filter((t) => t !== id) : [...cur, id]));

  // The chosen types travel at the top of the message, so every delivery
  // channel (email, WhatsApp) carries them without a new field
  const withTypes = (text: string) => {
    if (!types.length) return text;
    const labels = PROJECT_TYPES.filter((p) => types.includes(p.id)).map((p) => p.label);
    return `Project type: ${labels.join(", ")}\n\n${text}`.slice(0, FIELD_LIMITS.message);
  };

  const current = (): Enquiry => ({ name, company, email, phone, message: withTypes(message) });

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
    setTypes([]);
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
      message: withTypes(message.trim()),
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
    <form noValidate onSubmit={submitForm} className="relative w-full">
      {status === "success" && (
        <div role="status" className="mb-8 border-l-2 border-blue bg-raised p-6">
          <p className="t-3">Thanks{submittedData?.name ? `, ${submittedData.name}` : ""}. We have your message.</p>
          <p className="mt-2 text-[15px]">
            We&apos;ll reply to <span className="font-medium text-ink">{submittedData?.email}</span> within a day with
            next steps.
          </p>
          {submittedData && (
            <a
              href={whatsAppUrl(submittedData)}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-4 inline-flex items-center gap-2 text-[15px]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Need a faster reply? Send it on WhatsApp
            </a>
          )}
        </div>
      )}

      {status === "error" && submittedData && (
        <div role="alert" className="mb-8 border-l-2 border-danger bg-raised p-6">
          <p className="t-3">We couldn&apos;t send your message.</p>
          <p className="mt-2 text-[15px]">
            Something went wrong on our side. Your details are still in the form. Send them on WhatsApp or by email
            and we&apos;ll get straight back to you.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <a href={whatsAppUrl(submittedData)} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4" />
              Send on WhatsApp
            </a>
            <a href={mailtoUrl(submittedData)} className="link inline-flex items-center gap-2">
              Email us instead
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
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

      <fieldset className="mb-8">
        <legend className="mb-3 text-[14px] font-medium text-ink">
          What do you need? <span className="font-normal text-muted">Choose any that apply</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => {
            const on = types.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleType(t.id)}
                className={cn(
                  "inline-flex min-h-10 cursor-pointer items-center gap-2 border px-3.5 py-2 text-[14.5px] transition-colors",
                  on ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink",
                )}
              >
                {on && (
                  <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field id="cf-name" label="Name" error={errors.name}>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={cn(inputCls, errors.name && "border-danger")}
          />
        </Field>

        <Field id="cf-company" label="Company" optional>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.company}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field id="cf-email" label="Email" error={errors.email}>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={cn(inputCls, errors.email && "border-danger")}
          />
        </Field>

        <Field id="cf-phone" label="Phone or WhatsApp" optional>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="cf-message" label="What would you like to build or fix?" error={errors.message}>
            <textarea
              id="cf-message"
              rows={6}
              maxLength={FIELD_LIMITS.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="For example: we take orders on WhatsApp and copy them into a spreadsheet by hand."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "cf-message-error" : undefined}
              className={cn(inputCls, "resize-y leading-relaxed", errors.message && "border-danger")}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 cursor-pointer items-center justify-center bg-ink px-6 text-[15px] font-semibold text-paper transition-colors hover:bg-blue disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Sending…" : "Send message"}
        </button>
        <button
          type="button"
          onClick={sendDirectWhatsApp}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 border border-line-strong px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Send on WhatsApp instead
        </button>
      </div>
    </form>
  );
}
