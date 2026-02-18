# CLAUDE.md — AI Assistant Guide for Coiffeur

## Repository Overview

**Coiffeur** ("Salon Élégance") is a premium hair salon web platform built for `agencecelexia-dotcom`. It provides online booking, service catalog, staff management, and a back-office admin dashboard.

**Phase 1 (MVP)** is implemented:
- Site vitrine (Home, Tarifs, Contact)
- Online booking module with real-time availability
- Email confirmation system
- Back-office agenda with appointment management

## Tech Stack

- **Runtime**: Node.js 22+
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite via Prisma ORM (v5)
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Email**: Nodemailer

## Project Structure

```
Coiffeur/
├── prisma/
│   ├── schema.prisma          # Database schema (models)
│   ├── seed.sql               # Seed data (demo services, staff)
│   ├── migrations/            # Prisma migration files
│   └── dev.db                 # SQLite database (gitignored)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (Header + Footer)
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles + Tailwind
│   │   ├── tarifs/page.tsx    # Pricing page (server component)
│   │   ├── contact/page.tsx   # Contact page
│   │   ├── reservation/page.tsx # Booking page
│   │   ├── admin/
│   │   │   ├── layout.tsx     # Admin layout (noindex)
│   │   │   └── page.tsx       # Admin dashboard
│   │   └── api/
│   │       ├── services/route.ts      # GET services
│   │       ├── staff/route.ts         # GET staff
│   │       ├── availability/route.ts  # GET available slots
│   │       └── appointments/
│   │           ├── route.ts           # GET/POST appointments
│   │           └── [id]/route.ts      # GET/PATCH single appointment
│   ├── components/
│   │   ├── Header.tsx         # Navigation header (client)
│   │   ├── Footer.tsx         # Site footer
│   │   ├── BookingWizard.tsx  # Multi-step booking form (client)
│   │   └── AdminDashboard.tsx # Admin agenda view (client)
│   └── lib/
│       ├── prisma.ts          # Prisma client singleton
│       └── email.ts           # Email sending utilities
├── .env                       # Environment variables (gitignored)
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
npm run db:migrate       # Run Prisma migrations
npm run db:seed          # Seed database with demo data
npm run db:reset         # Reset database (destroys all data)
npx prisma generate      # Regenerate Prisma client after schema changes
npx prisma studio        # Open Prisma Studio (DB GUI)
```

## Development Setup

1. `npm install`
2. Copy `.env` and set `DATABASE_URL="file:./dev.db"`
3. `npx prisma migrate dev` — creates/updates the database
4. `npm run db:seed` — loads demo data (services, staff, schedules)
5. `npm run dev` — starts at http://localhost:3000

## Database Schema

| Model | Purpose |
|-------|---------|
| `SalonInfo` | Singleton with salon name, address, hours |
| `ServiceCategory` | Groups services (Coupes, Coloration, Soins, Barbe) |
| `Service` | Individual services with name, duration, price |
| `StaffMember` | Salon staff with bio and specialties |
| `StaffSchedule` | Weekly schedule per staff member |
| `Client` | Customer records (email unique) |
| `Appointment` | Bookings linking client, service, staff, datetime |

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/services` | List all service categories with services |
| GET | `/api/staff` | List active staff members |
| GET | `/api/availability?staffId=&date=&duration=` | Available time slots |
| GET | `/api/appointments?date=&staffId=` | List appointments |
| POST | `/api/appointments` | Create a new appointment |
| GET | `/api/appointments/[id]` | Get appointment details |
| PATCH | `/api/appointments/[id]` | Update appointment status |

## Key Pages

| Path | Description |
|------|-------------|
| `/` | Home page — hero, services overview, CTA |
| `/tarifs` | Service pricing (from database) |
| `/contact` | Contact info + form |
| `/reservation` | 5-step booking wizard |
| `/admin` | Back-office dashboard + agenda |

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

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database path (e.g., `file:./dev.db`) | Yes |
| `SMTP_HOST` | SMTP server for emails | No (defaults to localhost) |
| `SMTP_PORT` | SMTP port | No (defaults to 1025) |

## Git Conventions

- **Branch naming**: `feature/`, `fix/`, `claude/` prefixes
- **Commit messages**: Imperative mood, concise (e.g., "Add booking confirmation email")
- Do not commit `.env`, `prisma/dev.db`, or `node_modules/`

## Key Guidelines for AI Assistants

1. **Read before modifying** — Always read a file before proposing changes
2. **Run `npx prisma generate`** after any schema change
3. **Run `npm run build`** to verify changes compile
4. **French UI** — All user-facing text is in French
5. **Mobile-first** — Design for mobile (80%+ of traffic)
6. **No secrets** — Use `.env` for all configuration
7. **Server components** — Default to server components; use `"use client"` sparingly
8. **Prisma singleton** — Always import from `@/lib/prisma`, never create new instances

## Phase 2 Roadmap (Not Yet Implemented)

- Stripe payment integration (deposits/acomptes)
- E-commerce boutique (products, click & collect, gift cards)
- Loyalty program (points/cagnotte)
- Advanced CRM (color formulas, before/after photos)
- SMS marketing (reminders, come-back campaigns)
- Instagram feed integration
- Blog/SEO content
- Verified reviews system
