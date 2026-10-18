/* Site copy. Terms the team has confirmed: a free first call with no set
   length, a written fixed-price proposal, milestone payments, client
   ownership of code and designs once paid in full, NDAs on request, 30 days
   of free fixes after launch and optional monthly care plans. Anything not
   confirmed (prices, timelines, results, names) is a [bracketed placeholder]
   rendered by <Ph>, so it's easy to find and replace. */

export const HERO = {
  label: "Software and AI automation studio · Delhi NCR",
  title: "Custom software and AI automation for growing businesses.",
  lead: "We replace spreadsheets, inbox juggling and copy-paste work with web apps, client portals, AI assistants and automated workflows. Built by a small team you talk to directly.",
};

/** The four commitments every client gets, shown under the hero */
export const COMMITMENTS: [string, string][] = [
  ["Fixed price", "Agreed in writing before any work starts"],
  ["Your code", "You own the code and designs once paid"],
  ["Direct access", "You talk to the people building it"],
  ["Support", "30 days of free fixes after launch"],
];

/** 01 — problems we solve: [problem, what we build, what changes] */
export const PROBLEMS: [string, string, string][] = [
  [
    "Your team copies the same data between spreadsheets, email and other tools.",
    "Workflow automation and integrations",
    "Data moves between your systems on its own, without retyping or mistakes.",
  ],
  [
    "Customers keep calling and emailing to ask where things stand.",
    "A client portal",
    "Clients log in to see progress, documents and invoices for themselves.",
  ],
  [
    "The same questions arrive all day on WhatsApp, email and your website.",
    "An AI assistant trained on your own information",
    "Common questions are answered instantly, and anything complex goes to a person.",
  ],
  [
    "The business runs on spreadsheets that break, get overwritten and can't grow.",
    "A custom web app or internal tool",
    "One reliable system, with the right access for each person and a full history.",
  ],
  [
    "Useful information is stuck in PDFs, emails and other websites.",
    "AI data extraction",
    "Clean, structured records you can search, filter and report on.",
  ],
];

export interface Service {
  id: string;
  num: string;
  title: string;
  /** One sentence for the home page */
  short: string;
  fit: string[];
  builds: string[];
  included: string[];
  timeline: string;
  price: string;
  /** A project on /work that shows this kind of work */
  example?: string;
}

/** 02 — the four core services */
export const SERVICES: Service[] = [
  {
    id: "web-apps",
    num: "01",
    title: "Web apps and internal tools",
    short: "Custom systems built around how your business works, replacing spreadsheets and manual steps.",
    fit: [
      "Your business runs on spreadsheets that keep breaking",
      "Off-the-shelf software forces you to work its way, not yours",
      "Several people need different access to the same information",
    ],
    builds: [
      "Dashboards and admin panels",
      "Order, booking and job management systems",
      "Marketplaces and multi-sided platforms",
      "Installable web apps (PWA) for phones and desktops",
    ],
    included: [
      "Requirements, scope and a technical plan agreed up front",
      "User flows and interface design before development",
      "Front end, back end, database and hosting",
      "Logins, roles, payments and security",
    ],
    timeline: "[— weeks]",
    price: "[₹ —]",
    example: "hirearn",
  },
  {
    id: "client-portals",
    num: "02",
    title: "Client portals",
    short: "A secure place where your customers log in to track progress, share files and pay invoices.",
    fit: [
      "Clients regularly call or email to ask for updates",
      "Documents and approvals get lost in email threads",
      "You want to look more organised than your competitors",
    ],
    builds: [
      "Customer accounts with secure login",
      "Project or order status pages",
      "File sharing, approvals and messages",
      "Invoices and online payments",
    ],
    included: [
      "A walkthrough of how you work with clients today",
      "Your branding on every screen",
      "Admin tools for your team",
      "Testing on phones, tablets and desktops",
    ],
    timeline: "[— weeks]",
    price: "[₹ —]",
  },
  {
    id: "ai-assistants",
    num: "03",
    title: "AI chatbots and assistants",
    short: "Assistants that answer questions from your own documents and data, on your website, WhatsApp or inside your product.",
    fit: [
      "Your team answers the same questions every day",
      "Customers wait for replies outside office hours",
      "Information is spread across documents nobody can search",
    ],
    builds: [
      "Website and WhatsApp assistants",
      "Internal assistants that search your documents",
      "Data extraction from PDFs, emails and web pages",
      "Drafts and summaries for replies and reports",
    ],
    included: [
      "A review of where AI helps your process, and where it doesn't",
      "A working prototype on your real data before the full build",
      "Checks, fallbacks and hand-off to a person where accuracy matters",
      "Running costs kept visible",
    ],
    timeline: "[— weeks]",
    price: "[₹ —]",
    example: "nexora",
  },
  {
    id: "automation",
    num: "04",
    title: "Workflow automation and integrations",
    short: "We connect the tools you already use and automate the manual steps in between.",
    fit: [
      "Someone on your team copies data between tools every day",
      "Orders, leads or bookings arrive in several places",
      "Reports take hours to put together by hand",
    ],
    builds: [
      "Connections between your CRM, accounting, forms, email and WhatsApp",
      "Automatic order, lead and booking processing",
      "Scheduled reports and alerts",
      "Pipelines that collect and update data on their own",
    ],
    included: [
      "A map of the current process and where time goes",
      "Automations with logs, so you can see what ran and when",
      "Error alerts and a simple way to retry",
      "Documentation your team can follow",
    ],
    timeline: "[— weeks]",
    price: "[₹ —]",
    example: "nexora",
  },
];

/** Secondary services — available around the software we build */
export const ALSO: [string, string][] = [
  ["Websites and online stores", "Fast, search-friendly business websites with booking, payments and WhatsApp built in."],
  ["UI/UX and brand design", "Interface design, prototypes, logos and brand guidelines for the products we build."],
  ["Care and maintenance", "Security updates, backups, monitoring, bug fixes and small changes, on a monthly plan."],
  ["Technical consulting", "Audits of existing websites and apps, product roadmaps and help choosing the right tools."],
  ["Digital marketing", "SEO, social media, ads and email for clients who want help being found."],
];

/** 04 — how we work */
export const PROCESS: [string, string][] = [
  ["Free call", "We talk through what you need, for as long as it takes. No cost and no obligation."],
  ["Fixed-price proposal", "You get the scope, timeline and one fixed price in writing before any work starts."],
  ["Build in milestones", "We build in stages you can review and test, with payments tied to each milestone."],
  ["Launch and support", "We launch, fix any bugs free for 30 days, and offer a monthly care plan after that."],
];

/** 05 — tech stack, grouped */
export const STACK: [string, string][] = [
  ["Front end", "React, Next.js, TypeScript, Tailwind CSS"],
  ["Back end", "Node.js, Python, FastAPI, Hono"],
  ["Data", "PostgreSQL, Supabase, MongoDB"],
  ["AI and automation", "LLM APIs, vector search, scheduled jobs on GitHub Actions"],
  ["Hosting and payments", "Vercel, Stripe"],
];

export interface Plan {
  name: string;
  price: string;
  unit: string;
  text: string;
  points: string[];
}

/** 06 — pricing. Prices and timelines are placeholders until confirmed. */
export const PLANS: Plan[] = [
  {
    name: "Automation or integration",
    price: "From [₹ —]",
    unit: "Fixed price",
    text: "Connect your tools, automate a manual process or add an AI assistant to your website.",
    points: ["Free first call", "Written scope and fixed price", "Typical timeline: [— weeks]", "30 days of free fixes"],
  },
  {
    name: "Web app or client portal",
    price: "From [₹ —]",
    unit: "Fixed price",
    text: "A custom system built around your business, with logins, roles and admin tools.",
    points: ["Free first call", "Milestone payments", "Typical timeline: [— weeks]", "30 days of free fixes"],
  },
  {
    name: "Care plan",
    price: "[₹ —]",
    unit: "Per month",
    text: "Hosting, updates, backups, monitoring and small changes after launch.",
    points: ["Security updates", "Backups and monitoring", "Bug fixes and small changes", "Performance checks"],
  },
];

/** 07 — founder note. A draft for the founder to edit and sign. */
export const FOUNDER = {
  note: [
    "I started bigO because good software shouldn't need a big agency.",
    "We keep the team small on purpose. The people on your first call are the people who design and write your code, so nothing gets lost in hand-offs. We agree a fixed price before we start, we show you progress as we go, and we stay around after launch to keep things working.",
  ],
  name: "[Founder name]",
  role: "Founder, bigO",
};

export const FAQ: [string, string][] = [
  [
    "How much does a project cost?",
    "It depends on what you need built, so we quote each project separately. After the first call you get one fixed price in writing. If you want to add something later, we agree the change in writing before starting on it.",
  ],
  [
    "How long does it take?",
    "That depends on the scope. Your proposal includes the timeline, split into milestones so you can see progress as it happens.",
  ],
  [
    "How do payments work?",
    "In milestones agreed in the proposal: usually one payment to start, one at a midpoint such as design sign-off or a beta, and the last at launch.",
  ],
  [
    "Who owns the code and designs?",
    "You do. Once the project is paid in full, the code, designs and accounts are yours.",
  ],
  [
    "Can you work with the tools we already use?",
    "Yes. Connecting the tools you already use, such as your CRM, accounting software, forms, email and WhatsApp, is a core part of what we do.",
  ],
  [
    "What happens after launch?",
    "Any bugs are fixed free for 30 days. After that, a monthly care plan covers updates, backups, monitoring and small changes, if you want one.",
  ],
  ["Will you sign an NDA?", "Yes. We're happy to sign one before you share any details."],
  [
    "Can you work on a system we already have?",
    "Yes. We usually start with an audit, then fix, improve or extend what's there.",
  ],
  [
    "Do you work with clients outside India?",
    "Yes. We're based in Delhi NCR and work with clients online, including an ongoing project for a catering business in Thailand.",
  ],
];

/** The five questions shown on the home page */
export const HOME_FAQ = [0, 1, 3, 4, 5].map((i) => FAQ[i]);
