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
- **Session Management**: MemoryStore for session storage

### Data Layer
- **Database**: Turso (libSQL) - SQLite-compatible edge database
- **ORM**: Drizzle ORM with SQLite dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Environment Variables**: 
  - `TURSO_DATABASE_URL` - Turso database connection URL
  - `TURSO_AUTH_TOKEN` - Turso authentication token

### Database Schema
Four main tables:
1. **users** - Creator accounts with username/password
2. **connections** - Social media platform links (YouTube, Instagram, TikTok)
3. **locked_links** - Generated locked content URLs with unlock codes
4. **unlock_attempts** - Tracks user progress through unlock requirements

### Database Initialization
Tables are automatically created on server startup via `server/init-db.ts`. This script creates all necessary tables if they don't exist.

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
│   ├── db.ts         # Turso database connection
│   └── init-db.ts    # Database table initialization
├── shared/           # Shared code (schema)
└── migrations/       # Drizzle migrations (legacy)
```

### Key Design Decisions
- **Monorepo Structure**: Client and server in single repo with shared types
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Component Library**: Pre-built shadcn/ui components for consistent design
- **Storage Pattern**: Interface-based storage layer for testability
- **Turso Database**: Edge-compatible SQLite database for low-latency global access

## External Dependencies

### Database
- **Turso (libSQL)**: Primary database accessed via `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
- **@libsql/client**: Turso client library for Node.js

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

## Recent Changes

### December 13, 2025
- Fixed API serialization: Added serializeUser() and serializeConnection() helper functions to convert snake_case database fields to camelCase for frontend compatibility
- Updated User interface in auth.tsx to include all profile fields (displayName, profileImage, bannerColor, accentColor, audienceMessage)
- Fixed Account page responsiveness: Profile section now stacks on mobile and displays side-by-side on larger screens
- Completed project import and verified all functionality

### December 2024
- Migrated from PostgreSQL to Turso (libSQL) database
- Updated schema from pg-core to sqlite-core
- Redesigned Account page with sidebar navigation layout
- Added automatic database table initialization on startup
