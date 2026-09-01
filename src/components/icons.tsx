import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** bigO logo mark */
export function LogoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 42.4 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
    </svg>
  );
}

/** Cart / say-hello glyph */
export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.1,15.6h2.4v2.4h-2.4v-2.4ZM10.2,18h2.4v-2.4h-2.4v2.4ZM14.9,4.7H5.5V0H.8v2.4h2.4v11.8h9.4v-2.4h-7.1v-4.7h9.4v2.4h2.4v-4.7h-2.4ZM12.5,11.8h2.4v-2.4h-2.4v2.4Z" />
    </svg>
  );
}

/** Moon (Night / dark-mode toggle) */
export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.7,0h7.7v2.6h-2.6v2.6h-2.6v7.7h2.6v2.6h2.6v2.6h-7.7v-2.6h-2.6v-2.6h-2.6v-7.7h2.6v-2.6h2.6V0Z" />
    </svg>
  );
}

/** Pixel plus (scroll-to-explore / back-to-top marker) */
export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
    </svg>
  );
}

/** Down arrow (pixel) — scroll indicator */
export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
    </svg>
  );
}

/** Up-right diagonal arrow (external link) */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z M0,18h3.6v-3.6H0V18z" />
    </svg>
  );
}

/** Up-left diagonal arrow */
export function ArrowUpLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0,7.2h3.6v3.6H0V7.2z M10.8,3.6V0H7.2v3.6H3.6v3.6h3.6V18h3.6V7.2h3.6V3.6H10.8z M14.4,7.2v3.6H18V7.2H14.4z" />
    </svg>
  );
}

/** Hamburger / close menu — two lines */
export function MenuBarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect y="1" width="24" height="1.6" fill="currentColor" />
      <rect y="8" width="24" height="1.6" fill="currentColor" />
    </svg>
  );
}
