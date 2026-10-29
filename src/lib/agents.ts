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
    name: "Lead qualification agent",
    short: "Lead qualification",
    department: "sales",
    problem: "Leads wait hours for a first reply, and sales spends its time on enquiries that never buy.",
    today: ["Enquiries sit in an inbox until someone is free", "Sales calls every lead to ask the same basic questions", "Good and bad leads get the same attention"],
    automates: [
      "Replies to every new enquiry within seconds, day and night",
      "Asks your questions on requirement, budget, timeline and location",
      "Scores each lead against what a good customer looks like for you",
      "Creates the lead in your CRM and alerts the right salesperson",
    ],
    team: "Your sales team talks only to qualified leads, with the answers already in the CRM.",
    channels: ["Web", "WhatsApp", "Phone"],
    connects: ["CRM", "Email", "Calendar"],
    example: {
      label: "Website chat",
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
    problem: "Calls are missed after hours or when every line is busy, and new leads wait too long for a call back.",
    today: ["Calls ring out after hours or go to voicemail", "Callers who don't get through try a competitor", "Call-backs depend on someone finding the time"],
    automates: [
      "Answers every inbound call, including after hours and at peak times",
      "Calls new leads back within minutes of their enquiry",
      "Answers questions, qualifies and books appointments on the call",
      "Sends a transcript and summary of every call to your team",
    ],
    team: "Your team takes the calls the agent transfers, and picks up from a written summary.",
    channels: ["Phone"],
    connects: ["Phone line", "CRM", "Calendar"],
    example: {
      label: "Phone call",
      lines: [
        { from: "agent", text: "Good evening, thanks for calling. How can I help?" },
        { from: "customer", text: "I'd like to visit your Sector 62 project this weekend." },
        { from: "agent", text: "Saturday at 11:00 is free. Shall I book it and send the location on WhatsApp?", note: "Site visit booked · Summary sent" },
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
    channels: ["Web", "WhatsApp"],
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
    id: "followup",
    name: "Follow-up and reminder agent",
    short: "Follow-ups and reminders",
    department: "sales",
    problem: "Quotes, renewals and follow-ups fall through because nobody has time to chase every one.",
    today: ["Follow-ups live in spreadsheets and memory", "Quotes go quiet with no second message", "Renewals are noticed after they lapse"],
    automates: [
      "Follows up on open quotes at the intervals you set",
      "Reminds customers about renewals, appointments and next steps",
      "Asks whether they're ready, and books a call when they are",
      "Stops as soon as someone replies or opts out",
    ],
    team: "Your team steps in when a customer is ready to talk.",
    channels: ["WhatsApp", "Phone", "Email"],
    connects: ["CRM", "Calendar", "Email"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "agent", text: "Hi Meera, checking in on the quote we sent last week for 200 units. Any questions I can answer?" },
        { from: "customer", text: "Can we get delivery split over two months?" },
        { from: "agent", text: "I'll ask our team to revise the quote with a split delivery and send it today.", note: "Task created for sales" },
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
    channels: ["Web", "WhatsApp", "Phone"],
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
    name: "Order and enquiry agent",
    short: "Orders and enquiries",
    department: "support",
    problem: "Customers keep calling and messaging to ask about order, delivery and booking status.",
    today: ["Staff look up each order by hand", "The same status question arrives several times", "Customers can only ask during office hours"],
    automates: [
      "Gives live order, delivery and booking status from your systems",
      "Takes new orders and enquiries with every detail you need",
      "Checks details against your rules before confirming",
      "Flags delays and exceptions to your operations team",
    ],
    team: "Your team deals with exceptions, not lookups.",
    channels: ["Web", "WhatsApp", "Phone"],
    connects: ["Order or ERP system", "Logistics tracking", "CRM"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Where is order 48213?" },
        { from: "agent", text: "It left our Pune warehouse this morning and is due tomorrow by 6 pm.", note: "From: Order system" },
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
    channels: ["Web", "WhatsApp", "Phone"],
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
    channels: ["WhatsApp", "Phone", "Email"],
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
    id: "dealers",
    name: "Dealer and partner support agent",
    short: "Dealer and partner support",
    department: "operations",
    problem: "Dealers, distributors and partners call all day for stock, prices, schemes and order updates.",
    today: ["Partners call sales coordinators for every question", "Stock and price checks mean opening several systems", "Orders are taken over the phone and re-typed"],
    automates: [
      "Answers stock, price list and scheme questions from your systems",
      "Takes repeat orders on the partner's account",
      "Shares invoices, dispatch details and documents on request",
      "Sends new schemes and price changes to every partner",
    ],
    team: "Coordinators manage relationships and growth, not lookups.",
    channels: ["WhatsApp", "Phone", "Web"],
    connects: ["ERP or order system", "Price lists", "CRM"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Do you have 40 units of the 3HP pump in stock?" },
        { from: "agent", text: "Yes, 40 units are available at the Pune warehouse. Shall I place the order on your dealer account?", note: "From: Stock levels" },
        { from: "customer", text: "Yes, same delivery address." },
        { from: "agent", text: "Order placed for 40 units. Dispatch details will follow.", note: "Order created" },
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
    channels: ["Web", "WhatsApp", "Phone"],
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
    name: "Payment and collections agent",
    short: "Payments and collections",
    department: "finance",
    problem: "Your accounts team spends days sending payment reminders and chasing overdue invoices.",
    today: ["Reminders are sent one by one", "Overdue accounts are chased by phone", "Payment promises are noted and forgotten"],
    automates: [
      "Sends invoice and due-date reminders on schedule",
      "Shares payment links and account statements on request",
      "Records payment promises and follows up on the date",
      "Escalates disputed or long-overdue accounts to your team",
    ],
    team: "Accounts handles disputes and large accounts, not routine reminders.",
    channels: ["WhatsApp", "Phone", "Email"],
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
  { problem: "Support answers the same questions every day", agent: "support" },
  { problem: "Customers keep asking for order or delivery status", agent: "orders" },
  { problem: "Follow-ups and renewals fall through", agent: "followup" },
  { problem: "Dealers and partners call all day for stock and prices", agent: "dealers" },
  { problem: "Payment reminders eat up the accounts team's week", agent: "payments" },
  { problem: "Booking and rescheduling takes hours across branches", agent: "booking" },
  { problem: "High-volume hiring floods HR", agent: "recruitment" },
  { problem: "Staff can't find answers in SOPs and policies", agent: "knowledge" },
];

export const INDUSTRIES: { name: string; uses: string[]; agents: string[] }[] = [
  {
    name: "Manufacturing and distribution",
    uses: ["Dealer stock, price and order queries", "Repeat orders on WhatsApp", "Invoice and payment follow-ups"],
    agents: ["dealers", "orders", "payments"],
  },
  {
    name: "Real estate developers",
    uses: ["Project enquiries from ads and portals", "Buyer qualification by budget and location", "Site visit bookings and follow-ups"],
    agents: ["leads", "calling", "followup"],
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
    agents: ["leads", "followup", "payments"],
  },
  {
    name: "Logistics",
    uses: ["Shipment and delivery status", "Booking requests and quotes", "Delivery exceptions flagged to operations"],
    agents: ["orders", "sales", "support"],
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
    "Calls with consent",
    "Outbound calls go only to people who have contacted you or agreed to be called. You see every call's transcript and summary.",
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
    "It connects to a phone number, either a new one we set up or your existing line forwarded to it. It speaks English in a natural voice, follows the same knowledge and flow as your chat agent, and can transfer the call to your team. Outbound calls are made only to people who have contacted you or agreed to be called.",
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
