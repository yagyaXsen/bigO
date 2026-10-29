/* bigO Agents: the catalogue and page copy. Examples are illustrative and
   labelled as such on the page; there are no client names or results. */

export type AgentGroup = "sell" | "serve" | "operate";
export type Channel = "Web" | "WhatsApp" | "Phone" | "Email" | "Slack or Teams";

export interface Agent {
  id: string;
  name: string;
  /** Short name used in the pre-book form and booking notes */
  short: string;
  group: AgentGroup;
  does: string;
  tasks: string[];
  channels: Channel[];
  /** A short example exchange; `from: "agent"` lines may carry a note */
  example: { label: string; lines: { from: "customer" | "agent"; text: string; note?: string }[] };
}

export const GROUPS: { id: AgentGroup; label: string; text: string }[] = [
  { id: "sell", label: "Sell", text: "Turn enquiries into customers" },
  { id: "serve", label: "Serve", text: "Look after the customers you have" },
  { id: "operate", label: "Operate", text: "Take load off your own team" },
];

export const AGENTS: Agent[] = [
  {
    id: "support",
    name: "Customer support agent",
    short: "Customer support",
    group: "serve",
    does: "Answers questions about prices, timings, policies and orders from your own documents, day and night.",
    tasks: [
      "Answers from your FAQs, price lists and policy PDFs, with the source noted",
      "Hands the conversation to your team when it isn't sure",
      "Saves every conversation to your dashboard",
    ],
    channels: ["Web", "WhatsApp", "Phone"],
    example: {
      label: "Website chat",
      lines: [
        { from: "customer", text: "Are you open on Sunday?" },
        { from: "agent", text: "Yes, Sundays 10:00 to 14:00. Would you like to book a visit?", note: "From: Opening hours" },
      ],
    },
  },
  {
    id: "leads",
    name: "Lead qualification agent",
    short: "Lead qualification",
    group: "sell",
    does: "Asks every new enquiry the questions your team would ask, then sends the good leads straight to you.",
    tasks: [
      "Asks about need, budget and timing in your words",
      "Scores each lead against what a good customer looks like for you",
      "Sends qualified leads to your CRM, sheet or WhatsApp",
    ],
    channels: ["Web", "WhatsApp", "Phone"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Looking for a 2 BHK to rent." },
        { from: "agent", text: "Happy to help. Which area, and what monthly budget do you have in mind?" },
        { from: "customer", text: "Sector 15, around 30k." },
        { from: "agent", text: "Thanks. I've passed this to our team, who'll share options today.", note: "Lead saved · Team notified" },
      ],
    },
  },
  {
    id: "booking",
    name: "Appointment booking agent",
    short: "Appointment booking",
    group: "serve",
    does: "Finds a free slot, books it in your calendar, sends the confirmation and handles changes.",
    tasks: [
      "Checks your live calendar before offering times",
      "Sends confirmations and reminders",
      "Reschedules or cancels when the customer asks",
    ],
    channels: ["Web", "WhatsApp", "Phone"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Can I come in for a consultation next week?" },
        { from: "agent", text: "I have Tuesday 11:00 or Thursday 16:30. Which suits you?" },
        { from: "customer", text: "Thursday please." },
        { from: "agent", text: "Booked for Thursday at 16:30. See you then.", note: "Added to calendar" },
      ],
    },
  },
  {
    id: "calling",
    name: "AI calling agent",
    short: "AI calling agent",
    group: "sell",
    does: "Picks up your business calls, calls new leads back, books appointments on the call and sends you a summary.",
    tasks: [
      "Answers every inbound call, including after hours",
      "Calls back new leads who asked to be contacted",
      "Transfers to a person whenever the caller asks",
    ],
    channels: ["Phone"],
    example: {
      label: "Phone call",
      lines: [
        { from: "agent", text: "Hello, thanks for calling. How can I help?" },
        { from: "customer", text: "I wanted to book a site visit this weekend." },
        { from: "agent", text: "Saturday at 11:00 is free. Shall I book it and send the address on WhatsApp?", note: "Visit booked · Summary sent" },
      ],
    },
  },
  {
    id: "sales",
    name: "Sales and product agent",
    short: "Sales and products",
    group: "sell",
    does: "Recommends the right product or package, answers comparisons and shares order or payment links.",
    tasks: [
      "Asks what the customer needs before recommending",
      "Compares options using your own product details",
      "Shares the order or payment link when they're ready",
    ],
    channels: ["Web", "WhatsApp"],
    example: {
      label: "Website chat",
      lines: [
        { from: "customer", text: "Which plan is right for a small office?" },
        { from: "agent", text: "How many people will use it, and do you need on-site support?" },
      ],
    },
  },
  {
    id: "followup",
    name: "Follow-up and reminder agent",
    short: "Follow-ups and reminders",
    group: "sell",
    does: "Follows up on leads that went quiet and reminds customers about appointments, renewals and payments.",
    tasks: [
      "Follows up on open quotes at the times you set",
      "Sends appointment, renewal and payment reminders",
      "Stops as soon as someone replies or opts out",
    ],
    channels: ["WhatsApp", "Phone", "Email"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "agent", text: "Hi Meera, a reminder that your appointment is tomorrow at 10:00. Reply 1 to confirm or 2 to change." },
        { from: "customer", text: "1" },
        { from: "agent", text: "Confirmed. See you tomorrow.", note: "Booking confirmed" },
      ],
    },
  },
  {
    id: "orders",
    name: "Order and enquiry agent",
    short: "Orders and enquiries",
    group: "serve",
    does: "Takes orders and event or catering enquiries, collects every detail you need and confirms them back.",
    tasks: [
      "Collects dates, quantities, guest counts and addresses",
      "Checks the details against your rules before confirming",
      "Sends a complete order or enquiry to your team",
    ],
    channels: ["Web", "WhatsApp", "Phone"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Do you cater for office lunches?" },
        { from: "agent", text: "We do. What date, and roughly how many people?" },
        { from: "customer", text: "Friday, about 40." },
        { from: "agent", text: "Noted: Friday, 40 guests. Our team will send a menu and quote today.", note: "Enquiry sent to team" },
      ],
    },
  },
  {
    id: "recruitment",
    name: "Recruitment screening agent",
    short: "Recruitment screening",
    group: "operate",
    does: "Answers candidate questions, asks your screening questions and books interviews with the shortlist.",
    tasks: [
      "Answers questions about the role, pay and location",
      "Asks the screening questions you set",
      "Books interviews for candidates who fit",
    ],
    channels: ["Web", "WhatsApp", "Phone"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "customer", text: "Is the delivery role still open?" },
        { from: "agent", text: "Yes. Do you have a two-wheeler licence, and which area do you live in?" },
      ],
    },
  },
  {
    id: "feedback",
    name: "Feedback and reviews agent",
    short: "Feedback and reviews",
    group: "serve",
    does: "Checks in after a visit or purchase, collects feedback, and invites happy customers to leave a review.",
    tasks: [
      "Asks for feedback at the right moment after a visit",
      "Sends unhappy responses to your team straight away",
      "Shares your review link with happy customers",
    ],
    channels: ["WhatsApp", "Phone"],
    example: {
      label: "WhatsApp",
      lines: [
        { from: "agent", text: "Thanks for visiting today. How was everything, from 1 to 5?" },
        { from: "customer", text: "5, great service" },
        { from: "agent", text: "Glad to hear it. Would you mind sharing that in a quick review?", note: "Review link sent" },
      ],
    },
  },
  {
    id: "knowledge",
    name: "Internal knowledge assistant",
    short: "Internal knowledge",
    group: "operate",
    does: "Lets your own team ask about your processes, policies and documents, and get answers with sources.",
    tasks: [
      "Searches your manuals, policies and past documents",
      "Answers with a link to the source",
      "Keeps answers inside your business",
    ],
    channels: ["Web", "Slack or Teams"],
    example: {
      label: "Team chat",
      lines: [
        { from: "customer", text: "What's our refund window for annual plans?" },
        { from: "agent", text: "30 days from purchase, pro-rated after that.", note: "Source: Refund policy v3" },
      ],
    },
  },
];

export const agentById = (id: string | null | undefined) => AGENTS.find((a) => a.id === id);

export const PROBLEMS: [string, string][] = [
  [
    "Missed calls",
    "The phone rings while everyone is busy, or after hours. Many callers don't leave a message; they call the next business.",
  ],
  [
    "Slow replies",
    "Messages arrive at night and get answered the next morning. By then the customer has often asked someone else.",
  ],
  [
    "Lost leads",
    "Enquiries are spread across WhatsApp, email and the website. Without follow-up, good leads go quiet and are never heard from again.",
  ],
];

export const STEPS: { title: string; text: string }[] = [
  {
    title: "A call about your enquiries",
    text: "We look at the questions you get most, what a good lead looks like for you, and where your customers message you from.",
  },
  {
    title: "We build and test your agent",
    text: "We load your knowledge, design the conversation, connect your calendar and channels, and test it against real questions before anyone sees it.",
  },
  {
    title: "Live, then better every month",
    text: "It goes live on your site, WhatsApp or phone. We review conversations with you and keep improving the answers and the flow.",
  },
];

/** What we connect agents to: described as integrations we build, not partnerships */
export const CONNECTIONS: [string, string[]][] = [
  ["Calendars", ["Google Calendar", "Microsoft Outlook", "Cal.com"]],
  ["CRMs and sheets", ["HubSpot", "Zoho CRM", "Salesforce", "Google Sheets"]],
  ["Messaging", ["WhatsApp Business", "Website chat", "Email", "Instagram and Messenger, next"]],
  ["Phone", ["A new business number", "Your existing line, forwarded"]],
];

export const TRUST: [string, string][] = [
  [
    "A person is always one step away",
    "When a question is sensitive or the agent isn't confident, the conversation moves to your team with the full history. Callers can ask for a person at any time.",
  ],
  [
    "Your data stays yours",
    "Each business's knowledge and conversations are kept separate from every other client's, and are never used to answer another business's customers.",
  ],
  [
    "Calls with consent",
    "Outbound calls go only to people who have contacted you or agreed to be called. You see every call's transcript and summary.",
  ],
  [
    "Retention you choose",
    "Before launch we walk you through what is stored, where, and for how long, and set retention to suit your business.",
  ],
];

export const PLANS: { name: string; for: string; includes: string[]; featured?: boolean }[] = [
  {
    name: "Starter",
    for: "One agent on one channel, to prove it works for you.",
    includes: [
      "One agent, on your website or WhatsApp",
      "Answers from your own documents",
      "Leads sent to your email, sheet or WhatsApp",
      "Hand-over to your team",
      "Monthly review of conversations",
    ],
  },
  {
    name: "Growth",
    for: "Several agents across chat and phone, connected to your tools.",
    includes: [
      "Everything in Starter",
      "Several agents sharing one knowledge base",
      "Website, WhatsApp and the AI calling agent",
      "Calendar and CRM connections",
      "Dashboard with conversations, leads and bookings",
      "Monthly improvements based on real conversations",
    ],
    featured: true,
  },
  {
    name: "Agency",
    for: "Offer AI agents to your clients under your own brand.",
    includes: [
      "White-label: your brand and your pricing",
      "A separate workspace for every client",
      "Run every client's agents from one place",
      "We run the technology, you keep the relationship",
    ],
  },
];

export const FAQ: [string, string][] = [
  [
    "Will it give my customers wrong answers?",
    "It answers from the knowledge you give it, and the steps that matter, like qualification and booking, follow a fixed flow rather than free generation. When it isn't confident, it hands the chat to your team instead of guessing.",
  ],
  [
    "Do I need any technical knowledge?",
    "No. We do the setup, the integrations and the updates. You get a dashboard to see conversations and leads, and you can change answers with us at any time.",
  ],
  [
    "What happens to my customers' data?",
    "Each business's data is kept separate from every other client's. Before you go live we walk you through exactly what is stored, where, and for how long, and we set retention to suit you.",
  ],
  [
    "What does pre-booking mean?",
    "bigO Agents is in early access. Pre-booking reserves one of a small number of founding-client slots, with a reduced setup fee in return for feedback. There's nothing to pay now; we'll contact you to plan your setup.",
  ],
  [
    "How is it priced?",
    "A one-time setup fee and a monthly plan. The monthly plan covers hosting, AI usage, your dashboard and ongoing improvements. We quote after the first call, because it depends on your channels and volume.",
  ],
  [
    "How does the AI calling agent work?",
    "It connects to a phone number, either a new one we set up or your existing line forwarded to it. It talks in a natural voice, follows the same knowledge and flow as your chat agent, and can transfer the call to your team. Outbound calls are made only to people who have contacted you or agreed to be called.",
  ],
  [
    "Can one business use several agents?",
    "Yes. Most businesses start with one, often support or lead qualification, and add booking, calling or follow-ups once it's working. They share the same knowledge and dashboard.",
  ],
  [
    "I run an agency. Can I offer this to my clients?",
    "Yes. Choose ‘Agency partner’ in the form. We're opening a white-label partner programme: your brand and your pricing, with us running the technology.",
  ],
];
