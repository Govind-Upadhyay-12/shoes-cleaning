"use client";

import Link from "next/link";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const showSignIn = !isLoaded || !isSignedIn;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <BrandLogo priority size="nav" />

        <div className="flex shrink-0 items-center gap-2">
          {isSignedIn && (
            <Link
              href="/bookings"
              className="hidden text-sm font-medium text-foreground hover:text-primary sm:inline"
            >
              My Bookings
            </Link>
          )}
          {showSignIn ? (
            <>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full px-3 sm:px-4"
                  )}
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "hidden rounded-full sm:inline-flex"
                  )}
                >
                  Sign up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
          <AuthBookButton className="hidden rounded-full px-5 md:inline-flex">
            Book
          </AuthBookButton>
          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {isSignedIn && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium"
              >
                My Bookings
              </Link>
            )}
            <Link
              href="/#how"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-muted-foreground"
            >
              How it works
            </Link>
            <Link
              href="/#faq"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-muted-foreground"
            >
              FAQ
            </Link>
            <AuthBookButton
              onNavigate={() => setOpen(false)}
              className="mt-2 h-12 rounded-full"
            >
              Book Cleaning
            </AuthBookButton>
          </div>
        </div>
      )}
    </header>
  );
}
