"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileStickyCta() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 safe-bottom md:hidden">
      <div className="pointer-events-auto mx-auto max-w-6xl px-4 pb-3">
        <div className="rounded-2xl border border-border/80 bg-white/95 p-2 shadow-[0_12px_40px_-12px_rgba(17,24,39,0.45)] backdrop-blur-xl">
          <Link
            href="/upload"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-xl text-sm font-semibold"
            )}
          >
            Get Instant Estimate
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
