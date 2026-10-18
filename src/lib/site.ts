/**
 * Canonical site URL for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL
 * once the domain is final; on Vercel the production domain is used otherwise.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "bigO";

export const SITE_TITLE = "bigO — Digital Studio | We build software & AI that runs your business";

export const SITE_DESCRIPTION =
  "bigO is a small, focused studio that designs and builds custom software, web apps and AI automation — you work directly with the people writing the code.";

/** localStorage key for the Night/Day toggle. */
export const THEME_KEY = "bigo-theme";

