/** Questions as native <details>, so they work without scripts. The mark
 *  turns from + to − when open. */
export function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div className="border-t border-ink">
      {items.map(([q, a], i) => (
        <details key={q} className="group border-b border-line">
          <summary className="flex cursor-pointer items-baseline gap-5 py-5 md:py-6">
            <span className="mono w-6 shrink-0 text-muted">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-3 flex-1 transition-colors group-hover:text-blue">{q}</span>
            <span aria-hidden className="relative h-3.5 w-3.5 shrink-0 self-center">
              <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-ink" />
              <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 pl-11 pr-8 text-[16px] md:text-[17px]">{a}</p>
        </details>
      ))}
    </div>
  );
}
