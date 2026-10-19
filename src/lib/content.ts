/* Site copy. Terms the team has confirmed: a free first call with no set
   length, a written fixed-price proposal, milestone payments, client
   ownership of code and designs once paid in full, NDAs on request, 30 days
   of free fixes after launch and optional monthly care plans. Anything not
   confirmed (timelines, results) is a [bracketed placeholder]
   rendered by <Ph>, so it's easy to find and replace. */

export const HERO = {
  label: "Software and AI automation studio · Delhi NCR",
  title: "Custom software and AI automation for growing businesses.",
  lead: "We replace spreadsheets, inbox juggling and copy-paste work with web apps, client portals, AI assistants and automated workflows. Built by a small team you talk to directly.",
};

/** Hero panel: example automations of the kind we build. Each step has an
 *  icon and reveals one field of the "live output" card. Sample data is
 *  fictional and the panel is labelled as an example. */
export type WorkflowIcon =
  | "mail" | "ai" | "database" | "pen" | "bell"
  | "lock" | "chart" | "file" | "card" | "scan" | "shield" | "flag";

export interface Workflow {
  name: string;
  trigger: string;
  /** Light / dark accent for this workflow */
  color: [string, string];
  steps: { text: string; icon: WorkflowIcon; out: [string, string] }[];
  output: { title: string; preview: string };
}

export const WORKFLOWS: Workflow[] = [
  {
    name: "Enquiries",
    trigger: "new enquiry",
    color: ["#2f50ca", "#93a8f0"],
    output: { title: "New enquiry · website form", preview: "“Hi, could you quote for 200 lunch boxes next Friday?”" },
    steps: [
      { text: "Email or form enquiry arrives", icon: "mail", out: ["From", "Priya S., Northwind Foods"] },
      { text: "AI reads it and sorts it", icon: "ai", out: ["Type", "Quote request · High priority"] },
      { text: "Contact saved to your CRM", icon: "database", out: ["CRM", "New lead created"] },
      { text: "Reply drafted for approval", icon: "pen", out: ["Draft", "Ready for review"] },
      { text: "Right person notified", icon: "bell", out: ["Assigned", "Sales team"] },
    ],
  },
  {
    name: "Client portal",
    trigger: "client login",
    color: ["#0f8a62", "#5fd3a6"],
    output: { title: "Client portal · Acme Interiors", preview: "Project: Showroom website" },
    steps: [
      { text: "Client signs in securely", icon: "lock", out: ["Access", "Two-step sign-in"] },
      { text: "Sees status and next steps", icon: "chart", out: ["Progress", "Design approved · 60%"] },
      { text: "Approves documents", icon: "file", out: ["Approved", "Homepage design v3"] },
      { text: "Pays the invoice online", icon: "card", out: ["Invoice #1042", "Paid"] },
      { text: "Your team is notified", icon: "bell", out: ["Team", "Next milestone started"] },
    ],
  },
  {
    name: "Documents",
    trigger: "new document",
    color: ["#c2620a", "#f2b05e"],
    output: { title: "Supplier invoice · PDF", preview: "invoice_INV-2041.pdf" },
    steps: [
      { text: "PDF attachment arrives", icon: "file", out: ["File", "invoice_INV-2041.pdf"] },
      { text: "AI extracts the key fields", icon: "scan", out: ["Supplier", "Blue River Traders"] },
      { text: "Checked against your rules", icon: "shield", out: ["Check", "Amount matches PO"] },
      { text: "Saved to your database", icon: "database", out: ["Record", "Added to payables"] },
      { text: "Exceptions flagged", icon: "flag", out: ["Review", "1 line needs a look"] },
    ],
  },
];

/** Four engineering basics every project gets, shown under the hero */
export const COMMITMENTS: [string, string][] = [
  ["Secure by default", "Logins, roles and encrypted connections from day one"],
  ["Tested end to end", "Checked on phones, tablets and desktops before launch"],
  ["Built to scale", "Mainstream tools that grow with your business"],
  ["Code you own", "Full source, accounts and documentation handed over"],
];

/** 04 — how we build: the engineering standards behind every project */
export const STANDARDS: [string, string][] = [
  [
    "Security built in",
    "Authentication, role-based access, encrypted connections and secrets kept out of the code. Your data is only visible to the people who should see it.",
  ],
  [
    "Tested before every launch",
    "Forms, integrations, payments and permissions are checked end to end, on phones, tablets and desktops and in every major browser.",
  ],
  [
    "Fast on any connection",
    "Server-rendered pages, optimised images and lean code, so your app stays quick on mobile networks and older devices.",
  ],
  [
    "Version control and previews",
    "All code lives in Git. Every change gets its own preview link you can try before it goes live, and any release can be rolled back.",
  ],
  [
    "AI with guardrails",
    "Validation, fallbacks and hand-off to a person where accuracy matters, with usage and running costs kept visible.",
  ],
  [
    "Monitoring and backups",
    "Once live, uptime monitoring, error alerts and regular database backups mean problems are caught and fixed early.",
  ],
  [
    "Clean, documented handover",
    "Readable code, written documentation, and admin access and accounts in your name, so any developer can pick it up.",
  ],
  [
    "Architecture that grows",
    "A clear separation between front end, back end and data, so adding features, users or integrations doesn't mean starting again.",
  ],
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

/** 04 — tech stack, grouped */
export const STACK: [string, string][] = [
  ["Front end", "React, Next.js, TypeScript, Tailwind CSS"],
  ["Back end", "Node.js, Python, FastAPI, Hono"],
  ["Data", "PostgreSQL, Supabase, MongoDB"],
  ["AI and automation", "LLM APIs, vector search, scheduled jobs on GitHub Actions"],
  ["Hosting and payments", "Vercel, Stripe"],
];

/** 05 — founder note */
export const FOUNDER = {
  note: [
    "I started bigO because good software shouldn't need a big agency.",
    "We keep the team small on purpose. The people on your first call are the people who design and write your code, so nothing gets lost in hand-offs. We agree the scope in writing before we start, we show you progress as we go, and we stay around after launch to keep things working.",
  ],
  name: "Alok Kumar",
  role: "Founder, bigO",
  photo: "/images/team/alok-kumar.jpg",
};

export const FAQ: [string, string][] = [
  [
    "How long does it take?",
    "That depends on the scope. Your proposal includes the timeline, split into milestones so you can see progress as it happens.",
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
export const HOME_FAQ = [0, 1, 2, 3, 4].map((i) => FAQ[i]);
