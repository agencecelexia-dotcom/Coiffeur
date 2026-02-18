# CLAUDE.md — AI Assistant Guide for Coiffeur

## Repository Overview

**Coiffeur** ("Salon Élégance") is a premium hair salon web platform built for `agencecelexia-dotcom`. It provides a showcase site, online booking UI, and a back-office admin dashboard.

**Phase 1 (Vitrine)** is implemented — frontend only, no database:
- Site vitrine (Home, Tarifs, Contact)
- Online booking module (UI only, static time slots)
- Back-office agenda (UI only, empty demo)

> Database, API routes, and email will be added in Phase 2 once the client approves the design.

## Tech Stack

- **Runtime**: Node.js 22+
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React

## Project Structure

```
Coiffeur/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (Header + Footer)
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles + Tailwind
│   │   ├── tarifs/page.tsx    # Pricing page
│   │   ├── contact/page.tsx   # Contact page
│   │   ├── reservation/page.tsx # Booking page
│   │   └── admin/
│   │       ├── layout.tsx     # Admin layout (noindex)
│   │       └── page.tsx       # Admin dashboard
│   ├── components/
│   │   ├── Header.tsx         # Navigation header (client)
│   │   ├── Footer.tsx         # Site footer
│   │   ├── BookingWizard.tsx  # Multi-step booking form (client)
│   │   └── AdminDashboard.tsx # Admin agenda view (client)
│   └── lib/
│       └── data.ts            # Static data (services, staff, salon info)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
```

## Development Setup

1. `npm install`
2. `npm run dev` — starts at http://localhost:3000

## Key Pages

| Path | Description |
|------|-------------|
| `/` | Home page — hero, services overview, CTA |
| `/tarifs` | Service pricing (static data) |
| `/contact` | Contact info + form (UI only) |
| `/reservation` | 5-step booking wizard (UI only) |
| `/admin` | Back-office dashboard + agenda (demo) |

## Static Data

All data lives in `src/lib/data.ts`:
- **categories** — 4 service categories with 11 services
- **staff** — 3 staff members
- **salonInfo** — Salon name, address, phone, hours
- **getAvailableSlots()** — Generates demo time slots

## Code Style & Conventions

- **Linter**: ESLint (next config)
- **Lint command**: `npm run lint`
- **Language**: French for UI content, English for code/comments
- **Components**: Server components by default; `"use client"` only when needed
- **Imports**: Use `@/` path alias for `src/` directory
- **CSS**: Tailwind utility classes; custom classes in `globals.css` `@layer components`

## Design System

- **Color palette**: Gold tones (`gold-50` to `gold-900`) for accents, cream for backgrounds, gray-900 for dark sections
- **Typography**: Geist Sans (local font), light weight for headings
- **Buttons**: `.btn-primary` (gold bg) and `.btn-secondary` (gold border)
- **Layout**: Mobile-first, `max-w-7xl` containers

## Git Conventions

- **Branch naming**: `feature/`, `fix/`, `claude/` prefixes
- **Commit messages**: Imperative mood, concise
- Do not commit `.env` or `node_modules/`

## Key Guidelines for AI Assistants

1. **Read before modifying** — Always read a file before proposing changes
2. **Run `npm run build`** to verify changes compile
3. **French UI** — All user-facing text is in French
4. **Mobile-first** — Design for mobile (80%+ of traffic)
5. **Server components** — Default to server components; use `"use client"` sparingly

## Phase 2 Roadmap (Not Yet Implemented)

- Database (Prisma + SQLite) with real data
- API routes for services, staff, availability, appointments
- Email confirmation (Nodemailer)
- Stripe payment integration (deposits/acomptes)
- E-commerce boutique (products, click & collect, gift cards)
- Loyalty program (points/cagnotte)
- Advanced CRM (color formulas, before/after photos)
- SMS marketing (reminders, come-back campaigns)
- Instagram feed integration
- Blog/SEO content
- Verified reviews system
