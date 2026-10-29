/* bigO Agents: the catalogue and page copy, written for mid-size and large
   companies. Every agent is described the same way: the problem, how it's
   handled today, what the agent automates, what the team still does.
   Examples are illustrative and labelled as such; no client names or results. */

export type Department = "sales" | "support" | "operations" | "hr" | "finance";
export type Channel = "Web" | "WhatsApp" | "Phone" | "Email" | "Slack or Teams";

export interface Agent {
  id: string;
  name: string;
  /** Short name used in the pre-book form and booking notes */
  short: string;
  department: Department;
  /** The problem, in the words a department head would use */
  problem: string;
  /** How the work is done today, before the agent */
  today: string[];
  /** What the agent takes off the team */
  automates: string[];
  /** What stays with people */
  team: string;
  channels: Channel[];
  /** Systems it works with, described by type rather than brand */
  connects: string[];
  example: { label: string; lines: { from: "customer" | "agent"; text: string; note?: string }[] };
}

export const DEPARTMENTS: { id: Department; label: string; text: string }[] = [
  { id: "sales", label: "Sales", text: "Respond faster and spend time only on buyers" },
  { id: "support", label: "Customer support", text: "Answer the repeat questions so people handle the hard ones" },
  { id: "operations", label: "Operations", text: "Keep partners and your own staff moving without waiting" },
  { id: "hr", label: "HR", text: "Screen high-volume hiring without adding recruiters" },
  { id: "finance", label: "Finance", text: "Reminders and follow-ups that don't need a person" },
];

export const AGENTS: Agent[] = [
  {
    id: "leads",
    name: "Lead qualification and follow-up agent",
    short: "Lead qualification and follow-up",
    department: "sales",
    problem: "Leads wait hours for a first reply, sales spends time on enquiries that never buy, and good leads go cold without follow-up.",
    today: ["Enquiries sit in an inbox until someone is free", "Sales asks every lead the same basic questions", "Quiet leads and open quotes are never chased"],
    automates: [
      "Replies to every new enquiry within seconds, day and night",
      "Asks your questions on requirement, budget, timeline and location",
      "Scores each lead and alerts the right salesperson, with everything in your CRM",
      "Follows up on quiet leads and open quotes until they buy or say no",
    ],
    team: "Your sales team talks only to qualified, warm leads.",
    channels: ["Web", "WhatsApp", "Email"],
    connects: ["CRM", "Email", "Calendar"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "We need packaging for a new product line. Can you help?" },
        { from: "agent", text: "Yes. Roughly how many units a month, and when do you need the first batch?" },
        { from: "customer", text: "About 20,000 a month, starting in March." },
        { from: "agent", text: "Thank you. I've passed this to our packaging team, who'll call you today.", note: "Qualified lead created in CRM" },
      ],
    },
  },
  {
    id: "calling",
    name: "AI calling agent",
    short: "AI calling agent",
    department: "sales",
    problem: "Calls are missed after hours or when every line is busy, and your leads wait too long for someone to call them.",
    today: ["Calls ring out after hours or go to voicemail", "Callers who don't get through try a competitor", "Leads and follow-ups wait until someone finds time to call"],
    automates: [
      "Answers every inbound call, including after hours and at peak times",
      "Calls your leads, from a new enquiry to a whole lead list",
      "Qualifies each lead and books meetings or visits on the call",
      "Makes follow-up calls on quotes, renewals and payments",
      "Calls to confirm bookings and remind about appointments",
      "Updates every lead in your CRM or sheet, with a summary of each call",
    ],
    team: "Your sales team calls back the interested leads, with a summary of each call ready. It can also take on any other agent's job by phone.",
    channels: ["Phone"],
    connects: ["Phone line", "CRM or lead sheet", "Calendar"],
    example: {
      label: "Outbound call to a lead",
      lines: [
        { from: "agent", text: "Hi Priya, this is the assistant from Skyline Homes. You enquired about our Sector 62 project. Is now a good time?" },
        { from: "customer", text: "Yes, briefly." },
        { from: "agent", text: "Are you looking at a 2 or 3 BHK, and when are you planning to buy?" },
        { from: "customer", text: "3 BHK, in the next three months." },
        { from: "agent", text: "Thank you. Shall I book a site visit this Saturday at 11:00?", note: "Lead qualified · Visit booked · CRM updated" },
      ],
    },
  },
  {
    id: "sales",
    name: "Sales and product agent",
    short: "Sales and products",
    department: "sales",
    problem: "Buyers ask detailed product and pricing questions that take your sales team away from closing.",
    today: ["Sales answers the same product questions all day", "Buyers wait for brochures, specs and quotes", "Comparisons depend on who picks up"],
    automates: [
      "Asks what the buyer needs before recommending",
      "Answers product, spec and comparison questions from your catalogue",
      "Shares brochures, price lists and order or payment links",
      "Hands warm buyers to sales with the conversation attached",
    ],
    team: "Sales handles negotiation and closing; the agent handles the questions before it.",
    channels: ["Web", "WhatsApp", "Email"],
    connects: ["Product catalogue", "CRM", "Payment links"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "What's the difference between your 3HP and 5HP pumps?" },
        { from: "agent", text: "The 5HP handles higher flow for multi-storey buildings. How many floors are you supplying?", note: "From: Product catalogue" },
      ],
    },
  },
  {
    id: "support",
    name: "Customer support agent",
    short: "Customer support",
    department: "support",
    problem: "Your support team answers the same questions every day, and customers wait in a queue for simple answers.",
    today: ["The same questions arrive by chat, email and phone", "Customers wait for office hours or a free agent", "Answers vary by who replies"],
    automates: [
      "Answers questions from your manuals, policies and FAQs, with the source",
      "Works across your website, WhatsApp and phone at once",
      "Creates a ticket with the full conversation when a person is needed",
      "Keeps every conversation searchable for your team",
    ],
    team: "Your support team handles complex cases and complaints, not repeat questions.",
    channels: ["Web", "WhatsApp", "Email"],
    connects: ["Helpdesk", "Knowledge base", "CRM"],
    example: {
      label: "Website chat",
      lines: [
        { from: "customer", text: "What's the warranty on the commercial range?" },
        { from: "agent", text: "Two years on parts and one year on labour, from the installation date.", note: "From: Warranty policy" },
      ],
    },
  },
  {
    id: "orders",
    name: "Order and dealer support agent",
    short: "Orders and dealer support",
    department: "operations",
    problem: "Customers and dealers message and call all day for stock, prices, order status and invoices.",
    today: ["Staff look up stock, prices and orders in several systems", "Orders arrive on WhatsApp and calls, then get typed in again", "The same status question arrives several times a day"],
    automates: [
      "Answers stock, price list and scheme questions from your systems",
      "Takes new and repeat orders and enters them in your ERP",
      "Gives live order and delivery status, and shares invoices and documents",
      "Flags delays and exceptions to your team",
    ],
    team: "Your order desk handles exceptions and relationships, not lookups.",
    channels: ["Web", "WhatsApp", "Email"],
    connects: ["ERP or order system", "Price lists", "Logistics tracking"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Do you have 40 units of the 3HP pump in stock?" },
        { from: "agent", text: "Yes, 40 units are available at the Pune warehouse. Shall I place the order on your dealer account?", note: "From: Stock levels" },
        { from: "customer", text: "Yes, same delivery address." },
        { from: "agent", text: "Order placed for 40 units. Dispatch details will follow.", note: "Order created in ERP" },
      ],
    },
  },
  {
    id: "booking",
    name: "Appointment booking agent",
    short: "Appointment booking",
    department: "support",
    problem: "Booking, rescheduling and confirming appointments takes hours of back-and-forth across branches.",
    today: ["Bookings are taken by phone and typed into a calendar", "Reschedules mean another round of calls", "No-shows go unnoticed until the slot is empty"],
    automates: [
      "Offers free slots from the right branch or person's calendar",
      "Books, confirms and reminds automatically",
      "Handles reschedules and cancellations",
      "Fills cancelled slots from a waiting list",
    ],
    team: "Front desks and coordinators work from a calendar that's already full.",
    channels: ["Web", "WhatsApp", "Email"],
    connects: ["Calendar or booking system", "CRM", "WhatsApp Business"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Can I see an orthopaedic doctor at the Noida branch this week?" },
        { from: "agent", text: "Dr Mehta has Thursday 11:00 or Friday 16:30 at Noida. Which suits you?" },
        { from: "customer", text: "Thursday." },
        { from: "agent", text: "Booked for Thursday at 11:00. You'll get a reminder the day before.", note: "Added to branch calendar" },
      ],
    },
  },
  {
    id: "feedback",
    name: "Feedback and reviews agent",
    short: "Feedback and reviews",
    department: "support",
    problem: "You hear about unhappy customers too late, and happy ones rarely leave a review.",
    today: ["Feedback forms go unanswered", "Complaints surface on public review sites", "Nobody asks satisfied customers for a review"],
    automates: [
      "Checks in after a delivery, visit or service",
      "Sends unhappy responses to your team straight away",
      "Invites happy customers to leave a review",
      "Summarises feedback by branch, product or team",
    ],
    team: "Managers act on problems while the customer is still listening.",
    channels: ["WhatsApp", "Email"],
    connects: ["CRM", "Review profiles", "Helpdesk"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "agent", text: "Your installation was completed today. How did it go, from 1 to 5?" },
        { from: "customer", text: "2, the technician was late" },
        { from: "agent", text: "I'm sorry about that. I've passed this to the service manager, who'll call you today.", note: "Escalated to service manager" },
      ],
    },
  },
  {
    id: "ops",
    name: "Operations automation agent",
    short: "Operations automation",
    department: "operations",
    problem: "Your team spends hours updating sheets, portals and systems by hand, and managers chase people for status.",
    today: [
      "Orders, leads and updates are re-typed into several systems",
      "Dashboards and reports are out of date by the time they're read",
      "People hear about changes late, or not at all",
    ],
    automates: [
      "Reads emails, forms and documents as they arrive",
      "Updates your CRM, ERP, sheets and portals automatically",
      "Keeps dashboards current and sends daily summaries to managers",
      "Tells the right people on WhatsApp, email or Slack when something changes or runs late",
    ],
    team: "Your team works on exceptions and decisions, not data entry.",
    channels: ["Email", "WhatsApp", "Slack or Teams"],
    connects: ["CRM or ERP", "Sheets and portals", "Dashboards"],
    example: {
      label: "Team chat",
      lines: [
        { from: "agent", text: "Daily update: 18 new orders entered, 3 dispatches running late at the Pune warehouse.", note: "ERP and dashboard updated" },
        { from: "customer", text: "Who's handling the Pune delays?" },
        { from: "agent", text: "Ravi from dispatch. I've sent him the order list and will tell you when they're cleared.", note: "Ravi notified on WhatsApp" },
      ],
    },
  },
  {
    id: "knowledge",
    name: "Internal knowledge assistant",
    short: "Internal knowledge",
    department: "operations",
    problem: "Staff can't find answers in SOPs, policies and past documents, so they ask colleagues.",
    today: ["Answers live in scattered documents and drives", "New staff ask senior people the same questions", "Processes are followed differently by each team"],
    automates: [
      "Answers questions from your SOPs, policies and manuals",
      "Links to the exact document and section",
      "Helps new staff get up to speed",
      "Keeps answers inside your company",
    ],
    team: "Senior staff stop being the help desk for everyone else.",
    channels: ["Web", "Slack or Teams"],
    connects: ["Document drive", "Intranet", "Slack or Teams"],
    example: {
      label: "Team chat",
      lines: [
        { from: "customer", text: "What's the approval limit for purchase orders without the CFO?" },
        { from: "agent", text: "Up to ₹5 lakh with a department head's approval. Above that, the CFO signs off.", note: "Source: Purchase policy, section 3" },
      ],
    },
  },
  {
    id: "recruitment",
    name: "Recruitment screening agent",
    short: "Recruitment screening",
    department: "hr",
    problem: "High-volume hiring floods HR with applications and the same candidate questions.",
    today: ["Recruiters call every applicant to screen them", "Candidates ask about pay, shifts and location again and again", "Interview scheduling takes days of messages"],
    automates: [
      "Answers candidate questions about the role, pay and location",
      "Asks your screening questions and checks the basics",
      "Shortlists candidates against your criteria",
      "Books interviews with the right recruiter",
    ],
    team: "Recruiters interview a shortlist instead of screening everyone.",
    channels: ["Web", "WhatsApp", "Email"],
    connects: ["Applicant tracking system", "Calendar", "Job boards"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Is the warehouse supervisor role still open?" },
        { from: "agent", text: "Yes. Do you have at least two years of warehouse experience, and can you work rotating shifts?" },
      ],
    },
  },
  {
    id: "payments",
    name: "Billing and collections agent",
    short: "Billing and collections",
    department: "finance",
    problem: "Your accounts team spends days sending invoice reminders, chasing overdue payments and tracking renewals.",
    today: ["Reminders are sent one by one", "Overdue accounts are chased by phone", "Renewals are noticed after they lapse"],
    automates: [
      "Sends invoice, due-date and renewal reminders on schedule",
      "Shares payment links and account statements on request",
      "Records payment promises and follows up on the date",
      "Escalates disputed or long-overdue accounts to your team",
    ],
    team: "Accounts handles disputes and large accounts, not routine reminders.",
    channels: ["WhatsApp", "Email"],
    connects: ["Accounting software", "Payment links", "CRM"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "agent", text: "A reminder that invoice 1187 for ₹84,000 is due on Friday. Here is the payment link." },
        { from: "customer", text: "We'll pay on Monday." },
        { from: "agent", text: "Noted for Monday. I'll send the link again that morning.", note: "Payment promise recorded" },
      ],
    },
  },
];

export const agentById = (id: string | null | undefined) => AGENTS.find((a) => a.id === id);

/** "Which of these sounds like your company?" — each problem points to an agent */
export const PROBLEM_FINDER: { problem: string; agent: string }[] = [
  { problem: "Leads wait hours for a first reply", agent: "leads" },
  { problem: "Calls are missed after hours or when lines are busy", agent: "calling" },
  { problem: "We have leads to call but no time to call them all", agent: "calling" },
  { problem: "Support answers the same questions every day", agent: "support" },
  { problem: "Customers keep asking for order or delivery status", agent: "orders" },
  { problem: "Leads and quotes go cold without follow-up", agent: "leads" },
  { problem: "Dealers and partners call all day for stock and prices", agent: "orders" },
  { problem: "Our team updates sheets, portals and systems by hand", agent: "ops" },
  { problem: "Managers chase people for status updates", agent: "ops" },
  { problem: "Reports take hours to put together every week", agent: "ops" },
  { problem: "Payment reminders eat up the accounts team's week", agent: "payments" },
  { problem: "Booking and rescheduling takes hours across branches", agent: "booking" },
  { problem: "High-volume hiring floods HR", agent: "recruitment" },
  { problem: "Staff can't find answers in SOPs and policies", agent: "knowledge" },
];

export const INDUSTRIES: { name: string; uses: string[]; agents: string[] }[] = [
  {
    name: "Manufacturing and distribution",
    uses: ["Dealer stock, price and order queries", "Repeat orders on WhatsApp", "Invoice and payment follow-ups"],
    agents: ["orders", "ops", "payments"],
  },
  {
    name: "Real estate developers",
    uses: ["Project enquiries from ads and portals", "Buyer qualification by budget and location", "Site visit bookings and follow-ups"],
    agents: ["leads", "calling", "booking"],
  },
  {
    name: "Hospitals and healthcare chains",
    uses: ["Appointments across branches and doctors", "Report, billing and timing questions", "Reminders and post-visit feedback"],
    agents: ["booking", "support", "feedback"],
  },
  {
    name: "Education groups and edtech",
    uses: ["Admission and course enquiries", "Counselling call bookings", "Fee reminders"],
    agents: ["leads", "calling", "payments"],
  },
  {
    name: "Banking, lending and insurance",
    uses: ["Loan and policy enquiries", "Document checklists and collection", "Renewal and EMI reminders"],
    agents: ["leads", "calling", "payments"],
  },
  {
    name: "Logistics",
    uses: ["Shipment and delivery status", "Booking requests and quotes", "Delivery exceptions flagged to operations"],
    agents: ["orders", "ops", "sales", "support"],
  },
  {
    name: "Hospitality and travel",
    uses: ["Group, event and corporate enquiries", "Reservations and changes", "Guest feedback and reviews"],
    agents: ["leads", "booking", "feedback"],
  },
  {
    name: "Retail and D2C brands",
    uses: ["Order status and returns", "Product questions and recommendations", "Reviews after delivery"],
    agents: ["orders", "sales", "feedback"],
  },
  {
    name: "IT, SaaS and professional services",
    uses: ["Inbound lead qualification", "Demo and discovery call booking", "First-line support and internal knowledge"],
    agents: ["leads", "support", "knowledge"],
  },
];

export const ROLLOUT: { title: string; text: string }[] = [
  { title: "Discovery", text: "We learn how your teams handle enquiries today." },
  { title: "Pilot", text: "One agent on one team, tested on real questions." },
  { title: "Connect", text: "Leads and bookings land in your CRM and tools." },
  { title: "Scale", text: "Add agents, teams and branches once it works." },
  { title: "Improve", text: "We review conversations with you every month." },
];

export const BUILT_FOR: [string, string][] = [
  [
    "Works with your systems",
    "Connected to your CRM, helpdesk, calendars and order system, so nothing is typed twice.",
  ],
  [
    "Several branches, one setup",
    "One agent can serve every location and route each conversation to the right branch or team.",
  ],
  [
    "A person is always one step away",
    "Sensitive or uncertain conversations move to your team with the full history. Callers can ask for a person at any time.",
  ],
  [
    "Access by role",
    "Managers see across teams; each team sees its own conversations. Every answer and action can be reviewed.",
  ],
  [
    "Your data stays in your systems",
    "Leads, tickets and summaries go to your own tools. We don't keep your customers' data for our own use, and nothing is shared between businesses.",
  ],
  [
    "Calling done properly",
    "Outbound calls follow telemarketing rules, and anyone who asks not to be called again is taken off the list. You see every call's transcript and summary.",
  ],
];

/** Types of system we connect to, with examples; not partnerships */
export const CONNECTIONS: [string, string[]][] = [
  ["CRM", ["HubSpot", "Zoho CRM", "Salesforce"]],
  ["Calendars", ["Google Calendar", "Microsoft Outlook", "Cal.com"]],
  ["Messaging", ["WhatsApp Business", "Website chat", "Email"]],
  ["Phone", ["A new business number", "Your existing line, forwarded"]],
];

export const PLANS: { name: string; for: string; includes: string[]; featured?: boolean }[] = [
  {
    name: "Pilot",
    for: "One agent on one team, to prove it on real conversations.",
    includes: [
      "One agent on one channel",
      "Answers from your own documents",
      "Leads or tickets sent to your existing tools",
      "Hand-over to your team",
      "Review of results before you scale",
    ],
  },
  {
    name: "Scale",
    for: "Several agents across teams, on chat and phone.",
    includes: [
      "Everything in Pilot",
      "Several agents sharing one knowledge base",
      "Website, WhatsApp and the AI calling agent",
      "CRM, helpdesk and calendar connections",
      "Dashboard for conversations, leads and bookings",
      "Monthly improvements based on real conversations",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    for: "Many teams and branches, connected to your core systems.",
    includes: [
      "Everything in Scale",
      "Several branches, brands or business units",
      "Connections to your ERP or order systems",
      "Access by role, and review of every conversation",
      "A named point of contact",
    ],
  },
];

export const FAQ: [string, string][] = [
  [
    "Will it give our customers wrong answers?",
    "It answers from the knowledge you give it, and the steps that matter, like qualification and booking, follow a fixed flow rather than free generation. When it isn't confident, it hands the conversation to your team instead of guessing.",
  ],
  [
    "Can it connect to our CRM or ERP?",
    "Yes. We connect agents to the systems your teams already use, such as your CRM, helpdesk, calendars and order or ERP system, so leads, tickets and orders land there directly. We confirm exactly what we'll connect during the discovery workshop.",
  ],
  [
    "Can we start with one team?",
    "Yes, and we recommend it. Most companies start with a pilot on one team or channel, review the results, then add agents and teams.",
  ],
  [
    "Do our teams need technical knowledge?",
    "No. We do the setup, the integrations and the updates. Your teams see conversations and leads in a dashboard or in the tools they already use.",
  ],
  [
    "What happens to our customers' data?",
    "Leads, tickets and summaries go to your own systems. We don't keep your customers' data for our own use, and each business's knowledge and conversations are kept separate from every other client's.",
  ],
  [
    "How does the AI calling agent work?",
    "It connects to a phone number, either a new one we set up or your existing line forwarded to it. It speaks English in a natural voice, follows the same knowledge and flow as your chat agent, and can transfer the call to your team. Outbound, it can work through new enquiries or a whole lead list at the times you choose, following telemarketing rules, and stops calling anyone who asks it to.",
  ],
  [
    "How is it priced?",
    "A one-time setup and a monthly plan covering hosting, AI usage and ongoing improvements. We quote after the first call, because it depends on your teams, channels and volume.",
  ],
  [
    "What does pre-booking mean?",
    "bigO Agents is in early access. Pre-booking reserves one of a small number of founding-client slots, with a reduced setup fee in return for feedback. There's nothing to pay now; we'll contact you to plan your setup.",
  ],
  [
    "We're an agency. Can we offer this to our clients?",
    "Yes. Choose ‘Agency partner’ in the form. We're opening a white-label partner programme: your brand and your pricing, with us running the technology.",
  ],
];
