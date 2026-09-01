"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Reference .mxd-scramble charset — uppercase letters + digits only */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Reference scramble spec (docs/research/MOTION_SYSTEM.md):
 * setInterval 40ms; reveal pointer advances +0.25 chars per tick;
 * pointerenter starts, pointerleave restores the original text immediately.
 */
export function useScramble(text: string, speed = 40, revealStep = 0.25) {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointerRef = useRef(0);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startScramble = useCallback(() => {
    clear();
    pointerRef.current = 0;
    const length = text.length;

    intervalRef.current = setInterval(() => {
      pointerRef.current += revealStep;
      const revealed = Math.floor(pointerRef.current);

      if (revealed >= length) {
        setDisplayedText(text);
        clear();
        return;
      }

      setDisplayedText(
        text
          .split("")
          .map((char, index) => {
            if (index < revealed) return char;
            if (char === " ") return " ";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
    }, speed);
  }, [text, speed, revealStep, clear]);

  const stopScramble = useCallback(() => {
    clear();
    setDisplayedText(text);
  }, [clear, text]);

  useEffect(() => clear, [clear]);

  return { displayedText, startScramble, stopScramble };
}
