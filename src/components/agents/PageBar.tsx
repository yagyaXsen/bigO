"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { useBookAction } from "@/components/agents/AgentSelection";

const LINKS = [
  { id: "problems", label: "Find your agent" },
  { id: "agents", label: "Agents" },
  { id: "calling", label: "Calling" },
  { id: "how", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "book", label: "Book" },
];

/** Desktop: a sticky bar under the site header with the page's sections,
 *  the one being read marked. */
export function PageBar() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky top-[72px] z-40 hidden border-b border-line bg-paper/95 backdrop-blur-sm md:block">
      <div className="frame flex h-14 items-center justify-between gap-6">
        <nav aria-label="bigO Agents" className="flex min-w-0 items-center gap-7">
          <ul className="flex items-center gap-5 overflow-x-auto lg:gap-6">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "location" : undefined}
                  className={cn(
                    "relative block whitespace-nowrap py-4 text-[14px] transition-colors hover:text-ink",
                    active === l.id ? "text-ink" : "text-muted",
                  )}
                >
                  {l.label}
                  {active === l.id && <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-blue" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

/** Mobile: a booking bar fixed to the bottom of the screen, out of the way
 *  once the booking section or the footer is on screen. */
export function MobileBookBar() {
  const [hidden, setHidden] = useState(false);
  const book = useBookAction();

  useEffect(() => {
    const targets = [document.getElementById("book"), document.querySelector("footer")].filter((e): e is HTMLElement => !!e);
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHidden(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 md:hidden",
        hidden && "pointer-events-none translate-y-full",
      )}
      inert={hidden}
    >
      <div className="flex items-center gap-4">
        <ButtonLink href="#demo" onClick={book("demo")} className="flex-1 justify-center">
          Book a demo
        </ButtonLink>
        <a href="#prebook" onClick={book("prebook")} className="link shrink-0 text-[15px] font-semibold">
          Pre-book
        </a>
      </div>
    </div>
  );
}
