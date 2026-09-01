"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CartIcon, MoonIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/ScrambleText";

const NAV_MENU = [
  {
    title: "01 Home",
    links: ["Branding studio", "Software development company", "Creative agency", "Freelancer portfolio", "Design studio", "Web Developer", "Personal portfolio", "Digital agency", "Web Studio", "Digital designer"]
  },
  {
    title: "02 Works",
    links: ["Works default", "Works grid", "Works grid sticky", "Project details"]
  },
  {
    title: "03 Pages",
    links: ["About me", "About us", "Services", "Our team", "Pricing", "FAQ page", "404 error page", "Landing page"]
  },
  {
    title: "04 Insights",
    links: ["Blog standard", "Blog creative", "Single post"]
  },
  {
    title: "05 Contact",
    links: ["Contact"]
  }
];

const THEME_KEY = "bigo-theme";

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Read persisted theme on mount and sync the `.dark` class.
  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const dark = stored === "dark";
    document.documentElement.classList.toggle("dark", dark);
    const timer = setTimeout(() => {
      setIsDark(dark);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  };

  // Lock body scroll + close on Escape while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const Logo = (
    <Link href="/" className="flex items-center text-[color:var(--ink)]">
      <span className="font-mono text-[20px] font-bold uppercase leading-none text-[color:var(--ink)] md:text-[22px]">
        <ScrambleText text="bigO" />
      </span>
    </Link>
  );

  const Controls = (
    <div className="flex items-center gap-2 pr-[14px] md:gap-[35px] md:pr-[35px]">
      {/* Start Project — caption md+ only, icon always */}
      <Link
        href="/contact"
        aria-label="Start Project"
        className="flex items-center gap-[14px] text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)]"
      >
        <span className="hidden whitespace-nowrap font-mono text-[18px] font-bold uppercase tracking-[-0.5px] md:inline-flex">
          <ScrambleText text="Start Project" />
        </span>
        <CartIcon className="h-[19px] w-[19px] md:h-4 md:w-4" aria-hidden="true" />
      </Link>

      {/* Night / dark-mode switch — "NIGHT / ☾" */}
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label="light/dark mode"
        className="flex items-center text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)]"
      >
        <span className="hidden whitespace-nowrap font-mono text-[18px] font-bold uppercase tracking-[-0.5px] after:mx-[10px] after:content-['/'] md:inline-flex">
          <ScrambleText text={isDark ? "Day" : "Night"} />
        </span>
        <MoonIcon className="h-[21px] w-[21px]" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <>
      {/* Header — absolute like the reference (.mxd-header): scrolls away with
          the page; the hamburger below stays fixed. Right padding reserves the
          hamburger zone (55px + its offset). */}
      <header className="absolute left-0 top-0 z-40 flex w-full items-start justify-between pl-[30px] pr-[85px] pt-[30px] md:pl-[60px] md:pr-[115px] min-[1600px]:pl-[100px] min-[1600px]:pr-[155px]">
        {Logo}
        {Controls}
      </header>

      {/* Hamburger — fixed, mix-blend-difference, two 50px lines (.mxd-menu__hamburger) */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
        aria-expanded={menuOpen}
        className="fixed right-[30px] top-[30px] z-[70] flex h-9 w-[55px] cursor-pointer flex-col items-center justify-center gap-[8px] overflow-hidden mix-blend-difference md:right-[60px] md:h-10 min-[1600px]:right-[100px]"
      >
        <span
          className={cn(
            "h-[2px] w-[50px] flex-none bg-white transition-transform duration-500 ease-[cubic-bezier(.23,.65,.74,1.09)] will-change-transform",
            menuOpen && "translate-y-[5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "h-[2px] w-[50px] flex-none bg-white transition-transform duration-500 ease-[cubic-bezier(.23,.65,.74,1.09)] will-change-transform",
            menuOpen && "-translate-y-[5px] -rotate-45",
          )}
        />
      </button>

      {/* Menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background transition-[opacity,transform] duration-500 ease-out",
          menuOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        {/* Top bar mirroring the header */}
        <div className="flex w-full items-start justify-between pl-[30px] pr-[85px] pt-[30px] md:pl-[60px] md:pr-[115px] min-[1600px]:pl-[100px] min-[1600px]:pr-[155px]">
          <div onClick={() => setMenuOpen(false)}>{Logo}</div>
          {Controls}
        </div>

        {/* Menu body */}
        <div className="mxd-container flex flex-1 flex-col gap-12 pt-[clamp(2rem,6vh,5rem)] xl:flex-row xl:items-center xl:justify-between">
          <nav className="flex w-full flex-col xl:flex-row xl:justify-between gap-12 xl:gap-8">
            {NAV_MENU.map((col) => (
              <div key={col.title} className="flex flex-col">
                <span className="mxd-mono mb-6 text-muted-foreground">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={link === "Contact" ? "/contact" : "#"}
                        onClick={() => setMenuOpen(false)}
                        className="text-[color:var(--ink)] transition-colors hover:text-muted-foreground text-[clamp(16px,1.2vw,18px)] leading-[1.3] font-medium"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>


        </div>
      </div>
    </>
  );
}
