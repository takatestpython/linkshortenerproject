# Agent Instructions for Link Shortener Project

This file provides guidance for AI coding assistants working on this link shortener project. Follow these instructions to maintain code quality and consistency.

## ⚠️ CRITICAL: Read Documentation FIRST

**BLOCKING REQUIREMENT**: Before generating ANY code, you MUST read the relevant documentation file(s) from the `/docs` directory:

- **Authentication code?** → Read `/docs/authentication.md` FIRST
- **UI components?** → Read `/docs/ui-components.md` FIRST
- **Any other feature?** → Check if a relevant doc exists and read it FIRST

**DO NOT** write code based on assumptions. **DO NOT** skip reading the docs. These files contain project-specific patterns, conventions, and requirements that are essential for maintaining code quality and consistency.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Clerk v7.2.1
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM v0.45.2
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Quick Reference

### Path Aliases
- `@/*` - Maps to project root
- Always use absolute imports: `import { db } from '@/db'`

### Key Directories
- `/app` - Next.js App Router (pages, layouts, API routes)
- `/components` - React components (UI components in `/components/ui`)
- `/db` - Database schema and configuration
- `/lib` - Utility functions
- `/docs` - Detailed coding standards and patterns

## Core Principles

1. **Type Safety First**: Strict TypeScript, never use `any`
2. **Server Components by Default**: Use `'use client'` only when necessary
3. **Database Direct Access**: Query database directly in Server Components
4. **Tailwind for Styling**: Use utility classes, avoid custom CSS
5. **Clerk for Auth**: Never roll your own authentication

## ⚠️ IMPORTANT: Middleware Deprecation

**NEVER use `middleware.ts`** - This pattern is deprecated in Next.js 16 and is NOT used in this project. 

**Instead, use `proxy.ts`** for request interception and routing logic. The project uses Next.js 16 which has moved away from the traditional middleware pattern. Always refer to `proxy.ts` in the project root for handling request-level logic.

## Detailed Guidelines

### 📚 Documentation Files (READ BEFORE CODING)

The `/docs` directory contains comprehensive coding standards and patterns specific to this project. **These are NOT optional references** - they are **REQUIRED READING** before implementing any related feature.

**MANDATORY**: Always read the relevant documentation file BEFORE generating code:

- **[Authentication](/docs/authentication.md)** - Clerk authentication patterns, protected routes, sign-in/sign-up modals, and security guidelines
  - Read this BEFORE: Adding auth, creating sign-in/sign-up flows, protecting routes, accessing user data
- **[UI Components](/docs/ui-components.md)** - shadcn/ui component usage, styling patterns, and composition guidelines
  - Read this BEFORE: Creating components, adding UI elements, styling interfaces, using shadcn/ui

**Workflow**: When given a task → Identify relevant doc(s) → Read the doc(s) → Then generate code

## Common Tasks

**REMINDER**: Before implementing any of these tasks, check if a relevant documentation file exists in `/docs` and read it first.

### Creating a New Page
1. **Check `/docs` for relevant guidelines first**
2. Create `page.tsx` in appropriate `/app` subdirectory
3. Use Server Component by default
4. Add metadata export for SEO
5. Implement loading and error states if needed

### Adding a Component
1. **Read `/docs/ui-components.md` FIRST**
2. Determine if it needs to be client or server component
3. Place in `/components` or feature-specific directory
4. Use TypeScript interfaces for props
5. Apply Tailwind classes for styling

### Database Operations
1. Define schema in `/db/schema.ts`
2. Run `npx drizzle-kit generate` to create migration
3. Run `npx drizzle-kit migrate` to apply migration
4. Use Drizzle query builder or relational queries
5. Always handle errors and validate data

### Adding Authentication
1. **Read `/docs/authentication.md` FIRST - This is NON-NEGOTIABLE**
2. Protect routes using `proxy.ts` or with `auth()` check in Server Components
3. Use `auth()` in Server Components
4. Use `useAuth()` hook in Client Components
5. Never expose sensitive data to unauthenticated users

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Database migrations
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit studio  # Database GUI
```

## Environment Variables

Required variables (create `.env.local`):
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL=postgresql://...

# Optional
WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Code Review Checklist

Before committing code, ensure:
- [ ] TypeScript strict mode passes (no `any` types)
- [ ] Server Components used where possible
- [ ] Database queries are typed and handle errors
- [ ] Authentication checks in place for protected routes
- [ ] Tailwind classes used consistently
- [ ] Dark mode styles provided
- [ ] Responsive design implemented
- [ ] Accessibility considerations (ARIA labels, semantic HTML)
- [ ] Loading and error states handled
- [ ] Environment variables used for configuration

## Getting Help

When you encounter issues:
1. Check the relevant `/docs` file for detailed patterns
2. Review existing code in the project for examples
3. Consult Next.js, Drizzle, or Clerk documentation
4. Ensure all dependencies are properly installed

## Project Goals

This is a **link shortener** application that allows users to:
- Create shortened URLs
- Track click analytics
- Manage their links through a dashboard
- Authenticate securely with Clerk

Keep these goals in mind when implementing features and maintain consistency with the established patterns.

---

## Final Reminder

**NEVER SKIP THIS STEP**: Before writing ANY code, ask yourself:
1. Is there a documentation file in `/docs` relevant to this task?
2. If yes, have I read it completely?
3. Am I following all the patterns and requirements specified in that documentation?

Only proceed with code generation after answering YES to all applicable questions.

**Remember**: Always prioritize type safety, user security, and code maintainability. The documentation files in `/docs` are the source of truth for this project - they must be consulted BEFORE implementing any feature they cover.
