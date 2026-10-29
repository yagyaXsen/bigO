import { CONTACT_EMAIL, ENQUIRY_INBOX, WEB3FORMS_ACCESS_KEY, WHATSAPP_NUMBER, type Enquiry } from "@/lib/contact";

/* ── enquiry delivery ──────────────────────────────────────────────
   Shared by the contact form and the bigO Agents pre-book form.
   Channels are tried in order; the first one that confirms delivery
   wins, so each enquiry arrives exactly once. */

const REQUEST_TIMEOUT_MS = 12_000;

async function sendViaWeb3Forms(data: Enquiry, subject: string): Promise<boolean> {
  const body = new FormData();
  body.append("access_key", WEB3FORMS_ACCESS_KEY);
  body.append("name", data.name);
  body.append("email", data.email);
  body.append("phone", data.phone || "Not provided");
  body.append("company", data.company || "Not provided");
  body.append("message", data.message);
  body.append("from_name", "bigO Studio Website");
  body.append("subject", subject);

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

async function sendViaFormSubmit(data: Enquiry, subject: string): Promise<boolean> {
  const res = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_INBOX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: subject,
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

/** Sends the enquiry through the first channel that works. */
export async function deliverEnquiry(data: Enquiry, subject = `New Project Inquiry from ${data.name}`): Promise<boolean> {
  const channels = [
    () => sendViaWeb3Forms(data, subject),
    () => sendViaApi(data),
    () => sendViaFormSubmit(data, subject),
  ];
  for (const send of channels) {
    try {
      if (await send()) return true;
    } catch {
      // network error, timeout or blocked request — try the next channel
    }
  }
  return false;
}

export function buildBrief(d: Enquiry, heading = "New Project Inquiry — bigO", detailsLabel = "Project Details") {
  return [
    `*${heading}*`,
    "",
    `*Name:* ${d.name.trim() || "—"}`,
    `*Email:* ${d.email.trim() || "—"}`,
    `*Company:* ${d.company.trim() || "—"}`,
    `*Phone:* ${d.phone.trim() || "—"}`,
    "",
    `*${detailsLabel}:*`,
    d.message.trim() || "—",
  ].join("\n");
}

export const whatsAppUrlFor = (brief: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;

export const mailtoUrlFor = (subject: string, brief: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief.replace(/\*/g, ""))}`;
