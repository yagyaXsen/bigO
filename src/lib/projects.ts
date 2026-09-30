/** Work page content. A project's `video` (a muted loop, ideally a local
 *  /videos/work/* screen recording) is shown when present; live sites without
 *  one fall back to an mshots screenshot of the top of the page. */
export interface WorkProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  status: "Live" | "Ongoing";
  url: string;
  live?: string;
  tags: string[];
  description: string;
  flowLabel?: string;
  flow?: string[];
  highlights: { h: string; d: string }[];
  stack?: string[];
  links: { label: string; href: string }[];
  video?: { src: string; poster: string };
}

/* One normal 1440×900 viewport. A very tall viewport pushes vertically
   centered heroes into the middle and leaves scroll-revealed sections blank. */
export const shot = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800&vpw=1440&vph=900`;

export const PROJECTS: WorkProject[] = [
  {
    id: "nexora",
    num: "01",
    title: "Nexora",
    subtitle: "Opportunity intelligence platform",
    status: "Live",
    url: "nexora-8y5.pages.dev",
    live: "https://nexora-8y5.pages.dev/",
    tags: ["Automation", "Backend", "AI extraction", "Search"],
    description:
      "Students, researchers and early founders lose hours hunting for scholarships, fellowships, accelerators, hackathons and grants spread across hundreds of sites. Nexora does the hunting for them. An automated pipeline crawls sources on a schedule, turns messy pages into clean structured records, keeps them up to date and publishes only what passes strict quality checks — then helps each user track their applications through to the deadline.",
    flowLabel: "/ PIPELINE",
    flow: ["Collect", "Extract", "Deduplicate", "Maintain", "Publish", "Track"],
    highlights: [
      { h: "Automated discovery", d: "Scheduled crawlers read listings, RSS feeds and sitemaps with no manual input." },
      { h: "AI-assisted extraction", d: "Unstructured pages become validated records — deadlines, funding, eligibility." },
      { h: "Self-maintaining catalog", d: "Records re-verify, expire, revive and link-check themselves over time." },
      { h: "Semantic search & matching", d: "Natural-language search and a dashboard ranked against each user's profile." },
      { h: "Application tracker", d: "Kanban from Saved to Accepted, with deadline reminders." },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Vite", "Tailwind CSS", "Groq", "GitHub Actions"],
    links: [
      { label: "Live site", href: "https://nexora-8y5.pages.dev/" },
      { label: "GitHub", href: "https://github.com/yagyaXsen/Nexora" },
    ],
  },
  {
    id: "hirearn",
    num: "02",
    title: "Hirearn",
    subtitle: "Local jobs and services platform",
    status: "Live",
    url: "hirearn.com",
    live: "https://hirearn.com/",
    tags: ["Marketplace", "Web platform", "PWA"],
    description:
      "Finding someone nearby for a job — or finding nearby work — usually means word of mouth and scattered groups. Hirearn brings both sides into one place: people post what they need, local providers discover it and take it up. Our freelance development team architected and built the full product: a complete web platform with installable PWA/app capabilities, structured as a marketplace that can scale to more categories and cities.",
    flowLabel: "/ HOW IT WORKS",
    flow: ["Post a requirement", "Discover nearby opportunities", "Take up relevant work"],
    highlights: [
      { h: "Two-sided marketplace", d: "One platform for people who need work done and people who do it." },
      { h: "Local-first discovery", d: "Requirements and opportunities surfaced by what's nearby." },
      { h: "PWA / app experience", d: "Installable on phones, built mobile-first for on-the-go use." },
      { h: "Built to scale", d: "Marketplace architecture ready for new categories and regions." },
    ],
    links: [{ label: "Live site", href: "https://hirearn.com/" }],
  },
  {
    id: "catering",
    num: "03",
    title: "Catering, Thailand",
    subtitle: "Ongoing international client project",
    status: "Ongoing",
    url: "Client project",
    tags: ["Digital growth", "Development", "International"],
    description:
      "A Thailand-based catering business with ambitions beyond its home market. We're partnering with them to take operations and presence to a broader digital level — building a connected digital ecosystem that carries the brand across multiple countries instead of a single local market. The engagement covers both sides: the technical foundation and the digital growth that puts it in front of new audiences.",
    highlights: [
      { h: "Digital ecosystem", d: "Connecting the brand's online touchpoints into one coherent system." },
      { h: "Technical foundation", d: "Development work that supports operations as the business grows." },
      { h: "Multi-country visibility", d: "Presence and reach planned for several markets, not one city." },
      { h: "Ongoing growth", d: "A long-term engagement — improving and expanding month by month." },
    ],
    links: [],
    video: {
      src: "https://videos.pexels.com/video-files/4170293/4170293-hd_1366_720_24fps.mp4",
      poster: "https://images.pexels.com/videos/4170293/pexels-photo-4170293.jpeg?auto=compress&w=1260&h=750&dpr=1",
    },
  },
];

export const PROCESS: [string, string][] = [
  ["Discovery", "We learn the business, audience, goals, competitors and requirements."],
  ["Research & Planning", "Scope, structure and technical approach agreed before anything is designed."],
  ["Design", "Structure, visual direction and user experience, shaped before development."],
  ["Development", "The approved design becomes a fast, responsive, production-ready product."],
  ["Testing", "Devices, browsers, forms, integrations, performance and security — all checked."],
  ["Launch", "Hosting, domains, SSL, analytics and production deployment configured."],
  ["Maintenance & Growth", "After launch we keep improving through maintenance, SEO, content and marketing."],
];
