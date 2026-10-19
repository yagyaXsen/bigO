import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { AssistantIcon, AutomationIcon, PortalIcon, WebAppIcon } from "@/components/icons";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "web-apps": WebAppIcon,
  "client-portals": PortalIcon,
  "ai-assistants": AssistantIcon,
  automation: AutomationIcon,
};

/** The icon for a core service (by service id), in a soft accent tile */
export function ServiceIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[id] ?? WebAppIcon;
  return (
    <span className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent", className)}>
      <Icon className="h-[22px] w-[22px]" />
    </span>
  );
}
