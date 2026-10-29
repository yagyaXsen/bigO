/* Site copy. Only confirmed facts: a free first call with no set length, a
   written proposal agreed before work starts, milestone payments, client
   ownership of code and designs once paid in full, NDAs on request, 30 days
   of free fixes after launch and optional monthly care plans. Where real
   numbers (results, timelines) are missing, the design leaves them out
   rather than showing placeholders. */

export const HERO = {
  kicker: "bigO · software studio · Delhi NCR",
  title: "Every business has a slow part. We write the software that fixes it.",
  lead: "Web apps, client portals, AI assistants and automations for growing businesses that have outgrown spreadsheets and copy-paste. You talk directly to the people writing the code.",
  /* Why the name: one quiet line, never jargon-heavy */
  name: "In engineering, Big O describes how work grows as a business grows. We take the jobs that grow with every order, client or message, and make them stay small.",
};

/** The terms every client gets, in the order people ask about them */
export const TERMS: [string, string][] = [
  ["Free first call", "No set length, no obligation"],
  ["Scope in writing", "Agreed before any work starts"],
  ["You own the code", "Code, designs and accounts are yours once paid"],
  ["30 days of fixes", "Any bug after launch, fixed free"],
];

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

/** How we build: the engineering standards behind every project */
export const STANDARDS: [string, string][] = [
  ["Security from day one", "Role-based access and encrypted connections."],
  ["Tested before every launch", "Checked end to end on every device."],
  ["Fast on real phones", "Quick on mobile data and older devices."],
  ["Every change previewed", "Try each change before it goes live."],
  ["AI with guardrails", "Checks, and a person where accuracy matters."],
  ["Yours to keep", "Your code, your accounts, full documentation."],
];

/** 01 — problems we solve. `service` is the matching id on /services;
 *  before/after describe the work in plain steps (no invented numbers). */
export interface Problem {
  short: string;
  problem: string;
  build: string;
  service: string;
  change: string;
  before: string[];
  after: string[];
}

export const PROBLEMS: Problem[] = [
  {
    short: "Copy-paste between tools",
    problem: "Your team copies the same data between spreadsheets, email and other tools.",
    build: "Workflow automation and integrations",
    service: "automation",
    change: "Data moves between your systems on its own, without retyping or mistakes.",
    before: ["Order arrives by email", "Someone copies it into a spreadsheet", "Then re-types it into invoicing", "Mistakes are found later, by customers"],
    after: ["Order arrives by email", "Saved to your sheet and invoicing automatically", "Checked for missing details", "Your team gets a short summary"],
  },
  {
    short: "Customers chasing updates",
    problem: "Customers keep calling and emailing to ask where things stand.",
    build: "A client portal",
    service: "client-portals",
    change: "Clients log in to see progress, documents and invoices for themselves.",
    before: ["Client calls to ask for an update", "Someone finds the file and checks progress", "Documents go back and forth by email", "Invoices get chased by phone"],
    after: ["Client logs in to their own portal", "Sees status and next steps at any time", "Downloads and approves documents", "Pays the invoice online"],
  },
  {
    short: "Same questions all day",
    problem: "The same questions arrive all day on WhatsApp, email and your website.",
    build: "An AI assistant trained on your own information",
    service: "ai-assistants",
    change: "Common questions are answered instantly, and anything complex goes to a person.",
    before: ["The same questions arrive all day", "Staff stop work to answer each one", "Replies wait until office hours", "Answers vary by who replies"],
    after: ["Questions are answered instantly, day and night", "Answers come from your own information", "Anything complex is passed to a person", "Your team handles only what needs them"],
  },
  {
    short: "Spreadsheets that break",
    problem: "The business runs on spreadsheets that break, get overwritten and can't grow.",
    build: "A custom web app or internal tool",
    service: "web-apps",
    change: "One reliable system, with the right access for each person and a full history.",
    before: ["Several versions of the same spreadsheet", "Formulas break and data gets overwritten", "Everyone can see and edit everything", "No record of who changed what"],
    after: ["One system everyone works in", "Each person sees what their role needs", "Every change is recorded", "Reports are ready when you need them"],
  },
  {
    short: "Data stuck in documents",
    problem: "Useful information is stuck in PDFs, emails and other websites.",
    build: "AI data extraction",
    service: "ai-assistants",
    change: "Clean, structured records you can search, filter and report on.",
    before: ["Information sits in PDFs and inboxes", "Someone reads and re-types it", "Nothing can be searched or compared", "Details get missed"],
    after: ["Documents are read as they arrive", "Key fields are extracted and checked", "Saved as clean, searchable records", "Unusual cases are flagged for review"],
  },
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

/** Tech stack, grouped */
export const STACK: [string, string[]][] = [
  ["Front end", ["React", "Next.js", "TypeScript", "Tailwind CSS"]],
  ["Back end", ["Node.js", "Python", "FastAPI", "Hono"]],
  ["Data", ["PostgreSQL", "Supabase", "MongoDB"]],
  ["AI and automation", ["LLM APIs", "Vector search", "GitHub Actions"]],
  ["Hosting and payments", ["Vercel", "Stripe"]],
];

/** Founder note */
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

/** The four questions shown on the home page */
export const HOME_FAQ = [0, 1, 3, 4].map((i) => FAQ[i]);

/** Project types for the contact form chips; ids match /contact?type= */
export const PROJECT_TYPES: { id: string; label: string }[] = [
  { id: "web-apps", label: "Web app or internal tool" },
  { id: "client-portals", label: "Client portal" },
  { id: "ai-assistants", label: "AI assistant or chatbot" },
  { id: "automation", label: "Automation or integration" },
  { id: "website", label: "Website" },
  { id: "not-sure", label: "Not sure yet" },
];

/** "Which service do I need?" helper on /services */
export const HELPER = {
  problems: [
    { id: "copy", label: "We copy data between tools by hand" },
    { id: "questions", label: "We answer the same questions all day" },
    { id: "updates", label: "Customers keep asking for updates" },
    { id: "spreadsheets", label: "We've outgrown our spreadsheets" },
    { id: "documents", label: "Information is stuck in PDFs and emails" },
  ],
  users: [
    { id: "team", label: "Our team" },
    { id: "customers", label: "Our customers" },
    { id: "both", label: "Both" },
  ],
  /** problem → who uses it → [main service id, why, also consider] */
  pick(problem: string, users: string): [string, string, string | null] {
    switch (problem) {
      case "copy":
        return ["automation", "Connecting your tools removes the retyping and the mistakes that come with it.", users === "team" ? null : "client-portals"];
      case "questions":
        return ["ai-assistants", "An assistant trained on your own information answers instantly and hands complex cases to a person.", null];
      case "updates":
        return ["client-portals", "A portal lets customers see progress, documents and invoices without calling you.", "automation"];
      case "spreadsheets":
        return users === "customers"
          ? ["client-portals", "Customers get their own secure view, and your team gets one reliable system behind it.", "web-apps"]
          : ["web-apps", "One proper system replaces the fragile spreadsheets, with the right access for each person.", users === "both" ? "client-portals" : null];
      default:
        return ["ai-assistants", "AI data extraction reads documents as they arrive and turns them into clean records.", "automation"];
    }
  },
};
