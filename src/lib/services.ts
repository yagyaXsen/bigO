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

/* ---------- Working with bigO ----------
   Terms confirmed by the team: a free first call with no set length, a
   written fixed-price proposal, milestone payments, client ownership of code
   and designs once paid, NDAs on request, 30 days of free fixes after launch
   and optional monthly care plans. Keep the copy below within those. */

/** Home page "How a project starts" */
export const START_STEPS: [string, string][] = [
  [
    "A free call",
    "Tell us what you want to build. We talk it through for as long as it takes, at no cost and with no obligation.",
  ],
  [
    "A fixed-price proposal",
    "You get it in writing before any work starts: the scope, the timeline and one fixed price.",
  ],
  [
    "Build, launch, support",
    "We build in milestones you can review, launch, and fix any bugs free for 30 days. A monthly care plan can keep it running after that.",
  ],
];

export const ENGAGEMENTS: { title: string; text: string; points: string[] }[] = [
  {
    title: "Fixed-price project",
    text: "For new software, AI systems and websites. Scope, timeline and one price agreed in writing up front, then paid in milestones.",
    points: ["Free first call", "Written proposal", "Milestone payments", "30 days of free fixes"],
  },
  {
    title: "Monthly care plan",
    text: "For what we've launched together. Updates, backups, monitoring and small changes, for a monthly fee.",
    points: ["Security updates", "Backups and monitoring", "Bug fixes and small changes", "Performance checks"],
  },
];

export const PROMISES = [
  "Free first call",
  "Fixed price in writing",
  "You own the code and designs",
  "NDA on request",
  "30 days of free fixes",
];

export const FAQ: [string, string][] = [
  [
    "How does a project start?",
    "With a free call. There's no set length: we talk until we understand what you need. After that you get a written proposal with the scope, timeline and a fixed price.",
  ],
  [
    "How much will it cost?",
    "It depends on what you need built, so we don't publish a price list. After the call you get one fixed price in writing. If you want to add something later, we agree the change in writing before starting on it.",
  ],
  [
    "How long does it take?",
    "That depends on the scope too. Your proposal includes the timeline, split into milestones so you can see progress as it happens.",
  ],
  [
    "How do payments work?",
    "In milestones agreed in the proposal: usually one payment to start, one at a midpoint such as design sign-off or a beta, and the last at launch.",
  ],
  [
    "Who owns the code and designs?",
    "You do. Once the project is paid in full, the code, designs and accounts are yours.",
  ],
  ["Will you sign an NDA?", "Yes. We're happy to sign one before you share any details."],
  [
    "What happens after launch?",
    "Any bugs are fixed free for 30 days. After that, a monthly care plan covers updates, backups, monitoring and small changes, if you want one.",
  ],
  [
    "Do you work with clients outside India?",
    "Yes. We're based in Delhi NCR and work with clients online, including an ongoing project for a catering business in Thailand.",
  ],
  [
    "Can you work on a website or app we already have?",
    "Yes. We usually start with an audit, then fix, improve or extend what's there.",
  ],
  [
    "Which technologies do you use?",
    "Mostly React, Next.js, TypeScript, Node.js and Python, with PostgreSQL or Supabase for data. The full list is in our tech stack above.",
  ],
];
