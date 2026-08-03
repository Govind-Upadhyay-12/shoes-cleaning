"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ShoeAnalysis } from "@/types";
import { buildQuote, displayShoeTitle, formatINR } from "@/utils/pricing";
import { clearAnalysis, loadAnalysis, loadPreview } from "@/utils/storage";
import { cn } from "@/lib/utils";

export function ResultPageClient() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ShoeAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const data = loadAnalysis();
    if (!data) {
      router.replace("/upload");
      return;
    }
    setAnalysis(data);
    setPreview(loadPreview());
  }, [router]);

  const quote = useMemo(
    () => (analysis ? buildQuote(analysis) : null),
    [analysis]
  );

  if (!analysis || !quote) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Your estimate</h1>
      <p className="mt-2 text-muted-foreground">
        Simple price. Clear delivery time.
      </p>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt={displayShoeTitle(analysis)}
          className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover"
        />
      )}

      <div className="mt-8 space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Footwear</p>
          <p className="mt-1 text-xl font-semibold">
            {displayShoeTitle(analysis)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Service</p>
          <p className="mt-1 text-xl font-semibold">
            {analysis.recommended_service}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="mt-1 text-3xl font-semibold">
              {formatINR(quote.price)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Ready by</p>
            <p className="mt-1 text-lg font-semibold">{quote.deliveryLabel}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Pay after cleaning is done.
        </p>
      </div>

      <div className="sticky bottom-4 mt-10 space-y-2">
        <Link
          href="/pickup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 w-full rounded-full text-base"
          )}
        >
          Continue to pickup
        </Link>
        <Button
          variant="ghost"
          className="h-11 w-full rounded-full"
          onClick={() => {
            clearAnalysis();
            router.push("/upload");
          }}
        >
          Start over
        </Button>
      </div>
    </div>
  );
}
