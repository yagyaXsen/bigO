/** Case studies for the Work page and the home page. `result` is optional:
 *  it only renders when there is a real, confirmed number to show. */
export interface Project {
  id: string;
  name: string;
  /** What kind of system it is, e.g. "AI data pipeline" */
  kind: string;
  status: "Live" | "Ongoing" | "Open source";
  /** Short address shown on cards */
  url?: string;
  live?: string;
  /** One sentence for the home page */
  summary: string;
  problem: string;
  built: string;
  features: string[];
  /** A confirmed, measured result. Leave out until there is one. */
  result?: string;
  stack: string[];
  /** A real screenshot; projects without one are shown as text only */
  image?: { src: string; alt: string };
  /** A short muted screen recording, shown in place of the image when present */
  video?: string;
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
    stack: ["HTML", "CSS", "JavaScript", "GSAP", "GitHub Pages"],
    image: { src: "/images/work/lumora.jpg", alt: "Lumora Dental website home page" },
    video: "/videos/lumora.mp4",
    links: [{ label: "Live site", href: "https://yagyaxsen.github.io/lumora-dental/" }],
  },
  {
    id: "oyeexpress",
    name: "OyeExpress",
    kind: "Furniture sourcing website",
    status: "Live",
    url: "oyeexpress.vercel.app",
    live: "https://oyeexpress.vercel.app/",
    summary:
      "A website for a furniture sourcing company that takes bespoke pieces from the makers of Foshan, China to homes, hotels and offices worldwide.",
    problem:
      "Buying furniture direct from Foshan, China's furniture capital, means finding the right makers, checking quality from far away and handling export and shipping. Clients need to trust one team with all of it.",
    built:
      "A brand website that walks clients from first idea to delivery: collections by room, a custom sourcing section where you compare a reference photo with the finished piece, a six-step process from brief to doorstep, and enquiry points throughout.",
    features: [
      "Collections for living, bedroom, dining, outdoor, lighting and wardrobes",
      "Drag-to-compare slider: client reference against the finished piece",
      "Six-step journey from brief and sourcing to inspection, shipping and delivery",
      "Project and custom sourcing enquiries, with smooth scroll-led motion",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "GSAP", "Lenis", "Vercel"],
    image: { src: "/images/work/oyeexpress.jpg", alt: "OyeExpress home page: Premium furniture, sourced in Foshan" },
    links: [{ label: "Live site", href: "https://oyeexpress.vercel.app/" }],
  },
  {
    id: "outreach",
    name: "AI outreach system",
    kind: "Multi-agent AI automation",
    status: "Open source",
    summary:
      "Ten AI agents that research prospects, write grounded emails and send them only after every safety check passes.",
    problem:
      "Cold outreach done badly can't be taken back: generic emails, invented facts, and messages to people who already said no.",
    built:
      "Built for bigO's own outreach. Agents find prospects, research them from public pages, score the fit and write a personal email from that research. Every email then passes an adversarial quality review, a send gate and, by default, a person's approval before it leaves Gmail.",
    features: [
      "Every claim in an email must cite a page the system actually fetched",
      "Send gate enforces daily limits, suppression lists and a kill switch",
      "Dry run and human approval on by default",
      "Reply tracking, follow-ups and a dashboard, covered by 160 automated tests",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Claude API", "Gmail API", "React", "Docker"],
    links: [{ label: "Source code", href: "https://github.com/yagyaXsen/outreach-automation" }],
  },
  {
    id: "job-outreach",
    name: "Job outreach",
    kind: "Gmail email automation",
    status: "Open source",
    summary: "Slow, personal job-search emails from your own Gmail, with reply and bounce detection.",
    problem:
      "Bulk emails to HR contacts land in spam, reach the same company twice and keep going to people who already replied.",
    built:
      "A small Python tool, standard library only, that sends personal emails from your own Gmail once a day. It reads the inbox before every run, and anyone who replies, auto-replies or bounces is never emailed again.",
    features: [
      "15 to 30 emails a day, with a random 1.5 to 5 minute gap between each",
      "One contact per company and one follow-up in the same thread after 5 days",
      "Pauses itself if more than 8% of emails bounce",
      "Verified-list import, PDF to CSV conversion and a resumable send log",
    ],
    stack: ["Python", "Gmail SMTP and IMAP", "macOS launchd"],
    links: [{ label: "Source code", href: "https://github.com/yagyaXsen/job-outreach" }],
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
    stack: [],
    links: [],
  },
];

export const projectById = (id: string) => PROJECTS.find((p) => p.id === id);
