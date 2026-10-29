"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type BookTab = "demo" | "prebook";

interface Selection {
  /** The agent picked in the catalogue, carried into both booking tabs */
  agentId: string | null;
  setAgentId: (id: string | null) => void;
  tab: BookTab;
  setTab: (tab: BookTab) => void;
}

const SelectionContext = createContext<Selection | null>(null);

const tabFromHash = (hash: string): BookTab | null =>
  hash === "#prebook" ? "prebook" : hash === "#demo" ? "demo" : null;

/** Shares the picked agent and the open booking tab across the page.
 *  Links to #demo and #prebook (from anywhere, including other pages)
 *  open the matching tab. */
export function AgentSelectionProvider({ children }: { children: ReactNode }) {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [tab, setTab] = useState<BookTab>("demo");

  useEffect(() => {
    const onHash = () => {
      const next = tabFromHash(window.location.hash);
      if (next) setTab(next);
    };
    // A page opened at /agents#prebook starts on that tab
    queueMicrotask(onHash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const value = useMemo(() => ({ agentId, setAgentId, tab, setTab }), [agentId, tab]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useAgentSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useAgentSelection must be used inside AgentSelectionProvider");
  return ctx;
}

/** onClick for links into the booking section: opens the tab, and picks
 *  the agent when one is given. The link's own #hash does the scrolling. */
export function useBookAction() {
  const { setAgentId, setTab } = useAgentSelection();
  return useCallback(
    (tab: BookTab, agentId?: string) => () => {
      setTab(tab);
      if (agentId) setAgentId(agentId);
    },
    [setAgentId, setTab],
  );
}
