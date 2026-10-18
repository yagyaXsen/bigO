import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  num?: string;
  label?: string;
  title?: ReactNode;
  intro?: ReactNode;
  /** A link or note under the intro, e.g. "All work →" */
  aside?: ReactNode;
  /** "invert" = the page's one dark section */
  tone?: "default" | "invert";
  className?: string;
  children?: ReactNode;
}

/** A numbered page section: label on the left, serif title and intro on the
 *  right (stacked on phones), content below. Divided by a thin top line. */
export function Section({ id, num, label, title, intro, aside, tone = "default", className, children }: SectionProps) {
  return (
    <section id={id} className={cn(tone === "invert" ? "tone-invert" : "border-t border-line", className)}>
      <div className="container-page py-20 md:py-28">
        {(label || title) && <SectionHeader num={num} label={label} title={title} intro={intro} aside={aside} />}
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ num, label, title, intro, aside }: Omit<SectionProps, "id" | "tone" | "className" | "children">) {
  return (
    <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:gap-8">
      {label && (
        <p className="label md:col-span-4 md:pt-3">
          {num && <span className="text-ink">{num}</span>}
          {num && <span className="mx-2">—</span>}
          {label}
        </p>
      )}
      <div className={cn("md:col-span-8", !label && "md:col-start-5")}>
        {title && (
          <h2 className="font-serif text-[34px] font-normal leading-[1.08] tracking-[-0.015em] md:text-[44px] lg:text-[52px]">
            {title}
          </h2>
        )}
        {intro && <p className="mt-5 max-w-[60ch] text-[17px] md:text-[18px]">{intro}</p>}
        {aside && <div className="mt-6">{aside}</div>}
      </div>
    </div>
  );
}

/** Page title block for Services, Work and Contact */
export function PageHeader({ label, title, lead, children }: { label: string; title: ReactNode; lead: ReactNode; children?: ReactNode }) {
  return (
    <section className="container-page pt-16 pb-16 md:pt-24 md:pb-24">
      <p className="label">{label}</p>
      <h1 className="mt-6 max-w-[20ch] font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.02em] md:text-[60px] lg:text-[72px]">
        {title}
      </h1>
      <p className="mt-6 max-w-[58ch] text-[18px] leading-[1.55] md:text-[20px]">{lead}</p>
      {children}
    </section>
  );
}
