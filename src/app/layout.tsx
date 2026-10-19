import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, THEME_KEY } from "@/lib/site";
import "./globals.css";

/* Fonts ship with the site (variable woff2, Latin, SIL Open Font License),
   so builds never depend on Google Fonts being reachable.
   Schibsted Grotesk: display. IBM Plex Sans: body. IBM Plex Mono: data. */
const schibsted = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
});

const plex = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-wght-normal.woff2", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-wght-italic.woff2", style: "italic" },
  ],
  variable: "--font-plex",
  weight: "100 700",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

/* Inline in <head> so it runs before first paint and a saved dark theme
   doesn't flash light. */
const initScript = `document.documentElement.classList.add("js");try{if(localStorage.getItem(${JSON.stringify(THEME_KEY)})==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${schibsted.variable} ${plex.variable} ${plexMono.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body suppressHydrationWarning className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
