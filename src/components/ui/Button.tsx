import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

interface LinkProps {
  href: string;
  external?: boolean;
  className?: string;
  /** Only from client components; runs before the browser follows the link */
  onClick?: () => void;
  children: ReactNode;
}

function Anchor({ href, external, className, onClick, children }: LinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  // Same-page anchors stay plain links, so the browser scrolls and fires hashchange
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** The one solid button: square ink block, arrow nudges on hover */
export function ButtonLink({ href, external, className, onClick, children, tone = "ink" }: LinkProps & { tone?: "ink" | "blue" }) {
  return (
    <Anchor
      href={href}
      external={external}
      onClick={onClick}
      className={cn(
        "group inline-flex h-12 items-center gap-3 px-5 text-[15px] font-semibold transition-colors duration-200",
        /* text-paper, not white: inside ink sections the colours invert, and
           paper keeps the label readable on either button */
        tone === "ink" ? "bg-ink text-paper hover:bg-blue" : "bg-blue text-paper hover:bg-ink",
        className,
      )}
    >
      {children}
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Anchor>
  );
}

/** Secondary action: text with a hairline underline and an arrow */
export function ArrowLink({ href, external, className, onClick, children }: LinkProps) {
  const Icon = external ? ArrowUpRightIcon : ArrowRightIcon;
  return (
    <Anchor
      href={href}
      external={external}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[15px] font-semibold text-ink transition-colors hover:border-blue hover:text-blue",
        className,
      )}
    >
      {children}
      <Icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Anchor>
  );
}
