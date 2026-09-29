import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  PRELOADER_KEY,
  THEME_KEY,
} from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

/* Inline in <head> so it runs before first paint: apply the saved Night theme
   (no light flash) and skip the intro preloader on repeat visits this session.
   next/script's beforeInteractive waits for the Next runtime, which is too late. */
const initScript = [
  `try{if(localStorage.getItem(${JSON.stringify(THEME_KEY)})==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
  `try{if(sessionStorage.getItem(${JSON.stringify(PRELOADER_KEY)})==="true")document.documentElement.dataset.preloaded="true"}catch(e){}`,
].join(";");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body suppressHydrationWarning className="min-h-full">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
