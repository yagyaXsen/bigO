import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMAIL_RE, ENQUIRY_INBOX, FIELD_LIMITS, type Enquiry } from "@/lib/contact";

/*
 * SMTP delivery for the contact form. The browser tries Web3Forms first and
 * only falls back here; this route sends nothing unless SMTP_HOST, SMTP_USER
 * and SMTP_PASS are set.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
// Best effort: per server instance, reset on cold start.
const recentHits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentHits.set(ip, hits);
  if (recentHits.size > 1000) {
    for (const [key, times] of recentHits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) recentHits.delete(key);
    }
  }
  return hits.length > RATE_MAX;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function field(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, delivered: false, message }, { status });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many messages. Please try again later or reach out on WhatsApp.", 429);
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot filled in: pretend it worked, send nothing
  if (field(body, "botcheck")) {
    return NextResponse.json({ success: true, delivered: true });
  }

  const enquiry: Enquiry = {
    name: field(body, "name").replace(/[\r\n]+/g, " "),
    company: field(body, "company").replace(/[\r\n]+/g, " "),
    email: field(body, "email"),
    phone: field(body, "phone"),
    message: field(body, "message"),
  };

  if (!enquiry.name || !enquiry.email || !enquiry.message) {
    return fail("Name, email, and message are required.", 400);
  }
  if (!EMAIL_RE.test(enquiry.email)) {
    return fail("Please provide a valid email address.", 400);
  }
  for (const key of Object.keys(FIELD_LIMITS) as (keyof Enquiry)[]) {
    if (enquiry[key].length > FIELD_LIMITS[key]) {
      return fail(`The ${key} field is too long.`, 400);
    }
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return fail("Email delivery is not configured.", 503);
  }

  const { name, company, email, phone, message } = enquiry;
  const safe = {
    name: escapeHtml(name),
    company: escapeHtml(company || "N/A"),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "N/A"),
    message: escapeHtml(message),
  };

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"bigO Studio" <${SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || ENQUIRY_INBOX,
      replyTo: email,
      subject: `New Project Inquiry from ${name} (${company || "Individual"})`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <h3>New Inquiry on bigO Studio</h3>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Company:</strong> ${safe.company}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${safe.message}</p>
      `,
    });
  } catch (err) {
    console.error("Contact SMTP delivery failed:", err instanceof Error ? err.message : err);
    return fail("We couldn't send your message. Please try again or reach out on WhatsApp.", 502);
  }

  console.info("Contact enquiry delivered via SMTP");
  return NextResponse.json({
    success: true,
    delivered: true,
    message: "Message received successfully. We'll be in touch soon!",
  });
}
