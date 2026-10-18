/** What bigO offers. Development (software, AI, websites) is the core and gets
 *  the detailed write-up on /services; design, marketing, care and consulting
 *  round it out. The home page shows a short overview from the same data. */

export interface CoreService {
  id: string;
  num: string;
  title: string;
  /** One line for the home page overview */
  short: string;
  /** Lead sentence: ink part, then the muted tail */
  lead: [string, string];
  builds: string[];
  included: string[];
  tools: string[];
  /** A /work project that shows this service in practice */
  proof: string;
}

export interface MoreService {
  id: string;
  num: string;
  title: string;
  short: string;
  items: string[];
}

export const CORE_SERVICES: CoreService[] = [
  {
    id: "software",
    num: "01",
    title: "Custom software & web apps",
    short: "SaaS products, dashboards, portals and internal tools, designed, built and deployed by one team.",
    lead: [
      "Software shaped around how your business actually works.",
      " We plan it with you, build it properly and stay on to run and improve it after launch.",
    ],
    builds: [
      "SaaS products and customer portals",
      "Dashboards and admin panels",
      "Internal tools that replace spreadsheets and manual work",
      "Marketplaces and booking platforms",
      "Installable web apps (PWA) for phones and desktops",
      "APIs and integrations: payments, CRMs, WhatsApp, email",
    ],
    included: [
      "Requirements, scope and a technical plan agreed up front",
      "User flows and interface design before development",
      "Front end, back end, database and hosting",
      "Accounts, roles, payments and security built in",
      "Testing on phones, tablets and desktops",
      "Launch, handover and ongoing support",
    ],
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Supabase"],
    proof: "hirearn",
  },
  {
    id: "ai",
    num: "02",
    title: "AI & automation",
    short: "AI features, assistants and automated workflows that take repetitive work off your team.",
    lead: [
      "AI that does real work inside your product and your operations.",
      " We start from the task you want done, then build the simplest system that does it reliably.",
    ],
    builds: [
      "AI assistants and chatbots that answer from your own content",
      "Data extraction from documents, emails and web pages into clean records",
      "Smart search, matching and recommendations",
      "Automated workflows between your apps, forms, sheets and inboxes",
      "Scheduled pipelines that collect and update data on their own",
      "Drafts and summaries for content, replies and reports",
    ],
    included: [
      "A review of where AI helps your process, and where it doesn't",
      "A working prototype on your real data before the full build",
      "Validation, fallbacks and human review where accuracy matters",
      "Usage and running costs kept visible",
      "Integration into your existing product or tools",
      "Monitoring and tuning after launch",
    ],
    tools: ["Python", "FastAPI", "LLM APIs", "Vector search", "PostgreSQL", "GitHub Actions"],
    proof: "nexora",
  },
  {
    id: "websites",
    num: "03",
    title: "Websites & online stores",
    short: "Fast, search-friendly business websites and online stores with booking, payments and WhatsApp built in.",
    lead: [
      "Websites that load fast, rank well and turn visitors into enquiries.",
      " Designed for your customers and easy for your team to update.",
    ],
    builds: [
      "Company and business websites",
      "Online stores and product catalogues",
      "Booking and appointment flows",
      "Landing pages for launches and campaigns",
      "Multi-language sites for international audiences",
      "Blogs and pages your team can edit",
    ],
    included: [
      "Mobile-first design that matches your brand",
      "On-page SEO, speed optimisation and analytics",
      "Forms, WhatsApp, payments and booking connected",
      "Domain, hosting and SSL set up",
      "Accessibility and cross-browser checks",
      "A walkthrough so you can update content yourself",
    ],
    tools: ["Next.js", "React", "Tailwind CSS", "SEO", "Stripe", "Vercel"],
    proof: "lumora",
  },
];

export const MORE_SERVICES: MoreService[] = [
  {
    id: "design",
    num: "04",
    title: "UI/UX & brand design",
    short: "Interfaces and brands that look as professional as the product behind them.",
    items: [
      "UI/UX for web and mobile apps",
      "Wireframes and clickable prototypes",
      "Logo and visual identity",
      "Brand guidelines",
      "Social media and marketing design",
    ],
  },
  {
    id: "marketing",
    num: "05",
    title: "Digital marketing & growth",
    short: "Get found by the right people, then turn visits into enquiries.",
    items: [
      "SEO: technical, local and content",
      "Social media content and management",
      "Google and Meta ads",
      "Email campaigns and automations",
      "Analytics and conversion tracking",
    ],
  },
  {
    id: "care",
    num: "06",
    title: "Care & maintenance",
    short: "Keep what we build secure, fast and up to date.",
    items: [
      "Security and dependency updates",
      "Backups and uptime monitoring",
      "Bug fixes and small changes",
      "Performance checks",
      "New features as you grow",
    ],
  },
  {
    id: "consulting",
    num: "07",
    title: "Consulting & strategy",
    short: "Clear technical advice before you spend on building.",
    items: [
      "Audits of existing websites and apps",
      "Product and technical roadmaps",
      "Choosing the right tools and platforms",
      "Finding what's worth automating",
      "Team training on new tools",
    ],
  },
];
