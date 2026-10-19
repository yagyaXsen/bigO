import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import { AutoVideo } from "@/components/ui/AutoVideo";

/** A real product screen in a thin browser frame. Recording if there is
 *  one, otherwise the screenshot. Cropped to 16:10 from the top. */
export function Shot({
  project: p,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!p.image) return null;
  return (
    <div className={cn("browser", className)}>
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span className="mono ml-2 truncate text-[11px] text-muted">{p.url}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
        {p.video ? (
          <AutoVideo src={p.video} poster={p.image.src} label={`Screen recording of ${p.image.alt}`} />
        ) : (
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        )}
      </div>
    </div>
  );
}
