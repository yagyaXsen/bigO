// Content structures for the bigO site.

export interface SocialLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string; // "50+", "86%"
  caption: string; // "Happy clients who trust our work"
}

export interface NicheCard {
  title: string;
  tags: string[];
  description: string;
  descriptionHighlight?: string; // muted tail of the description
  image?: string;
  dark?: boolean;
  variant?: "bottom" | "full" | "aside";
}

export interface CapabilityItem {
  index: string; // "[01]"
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface CaseStudy {
  title: string;
  tags: string[];
  images: string[]; // [main, ...overlays]
  ratio?: "portrait" | "landscape" | "square";
}

export interface TechItem {
  name: string;
  icon: string; // key into tech icon map
}

export interface InsightPost {
  date: string; // "02 February, 2026"
  title: string;
  tags: string[];
  image: string;
  /** Per-card image aspect ratio — the reference staggers card heights */
  aspect: string; // e.g. "aspect-[3/2]"
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface EcosystemLink {
  index: string; // "[01]"
  label: string;
  href: string;
}
