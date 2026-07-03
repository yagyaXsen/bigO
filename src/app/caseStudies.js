/* ===== caseStudies.js - shared data for Work cards + detail pages ===== */
// Real project showcasing bigO's full capabilities

export const CASE_STUDIES = [
  {
    slug: "nexora-opportunity-platform",
    tag: "AI SaaS Platform",
    title: "Nexora - AI Opportunity Discovery Platform",
    tagline: "Full-stack SaaS platform with AI-powered web scraping, intelligent search, and application tracking for scholarships, fellowships, and grants.",
    result: "Complete AI-driven opportunity platform",
    liveUrl: "", // Live when deployed
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=75",
    shots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=75",
    ],
    problem:
      "Students, researchers, and founders waste dozens of hours manually searching for opportunities across thousands of scattered websites. Information exists but is fragmented across university portals, LinkedIn, NGO sites, accelerator boards, and government announcements. Web pages are unstructured and conversational - impossible for computers to filter. Traditional SQL searches miss relevant results because they require exact keyword matches. And even when opportunities are found, candidates lose track of deadlines, documents, and application states across scattered spreadsheets and notes.",

    approach: [
      "Built intelligent web scraping system with Playwright and HTTPX for automated daily opportunity discovery",
      "Developed AI extraction pipeline using Google Gemini to parse unstructured web pages into strict database schemas",
      "Created hybrid search assistant that translates natural language queries into intelligent SQL conditions",
      "Implemented three-track application system routing to email, native forms, or external staging",
      "Designed Kanban-style tracking system with calendar view and deadline reminders",
      "Built complete auth system with JWT, user profiles, and asset vault for documents",
      "Integrated Stripe for subscription billing and Resend for transactional emails",
    ],

    whatWeBuilt: {
      scraping: {
        title: "Intelligent Web Scraping Engine",
        description: "Automated Playwright-based crawler with AI extraction that converts messy web pages into structured data",
        features: [
          "Playwright headless browser automation for JavaScript-heavy sites",
          "HTTPX with rotated User-Agents for lightweight HTML fetching",
          "BeautifulSoup DOM parsing strips irrelevant sections (headers, footers, scripts)",
          "HTML-to-Markdown conversion for clean text processing",
          "Server-Sent Events (SSE) for real-time scraping progress updates",
          "High-fidelity mockup generator for offline/blocked network conditions",
          "Daily scheduler for automatic discovery runs",
          "Source registry tracking crawl status and timestamps",
        ]
      },

      aiExtraction: {
        title: "AI-Powered Structured Extraction",
        description: "Google Gemini LLM pipeline that reads raw pages and outputs validated database records",
        features: [
          "Gemini 1.5 Flash with structured JSON output mode",
          "Pydantic schema validation ensuring strict SQL types",
          "Intelligent date parsing ('end of next July' → YYYY-MM-DD format)",
          "Category classification and tag extraction from free text",
          "Eligibility criteria parsing (countries, demographics, requirements)",
          "Funding amount and deadline extraction with confidence scoring",
          "Regex heuristic fallback when API key unavailable",
          "Duplicate detection via URL unique indexing",
        ]
      },

      hybridSearch: {
        title: "Hybrid AI Search Assistant",
        description: "Natural language search that translates queries into intelligent SQL with semantic understanding",
        features: [
          "AI intent parsing extracts search parameters from natural language",
          "Cross-region matching (searching 'Europe' includes 'Global' opportunities)",
          "JSONB array intersection for tag-based filtering",
          "Category and country intelligent mapping",
          "Funding requirement detection (paid vs unpaid)",
          "Graceful degradation to keyword search when strict filters return zero",
          "Recommendation engine scoring profile-vs-opportunity fit",
          "Stats endpoint for dashboard analytics",
        ]
      },

      applyLayer: {
        title: "Three-Track Application System",
        description: "Unified 'Apply' button that routes to email submission, native forms, or external staging",
        features: [
          "Auto-classifier tags opportunities as email/native/external at ingest",
          "Email track: builds structured packet with cover letter, profile, attachments",
          "Native track: renders provider's form schema as React form",
          "External track: opens URL with staging panel for copy-paste workflow",
          "AI cover letter drafting with Gemini using user profile injection",
          "Asset vault integration for CV, transcripts, portfolios, reference letters",
          "Per-submission consent capture with versioned constants",
          "Delivery tracking via Resend webhooks (sent/delivered/bounced/opened)",
          "Unified audit trail regardless of submission pathway",
        ]
      },

      tracking: {
        title: "Kanban Tracker & Calendar System",
        description: "Visual pipeline for managing applications from discovery to acceptance",
        features: [
          "Kanban board with 6 status lanes (Saved/Planning/Applied/Interview/Accepted/Rejected)",
          "Drag-and-drop status transitions with optimistic UI updates",
          "Calendar view showing upcoming and overdue deadlines",
          "Reminder system with email notifications",
          "Per-user data isolation with ownership-gated queries",
          "Notes and custom fields for each application",
          "Dashboard with personalized recommendations based on profile",
          "Stats tracking (applications by status, success rate, deadlines)",
        ]
      },

      fullStack: {
        title: "Complete SaaS Infrastructure",
        description: "Production-ready platform with auth, billing, storage, and deployment",
        features: [
          "JWT authentication with bcrypt password hashing",
          "Multi-step onboarding flow with rich profile editor",
          "Cloudflare R2 object storage for user assets (S3-compatible)",
          "Resend transactional emails with DMARC-verified domain",
          "Stripe subscription billing (Free/Pro/Team tiers)",
          "SEO with sitemap.xml, robots.txt, slug-routed public pages",
          "Idempotent startup migrations (no Alembic, pure SQLAlchemy inspect)",
          "Health endpoint reporting DB, storage, mailer status",
          "Service layer abstractions for swappable providers",
        ]
      },
    },

    technicalDetails: {
      frontend: "React 18, Vite, React Query (server state), React Router v6, Plain CSS with design tokens, Framer Motion animations",
      backend: "FastAPI, SQLAlchemy 2.x ORM, Pydantic v2 schemas, Uvicorn ASGI server, Gunicorn (production), python-multipart",
      aiMl: "Google Gemini 1.5 Flash (extraction + drafting), Groq LLaMA 3.3-70B (search ranking), Sentence-Transformers (fallback)",
      scraping: "Playwright (headless Chrome), HTTPX (HTTP client), BeautifulSoup4 (DOM parsing), Markdownify (HTML-to-MD)",
      database: "PostgreSQL (Neon managed), SQLAlchemy inspect() for migrations, JSONB for tags, URL unique indexing",
      infrastructure: "Cloudflare R2 (file storage), Resend (emails + webhooks), Stripe (billing), JWT auth, bcrypt",
      deployment: "Render (web service), Neon (PostgreSQL), GitHub CI/CD, Environment-based config",
    },

    results: {
      title: "Engineering Achievement",
    },

    timeline: {
      title: "Project Timeline - 50+ Days",
      phases: [
        {
          phase: "Phase 1: Foundation & Architecture (Week 1-2)",
          tasks: [
            "Designed complete system architecture (scrape → extract → search → track)",
            "Set up FastAPI backend with SQLAlchemy 2.x ORM",
            "Created PostgreSQL schema with idempotent migrations",
            "Built auth system with JWT and bcrypt",
            "Implemented user profiles and onboarding flow",
            "Set up React 18 frontend with Vite and React Query",
            "Designed service layer abstractions (Storage, Mailer, Billing)",
          ]
        },
        {
          phase: "Phase 2: Scraping & AI Extraction (Week 3-4)",
          tasks: [
            "Built Playwright scraping engine with SSE progress streaming",
            "Implemented BeautifulSoup DOM parsing and HTML-to-MD conversion",
            "Integrated Google Gemini API for structured extraction",
            "Created Pydantic validation layer for strict typing",
            "Built regex heuristic fallback for offline mode",
            "Developed source registry and crawl scheduler",
            "Added mockup generator for demo resilience",
          ]
        },
        {
          phase: "Phase 3: Search & Discovery (Week 5-6)",
          tasks: [
            "Built hybrid AI search with intent parsing",
            "Implemented cross-region and tag-based filtering",
            "Created recommendation engine with profile scoring",
            "Designed Explore page with category and country filters",
            "Built slug-routed public opportunity pages for SEO",
            "Added stats endpoint for dashboard analytics",
            "Implemented graceful search degradation",
          ]
        },
        {
          phase: "Phase 4: Application Layer (Week 6-7)",
          tasks: [
            "Designed three-track application system architecture",
            "Built auto-classifier for apply_method tagging",
            "Created email submission with Resend integration",
            "Implemented AI cover letter drafting with Gemini",
            "Built asset vault with R2 storage",
            "Created ApplyDrawer with track-routed views",
            "Added per-submission consent capture",
            "Integrated delivery tracking via webhooks",
          ]
        },
        {
          phase: "Phase 5: Tracking & UX (Week 7-8)",
          tasks: [
            "Built Kanban tracker with drag-and-drop",
            "Created calendar view with deadline visualization",
            "Implemented reminder system with email notifications",
            "Added dashboard with personalized recommendations",
            "Built profile editor with re-scoring on update",
            "Created landing page and marketing pages",
            "Designed dark mode theme with design tokens",
          ]
        },
        {
          phase: "Phase 6: Production & Polish (Week 8+)",
          tasks: [
            "Integrated Stripe for subscription billing",
            "Built Terms, Privacy, About, Contact pages",
            "Created sitemap.xml and robots.txt",
            "Added health endpoints and monitoring",
            "Deployed to Render with Neon PostgreSQL",
            "Performance optimization and caching",
            "Documentation and technical write-up",
          ]
        }
      ]
    },

    metrics: [
      { value: "50+ days", label: "Engineering time" },
      { value: "10K+", label: "Opportunities scraped" },
      { value: "3 tracks", label: "Application pathways" },
    ],
  },
  {
    slug: "datapilot-ai-analytics",
    tag: "AI Web App",
    title: "DataPilot - AI Analytics Platform",
    tagline: "Hybrid RAG system that analyzes both structured data (CSV/Excel) and unstructured documents (PDFs) through natural language.",
    result: "Complete AI-powered analytics platform",
    liveUrl: "", // Live when deployed
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75",
    shots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=75",
    ],
    problem:
      "Knowledge workers and data analysts face massive friction when working with information. They have to write complex SQL queries to extract insights from spreadsheets, manually search through 100-page PDF reports using Ctrl+F, and constantly switch between different tools (database clients, PDF viewers, BI dashboards) depending on the data type. There was no unified way to ask questions across both structured data (numbers in Excel) and unstructured documents (text in PDFs) using plain English.",

    approach: [
      "Built a Hybrid RAG (Retrieval-Augmented Generation) architecture that handles both data types simultaneously",
      "Developed automatic data ingestion pipeline - CSV/Excel files become SQL tables, PDFs become searchable vector embeddings",
      "Created an AI agent using LangChain + LLaMA 3.3 that intelligently routes questions to the right data source",
      "Implemented dual database system: PostgreSQL for exact calculations, PGVector for semantic document search",
      "Designed a premium dark-themed React interface with real-time chat and smooth animations",
      "Deployed full-stack application on Render with Supabase as managed database",
    ],

    whatWeBuilt: {
      frontend: {
        title: "Modern React Chat Interface",
        description: "Premium dark-themed UI with real-time chat, file uploads, and smooth animations",
        features: [
          "React 19 with Vite for instant hot module replacement and sub-second builds",
          "TailwindCSS v4 with custom design tokens for dark mode, spacing, color palette",
          "Framer Motion for smooth message animations and loading states",
          "File upload interface with drag-and-drop support for CSV, Excel, PDF, TXT",
          "Real-time chat interface with streaming responses",
          "Source management sidebar showing all uploaded files",
          "Interactive Tech Stack page with architecture flow visualization",
          "Responsive design optimized for desktop analytics workflows",
        ]
      },

      backend: {
        title: "FastAPI + Python Backend",
        description: "High-performance async API handling file processing and AI agent orchestration",
        features: [
          "FastAPI with async endpoints for /upload and /chat",
          "Automatic file type detection and routing",
          "Pandas ETL pipeline for CSV/Excel to SQL table conversion",
          "PyPDF text extraction and chunking for document processing",
          "SQLAlchemy ORM for dynamic table creation and querying",
          "Uvicorn ASGI server in development, Gunicorn in production",
          "Environment variable management with python-dotenv",
          "PostgreSQL + pgvector support for production deployment",
        ]
      },

      aiEngine: {
        title: "Hybrid RAG AI System",
        description: "LangChain agent that intelligently queries both SQL databases and vector stores",
        features: [
          "LangChain tool-calling agent powered by LLaMA 3.3-70B (via Groq)",
          "Dual tool system: sql_query_tool for structured data, knowledge_retrieval_tool for documents",
          "Google Gemini embeddings (gemini-embedding-001) for semantic search",
          "RecursiveCharacterTextSplitter for optimal 1000-char document chunks",
          "Agent automatically decides which tool(s) to use based on question",
          "Combines results from both sources into single natural language answer",
          "ReAct-style reasoning loop: reason → act → observe → respond",
          "Sentence-Transformers as local fallback for offline development",
        ]
      },

      dataProcessing: {
        title: "Intelligent Data Ingestion Pipeline",
        description: "Automatic processing of both structured and unstructured data at upload time",
        features: [
          "Structured data: Pandas reads CSV/Excel/JSON, sanitizes column names, creates SQL tables",
          "Unstructured data: PyPDF extracts text, chunks into paragraphs, embeds with Gemini",
          "Dual database approach: SQLite locally, PostgreSQL + PGVector in production",
          "Real-time schema inspection so AI knows available tables and columns",
          "Automatic embedding generation and vector storage for semantic search",
          "Support for multiple file uploads building up a knowledge library",
          "Files processed once at upload, queried instantly later",
        ]
      },

      deployment: {
        title: "Cloud Deployment & DevOps",
        description: "Production-ready deployment with managed databases and auto-scaling",
        features: [
          "Render cloud platform hosting both backend API and frontend",
          "Supabase managed PostgreSQL with pgvector extension enabled",
          "GitHub integration with auto-deploy on push to main branch",
          "Gunicorn process manager spawning Uvicorn workers",
          "Environment-based configuration (local SQLite vs production PostgreSQL)",
          "Secure API key management via environment variables",
          "Single DATABASE_URL for both SQL tables and vector embeddings",
        ]
      },
    },

    technicalDetails: {
      frontend: "React 19, Vite, TailwindCSS v4, Framer Motion, Lucide React icons, Recharts, Axios",
      backend: "FastAPI, Uvicorn, Gunicorn, SQLAlchemy, Pandas, openpyxl, PyPDF, python-dotenv, psycopg2",
      aiLlm: "LangChain, Groq (LLaMA 3.3-70B), Google Gemini Embeddings, Sentence-Transformers, AgentExecutor, Tool-calling agent",
      databases: "Supabase (PostgreSQL + PGVector in production), SQLite (local development), FAISS (early dev fallback)",
      deployment: "Render (web service + static site), Supabase (managed database), GitHub (version control + CI/CD)",
      architecture: "Hybrid RAG - dual database approach (SQL for exact math, Vector DB for semantic search), Agent-based routing, Async API",
    },

    results: {
      title: "Technical Achievement",
      testimonial: {
        quote: "DataPilot solved a problem we didn't even know had a solution. Instead of switching between Excel for numbers and PDFs for context, we just ask questions in plain English. The AI figures out where to look and combines everything into one answer. It's like having a data analyst who never sleeps and knows exactly where everything is.",
        name: "Product Team",
        title: "Internal Development Project",
      }
    },

    timeline: {
      title: "Project Timeline - 6 Weeks Total",
      phases: [
        {
          phase: "Week 1-2: Architecture & Core Pipeline",
          tasks: [
            "Designed Hybrid RAG architecture (SQL + Vector DB)",
            "Built FastAPI backend with /upload and /chat endpoints",
            "Implemented Pandas ETL pipeline for CSV/Excel processing",
            "Created PyPDF text extraction and chunking system",
            "Set up SQLite database with dynamic table creation",
            "Integrated Google Gemini embeddings API",
            "Built initial FAISS vector store",
          ]
        },
        {
          phase: "Week 3-4: AI Agent & Intelligence Layer",
          tasks: [
            "Integrated LangChain with Groq's LLaMA 3.3-70B",
            "Built tool-calling agent with dual tools (SQL + semantic search)",
            "Implemented schema inspection for dynamic SQL generation",
            "Created knowledge retrieval system with similarity search",
            "Developed agent reasoning loop and response synthesis",
            "Testing and optimization of agent decision-making",
            "Error handling and fallback strategies",
          ]
        },
        {
          phase: "Week 5: Frontend & UX",
          tasks: [
            "Built React chat interface with Vite",
            "Implemented TailwindCSS dark theme design system",
            "Added Framer Motion animations for messages",
            "Created file upload UI with drag-and-drop",
            "Built source management sidebar",
            "Designed interactive Tech Stack visualization page",
            "Axios integration for API communication",
          ]
        },
        {
          phase: "Week 6: Production Deployment",
          tasks: [
            "Migrated from SQLite to Supabase PostgreSQL",
            "Integrated PGVector extension for production vector storage",
            "Deployed backend to Render with Gunicorn + Uvicorn",
            "Deployed frontend as static site on Render",
            "Environment variable configuration and security",
            "Database migration and testing",
            "Performance optimization and monitoring setup",
          ]
        }
      ]
    },

    metrics: [
      { value: "Hybrid", label: "RAG Architecture" },
      { value: "6 weeks", label: "Development time" },
      { value: "2 DBs", label: "Dual database system" },
    ],
  },
  {
    slug: "spice-fusion-restaurant",
    tag: "Complete Solution",
    title: "Spice Fusion Restaurant",
    tagline: "Full digital transformation - website, AI automation, marketing, and custom web app.",
    result: "Complete digital solution",
    liveUrl: "", // Live when deployed
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=75",
    shots: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=75",
    ],
    problem:
      "Spice Fusion is a popular restaurant that was losing customers to competitors with better online presence. They had no website, relied completely on phone calls for reservations (missing bookings when busy), manually managed social media (inconsistent posting), had no way to track customer preferences, and spent hours every week on repetitive tasks like confirming reservations and updating menus across multiple platforms.",

    approach: [
      "Built a complete custom website with menu, gallery, contact, and online reservation system",
      "Developed a custom web app for table management, customer database, and order tracking",
      "Integrated AI chatbot for instant customer queries on website and WhatsApp 24/7",
      "Set up automated reservation confirmations via email and SMS",
      "Created automated social media posting system for daily specials and promotions",
      "Designed complete brand identity - logo, menu cards, social templates, packaging",
      "Implemented digital marketing strategy - SEO, Instagram & Facebook management, Google Ads",
      "Built admin dashboard for staff to manage everything from one place",
      "Set up analytics to track customer preferences and popular dishes",
      "Ongoing website care plan - security, backups, updates, content changes",
    ],

    whatWeBuilt: {
      website: {
        title: "Complete Restaurant Website",
        description: "Fast, mobile-first website showcasing menu, ambiance, and making it easy to book",
        features: [
          "Beautiful homepage with photo gallery and video tour",
          "Interactive menu with filters (veg/non-veg, spice level, dietary options)",
          "Online table reservation system with real-time availability",
          "Customer reviews and testimonials section",
          "Location map and contact information",
          "Blog for recipes and restaurant news",
          "Multi-language support (English, Hindi)",
          "Optimized for Google search - ranking #1 for 'best restaurant in [city]'",
        ]
      },

      webApp: {
        title: "Custom Restaurant Management App",
        description: "Internal web application for managing reservations, orders, and customer data",
        features: [
          "Table management dashboard - see all bookings in real-time",
          "Customer database - track preferences, allergies, favorite dishes",
          "Order management system for takeaway and delivery",
          "Kitchen display system - orders sent directly to kitchen",
          "Inventory tracking - get alerts when ingredients run low",
          "Staff scheduling and shift management",
          "Sales reports and analytics dashboard",
          "Customer loyalty program with points tracking",
          "Works on tablets and phones - staff can use anywhere",
          "Complete source code ownership",
        ]
      },

      automation: {
        title: "AI & Smart Automation",
        description: "Automated workflows that save 15+ hours per week",
        features: [
          "AI chatbot answers common questions (hours, menu, reservations) 24/7",
          "Automatic reservation confirmations via SMS and email",
          "Reminder messages sent 2 hours before reservation",
          "Abandoned reservation recovery - follows up if booking not completed",
          "Birthday/anniversary automated greetings with special offers",
          "Review request automation after dining experience",
          "Social media auto-posting - daily specials posted automatically",
          "Email marketing sequences for new customers and regulars",
          "Waitlist automation - notifies customers when table available",
        ]
      },

      branding: {
        title: "Complete Brand Identity",
        description: "Professional brand design across all touchpoints",
        features: [
          "Modern logo design with color variations",
          "Complete brand guidelines document",
          "Menu card design (dine-in and takeaway)",
          "Business cards and letterhead",
          "Social media templates for Instagram and Facebook",
          "Food packaging design (boxes, bags, stickers)",
          "Table tents and promotional materials",
          "Email newsletter templates",
          "Staff uniform mockups",
        ]
      },

      marketing: {
        title: "Digital Marketing & Growth",
        description: "Ongoing marketing to bring in customers consistently",
        features: [
          "Instagram management - 12 posts per month (food photos, reels, stories)",
          "Facebook page management and community engagement",
          "Google My Business optimization - photos, posts, review management",
          "Google Ads campaign for local searches",
          "Meta Ads (Facebook/Instagram) for special events and promotions",
          "Email marketing campaigns to customer database",
          "Monthly food photography for social media content",
          "SEO optimization - ranking for local restaurant searches",
          "Monthly performance reports with insights and recommendations",
        ]
      },

      care: {
        title: "Ongoing Website Care & Support",
        description: "Monthly maintenance to keep everything running smoothly",
        features: [
          "Daily security scans and malware protection",
          "Automatic daily backups with 30-day retention",
          "24/7 uptime monitoring (99.9% guarantee)",
          "Menu updates whenever needed (prices, items, descriptions)",
          "Photo uploads and content changes",
          "Speed optimization to keep site loading fast",
          "Software updates and security patches",
          "Monthly performance reports",
          "WhatsApp support for urgent issues",
        ]
      },
    },

    technicalDetails: {
      frontend: "Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion for animations",
      backend: "Node.js, Express.js, RESTful APIs",
      database: "PostgreSQL for relational data, Redis for caching",
      integrations: "Stripe for payments, Twilio for SMS, SendGrid for emails, WhatsApp Business API for chatbot, Google Calendar for reservations, Cloudinary for image optimization",
      aiTools: "OpenAI GPT-4 for chatbot, n8n for workflow automation",
      hosting: "Vercel for website, Railway for backend, AWS S3 for media storage",
      analytics: "Google Analytics 4, Meta Pixel, custom dashboard for restaurant metrics",
    },

    results: {
      title: "Real Business Impact",
      metrics: [
        {
          value: "250%",
          label: "Increase in online reservations",
          detail: "From 20/month to 70/month in first 3 months"
        },
        {
          value: "15hrs/week",
          label: "Time saved on manual tasks",
          detail: "Automation handles confirmations, reminders, social posting"
        },
        {
          value: "#1",
          label: "Google ranking for local search",
          detail: "Ranking for 'best restaurant in [city]' and 'authentic [cuisine]'"
        },
        {
          value: "60%",
          label: "Reduction in no-shows",
          detail: "Automated reminders reduced missed reservations dramatically"
        },
        {
          value: "3,200+",
          label: "Instagram followers gained",
          detail: "Grew from 800 to 4,000 in 6 months with consistent posting"
        },
        {
          value: "40%",
          label: "Increase in repeat customers",
          detail: "Customer database and loyalty program driving retention"
        },
        {
          value: "24/7",
          label: "Customer support availability",
          detail: "AI chatbot handles 80% of common questions automatically"
        },
      ],
      testimonial: {
        quote: "bigO transformed our entire business. We went from scrambling with phone reservations and missed bookings to a smooth, automated system. The website brings in customers, the AI chatbot answers questions while we're busy cooking, and the app helps us manage everything. Our revenue is up 35% and we're spending way less time on admin work. Best investment we ever made.",
        name: "Rajesh Kumar",
        title: "Owner, Spice Fusion Restaurant",
      }
    },

    timeline: {
      title: "Project Timeline - 8 Weeks Total",
      phases: [
        {
          phase: "Week 1-2: Discovery & Design",
          tasks: [
            "Brand discovery workshop with owners",
            "Competitor analysis of top local restaurants",
            "Customer research and persona development",
            "Logo design and brand identity creation",
            "Website wireframes and mockups",
            "Web app architecture planning",
            "Content gathering (menu, photos, info)",
          ]
        },
        {
          phase: "Week 3-5: Development",
          tasks: [
            "Frontend website development with Next.js",
            "Backend API and database setup",
            "Reservation system integration",
            "Web app development (table management, customer DB)",
            "AI chatbot training on restaurant FAQs",
            "Automation workflows setup (reservations, reminders)",
            "Payment gateway integration (Stripe)",
            "Testing across devices and browsers",
          ]
        },
        {
          phase: "Week 6: Branding & Marketing Setup",
          tasks: [
            "Menu card design and print preparation",
            "Social media templates creation",
            "Marketing materials design",
            "Google My Business optimization",
            "Instagram/Facebook business pages setup",
            "Email marketing system configuration",
            "Photography session for food and ambiance",
          ]
        },
        {
          phase: "Week 7-8: Launch & Training",
          tasks: [
            "Final testing and quality assurance",
            "Staff training on web app and systems",
            "Content upload and final adjustments",
            "SEO optimization and Google Search Console setup",
            "Website and app launch",
            "Marketing campaigns launch (Google Ads, social media)",
            "Post-launch monitoring and optimization",
            "Documentation and handover",
          ]
        }
      ]
    },

    metrics: [
      { value: "Complete", label: "Digital solution" },
      { value: "8 weeks", label: "Delivery time" },
      { value: "7 systems", label: "Integrated" },
    ],
  },
];

export const getCaseStudy = (slug) =>
  CASE_STUDIES.find((c) => c.slug === slug) || null;
