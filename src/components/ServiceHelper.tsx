"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HELPER, SERVICES } from "@/lib/content";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";

/** One answer row: a square radio mark + label (real radio semantics) */
function Option({ name, value, checked, onChange, children }: { name: string; value: string; checked: boolean; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-4 border-b border-line py-3.5 text-[16px] transition-colors",
        checked ? "text-ink" : "text-text hover:text-ink",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue",
          checked ? "border-blue bg-blue" : "border-line-strong",
        )}
      >
        {checked && <span className="h-1.5 w-1.5 bg-white" />}
      </span>
      {children}
    </label>
  );
}

/** "Find the service that fits": two questions, one honest suggestion */
export function ServiceHelper() {
  const [problem, setProblem] = useState<string | null>(null);
  const [users, setUsers] = useState<string | null>(null);
  const result = problem && users ? HELPER.pick(problem, users) : null;
  const main = result && SERVICES.find((s) => s.id === result[0]);
  const also = result?.[2] ? SERVICES.find((s) => s.id === result[2]) : null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <fieldset className="lg:col-span-5">
        <legend className="mb-3 text-[14px] font-semibold text-ink">
          <span className="mono mr-3 text-blue">1</span>What&apos;s the main problem?
        </legend>
        <div className="border-t border-ink">
          {HELPER.problems.map((o) => (
            <Option key={o.id} name="helper-problem" value={o.id} checked={problem === o.id} onChange={setProblem}>
              {o.label}
            </Option>
          ))}
        </div>
      </fieldset>
      <fieldset disabled={!problem} className={cn("transition-opacity lg:col-span-3", !problem && "opacity-40")}>
        <legend className="mb-3 text-[14px] font-semibold text-ink">
          <span className="mono mr-3 text-blue">2</span>Who will use it?
        </legend>
        <div className="border-t border-ink">
          {HELPER.users.map((o) => (
            <Option key={o.id} name="helper-users" value={o.id} checked={users === o.id} onChange={setUsers}>
              {o.label}
            </Option>
          ))}
        </div>
      </fieldset>
      <div className="lg:col-span-4" aria-live="polite">
        {main && result ? (
          <div className="tone-ink h-full p-6 md:p-7">
            <p className="text-[13px] font-semibold text-blue">Start here</p>
            <h3 className="t-2 mt-3">{main.title}</h3>
            <p className="mt-4 text-[15.5px]">{result[1]}</p>
            {also && <p className="mt-3 text-[14px] text-muted">Often paired with {also.title.charAt(0).toLowerCase() + also.title.slice(1)}.</p>}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={`/contact?type=${main.id}`} tone="blue">
                Discuss this
              </ButtonLink>
              <ArrowLink href={`#${main.id}`}>Read more</ArrowLink>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[200px] items-end border border-dashed border-line-strong p-6">
            <p className="max-w-[26ch] text-[15px] text-muted">Answer both and we&apos;ll point you to where most clients like you start.</p>
          </div>
        )}
      </div>
    </div>
  );
}
