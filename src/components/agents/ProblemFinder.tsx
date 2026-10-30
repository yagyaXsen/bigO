"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PROBLEM_FINDER, agentById } from "@/lib/agents";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { useAgentSelection, useBookAction } from "@/components/agents/AgentSelection";

/** Visitors pick the sentence that describes their company and see the
 *  agent for it and what it would take off their team. */
export function ProblemFinder() {
  const [index, setIndex] = useState(0);
  const { setAgentId } = useAgentSelection();
  const book = useBookAction();
  const item = PROBLEM_FINDER[index];
  const agent = agentById(item.agent)!;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <ul className="border-t border-ink lg:col-span-6" aria-label="Problems">
        {PROBLEM_FINDER.map((p, i) => {
          const on = i === index;
          return (
            <li key={p.problem} className="border-b border-line">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setIndex(i)}
                className="group flex w-full cursor-pointer items-center gap-4 py-3.5 text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    on ? "border-blue bg-blue" : "border-line-strong group-hover:border-ink",
                  )}
                >
                  {on && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
                </span>
                <span className={cn("flex-1 text-[16.5px] transition-colors", on ? "font-semibold text-ink" : "text-text group-hover:text-ink")}>
                  {p.problem}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="lg:col-span-6" aria-live="polite">
        <div className="tone-ink bg-paper p-6 md:p-8 lg:sticky lg:top-40">
          <p className="mono text-[12px] text-muted">The agent for this</p>
          <p className="t-2 mt-3">{agent.name}</p>
          <p className="mt-6 text-[13px] font-semibold text-muted">What it takes off your team</p>
          <ul className="mt-3 border-t border-line">
            {agent.automates.map((t) => (
              <li key={t} className="flex gap-3 border-b border-line py-2.5 text-[15px] text-ink">
                <span aria-hidden className="text-blue">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px]">
            <span className="font-semibold text-ink">Your team: </span>
            {agent.team}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href="#demo" tone="blue" onClick={book("demo", agent.id)}>
              Book a demo of this agent
            </ButtonLink>
            <ArrowLink href="#agents" onClick={() => setAgentId(agent.id)}>
              See it in detail
            </ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}
