"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky in-page index that marks the section currently being read */
export function ScrollSpyNav({ items, label }: { items: { id: string; label: string; num?: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <ol className="border-l border-line">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l-2 py-2 pl-4 text-[14.5px] transition-colors",
                  on ? "border-blue text-ink" : "border-transparent text-muted hover:text-ink",
                )}
              >
                {i.num && <span className="mono pt-px text-[12px]">{i.num}</span>}
                {i.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
