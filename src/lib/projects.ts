/** Case studies for the Work page and the home page's Selected work.
 *  `result` and missing screenshots are placeholders until real numbers and
 *  images are available — they render as clearly marked placeholders. */
export interface Project {
  id: string;
  name: string;
  /** What kind of system it is, e.g. "AI data pipeline" */
  kind: string;
  status: "Live" | "Ongoing";
  /** Short address shown on cards */
  url?: string;
  live?: string;
  /** One sentence for the home page */
  summary: string;
  problem: string;
  built: string;
  features: string[];
  /** Placeholder until a measured result is available */
  result: string;
  stack: string[];
  /** A real screenshot; projects without one show a screenshot placeholder */
  image?: { src: string; alt: string };
  links: { label: string; href: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "nexora",
    name: "Nexora",
    kind: "AI data pipeline",
    status: "Live",
    url: "nexora-8y5.pages.dev",
    live: "https://nexora-8y5.pages.dev/",
    summary:
      "An automated pipeline that finds scholarships, grants and fellowships across hundreds of sites and keeps them up to date on its own.",
    problem:
      "Students, researchers and early founders spend hours searching hundreds of websites for scholarships, fellowships, grants and accelerators, and most listings go out of date quickly.",
    built:
      "A pipeline that collects listings on a schedule, uses AI to turn messy pages into clean records, removes duplicates and re-checks everything over time. Users search in plain language and track their applications up to the deadline.",
    features: [
      "Scheduled collection from listings, RSS feeds and sitemaps",
      "AI extraction of deadlines, funding and eligibility",
      "Records that re-verify and expire on their own",
      "Plain-language search and an application tracker",
    ],
    result: "[Result: e.g. number of listings processed, or hours of manual research saved]",
    image: { src: "/images/work/nexora.jpg", alt: "Nexora home page: Discover the world's next opportunity before everyone else" },
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Groq", "GitHub Actions"],
    links: [
      { label: "Live site", href: "https://nexora-8y5.pages.dev/" },
      { label: "Source code", href: "https://github.com/yagyaXsen/Nexora" },
    ],
  },
  {
    id: "hirearn",
    name: "Hirearn",
    kind: "Marketplace web app",
    status: "Live",
    url: "hirearn.com",
    live: "https://hirearn.com/",
    summary: "A two-sided marketplace and installable app that connects people with local jobs and services.",
    problem:
      "Finding someone nearby for a job, or finding nearby work, usually depends on word of mouth and scattered groups.",
    built:
      "A complete web platform where people post what they need and local providers find it and take it up. It installs on phones like an app and is structured to add more categories and cities.",
    features: [
      "One platform for both sides of the marketplace",
      "Requirements and work shown by what's nearby",
      "Installable on phones (PWA), built mobile-first",
      "Architecture ready for new categories and regions",
    ],
    result: "[Result: e.g. registered users, jobs posted or cities live]",
    image: { src: "/images/work/hirearn.jpg", alt: "Hirearn home page: daily wage hiring for employers" },
    stack: [],
    links: [{ label: "Live site", href: "https://hirearn.com/" }],
  },
  {
    id: "lumora",
    name: "Lumora Dental",
    kind: "Clinic website with booking",
    status: "Live",
    url: "yagyaxsen.github.io/lumora-dental",
    live: "https://yagyaxsen.github.io/lumora-dental/",
    summary: "A calm, trustworthy clinic website with treatment pages, online booking and a callback form.",
    problem:
      "A dental clinic has to feel calm and trustworthy online before a patient walks in, and booking a visit has to take seconds.",
    built:
      "A complete clinic website: clear pages for each type of treatment, the team, patient stories and a blog. Every appointment button leads to online booking, and a callback form sits on the first screen.",
    features: [
      "Home, about, treatment and blog pages",
      "Online booking and a callback request form",
      "Privacy, terms and cookie pages",
      "Static, fast build hosted on GitHub Pages",
    ],
    result: "[Result: e.g. online bookings per month, or calls saved for front-desk staff]",
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "GitHub Pages"],
    image: { src: "/images/work/lumora.jpg", alt: "Lumora Dental website home page" },
    links: [{ label: "Live site", href: "https://yagyaxsen.github.io/lumora-dental/" }],
  },
  {
    id: "catering",
    name: "Catering business, Thailand",
    kind: "Ongoing client engagement",
    status: "Ongoing",
    summary: "Technical foundation and digital growth for a catering business expanding beyond its home market.",
    problem:
      "A Thailand-based catering business wants to operate and be found across several countries, not just one local market.",
    built:
      "An ongoing engagement covering the technical foundation that supports operations as the business grows, and the online presence that puts it in front of new markets.",
    features: [
      "Connecting the business's online touchpoints into one system",
      "Development work that supports day-to-day operations",
      "Presence planned for several markets",
      "Month-by-month improvements",
    ],
    result: "[Result: to be added as the engagement progresses]",
    stack: [],
    links: [],
  },
];

export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);
