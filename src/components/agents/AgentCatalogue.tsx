"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AGENTS, GROUPS, type Agent, type AgentGroup } from "@/lib/agents";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { useAgentSelection, useBookAction } from "@/components/agents/AgentSelection";

const pad = (n: number) => String(n).padStart(2, "0");
const groupLabel = (g: AgentGroup) => GROUPS.find((x) => x.id === g)?.label ?? "";

/** What the selected agent does, an example exchange, its channels and
 *  the way to book it. Shown beside the list on desktop and under the
 *  picked row on smaller screens. */
function Detail({ agent }: { agent: Agent }) {
  const book = useBookAction();
  return (
    <div className="border border-line bg-raised p-6 md:p-8">
      <p className="mono text-[12px] text-muted">
        {groupLabel(agent.group)} <span className="mx-1 text-line-strong">/</span> {agent.channels.join(" · ")}
      </p>
      <h3 className="t-2 mt-3">{agent.name}</h3>
      <p className="mt-4 text-[17px] leading-relaxed text-ink">{agent.does}</p>

      <ul className="mt-6 border-t border-line">
        {agent.tasks.map((t) => (
          <li key={t} className="flex gap-3 border-b border-line py-2.5 text-[15px]">
            <span aria-hidden className="text-blue">
              ✓
            </span>
            {t}
          </li>
        ))}
      </ul>

      <figure className="mt-6 bg-paper-2 p-4 md:p-5">
        <figcaption className="mono mb-3 text-[12px] text-muted">Example · {agent.example.label}</figcaption>
        <div className="space-y-2">
          {agent.example.lines.map((l, i) => (
            <div key={i} className={l.from === "customer" ? "flex justify-end" : "flex justify-start"}>
              <p
                className={cn(
                  "max-w-[86%] px-3.5 py-2 text-[14.5px] leading-snug",
                  l.from === "customer" ? "bg-ink text-paper" : "border border-line bg-raised text-ink",
                )}
              >
                {l.text}
                {l.note && <span className="mono mt-1 block text-[11px] text-blue">{l.note}</span>}
              </p>
            </div>
          ))}
        </div>
      </figure>

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
  const [filter, setFilter] = useState<AgentGroup | "all">("all");
  const [viewing, setViewing] = useState(AGENTS[0].id);

  // An agent chosen in the booking section opens here too
  const [lastPicked, setLastPicked] = useState(agentId);
  if (agentId !== lastPicked) {
    setLastPicked(agentId);
    const picked = AGENTS.find((a) => a.id === agentId);
    if (picked) {
      setViewing(picked.id);
      if (filter !== "all" && picked.group !== filter) setFilter("all");
    }
  }

  const list = filter === "all" ? AGENTS : AGENTS.filter((a) => a.group === filter);
  // The open agent always belongs to the current filter
  const shown = list.find((a) => a.id === viewing) ?? list[0];

  const pick = (id: string) => {
    setViewing(id);
    setAgentId(id);
  };
  const changeFilter = (f: AgentGroup | "all") => {
    setFilter(f);
    const next = f === "all" ? AGENTS : AGENTS.filter((a) => a.group === f);
    if (!next.some((a) => a.id === viewing)) setViewing(next[0].id);
  };

  return (
    <div>
      <div role="group" aria-label="Filter agents" className="flex flex-wrap gap-2">
        {[{ id: "all" as const, label: "All", text: "" }, ...GROUPS].map((g) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={filter === g.id}
            onClick={() => changeFilter(g.id)}
            className={cn(
              "inline-flex min-h-10 cursor-pointer items-center gap-2 border px-4 py-2 text-[14.5px] font-medium transition-colors",
              filter === g.id ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink",
            )}
          >
            {g.label}
            <span className={cn("mono text-[11px]", filter === g.id ? "text-paper/70" : "text-muted")}>
              {g.id === "all" ? AGENTS.length : AGENTS.filter((a) => a.group === g.id).length}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-[1.5em] text-[14px] text-muted" aria-live="polite">
        {GROUPS.find((g) => g.id === filter)?.text ?? "Each agent does one job well. They share one knowledge base and dashboard."}
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
                  className={cn(
                    "group grid w-full cursor-pointer grid-cols-[32px_1fr_auto] items-baseline gap-3 py-4 text-left transition-colors",
                    on ? "text-ink" : "text-text hover:text-ink",
                  )}
                >
                  <span className={cn("mono text-[12px]", on ? "text-blue" : "text-muted")}>{pad(AGENTS.indexOf(a) + 1)}</span>
                  <span>
                    <span className={cn("block text-[17px] font-semibold", on ? "text-blue" : "text-ink group-hover:text-blue")}>
                      {a.name}
                      {agentId === a.id && <span className="mono ml-2 text-[11px] font-normal text-signal">picked</span>}
                    </span>
                    <span className="mt-1 block text-[14px] text-muted">{a.channels.join(" · ")}</span>
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
          <div className="sticky top-40">
            <Detail agent={shown} />
          </div>
        </div>
      </div>
    </div>
  );
}
