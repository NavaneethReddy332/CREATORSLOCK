# YouRise - Creator Lock/Link Unlock Tool

## Overview

YouRise is a platform that enables content creators to grow their social media audience by locking valuable content behind social engagement requirements. Creators add their social media links (YouTube, Instagram, TikTok), generate locked link pages, and share them with their audience. Users must visit and engage with the creator's social profiles to unlock the final content or file.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful JSON API with `/api` prefix
- **Authentication**: Password-based auth using bcryptjs for hashing
- **Session Management**: Planned but not fully implemented

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Database**: PostgreSQL (requires DATABASE_URL environment variable)

### Database Schema
Four main tables:
1. **users** - Creator accounts with username/password
2. **connections** - Social media platform links (YouTube, Instagram, TikTok)
3. **lockedLinks** - Generated locked content URLs with unlock codes
4. **unlockAttempts** - Tracks user progress through unlock requirements

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components and sections
│   │   ├── pages/        # Route pages
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API endpoints
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code (schema)
└── migrations/       # Drizzle migrations
```

### Key Design Decisions
- **Monorepo Structure**: Client and server in single repo with shared types
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Component Library**: Pre-built shadcn/ui components for consistent design
- **Storage Pattern**: Interface-based storage layer for testability

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema migrations with `npm run db:push`

### Frontend Libraries
- **@tanstack/react-query**: Async state management
- **framer-motion**: Animation library
- **wouter**: Client-side routing
- **date-fns**: Date formatting utilities

### UI Framework
- **Radix UI**: Headless accessible components
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

### Build & Dev Tools
- **Vite**: Frontend bundler and dev server
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development