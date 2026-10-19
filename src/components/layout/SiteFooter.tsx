import Link from "next/link";
import { CONTACT_EMAIL, PHONE_DISPLAY, SOCIAL } from "@/lib/contact";

const STUDIO = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="font-serif text-[30px] font-medium leading-none tracking-[-0.02em] text-ink">
            bigO
          </Link>
          <p className="mt-5 max-w-[36ch] text-[15px] text-muted">
            Custom software and AI automation for growing businesses. Based in Delhi NCR, working with clients in
            India and abroad.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="label">Studio</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {STUDIO.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-text transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label">Contact</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-text transition-colors hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="text-text transition-colors hover:text-ink">
                WhatsApp {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="label">Follow</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-text transition-colors hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-text transition-colors hover:text-ink">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} bigO. All rights reserved.</p>
          <a href="#top" className="w-fit transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
