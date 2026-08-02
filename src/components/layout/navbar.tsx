"use client";

import Link from "next/link";
import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#speed", label: "Why faster" },
  { href: "/#features", label: "Why us" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Zap className="h-4 w-4" />
          </span>
          ShoeSwift
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full"
                )}
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className={cn(buttonVariants({ variant: "ghost" }), "rounded-full")}
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Link
            href="/upload"
            className={cn(buttonVariants(), "rounded-full px-5")}
          >
            Book Cleaning
          </Link>
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
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
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-left text-sm text-muted-foreground"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-left text-sm text-muted-foreground"
                >
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-3 px-3 py-2">
                <UserButton />
                <span className="text-sm text-muted-foreground">Account</span>
              </div>
            </Show>
            <Link
              href="/upload"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "mt-2 h-12 rounded-full")}
            >
              Book Cleaning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
