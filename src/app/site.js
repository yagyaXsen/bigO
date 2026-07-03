/* ===== site.js - bigO shared config (EDIT YOUR DETAILS HERE) ===== */
export const CONTACT = {
  whatsapp: "918875326549", // TODO: your number, country code, digits only (no +, no spaces)
  email: "aarongangwar@gmail.com",
  city: "India", // TODO: your city / location
};

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

// Social links - leave "" to hide a link. TODO: add your real profiles.
export const SOCIALS = {
  instagram: "", // e.g. "https://instagram.com/yourbigo"
  linkedin: "", // e.g. "https://linkedin.com/company/yourbigo"
};

// Used for the browser-tab title + social share cards.
export const SITE = {
  name: "bigO",
  tagline: "We build, run, and grow your business online.",
  url: "https://bigo.studio", // TODO: your live domain
  ogImage:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=75", // TODO: replace with a branded 1200×630 image
};
