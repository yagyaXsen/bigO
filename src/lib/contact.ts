/**
 * Contact channels used by the enquiry form and its API route.
 */

/** Public business address shown across the site and used for mailto fallbacks. */
export const CONTACT_EMAIL = "bigo.company2026@gmail.com";

/** Inbox that receives form enquiries sent through FormSubmit and SMTP. */
export const ENQUIRY_INBOX = "aarongangwar@gmail.com";

export const WHATSAPP_NUMBER = "918875326549";

/**
 * Web3Forms access keys are designed to be public (they only allow sending
 * to the inbox registered with the key), so a fallback is safe to ship.
 */
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "034fd680-458e-4ee6-ad35-e85d7a454c82";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Max lengths, enforced by the form and the API route. */
export const FIELD_LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  message: 5000,
} as const;

export interface Enquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}
