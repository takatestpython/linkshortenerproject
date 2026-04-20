'use client';

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Link Shortener</div>
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
