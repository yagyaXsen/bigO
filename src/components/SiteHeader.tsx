"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CartIcon, MoonIcon, ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { THEME_KEY } from "@/lib/site";

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
        className="flex items-center text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent-blue)] cursor-pointer"
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
          "fixed inset-0 z-[60] flex flex-col justify-between bg-background transition-[opacity,transform] duration-500 ease-out overflow-y-auto pb-12",
          menuOpen
            ? "scale-100 opacity-100 pointer-events-auto"
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
        <div className="mxd-container flex flex-1 flex-col justify-center py-[clamp(2rem,6vh,5rem)]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            {/* Col 1: Main Pages */}
            <div className="md:col-span-6 flex flex-col">
              <span className="mxd-mono mb-6 text-muted-foreground">
                / 01 NAVIGATION
              </span>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-center gap-4 text-[color:var(--ink)] text-[clamp(32px,4vw,64px)] font-bold tracking-[-2px] transition-colors hover:text-[color:var(--accent-blue)]"
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-center gap-4 text-[color:var(--ink)] text-[clamp(32px,4vw,64px)] font-bold tracking-[-2px] transition-colors hover:text-[color:var(--accent-blue)]"
                  >
                    <span>Work</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-center gap-4 text-[color:var(--ink)] text-[clamp(32px,4vw,64px)] font-bold tracking-[-2px] transition-colors hover:text-[color:var(--accent-blue)]"
                  >
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Direct Contact */}
            <div className="md:col-span-3 flex flex-col">
              <span className="mxd-mono mb-6 text-muted-foreground">
                / 02 CONTACT
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:bigo.company2026@gmail.com"
                  className="text-[color:var(--ink)] text-[clamp(16px,1.3vw,20px)] leading-relaxed transition-colors hover:text-[color:var(--accent-blue)]"
                >
                  bigo.company2026@gmail.com
                </a>
                <a
                  href="https://wa.me/918875326549"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--ink)] text-[clamp(16px,1.3vw,20px)] leading-relaxed transition-colors hover:text-[color:var(--accent-blue)]"
                >
                  +91 8875326549
                </a>
              </div>
            </div>

            {/* Col 3: Socials */}
            <div className="md:col-span-3 flex flex-col">
              <span className="mxd-mono mb-6 text-muted-foreground">
                / 03 SOCIALS
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="https://www.instagram.com/thebigoteam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between w-full text-[color:var(--ink)] text-[clamp(16px,1.3vw,20px)] transition-colors hover:text-[color:var(--accent-blue)]"
                  >
                    <span>Instagram</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/bigocompany/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between w-full text-[color:var(--ink)] text-[clamp(16px,1.3vw,20px)] transition-colors hover:text-[color:var(--accent-blue)]"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/918875326549"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between w-full text-[color:var(--ink)] text-[clamp(16px,1.3vw,20px)] transition-colors hover:text-[color:var(--accent-blue)]"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
