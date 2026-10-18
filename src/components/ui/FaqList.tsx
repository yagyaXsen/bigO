import { PlusIcon } from "@/components/icons";

/** Questions as native <details>, so they open without any script */
export function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div className="border-t border-line">
      {items.map(([q, a]) => (
        <details key={q} className="group border-b border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 md:py-6">
            <span className="font-serif text-[20px] leading-[1.35] text-ink transition-colors group-hover:text-accent md:text-[22px]">
              {q}
            </span>
            <PlusIcon className="mt-1.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="max-w-[65ch] pb-6 pr-10 text-[16px] md:text-[17px]">{a}</p>
        </details>
      ))}
    </div>
  );
}
