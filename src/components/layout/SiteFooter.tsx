import Link from "next/link";
import { CONTACT_EMAIL, PHONE_DISPLAY, SOCIAL } from "@/lib/contact";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

const PAGES = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "AI Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

/** Every page ends here: one clear next step, then the practical details.
 *  `cta={false}` on pages that already are the next step (Contact). */
export function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="tone-ink border-t border-line">
      {cta && (
        <div className="frame grid gap-10 pt-20 pb-16 md:grid-cols-12 md:pt-28 md:pb-24">
          <h2 className="t-1 md:col-span-8">Tell us what&apos;s slowing your business down.</h2>
          <div className="flex flex-col justify-end gap-6 md:col-span-4">
            <p className="text-[17px]">
              A free call, as long as it needs to be. We&apos;ll tell you honestly whether software is the answer.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact" tone="blue">
                Start a project
              </ButtonLink>
              <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="link text-[15px] font-semibold">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="frame">
        <div className={`grid gap-10 py-14 md:grid-cols-12 ${cta ? "border-t border-line" : "pt-20"}`}>
          <div className="md:col-span-5">
            <Link href="/" aria-label="bigO, home" className="text-[40px] leading-none">
              <Logo />
            </Link>
            <p className="mt-5 max-w-[34ch] text-[15px] text-muted">
              A small software studio in Delhi NCR, building for businesses in India and abroad.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <ul className="space-y-2 text-[15px]">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-text transition-colors hover:text-ink">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-2 text-[15px] md:col-span-3">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-text transition-colors hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="text-text transition-colors hover:text-ink">
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
          <ul className="space-y-2 text-[15px] md:col-span-2">
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
        <div className="flex flex-col gap-3 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} bigO</p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
