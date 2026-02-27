# Authentication — Clerk

## Rules

- **Clerk is the only authentication method.** Never implement custom auth, NextAuth, or any other auth library.
- Use `auth()` from `@clerk/nextjs/server` in Server Components and Server Actions to get the current `userId`.
- Use `useAuth()` / `useUser()` from `@clerk/nextjs` in Client Components only when necessary.

## Route Protection

- `/dashboard` is a protected route. Access requires the user to be signed in.
- Unauthenticated users attempting to access `/dashboard` must be redirected to sign-in.

## Homepage Redirect

- If a signed-in user visits `/` (homepage), redirect them to `/dashboard`.
- Implement this redirect in the homepage Server Component using `auth()` and `redirect()`.

## Sign In / Sign Up

- Sign-in and sign-up flows must **always open as a modal**, never navigate to a dedicated page.
- Use Clerk's `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` components.
- Do **not** create custom `/sign-in` or `/sign-up` routes.

## Environment Variables

| Variable | Usage |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Client-side Clerk initialisation |
| `CLERK_SECRET_KEY` | Server-side only — never expose to client |
