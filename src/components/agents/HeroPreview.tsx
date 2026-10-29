"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const CHAT: { from: "customer" | "agent"; text: string; note?: string }[] = [
  { from: "customer", text: "Do you have 40 units of the 3HP pump in stock?" },
  { from: "agent", text: "Yes, 40 units are available at the Pune warehouse. Shall I place the order on your dealer account?", note: "From: Stock levels" },
  { from: "customer", text: "Yes, same delivery address as last time." },
  { from: "agent", text: "Order placed for 40 units. Dispatch details will follow today." },
  { from: "customer", text: "And the invoice for last month?" },
  { from: "agent", text: "Here it is. It's due on the 30th.", note: "Invoice shared" },
];

const CALL: { who: "Agent" | "Caller"; text: string }[] = [
  { who: "Agent", text: "Good evening, thanks for calling. How can I help?" },
  { who: "Caller", text: "I saw your Sector 62 project. Can I visit this weekend?" },
  { who: "Agent", text: "Saturday at 11:00 is free. Shall I book it for you?" },
  { who: "Caller", text: "Yes, please." },
];

const MODES = [
  { id: "chat", label: "Chat" },
  { id: "call", label: "Phone call" },
] as const;

/** Hero panel: the same agent in a chat and on a phone call. Example
 *  conversations only, labelled as such. */
export function HeroPreview() {
  const [mode, setMode] = useState<"chat" | "call">("chat");

  return (
    <figure className="browser">
      <div className="browser-bar justify-between">
        <span className="flex items-center gap-1.5" aria-hidden>
          <i className="h-[7px] w-[7px] rounded-full border border-line-strong" />
          <i className="h-[7px] w-[7px] rounded-full border border-line-strong" />
          <i className="h-[7px] w-[7px] rounded-full border border-line-strong" />
        </span>
        <span role="tablist" aria-label="Preview" className="flex">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`preview-tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls={`preview-${m.id}`}
              onClick={() => setMode(m.id)}
              className={cn(
                "cursor-pointer px-2.5 py-1 text-[12px] font-semibold transition-colors",
                mode === m.id ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {m.label}
            </button>
          ))}
        </span>
      </div>

      <div className="relative min-h-[392px]">
        {/* Chat */}
        <div id="preview-chat" role="tabpanel" aria-labelledby="preview-tab-chat" hidden={mode !== "chat"} className="space-y-2.5 p-5">
          <p className="mono mb-3 flex items-center gap-2 text-[12px] text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#25d366]" />
            WhatsApp · example: industrial distributor
          </p>
          {CHAT.map((m, i) => (
            <div key={i} className={m.from === "customer" ? "flex justify-end" : "flex justify-start"}>
              <p
                className={cn(
                  "max-w-[84%] px-3.5 py-2 text-[14.5px] leading-snug",
                  m.from === "customer" ? "bg-ink text-paper" : "border border-line bg-paper text-ink",
                )}
              >
                {m.text}
                {m.note && <span className="mono mt-1 block text-[11px] text-blue">{m.note}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Call */}
        <div id="preview-call" role="tabpanel" aria-labelledby="preview-tab-call" hidden={mode !== "call"} className="p-5">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="mono text-[12px] text-muted">Inbound call · example: real estate developer</p>
              <p className="mt-1 text-[16px] font-semibold text-ink">+91 98xxx xxx45</p>
            </div>
            <p className="mono flex items-center gap-2 text-[12px] text-ink">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none" />
              On call
            </p>
          </div>
          {/* A quiet waveform: decoration only */}
          <div aria-hidden className="flex h-10 items-center gap-[3px] py-2">
            {[3, 6, 9, 5, 12, 7, 4, 10, 14, 8, 5, 11, 6, 9, 13, 7, 4, 8, 12, 6, 3, 9, 5, 7, 11, 4, 6, 10, 5, 3].map((h, i) => (
              <span key={i} className="w-[3px] bg-blue/60" style={{ height: `${h * 2}px` }} />
            ))}
          </div>
          <dl className="space-y-2.5">
            {CALL.map((l, i) => (
              <div key={i} className="grid grid-cols-[56px_1fr] gap-3 text-[14.5px] leading-snug">
                <dt className={cn("mono pt-0.5 text-[12px]", l.who === "Agent" ? "text-blue" : "text-muted")}>{l.who}</dt>
                <dd className="text-ink">{l.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mono mt-4 border-t border-line pt-3 text-[12px] text-ink">✓ Visit booked · Saturday 11:00</p>
        </div>
      </div>

      <figcaption className="mono flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-5 py-3 text-[12px] text-muted">
        <span>✓ Updated in your systems</span>
        <span>✓ Team notified</span>
        <span>✓ Hand-over when needed</span>
      </figcaption>
    </figure>
  );
}
