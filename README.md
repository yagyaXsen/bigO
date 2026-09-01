# bigO Digital Studio

Official website for **bigO** — a small, focused digital studio that builds websites, web apps, AI automation, and digital presence.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router & Turbopack)
- **Language:** TypeScript / React 19
- **Styling:** Tailwind CSS v4, `@tailwindcss/postcss`, shadcn/ui
- **Motion & Interaction:** GSAP 3.15, ScrollTrigger, Lenis Smooth Scroll, Matter.js
- **Deployment:** Vercel

---

## ✨ Features

- ⚡ **Next.js 16 App Router** with static prerendering & optimization
- 🎨 **Cinematic Agency UI** with GSAP animations, Preloader, Film Grain overlay, and dynamic Blur Scroll
- 🌓 **Day / Night Theme** switch with persisted localStorage state
- 📱 **Mobile-First Responsive Design** across all screen sizes
- 🎯 **Interactive Showcase Sections**: Hero, About, Niche Cards, Capabilities, Divider Parallax, Case Studies, Tech Stack, Insights, Marquee CTA
- 📋 **Interactive Project Intake Funnel**: `/start-project` multi-step contact workflow
- 🔍 **SEO & Performance Optimized**

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```
bigO/
├── public/                 # Static assets, images, dividers, videos, seo
│   ├── images/
│   │   ├── dividers/       # Parallax divider images
│   │   ├── illustrations/  # Niche cards graphics
│   │   ├── services/       # Capability showcase graphics
│   │   ├── works/          # Portfolio showcase images
│   │   └── blog/           # Insights preview cards
│   └── videos/             # Hero background videos
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout (fonts, metadata, theme)
│   │   ├── page.tsx        # Homepage
│   │   ├── globals.css     # Tailwind v4 theme & CSS variables
│   │   └── start-project/  # Project intake page
│   ├── components/         # Modular UI sections & providers
│   │   ├── providers/      # SmoothScroll (Lenis), BlurScroll
│   │   ├── ui/             # Preloader, GrainOverlay, CustomCursor, ScrambleText, Button
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── NicheCards.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── TechStack.tsx
│   │   ├── InsightsSection.tsx
│   │   ├── MarqueeCta.tsx
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   ├── hooks/              # Scroll & animation hooks (GSAP, SplitText, Scramble)
│   ├── lib/                # GSAP setup & utility helpers (cn)
│   └── types/              # Content & UI type definitions
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS & Tailwind v4 plugin
├── tsconfig.json           # TypeScript configuration
└── package.json            # Scripts & dependencies
```

---

## 📄 License & Ownership

Private — © 2026 bigO Digital Agency. All rights reserved.
