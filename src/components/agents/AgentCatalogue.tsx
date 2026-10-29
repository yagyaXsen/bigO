"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AGENTS, DEPARTMENTS, type Agent, type Department } from "@/lib/agents";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { useAgentSelection, useBookAction } from "@/components/agents/AgentSelection";

const deptLabel = (d: Department) => DEPARTMENTS.find((x) => x.id === d)?.label ?? "";

/** One agent, always in the same order: the problem, how it's done today,
 *  what the agent automates, what stays with people, then an example and
 *  the way to book it. Beside the list on desktop, under the row on mobile. */
function Detail({ agent }: { agent: Agent }) {
  const book = useBookAction();
  return (
    <div className="border border-line bg-raised p-6 md:p-8">
      <p className="mono text-[12px] text-muted">
        {deptLabel(agent.department)} <span className="mx-1 text-line-strong">/</span> {agent.channels.join(" · ")}
      </p>
      <h3 className="t-2 mt-3">{agent.name}</h3>
      <p className="mt-4 border-l-2 border-signal pl-4 text-[17px] leading-relaxed text-ink">{agent.problem}</p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[13px] font-semibold text-muted">How it&apos;s done today</p>
          <ul className="mt-3 border-t border-line">
            {agent.today.map((t) => (
              <li key={t} className="flex gap-3 border-b border-line py-2.5 text-[14.5px] text-muted">
                <span aria-hidden>–</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-blue">What the agent automates</p>
          <ul className="mt-3 border-t border-line">
            {agent.automates.map((t) => (
              <li key={t} className="flex gap-3 border-b border-line py-2.5 text-[14.5px] text-ink">
                <span aria-hidden className="text-blue">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 bg-paper-2 px-4 py-3 text-[15px] text-ink">
        <span className="font-semibold">Your team: </span>
        {agent.team}
      </p>

      <figure className="mt-6">
        <figcaption className="mono mb-3 text-[12px] text-muted">Example · {agent.example.label}</figcaption>
        <div className="space-y-2 border border-line p-4">
          {agent.example.lines.map((l, i) => (
            <div key={i} className={l.from === "customer" ? "flex justify-end" : "flex justify-start"}>
              <p
                className={cn(
                  "max-w-[86%] px-3.5 py-2 text-[14.5px] leading-snug",
                  l.from === "customer" ? "bg-ink text-paper" : "border border-line bg-paper text-ink",
                )}
              >
                {l.text}
                {l.note && <span className="mono mt-1 block text-[11px] text-blue">{l.note}</span>}
              </p>
            </div>
          ))}
        </div>
      </figure>

      <p className="mt-6 flex flex-wrap items-center gap-2 text-[13px]">
        <span className="mr-1 font-semibold text-muted">Connects to</span>
        {agent.connects.map((c) => (
          <span key={c} className="border border-line px-2.5 py-1 text-ink">
            {c}
          </span>
        ))}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
        <ButtonLink href="#demo" onClick={book("demo", agent.id)}>
          Book a demo of this agent
        </ButtonLink>
        <ArrowLink href="#prebook" onClick={book("prebook", agent.id)}>
          Pre-book it
        </ArrowLink>
      </div>
    </div>
  );
}

export function AgentCatalogue() {
  const { agentId, setAgentId } = useAgentSelection();
  const [filter, setFilter] = useState<Department | "all">("all");
  const [viewing, setViewing] = useState(AGENTS[0].id);

  // An agent chosen elsewhere on the page (problem finder, industries,
  // booking section) opens here too
  const [lastPicked, setLastPicked] = useState(agentId);
  if (agentId !== lastPicked) {
    setLastPicked(agentId);
    const picked = AGENTS.find((a) => a.id === agentId);
    if (picked) {
      setViewing(picked.id);
      if (filter !== "all" && picked.department !== filter) setFilter("all");
    }
  }

  const list = filter === "all" ? AGENTS : AGENTS.filter((a) => a.department === filter);
  // The open agent always belongs to the current filter
  const shown = list.find((a) => a.id === viewing) ?? list[0];

  const pick = (id: string) => {
    setViewing(id);
    setAgentId(id);
  };
  const changeFilter = (f: Department | "all") => {
    setFilter(f);
    const next = f === "all" ? AGENTS : AGENTS.filter((a) => a.department === f);
    if (!next.some((a) => a.id === viewing)) setViewing(next[0].id);
  };

  return (
    <div>
      <div role="group" aria-label="Filter agents by team" className="flex flex-wrap gap-2">
        {[{ id: "all" as const, label: "All teams", text: "" }, ...DEPARTMENTS].map((d) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={filter === d.id}
            onClick={() => changeFilter(d.id)}
            className={cn(
              "inline-flex min-h-10 cursor-pointer items-center gap-2 border px-4 py-2 text-[14.5px] font-medium transition-colors",
              filter === d.id ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-[1.5em] text-[14px] text-muted" aria-live="polite">
        {DEPARTMENTS.find((d) => d.id === filter)?.text ?? "Each agent does one job well. They share one knowledge base and setup."}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <ul className="border-t border-ink lg:col-span-5">
          {list.map((a) => {
            const on = a.id === shown.id;
            return (
              <li key={a.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => pick(a.id)}
                  className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-3 py-4 text-left"
                >
                  <span>
                    <span className={cn("block text-[17px] font-semibold transition-colors", on ? "text-blue" : "text-ink group-hover:text-blue")}>
                      {a.name}
                      {agentId === a.id && <span className="mono ml-2 text-[11px] font-normal text-signal">picked</span>}
                    </span>
                  </span>
                  <span aria-hidden className={cn("transition-transform", on ? "translate-x-0.5 text-blue" : "text-muted")}>
                    →
                  </span>
                </button>
                {/* Small screens: the detail opens under the picked row */}
                {on && (
                  <div className="pb-6 lg:hidden">
                    <Detail agent={a} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="hidden lg:col-span-7 lg:block">
          {/* Pinned while the list scrolls; a long detail scrolls inside, so
              its booking buttons stay reachable on shorter screens */}
          <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto">
            <Detail agent={shown} />
          </div>
        </div>
      </div>
    </div>
  );
}
