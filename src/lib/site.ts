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

export const SITE_TITLE = "bigO — Custom software and AI automation for growing businesses";

export const SITE_DESCRIPTION =
  "bigO is a small engineering studio in Delhi NCR. We build web apps, client portals, AI chatbots and automated workflows for businesses that have outgrown spreadsheets and manual work.";

/** localStorage key for the light/dark toggle. */
export const THEME_KEY = "bigo-theme";
