import Image from "next/image";
import { cn } from "@/lib/utils";

/** A framed photo that fills its box; size the box with aspect-* classes */
export function Photo({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden border border-line bg-surface", className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1296px) 1200px, 100vw" className="object-cover dark:brightness-90" />
    </div>
  );
}
