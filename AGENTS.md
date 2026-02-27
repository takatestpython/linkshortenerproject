# Agent Instructions — Link Shortener Project

This file is the entry point for all LLM agent instructions on this project. It defines the scope of the codebase and references the authoritative topic-specific instruction documents located in the `/docs` directory.

> [!CAUTION]
> **MANDATORY — NO EXCEPTIONS:** You MUST read every relevant instruction file in the `/docs` directory BEFORE writing, modifying, or generating ANY code whatsoever. Failure to do so will result in incorrect, inconsistent, or non-compliant output. This is not optional. Do not write a single line of code until you have read and understood the applicable docs.

**Before making any change to this codebase, read the relevant docs listed below.**

---

## Instruction Documents

- [Authentication](docs/auth.md) — Clerk setup, route protection, sign-in/sign-up modals, homepage redirect
- [UI](docs/ui.md) — shadcn/ui usage, component standards, icons, and Tailwind conventions

---

## Quick Reference

### Stack at a Glance

- **Next.js 16** · App Router · TypeScript strict mode
- **Clerk** for authentication
- **Neon PostgreSQL** + **Drizzle ORM** for data
- **shadcn/ui** (new-york) + **Tailwind CSS v4** for UI
- **Lucide React** for icons

### Non-Negotiable Rules

1. **Never commit secrets.** All credentials live in `.env.local` (gitignored).
2. **Never expose database or Clerk secret keys to the client bundle.**
3. **Default to Server Components.** Only use `"use client"` when strictly necessary.
4. **Always scope database queries by `userId`** from Clerk's `auth()`.
5. **Do not manually edit files in `components/ui/`** — use the shadcn CLI.
6. **Run `npm run lint` before finalising any code change.**
7. **TypeScript `any` is forbidden.** Resolve type issues properly.

### Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check

npx drizzle-kit generate   # Generate DB migration from schema changes
npx drizzle-kit push       # Push schema to DB (dev only)
npx drizzle-kit studio     # Open Drizzle Studio

npx shadcn@latest add <component>   # Add a shadcn/ui component
```

---

> These instruction files are living documents. Update them whenever architectural decisions, conventions, or dependencies change.
