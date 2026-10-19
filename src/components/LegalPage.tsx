import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";

/** Quiet long-form reading layout for Privacy and Terms */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  label?: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}) {
  const index = sections.map((s, i) => ({ id: `s${i + 1}`, label: s.heading, num: String(i + 1).padStart(2, "0") }));
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="frame grid gap-10 pt-14 pb-24 md:pt-20 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <ScrollSpyNav items={index} label="On this page" />
          </aside>
          <article className="lg:col-span-8 lg:col-start-5">
            <h1 className="t-1">{title}</h1>
            <p className="mono mt-4 text-muted">Last updated {updated}</p>
            <div className="t-lead mt-8 max-w-[60ch]">{intro}</div>
            <div className="mt-14 space-y-12 border-t border-ink pt-12">
              {sections.map((s, i) => (
                <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-28">
                  <h2 className="t-3 flex gap-4">
                    <span className="mono pt-1.5 text-[12px] font-normal text-blue">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 max-w-[64ch] space-y-4 pl-9 text-[16.5px] leading-[1.7] [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
