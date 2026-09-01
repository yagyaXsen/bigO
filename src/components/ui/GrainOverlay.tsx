"use client";

// Pre-computed static 32x32 noise pattern (PNG) for instant, 0-CPU GPU caching
const STATIC_NOISE_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlMAgJsrnwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAA8SURBVDjLY2AYBYMRsLAwMDCyMDMyMzCwsjIzMTExMTMyMDIysrExMjAwMrKyMTAyMLAwMjIwMjEwMrExMAAALVAAoU6Q+30AAAAASUVORK5CYII=";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990] opacity-35 mix-blend-overlay"
      style={{
        backgroundImage: `url("${STATIC_NOISE_URL}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

