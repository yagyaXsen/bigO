import Link from "next/link";
import { ArrowDownIcon } from "@/components/icons";
import { CORE_SERVICES, MORE_SERVICES } from "@/lib/services";

/** Services hero — follows WorkHero: breadcrumb → H1 + intro (xl 8) / index (xl 4). */
export function ServicesHero() {
  return (
    <section className="mxd-container pt-[150px] pb-[110px] md:pt-[200px] md:pb-[140px] xl:pt-[230px] xl:pb-[165px]">
      <div className="mb-[48px] flex items-center gap-2 md:mb-[64px]">
        <Link href="/" className="mxd-mono text-muted-foreground transition-colors hover:text-[color:var(--ink)]">
          Home
        </Link>
        <span className="mxd-mono text-muted-foreground">/</span>
        <span className="mxd-mono text-[color:var(--ink)]">Services</span>
      </div>

      <div className="grid grid-cols-1 gap-x-[60px] gap-y-[60px] xl:grid-cols-12">
        <div className="xl:col-span-8">
          <h1 className="anim-load-rise mxd-display mt-[26px] font-semibold text-[color:var(--ink)] text-[clamp(44px,6vw,120px)] leading-[1.1] tracking-[-3px]">
            Software &amp; AI,
            <br />
            <span className="text-muted-foreground">built end to end</span>
          </h1>
          <div className="anim-load-rise mt-[38px] max-w-[52ch] [--rise-delay:.2s] [--rise-y:24px]">
            <p className="font-sans font-bold text-[clamp(17px,2vw,20px)] leading-[1.4] text-[color:var(--body-text)]">
              We&apos;re developers first: most of our work is custom software and AI automation, plus the websites
              that go with them. Design, branding and marketing are here too, so your product, brand and growth come
              from one team.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-end xl:col-span-4 xl:pt-[6px]">
          <p className="mxd-eyebrow mb-8">/ INDEX</p>
          <ul className="flex flex-col">
            {[...CORE_SERVICES, ...MORE_SERVICES].map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center justify-between gap-4 border-t border-border py-[16px] transition-colors duration-200 hover:border-[color:var(--accent-blue)]/50"
                >
                  <span className="flex items-center gap-6">
                    <span className="mxd-mono text-muted-foreground">[{s.num}]</span>
                    <span className="text-[color:var(--ink)] text-[clamp(17px,1.3vw,20px)] transition-all duration-300 group-hover:translate-x-[6px] group-hover:text-[color:var(--accent-blue)]">
                      {s.title}
                    </span>
                  </span>
                  <ArrowDownIcon className="h-[16px] w-[16px] shrink-0 text-[color:var(--ink)] transition-all duration-200 group-hover:translate-y-1 group-hover:text-[color:var(--accent-blue)]" />
                </a>
              </li>
            ))}
            <li className="border-t border-border" aria-hidden />
          </ul>
        </div>
      </div>
    </section>
  );
}
