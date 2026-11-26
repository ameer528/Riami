# Riami

**The Autonomous Sales Workforce.**

Riami is a multi-tenant, AI-native SaaS platform that replaces the traditional sales department with a coordinated workforce of AI agents. It doesn't just recommend what to do — it executes.

Connect your business. Define your objectives. Deploy your workforce.

---

## Core Concept

Traditional sales software gives you tools. Riami gives you a team.

Each Riami deployment includes specialized AI agents that operate within strict permission boundaries:

- **Business Intelligence** — learns your company, products, pricing, and ideal customer profile
- **Lead Intelligence** — discovers prospects, identifies decision-makers, enriches data, scores intent
- **AI SDR** — executes personalized outreach, handles inbound, books meetings
- **AI AE** — runs discovery, generates proposals, handles objections, prepares contracts
- **Customer Success** — onboards clients, monitors health, prevents churn
- **Account Growth** — executes upsells, cross-sells, renewals
- **Sales Operations** — automates CRM, pipeline, invoicing
- **Executive Intelligence** — conversational analytics for the business owner

---

## Permission Architecture

Riami operates on three autonomy tiers, defined by the business:

| Class | Description | Examples |
|-------|-------------|----------|
| **1 — Autonomous** | Agents act freely | Research, scoring, drafting, CRM updates |
| **2 — Policy-Controlled** | Agents act within limits | Outreach, discounts up to X%, scheduling |
| **3 — Restricted** | Human approval required | Signing contracts, moving money, legal terms |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript |
| UI | Tailwind CSS, shadcn/ui, Lucide |
| Backend | Next.js API Routes, tRPC |
| Database | Supabase (PostgreSQL) + pgvector |
| Auth | Supabase Auth |
| AI Orchestration | Custom TypeScript Agent Engine |
| Models | Provider-agnostic (OpenAI, Anthropic, Groq) |
| Deployment | Vercel + Supabase |

---

## Architecture Overview

```

┌─────────────────────────────────────────┐
│         Business Owner / Team           │
└──────────────────┬──────────────────────┘
│
┌──────────────────▼──────────────────────┐
│        Riami Web Application            │
│        (Next.js + TypeScript)           │
└──────────────────┬──────────────────────┘
│
┌──────────────────▼──────────────────────┐
│     API & Authentication Layer          │
│         (tRPC + Supabase)               │
└──────────────────┬──────────────────────┘
│
┌──────────────────▼──────────────────────┐
│      Agent Orchestration Engine         │
│  Supervisor → Specialist → Tools        │
└─────┬──────────────┬──────────────┬─────┘
│              │              │
┌─────▼─────┐  ┌─────▼─────┐  ┌────▼────┐
│  AI Model │  │  Company  │  │  Tool   │
│  Gateway  │  │  Memory   │  │ Registry│
└───────────┘  └───────────┘  └────┬────┘
│
┌───────▼────────┐
│  Integrations  │
│ (Email, CRM,   │
│  Search, etc.) │
└────────────────┘

```

---

## Project Structure

```

riami-core/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Command Center dashboard
│   │   └── globals.css         # Tailwind + base styles
│   ├── lib/
│   │   └── agents/
│   │       ├── orchestrator.ts # Supervisor + specialist agent logic
│   │       └── tools.ts        # Tool registry (search, email, etc.)
│   └── components/             # UI components (add as you build)
├── schema.sql                  # Supabase database schema + RLS
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md

```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A Supabase account (free tier works)
- A GitHub account

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/riami-core.git
   cd riami-core
```

2. Install dependencies
   ```bash
   npm install
   ```
3. Set up the database
   · Create a new project at supabase.com
   · Open the SQL Editor
   · Paste the contents of schema.sql and run it
   · This creates all tables, enables Row Level Security, and locks down tenant isolation
4. Configure environment
   Create a .env.local file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
5. Run the dev server
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

---

Database Schema Highlights

Riami is built multi-tenant from day one. Every business-owned record has an organization_id, and PostgreSQL Row Level Security enforces that no tenant can see another tenant's data — at the database level, not the application level.

Key tables:

· organizations — tenants
· users — linked to Supabase Auth
· company_knowledge — vector embeddings for RAG
· agents — the workforce (role, autonomy level, status)
· leads — prospects with scores and metadata
· agent_executions — full audit log of every action

---

Agent Engine

The supervisor agent receives an objective (e.g., "Find 100 marketing agencies in New York"), breaks it into tasks, delegates to specialist agents, and records every action.

Agents interact with the outside world only through the tool registry — no direct database mutation, no unrestricted API calls. Each tool has a strict input schema (Zod) and a permission requirement.

```typescript
// Example: the supervisor delegates
await supervisor.run("Find 100 marketing agencies and initiate outreach");
```

---

Roadmap

☑ Product specification & architecture
☑ Database schema with RLS
☑ Agent orchestration foundation
☑ Command Center dashboard UI
☐ LLM integration (OpenAI / Anthropic adapters)
☐ Visual workflow builder
☐ Email integration (Resend / SendGrid)
☐ CRM sync (HubSpot / Salesforce)
☐ Lead enrichment APIs (Apollo, Clearbit)
☐ Human-in-the-loop approval queue
☐ Analytics dashboard
☐ Billing (Stripe)

---

Philosophy

Riami is not a chatbot with a sales prompt. It's an operating system for a business's revenue function — with real permissions, real execution, and real accountability.

Every action has an actor. Every action has a permission. Every action has an outcome. That's how autonomy becomes trustworthy.

---

License

Proprietary — all rights reserved. This repo is for development and internal use.

---

Built for businesses that are tired of hiring, training, and managing a sales department that burns out every six months.

```
