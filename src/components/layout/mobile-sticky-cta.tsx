"use client";

import { usePathname } from "next/navigation";
import { AuthBookButton } from "@/components/auth/auth-book-button";

export function MobileStickyCta() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 safe-bottom md:hidden">
      <div className="pointer-events-auto px-4 pb-3">
        <AuthBookButton className="h-12 w-full rounded-full text-sm font-semibold shadow-[0_12px_40px_-12px_rgba(17,24,39,0.55)]">
          Book · up to 50% off
        </AuthBookButton>
      </div>
    </div>
  );
}
