# AthleteCare Pro — High-Performance Fitness & Telemetry Platform

<div align="center">

```
   ___ _____ _   _ _     _____ _____ _____ ____    _    ____  _____   ____  ____   ___  
  / _ \_   _| | | | |   | ____|_   _| ____/ ___|  / \  |  _ \| ____| |  _ \|  _ \ / _ \ 
 / /_\ \| | | |_| | |   |  _|   | | |  _|| |     / _ \ | |_) |  _|   | |_) | |_) | | | |
|  _  || | |  _  | |___| |___  | | | |___| |___ / ___ \|  _ <| |___  |  __/|  _ <| |_| |
|_| |_||_| |_| |_|_____|_____| |_| |_____|\____/_/   \_\_| \_\_____| |_|   |_| \_\\___/ 
```

**Next-Generation Biometric Telemetry, Adaptive Athletic Programming & Coach Operations Console**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-ea2845?style=flat&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ed?style=flat&logo=docker)](https://www.docker.com/)

[Overview](#overview) • [Design System](#stitch-design-system) • [Key Features](#key-features) • [Architecture](#tech-stack--architecture) • [Getting Started](#getting-started) • [API Documentation](#api-documentation)

</div>

---

## Overview

**AthleteCare Pro** is an enterprise-grade athletic telemetry, sports science programming, and coach management system designed for elite athletes and performance coaches. It combines live biomarker tracking (HRV, CNS recovery, sleep efficiency, hydration), progressive overload training trackers, precision sports nutrition scheduling, and coach-athlete direct intervention feeds.

Built in strict compliance with the **Stitch AthleteCare Pro Design System**, delivering a high-contrast, distraction-free pure dark monochrome interface engineered for athletic focus.

---

## Stitch Design System

The platform strictly adheres to a sports science laboratory aesthetic:
- **Zero Light Theme Leakage**: 100% pitch-black and deep-graphite surfaces.
- **Color Tokens**:
  - `Surface Base`: `#000000` (Canvas root)
  - `Surface Canvas`: `#0A0A0A` (App container)
  - `Surface Card`: `#111111` (Data modules & telemetry panels)
  - `Surface Elevated`: `#171717` (Interactive popovers & headers)
  - `Border Subtle`: `#242424` (Fine grid dividers)
  - `Border Medium`: `#4A4A4A` (Active card boundaries)
  - `Text Primary`: `#FFFFFF` (Headings & telemetry metrics)
  - `Text Muted`: `#777777` (Auxiliary labels & captions)

---

## Key Features

### 1. Client Dashboard (`/app/dashboard`)
- **Daily Telemetry Strip**: Live monitoring of Body Mass, Caloric Load vs. Target, Protein Synthesis rate, and Microcycle Consistency Streak.
- **Scheduled Training Session**: Day-specific hypertrophy and strength programming with real-time target weight and RPE tracking.
- **Biomarker Progression**: Interactive SVG compound volume overload trend chart across microcycles.
- **Precision Nutrition Timeline**: Time-stamped fueling cards with macro breakdowns (Protein/Carb/Fat) and completion status.
- **Staff Direct Link**: Assigned CSCS coach card with direct video sync link and messaging dispatch.

### 2. Live Workout Tracker (`/app/workout`)
- **Active Exercise Protocol**: Set-by-set execution logger with previous best PR references, target reps, and RPE calibration.
- **Biomechanical Guidance**: Form tips, tempo instructions (e.g. `3-0-1-0`), and rest interval countdown timers.
- **Plate Loading Calculator**: Instant visual barbell weight breakdown.

### 3. Precision Nutrition (`/app/nutrition`)
- **Macro Distribution Engine**: Caloric budget tracking with granular macro breakdown and hydration goals.
- **Fuel Schedule**: Structured meal logging (Breakfast, Pre-Workout, Post-Workout, Dinner) with macro telemetry.
- **AI Fueling Recommendations**: Dynamic post-workout recovery meal suggestions based on logged training strain.

### 4. Progress & Biomarkers (`/app/progress`)
- **Compound Volume Velocity**: Multi-week overload trends.
- **CNS Recovery Index**: Readiness metrics derived from HRV, resting heart rate, and sleep duration.
- **Body Composition & Velocity**: Weekly weigh-ins and phase targets.

### 5. Appointments & Telemetry Video Booking (`/app/appointments`)
- **CSCS Specialist Booking**: Schedule 1-on-1 video reviews with lead coach Marcus Vance or nutritionist Sarah Jenkins.
- **Protocol Presets**: Frame-by-frame Biomechanical Review, Macro & Fueling Telemetry Audit, CNS Fatigue Diagnostics, and Competition Peaking.
- **Integrated Video Rooms**: Auto-generated encrypted telemetry session URLs.

### 6. Coach-Athlete Direct Telemetry Messaging (`/app/messages`)
- **Encrypted Dispatch Channel**: Live thread between athlete and assigned CSCS coach.
- **Biometric Card Attachments**: Direct one-click embedding of live PRs, velocity metrics, and CNS recovery scores inside chat.
- **Staff Roster Rails**: Quick switcher between Lead Strength Coach, Nutritionist, and AI Performance Copilot.

### 7. Performance Subscriptions & Tiers (`/app/subscriptions`)
- **Granular Tiers**: Starter Telemetry ($49/mo), Tier 1 Pro Athlete ($149/mo), and Tier 2 Elite Olympian ($299/mo).
- **Billing Optimization**: Monthly or Annual protocols with an automatic 18% savings badge.
- **On-Demand Specialist Packs**: Single movement biomechanical audits and blood panel calibrations.

### 8. Coach Command Center (`/coach`)
- **Roster Telemetry Matrix**: Real-time overview of active athletes, mesocycle completion, and adherence percentages.
- **Priority Triage Queue**: Instant risk flagging for HRV spikes, missed check-ins, or acute fatigue boundaries.
- **AI Bio-Intervention Proposals**: Algorithmic suggestions for deload periods, volume reductions, and nutritional shifts.
- **Action Triggers**: One-click review & calibrate, bulk plan push, and emergency recovery injection protocols.

### 9. Athlete Store & Dispensary (`/app/store`)
- **WADA-Compliant Ergogenic Aids**: High-purity supplements (Creatine Creapure, Whey Isolate, Hydration Electrolytes).
- **Cart & Order Processing**: Full checkout pipeline backed by NestJS order entities.

### 10. System Administration & Security Console (`/admin`)
- **Cluster KPIs**: Real-time ARR ($218k), cluster API latency (42ms), uptime (99.98%), and active user counts.
- **User & Role Calibration**: Granular RBAC assignment (Client, Coach, Nutritionist, Store Manager, Admin).
- **Dispensary Catalog & Stock**: Full CRUD formulation creator with batch verification records.
- **Cryptographic Audit Log**: Immutable SHA-256 system audit trail for security events.

---

## Tech Stack & Architecture

### Frontend
- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@theme` Stitch design tokens
- **Icons**: [Material Symbols Outlined](https://fonts.google.com/icons) & [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query) + [Axios](https://axios-http.com/)

### Backend
- **Framework**: [NestJS 11](https://nestjs.com/) (Modular Architecture)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Cache & Telemetry Queue**: [Redis 7](https://redis.io/)
- **Real-Time Communication**: [Socket.io](https://socket.io/) (WebSockets for live telemetry feed)
- **Documentation**: [Swagger / OpenAPI 3.0](https://swagger.io/)
- **Validation**: `class-validator` & `class-transformer`

```
gym/
├── frontend/                     # Next.js 16 Web Application
│   ├── src/
│   │   ├── app/                  # App Router pages (/app/*, /coach, /)
│   │   ├── components/           # Atomic components & layout shell
│   │   ├── styles/globals.css    # Strict Stitch monochrome tokens
│   │   └── store/                # Zustand stores
├── backend/                      # NestJS 11 REST API & WebSocket Gateway
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/             # JWT auth & RBAC
│   │   │   ├── users/            # Athlete & Coach profiles
│   │   │   ├── workouts/         # Training plans, exercises & sessions
│   │   │   ├── nutrition/        # Meals, macros & food logs
│   │   │   ├── progress/         # Biomarkers & metrics
│   │   │   ├── ai-coach/         # Telemetry analysis engine
│   │   │   └── store/            # Orders & supplements
├── docker-compose.yml            # Multi-container orchestration
└── project.md                    # System requirements specification
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm** or **pnpm**
- **Docker & Docker Compose** (for PostgreSQL and Redis)

### 1. Clone the Repository
```bash
git clone https://github.com/mikhailemad999/gym-.git
cd gym-
```

### 2. Start Infrastructure (Postgres & Redis)
```bash
docker compose up -d postgres redis
```

### 3. Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
Backend API will be running at `http://localhost:3001`.  
Swagger documentation available at `http://localhost:3001/api/docs`.

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend will be accessible at `http://localhost:3000`.

---

## API Documentation

When the backend is running, access the interactive Swagger API documentation at:
```
http://localhost:3001/api/docs
```

Key Endpoints:
- `POST /api/auth/register` — Register athlete or coach
- `POST /api/auth/login` — Authenticate and receive JWT
- `GET /api/workouts/today` — Retrieve current day training protocol
- `POST /api/workouts/sessions` — Submit completed workout telemetry
- `GET /api/nutrition/summary` — Daily caloric & macronutrient progress
- `GET /api/progress/biomarkers` — HRV, weight, and volume overload history
- `GET /api/coach/roster` — Coach console athletic roster matrix

---

## License

This project is licensed under the MIT License.
