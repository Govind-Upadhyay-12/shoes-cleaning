"use client";

import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthBookButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Routes signed-in users to the booking flow.
 * Opens Clerk sign-in for signed-out users (then continues to href).
 */
export function AuthBookButton({
  href = "/upload",
  children,
  className,
  onNavigate,
}: AuthBookButtonProps) {
  const { isLoaded, isSignedIn } = useAuth();

  const classes = cn(
    buttonVariants({ size: "lg" }),
    "inline-flex items-center justify-center",
    className
  );

  if (!isLoaded) {
    return (
      <button type="button" disabled className={classes}>
        {children}
      </button>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal" forceRedirectUrl={href} signUpForceRedirectUrl={href}>
        <button type="button" className={classes} onClick={onNavigate}>
          {children}
        </button>
      </SignInButton>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onNavigate}>
      {children}
    </Link>
  );
}
