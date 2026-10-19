"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HELPER, SERVICES } from "@/lib/content";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-4 py-2 text-left text-[15px] transition-colors",
        on ? "border-accent bg-accent text-surface" : "border-line-strong bg-surface text-ink hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}

/** Two questions → the service that fits, with a link to discuss it */
export function ServiceHelper() {
  const [problem, setProblem] = useState<string | null>(null);
  const [users, setUsers] = useState<string | null>(null);
  const result = problem && users ? HELPER.pick(problem, users) : null;
  const main = result && SERVICES.find((s) => s.id === result[0]);
  const also = result?.[2] ? SERVICES.find((s) => s.id === result[2]) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="space-y-8 lg:col-span-7">
        <div>
          <p className="label">
            <span className="text-ink">1</span>
            <span className="mx-2">—</span>
            What&apos;s the main problem?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {HELPER.problems.map((o) => (
              <Choice key={o.id} on={problem === o.id} onClick={() => setProblem(o.id)}>
                {o.label}
              </Choice>
            ))}
          </div>
        </div>
        <div className={cn("transition-opacity", !problem && "pointer-events-none opacity-40")}>
          <p className="label">
            <span className="text-ink">2</span>
            <span className="mx-2">—</span>
            Who will use it?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {HELPER.users.map((o) => (
              <Choice key={o.id} on={users === o.id} onClick={() => setUsers(o.id)}>
                {o.label}
              </Choice>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5" aria-live="polite">
        {main && result ? (
          <div className="rounded-lg border border-accent/40 bg-surface p-6">
            <p className="label text-accent">Our suggestion</p>
            <div className="mt-4 flex items-center gap-3">
              <ServiceIcon id={main.id} />
              <h3 className="font-serif text-[24px] leading-tight">{main.title}</h3>
            </div>
            <p className="mt-4 text-[15.5px]">{result[1]}</p>
            {also && <p className="mt-3 text-[14px] text-muted">Often paired with: {also.title.toLowerCase()}.</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={`/contact?type=${main.id}`}>Discuss this</ButtonLink>
              <ArrowLink href={`#${main.id}`}>Read more</ArrowLink>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-lg border border-dashed border-line-strong p-6 text-center">
            <p className="max-w-[28ch] text-[15px] text-muted">Answer the two questions and we&apos;ll suggest where to start.</p>
          </div>
        )}
      </div>
    </div>
  );
}
