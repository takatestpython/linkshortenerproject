# Authentication Guidelines

## Overview

All authentication in this application is handled exclusively by **Clerk v7.2.1**. Never implement custom authentication logic or use any other authentication provider.

## Core Rules

1. **Clerk Only**: Use Clerk for all authentication needs - no exceptions
2. **Modal Sign-In**: Sign-in and sign-up flows must always launch as modals
3. **Protected Dashboard**: The `/dashboard` route requires authentication
4. **Auto-Redirect**: Logged-in users accessing the homepage are redirected to `/dashboard`
5. **shadcn Theme**: Clerk components use the shadcn theme for visual consistency

## Implementation Patterns

### Protecting Routes

**Server Components** (Preferred):
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  // Render protected content
}
```

**Middleware** (For multiple routes):
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### Redirecting Authenticated Users

**Homepage redirect logic**:
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Render homepage for unauthenticated users
}
```

### Sign-In/Sign-Up Modals

Use Clerk's modal mode for authentication flows:

```typescript
'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <>
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </>
  );
}
```

### Accessing User Data

**Server Components**:
```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

// Get user ID only
const { userId } = await auth();

// Get full user object
const user = await currentUser();
if (user) {
  console.log(user.emailAddresses[0].emailAddress);
}
```

**Client Components**:
```typescript
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return null;
  
  return <div>Welcome, {user?.firstName}</div>;
}
```

## Common Patterns

### Conditional UI Based on Auth State

```typescript
import { auth } from '@clerk/nextjs/server';

export async function Navigation() {
  const { userId } = await auth();
  
  return (
    <nav>
      {userId ? (
        <a href="/dashboard">Dashboard</a>
      ) : (
        <SignInButton mode="modal">Sign In</SignInButton>
      )}
    </nav>
  );
}
```

### Database Queries with User Context

```typescript
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { links } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserLinks() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  return db.query.links.findMany({
    where: eq(links.userId, userId),
  });
}
```

## Security Checklist

Before deploying authentication-related code:
- [ ] All protected routes check for `userId` via `auth()`
- [ ] No custom authentication logic implemented
- [ ] Sign-in/sign-up use modal mode (`mode="modal"`)
- [ ] Homepage redirects authenticated users to `/dashboard`
- [ ] `/dashboard` route is protected (redirects if not authenticated)
- [ ] User data is never exposed to unauthenticated users
- [ ] Database queries filter by `userId` for user-specific data
- [ ] Environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) are set

## Forbidden Practices

❌ **Never** implement custom authentication logic  
❌ **Never** use authentication providers other than Clerk  
❌ **Never** use redirect mode for sign-in/sign-up (always use modal)  
❌ **Never** store passwords or sensitive auth data in your database  
❌ **Never** expose user data without checking authentication first  

## Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Middleware Guide](https://clerk.com/docs/references/nextjs/clerk-middleware)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk Theming](https://clerk.com/docs/customization/themes)

## Theming

All Clerk UI components are styled using the **shadcn theme** from `@clerk/ui/themes` to ensure visual consistency with the application's shadcn/ui design system.

### Configuration

The theme is configured in the root layout (`app/layout.tsx`):

```typescript
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider appearance={{ baseTheme: shadcn }}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

### How It Works

The shadcn theme uses CSS variables that align with shadcn/ui:
- `--primary`, `--primary-foreground` - Primary actions (buttons, links)
- `--card`, `--card-foreground` - Component backgrounds
- `--destructive` - Error/danger states
- `--input` - Form inputs
- `--muted`, `--muted-foreground` - Secondary elements
- `--ring` - Focus indicators

This ensures all Clerk components (modals, user button, profile pages) automatically match the application's design system.

### Custom Styling

If you need to customize Clerk components beyond the base theme, use the `appearance` prop:

```typescript
<ClerkProvider
  appearance={{
    baseTheme: shadcn,
    elements: {
      // Override specific elements
      formButtonPrimary: "bg-primary hover:bg-primary/90",
    },
  }}
>
```

⚠️ **Important**: Always extend the shadcn base theme rather than replacing it entirely.
