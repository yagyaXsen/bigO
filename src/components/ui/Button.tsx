import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

const VARIANTS = {
  primary: "bg-ink text-bg hover:bg-accent",
  secondary: "border border-line-strong text-ink hover:border-ink",
};

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof VARIANTS;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", external, className, children }: ButtonLinkProps) {
  const cls = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium transition-colors duration-200",
    VARIANTS[variant],
    className,
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Text link with an arrow, e.g. "All work →". External links get ↗. */
export function ArrowLink({ href, external, className, children }: Omit<ButtonLinkProps, "variant">) {
  const cls = cn(
    "group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors hover:text-accent",
    className,
  );
  const Icon = external ? ArrowUpRightIcon : ArrowRightIcon;
  const icon = <Icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      {icon}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
