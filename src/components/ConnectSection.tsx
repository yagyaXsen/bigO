"use client";

import { ArrowUpRightIcon } from "@/components/icons";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useSlideDownLine } from "@/hooks/useScrollAnimations";
import { useInUp } from "@/hooks/useScrollAnimations";

const SOCIALS = [
  { num: "01", label: "Community", href: "#" },
  { num: "02", label: "Instagram", href: "https://www.instagram.com/thebigoteam/" },
  { num: "03", label: "LinkedIn", href: "https://www.linkedin.com/in/alok-kumar-40681b323/" },
  { num: "04", label: "WhatsApp", href: "https://wa.me/918875326549" },
] as const;

/**
 * Connect section — reference numbered social list.
 * Heading + eyebrow on the left, numbered links on the right. Each link label
 * slides down from behind its top divider (reference `anim-uni-slide-down`);
 * on hover the label recolors to accent, scrambles, and the arrow nudges out.
 */
export function ConnectSection() {
  const listRef = useSlideDownLine<HTMLUListElement>(
    ".connect-mask",
    ".connect-inner",
  );
  const headRef = useInUp<HTMLDivElement>();

  return (
    <section className="mxd-container pt-[165px] pb-[180px] bg-[color:var(--accent-blue)]">
      <div className="grid grid-cols-1 gap-x-[60px] gap-y-[48px] xl:grid-cols-12">
        {/* Left — eyebrow + heading */}
        <div ref={headRef} className="xl:col-span-4">
          <h2 className="mxd-display text-white text-[75px] font-semibold leading-[1.1] tracking-[-3px]">
            Connect
          </h2>
        </div>

        {/* Right — numbered link list */}
        <ul ref={listRef} className="xl:col-span-8 xl:pt-[6px]">
          {SOCIALS.map(({ num, label, href }) => (
            <li key={num}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-6 border-t border-white/20 py-[26px] md:py-[30px]"
              >
                <span className="flex items-baseline gap-[24px] md:gap-[40px]">
                  <span className="mxd-mono text-white/60">[{num}]</span>
                  <span className="connect-mask overflow-hidden py-[2px]">
                    <span className="connect-inner inline-block">
                      <ScrambleText
                        text={label}
                        triggerOn="hover"
                        className="mxd-display block text-white text-[32px] leading-[1.1] tracking-[-1px] transition-colors duration-300 md:text-[44px] xl:text-[52px]"
                      />
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon
                  className="h-[22px] w-[22px] shrink-0 text-white transition-transform duration-300 ease-[cubic-bezier(.23,.65,.74,1.09)] group-hover:-translate-y-1 group-hover:translate-x-1 md:h-[26px] md:w-[26px]"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
          <li className="border-t border-white/20" aria-hidden />
        </ul>
      </div>
    </section>
  );
}
