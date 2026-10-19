import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/** Shared layout for Privacy and Terms: title, date, numbered sections */
export function LegalPage({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="label">{label}</p>
          <h1 className="mt-6 font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.02em] md:text-[60px]">{title}</h1>
          <p className="mt-4 text-[14px] text-muted">Last updated {updated}</p>
          <div className="mt-6 max-w-[62ch] text-[18px] leading-[1.6]">{intro}</div>
        </section>
        <section className="border-t border-line">
          <div className="container-page grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-20">
            <nav aria-label="On this page" className="hidden md:col-span-4 md:block">
              <ol className="sticky top-24 space-y-2 text-[14px]">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a href={`#s${i + 1}`} className="text-muted transition-colors hover:text-ink">
                      <span className="label mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="space-y-12 md:col-span-8">
              {sections.map((s, i) => (
                <article key={s.heading} id={`s${i + 1}`} className="scroll-mt-24">
                  <h2 className="font-serif text-[26px] font-normal leading-tight">
                    <span className="label mr-3 align-middle text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 max-w-[65ch] space-y-4 text-[16px] leading-[1.7] [&_a]:link [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                    {s.body}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
