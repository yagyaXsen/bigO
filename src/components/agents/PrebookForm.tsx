"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { EMAIL_RE, FIELD_LIMITS, type Enquiry } from "@/lib/contact";
import { buildBrief, deliverEnquiry, mailtoUrlFor, whatsAppUrlFor } from "@/lib/delivery";

type Errors = { name?: string; email?: string; company?: string; role?: string; consent?: string };

const ROLES = [
  { id: "business", label: "For my business" },
  { id: "agency", label: "Agency partner (white-label)" },
] as const;

const AGENTS = [
  "Customer support",
  "Lead qualification",
  "Appointment booking",
  "AI calling agent",
  "Sales and products",
  "Follow-ups and reminders",
  "Orders and enquiries",
  "Recruitment screening",
  "Feedback and reviews",
  "Internal knowledge",
  "Not sure yet",
];

const CHANNELS = ["Website chat", "WhatsApp", "Phone calls", "Instagram / Messenger", "Not sure yet"];

const INDUSTRIES = [
  "Clinic or healthcare",
  "Real estate",
  "Restaurant or catering",
  "Education or coaching",
  "E-commerce",
  "Professional services",
  "Other",
];

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

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
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
      {children}
    </button>
  );
}

export function PrebookForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<string>("");
  const [industry, setIndustry] = useState("");
  const [agents, setAgents] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot: hidden from people, bots fill it in
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitted, setSubmitted] = useState<Enquiry | null>(null);

  const roleLabel = ROLES.find((r) => r.id === role)?.label ?? "";

  const toggleAgent = (a: string) =>
    setAgents((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  const toggleChannel = (c: string) =>
    setChannels((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  // Everything specific to the pre-book travels in the message, so every
  // existing delivery channel (email, SMTP, WhatsApp) carries it unchanged
  const current = (): Enquiry => ({
    name: name.trim(),
    company: company.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: [
      "bigO Agents — founding-client pre-book",
      `Type: ${roleLabel || "—"}`,
      `Industry: ${industry || "—"}`,
      `Agents: ${agents.length ? agents.join(", ") : "—"}`,
      `Channels: ${channels.length ? channels.join(", ") : "—"}`,
      "",
      `What the agent should handle:`,
      message.trim() || "—",
    ]
      .join("\n")
      .slice(0, FIELD_LIMITS.message),
  });

  const subjectFor = (d: Enquiry) => `bigO Agents pre-book: ${d.company || d.name} (${roleLabel || "unspecified"})`;
  const briefFor = (d: Enquiry) => buildBrief(d, "bigO Agents pre-book", "Details");

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email looks off.";
    if (!company.trim()) next.company = "Please add your company name.";
    if (!role) next.role = "Choose one.";
    if (!consent) next.consent = "Please confirm so we can contact you.";
    return next;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const data = current();
    setIsPending(true);
    setStatus("idle");

    // Bots get the success screen without anything being sent
    const delivered = botcheck ? true : await deliverEnquiry(data, subjectFor(data));

    setSubmitted(data);
    setIsPending(false);
    setStatus(delivered ? "success" : "error");
  };

  if (status === "success" && submitted) {
    return (
      <div role="status" className="border-l-2 border-blue bg-raised p-6 md:p-8">
        <p className="t-3">You&apos;re on the list{submitted.name ? `, ${submitted.name.split(" ")[0]}` : ""}.</p>
        <p className="mt-3 text-[16px]">
          We&apos;ve reserved a founding-client slot for <span className="font-medium text-ink">{submitted.company}</span>.
          We&apos;ll write to <span className="font-medium text-ink">{submitted.email}</span> within one working day to
          plan your agent.
        </p>
        <a
          href={whatsAppUrlFor(briefFor(submitted))}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-5 inline-flex items-center gap-2 text-[15px]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Want to talk sooner? Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="relative w-full">
      {status === "error" && submitted && (
        <div role="alert" className="mb-8 border-l-2 border-danger bg-raised p-6">
          <p className="t-3">We couldn&apos;t send your request.</p>
          <p className="mt-2 text-[15px]">
            Your details are still in the form. Send them on WhatsApp or by email and we&apos;ll reserve your slot.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <a
              href={whatsAppUrlFor(briefFor(submitted))}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send on WhatsApp
            </a>
            <a href={mailtoUrlFor(subjectFor(submitted), briefFor(submitted))} className="link inline-flex items-center gap-2">
              Email us instead
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* honeypot — off-screen and skipped by keyboard / screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="pb-botcheck">Leave this field empty</label>
        <input
          id="pb-botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botcheck}
          onChange={(e) => setBotcheck(e.target.value)}
        />
      </div>

      <fieldset className="mb-8">
        <legend className="mb-3 text-[14px] font-medium text-ink">I&apos;m pre-booking</legend>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <Chip key={r.id} on={role === r.id} onClick={() => setRole(r.id)}>
              {r.label}
            </Chip>
          ))}
        </div>
        {errors.role && <p className="mt-1.5 text-[13px] text-danger">{errors.role}</p>}
      </fieldset>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field id="pb-name" label="Name" error={errors.name}>
          <input
            id="pb-name"
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "pb-name-error" : undefined}
            className={cn(inputCls, errors.name && "border-danger")}
          />
        </Field>

        <Field id="pb-email" label="Work email" error={errors.email}>
          <input
            id="pb-email"
            type="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "pb-email-error" : undefined}
            className={cn(inputCls, errors.email && "border-danger")}
          />
        </Field>

        <Field id="pb-company" label="Company" error={errors.company}>
          <input
            id="pb-company"
            type="text"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.company}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "pb-company-error" : undefined}
            className={cn(inputCls, errors.company && "border-danger")}
          />
        </Field>

        <Field id="pb-phone" label="Phone or WhatsApp" optional>
          <input
            id="pb-phone"
            type="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="pb-industry" label="Industry" optional>
            <select
              id="pb-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={cn(inputCls, "cursor-pointer", !industry && "text-muted")}
            >
              <option value="">Choose one</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-3 text-[14px] font-medium text-ink">
          Which agents interest you? <span className="font-normal text-muted">Choose any that apply</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {AGENTS.map((a) => (
            <Chip key={a} on={agents.includes(a)} onClick={() => toggleAgent(a)}>
              {a}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-3 text-[14px] font-medium text-ink">
          Where should your agent work? <span className="font-normal text-muted">Choose any that apply</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((c) => (
            <Chip key={c} on={channels.includes(c)} onClick={() => toggleChannel(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <Field id="pb-message" label="What should the agent handle?" optional>
          <textarea
            id="pb-message"
            rows={4}
            maxLength={1500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="For example: answer menu and pricing questions, take event enquiries, book tastings."
            className={cn(inputCls, "resize-y leading-relaxed")}
          />
        </Field>
      </div>

      <label className="mt-8 flex cursor-pointer items-start gap-3 text-[15px]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-invalid={!!errors.consent}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--blue)]"
        />
        <span>
          bigO may contact me about bigO Agents and keep these details for that purpose. See our{" "}
          <a href="/privacy" className="link">
            privacy policy
          </a>
          .
        </span>
      </label>
      {errors.consent && <p className="mt-1.5 text-[13px] text-danger">{errors.consent}</p>}

      <div className="mt-8">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 cursor-pointer items-center justify-center bg-ink px-6 text-[15px] font-semibold text-paper transition-colors hover:bg-blue disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Reserving…" : "Reserve my slot"}
        </button>
        <p className="mt-3 text-[14px] text-muted">No payment now. We reply within one working day.</p>
      </div>
    </form>
  );
}
