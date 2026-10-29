"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { THEME_KEY } from "@/lib/site";
import { CONTACT_EMAIL, PHONE_DISPLAY, SOCIAL } from "@/lib/contact";
import { Logo } from "@/components/ui/Logo";
import { ArrowRightIcon, MoonIcon, SunIcon } from "@/components/icons";

/* Work first: evidence is what a careful buyer looks for */
const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "AI Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

/* The icon follows the .dark class through CSS, so it is right on first
   paint (the theme is applied in <head> before React loads) */
function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      // private mode: the theme still switches for this visit
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ink transition-colors hover:text-blue"
    >
      <MoonIcon className="h-[18px] w-[18px] dark:hidden" />
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // A hairline and solid background appear once the page moves under it
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href: string) => pathname === href;

  return (
    <header
      id="top"
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-300",
        /* No backdrop blur while the menu is open: backdrop-filter would make the
           header the containing block of the fixed full-screen menu */
        open ? "border-b border-line bg-paper" : scrolled ? "border-b border-line bg-paper/95 backdrop-blur-sm" : "border-b border-transparent bg-paper",
      )}
    >
      <div className="frame flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" onClick={() => setOpen(false)} aria-label="bigO, home" className="text-[28px] leading-none">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[15px] font-medium transition-colors hover:text-ink",
                    isActive(item.href) ? "text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-blue" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/contact"
            className="group ml-2 hidden h-10 items-center gap-2 bg-ink px-4 text-[14px] font-semibold text-paper transition-colors hover:bg-blue md:inline-flex"
          >
            Start a project
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 cursor-pointer items-center gap-2.5 pl-2 text-[15px] font-semibold text-ink md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden className="relative h-3 w-5">
              <span className={cn("absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300", open ? "top-1.5 rotate-45" : "top-0.5")} />
              <span className={cn("absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300", open ? "top-1.5 -rotate-45" : "top-2.5")} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-paper md:hidden">
          <nav aria-label="Mobile" className="frame flex-1 pt-6">
            <ul>
              {[{ label: "Home", href: "/" }, ...NAV].map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={cn("t-1", isActive(item.href) && "text-blue")}>{item.label}</span>
                    <span className="mono text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="frame space-y-1 pb-10 pt-8 text-[16px]">
            <p className="mb-3 text-[14px] text-muted">Talk to us directly</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="link block w-fit break-all">
              {CONTACT_EMAIL}
            </a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="link block w-fit">
              WhatsApp {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
