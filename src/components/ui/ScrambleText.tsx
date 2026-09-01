"use client";

import React, { useEffect } from "react";
import { useScramble } from "@/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  /** Reference behavior is hover-only; "mount"/"both" also fire once on mount */
  triggerOn?: "hover" | "mount" | "both";
}

/**
 * Reference .mxd-scramble: scramble starts on pointerenter and the original
 * text is restored immediately on pointerleave.
 */
export function ScrambleText({
  text,
  className,
  as: Component = "span",
  triggerOn = "hover",
}: ScrambleTextProps) {
  const { displayedText, startScramble, stopScramble } = useScramble(text);

  useEffect(() => {
    if (triggerOn === "mount" || triggerOn === "both") {
      startScramble();
    }
  }, [startScramble, triggerOn]);

  const handlePointerEnter = () => {
    if (triggerOn === "hover" || triggerOn === "both") {
      startScramble();
    }
  };

  const handlePointerLeave = () => {
    if (triggerOn === "hover" || triggerOn === "both") {
      stopScramble();
    }
  };

  return (
    <Component
      className={className}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {displayedText}
    </Component>
  );
}
