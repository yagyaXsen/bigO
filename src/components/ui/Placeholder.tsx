/** Renders copy with [bracketed] parts marked as placeholders (prices,
 *  timelines, results, names) so they're easy to spot and replace. */
export function Ph({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]*\])/g).map((part, i) =>
        /^\[.*\]$/.test(part) ? (
          <span key={i} className="placeholder" title="Placeholder: replace with real content">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Stand-in for a screenshot that hasn't been supplied yet */
export function ScreenshotPlaceholder({ caption }: { caption: string }) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 border border-dashed border-line-strong bg-surface px-6 text-center">
      <p className="label">Screenshot placeholder</p>
      <p className="text-[15px] text-muted">{caption}</p>
    </div>
  );
}
