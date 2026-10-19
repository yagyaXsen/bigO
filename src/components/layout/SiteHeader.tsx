"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { THEME_KEY } from "@/lib/site";
import { CONTACT_EMAIL, PHONE_DISPLAY, SOCIAL } from "@/lib/contact";
import { ButtonLink } from "@/components/ui/Button";
import { MoonIcon, SunIcon } from "@/components/icons";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

/* The icon follows the .dark class through CSS, so it is right on first
   paint (the theme is applied in <head> before React loads) */
function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      // private mode — the theme still switches for this visit
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-accent-soft",
        className,
      )}
    >
      <MoonIcon className="h-[18px] w-[18px] dark:hidden" />
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // While the menu is open: no page scroll behind it, Escape closes it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-[26px] font-medium leading-none tracking-[-0.02em] text-ink"
        >
          bigO
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-[15px] transition-colors hover:text-ink",
                    isActive(item.href) ? "text-ink underline decoration-line-strong underline-offset-[6px]" : "text-text",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <ButtonLink href="/contact" className="hidden h-10 sm:inline-flex">
            Book a call
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="label inline-flex h-10 items-center px-2 text-ink lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg md:top-[72px] lg:hidden">
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="border-t border-line">
              {[{ label: "Home", href: "/" }, ...NAV].map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block py-4 font-serif text-[28px] leading-tight text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-8 w-full">
              Book a free call
            </ButtonLink>
            <div className="mt-8 space-y-1 text-[15px]">
              <a href={`mailto:${CONTACT_EMAIL}`} className="link block w-fit">
                {CONTACT_EMAIL}
              </a>
              <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="link block w-fit">
                WhatsApp {PHONE_DISPLAY}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
