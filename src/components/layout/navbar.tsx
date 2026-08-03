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

const links = [
  { href: "/#speed", label: "Why faster" },
  { href: "/#features", label: "Why us" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const showSignIn = !isLoaded || !isSignedIn;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:gap-4 sm:px-6">
        <BrandLogo priority size="nav" />

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isSignedIn && (
            <Link
              href="/bookings"
              className="font-medium text-foreground transition hover:text-primary"
            >
              My Bookings
            </Link>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
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
            <>
              <Link
                href="/bookings"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hidden rounded-full sm:inline-flex"
                )}
              >
                My Bookings
              </Link>
              <UserButton />
            </>
          )}
          <AuthBookButton className="hidden rounded-full px-5 md:inline-flex">
            Book Cleaning
          </AuthBookButton>
          <button
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
            {isSignedIn && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground"
              >
                My Bookings
              </Link>
            )}
            {showSignIn && (
              <div className="mt-1 flex gap-2 px-3 sm:hidden">
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "flex-1 rounded-full"
                    )}
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            )}
            <AuthBookButton
              onNavigate={() => setOpen(false)}
              className="mt-2 h-12 rounded-full md:hidden"
            >
              Book Cleaning
            </AuthBookButton>
          </div>
        </div>
      )}
    </header>
  );
}
