// Content structures for the bigO site.

export interface SocialLink {
  label: string;
  href: string;
}

export interface CapabilityItem {
  index: string; // "[01]"
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface InsightPost {
  date: string; // "02 February, 2026"
  title: string;
  tags: string[];
  image: string;
  /** Per-card image aspect ratio — the reference staggers card heights */
  aspect: string; // e.g. "aspect-[3/2]"
}
