"use client";

import { cn } from "@/lib/utils";
import { SOCIAL } from "@/lib/contact";
import { AGENTS, agentById } from "@/lib/agents";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { PrebookForm } from "@/components/agents/PrebookForm";
import { useAgentSelection, type BookTab } from "@/components/agents/AgentSelection";

const TABS: { id: BookTab; label: string; text: string }[] = [
  { id: "demo", label: "Demo call", text: "20 minutes, free" },
  { id: "prebook", label: "Pre-book a slot", text: "Founding clients" },
];

/** Two ways to start: a demo call (Cal.com, or WhatsApp when no calendar is
 *  set) and the founding-client pre-book form. Both panels stay mounted, so
 *  switching tabs keeps anything typed into the form. */
export function BookPanel({ calLink }: { calLink: string }) {
  const { agentId, setAgentId, tab, setTab } = useAgentSelection();
  const agent = agentById(agentId);

  const notes = agent ? `Interested in: ${agent.name}` : "";
  const calSrc = `https://cal.com/${calLink}?embed=true${notes ? `&notes=${encodeURIComponent(notes)}` : ""}`;
  const whatsApp = `${SOCIAL.whatsapp}?text=${encodeURIComponent(
    agent ? `Hi bigO, I'd like a demo of the ${agent.name}.` : "Hi bigO, I'd like a demo of bigO Agents.",
  )}`;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line md:flex-row md:items-end md:justify-between">
        <div role="tablist" aria-label="How to start" className="flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`book-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`book-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative -mb-px cursor-pointer border-b-2 px-1 pb-4 text-left transition-colors first:mr-8",
                tab === t.id ? "border-blue text-ink" : "border-transparent text-muted hover:text-ink",
              )}
            >
              <span className="block text-[18px] font-semibold">{t.label}</span>
              <span className="mono mt-1 block text-[12px]">{t.text}</span>
            </button>
          ))}
        </div>

        {/* The agent picked in the catalogue, carried into both tabs */}
        <div className="pb-4">
          <label htmlFor="book-agent" className="mono mb-1 block text-[12px] text-muted">
            Agent
          </label>
          <select
            id="book-agent"
            value={agentId ?? ""}
            onChange={(e) => setAgentId(e.target.value || null)}
            className="min-w-[240px] cursor-pointer border-0 border-b border-line-strong bg-transparent py-1.5 text-[15px] text-ink outline-none focus:border-blue"
          >
            <option value="">Not sure yet</option>
            {AGENTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div id="book-panel-demo" role="tabpanel" aria-labelledby="book-tab-demo" hidden={tab !== "demo"} className="pt-10">
        {calLink ? (
          <div className="browser">
            <iframe
              key={calSrc}
              src={calSrc}
              title="Book a bigO Agents demo call"
              loading="lazy"
              className="block h-[720px] w-full border-0 bg-raised"
            />
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="t-3">See a working agent on a short call.</p>
              <p className="mt-3 max-w-[48ch] text-[16px]">
                We&apos;ll show {agent ? `the ${agent.name.toLowerCase()}` : "a working agent"} and talk through how it
                would handle your enquiries. Message us on WhatsApp and we&apos;ll find a time.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={whatsApp} external>
                  Book on WhatsApp
                </ButtonLink>
                <ArrowLink href="/contact?type=ai-assistants">Or send us a message</ArrowLink>
              </div>
            </div>
            <ul className="border-t border-line lg:col-span-5 lg:col-start-8">
              {["A live agent answering real questions", "How it would work with your channels", "Setup, timeline and pricing"].map((t, i) => (
                <li key={t} className="flex gap-4 border-b border-line py-3.5 text-[15px] text-ink">
                  <span className="mono text-[12px] text-blue">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div id="book-panel-prebook" role="tabpanel" aria-labelledby="book-tab-prebook" hidden={tab !== "prebook"} className="pt-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              Limited slots
            </p>
            <p className="t-3 mt-3">Reserve a founding-client slot.</p>
            <p className="mt-3 text-[16px]">
              Tell us a little about your business. There&apos;s nothing to pay now; we&apos;ll get back to you within one
              working day.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <PrebookForm preselect={agent?.short} />
          </div>
        </div>
      </div>
    </div>
  );
}
